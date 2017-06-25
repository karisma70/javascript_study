/**
 * Created by Administrator on 2017-06-23.
 */


/*
var routePlay = (function(){

    var bibleMap;
    var trajectoryArray;
    var moveLineStyle;
    var pathVector;

    var pathMovingLayer;
    var pathArrowLayer;
    */

function CreatePathArrowLayer( trajectoryArray ) {

    var pathArrowStyleFunction = function (feature) {
        var geometry = feature.getGeometry();
        var styles = [
            // linestring
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 1
                })
            }),
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [0, 0, 127, 0.15],
                    width: 2
                })
            })
        ];

        geometry.forEachSegment(function (start, end) {
            var dx = end[0] - start[0];
            var dy = end[1] - start[1];
            var rotation = Math.atan2(dy, dx);
            // arrows
            styles.push(new ol.style.Style({
                geometry: new ol.geom.Point(end),
                image: new ol.style.Icon({
                    src: 'image/arrow.png',
                    anchor: [0.75, 0.5],
                    rotateWithView: true,
                    rotation: -rotation
                })
            }));
        });

        return styles;
    };

    var featureLine = new ol.Feature({
        geometry: new ol.geom.LineString(trajectoryArray)
    });

    var sourceLine = new ol.source.Vector({
        features: [featureLine]
    });

    // var coords = featureLine.getGeometry().getCoordinates();
    pathArrowLayer = new ol.layer.Vector({
        source: sourceLine,
        style: pathArrowStyleFunction
    });

    return pathArrowLayer;

}  // end of this.pathArrowDraw


function RouteMoveProcess( paramMap, paramTrajectoryArray ){

    var moveLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#EAE911',
            width: 3   })
    });

    var bibleMap = paramMap;
    var trajectoryArray = paramTrajectoryArray;
    var pathVector = null;
    var pathMovingLayer = null;
    var pathArrowLayer = null;

    addLater = function (feature) {
        var timeVal = new Date().getTime();
        feature.set('start', timeVal);
        //   console.log( "start time : " + timeVal );
        pathVector.addFeature(feature);
    };

    drawMoving = function (event) {
        var pointsPerMs = 0.3;

        var vectorContext = event.vectorContext;
        var frameState = event.frameState;
        vectorContext.setStyle(moveLineStyle);

        var features = pathVector.getFeatures();
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            if (!feature.get('finished')) {
                // only draw the lines for which the animation has not finished yet
                var coords = feature.getGeometry().getCoordinates();
                var elapsedTime = frameState.time - feature.get('start');
                var elapsedPoints = elapsedTime * pointsPerMs;

                if (elapsedPoints >= coords.length) {
                    feature.set('finished', true);
                    pathMovingLayer.setZIndex(18);

                    pathArrowLayer = CreatePathArrowLayer( trajectoryArray);
                    pathArrowLayer.setVisible(true);
                    bibleMap.addLayer( pathArrowLayer );
                    pathArrowLayer.setZIndex(19);

                }

                var maxIndex = Math.min(elapsedPoints, coords.length);
                if( maxIndex > 0 ) {
                    var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));
                    vectorContext.drawGeometry(currentLine);
                }
            }
        }

        bibleMap.render();
    }; // end of   this.drawMoving

    initPath = function () {
        var pathArray = [];
        var moveArray = trajectoryArray;   // abrahamMove
        for (var i = 0; i < moveArray.length - 1; i++) {
            var from = moveArray[i];
            var to = moveArray[i + 1];

            var pointArray = [];
            pointArray.push(from);
            pointArray.push(to);

            var tempLine = new ol.geom.LineString(pointArray);
            tempLine.transform(ol.proj.get('EPSG:3857'), ol.proj.get('EPSG:4326'));     // 경위도로 변환
            var coord = tempLine.getCoordinates();

            // create an arc circle between the two locations
            var arcGenerator = new arc.GreatCircle(
                {x: coord[0][0], y: coord[0][1]},
                {x: coord[1][0], y: coord[1][1]});

            var arcLine = arcGenerator.Arc(100, {offset: 10});
            if (arcLine.geometries.length === 1) {
                var tempArray = arcLine.geometries[0].coords;
                for (var j = 0; j < tempArray.length; j++) {
                    pathArray.push(tempArray[j]);
                }
            }
        }

        var line = new ol.geom.LineString(pathArray);
        line.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
        var feature = new ol.Feature({
            geometry: line,
            finished: false
        });
        addLater(feature);
        bibleMap.on('postcompose', drawMoving );
    };  // end of this.initPath

    this.play = function(){
        this.stop();

        pathVector = new ol.source.Vector({
            wrapX: false,
            loader: initPath
        });

        pathMovingLayer = new ol.layer.Vector({
            source : pathVector,
            style: function (feature) {
                // if the animation is still active for a feature, do not
                // render the feature with the layer style
                if (feature.get('finished')) {
                    return moveLineStyle;
                } else {
                    return null;
                }
            }
        });

        bibleMap.addLayer( pathMovingLayer );
        pathMovingLayer.setZIndex( 100 );
    };

    this.stop = function(){
        if( pathMovingLayer ){
            bibleMap.removeLayer( pathMovingLayer );
            pathMovingLayer = null;
        }

        if( pathArrowLayer ){
            bibleMap.removeLayer( pathArrowLayer );
            pathArrowLayer = null;
        }

    }

}



// }());