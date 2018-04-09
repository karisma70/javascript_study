/**
 * Created by Administrator on 2017-06-23.
 */

makeLinkedName = function( poiID, placeName ){
    var strStart = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + poiID + ')\" style=\"text-decoration:none; font-weight:normal; color: #000000;' + '\" >';
    var linkedPlaceName = strStart;
    linkedPlaceName += placeName;
    linkedPlaceName += '</a>';

    return linkedPlaceName;
};


function CreatePathArrowLayer( trajectoryArray, isArrow ) {

    var pathArrowStyleFunction = function (feature) {
        var geometry = feature.getGeometry();
        var styles = [
            // linestring
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 3
                })
            })
            /*,
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [0, 0, 127, 0.15],
                    width: 2
                })
            }) */
        ];


        var vtIdx = 0;
        var vtCount = geometry.getCoordinates().length;
        var basePos = null;

        geometry.forEachSegment(function (start, end) {

            var dx = end[0] - start[0];
            var dy = end[1] - start[1];
            var rotation = Math.atan2(dy, dx);
            // arrows

            var styleArrowObj = null;

            if( isArrow == true ) {
                styleArrowObj = new ol.style.Style({
                    geometry: new ol.geom.Point(end),
                    image: new ol.style.Icon({
                        // src: 'biblemap/image/arrow.png',
                        src: 'biblemap/image/arrow2.png',
                        anchor: [0.75, 0.5],
                        rotateWithView: true,
                        rotation: -rotation
                    })
                });
            }/*   else{
                styleArrowObj = new ol.style.Style({
                    geometry: new ol.geom.Point(end),
                    image: new ol.style.Icon({
                        src: 'biblemap/image/icon.png'
                        // anchor: [0.75, 0.5],
                        // rotateWithView: true,
                        // rotation: -rotation
                    })
                });
            } */

            if( styleArrowObj ) {
                if (vtIdx == 0) {
                    styles.push(styleArrowObj);
                    basePos = copyObject(end);
                } else {
                    var distance = getDistanceArr(basePos, end);
                    if (distance > 100000 || (vtCount - 2) <= vtIdx) {
                        styles.push(styleArrowObj);
                        basePos = copyObject(end);
                    }
                }
            }
            vtIdx ++;
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

// var tolerancePoiPos = 2000;

// function RouteMoveProcess( paramMap, paramTrajectory, paramPoiArray, paramTooltip, CallBackForInitPathComplete ){
function RouteMoveProcess( paramMap, paramTrajectory, paramPoiArray, CallBackForInitPathComplete ){

    var moveLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#EAE911',
            width: 3   })
    });

    // var tooltip = new Tooltip( "2D", paramMap, 'pathTooltip pathTooltip-static', 1 );
    var tooltip = new Tooltip(  "2D", paramMap, 'pathTooltip pathTooltip-static' );

    // var tolerancePoiPos = 700;
    var tolerancePoiPos = 2000;

    var poiArray = paramPoiArray;
    var bibleMap = paramMap;
    var trajectoryArray = paramTrajectory.data;
    var trajectoryLabelList = paramTrajectory.labelList;

    var pathVector = null;
    var pathMovingLayer = null;
    var pathArrowLayer = null;
    var popupPoiArray = [];
    var pointsPerMs = 0.2;
    var totalDist = 0;
    var oldFrameState = 0;
    var pathPause = false;
    var bIsFirstLoop = true;
    // var tooltip = paramTooltip;

    var beforeDetectPoi = null;
    var movingSpeed = 0.0;

    addLater = function (feature) {
        var timeVal = new Date().getTime();
        feature.set('start', timeVal);
        //   console.log( "start time : " + timeVal );
        pathVector.addFeature(feature);
    };

    this.adjustMovingSpeed = function( val ){
        movingSpeed = Number( val );
    };

    this.updateMovingSpeed = function( mapLevel ){

        if( mapLevel <= 5 ){
            pointsPerMs = 0.1;
        }
        else if( mapLevel == 6 )
            pointsPerMs = 0.2;
        else if( mapLevel == 7  )
            pointsPerMs = 0.15;
        else if( mapLevel == 8  )
            pointsPerMs = 0.1;
        else if( mapLevel == 9  )
            pointsPerMs = 0.08;
        else if( mapLevel == 10 )
            pointsPerMs = 0.04;
        else if( mapLevel > 10 )
            pointsPerMs = 0.02;

      //   ConsoleLog( "mapLevel : " + mapLevel + " perMs : " + pointsPerMs );
    };

    this.pause = function( val ){
        pathPause = val;

    };


    drawMoving = function (event) {

        var vectorContext = event.vectorContext;
        var frameState = event.frameState;
        if( oldFrameState == 0 ){
            oldFrameState = frameState;
        }
        vectorContext.setStyle(moveLineStyle);
        if( pathMovingLayer == null)
            return;

        var features = pathVector.getFeatures();
        for (var i = 0; i < features.length; i++) {         // feature의 갯수는 1 이다
            var feature = features[i];
            if (feature.get('finished'))
                continue;

            if (!feature.get('finished')) {
                // only draw the lines for which the animation has not finished yet
                var coords = feature.getGeometry().getCoordinates();

                var moveDist = (frameState.time - oldFrameState.time ) * ( pointsPerMs + movingSpeed) ;
                var elapsedPoints = 0;

                elapsedPoints = moveDist + totalDist;

                if( pathPause == false )
                    totalDist += moveDist;

                oldFrameState = frameState;

                if (elapsedPoints >= coords.length) {
                    feature.set('finished', true);
                    pathMovingLayer.setZIndex(18);

                    pathArrowLayer = CreatePathArrowLayer(trajectoryArray, true);
                    pathArrowLayer.setVisible(true);
                    bibleMap.addLayer(pathArrowLayer);
                    pathArrowLayer.setZIndex(50);

                    if (pathMovingLayer) {
                        bibleMap.removeLayer(pathMovingLayer);
                        pathMovingLayer = null;
                    }
                }

                var maxIndex = Math.min(elapsedPoints, coords.length);
                if (maxIndex < 1)
                    continue;

                var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));    ///////////////////////////////
                vectorContext.drawGeometry(currentLine);

                // var coordArray = coords.slice(0, maxIndex);
                // ConsoleLog( "currentLine [0] X: " + coordArray[0][0] + ", Y: " + coordArray[0][1] );

                var curCoord = coords.slice(maxIndex - 1, maxIndex)[0];

                var minDistance = 999999999;
                var detectPoi = null;
                var find = false;
                var findPoiIdx = -1;

                if( bIsFirstLoop == true  ){
                    var firstPoi = popupPoiArray[0];

                    // tooltip.create( firstPoi.biblePlace, [firstPoi.x, firstPoi.y]);
                    var linkedPlaceName = makeLinkedName( firstPoi.id, firstPoi.biblePlace );
                    tooltip.create( firstPoi.id, linkedPlaceName, [firstPoi.x, firstPoi.y], "#ffcc33" );

                    ConsoleLog( "first toolTip Create : " + firstPoi.biblePlace );
                    beforeDetectPoi = firstPoi;
                }

                bIsFirstLoop = false;

                for (var idx in popupPoiArray) {
                    var temp = popupPoiArray[idx];
                    var dist = getDistance(temp.trjX, temp.trjY, curCoord[0], curCoord[1]);
                    if (dist < minDistance) {
                        minDistance = dist;
                        detectPoi = temp;
                        find = true;
                        findPoiIdx = idx;
                    }
                }       // 확보되어 있는 궤적관련 poi리스트 중에서 제일 근거리에 있는 poi를 찾는다


                if (find == true && minDistance < ( tolerancePoiPos + 9500 )) {
                    if (detectPoi != beforeDetectPoi) {

                        var linkedPlaceName = makeLinkedName( detectPoi.id, detectPoi.biblePlace );

                        // tooltip.create(detectPoi.biblePlace, [detectPoi.x, detectPoi.y]);
                        tooltip.create( detectPoi.biblePlace, linkedPlaceName, [detectPoi.x, detectPoi.y], "#ffcc33");

                        ConsoleLog( "toolTip Create : " + detectPoi.biblePlace );
                        beforeDetectPoi = detectPoi;
                    }
                }

            }
        }   // end of for (var i = 0; i < features.length; i++) {

        bibleMap.render();
    }; // end of   this.drawMoving

    IsWithinToleranceOfPoi = function ( trjX, trjY ) {

        var minDist = 9999999;
        var retObj = null;

        for (var idx in poiArray ) {
            //if (poiLayer.hasOwnProperty(prop) && typeof poiLayer[prop] === "object") {

                var obj = poiArray[idx];

                if (IsWithinTolerance( trjX, trjY, obj.x, obj.y, tolerancePoiPos ) == true) {

                    if( trajectoryLabelList )
                    {
                        var IsFind = false;
                        for( var list in trajectoryLabelList ){
                            if( obj.biblePlace == trajectoryLabelList[list] ){
                                IsFind = true;
                                break;
                            }
                        }
                        if( IsFind == false )
                            continue;
                    }

                    obj.trjX = trjX;
                    obj.trjY = trjY;
                    var dist = getDistance( trjX, trjY, obj.x, obj.y );
                    if( dist < minDist ){
                        minDist = dist;
                        retObj = obj;
                     //   ConsoleLog("Find !!!  >> X:" + + trjX + ", Y: " + trjY +", name: " + obj.biblePlace + " : " + dist + ", tolerance : " + tolerancePoiPos );
                    }
                }

            // }
        }

        return retObj;
    };

    initPath = function () {
        popupPoiArray = [];
        var pathArray = [];
        var moveArray = trajectoryArray;   // abrahamMove
        var totDist = 0;

        for (var i = 0; i < moveArray.length - 1; i++) {
            var from = moveArray[i];
            var to = moveArray[i + 1];

            var dist = getDistance( from[0], from[1], to[0], to[1] );
            totDist += dist;
        }

        for (var i = 0; i < moveArray.length - 1; i++) {
            var from = moveArray[i];
            var to = moveArray[i + 1];
            var poi = null;

            if( i == 0 ) {
                poi = IsWithinToleranceOfPoi(from[0], from[1]);
            }
            else {
                 poi = IsWithinToleranceOfPoi( to[0], to[1] );
            }

            if( poi != null ){
                if( popupPoiArray.length > 0 ){
                    var beforePoi = popupPoiArray[ popupPoiArray.length-1 ];
                    if( poi.id != beforePoi.id ) {
                        ConsoleLog("Pushed Poi [" + popupPoiArray.length + "]==> " + poi.biblePlace );
                        popupPoiArray.push(poi);
                    }
                }
                else {
                    popupPoiArray.push(poi);
                }
            }

            if( i == 0 ) {
                poi = IsWithinToleranceOfPoi(to[0], to[1]);
                if( poi != null ){
                    if( popupPoiArray.length > 0 ){
                        var beforePoi = popupPoiArray[ popupPoiArray.length-1 ];
                        if( poi.id != beforePoi.id ) {
                            ConsoleLog("Pushed Poi [" + popupPoiArray.length + "]==> " + poi.biblePlace );
                            popupPoiArray.push(poi);
                        }
                    }
                    else {
                        popupPoiArray.push(poi);
                    }
                }
            }

            var pointArray = [];
            pointArray.push(from);
            pointArray.push(to);

            var dist = getDistance( from[0], from[1], to[0], to[1] );
            var divCount = ( dist / totDist ) * 3000 ;
            var offsetVal = divCount / 10;

            var tempLine = new ol.geom.LineString(pointArray);
            tempLine.transform(ol.proj.get('EPSG:3857'), ol.proj.get('EPSG:4326'));     // 경위도로 변환
            var coord = tempLine.getCoordinates();

            // create an arc circle between the two locations
            var arcGenerator = new arc.GreatCircle(
                {x: coord[0][0], y: coord[0][1]},
                {x: coord[1][0], y: coord[1][1]});

             //var arcLine = arcGenerator.Arc(100, {offset: 10});
            var arcLine = arcGenerator.Arc( divCount, {offset: offsetVal });
            if (arcLine.geometries.length === 1) {
                var tempArray = arcLine.geometries[0].coords;
                for (var j = 0; j < tempArray.length; j++) {
                    pathArray.push(tempArray[j]);
                }
            }
        }

        CallBackForInitPathComplete( popupPoiArray );       ///////////////////////////

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

        tooltip.allRemove();

        if( pathVector){
            var features = pathVector.getFeatures();
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                feature.set('finished', true);
            }
        }

        if( pathMovingLayer ){
            bibleMap.removeLayer( pathMovingLayer );
            pathMovingLayer = null;
        }

        if( pathArrowLayer ){
            bibleMap.removeLayer( pathArrowLayer );
            pathArrowLayer = null;
        }

    };

}

