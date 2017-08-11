 /**
 * Created by Administrator on 2017-06-06.
 */


     // Iran, SaudiArabia , Turkey


 var bibleMapLayers = [

     { url : 'biblemap/mapdata/110m-admin-0-countries', order: 1, style: {
        historyShow : 'false',
        visibleRange : { max : 16, min : 1 },
        fillColor : 'rgba( 255, 255, 255, 0.001)',
        lineStroke : {  color: [174, 122, 40], width : 1, opacity: 0.01  },
        //textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 12px arial', color: '#2581D8', outlineColor : '#CECBCB', outlineWidth : 3  }}
         textStroke : { prop: 'label', align: 'center', baseline: 'middle' , font : 'bold 12px arial', color: '#F1EEEE', outlineColor : '#2581D8', outlineWidth : 2  }}
     },

         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

     { url : 'biblemap/mapdata/history/History_promise_canaan2', order: 5, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'biblemap/mapdata/history/History_12Sect', order: 6, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 7 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },


     { url : 'biblemap/mapdata/history/History_BC12', order: 7, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'biblemap/mapdata/history/History_saul_king', order: 8, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'biblemap/mapdata/history/History_david_king', order: 9, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'biblemap/mapdata/history/History_divideIsrael', order: 10, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 7 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },


     { url: 'biblemap/mapdata/history/History_12Sect_poi',  order: 20, style: {
         visibleRange : { max : 16 , min : 8 },
         textStroke : { prop: 'label', align: 'center', baseline: 'center', font : 'normal 13px arial', color: '#E7E5E5', outlineColor : '#5F0291', outlineWidth : 4  }}
     },


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


         { url: 'biblemap/mapdata/level_11_poi',  order: 21, style: {
             visibleRange : { max : 16 , min : 11 },
             textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 12px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  }}
         },


         { url: 'biblemap/mapdata/level_10_poi',  order: 22, style: {
             visibleRange : { max : 16 , min : 10 },
             textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 12px 돋움', color: "white", outlineColor : "#313132", outlineWidth : 3  } }
         },


         { url : 'biblemap/mapdata/level_9_poi',  order: 23, style: {
             visibleRange : { max : 16 , min : 9 },
             textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "#49494A", outlineWidth : 3  } }
         },

         { url : 'biblemap/mapdata/level_7_poi',  order: 24, style: {
             visibleRange : { max : 16 , min : 7 },
             textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 12px 돋움', color: "white", outlineColor : "#636364", outlineWidth : 3  } }
         },

         { url: 'biblemap/mapdata/level_6_poi',  order: 25, style: {
             visibleRange : { max : 16 , min : 6 },
             textStroke : { prop: 'label', align: 'center', baseline: 'center', font : 'normal 13px arial', color: '#E7E5E5', outlineColor : '#033078', outlineWidth : 4  }}
         },

         {
           url: 'biblemap/mapdata/level_4_poi',  order: 26, style: {
             visibleRange : { max : 16 , min : 4 },
             textStroke : { prop: 'label', align: 'center', baseline: 'center', font : 'normal 13px arial', color: '#E7E5E5', outlineColor : '#105602', outlineWidth : 4  }}
         }


 ];

 function getDistance( x1, y1, x2, y2){

     var distX = Math.abs( x2 - x1 );
     var distY = Math.abs( y2 - y1 );

     var distance = Math.sqrt( (distX * distX) + (distY * distY) );

     return distance;
 }

 function getDistanceArr( pos1, pos2 ){

     return getDistance( pos1[0], pos1[1], pos2[0], pos2[1] );
 }


 function IsWithinTolerance( x1, y1, x2, y2, tolerance ){
     var dist = getDistance( x1, y1, x2, y2 );
     if( dist < tolerance ) {
         return true;
     }
     return false;
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


 ol.Feature.prototype.getLayer = function(map) {
     var this_ = this, layer_, layersToLookFor = [];

     var check = function(layer){
         var source = layer.getSource();
         if(source instanceof ol.source.Vector){
             var features = source.getFeatures();
             if(features.length > 0){
                 layersToLookFor.push({
                     layer: layer,
                     features: features
                 });
             }
         }
     };
     //loop through map layers
     map.getLayers().forEach(function(layer){
         if (layer instanceof ol.layer.Group) {
             layer.getLayers().forEach(check);
         } else {
             check(layer);
         }
     });
     layersToLookFor.forEach(function(obj){
         var found = obj.features.some(function(feature){
             return this_ === feature;
         });
         if(found){
             //this is the layer we want
             layer_ = obj.layer;
         }
     });
     return layer_;
 };


 var createTextStyleOfFeature = function( feature, resolution ){

     var featureStyle = feature.get('style');

     var textString = feature.get('label');
     if (textString) {
         return new ol.style.Text({
             textAlign: featureStyle.textStroke.align,
             textBaseline: featureStyle.textStroke.baseline,
             font: featureStyle.textStroke.font,
             // text: feature.get('name'),
             // text: feature.get('label'),
             text : feature.get( featureStyle.textStroke.prop ),
             fill: new ol.style.Fill({color: featureStyle.textStroke.color}),
             stroke: new ol.style.Stroke({
                 color: featureStyle.textStroke.outlineColor,
                 width: featureStyle.textStroke.outlineWidth
             }),
             offsetX: 0,
             offsetY: 5,
             rotation: 0
         });
     } else {
         return null;
     }
 }

 function createPointStyleOfFeature(feature, resolution) {
     return new ol.style.Style({
         /*
          image: new ol.style.Circle({
          radius: 3,
          fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.1)'}),
          stroke: new ol.style.Stroke({color: 'red', width: 1})
          }),
          */
         text: createTextStyleOfFeature(feature, resolution )
     });
 }

 function createPolygonStyleOfFeature(feature, resolution ){

     var featureStyle = feature.get('style');
     var strokeStyle = null;

     if( featureStyle.lineStroke.width > 0 ) {
         strokeStyle = new ol.style.Stroke({
             color: featureStyle.lineStroke.color,
             opacity: featureStyle.lineStroke.opacity,
             width: featureStyle.lineStroke.width
         });
     }

     return new ol.style.Style( {
         stroke: strokeStyle,
         fill: new ol.style.Fill({
             color: featureStyle.fillColor
         }),
         text : createTextStyleOfFeature( feature, resolution )
     });
 }


 function LayerManager( ){
     this.layerContainer = {
         layers : [],
         totalCount : 0,
         poiLayer : {},


         ///////////////////////
         poiDictionary: {},    // 단어 지역명 검색
         poiDicObjects: [],      // 레코드 단위 poi 오브젝트 들을 담아둔 배열
         poiWords : []          // 단어 검색을 위한 지명 배열
     };
 }

LayerManager.prototype.getPoiObjectArray = function(){
    return this.layerContainer.poiDicObjects;
};


 LayerManager.prototype.insertPoiWord = function( locationName ){

     if( locationName == "" )
         return;

     var poiWordsArr = this.layerContainer.poiWords;

     for( var idx in poiWordsArr ){
         var tempWord = poiWordsArr[ idx ];
         if( tempWord.text == locationName )
             return;
     }

     var poiWord = {
         text: locationName,
         length: locationName.length
     };

     this.layerContainer.poiWords.push( poiWord );
 };


 LayerManager.prototype.sortPoiWords = function(){

     this.layerContainer.poiWords.sort( function( poiA, poiB ){
         var aLen = poiA['length'] ;
         var bLen = poiB['length'];
         if( aLen < bLen )
             return 1;
         if( aLen > bLen )
             return -1;
         return 0;
     } );

 };


 LayerManager.prototype.insertPoiObj = function( poiObj ){
     var idx = this.layerContainer.poiDicObjects.length;
     poiObj.id = idx;
     this.layerContainer.poiDicObjects.push( poiObj );

     if( poiObj.rangeStr != "" ){
         ConsoleLog("id: " + poiObj.id + ", label: " + poiObj.biblePlace + ", range : " + poiObj.rangeStr );
     }

     return poiObj;
 };

 LayerManager.prototype.getPoiObjById = function( id ){
     if( id < 0 || id > this.layerContainer.poiDicObjects.length ) {
         ConsoleLog( "cannot find getPoiObjById(" + id + ")  ===>  length : " + this.layerContainer.poiDicObjects.length );
         return;
     }

     return this.layerContainer.poiDicObjects[id];
 };

 LayerManager.prototype.insertPoiObjToDictionary = function( poiObj, searchWord ){

     if( searchWord == "" )
         return;

     if( this.layerContainer.poiDictionary.hasOwnProperty( searchWord ) == false) {

         // for Debugging
         if( searchWord == "숙곳" ){
             ConsoleLog("Here is 숙곳!!");
         }

         this.layerContainer.poiDictionary[searchWord] = {         // 검색어에 넣는다
             poiArray : []
         };
         this.layerContainer.poiDictionary[searchWord].poiArray.push( poiObj );
     } else {
         var poiArray = this.layerContainer.poiDictionary[ searchWord ].poiArray;
         var bAlreadyExist = false;
         for( var idx in poiArray ) {
             var tempPoi = poiArray[idx];
             if( tempPoi.id == poiObj.id ) {
                 bAlreadyExist = true;
                 break;
             }
         }
         if( bAlreadyExist == false ){
             this.layerContainer.poiDictionary[ searchWord ].poiArray.push( poiObj );
         }
     }
 };



 LayerManager.prototype.getPoiObjArrayFromDictionary = function( poiWord ){

     if( this.layerContainer.poiDictionary.hasOwnProperty( poiWord ) == false) {
         return null;
     }

     return this.layerContainer.poiDictionary[poiWord].poiArray;
 };

 LayerManager.prototype.findPoiObjByBibleTitleAndWord = function( bibleTitle, poiWord ){

     if( this.layerContainer.poiDictionary.hasOwnProperty( poiWord ) == false) {
         return null;
     }

     var poiArray = this.layerContainer.poiDictionary[poiWord].poiArray;

     if( poiArray.length > 1 ) {
         for (var pIdx in poiArray) {
             var poiObj = poiArray[pIdx];
             var rangeArray = poiObj.rangeArray;
             if (rangeArray) {
                 for (var rIdx in rangeArray) {
                     if( bibleTitle == rangeArray[rIdx] )
                        return poiObj;
                 }
             }
         }
         return null;
     }else{
         var poiObj = poiArray[0];
         var rangeArray = poiObj.rangeArray;
         if (rangeArray) {
             for (var rIdx in rangeArray) {
                 if (bibleTitle == rangeArray[rIdx])
                     return poiObj;
             }
             return null;
         } else{
             return poiObj;
         }
     }

 };


 LayerManager.prototype.getPoiByName = function( name ){
     return this.layerContainer.poiLayer[ name ];
 };

 LayerManager.prototype.getLayerContainer = function(){
     return this.layerContainer;
 };

 LayerManager.prototype.getPoiWords = function(){
     return this.layerContainer.poiWords;
 };


 function createOverlay( divID ){    // container
     var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
         element: divID,
         autoPan: true,
         autoPanAnimation: {
             duration: 250
         }
     }));
     return overlay;
 }


