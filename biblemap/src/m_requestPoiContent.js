/**
 * Created by Administrator on 2018-03-15.
 */

poiContentsToTab = function( infoText ){

    $('#tab3Title').empty();

    // var strPoiTitle = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + "\'" + focusPoiObj.id + "\'" + ')\" style=\"text-decoration:none; font-weight:bold;' + "size:\'30px\';" + 'color: #2682E8 \" >'
    var strPoiTitle = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + "\'" + focusPoiObj.id + "\'" + ')\" style=\"text-decoration:none; font-weight:bold;' + "size:\'30px\';" + 'color: rgb( 90, 90, 90)\" >'
        + '<img src ="biblemap/image/poi_location.png?version=20170908" style=\"height:26px; vertical-align:top;\">&nbsp;&nbsp;' +
        focusPoiObj.biblePlace + '  ' + '</a>';

    var strSearchWord = '<a href=' + '"javascript:bibleSearchByWord( ' + "\'" + focusPoiObj.biblePlace + "\'" + ')\">';
    strSearchWord += '&nbsp;&nbsp;&nbsp;<img src ="biblemap/image/m_search_btn2.png" style=\"position: absolute; top: -2px; height:28px; vertical-align:top;\">&nbsp;' + '</a>';

    /*
    strSearchWord += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    strSearchWord += '<a href=' + '"javascript:beforePoi()\">';
    strSearchWord += '<img src="biblemap/image/before_poi2.png?version=20171201" style="border:1px solid grey;  width:28px; height:28px; vertical-align:top;\">&nbsp;' + '</a>';
    strSearchWord += '&nbsp;&nbsp;';
    strSearchWord += '<a href=' + '"javascript:afterPoi()\">';
    strSearchWord += '<img src="biblemap/image/after_poi2.png?version=20171201" style="border:1px solid grey;  width:28px; height:28px; vertical-align:top;\">&nbsp;' + '</a>';
    */


    strPoiTitle += strSearchWord;

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
    // var textIcon = "<img src=\"biblemap/image/text-icon.png?version=20170904\" style=\"width:20px; height:20px; vertical-align:middle;\">";
    var textIcon = "<img src=\"biblemap/image/text-icon3.png?version=20170906\" style=\"width:20px; height:20px; vertical-align:middle;\">";

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

        if( titleText !== ""){
            // labelText = makeLinkedName( selectedPoiObj.id, titleText, youtube, infoText );
            labelText = makeLinkedName(selectedPoiObj.id, selectedPoiObj.biblePlace, youtube, infoText);
        }
        else {
            labelText = makeLinkedName(selectedPoiObj.id, selectedPoiObj.biblePlace, youtube, infoText);
        }


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
        bibleMapManager.createPoiIcon( poiObj );        // focus POI Icon 만들기

        setFocusPoiObj( poiObj );

        footerMenu.middle();

        poiContentsToTab( infoText );

        tabMenu.selectTab('tab3Menu');
        $("#tab3").scrollTop(0);

        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], true);
        moveCenterFocusedPOI( poiObj );
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


function moveCenterFocusedPOI( focusedPoiObj ){
    var zoom = bibleMapManager.getView().getZoom();
    _moveToPos( bibleMapManager.getView(), [focusedPoiObj.x, focusedPoiObj.y], zoom, 200);
}