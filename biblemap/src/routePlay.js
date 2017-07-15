/**
 * Created by Administrator on 2017-06-23.
 */


function CreatePathArrowLayer( trajectoryArray ) {

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

            if( vtIdx == 0 ) {
                styles.push(new ol.style.Style({
                    geometry: new ol.geom.Point(end),
                    image: new ol.style.Icon({
                        src: 'biblemap/image/arrow.png',
                        anchor: [0.75, 0.5],
                        rotateWithView: true,
                        rotation: -rotation
                    })
                }));
                basePos = copyObject( end );
            }else{
                var distance = getDistanceArr( basePos, end );
                if( distance > 100000 || (vtCount - 2) <= vtIdx ){
                    styles.push(new ol.style.Style({
                        geometry: new ol.geom.Point(end),
                        image: new ol.style.Icon({
                            src: 'biblemap/image/arrow.png',
                            anchor: [0.75, 0.5],
                            rotateWithView: true,
                            rotation: -rotation
                        })
                    }));
                    basePos = copyObject( end );
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


function RouteMoveProcess( paramMap, paramTrajectoryArray, paramPoiLayer, paramTooltip ){

    var moveLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#EAE911',
            width: 3   })
    });

    // var tolerancePoiPos = 5000;
    var tolerancePoiPos = 2000;

    var poiLayer = paramPoiLayer;

    var bibleMap = paramMap;
    var trajectoryArray = paramTrajectoryArray;
    var pathVector = null;
    var pathMovingLayer = null;
    var pathArrowLayer = null;
    var popupPoiArray = [];
    var bIsShowedPopup = false;
    // var popupWnd = paramPopup;
    // var overlayWnd = paramOverlay;
    var tooltip = paramTooltip;
    var trjPoi = {};

    addLater = function (feature) {
        var timeVal = new Date().getTime();
        feature.set('start', timeVal);
        //   console.log( "start time : " + timeVal );
        pathVector.addFeature(feature);
    };

    drawMoving = function (event) {
        var pointsPerMs = 0.2;

        var vectorContext = event.vectorContext;
        var frameState = event.frameState;
        vectorContext.setStyle(moveLineStyle);

        var features = pathVector.getFeatures();
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            if (!feature.get('finished')) {
                // only draw the lines for which the animation has not finished yet
                var coords = feature.getGeometry().getCoordinates();

               // getPoiOfTrajectory( coords )

                var elapsedTime = frameState.time - feature.get('start');
                var elapsedPoints = elapsedTime * pointsPerMs;

                if (elapsedPoints >= coords.length) {
                    feature.set('finished', true);
                    pathMovingLayer.setZIndex(18);

                    pathArrowLayer = CreatePathArrowLayer( trajectoryArray);
                    pathArrowLayer.setVisible(true);
                    bibleMap.addLayer( pathArrowLayer );
                    pathArrowLayer.setZIndex(19);

                    if( pathMovingLayer ){
                        bibleMap.removeLayer( pathMovingLayer );
                        pathMovingLayer = null;
                    }

                }

                var maxIndex = Math.min(elapsedPoints, coords.length);
                if( maxIndex > 0 ) {
                    var currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));
                    var curCoord = coords.slice(maxIndex-1, maxIndex)[0];

                    var minDistance = 999999999;
                    var detectPoi = null;
                    var find = false;

                    for( var idx in popupPoiArray ){
                        var temp = popupPoiArray[idx];
                        var dist = getDistance( temp.trjX, temp.trjY, curCoord[0], curCoord[1] );
                        if( dist < minDistance ){
                            minDistance = dist;
                            detectPoi = temp;
                            find = true;
                        }
                    }

                    if( maxIndex > 2 && bIsShowedPopup == false ){
                        for( var idx in popupPoiArray ){
                            var temp = popupPoiArray[idx];
                            var dist = getDistance( temp.trjX, temp.trjY, curCoord[0], curCoord[1] );
                            if( dist < minDistance ){
                                minDistance = dist;
                                detectPoi = temp;
                            }
                        }

                        if( trjPoi.hasOwnProperty( detectPoi.orgName ) == false && trjPoi[ detectPoi.orgName ] == null) {
                            tooltip.create( detectPoi.orgName, [detectPoi.x, detectPoi.y]);
                            trjPoi[ detectPoi.orgName ] = detectPoi;
                        }else {
                            ConsoleLog( "Already exist: " + detectPoi.orgName );
                        }
                        bIsShowedPopup = true;

                    }
                    else {
                        for (var idx in popupPoiArray) {
                            var popupPoi = popupPoiArray[idx];
                            if (IsWithinTolerance(curCoord[0], curCoord[1], popupPoi.trjX, popupPoi.trjY, tolerancePoiPos ) == true) {
                                ConsoleLog("X: " + popupPoi.trjX + ", Y: " + popupPoi.trjY + ",name: " + popupPoi.orgName);

                                if( trjPoi.hasOwnProperty( popupPoi.orgName ) == false && trjPoi[ detectPoi.orgName ] == null) {
                                    tooltip.create(popupPoi.orgName, [popupPoi.x, popupPoi.y]);
                                    trjPoi[ detectPoi.orgName ] = popupPoi;
                                }else {
                                    ConsoleLog( "Already exist: " + popupPoi.orgName );
                                }

                                bIsShowedPopup = true;
                                break;
                            }
                        }
                    }

                    vectorContext.drawGeometry(currentLine);
                }
            }
        }

        bibleMap.render();
    }; // end of   this.drawMoving

    function IsWithinToleranceOfPoi( trjX, trjY ) {

        var minDist = 9999999;
        var retObj = null;

        for (var prop in poiLayer) {
            if (poiLayer.hasOwnProperty(prop) && typeof poiLayer[prop] === "object") {

                var obj = poiLayer[prop];

                if (IsWithinTolerance( trjX, trjY, obj.x, obj.y, tolerancePoiPos ) == true) {
                    obj.trjX = trjX;
                    obj.trjY = trjY;
                    var dist = getDistance( trjX, trjY, obj.x, obj.y );
                    if( dist < minDist ){
                        minDist = dist;
                        retObj = obj;
                        ConsoleLog("Find !!!  >> " + prop + " : " + dist + ", tolerance : " + tolerancePoiPos );
                    }
                }

                if( prop == "예루살렘"){
                    var dist = getDistance( trjX, trjY, obj.x, obj.y );
                    ConsoleLog("Debug !!!  >> " + prop + " : " + dist + ", tolerance : " + tolerancePoiPos );
                }

            }
        }

        return retObj;
    }

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

            if( i == 0 )
                poi = IsWithinToleranceOfPoi(from[0], from[1]);
            else
                poi = IsWithinToleranceOfPoi( to[0], to[1] );

            if( poi != null ){
                popupPoiArray.push( poi );
            }

            if( i == 0 ) {
                poi = IsWithinToleranceOfPoi(to[0], to[1]);
                if( poi != null ){
                    popupPoiArray.push( poi );
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

        // tooltip.allRemove();

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

    }

}

