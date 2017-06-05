/**
 * Created by Administrator on 2017-06-06.
 */

function flyTo( view, location, done) {
    var duration = 3000;
    var zoom = view.getZoom();
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
        duration: duration
    }, callback);

    var topZoom = zoom - 3;
    if( topZoom < 8 )
        topZoom = 8;

    view.animate({
        //  zoom: zoom - 1,
        zoom : topZoom,
        duration: duration / 2
    }, {
        // zoom: zoom,
        zoom : 13,
        duration: duration / 2
    }, callback);
}

function moveTo( view, location ) {
    view.animate({
        center: location,
        duration: 2000
    });
}
