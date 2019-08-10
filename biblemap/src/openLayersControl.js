 /**
 * Created by Administrator on 2017-06-06.
 */

//  max : zoomIn       min : zoomOut
 var bibleMapPolygonLayers = [
     { url : '110m-admin-0-countries', order: 3, style: {
         historyShow : 'false',
         visibleRange : { max : 10, min : 1 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         //  lineStroke : {  color: [174, 122, 40], width : 1, opacity: 0.01  },
         lineStroke : {  color: [255, 255, 255], width : 1 , opacity: 0.01 },
         //textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 12px arial', color: '#2581D8', outlineColor : '#CECBCB', outlineWidth : 3  }}
         textStroke : { prop: 'label', align: 'center', baseline: 'middle' , font : 'normal 14px Nanum Gothic', color: '#F1EEEE', outlineColor : '#6d6954', outlineWidth : 3  }}
     },

     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

     { url : 'history/History_promise_canaan2', order: 5, style: {
         historyShow : 'false',
         visibleRange : { max : 9, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'history/History_12Sect', order: 6, style: {
         historyShow : 'false',
         visibleRange : { max : 11, min : 7 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },


     { url : 'history/History_BC12', order: 7, style: {
         historyShow : 'false',
         visibleRange : { max : 9, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'history/History_saul_king', order: 8, style: {
         historyShow : 'false',
         visibleRange : { max : 10, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'history/History_david_king', order: 9, style: {
         historyShow : 'false',
         visibleRange : { max : 9, min : 6 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },


     { url : 'history/History_divideIsrael', order: 10, style: {
         historyShow : 'false',
         visibleRange : { max : 10, min : 7 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'history/History_assyria', order: 11, style: {
         historyShow : 'false',
         visibleRange : { max : 9, min : 5 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },

     { url : 'history/History_BC6', order: 12, style: {
         historyShow : 'false',
         visibleRange : { max : 9, min : 5 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     }


 ];

 var bibleMapPointLayers = [


     { url: 'level_12_poi',  order: 19, style: {
         visibleRange : { max : 25 , min : 13.5 },
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 14px Nanum Gothic', color: "white", outlineColor : "black", outlineWidth : 3  },
         visibleRange3D : { max : 25 , min : 13.5 },
         font3D : 'normal 15px Nanum Gothic'
         }
     },

     { url: 'level_11_poi',  order: 20, style: {
         visibleRange : { max : 25 , min : 10.7 },
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 14px Nanum Gothic', color: "white", outlineColor : "black", outlineWidth : 3  },
         visibleRange3D : { max : 25 , min : 11 },
         font3D : 'normal 15px Nanum Gothic'
     }
     },


     { url: 'level_10_poi',  order: 21, style: {
         visibleRange : { max : 25 , min : 10 },
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 14px Nanum Gothic', color: "white", outlineColor : "black", outlineWidth : 3  },
         visibleRange3D : { max : 25 , min : 10.5 },
         font3D : 'normal 15px Nanum Gothic'
     }
     },


     { url : 'level_9_poi',  order: 22, style: {
         visibleRange : { max : 25 , min : 9.5 },
         // textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 12px Nanum Gothic', color: "white", outlineColor : "#9b490d", outlineWidth : 2  } }   // 191970
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 14px Nanum Gothic', color: "white", outlineColor : "black", outlineWidth : 2  },
         visibleRange3D : { max : 25 , min : 10 },
         font3D : 'normal 15px Nanum Gothic'
     }   // 191970
     },


     { url : 'level_8_poi',  order: 23, style: {
         visibleRange : { max : 25 , min : 8.7 },
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 14px Nanum Gothic', color: "white", outlineColor : '#033078', outlineWidth : 2  },
         visibleRange3D : { max : 25 , min :  9 },
         font3D : 'normal 15px Nanum Gothic'
     }  //3e636a
     },

     { url: 'history/History_12Sect_poi',  order: 24, style: {
         visibleRange : { max : 11.5, min : 8 },
         // textStroke : { prop: 'label', align: 'center', baseline: 'center', font : 'normal 13px Nanum Gothic', color: '#E7E5E5', outlineColor : '#5F0291', outlineWidth : 3  }}
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 15px Nanum Gothic', color: "#FFFFFF", outlineColor : "#5B2B29", outlineWidth : 2  },
         visibleRange3D : { max : 20 , min :  8 },
         font3D : 'normal 16px Nanum Gothic'
     }
     },


     { url : 'level_7_poi',  order: 25, style: {
         visibleRange : { max : 25 , min : 7 },
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 14px Nanum Gothic', color: "white", outlineColor : '#033078', outlineWidth : 2  },
         visibleRange3D : { max : 25 , min :  7 },
         font3D : 'normal 15px Nanum Gothic'
     }
     },


     { url: 'level_6_poi',  order: 26, style: {
         visibleRange : { max : 25 , min : 6 },
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 16px Nanum Gothic', color: '#E7E5E5', outlineColor : '#052FFF', outlineWidth : 2  },
         visibleRange3D : { max : 25 , min :  6 },
         font3D : 'normal 17px Nanum Gothic'
     }
     },

     {
         url: 'level_4_poi',  order: 27, style: {
         visibleRange : { max : 20 , min : 4 },
         textStroke : { prop: 'label', align: 'center', baseline: 'middle', font : 'normal 17px Nanum Gothic', color: "#E7E5E5", outlineColor : "#105602", outlineWidth : 2  },
         visibleRange3D : { max : 25 , min :  4 },
         font3D : 'normal 18px Nanum Gothic'
     }
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
 };

 function create3DPointStyleOfFeature( feature, resolution ){

     var featureStyle = feature.get('style');
     var coord = feature.getGeometry().getCoordinates();

     return new ol.style.Style({
         text: new ol.style.Text({
             text : feature.get('label'),
           //  font: featureStyle.textStroke.font,
             font : 'normal 15px Nanum Gothic',
             textAlign: 'bottom',
             textBaseline: 'middle',
             stroke: new ol.style.Stroke({
                 color: featureStyle.textStroke.outlineColor,
                 // width: featureStyle.textStroke.outlineWidth
                 width : 3
             }),
             fill: new ol.style.Fill({color: featureStyle.textStroke.color})
         })
     });

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

     this.historyPoi = new HistoryClickedPoi();
 }

 LayerManager.prototype.historyInsertPoi = function( poiObj ) {
     this.historyPoi.insertPoi( poiObj );
 };

 LayerManager.prototype.historyPrevPoi = function() {
     return this.historyPoi.prevPoi();
 };

 LayerManager.prototype.historyNextPoi = function() {
     return this.historyPoi.nextPoi();
 };

 LayerManager.prototype.historyCurrentPoi = function() {
     return this.historyPoi.getCurrentPoi();
 };

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
         alert( "cannot find getPoiObjById(" + id + ")  ===>  poiDicObjects.length : " + this.layerContainer.poiDicObjects.length );
         return null;
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


 LayerManager.prototype.getPoiObjByPlaceAndTitle = function( place, title ){

     if( this.layerContainer.poiDictionary.hasOwnProperty( place ) == false) {
         return null;
     }

     var poiArray = this.layerContainer.poiDictionary[ place ].poiArray;

     if( poiArray.length > 1 ) {
         for (var pIdx in poiArray) {
             var poiObj = poiArray[pIdx];
             if( poiObj.title == title ){
                return poiObj;
             }
         }
        return null;
     }else{
         return poiArray[0];
     }

 };

 LayerManager.prototype.findPoiObjByBibleTitleAndWord = function( bibleTitle, poiWord ){
     if( poiWord == "벧스안"){
         ConsoleLog("Debug Here!!!");
     }

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
                     if( bibleTitle != undefined ) {
                         if (bibleTitle == rangeArray[rIdx])
                             return poiObj;
                     }else{
                         // return poiObj;
                         return null;
                     }

                 }
             }
         }
         return null;
     }else{
         var poiObj = poiArray[0];
         var rangeArray = poiObj.rangeArray;
         if (rangeArray) {
             for (var rIdx in rangeArray) {
                 if( bibleTitle != undefined ) {
                     if (bibleTitle == rangeArray[rIdx])
                         return poiObj;
                 }else{
                 return poiObj;
                }
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

 LayerManager.prototype.getPoiDictionaryObj = function(){
     return this.layerContainer.poiDictionary;
 };

LayerManager.prototype.getPoiObjects = function(){
    return this.layerContainer.poiDicObjects;
};


/*
 function createOverlay( divID ){    // container
     var overlay = new ol.Overlay( ({
         element: divID,
         autoPan: true,
         autoPanAnimation: {
             duration: 250
         }
     }));
     return overlay;
 }
*/

function flyTo( view, location, zoomIn, done) {
    zoomIn = Math.floor( zoomIn );
    var duration = 2000;
    var zoom = view.getZoom();
    var center = view.getCenter();
    var parts = 2;
    var called = false;

    var dist = getDistance( center[0], center[1], location[0], location[1] );
    duration = dist / 1000;
    if( duration < 1200 )
        duration = 1200;
    if( duration > 1500 )
        duration = 1500;

    var adjustZoom = dist / 400000;
    adjustZoom = Math.ceil( adjustZoom );
    var topZoom = zoom - adjustZoom;

    if( topZoom < 6 )
        topZoom = 6;
    if( topZoom > 10  )
        topZoom = 10;

    // if( topZoom > (zoom -1) )
     //   topZoom = zoom -1;

    ConsoleLog( "duration : " + duration + "adjustZoom : " + adjustZoom + "topZoom : " + topZoom );

    // zoomIn += 1;

    /*
    if( zoomIn < 8 )
        zoomIn = 8;
        */

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


    // var topZoom = zoom - 1;
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
/*
    zoomIn = Math.floor( zoomIn );

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
    */

    _moveTo( view, location, zoomIn, 1000, done ) ;

}

 function _moveTo( view, location, zoomIn, duration, done ) {

     // if( zoomIn < 10 )
     //  zoomIn = 10;

//     zoomIn = Math.floor( zoomIn );

     _moveToPos( view, location, zoomIn, duration, done );

     /*
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
         duration: duration
     }, callback );
     */
 }


 function _moveToPos( view, location, zoomIn, duration, done ) {
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
         duration: duration
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


 function gotoHome_( view2D, view3D ){

     moveTo( view2D, [3937988, 3763366 ], 7 );
     moveTo( view3D, [3937988, 3763366 ], 9 );
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

     /*
     var iconLayer = null;
     var iconFeature = null;
     var iconStyle = null;
     */
     var iconLayer = null;

     var tempLineLayer = null;
     var tempLineInteract = null;
     var bingMapSource = null;
     var bingMapDrawInter = null;

     var scrollDelta = 0.5;

     function MapManager(overlay, targetMap, view) {
         this.scaleLineControl = new ol.control.ScaleLine();
         this.scaleLineControl.setUnits("metric");

         this.layerManager = new LayerManager();
         this.view = view;
         this.mapExtent = null;

         this.iconFeature = null;

         this.bingMapAerialLayer = null;
         this.bingMapAerialLabelLayer = null;

         var collControls = new ol.Collection();

         var bingmap2D = 'Amq6dYDdEZuW4uVXyTa6qOxJgqzlEBPNiUhJaWJDEXRa5BzPGl5XuAmSZX-fujw9';


         if( overlay !== undefined && overlay != null ){
             this.map = new ol.Map({
                 overlays: [overlay],
                 target: targetMap,      // taret: 'map'

                 controls: collControls.extend([ this.scaleLineControl ]),
           //      interactions: ol.interaction.defaults( {mouseWheelZoom: false }),
                 // interactions: [ interactions ],
                 interactions: [ new ol.interaction.MouseWheelZoom({
                     duration: 500,
                 }), new ol.interaction.DragPan({
                     kinetic: new ol.Kinetic(-0.01, 0.1, 200)
                 }) ],
                 view: this.view
             });
         }else{
             this.map = new ol.Map({
                 target: targetMap,      // taret: 'map'
                 controls: collControls.extend([ this.scaleLineControl ]),
                 // controls : [ ],
                 view: this.view
             });
         }

         this.mapExtent = this.map.getView().calculateExtent( this.map.getSize());
         this.mapExtent[0]= this.mapExtent[0] - 190000;
         this.mapExtent[1]= this.mapExtent[1] - 190000;
         this.mapExtent[2]= this.mapExtent[2] + 190000;
         this.mapExtent[3]= this.mapExtent[3] + 190000;

         this.getMapBaseExtent = function(){
           return this.mapExtent;
         };

         bibleMap = this.map;

         this.InitWmsLayer = function( ) {
             // var wmsDemLayer = createLayer( new ol.source.Stamen( { layer: 'terrain-background' }) ) ;

             this.bingMapAerialLayer = new ol.layer.Tile({
                 visible: false,
                 preload: Infinity,
                 source: new ol.source.BingMaps({
                     key: bingmap2D,
                     imagerySet: "Aerial"
                 })
             });

             this.bingMapAerialLayer.set('id', 1, false);
             this.bingMapAerialLayer.set('visibleRange', {max: 18, min: 1});
             this.bingMapAerialLayer.setVisible( true );
             this.map.addLayer( this.bingMapAerialLayer );

             this.bingMapAerialLabelLayer = new ol.layer.Tile({
                 visible: false,
                 preload: Infinity,
                 source: new ol.source.BingMaps({
                     key: bingmap2D,
                     imagerySet: "AerialWithLabels",
                     culture : "ko"
                 })
             });

             this.bingMapAerialLabelLayer.set('id', 2, false);
             this.bingMapAerialLabelLayer.set('visibleRange', {max: 18, min: 1});
             this.bingMapAerialLabelLayer.setVisible( false );
             this.map.addLayer( this.bingMapAerialLabelLayer );
         };

         this.InitWmsLayer();


         this.showWithLabel = function( isShow ){
             if( isShow == true ){
                 this.bingMapAerialLabelLayer.setVisible( true );
                 this.bingMapAerialLayer.setVisible( false );
             }else{
                 this.bingMapAerialLabelLayer.setVisible( false );
                 this.bingMapAerialLayer.setVisible( true );
             }
             // this.map.updateSize();
             this.map.render();
         };

         this.zoomIn = function() {
             var zoom = this.view.getZoom();
             var center = this.view.getCenter();

             _moveTo( this.view, center, zoom+1, 200);
         };

         this.zoomOut = function() {
             var zoom = this.view.getZoom();
             var center = this.view.getCenter();

             _moveTo( this.view, center, zoom-1, 200 );
         };


         this.mapEventPrecompose = function (callBack) {
             this.map.on('precompose', function (evt) {
                 if( bibleMap == null )
                     return;

                 var zoom = bibleMap.getView().getZoom();
                 var layers = bibleMap.getLayers();

                 layers.forEach(function (layer) {

                     var visibleRange = layer.get('visibleRange');
                     if (typeof visibleRange !== "undefined") {

                         if (layer.get('id') != 1 && layer.get('id') != 2){

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

                     }
                 });

                 callBack(evt);
             });
         };


         this.mapEventPostcompose = function( callback ){
             this.map.on('postcompose', function(evt){
                 callback( evt );
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
                 type: ('LineString')
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

         this.setIconPosByPoi = function( poiObj ){
             if( iconLayer == null ){
                 this.createPoiIcon( poiObj );
             }else{
                 this.iconFeature.getGeometry().setCoordinates( [poiObj.x, poiObj.y]);
                 this.iconFeature.setProperties({  'id' : poiObj.id,
                     'label' : poiObj.biblePlace });

                 this.map.render();
             }
         };


         this.createPoiIcon = function( poiObj ){
             this.iconFeature = new ol.Feature({
                 geometry: new ol.geom.Point([poiObj.x, poiObj.y]),
                 // name: poiObj.biblePlace,
                 population: 4000,
                 rainfall: 500
             });

             var iconStyle = new ol.style.Style({
                 image: new ol.style.Icon( ({
                     // anchor: [0.5, 46],
                     // anchor: [0.55, 34],
                     anchor: [0.50, 270],
                     anchorXUnits: 'fraction',
                     anchorYUnits: 'pixels',
                     // src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                     // size : [ 50, 50 ],
                     scale: 0.14,
                     src: 'biblemap/image/poi_location.png'
                 }))
             });


             this.iconFeature.setProperties({  'id' : poiObj.id,
                                        'label' : poiObj.biblePlace });

             this.iconFeature.setStyle(iconStyle);

             var iconVectorSource = new ol.source.Vector({
                 features: [ this.iconFeature ]
             });

             iconLayer = new ol.layer.Vector({
                 source: iconVectorSource
             });
             iconLayer.setVisible( true );
             iconLayer.setZIndex( 1000 );

             this.map.addLayer( iconLayer );
             this.map.render();
         };

         return this;
     } // end of function MapManager(overlay, targetMap, view) {

     return function( overlay, cssMap ){
         // return new MapManager( overlay, cssMap, createView( [3942321.454123089, 3792452.570684223], 15, 4, 8 ) );
         //return new MapManager( overlay, cssMap, createView( [3844176, 3806822], 15, 4, 7 ) );
         return new MapManager( overlay, cssMap, createView( [3937988, 3763366 ], 17, 4, 7.4 ) );
     }

 }());


 function createSpirographEntity(url, longitude, latitude, height, radiusMedian, radiusSubCircle, durationMedianCircle, durationSubCircle) {
     var centerPosition = Cesium.Cartographic.fromDegrees(longitude, latitude, height);
     var spirographPositionProperty = new Cesium.SpirographPositionProperty(centerPosition, radiusMedian, radiusSubCircle,
         durationMedianCircle, durationSubCircle, cesiumViewer.scene.globe.ellipsoid);

     cesiumViewer.entities.add({
         name: url,
         description: 'It is supposed to have a useful desciption here<br />but instead there is just a placeholder to get a larger info box',
         position: spirographPositionProperty,
         orientation: new Cesium.VelocityOrientationProperty(spirographPositionProperty, cesiumViewer.scene.globe.ellipsoid),
         model: {
             uri: url,
             minimumPixelSize: 96
         }
     });
 }


 function set3DGroundLayer( layer ) {

     if( layer == null )
         return;

     var source = layer.getSource();
     var features = source.getFeatures();
     for (var idx = 0; idx < features.length; idx++) {
         var feature = features[idx];
         feature.getGeometry().set('altitudeMode', 'clampToGround');
     }
 }



 findPoiByCoord = function( curZoom, coordX, coordY, poiArray ) {

     var minDist = 9999999;
     var retObj = null;

     var tolerancePoiPos = 3500;

     for (var idx in poiArray ) {

         var obj = poiArray[idx];

         if( window.focusPoiObj.id == obj.id ){
             if (IsWithinTolerance(coordX, coordY, obj.x, obj.y, tolerancePoiPos + 100) == true) {
                 var dist = getDistance(coordX, coordY, obj.x, obj.y);
                 if (dist < minDist) {
                     minDist = dist;
                     retObj = obj;
                 }
             }
         }else{
             if (obj.zoomIn3D - 0.5 < curZoom) {
                 if (IsWithinTolerance(coordX, coordY, obj.x, obj.y, tolerancePoiPos) == true) {
                     var dist = getDistance(coordX, coordY, obj.x, obj.y);
                     if (dist < minDist) {
                         minDist = dist;
                         retObj = obj;
                     }
                 }
             }
         }
     }  // end of for

     if( retObj ){
         ConsoleLog( "Find POI : " + retObj.biblePlace );
     }

     return retObj;
 };


 var createLandmarkFeature = function( name, posX, posY ){
     var iconStyle = new ol.style.Style({
         image: new ol.style.Icon( ({
             anchor: [0.5, 46],
             size: [20, 20],
             scale: 0.15,
             anchorXUnits: 'fraction',
             anchorYUnits: 'pixels',
             // opacity: 0.75,
             // src: 'data/icon.png'
             src: 'biblemap/image/location2.png'
         })),
         text: new ol.style.Text({
             text: name,
             font: 'bold 16px Nanum Gothic',
             textAlign: 'bottom',
             textBaseline: 'middle',
             stroke: new ol.style.Stroke({
                 color: 'rgb(255, 255, 255)',
                 width: 3
             }),
             fill: new ol.style.Fill({
                 //color: 'rgba(0, 0, 155, 0.3)'
                 color: 'rgb(0, 0, 0)'
             })
         })
     });

     var landmarkFeature = new ol.Feature({
         geometry: new ol.geom.Point([posX, posY])
     });
     landmarkFeature.getGeometry().set('altitudeMode', 'clampToGround');
     landmarkFeature.setStyle(iconStyle);

     return landmarkFeature;
 };

 var createLandmarkLayer = function( features ){

     if( feature ) {
         var vectorSource = new ol.source.Vector({
             features: features
         });
         var imageVectorSource = new ol.source.ImageVector({
             source: vectorSource
         });
         var landmarkLayer = new ol.layer.Image({
             source: imageVectorSource
         });

         return landmarkLayer;
     }

     return null;
 };



 var init3dMap = ( function(){


     var mapView = null;
     var selectedFeatures = null;
     var scene3D = null;
     var staticOverlay = null;

     var iconLayer = null;


     var bigmap3D = 'Amq6dYDdEZuW4uVXyTa6qOxJgqzlEBPNiUhJaWJDEXRa5BzPGl5XuAmSZX-fujw9';

     var terrainUrl = 'https://api.maptiler.com/tiles/terrain-quantized-mesh/?key=';

     var terrainKey =  'krAsku17I6HXcHMQKXKN';


     var createLabelLayer = function( name, posX, posY ){

         var iconStyle = new ol.style.Style({
             image: new ol.style.Icon( ({
                 anchor: [0.5, 46],
                 size: [20, 20],
                 scale: 0.15,
                 anchorXUnits: 'fraction',
                 anchorYUnits: 'pixels',
                 // opacity: 0.75,
                 // src: 'data/icon.png'
                 src: 'biblemap/image/location2.png'
             })),
             text: new ol.style.Text({
                 text: name,
                 font: 'bold 16px Nanum Gothic',
                 textAlign: 'bottom',
                 textBaseline: 'middle',
                 stroke: new ol.style.Stroke({
                     color: 'rgb(255, 255, 255)',
                     width: 3
                 }),
                 fill: new ol.style.Fill({
                     //color: 'rgba(0, 0, 155, 0.3)'
                     color: 'rgb(0, 0, 0)'
                 })
             })
         });

         var labelFeature = new ol.Feature({
             geometry: new ol.geom.Point([posX, posY])
         });
         labelFeature.getGeometry().set('altitudeMode', 'clampToGround');
         labelFeature.setStyle(iconStyle);

         var vectorSource = new ol.source.Vector({
             features: [labelFeature ]
         });
         var imageVectorSource = new ol.source.ImageVector({
             source: vectorSource
         });
         var labelLayer = new ol.layer.Image({
             source: imageVectorSource
         });

         return labelLayer;
     };


     var createMap3D = function( overlay ) {
         this.view = null;
         this.map = null;
         this.layers = [];
         this.labelLayer = null;

         this.pathLayer = null;

         this.addLayerCursor = -10;
         this.setGroundLayerCursor = 0;
         staticOverlay = overlay;
         staticOverlay = overlay;
         this.overlay = overlay;

         this.iconFeature = null;

         this.bingMapAerialLayer = null;
         this.bingMapAerialLabelLayer = null;

         this.memWholeLayerAddToMap = function(){
             for( var idx = 0 ; idx < this.layers.length; idx ++  ) {
                 var layer = this.layers[ idx ];
                 var id = layer.get("id");
                 this.map.addLayer(layer);
              }
             map3D.view3DTilt(1.1);
         };

         this.memLayerAddToMapOneByOne = function(){

             ConsoleLog( "memLayerAddToMapOneByOne( " + this.addLayerCursor + " ).........");

             if( this.addLayerCursor == -10 ) {
                 // map3D.view3DTilt(1.1);
                 this.addLayerCursor = this.layers.length-1 ;
             }

             if( this.addLayerCursor >= 0 ) {
                 var layer = this.layers[this.addLayerCursor];

                 var id = layer.get("id");

                 this.map.addLayer(layer);

                 if( this.addLayerCursor == this.layers.length-1 ) {
                     // map3D.view3DTilt(1.1);
                 }

                 map3D.view3DTilt( 0.13);

                 this.addLayerCursor--;
                 return false;
             }else{
                 return true;
             }
         };


         this.setGroundWholeLayer = function(){

             for( var idx = 0; idx < this.layers.length; idx ++  ) {
                 var layer = this.layers[idx];
                 set3DGroundLayer( layer );
             }

             if( iconLayer != null ){
                 set3DGroundLayer( iconLayer );
             }
         };


         this.view = new ol.View({
             center: [3844176, 3806822],
             maxZoom: 19,
             minZoom: 5,
             zoom: 7
         });

         mapView = this.view;

         this.map = new ol.Map({
             overlays: [ overlay ],

             // target: 'map3D',
             target: 'behindMap2D',
             controls: ol.control.defaults({
                 attribution: false,
                 attributionOptions: ({    // @type {olx.control.AttributionOptions}
                     collapsible: false
                 }) }),
             interactions: ol.interaction.defaults( {mouseWheelZoom: false }),

             view: this.view
         });

         this.initWmsLayer3D = function() {

             this.bingMapAerialLayer = new ol.layer.Tile({
                 visible: false,
                 preload: Infinity,
                 source: new ol.source.BingMaps({
                     key: bigmap3D,
                     imagerySet: "Aerial"
                 })
             });

             this.bingMapAerialLayer.set('id', 1, false);
             this.bingMapAerialLayer.set('visibleRange', {max: 19, min: 1});
             this.bingMapAerialLayer.setVisible(true);
             this.map.addLayer(this.bingMapAerialLayer);

             this.bingMapAerialLabelLayer = new ol.layer.Tile({
                 visible: false,
                 preload: Infinity,
                 source: new ol.source.BingMaps({
                     key: bigmap3D,
                     // imagerySet: "Aerial"
                     imagerySet: "AerialWithLabels",
                     culture: "ko"
                 })
             });

             this.bingMapAerialLabelLayer.set('id', 2, false);
             this.bingMapAerialLabelLayer.set('visibleRange', {max: 19, min: 1});
             this.bingMapAerialLabelLayer.setVisible(false);
             this.map.addLayer(this.bingMapAerialLabelLayer);
         };

         this.initWmsLayer3D();

         map2DMap = this.map;

         this.showWithLabel = function( isShow ){
             if( isShow == true ){
                 this.bingMapAerialLabelLayer.setVisible( true );
                 this.bingMapAerialLayer.setVisible( false );
             }else{
                 this.bingMapAerialLabelLayer.setVisible( false );
                 this.bingMapAerialLayer.setVisible( true );
             }
             // this.map.updateSize();
             this.map.render();
         };

         this.map.getInteractions().forEach(function(interaction) {
             if (interaction instanceof ol.interaction.MouseWheelZoom) {
                 interaction.setActive(false);
             }
         }, this);

         // this.map.addOverlay( staticOverlay );

         this.selectClick = new ol.interaction.Select({
             // layers: [ layer명 ]
             condition: ol.events.condition.click
         });
         this.map.addInteraction(this.selectClick);
         this.addSelectInteraction = function(){
             this.map.addInteraction(this.selectClick);
         };

         this.selectFeatureEvent = function (callback) {
             this.selectClick.on('select', function (evt) {
                 selectedFeatures = evt.target.getFeatures();
                 callback(evt);
             });
         };


         this.ol3d = new olcs.OLCesium({map: this.map,
             time : function(){
                 const d = new Date();
                 d.setUTCHours( 14 );
                 return Cesium.JulianDate.fromDate(d);
             },
             target: 'map3D'});

         this.ol3dScene = this.ol3d.getCesiumScene();
         // this.ol3dScene.screenSpaceCameraController.minimumZoomDistance = 0.01;
         // this.ol3dScene.screenSpaceCameraController.maximumZoomDistance = 1.0;
         // this.ol3dScene.screenSpaceCameraController.inertiaZoom = 10.0;

         this.ol3dScene.screenSpaceCameraController.enableZoom = false;         // Wheel ZoomIn / ZoomOut 막기

         // this.ol3dScene.skyBox.show = false;   // 동작하지 않음
         // this.ol3dScene.scene.fxaa = false;         // 동작하지 않음

         this.ol3dScene.globe.enableLighting = false;
         this.ol3dScene.skyAtmosphere.show = true;
         this.ol3dScene.fog.enabled = false;
         this.ol3dScene.globe.showWaterEffect = true;
         this.ol3dScene.backgroundColor = Cesium.Color.BLACK;
         this.ol3dScene.globe.baseColor = Cesium.Color.BLACK;

         scene3D = this.ol3dScene;
         this.camera = this.ol3dScene.camera;

         var  depthTest = this.ol3dScene.globe.depthTestAgainstTerrain;
         ConsoleLog( "depthTest : " + depthTest);

         ///////////////////////////////////////////////////////////

         this.setIconPosByPoi = function( poiObj ){
             if( iconLayer == null ){
                 this.createPoiIcon( poiObj );
                 set3DGroundLayer( iconLayer );
             }else{
                 this.iconFeature.getGeometry().setCoordinates( [poiObj.x, poiObj.y]);
                 this.iconFeature.setProperties({  'id' : poiObj.id,
                     'label' : poiObj.biblePlace });

                 set3DGroundLayer( iconLayer );
                 this.map.render();
             }
         };


         this.createPoiIcon = function( poiObj ){
             this.iconFeature = new ol.Feature({
                 geometry: new ol.geom.Point([poiObj.x, poiObj.y]),
                 // name: poiObj.biblePlace,
                 population: 4000,
                 rainfall: 500
             });

             var iconStyle = new ol.style.Style({
                 image: new ol.style.Icon( ({
                     // anchor: [0.5, 46],
                     // anchor: [0.55, 34],
                     anchor: [0.50, 0],
                     anchorXUnits: 'fraction',
                     anchorYUnits: 'pixels',
                     // src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                     // size : [ 50, 50 ],
                     scale: 0.14,
                     src: 'biblemap/image/poi_location.png'
                 }))
             });


             this.iconFeature.setProperties({  'id' : poiObj.id,
                 'label' : poiObj.biblePlace });

             this.iconFeature.setStyle(iconStyle);

             var iconVectorSource = new ol.source.Vector({
                 features: [ this.iconFeature ]
             });

             iconLayer = new ol.layer.Vector({
                 source: iconVectorSource
             });
             iconLayer.setVisible( true );
             iconLayer.setZIndex( 1000 );

             set3DGroundLayer( iconLayer );

             this.map.addLayer( iconLayer );
             this.map.render();
         };

         ///////////////////////////////////////////////////////////

         const iconFeature = new ol.Feature({
             geometry: new ol.geom.Point([700000, 200000, 100000])
         });


         const iconStyle = new ol.style.Style({
             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                 anchor: [0.5, 46],
                 anchorXUnits: 'fraction',
                 anchorYUnits: 'pixels',
                 opacity: 0.75,
                 src: 'biblemap/image/location2.png'
             })),
             text: new ol.style.Text({
                 text: 'Some text',
                 textAlign: 'center',
                 textBaseline: 'middle',
                 stroke: new ol.style.Stroke({
                     color: 'magenta',
                     width: 3
                 }),
                 fill: new ol.style.Fill({
                     color: 'rgba(0, 0, 155, 0.3)'
                 })
             })
         });

         iconFeature.setStyle(iconStyle);

         const vectorSource2 = new ol.source.Vector({
             features: [iconFeature]
         });

         const imageVectorSource = new ol.source.ImageVector({
             source: vectorSource2
         });

         const vectorLayer2 = new ol.layer.Image({
             source: imageVectorSource
         });


         this.map.addLayer( vectorLayer2 );
         ///////////////////////////////////////////////////////////


         const eventHandler = new Cesium.ScreenSpaceEventHandler( this.ol3dScene.canvas );
         this.map3DClick = function( callback ){
             eventHandler.setInputAction(
                 function( event ) {

                     if (event.position.x === 0 && event.position.y === 0) {
                         return;
                     }

                     const ray = scene3D.camera.getPickRay(event.position);
                     const cartesian = scene3D.globe.pick(ray, scene3D);
                     if (!cartesian) {
                         return;
                     }
                     const cartographic = scene3D.globe.ellipsoid.cartesianToCartographic(cartesian);
                     var coords = [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];

                     const height = scene3D.globe.getHeight(cartographic);
                     if (height) {
                         coords = coords.concat([height]);
                     }

                     const mapCoords = ol.proj.transform(coords, ol.proj.get('EPSG:4326'), 'EPSG:3857');
                     //         staticOverlay.setPosition( mapCoords );
                     if( callback )
                         callback( mapCoords[0], mapCoords[1] );
                 },
                 Cesium.ScreenSpaceEventType['LEFT_CLICK'] );

         };


         var dvMap3D = document.getElementById('map3D');
         dvMap3D.addEventListener("wheel", function(evt){
             ConsoleLog( evt.deltaY );

             var zoom = mapView.getZoom();
             var center = mapView.getCenter();

             if( evt.deltaY == 0)
                 return;

             if( evt.deltaY > 0 )
                _moveTo( mapView, center, zoom-0.25, 1);
             else
                 _moveTo( mapView, center, zoom+0.25, 1);

         });


         this.mapWheel = function( callback ){
             eventHandler.setInputAction(
                 function( event ) {

                     if( callback )
                         callback();
                 },
                 Cesium.ScreenSpaceEventType['WHEEL'] );
         };


          this.getMapCoordFromFeature = function( feature ){

             var coord = feature.getGeometry().getCoordinates();

             var mapCoords = ol.proj.transform( coord, ol.proj.get('EPSG:3857'), 'EPSG:4326');

             var cartographic = Cesium.Cartographic.fromDegrees(mapCoords[0], mapCoords[1]);
             var height = scene3D.globe.getHeight(cartographic);

             if (height) {
                 mapCoords = mapCoords.concat([height]);
             }

             return ol.proj.transform( mapCoords, ol.proj.get('EPSG:4326'), 'EPSG:3857');
         };


         //this.ol3dScene.screenSpaceCameraController.minimumZoomDistance = 1000;
         this.ol3dScene.screenSpaceCameraController.minimumZoomDistance = 200;

         this.ol3dScene.screenSpaceCameraController.maximumZoomDistance = 4000000;
         this.ol3dScene.screenSpaceCameraController._minimumZoomRate = 0.3; // ←

         var terrainSupplier = terrainUrl + terrainKey;
         // var terrainSupplier =terrainUrl;

         var terrainProvider = new Cesium.CesiumTerrainProvider({
             // url: '//assets.agi.com/stk-terrain/world',
             // url: '//assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
             // url : 'https://maps.tilehosting.com/data/hillshades/{z}/{x}/{y}.png?key=8wUwkK3l8MrAH6eKz5Dd',
              //  url : 'https://maps.tilehosting.com/data/terrain-quantized-mesh/{z}/{x}/{y}.terrain?key=8wUwkK3l8MrAH6eKz5Dd',
             url: terrainSupplier,
             requestWaterMask : true,
             requestVertexNormals: true
             // requestWaterMask : true
         });


         // var terrainProvider = Cesium.createWorldTerrain();

         this.ol3dScene.terrainProvider = terrainProvider;

         this.ol3d.setEnabled(true);
         // this.ol3d.setEnabled( false );
         // window.map2 = ol3d;

         //var rmCesiumAttr = function(){
         $e = $('.cesium-credit-textContainer');
         $e.parent().remove();
         $e.remove();

         this.view3DTilt = function( angle ){

             var pivot = olcs.core.pickBottomPoint(this.ol3dScene);
             if (!pivot) {
                 // Could not find the bottom point
                 return;
             }

             // var angle = 0.9;
             var options = {};
             var transform = Cesium.Matrix4.fromTranslation(pivot);
             var axis = this.camera.right;
             var rotateAroundAxis = olcs.core.rotateAroundAxis;
             rotateAroundAxis( this.camera, -angle, axis, transform, options);

             ConsoleLog( "pivot " + pivot.x + "," + pivot.y + ", " + pivot.z + ",  axix " + axis.x + ", " + axis.y + ", " + axis.z );
         };

         this.view3DTilt_ = function( angle, pivot ){
             var options = {};
             var axis = this.camera.right;
             var transform = Cesium.Matrix4.fromTranslation(pivot);
             var rotateAroundAxis = olcs.core.rotateAroundAxis;
             rotateAroundAxis( this.camera, -angle, axis, transform, options);
         };


         this.create3DLabelLayer = function( name, posX, posY ){

             this.remove3DLabelLayer();

             this.labelLayer = createLabelLayer( name, posX, posY );
             this.map.addLayer( this.labelLayer );
         };

         this.remove3DLabelLayer = function(){
             if( this.labelLayer ) {
                 this.map.removeLayer(this.labelLayer);
                 this.labelLayer = null;
             }
         };


         this.clickEvent = function (callback) {
             this.map.on('click', function (evt) {
                 clickedPos = evt.coordinate;
                 callback(evt);
             });
         };

         this.zoomIn = function() {
             var zoom = this.view.getZoom();
             var center = this.view.getCenter();

             _moveTo( this.view, center, zoom+1, 200);
         };

         this.zoomOut = function() {
             var zoom = this.view.getZoom();
             var center = this.view.getCenter();

             _moveTo( this.view, center, zoom-1, 200 );
         };

         this.addPathLayer = function( pathLayer ){

             this.removePathLayer();

             this.pathLayer = pathLayer;
             this.map.addLayer( this.pathLayer );

             this.pathLayer.setZIndex(19);

             set3DGroundLayer( this.pathLayer );
         };

         this.removePathLayer = function() {
             if (this.pathLayer) {
                 this.map.removeLayer(this.pathLayer);
                 this.pathLayer = null;
             }
         };

         this.getPathLayer = function(){
             if( this.pathLayer )
                 return this.pathLayer;

             return null;
         };


         this.createLandMarkOfPath = function( popupPoiArray ){
             var poiObj = popupPoiArray[0];
             //this.create3DLabelLayer( name, posX, posY );
             this.create3DLabelLayer( poiObj.biblePlace, poiObj.x, poiObj.y );
         };

         this.getMap = function () {
             return this.map;
         };


         this.mapEventPrecompose = function (callBack) {

             this.map.on('precompose', function (evt) {

                 var zoom = mapView.getZoom();
                 var layers = map2DMap.getLayers();

                 layers.forEach(function (layer) {

                     var visibleRange = layer.get('visibleRange3D');

                     if (layer.get('id') != 1 && layer.get('id') != 2) {
                         if (typeof visibleRange !== "undefined") {
                             if (typeof( zoom ) != 'undefined') {
                                 if (visibleRange.min <= (zoom - 0.7) && (zoom - 0.7 ) <= visibleRange.max) {
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
                                 } else {
                                     layer.setVisible(false);
                                 }

                             } else {
                                 layer.setVisible(true);
                             }

                         }
                     }
                 });

                 if( callBack )
                     callBack(evt);
             });
         };     // end of this.mapEventPrecompose

     };  // behindInit2DMap


     return function( overlayPopup ){

         return new createMap3D(  overlayPopup );
     }

 }());



function Create3DPOIFeature( prop, posX, posY ){

     var textFeature = new ol.Feature({
         geometry: new ol.geom.Point([ posX, posY ])
     });


    var textStyle = new ol.style.Style({
        text: new ol.style.Text({
            // font : 'normal 15px Nanum Gothic',
            font : prop.style.font3D,
            //text: labelText,
            text: prop.label,
            fill : new ol.style.Fill( {
                //color: '#FFFFFF'
                color: prop.style.textStroke.color
            }),
            textAlign: 'center',
            textBaseline: 'middle',
            stroke: new ol.style.Stroke({
                // color: '#105602',
                color: prop.style.textStroke.outlineColor,
              //  width: 3
                width : prop.style.textStroke.outlineWidth
            })
        })
    });

     textFeature.setStyle( textStyle );

     return textFeature;
 }

 // textStroke : { prop: 'label', align: 'center', baseline: 'middle' , font : 'normal 14px Nanum Gothic', color: '#F1EEEE', outlineColor : '#6d6954', outlineWidth : 3  }}