function flyTo( view, location, zoomIn, done) {
    var duration = 2000;
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;

    // zoomIn += 1;

    if( zoomIn < 7 )
         zoomIn = 7;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }
    view.animate({
        center: location,
        duration: duration
    }, callback);

    var topZoom = zoom - 1;
    //if( topZoom < 8 )
    //    topZoom = 8;

    view.animate({
        //  zoom: zoom - 1,
        zoom : topZoom,
        duration: duration / 2
    }, {
        // zoom: zoom,
        zoom : zoomIn,
        duration: duration / 2
    }, callback);
}

function moveTo( view, location, zoomIn, done ) {
      // if( zoomIn < 10 )
      //  zoomIn = 10;

    var parts = 2;
    var called = false;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            if( done )
                done(complete);
        }
    }

    view.animate({
        center: location,
        zoom : zoomIn,
        duration: 1000
    }, callback );
}

function isExistStringPropInObj( obj, prop ) {
    var result = false;
    if ( obj.hasOwnProperty(prop) ){
        if( typeof obj[prop] === "string") {
            result = true;
        }
    }
    return result;
}


 function addAllLayersToMap( map, layerContainer ){
     layerContainer.layers.sort( function( layerA, layerB ){
         var aID = layerA.get( 'id' );
         var bID = layerB.get( 'id' );
         if( aID < bID )
             return -1;
         if( aID > bID )
             return 1;
         return 0;
     } );

     for( idx in layerContainer.layers ){
         // console.log( "Inserted Layer ID : " + layerContainer.layers[idx].get( 'id'));
         map.addLayer(  layerContainer.layers[ idx ] );
     }
 }


