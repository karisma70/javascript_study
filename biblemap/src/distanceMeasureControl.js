/**
 * Created by Administrator on 2017-06-27.
 */


function DistanceMeasureControl( paramMapManager ){
    var mapManager = paramMapManager;
    var map = paramMapManager.getMap();
    var measureDraw = null; // global so we can remove it later
    var source = null;
    this.vector = null;

    var mousePos = [0, 0];
    var coordString = '';
    var measureGeom = null;

    source = new ol.source.Vector({wrapX: false});

    function removeSourceFeatures() {

        var features = source.getFeatures();
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            source.removeFeature(feature);
        }
    }

    this.vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style( {
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 3
            })
        })
    });

    var mousePosControl = new ol.control.MousePosition(
        {
            className : 'myMousePos',
            element: null,
            target: null,
            // projection : 'EPSG:4326',
            coordinateFormat : function( coordinate ){

                mousePos = coordinate;

                if( measureGeom && measureGeom.getCoordinates().length > 1 ) {
                    var coordinates = measureGeom.getCoordinates();

                    //console.log("------------------>>");
                    //console.log("mouseX: " + mousePos[0] + ", mouseY: " + mousePos[1]);
                    var distance = 0;
                    for (coord in coordinates) {
                        if (coord > 0) {
                            distance += getDistance(coordinates[coord][0], coordinates[coord][1], coordinates[coord - 1][0], coordinates[coord - 1][1]);
                            //      console.log( "x1:" + coordinates[coord][0] + ", y1:" + coordinates[coord][1] + ", x2:"+coordinates[coord - 1][1] + ", y2:"+  coordinates[coord - 1][1] );
                        }
                    }

                    var distObj = makeDistanceObj(distance);
                    coordString = distObj.distString;
                    // coordString = distance + "";


                    //console.log("<<-------------- distance : " + distObj.distString);
                }
                else{
                    // console.log( "not exsit measureGeom!!");
                    coordString = "";
                }

            }
        }


    );

    map.addLayer( this.vector );

    this.removeMeasureDraw = function(){
        if( measureDraw ){
            map.removeInteraction( measureDraw );
            measureDraw = null;
        }
    };

    this.toggleMeasureDistance = function(){
        if( measureDraw == null ) {
            mapManager.removeSelectInteraction();
            coordString = '';
            addInteraction();
            map.addControl( mousePosControl );
        }
        else {
            mapManager.addSelectInteraction();
            map.removeInteraction( measureDraw );
            measureDraw = null;
            coordString = '';
            map.removeControl( mousePosControl );
        }
    };

    this.IsActive = function(){
        var bIsActive = 0;

        if( measureDraw ) {
            bIsActive = 1;
        }

        return bIsActive;
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



    function addInteraction(){
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
                if (!geom  ) {
                    geom = new ol.geom.LineString(null);
                }
                geom.setCoordinates(coords);
                measureGeom = geom;
                return geom;
            }
        });

        map.addInteraction( measureDraw );

        map.on('dblclick', function (evt) {
            measureGeom = null;
            coordString = "";

            removeSourceFeatures();
            map.render();
        });

        map.on('click', function(evt){

            var features = source.getFeatures();
            if( features.length > 0 ) {
                coordString = "";
                measureGeom = null;
                removeSourceFeatures();
                map.render();
            }

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
    }

    return this;
}
