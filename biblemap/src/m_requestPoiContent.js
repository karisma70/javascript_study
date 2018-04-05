/**
 * Created by Administrator on 2018-03-15.
 */

function writePoiContentsToTab( poiObj, infoText ){
        if( poiObj == undefined ){
            alert( "poiObj is undefined error!!  at writePoiContentsToTab");
            return;
        }

        $('#tab3Title').empty();

        var strPoiTitle = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + "\'" + poiObj.id + "\'" + ')\" style=\"text-decoration:none; font-weight:bold;' + "size:\'30px\';" + 'color: rgb( 180, 4, 174 )\" >'
            + '<img src ="biblemap/image/poi_location.png?version=20170908" style=\"height:26px; vertical-align:top;\">&nbsp;&nbsp;' +
            poiObj.biblePlace + '  ' + '</a>';

        var strSearchWord = '<a href=' + '"javascript:bibleSearchByWord( ' + "\'" + poiObj.biblePlace + "\'" + ')\">';
        strSearchWord += '&nbsp;&nbsp;&nbsp;<img src ="biblemap/image/m_search_btn2.png" style=\"position: absolute; top: -2px; height:28px; vertical-align:top;\">&nbsp;' + '</a>';


        strPoiTitle += strSearchWord;

        $("#tab3Title").append(strPoiTitle);

        var infoTab = document.getElementById('tab3');

        var infoObj = { // title : poiText,
            content: infoText
        };

        var strConvText = makeStrongInText(layerManager, poiObj.biblePlace, infoObj);

        // infoTab.innerHTML += infoText;
        infoTab.innerHTML = strConvText;

}


function makeLinkedLabel( poiID, placeName, youtube, youtubelink, infoText ){

    var strRet = "";

    var youtubeRef2D = "<a href =\"javascript:showPoiYoutubeInTooltip(" +  poiID + ",'" + youtube + "'" +  ",'" + youtubelink + "')\" >";
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
}


function showPoiTooltip( poiObj, labelText, youtube, infoText ){

    if ( window.focusPoiObj !== undefined && window.focusPoiObj != null) {
        if (poiObj.id == window.focusPoiObj.id) {
            poiTooltip.create(poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], true);        // 아이콘위에 툴팁을 표시하도록 함
        }
        else
            poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], false);
    }
    else
        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], false);
}