function createLayer( source  ) {
    var terrLayer = new ol.layer.Tile({
     source: source
    });

    return terrLayer;
}

 function createView( center, maxZoom, minZoom, firstZoom ) {
     var view = new ol.View({
         // center: [3942321.454123089, 3792452.570684223],
         center: center,
         // maxZoom: 18,
         maxZoom : maxZoom,
         // minZoom: 4,
         minZoom: minZoom,
         // zoom: 8
         zoom: firstZoom
     });

     return view;
 }

 var createMapManager = (function() {

     var bibleMap = null;
     var clickedPos = [0, 0];
     var selectedFeatures = null;
     var interactionStyleCallback = null;

     var tempLineLayer = null;
     var tempLineInteract = null;

     function MapManager(overlay, targetMap, view) {
         this.scaleLineControl = new ol.control.ScaleLine();
         this.scaleLineControl.setUnits("metric");

         this.layerManager = new LayerManager();
         this.view = view;

         this.map = new ol.Map({
             overlays: [overlay],
             target: targetMap,      // taret: 'map'
             controls: ol.control.defaults({
                 attribution: false,
                 attributionOptions: ({    // @type {olx.control.AttributionOptions}
                     collapsible: false
                 })
             }).extend([ /*new ol.control.FullScreen({
                 source: 'fullscreenMap'
             //}), this.scaleLineControl, extendEvent ]),
             }), */
             this.scaleLineControl ]),
             view: this.view
         });

         // var zoomSlider = new ol.control.ZoomSlider();
         // this.map.addControl( zoomSlider );

         bibleMap = this.map;

         InitWmsLayer(this.map);

         function InitWmsLayer( paramMap) {
             // var wmsDemLayer = createLayer( new ol.source.Stamen( { layer: 'terrain-background' }) ) ;

             var wmsDemLayer = new ol.layer.Tile({
                 visible: false,
                 preload: Infinity,
                 source: new ol.source.BingMaps({
                     key: 'Aj2EBKlpTb_8cxuPEs0OHBBoiplb0HYYaOb8DVHTyCK7dduQSzMTv1i9gb4WwnP2',
                     imagerySet: "Aerial"
                     // use maxZoom 19 to see stretched tiles instead of the BingMaps
                     // "no photos at this zoom level" tiles
                     // maxZoom: 19
                 })
             });


             wmsDemLayer.set('id', 1, false);
             wmsDemLayer.set('visibleRange', {max: 18, min: 1});
             paramMap.addLayer(wmsDemLayer);

             /*
              var wmsOsmLayer = createLayer(  new ol.source.OSM() );

              wmsOsmLayer.set( 'id', 2, false );
              wmsOsmLayer.set( 'visibleRange', { max : 18, min : 13 }   );

              paramMap.addLayer( wmsOsmLayer );
              */
         }

         this.mapEventPrecompose = function (callBack) {
             this.map.on('precompose', function (evt) {
                 if( bibleMap == null )
                     return;

                 var zoom = bibleMap.getView().getZoom();
                 var layers = bibleMap.getLayers();

                 layers.forEach(function (layer) {
                     var visibleRange = layer.get('visibleRange');
                     if (typeof visibleRange !== "undefined") {

                         if (visibleRange.min <= zoom && zoom <= visibleRange.max) {
                             var historyMap = layer.get('historyShow');
                             if (historyMap) {
                                 if (historyMap == 'true')
                                     layer.setVisible(true);
                                 else
                                     layer.setVisible(false);
                             }
                             else {
                                 layer.setVisible(true);
                             }
                         }
                         else {
                             layer.setVisible(false);
                         }
                     }
                 });

                 callBack(evt);
             });
         };

         this.selectClick = new ol.interaction.Select({
             // layers: [ layer명 ]
             condition: ol.events.condition.click
         });

         this.map.addInteraction(this.selectClick);


         this.addSelectInteraction = function(){
             this.map.addInteraction(this.selectClick);
         };

         this.removeSelectInteraction = function(){
             this.map.removeInteraction(this.selectClick);
         };


         this.getMap = function () {
             return this.map;
         };

         this.getView = function () {
             return this.view;
         };

         this.getClickecPos = function(){
             return clickedPos;
         };

         this.getLayerManager = function () {
             return this.layerManager;
         };

         this.getSelectClick = function () {
             return this.selectClick;
         };

         this.clickEvent = function (callback) {
             this.map.on('click', function (evt) {
                 clickedPos = evt.coordinate;
                 callback(evt);
             });
         };

         this.singleClickEvent = function (callback) {
             this.map.on('singleclick', function (evt) {
                 if ( selectedFeatures ) {
                     selectedFeatures.clear();
                 }
                 clickedPos = evt.coordinate;
                 callback(evt);
             });
         };


         this.selectFeatureEvent = function (callback) {
             this.selectClick.on('select', function (evt) {
                 selectedFeatures = evt.target.getFeatures();
                 callback(evt);
             });
         };

         this.addTrajectoryInteraction = function( callback ){

             this.removeTrajectoryInteraction();

             interactionStyleCallback = callback;

             var tempLineStyleFunction = function(feature) {
                 var geometry = feature.getGeometry();
                 var styles = [
                     // linestring
                     new ol.style.Style({
                         stroke: new ol.style.Stroke({
                             color: '#9F25B2',
                             width: 3
                         })
                     })
                 ];

                 var vertices = geometry.getCoordinates();

                 interactionStyleCallback( vertices );

                 /*
                 geometry.forEachSegment(function(start, end) {
                     var dx = end[0] - start[0];
                     var dy = end[1] - start[1];
                     var rotation = Math.atan2(dy, dx);
                     // arrows
                     styles.push(new ol.style.Style({
                         geometry: new ol.geom.Point(end),
                         image: new ol.style.Icon({
                             //  src: 'https://openlayers.org/en/v4.2.0/examples/data/arrow.png',
                             src: 'image/arrow.png',
                             anchor: [0.75, 0.5],
                             rotateWithView: true,
                             rotation: -rotation
                         })
                     }));
                 });
                 */

                 return styles;
             };


             var tempVtr = new ol.source.Vector();

             tempLineLayer = new ol.layer.Vector({
                 source: tempVtr,
                 style: tempLineStyleFunction
             });

             this.map.addLayer( tempLineLayer );

             tempLineInteract = new ol.interaction.Draw({
                 source: tempVtr,
                 type: /** @type {ol.geom.GeometryType} */ ('LineString')
             });

             this.map.addInteraction( tempLineInteract );
         };

         this.removeTrajectoryInteraction = function(){
             if( tempLineLayer ) {
                 this.map.removeLayer( tempLineLayer);
                 tempLineLayer = null;
             }
             if( tempLineInteract ) {
                 this.map.removeInteraction( tempLineInteract);
                 tempLineInteract = null;
                 this.map.render();
             }
         };

         return this;
     } // end of function MapManager(overlay, targetMap, view) {

     return function( overlay, cssMap ){
         return new MapManager( overlay, cssMap, createView( [3942321.454123089, 3792452.570684223], 15, 4, 8 ) );
     }

 }());
