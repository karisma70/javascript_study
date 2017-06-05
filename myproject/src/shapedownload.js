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

function genLayerFromWkt( wkt, attrs, bTransform, format, style ) {

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

    if( typeof style.textStroke !== "undefined" && typeof style.textStroke.prop !== "undefined" ) {
        var strLabel = attrs.values[style.textStroke.prop].toString();
        var textLabel = convertUTF8String( strLabel );
        feature.setProperties({'name': textLabel });
    }

    return feature;
}


function ShapeFileDownload( url, layerId, style, paramMap ) {
    var theLayer = this;
    var shpURL = url+'.shp';
    var dbfURL = url+'.dbf';

    var onShpFail = function ( errCode ) {
        alert('failed to load ' + theLayer.shpURL + ", errCode : " + errCode  );
    };
    var onDbfFail = function ( errCode ) {
        alert('failed to load ' + theLayer.dbfURL + ", errCode : " + errCode  );
    };

    var completeCallback = function( shpFile, style,  dbfFile ){       // callback Function

        var paramStyle = style;

        if ( shpFile.header.shapeType == ShpType.SHAPE_POLYGON ){
            console.log( "download Shape_polygon ");
        }
        if ( shpFile.header.shapeType == ShpType.SHAPE_POLYLINE ){
            console.log( "download Shape_polyline ");
        }
        if ( shpFile.header.shapeType == ShpType.SHAPE_POINT ){
            console.log( "download Shape_point ");
        }

        var createTextStyle = function( feature, resolution ){
            var textString = feature.get('name');
            if (textString) {
                return new ol.style.Text({
                    textAlign: paramStyle.textStroke.align,
                    textBaseline: paramStyle.textStroke.baseline,
                    font: paramStyle.textStroke.font,
                    text: feature.get('name'),
                    fill: new ol.style.Fill({color: paramStyle.textStroke.color}),
                    stroke: new ol.style.Stroke({
                        color: paramStyle.textStroke.outlineColor,
                        width: paramStyle.textStroke.outlineWidth
                    }),
                    offsetX: 0,
                    offsetY: 5,
                    rotation: 0
                });
            } else {
                return null;
            }
        }

        function pointStyleFunction(feature, resolution) {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 3,
                    fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
                    stroke: new ol.style.Stroke({color: 'red', width: 1})
                }),
                text: createTextStyle(feature, resolution )
            });
        }

        function polygonStyleFunction(feature, resolution ){
            return new ol.style.Style( {
                stroke: new ol.style.Stroke( {
                    color: style.lineStroke.color,
                    opacity : style.lineStroke.opacity,
                    width: style.lineStroke.width
                } ),
                fill: new ol.style.Fill({
                    color: style.fillColor
                }),
                text : createTextStyle( feature, resolution )
            });
        }

        var bTransform = false;
        if( shpFile.header.boundsXY.width < 1000 ){
            bTransform = true;
        }

        var format = new ol.format.WKT();
        var feature = {};
        var features = [];

        var recsLen = shpFile.records.length;
        for (var i = 0; i < recsLen; i++) {
            var record = shpFile.records[i];
            var attrs = dbfFile.records[i];

            // turn shapefile geometry into WKT
            // points are easy!
            if (shpFile.header.shapeType == ShpType.SHAPE_POINT) {
                var wkt = 'POINT(' + record.shape.x + ' ' + record.shape.y + ')';
                var feature = genLayerFromWkt( wkt, attrs, bTransform, format, style );
                features.push( feature );
            }

            // lines: not too hard--
            else if (shpFile.header.shapeType == ShpType.SHAPE_POLYLINE) {
                // prepopulate the first point
                var points = [];//record.shape.rings[0].x + ' ' + record.shape.rings[0].y];
                var pointsLen = record.shape.rings[0].length;
                for (var j = 0; j < pointsLen; j++) {
                    points.push(record.shape.rings[0][j].x + ' ' + record.shape.rings[0][j].y);
                }

                var wkt = 'LINESTRING(' + points.join(', ') + ')';
                var feature = genLayerFromWkt( wkt, attrs, bTransform, format, style );
                features.push( feature );
            }

            // polygons: donuts
            else if (shpFile.header.shapeType == ShpType.SHAPE_POLYGON) {
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
                var feature = genLayerFromWkt( wkt, attrs, bTransform, format, style );
                features.push( feature );
            }
        }  // end of  for (var i = 0; i < recsLen; i++) {

        var styleFunction;

        if (shpFile.header.shapeType == ShpType.SHAPE_POLYGON || shpFile.header.shapeType == ShpType.SHAPE_POLYLINE ) {
            styleFunction = polygonStyleFunction;
        }else {
            styleFunction = pointStyleFunction;
        }

        var shapeLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: features
            }),
            style: styleFunction
        });

        shapeLayer.set( 'id', layerId, false );
        shapeLayer.set( 'visibleRange', style.visibleRange );
        console.log( url + ",   id  : " + layerId );

        paramMap.addLayer( shapeLayer );
    };   // end of callback

    var onShpComplete = function (oHTTP) {
        var binFile = oHTTP.binaryResponse;
        console.log('got data for ' + theLayer.shpURL + ', parsing shapefile');
        theLayer.shpFile = new ShpFile(binFile);
        if (theLayer.dbfFile ){
            completeCallback( theLayer.shpFile, style, theLayer.dbfFile );
        }
    };

    var onDbfComplete = function (oHTTP) {
        var binFile = oHTTP.binaryResponse;
        console.log('got data for ' + theLayer.dbfURL + ', parsing dbf file');

        theLayer.dbfFile = new DbfFile(binFile);
        if (theLayer.shpFile) {
            completeCallback( theLayer.shpFile, style, theLayer.dbfFile );
        }
    };

    this.shpURL = shpURL;
    this.dbfURL = dbfURL;

    var shpLoader = new BinaryAjax(shpURL, onShpComplete, onShpFail);
    var dbfLoader = new BinaryAjax(dbfURL, onDbfComplete, onDbfFail);
}