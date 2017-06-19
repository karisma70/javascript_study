 /**
 * Created by Administrator on 2017-06-06.
 */


     // Iran, SaudiArabia , Turkey


 var bibleMapLayers = [
     { url : 'biblemap/110m-admin-0-countries', order: 1, style: {
             visibleRange : { max : 16, min : 1 },
             fillColor : 'rgba( 255, 255, 255, 0.001)',
             lineStroke : {  color: [174, 122, 40], width : 1, opacity: 0.01  },
             //textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'normal 17px 돋움', color: '#BBDBF5', outlineColor : 'black', outlineWidth : 3 }}
            // textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'Normal 17px Arial', color: "#6E6E6E" }}
             textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 14px 굴림', color: '#747374', outlineColor : 'white', outlineWidth : 1  }}
     },

     { url : 'biblemap/iran/Iran_AL2', order: 2, style: {
         visibleRange : { max : 16, min : 1 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [174, 122, 40], width : 1, opacity: 0.01  },
         //textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'normal 17px 돋움', color: '#BBDBF5', outlineColor : 'black', outlineWidth : 3 }}
         // textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'Normal 17px Arial', color: "#6E6E6E" }}
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 14px 굴림', color: '#747374', outlineColor : 'white', outlineWidth : 1  }}
     },

     { url : 'biblemap/saudiarabia/Saudi_Arabia_AL2', order: 3, style: {
         visibleRange : { max : 16, min : 1 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [174, 122, 40], width : 1, opacity: 0.01  },
         //textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'normal 17px 돋움', color: '#BBDBF5', outlineColor : 'black', outlineWidth : 3 }}
         // textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'Normal 17px Arial', color: "#6E6E6E" }}
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 14px 굴림', color: '#747374', outlineColor : 'white', outlineWidth : 1  }}
     },

     { url : 'biblemap/turkey/Turkey_AL2', order: 4, style: {
         visibleRange : { max : 16, min : 1 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [174, 122, 40], width : 1, opacity: 0.01  },
         //textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'normal 17px 돋움', color: '#BBDBF5', outlineColor : 'black', outlineWidth : 3 }}
         // textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'Normal 17px Arial', color: "#6E6E6E" }}
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 14px 굴림', color: '#747374', outlineColor : 'white', outlineWidth : 1  }}
     },

         ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
     { url : 'biblemap/History_12Sect', order: 5, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 8 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },
     */

     { url : 'biblemap/History_BC12', order: 6, style: {
         historyShow : 'false',
         visibleRange : { max : 16, min : 7 },
         fillColor : 'rgba( 255, 255, 255, 0.001)',
         lineStroke : {  color: [255, 255, 255], width : 0, opacity: 0.01  },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle' , font : 'bold 0px 굴림'  }}    // label 출력 안함
     },


     /*
     { url : 'biblemap/History_12Sect_poi', order: 18, style: {
         visibleRange : { max : 16 , min : 8 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'bold 15px 굴림', color: '#105602', outlineColor : 'white', outlineWidth : 2  }}
     },
     */

     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

     { url: 'biblemap/abraham_move',  order: 10, style: {
         visibleRange : { max : 16 , min : 9 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "#313132", outlineWidth : 3  } }
     },
     { url: 'biblemap/jesus_move',  order: 11, style: {
             visibleRange : { max : 16 , min : 11 },
             textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  }}
     },
     { url : 'biblemap/nature_poi_7_poi',  order: 12, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "#636364", outlineWidth : 3  } }
     },
     { url : 'biblemap/AD_level_7_poi',  order: 13, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "#636364", outlineWidth : 3  } }
     },
     { url : 'biblemap/AD_level_8_poi',  order: 14, style: {
         visibleRange : { max : 16 , min : 8 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "#49494A", outlineWidth : 3  } }
     },
     { url: 'biblemap/AD_israel_admin_poi',  order: 15, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'normal 13px 돋움', color: 'white', outlineColor : '#636364', outlineWidth : 4  }}
     },
     {
         url: 'biblemap/AD_admin_poi',  order: 16, style: {
         visibleRange : { max : 16 , min : 6 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'bold 15px 굴림', color: '#105602', outlineColor : 'white', outlineWidth : 2  }}
     },
     { url: 'biblemap/BC_admin_poi',  order: 17, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'bold 14px 굴림', color: '#033078', outlineColor : 'white', outlineWidth : 2  }}
     }

 ];


 var createTextStyleOfFeature = function( feature, resolution ){

     var featureStyle = feature.get('style');

     var textString = feature.get('name');
     if (textString) {
         return new ol.style.Text({
             textAlign: featureStyle.textStroke.align,
             textBaseline: featureStyle.textStroke.baseline,
             font: featureStyle.textStroke.font,
             text: feature.get('name'),
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
         totalCount : 15,
         poiLayer : {}
     };
 }

 LayerManager.prototype.getPoiByName = function( name ){
     return this.layerContainer.poiLayer[ name ];
 };

 LayerManager.prototype.getLayerContainer = function(){
     return this.layerContainer;
 }


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
    zoomIn += 1;

    if( zoomIn < 10 )
        zoomIn = 10;

    var parts = 2;
    var called = false;

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
             return -11;
         if( aID > bID )
             return 1;
         return 0;
     } );

     for( idx in layerContainer.layers ){
         console.log( "Inserted Layer ID : " + layerContainer.layers[idx].get( 'id'));
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


function MapManager( overlay, targetMap, view ){

    this.scaleLineControl = new ol.control.ScaleLine();
    this.scaleLineControl.setUnits("metric");

    this.layerManager = new LayerManager();

    this.view = view;

    this.clickedPos = null;

    this.map = new ol.Map({
        overlays: [overlay],
        target: targetMap,      // taret: 'map'
        controls: ol.control.defaults({
            attribution : false,
            attributionOptions:  ({    // @type {olx.control.AttributionOptions}
                collapsible: false
            }) }).
        extend([ new ol.control.FullScreen({
            source: 'fullscreen'
        }), this.scaleLineControl]),
        view: this.view
    });

    this.selectClick = new ol.interaction.Select({
        // layers: [ layer명 ]
        condition: ol.events.condition.click
    });

    this.map.addInteraction( this.selectClick );


    this.getMap = function(){
        return this.map;
    };


    this.getLayerManager = function(){
        return this.layerManager;
    };

    this.getSelectClick = function(){
        return this.selectClick;
    };

    this.clickEvent = function( callback ) {
        this.map.on('click', function (evt) {
            callback( evt );
        });
    };

    this.singleClickEvent = function( callback ) {
        this.map.on('singleclick', function (evt) {
            callback( evt );
        });
    };


    this.selectFeatureEvent = function( callback ){
        this.selectClick.on('select', function(e) {
            callback( e );
        });
    };

    return this;
}
