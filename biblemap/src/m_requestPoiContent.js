/**
 * Created by Administrator on 2018-03-15.
 */

poiContentsToTab = function( infoText ){

    $('#tab3Title').empty();

    var strPoiTitle = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + focusPoiObj.id + ')\" style=\"text-decoration:none; font-weight:bold;' + "size:\'30px\';" + 'color: #2682E8 \" >'
        // +'#'+
        + '<img src ="biblemap/image/location16.png" style=\"height:26px; vertical-align:top;\">&nbsp;' +
        focusPoiObj.biblePlace + '  ' + '</a>';

    $("#tab3Title").append( strPoiTitle );

    var infoTab = document.getElementById( 'tab3' );

    var infoObj = { // title : poiText,
        content : infoText
    };

    var strConvText = makeStrongInText( layerManager, focusPoiObj.biblePlace, infoObj );

    // infoTab.innerHTML += infoText;
    infoTab.innerHTML = strConvText;

};


makeLinkedName = function( poiID, placeName, youtube, infoText ){

    var strRet = "";

    var youtubeRef2D = "<a href =\"javascript:showPoiYoutubeInTooltip(" +  poiID + ",'" + youtube +"')\" >";
    var youtubeIcon = "<img src=\"biblemap/image/camera-icon.png\" style=\"width:20px; height:20px; vertical-align:middle;\">";
    var strLinkYoutube = youtubeRef2D + youtubeIcon + "</a>";

    var textRef = "<a href =\"javascript:showPoiInfoInTab(" +  poiID + ")\" >";
    var textIcon = "<img src=\"biblemap/image/text-icon.png?version=20170904\" style=\"width:20px; height:20px; vertical-align:middle;\">";

    var strLinkTextInfo = textRef + textIcon + "</a>";

    var strLinkPoiLabel = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + poiID + ')\" style=\"text-decoration:none; font-weight:bold; font-size:1.3em; vertical-align:middle; color: rgb( 110, 110, 110 ) ;' + '\" >' + placeName + '</a>';

    if( youtube != null && youtube !== "" ){
        strRet = strLinkYoutube + "&nbsp;&nbsp;&nbsp;"
    }
    strRet += strLinkPoiLabel;
    if( infoText != null && infoText !== "" ) {
        strRet += "&nbsp;&nbsp;&nbsp;" + strLinkTextInfo;
    }

    return strRet;
};


function mobileRequestPoiContentAndShow( paramPoiObj, callback ) {

    var selectedPoiObj = paramPoiObj;

    var youtube = "";
    var infoText = "";
    var titleText = "";
    var labelText = "";

    showDownloading();

    requestPoiInfo( selectedPoiObj, function ( recvPoiInfo ) {

        hideDownloading();

        youtube = "";
        infoText = "";
        titleText = "";
        labelText = "";

        if ( recvPoiInfo.hasOwnProperty("youtube")) {
            youtube = recvPoiInfo["youtube"];
        }

        if ( recvPoiInfo.hasOwnProperty("text")) {
            infoText = recvPoiInfo["text"];
        }

        if( recvPoiInfo.title !== undefined ) {
            if(  recvPoiInfo.title !== "" )
                titleText = recvPoiInfo.title;
        }

        showPoiTooltip( selectedPoiObj.id );
        // poiContentsToTab();

        if( callback )
            callback();

    }, function () {    // POI의 상세정보가 없을 경우

        hideDownloading();

      //  poiTooltip.create( poiObj.biblePlace, linkedPlaceName, [poiObj.x, poiObj.y]);
        youtube = "";
        infoText = "";

        showPoiTooltip( selectedPoiObj.id );

        if( callback )
            callback();

        // labelText = makeLinkedName( focusPoiObj.id, focusPoiObj.biblePlace, null, null );
        // poiTooltip.create( focusPoiObj.biblePlace, labelText, [focusPoiObj.x, focusPoiObj.y]);
    });

    showPoiTooltip = function( poiID ){

        var poiObj = layerManager.getPoiObjById( poiID );

        if( titleText !== "")
            labelText = makeLinkedName( selectedPoiObj.id, titleText, youtube, infoText );
        else
            labelText = makeLinkedName( selectedPoiObj.id, selectedPoiObj.biblePlace, youtube, infoText );


        if ( focusPoiObj != null) {
            if (poiObj.id == focusPoiObj.id) {
                poiTooltip.create(selectedPoiObj.biblePlace, labelText, [selectedPoiObj.x, selectedPoiObj.y], true);
            }
            else
                poiTooltip.create( selectedPoiObj.biblePlace, labelText, [selectedPoiObj.x, selectedPoiObj.y], false);
        }
        else
            poiTooltip.create( selectedPoiObj.biblePlace, labelText, [selectedPoiObj.x, selectedPoiObj.y], false);
    };

    showPoiInfoInTab = function( poiID ) {      // tabMenu 에서 정보 보여주기

        var poiObj = layerManager.getPoiObjById( poiID );
        setFocusPoiObj( poiObj );
        bibleMapManager.createPoiIcon( poiObj );        // focus POI Icon 만들기

        footerMenu.middle();

        poiContentsToTab( infoText );

        tabMenu.selectTab('tab3Menu');
        $("#tab3").scrollTop(0);

        setCenterFocusedPOI( poiObj );
        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], true);
    };
}


