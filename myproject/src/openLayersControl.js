 /**
 * Created by Administrator on 2017-06-06.
 */

 var bibleMapLayers = [
     { url : 'biblemap/110m-admin-0-countries', order: 1, style: {
             visibleRange : { max : 16, min : 1 },
             fillColor : 'rgba( 255, 255, 255, 0.001)',
             lineStroke : {  color: [234, 179, 74], width : 2, opacity: 0.01  },
             //textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'normal 18px Arial', color: 'white', outlineColor : 'black', outlineWidth : 3  }}
            textStroke : { prop: 'Name2', align: 'center', baseline: 'middle', font : 'Normal 17px Arial', color: "#6E6E6E" }}
     },
     { url: 'biblemap/israel_pale/river_polyline',  order: 2, style: {
             visibleRange : { max : 16,  min : 8 },
             fillColor : 'rgba(0, 0, 255, 0.01)',
             lineStroke : {  color: [134, 211, 249], width : 2, opacity: 0.001  }    }
     },
     { url: 'biblemap/abraham_move',  order: 3, style: {
         visibleRange : { max : 16 , min : 12 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'Normal 13px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  } }
     },
     { url: 'biblemap/jesus_move',  order: 3, style: {
             visibleRange : { max : 16 , min : 12 },
             textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'Normal 13px 돋움', color: "white", outlineColor : "black", outlineWidth : 3  }}
     },
     { url : 'biblemap/bible_map_poi',  order: 4, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'middle', font : 'Bold 13px 돋움', color: "black", outlineColor : "white", outlineWidth : 2  } }
     },
     { url: 'biblemap/AD_israel_admin_poi',  order: 5, style: {
         visibleRange : { max : 16 , min : 7 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'bold 14px 돋움', color: 'black', outlineColor : 'white', outlineWidth : 2  }}
     },
     { url: 'biblemap/BC_admin_poi',  order: 6, style: {
         visibleRange : { max : 16 , min : 6 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'bold 14px 굴림', color: 'black', outlineColor : 'white', outlineWidth : 2  }}
     },
     {
       url: 'biblemap/AD_admin_poi',  order: 6, style: {
         visibleRange : { max : 16 , min : 6 },
         textStroke : { prop: 'name', align: 'center', baseline: 'center', font : 'bold 14px 굴림', color: 'black', outlineColor : 'white', outlineWidth : 2  }}
     }
 ];


function flyTo( view, location, zoomIn, done) {
    var duration = 2000;
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;

     zoomIn += 1;

    if( zoomIn < 11 )
        zoomIn = 11;

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
    if( topZoom < 8 )
        topZoom = 8;

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

function moveTo( view, location, zoomIn ) {
    zoomIn += 1;

    if( zoomIn < 10 )
        zoomIn = 10;

    view.animate({
        center: location,
        zoom : zoomIn,
        duration: 2000
    });
}
