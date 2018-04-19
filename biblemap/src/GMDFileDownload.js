/**
 * Created by Administrator on 2017-06-05.
 */


function readUTF8String(bytes) {
    var ix = 0;

    if (bytes.slice(0, 3) == "\xEF\xBB\xBF") {
        ix = 3;
    }

    var string = "";
    for (; ix < bytes.length; ix++) {
        var byte1 = bytes[ix].charCodeAt(0);
        if (byte1 < 0x80) {
            string += String.fromCharCode(byte1);
        } else if (byte1 >= 0xC2 && byte1 < 0xE0) {
            var byte2 = bytes[++ix].charCodeAt(0);
            string += String.fromCharCode(((byte1 & 0x1F) << 6) + (byte2 & 0x3F));
        } else if (byte1 >= 0xE0 && byte1 < 0xF0) {
            var byte2 = bytes[++ix].charCodeAt(0);
            var byte3 = bytes[++ix].charCodeAt(0);
            string += String.fromCharCode(((byte1 & 0xFF) << 12) + ((byte2 & 0x3F) << 6) + (byte3 & 0x3F));
        } else if (byte1 >= 0xF0 && byte1 < 0xF5) {
            var byte2 = bytes[++ix].charCodeAt(0);
            var byte3 = bytes[++ix].charCodeAt(0);
            var byte4 = bytes[++ix].charCodeAt(0);
            var codepoint = ((byte1 & 0x07) << 18) + ((byte2 & 0x3F) << 12) + ((byte3 & 0x3F) << 6) + (byte4 & 0x3F);
            codepoint -= 0x10000;
            string += String.fromCharCode(
                (codepoint >> 10) + 0xD800, (codepoint & 0x3FF) + 0xDC00
            );
        }
    }

    return string;
}

function convertUTF8String( strText ) {

    var convText = readUTF8String( strText );

    convText = removeSpaceInWord( convText );

    return convText;
}

function createFeatureFromWkt( wkt, attrs, bTransform, format, label ) {

    var feature = {};

    if (bTransform == true) {
        feature = format.readFeature(wkt, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });
    }
    else {
        feature = format.readFeature(wkt);
    }

    if( label ) {
        var wktProp = { };
        var strLabel = "";
        if( attrs.values[label] )
            strLabel = attrs.values[label].toString();
        else
            alert( "genLayersFromWkt Error!!  attr : " + label );
        if( strLabel ) {
            wktProp[label] = convertUTF8String(strLabel);
            feature.setProperties(wktProp);
        }
    }

    var geom = feature.getGeometry();
    var coord = geom.getCoordinates();

    // var coord3D = [ coord[0], coord[1], 50 ];
    // geom.setCoordinates( coord3D );

    return feature;
}



function create3DFeatureFrom2DFeauture( feature2D ){

    // feature2D.getGeometry().set('altitudeMode', 'clampToGround');

    var geom = feature2D.getGeometry();
    var coord = geom.getCoordinates();

    var prop2D = feature2D.getProperties();

    /*
    var feature3D = new ol.Feature( {
        geometry: new ol.geom.Point( [ coord[0], coord[1] ] )
    });

    feature3D.setProperties( feature2D.getProperties() );


    var geom3D = feature3D.getGeometry();
    feature3D.setProperties( feature2D.getProperties() );

    // textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 14px Nanum Gothic', color: "white", outlineColor : "black", outlineWidth : 2  }
    var prop = feature3D.getProperties();
    prop.style.textStroke.font = "normal 20px Nanum Ghotic";

    var coord3D = geom3D.getCoordinates();
    */

    var feature3D = Create3DPOIFeature( prop2D, coord[0], coord[1] );

    return feature3D;
}


