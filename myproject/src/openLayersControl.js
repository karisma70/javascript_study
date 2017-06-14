 /**
 * Created by Administrator on 2017-06-06.
 */

 var bibleMapLayers = [
     { url : 'biblemap/110m-admin-0-countries', order: 1, style: {
             visibleRange : { max : 16, min : 1 },
             fillColor : 'rgba( 255, 255, 255, 0.001)',
             lineStroke : {  color: [183, 181, 181], width : 2, opacity: 0.01  },
             //textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'normal 17px 돋움', color: '#BBDBF5', outlineColor : 'black', outlineWidth : 3 }}
            // textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'Normal 17px Arial', color: "#6E6E6E" }}
                textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 15px 돋움', color: 'white', outlineColor : '#5C5C5C', outlineWidth : 4 }}
     },
     { url: 'biblemap/israel_pale/river_polyline',  order: 2, style: {
             visibleRange : { max : 16,  min : 8 },
             fillColor : 'rgba(0, 0, 255, 0.01)',
             lineStroke : {  color: [134, 211, 249], width : 2, opacity: 0.001  }    }
     },
     { url: 'biblemap/abraham_move',  order: 3, style: {
         visibleRange : { max : 16 , min : 9 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  } }
     },
     { url: 'biblemap/jesus_move',  order: 3, style: {
             visibleRange : { max : 16 , min : 11 },
             textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  }}
     },
     { url : 'biblemap/AD_level_7_poi',  order: 4, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  } }
     },
     { url : 'biblemap/AD_level_8_poi',  order: 5, style: {
         visibleRange : { max : 16 , min : 8 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'normal 13px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  } }
     },
     { url: 'biblemap/AD_israel_admin_poi',  order: 6, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'normal 13px 돋움', color: 'white', outlineColor : '#4C4B4B', outlineWidth : 4  }}
     },
     {
         url: 'biblemap/AD_admin_poi',  order: 6, style: {
         visibleRange : { max : 16 , min : 6 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'normal 13px 돋움', color: 'white', outlineColor : '#4C4B4B', outlineWidth : 4  }}
     },
     { url: 'biblemap/BC_admin_poi',  order: 7, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'normal 13px 돋움', color: 'white', outlineColor : '#4C4B4B', outlineWidth : 4  }}
     }

 ];


 function LayerManager( ){
     this.layerContainer = {
         layers : [],
         totalCount : 9,
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

    // if( zoomIn < 11 )
      //   zoomIn = 11;

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

