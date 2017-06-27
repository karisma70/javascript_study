/**
 * Created by Administrator on 2017-06-27.
 */

function getDistance( x1, y1, x2, y2){

    var distX = Math.abs( x2 - x1 );
    var distY = Math.abs( y2 - y1 );

    var distance = Math.sqrt( (distX * distX) + (distY * distY) );

    return distance;
}

function makeDistanceObj( dist  ){
    var bIsKm = false;
    var realDist = 0;
    var distString = '';
    if( dist >= 1000){
        realDist = ( Math.round( dist/1000*100) / 100 );
        bIsKm = true;
        distString = realDist + ' km';
    }else{
        realDist = Math.round(dist);
        distString = realDist + ' m';
    }
    return {
        distance : realDist,
        IsKm : bIsKm,
        distString : distString
    };
}

function DistanceMeasureControl( cssClass ){
    // var map = paramMap;
    var map = null;
    var measureDraw = null; // global so we can remove it later
    this.cssClass = cssClass;
    this.source = null;
    this.vector = null;

    var mousePos = [0, 0];
    var coordString = '';
    var measureGeom = null;


    this.switchMeasureDistance = function(){
        if( measureDraw == null )
            addInteraction();
        else {
            map.removeInteraction( measureDraw );
            measureDraw = null;
        }
    };

    this.MeasureDistanceEvent = function( opt_options ) {

        var options = opt_options || {};

        var measureBtn = document.createElement('button');
        measureBtn.innerHTML = 'M';

        measureBtn.addEventListener('click', this.switchMeasureDistance, false);

        var element = document.createElement( 'div');
        element.className = 'measure-distance ol-unselectable ol-control';
        element.appendChild( measureBtn );

        ol.control.Control.call( this, {
            element: element,
            target: options.target
        });
    };

    this.createEvent = function(){
        return new this.MeasureDistanceEvent;
    };

    function createTextStyle( stringText ) {
        return new ol.style.Text({
            textAlign: 'right',
            textBaseline: 'middle',
            font: 'normal 12px 돋움',
            text: stringText,
            fill: new ol.style.Fill({color: 'yellow'}),
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 3
            }),
            offsetX: 0,
            offsetY: 5,
            rotation: 0
        })
    }


    this.init = function( paramMap ){
        map = paramMap;

        ol.inherits( MeasureDistance, ol.control.Control );

        this.source = new ol.source.Vector({wrapX: false});

        this.vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style( {
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    width: 3
                })
            })
        });

        map.addLayer( this.vector );

        map.on('dblclick', function (evt) {
            measureGeom = null;
            coordString = "";

            var features = source.getFeatures();
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                source.removeFeature( feature );
            }

            map.render();
            console.log( "dblClick!!!");
        });

        map.on('postcompose', function(event){
            var vectorContext = event.vectorContext;
            if( measureDraw == null )
                return;
            if( mousePos[0] != 0 && mousePos[1] != 0 ) {
                vectorContext.setStyle(
                    new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 5,
                            snapToPixel: false,
                            fill: new ol.style.Fill({color: 'red'}),
                            stroke: new ol.style.Stroke({color: 'yellow', width: 1})
                        }),
                        text : createTextStyle( coordString )
                    })
                );
                vectorContext.drawGeometry( new ol.geom.Point(mousePos));
            }
        });
    };

    this.createMousePosControl = function() {
        return new ol.control.MousePosition(
            {
                // projection : 'EPSG:4326',
                coordinateFormat: function (coordinate) {

                    mousePos = coordinate;

                    if (measureGeom && measureGeom.getCoordinates().length > 1) {
                        var coordinates = measureGeom.getCoordinates();

                        //console.log("------------------>>");
                        //console.log("mouseX: " + mousePos[0] + ", mouseY: " + mousePos[1]);
                        var distance = 0;
                        for (coord in coordinates) {
                            if (coord > 0) {
                                distance += getDistance(coordinates[coord][0], coordinates[coord][1], coordinates[coord - 1][1], coordinates[coord - 1][1]);
                                //      console.log( "x1:" + coordinates[coord][0] + ", y1:" + coordinates[coord][1] + ", x2:"+coordinates[coord - 1][1] + ", y2:"+  coordinates[coord - 1][1] );
                            }
                        }

                        var distObj = makeDistanceObj(distance);
                        coordString = distObj.distString;

                        //console.log("<<-------------- distance : " + distObj.distString);
                    }
                    else {
                        // console.log( "not exsit measureGeom!!");
                        coordString = "";
                    }

                }
            }
        )
    };

    this.getVector = function(){
        return this.vector;
    };


    function addInteraction() {
        measureDraw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ ('LineString'),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#9F25B2',
                    width: 3
                })
            }),
            geometryFunction: function (coords, geom) {
                if (!geom) {
                    geom = new ol.geom.LineString(null);
                }
                geom.setCoordinates(coords);
                measureGeom = geom;
                return geom;
            }
        });

        map.addInteraction( measureDraw );
    }


    return this;
}