function mobileRequestPoiContentAndShow( paramPoiObj, callback ) {

    //var selectedPoiObj = paramPoiObj;
    window.selectedPoiObj = paramPoiObj;

    var youtube = "";
    var infoText = "";
    var titleText = "";
    var labelText = "";

    var callbackFunc = callback;

    showDownloading();

    requestPoiInfo( window.selectedPoiObj, function ( recvPoiInfo ) {

        hideDownloading();

        if( window.selectedPoiObj == null ) {
            alert( "window.selectedPoiObj == null error!! at mobileRequestPoiContentAndShow" );
            return;
        }

        youtube = "";
        youtubelink ="";
        infoText = "";
        titleText = "";
        labelText = "";

        if ( recvPoiInfo.hasOwnProperty("youtube")) {
            youtube = recvPoiInfo["youtube"];
        }

        if ( recvPoiInfo.hasOwnProperty("youtubelink")) {
            youtubelink = recvPoiInfo["youtubelink"];
        }

        if ( recvPoiInfo.hasOwnProperty("text")) {
            infoText = recvPoiInfo["text"];
        }

        if( recvPoiInfo.title !== undefined ) {
            if(  recvPoiInfo.title !== "" )
                titleText = recvPoiInfo.title;
        }

        if( window.selectedPoiObj.title !== undefined &&  window.selectedPoiObj.title !== "" ){
            labelText = window.selectedPoiObj.biblePlace + ": " + window.selectedPoiObj.title;
            labelText = makeLinkedLabel(window.selectedPoiObj.id, labelText, youtube, youtubelink, infoText);
        }
        else {
            labelText = makeLinkedLabel(window.selectedPoiObj.id, window.selectedPoiObj.biblePlace, youtube, youtubelink, infoText);
        }

        showPoiTooltip( window.selectedPoiObj, labelText, youtube, infoText );

        if( callbackFunc )
            callbackFunc( window.selectedPoiObj.id );

    }, function () {    // POI의 상세정보가 없을 경우

        hideDownloading();

        if( window.selectedPoiObj == null ) {
            alert( "window.selectedPoiObj == null error!! at mobileRequestPoiContentAndShow" );
            return;
        }

      //  poiTooltip.create( poiObj.biblePlace, linkedPlaceName, [poiObj.x, poiObj.y]);
        youtube = "";
        youtubelink ="";
        infoText = "";
        titleText = "";

        labelText = makeLinkedLabel(window.selectedPoiObj.id, window.selectedPoiObj.biblePlace, youtube, youtubelink, infoText);

        showPoiTooltip( window.selectedPoiObj, labelText, youtube, infoText );

        if( callbackFunc )
            callbackFunc(  );

    });

    showPoiTooltipInRequest = function( poiID ){

        var poiObj = layerManager.getPoiObjById( poiID );

        showPoiTooltip( poiObj, labelText, youtube, infoText );
    };


    showPoiInfoInTab = function ( poiID ) {      // tabMenu 에서 정보 보여주기

        if( poiID == null ){
            alert("poiID == null error!!  at showPoiInfoTab ");
            return;
        }

        var poiObj = layerManager.getPoiObjById( poiID );

        if( poiObj == null ){
            alert("poiID == null error!!  at showPoiInfoTab ");
            return;
        }

        bibleMapManager.createPoiIcon( poiObj );        // focus POI Icon 만들기

        setGlobalFocusPoiObj( poiObj );

        writePoiContentsToTab( poiObj, infoText );

        footerMenu.middle();

        tabMenu.selectTab('tab3Menu');
        $("#tab3").scrollTop(0);

        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], true);
        moveCenterFocusedPOI( poiObj );
    };

}







function setGlobalFocusPoiObj( poiObj ){
    window.focusPoiObj = poiObj;
}


function showPoiYoutubeInTooltip( poiID, youtubeSrc, youtubeLink ) {

    if( youtubelink !== ""){
        window.open( youtubeLink );
        return;
    }

    if( confirm("3G/LTE 네트웍 환경에서 재생시 데이터 사용료가 발생할 수 있습니다") == false )
        return;

    var poiObj = layerManager.getPoiObjById( poiID );

    footerMenu.bottom();

    labelText = makeLinkedLabel( poiObj.id, poiObj.biblePlace, null, null, null );
    var foldIcon = '<a href =\"javascript:showPoiTooltipInRequest(' +  poiID + ')\" >' + '<img src=\"biblemap/image/fold-icon.png\" style=\"width:20px; height:20px; vertical-align:middle;\">' + '</a>';
    labelText += '&nbsp;&nbsp;' + foldIcon;
    labelText += '<br>';
    labelText += "<iframe width=\"275\" height=\"180\" src=\"" + youtubeSrc + "\" frameborder = \"0\" allowfullscreen></iframe>";

    if( window.focusPoiObj !== null && poiObj.id == window.focusPoiObj.id )
        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], true);
    else
        poiTooltip.create( poiObj.biblePlace, labelText, [poiObj.x, poiObj.y], false);
};


function moveCenterFocusedPOI( focusedPoiObj ){
    var zoom = bibleMapManager.getView().getZoom();
    // _moveToPos( bibleMapManager.getView(), [focusedPoiObj.x, focusedPoiObj.y], zoom, 200);
    if( zoom < (focusedPoiObj.zoomIn - 1.0) )
        _moveToPos( bibleMapManager.getView(), [focusedPoiObj.x, focusedPoiObj.y], (focusedPoiObj.zoomIn - 1.0), 500);
    else
        _moveToPos( bibleMapManager.getView(), [focusedPoiObj.x, focusedPoiObj.y], zoom, 500);
}