function setFocusPoiObj( poiObj ){
    focusPoiObj = poiObj;
}


showPoiYoutubeInTooltip = function( poiID, youtubeLink ) {

    var poiObj = layerManager.getPoiObjById( poiID );

    footerMenu.bottom();

    labelText = makeLinkedName( poiObj.id, poiObj.biblePlace, null, null );
    var foldIcon = '<a href =\"javascript:showPoiTooltip(' +  poiID + ')\" >' + '<img src=\"biblemap/image/fold-icon.png\" style=\"width:20px; height:20px; vertical-align:middle;\">' + '</a>';
    labelText += '&nbsp;&nbsp;' + foldIcon;
    labelText += '<br>';
    labelText += "<iframe width=\"220\" height=\"180\" src=\"" + youtubeLink + "\" frameborder = \"0\" allowfullscreen></iframe>";

    if( focusPoiObj !== null && poiObj.id == focusPoiObj.id )
        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], true);
    else
        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], false);
};


/*
function mobileRequestPoiContentAndShow( poiObj, popup2D ) {

    var youtube = "";
    focusPoiObj = poiObj;
    var infoText = "";
    var poiText = poiObj.biblePlace;

    var youtubeRef2D = "<a href =\"javascript:showYoutubePoi2D()\" >";
    var youtubeIcon = "<img src=\"biblemap/image/camera-icon.png\" style=\"width:20px; height:20px; vertical-align:middle;\">";

    var textRef = "<a href =\"javascript:showTextPoi()\" >";
    var textIcon = "<img src=\"biblemap/image/text-icon.png?version=20170904\" style=\"width:20px; height:20px; vertical-align:middle;\">";

    var lineImage = '<div style=\"height: 4px; background: url(biblemap/image/horizon-line_small.png);\"></div>';

    requestPoiInfo( poiObj, function ( recvPoiObj) {
        if ( recvPoiObj.hasOwnProperty("youtube")) {
            youtube = recvPoiObj["youtube"];
        }

        if ( recvPoiObj.hasOwnProperty("text")) {
            infoText = recvPoiObj["text"];
        }


        if( popup2D ) {
            showBaseInfoPoi(popup2D, "contentFrame2D");
        }

        // poiContentsToTab();

    }, function () {

        if( popup2D ) {
            popup2D.content.innerHTML = poiText + " ";
            showTitlePoi(popup2D, poiObj.title, "contentFrame2D");
            popup2D.overlay.setPosition([poiObj.x, poiObj.y]);
        }

    });

    showBaseInfoPoi = function( popup, frameName ){
        if (youtube != "") {
            popup.content.innerHTML = poiText +" " + youtubeRef2D + youtubeIcon + "</a>";
        } else
            popup.content.innerHTML = poiText;

        if(infoText != "" ){
            popup.content.innerHTML += "" + textRef + " " + textIcon + "</a>";
        }

        showTitlePoi( popup, poiObj.title, frameName );

        if( popup.name == "2D")
            popup.overlay.setPosition( [poiObj.x, poiObj.y] );
        else
            popup.overlay.setGroundPosition( [poiObj.x, poiObj.y] );
    };

    showBaseInfoPoi2D = function(){

        showBaseInfoPoi( popup2D, "contentFrame2D" );

    };

    showTitlePoi = function( popup, title , frameName ) {
        if( title == "") {
            return;
        }
        var strLen = ( title.length * 12) + 35;
        popup.content.innerHTML += lineImage;
        // popup.content.innerHTML += '<br>';
        popup.content.innerHTML += "<span style=\'font-size:1.0em;\'>" + title + "</span>";
    };


    poiContentsToTab = function(){

        $('#tab3Title').empty();

        var strPoiTitle = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + focusPoiObj.id + ')\" style=\"text-decoration:none; font-weight:bold;' + "size:\'30px\';" + 'color: #2682E8 \" >' + '#'+ poiText + '  ' + '</a>';

        $("#tab3Title").append( strPoiTitle );

        var infoTab = document.getElementById( 'tab3' );

//        infoTab.innerHTML = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + focusPoiObj.id + ')\" style=\"text-decoration:none; font-weight:bold;' + "size:\'30px\';" + 'color: #2682E8 \" >' + '#'+ poiText + '  ' + '</a>';

        var infoObj = { // title : poiText,
            content : infoText
        };

        var strConvText = makeStrongInText( layerManager, focusPoiObj.biblePlace, infoObj );

        // infoTab.innerHTML += infoText;
        infoTab.innerHTML = strConvText;

    };

    showTextPoi = function() {      // tabMenu 에서 정보 보여주기

        footerMenu.middle();

        poiContentsToTab();

        tabMenu.selectTab('tab3Menu');
        $("#tab3").scrollTop(0);

        setCenterFocusedPOI( focusPoiObj );

    };

    showYoutubePoi2D = function() {

        footerMenu.bottom();

        // var scriptRef = "<a href =\"javascript:showBaseInfoPoi()\"' >";
        var scriptRef = "<a href =\"javascript:showBaseInfoPoi2D()\" >";
        var foldIcon = "<img src=\"biblemap/image/fold-icon.png\" style=\"width:20px; height:20px; vertical-align:middle;\">";
        // popup.innerHTML = poiText + " " + scriptRef + foldIcon + "</a>";

        popup2D.content.innerHTML = poiText + " " + scriptRef + foldIcon + "</a>";



        if( infoText!= "" ){
            // popup.innerHTML += textRef + textIcon + "</a>";
            popup2D.content.innerHTML += textRef + textIcon + "</a>";

        }
        // popup.innerHTML += lineImage;
        popup2D.content.innerHTML += lineImage;

        if( poiObj.title != ""){
            // popup.innerHTML += "<br>" + poiObj.title + "<br>";
            popup2D.content.innerHTML += "<br>" + poiObj.title + "<br>";

        }

        popup2D.content.innerHTML += "<iframe width=\"200\" height=\"150\" src=\"" + youtube + "\" frameborder = \"0\" allowfullscreen></iframe>";
        popup2D.overlay.setPosition( [poiObj.x, poiObj.y] );
    };

}
*/

function setCenterFocusedPOI( focusedPoiObj ){
    var zoom = bibleMapManager.getView().getZoom();
    _moveToPos( bibleMapManager.getView(), [focusedPoiObj.x, focusedPoiObj.y], zoom, 600);
}