function createPoiObj( attrs, shapeRecord, minVisibleLevel, minVisibleLevel3D ){
    var biblePlace = "";
    if( attrs.values["bible"] ) {
        biblePlace = attrs.values["bible"].toString();
        biblePlace = convertUTF8String(biblePlace);
    }

    var poiTitle = "";
    if( attrs.values["title"]){
        poiTitle = attrs.values["title"].toString();
       // poiTitle = removeSpaceInWord( poiTitle );
        poiTitle = convertUTF8String(poiTitle);
    }

    var rangeStr = "";
    var rangeArray = null;
    if( attrs.values["range"] ){
        rangeStr = attrs.values["range"].toString();
        //rangeStr = removeSpaceInWord( rangeStr );
        //if( rangeStr != "") {
            rangeStr = convertUTF8String(rangeStr);
            if( rangeStr != "" )
                rangeArray = JSON.parse(rangeStr);
        //}
    }

    var poiObj = {
        biblePlace : biblePlace,
        x: shapeRecord.shape.x,
        y: shapeRecord.shape.y,
        zoomIn: minVisibleLevel,
        zoomIn3D: minVisibleLevel3D,
        title : poiTitle,
        rangeStr : rangeStr,
        rangeArray : rangeArray,
        feature : null
    };

    return poiObj;
}


function getStringFromAttrs( attrs, field ) {

    if( attrs.values[field] == undefined)
        return "";

    var strFieldText = attrs.values[field];
    strFieldText = convertUTF8String(strFieldText);

    return strFieldText;

}


