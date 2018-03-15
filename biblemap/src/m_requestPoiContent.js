/**
 * Created by Administrator on 2018-03-15.
 */
function mobileRequestPoiContentAndShow( poiObj, popup2D ) {

    var youtube = "";
    var focusPoiObj = poiObj;
    var infoText = "";
    var poiText = poiObj.biblePlace;

    var youtubeRef2D = "<a href =\"javascript:showYoutubePoi2D()\" >";
    var youtubeIcon = "<img src=\"biblemap/image/camera-icon.png\" style=\"width:20px; height:20px; vertical-align:middle;\">";

    var textRef = "<a href =\"javascript:showTextPoi()\" >";
    var textIcon = "<img src=\"biblemap/image/text-icon.png?version=20170904\" style=\"width:20px; height:20px; vertical-align:middle;\">";

    var lineImage = '<div style=\"height: 14px; background: url(biblemap/image/horizon-line.png);\"></div>';

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
        popup.content.innerHTML += '<br>';
        popup.content.innerHTML += "<span style=\'font-size:10pt;\'>" + title + "</span>";
    };


    poiContentsToTab = function(){

        var infoTab = document.getElementById( 'tab3' );
        // infoTab.innerHTML = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + focusPoiObj.id + ')\" style=\"text-decoration:none; font-weight:bold;' + "font-size:\'20px;\'" + 'color: #9C1AC8 \" >' + "[ " + poiText + " ]  " +  '</a>';
        infoTab.innerHTML = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + focusPoiObj.id + ')\" style=\"text-decoration:none; font-weight:bold;' + "font-size:\'30px\';" + 'color: #000000 \" >' + "[ " + poiText + " ]  " +  '</a>';

        var infoObj = { // title : poiText,
            content : infoText
        };

        var strConvText = makeStrongInText( layerManager, focusPoiObj.biblePlace, infoObj );

        // infoTab.innerHTML += infoText;
        infoTab.innerHTML += strConvText;
    };

    showTextPoi = function() {      // tabMenu 에서 정보 보여주기

        poiContentsToTab();

        $("#tab3").scrollTop(0);
        tabMenu.selectTab('tab3Menu');

    };

    showYoutubePoi2D = function() {
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
