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

function convertUTF8String( strLabel ) {
    var textString = readUTF8String(strLabel);

    var textArr = new Array();
    textArr = textString.split(' ');
    var textLabel = textArr[0];
    if (textArr[1] != '')
        textLabel += ' ' + textArr[1];

    return textLabel;
}

function genLayerFromWkt( wkt, attrs, bTransform, format, label ) {

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
        var strLabel = attrs.values[label].toString();
        wktProp[label] = convertUTF8String(strLabel);
        feature.setProperties( wktProp );
    }

    return feature;
}


function ShapeFileDownload( map, url, layerId, style, layerContainer, wholeCompleteCallback ) {
    var theLayer = this;
    var shpURL = url+'.shp';
    var dbfURL = url+'.dbf';

    var onShpFail = function ( errCode ) {
        alert('failed to load ' + theLayer.shpURL + ", errCode : " + errCode  );
    };
    var onDbfFail = function ( errCode ) {
        alert('failed to load ' + theLayer.dbfURL + ", errCode : " + errCode  );
    };

    var completeCallback = function( shpFile, layerId, style,  dbfFile ){       // callback Function

        // debug
        if( layerId == 9 ){
            console.log( "debug!!@!");
        }

        var paramStyle = style;

        /*
        if ( shpFile.header.shapeType == ShpType.SHAPE_POLYGON ){
            console.log( "download Shape_polygon ");
        }
        if ( shpFile.header.shapeType == ShpType.SHAPE_POLYLINE ){
            console.log( "download Shape_polyline ");
        }
        if ( shpFile.header.shapeType == ShpType.SHAPE_POINT ){
            console.log( "download Shape_point ");
        }
        */

        var bTransform = false;
        if( shpFile.header.boundsXY.width < 1000 ){
            bTransform = true;
        }

        var format = new ol.format.WKT();
        var features = [];

        /*
        if( shpFile.records.length != dbfFile.records.length ){
            alert( url + " File is shape Error!!!" + "shape File Records : " + shpFile.records.length + ", dbf File Records :  " + dbfFile.records.length );
            return;
        }
        */

        if( shpFile.records.length != dbfFile.records.length ){
            console.log( "Critial shapefile Error!!  id: " + layerId + ", shape records: " + shpFile.records.length + ", dbf records: " + dbfFile.records.length );
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

                var orgName = "";

                for( label in attrs.values ){
                    if( isExistStringPropInObj( attrs.values, label ) == false)
                        continue;

                    if( label == 'id')
                        continue;

                    var strLabel = attrs.values[label].toString();
                    strLabel = removeSpaceInWord(strLabel);
                    if( strLabel == "")
                        continue;

                    var feature = genLayerFromWkt(wkt, attrs, bTransform, format, label );
                    feature.setProperties( { 'style': paramStyle } );
                    features.push(feature);

                    // var textString = feature.get(style.textStroke.prop);
                    var textString = feature.get( label );
                    if (textString) {

                        if( label == "name2" || label == "name3" ){
                            console.log( url + ">>" + label + ": " + textString  );
                        }

                        if( label == "name" )
                            orgName = textString;

                        if( layerContainer.poiLayer.hasOwnProperty( textString ) == false ) {
                            layerContainer.poiLayer[textString] = {
                                orgName: orgName,
                                x: record.shape.x,
                                y: record.shape.y,
                                zoomIn: paramStyle.visibleRange.min
                            };

                            var poiObj = {
                                text: textString,
                                length: textString.length
                            };

                            layerContainer.poiWords.push(poiObj);
                        }
                    }

                } // end of for( prop in attrs.values )
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
                    feature = genLayerFromWkt(wkt, attrs, bTransform, format, paramStyle.textStroke.prop);
                }else{
                    feature = genLayerFromWkt(wkt, attrs, bTransform, format, null );
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

                if( layerId == 5 ){
                    console.log( "layer id : 5");
                }
                var wkt = 'POLYGON(' + wktOuter.join(', ') + ')';
                var feature = genLayerFromWkt( wkt, attrs, bTransform, format, paramStyle.textStroke.prop );

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

        var shapeLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: features
            }),
            style: createStyleFunction
        });

        shapeLayer.set( 'id', layerId, false );
        shapeLayer.set( 'visibleRange', style.visibleRange );
        if( style.historyShow )
            shapeLayer.set( 'historyShow', style.historyShow );
        console.log( url + ",   id  : " + layerId );


        layerContainer.layers.push( shapeLayer );


        if( layerContainer.totalCount <= layerContainer.layers.length ){
            wholeCompleteCallback( map, layerContainer );
        }

        map.addLayer(  shapeLayer );
        shapeLayer.setZIndex( layerId );


    };   // end of callback

    var onShpComplete = function (oHTTP) {
        var binFile = oHTTP.binaryResponse;
        console.log('got data for ' + theLayer.shpURL + ', parsing shapefile');
        theLayer.shpFile = new ShpFile(binFile);
        if (theLayer.dbfFile ){
            completeCallback( theLayer.shpFile, layerId, style, theLayer.dbfFile );
        }
    };

    var onDbfComplete = function (oHTTP) {
        var binFile = oHTTP.binaryResponse;
        console.log('got data for ' + theLayer.dbfURL + ', parsing dbf file');

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