function GMDFileDownload( map, map3D, shpUrl, layerId, style, paramLayerManager, wholeCompleteCallback ) {

    var url = "biblemap/downloadmap/" + shpUrl;

    var theLayer = this;
    var shpURL = url+'.shp';
    var dbfURL = url+'.dbf';
    var layerManager = paramLayerManager;
    var layerContainer = paramLayerManager.layerContainer;


    var onShpFail = function ( errCode ) {
        alert('failed to load ' + theLayer.shpURL + ", errCode : " + errCode  );
    };
    var onDbfFail = function ( errCode ) {
        alert('failed to load ' + theLayer.dbfURL + ", errCode : " + errCode  );
    };

    var createShapeLayer = function( features, layerId, style, styleFunction ) {

        if( styleFunction !== null  ) {
            var shapeLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: features
                }),
                style: styleFunction
            });
        }else{
            var shapeLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: features
                })
            });
        }

        shapeLayer.set('id', layerId, false);
        shapeLayer.set('visibleRange', style.visibleRange);

        if( style.visibleRange3D !== undefined ){
            shapeLayer.set('visibleRange3D', style.visibleRange3D );
        }

        if (style.historyShow)
            shapeLayer.set('historyShow', style.historyShow);

        return shapeLayer;

    };


    var completeCallback = function( shpFile, layerId, style,  dbfFile ){       // callback Function

        var paramStyle = style;

        var bTransform = false;
        if( shpFile.header.boundsXY.width < 1000 ){
            bTransform = true;
        }

        var format = new ol.format.WKT();
        var features = [];
        var cloneFeatures = [];

        if( shpFile.records.length != dbfFile.records.length ){
            ConsoleLog( "Critial shapefile Error!!  id: " + layerId + ", shape records: " + shpFile.records.length + ", dbf records: " + dbfFile.records.length );
        }

        var recsLen = shpFile.records.length;

        for (var i = 0; i < recsLen; i++) {
            var record = shpFile.records[i];
            var attrs = dbfFile.records[i];
            if( attrs == null ){
                if( i < 1 ){
                    alert( url + " File is shape Error!!!" + "shape File Records : " + shpFile.records.length + ", dbf File Records :  " + dbfFile.records.length );
                    return;
                }else{
                    attrs = dbfFile.records[i-1];
                    if( attrs == null ){
                        alert( url + " File is shape Error!!!" + "shape File Records : " + shpFile.records.length + ", dbf File Records :  " + dbfFile.records.length );
                        return;
                    }
                }
            }

            // turn shapefile geometry into WKT
            // points are easy!
            if (shpFile.header.shapeType == ShpType.SHAPE_POINT) {      //  POINT
                var wkt = 'POINT(' + record.shape.x + ' ' + record.shape.y + ')';

                var tempStr = removeSpaceInWord( attrs.values["label"]);        // label 필드가 비어있으면 label 필드에 bible 필드의 텍스트를 카피한다
                if( tempStr == ""){
                    attrs.values["label"] = attrs.values["bible"];
                }

                // var moveLevel = ( paramStyle.visibleRange.min + paramStyle.visibleRange.max ) /2 ;
                // moveLevel = Math.floor(moveLevel) -2;
                var moveLevel = paramStyle.visibleRange.min + 1;
                if( moveLevel > 13 )
                    //moveLevel = paramStyle.visibleRange.min;
                    moveLevel = 13;

                var moveLevel3D = moveLevel;
                if( paramStyle.visibleRange3D !== undefined ){
                    moveLevel3D = paramStyle.visibleRange3D.min;
                }

                var poiobj = createPoiObj( attrs, record, moveLevel, moveLevel3D );    //  bible, title, range 에 해당하는 필드로 poi 오브젝트를 생성한다
                poiobj = layerManager.insertPoiObj( poiobj );
                var confirmPoi = layerManager.getPoiObjById( poiobj.id );

                var feature = createFeatureFromWkt(wkt, attrs, bTransform, format, "label" );
                feature.setProperties({  'id' : poiobj.id,
                                        'style': paramStyle });

                poiobj.feature = feature;

                features.push(feature);

                if( map3D ) {
                    // var cloneFeature = cloneObject( feature );
                    var cloneFeature = create3DFeatureFrom2DFeauture(feature);

                    cloneFeature.getGeometry().set('altitudeMode', 'clampToGround');
                    cloneFeatures.push(cloneFeature);
                }

                var searchWord = getStringFromAttrs( attrs, "bible");
                layerManager.insertPoiObjToDictionary( poiobj, searchWord );
                layerManager.insertPoiWord( searchWord );
                searchWord = getStringFromAttrs( attrs, "label");
                layerManager.insertPoiObjToDictionary( poiobj, searchWord );
                layerManager.insertPoiWord( searchWord );
                searchWord = getStringFromAttrs( attrs, "search1");
                layerManager.insertPoiObjToDictionary( poiobj, searchWord );
                layerManager.insertPoiWord( searchWord );
                searchWord = getStringFromAttrs( attrs, "search2");
                layerManager.insertPoiObjToDictionary( poiobj, searchWord );
                layerManager.insertPoiWord( searchWord );

                searchWord = getStringFromAttrs( attrs, "search3");
                if( searchWord != "" ) {
                    layerManager.insertPoiObjToDictionary(poiobj, searchWord);
                    layerManager.insertPoiWord(searchWord);
                }

                var orgName = "";

                // bible, label, search1, search2
                for( attr in attrs.values ) {
                    if (isExistStringPropInObj(attrs.values, attr) == false)
                        continue;

                    if (attr == 'id' || attr == 'range' || attr == 'title')
                        continue;

                    var strLabel = "";
                    if(  attrs.values[attr] )
                        strLabel = attrs.values[attr].toString();
                    else
                        alert( "Error!! GMD file download , attr : " + attr  );

                    strLabel = removeSpaceInWord(strLabel);
                    if (strLabel == "") {
                        if (attr == "label") {
                            attrs.values[attr] = attrs.values["bible"];
                        }
                        else
                            continue;
                    }

                    if (attrs.values[attr].toString() == "") {
                        ConsoleLog("url : " + url + "attr : " + attr);
                    }

                    // var textString = feature.get(attr);
                    textString =  convertUTF8String( attrs.values[attr].toString() );
                    if( textString == "" )
                        continue;

                    if (attr == "search1" || attr == "search2") {
                        ConsoleLog(url + ">>" + attr + ": " + textString);
                    }

                    if (attr == "bible")
                        orgName = textString;                       // 성경내의 텍스트
                    if (orgName == "") {
                        ConsoleLog("bible Search word is null !!!" + textString);
                    }

                    if (layerContainer.poiLayer.hasOwnProperty(textString) == false) {
                        layerContainer.poiLayer[textString] = {         // 검색어에 넣는다
                            biblePlace : orgName,
                            x: record.shape.x,
                            y: record.shape.y,
                            // zoomIn: paramStyle.visibleRange.min
                            zoomIn: moveLevel
                        };
                    }
                }  // end of for( prop in attrs.values )

            }
            else if (shpFile.header.shapeType == ShpType.SHAPE_POLYLINE) {      // POLYLINE
                var points = [];//record.shape.rings[0].x + ' ' + record.shape.rings[0].y];
                var pointsLen = record.shape.rings[0].length;
                for (var j = 0; j < pointsLen; j++) {
                    points.push(record.shape.rings[0][j].x + ' ' + record.shape.rings[0][j].y);
                }

                var wkt = 'LINESTRING(' + points.join(', ') + ')';
                var feature = null;
                if( typeof paramStyle.textStroke !== "undefined" && typeof paramStyle.textStroke.prop !== "undefined" ) {
                    feature = createFeatureFromWkt(wkt, attrs, bTransform, format, paramStyle.textStroke.prop);
                }else{
                    feature = createFeatureFromWkt(wkt, attrs, bTransform, format, null );
                }
                feature.setProperties( { 'style': paramStyle } );
                features.push( feature );
            }

            // polygons: donuts
            else if (shpFile.header.shapeType == ShpType.SHAPE_POLYGON) {       // POLYGON
                var ringsLen = record.shape.rings.length;
                var wktOuter = [];
                for (var j = 0; j < ringsLen; j++) {
                    var ring = record.shape.rings[j];
                    if (ring.length < 1)
                        continue;
                    var wktInner = [];//ring.x + ' ' + ring.y];
                    var ringLen = ring.length;
                    for (var k = 0; k < ringLen; k++) {
                        wktInner.push(ring[k].x + ' ' + ring[k].y);
                    }
                    wktOuter.push('(' + wktInner.join(', ') + ')');
                }

                var wkt = 'POLYGON(' + wktOuter.join(', ') + ')';
                var feature = createFeatureFromWkt( wkt, attrs, bTransform, format, paramStyle.textStroke.prop );

                if( attrs.values['color']) {
                    var strColor = attrs.values['color'].toString();
                    strColor = removeSpaceInWord( strColor );
                    if( strColor != "" ) {
                        var extendStyle = copyObject( paramStyle );
                        extendStyle.fillColor = strColor;
                        feature.setProperties({'style': extendStyle});
                    }
                }

                if( feature.get('style') == null ) {
                    feature.setProperties({'style': paramStyle});
                }
                features.push( feature );

            }
        }  // end of  for (var i = 0; i < recsLen; i++) {

        var createStyleFunction;

        if (shpFile.header.shapeType == ShpType.SHAPE_POLYGON || shpFile.header.shapeType == ShpType.SHAPE_POLYLINE ) {
            createStyleFunction = createPolygonStyleOfFeature;
        }else {
            createStyleFunction = createPointStyleOfFeature;
        }

        var shapeLayer = createShapeLayer( features, layerId, style, createStyleFunction );
        shapeLayer.setVisible( false );
        layerContainer.layers.push( shapeLayer );
        map.addLayer(  shapeLayer );

        ///////////////////////  3D Map

        if( map3D ) {
            // var cloneShapeLayer = createShapeLayer( cloneFeatures, layerId, style, create3DPointStyleOfFeature );
           var cloneShapeLayer = createShapeLayer( cloneFeatures, layerId, style, null );
            cloneShapeLayer.setVisible( false );

            cloneShapeLayer.set('altitudeMode', 'clampToGround' );
            map3D.layers.push( cloneShapeLayer );
            // map3D.map.addLayer( cloneShapeLayer );
        }
        ////////////////////////

        if( layerContainer.totalCount <= layerContainer.layers.length ){
            wholeCompleteCallback( map, layerContainer );
        }else{
            ConsoleLog( "LayerContainer.totalCount : " + layerContainer.totalCount + ", layers.length: " + layerContainer.layers.length );
        }

        shapeLayer.setZIndex( layerId );

    };   // end of callback

    var onShpComplete = function (oHTTP) {
        var binFile = oHTTP.binaryResponse;
        ConsoleLog('got data for ' + theLayer.shpURL + ', parsing shapefile');
        theLayer.shpFile = new ShpFile(binFile);
        if (theLayer.dbfFile ){
            completeCallback( theLayer.shpFile, layerId, style, theLayer.dbfFile );
        }
    };

    var onDbfComplete = function (oHTTP) {
        var binFile = oHTTP.binaryResponse;
        ConsoleLog('got data for ' + theLayer.dbfURL + ', parsing dbf file');

        theLayer.dbfFile = new DbfFile(binFile);
        if (theLayer.shpFile) {
            completeCallback( theLayer.shpFile, layerId, style, theLayer.dbfFile );
        }
    };

    this.shpURL = shpURL;
    this.dbfURL = dbfURL;

    var shpLoader = new BinaryAjax(shpURL, onShpComplete, onShpFail);
    var dbfLoader = new BinaryAjax(dbfURL, onDbfComplete, onDbfFail);
}