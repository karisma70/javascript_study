/**
 * Created by Administrator on 2017-06-13.
 */



function examinRightWordinText( strWord, strText ){
    var strPos = strText.indexOf(strWord);
    if( strPos == -1 ){
        return false;
    }

    if( strPos == 0 )
        return true;

    if( strText.substring(strPos-1, strPos) != " " ){
        return false;
    }
    return true;
}


// 검색어이긴 하지만 지도 데이터에 없을때 보라색
//  검색어이긴 하지만 지도 데이터에 있을때 군청색
//  텍스트 내에 지도 데이터가 있을 때 초록색
// #9C1AC8  - 보라색,  #0D63DB - 군청색 , #238106 초록색
function makeStrongWordInText( LayerManager, strWord, bibleTitle, bibleText, color , bIsPlaceName ) {
    var strongStart = "<strong><font color='" + color + "'>";
    var strongEnd = "</font></strong>";

    var strPos = bibleText.indexOf(strWord);
    if( strPos == -1 ){
        return bibleText;
    }


    if( strPos > 0 && bibleText.substring(strPos-1, strPos) != "<" && bibleText.substring(strPos-1, strPos) != " " ){       // 이미 발견된 단어이므로 스킵
        return bibleText;
    }

    var firstFoundedPos = bibleText.indexOf("\')");       // 이미 검색된 결과가 있으면 그냥 리턴
    if( firstFoundedPos == (strPos +strWord.length) ) {
        var tempStrText = bibleText.substring( firstFoundedPos + 4, bibleText.length);

        strPos = tempStrText.indexOf(strWord );
        var secondFoundedPos = tempStrText.indexOf("</a>");
        if( secondFoundedPos == (strPos +strWord.length)){
            return bibleText;
        }
    }

    var strStrong = bibleText.substring(0, strPos);

    var poiObj = LayerManager.findPoiObjByBibleTitleAndWord( bibleTitle, strWord );
    if( poiObj ) {
        var posStart = '<a href=' + '"javascript:moveToPlaceByPoiID( ' + poiObj.id + ')\" style=\"text-decoration:none; font-weight:bold; color:' + color + '\" >';
        var posEnd = '</a>';
        strStrong += posStart;
    }
    else{
        if( bIsPlaceName == false)
            strStrong += strongStart;
    }

    strStrong += strWord;
    if( poiObj )
        strStrong += posEnd;
    else {
        if( bIsPlaceName == false )
            strStrong += strongEnd;
    }
    strStrong += makeStrongWordInText(  LayerManager, strWord, bibleTitle, bibleText.substring( strPos + strWord.length, bibleText.length ), color );

    return strStrong;
}


function makeStrongInText( LayerManager, searchWord, recvObj ) {
    var layerContainer = LayerManager.getLayerContainer();

    if( typeof recvObj === "undefined"){
        return "";
    }

    if( typeof recvObj.content === "undefined"){
        return "";
    }

    var bibleTitle = recvObj.title;
    var bibleText = recvObj.content;
    var boolFind = false;


    /*
    for( var order in layerContainer.poiWords ){
        var placeName = layerContainer.poiWords[order].text;
        if (layerContainer.poiLayer.hasOwnProperty( placeName ) && typeof layerContainer.poiLayer[ placeName ] === "object") {
            var color = "";
            if( placeName == searchWord ) {
                boolFind = true;
                color = "#B404AE";  // 핑크색 , //  텍스트 내에 검색어와 지명이 일치할때
            }else{
                color = "#0D63DB";  // 군청색, //  텍스트 내에 지명이 있을때 군청색
            }
            bibleText = makeStrongWordInText( LayerManager, placeName, bibleTitle, bibleText, color );
        }
    }
    */

    for( var order in layerContainer.poiWords ) {
        var color = "";
        var placeName = layerContainer.poiWords[order].text;
        if( placeName == searchWord ) {
            boolFind = true;
            color = "#B404AE";  // 핑크색 , //  텍스트 내에 검색어와 지명이 일치할때
        }else{
            color = "#0D63DB";  // 군청색, //  텍스트 내에 지명이 있을때 군청색
        }
        bibleText = makeStrongWordInText( LayerManager, placeName, bibleTitle, bibleText, color, true );
    }


    if( boolFind == false){
        bibleText = makeStrongWordInText( LayerManager, searchWord, bibleTitle, bibleText, "#DF0101", false );  // 보라색, 검색어이긴 하지만 지도 데이터에 없을때 빨간색
    }

    return bibleText;
}


function requestPoiInfo( poiName, recvFunc,  noRecvFunc){
    var searchParam = {
        type: "Poi",     // book, chapter, paragraph 등으로 구성된 검색
        option: {}
    };

    searchParam.option["name"] = poiName;

    var jsonStr = JSON.stringify( searchParam );

    httpRequest("POST", jsonStr, function( http ) {
        var resObj = JSON.parse( http.responseText );

        if( resObj.result != "undefined" && resObj.result == "fail" ){
            ConsoleLog("requestPoiInfo() Fail!!!   param: " + jsonStr );
            if( noRecvFunc ){
                noRecvFunc( resObj );
            }
            return;
        }

        if (resObj.length != "undefined") {    // 배열로 받아올 경우
            if( resObj.length < 1){
                noRecvFunc( resObj );
                return;
            }
            for( idx in resObj ){
                var poiObj = resObj[idx];
                recvFunc( poiObj );
                break;                  // 여러개 받아오더라도 하나만 처리하도록 한다.
            }
        }
        else{
            recvFunc( resObj );
        }

    });
}


function requestPoiContentAndShow( poiObj, popup, overlay ) {

    var youtube = "";
    var poiText = poiObj.biblePlace;
    if( poiObj.title != "")
        poiText += "<br>-------------------<br>" + poiObj.title;

    requestPoiInfo( poiObj.biblePlace, function ( recvPoiObj) {
        if ( recvPoiObj.hasOwnProperty("youtube")) {
            youtube = recvPoiObj["youtube"];
        }

        if (youtube != "") {
            popup.innerHTML = poiText + "<br><iframe width=\"320\" height=\"240\" src=\"" + youtube + "\" frameborder = \"0\" allowfullscreen></iframe>";
        } else
            popup.innerHTML = poiText;
        overlay.setPosition( [poiObj.x, poiObj.y] );
    }, function () {
        popup.innerHTML = poiText;
        overlay.setPosition( [poiObj.x, poiObj.y] );
    });
}


function Tooltip( paramMap, cssClassName ) {
    var bibleMap = paramMap;

    var tooltipElement = null;
    this.tooltipArray = [];

    var zOrder = 0;

    this.create = function(text, coord){

        tooltipElement = document.createElement('div');

        // tooltipElement.className = 'tooltip tooltip-static';
        tooltipElement.className = cssClassName;

        tooltip = new ol.Overlay({
            element: tooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        bibleMap.addOverlay(tooltip);

        tooltipElement.innerHTML = text;


        tooltipElement.setAttribute("id", text );
        var strID = "#"+text;

        $(strID).css( "z-index", zOrder.toString() );

        tooltip.setPosition(coord);
        tooltip.setOffset([0, -7]);

        this.tooltipArray.push( tooltip);
        zOrder +=1;
    };

    this.allRemove = function() {

        zOrder = 0;

        if ( tooltipElement) {
            tooltipElement.parentNode.removeChild( tooltipElement );
            tooltipElement = null;
        }

        for (var idx in this.tooltipArray) {
            var tooltip = this.tooltipArray[idx];
            bibleMap.removeOverlay(tooltip);
        }
    };
}

var BibleChapterList = function() {

    var chapterArray = [];

    setChapterArray = function(  objList ){
        chapterArray = [];

        for (var idx in objList ) {
            var chapter = objList[idx];
            chapterArray.push( chapter );
        }
    };

    this.getCount = function(){
        return chapterArray.length;
    };

    this.getChapterByNumber = function( number ){
        for( var idx in  chapterArray ){
            var chapter = chapterArray[ idx ];
            if( chapter.bookNumber == number ){
                return chapter;
            }
        }
        return null;
    };

    this.getBookNumberByName = function( chapterName ){
        for( var idx in chapterArray ){
            var chapter = chapterArray[idx];
            if( chapter.title == chapterName ){
                return chapter.bookNumber;
            }
        }
        return -1;

    };

    this.requestBibleChapter = function( callback ){
        var searchParam = {
            type: "ChapterList",
            option: {}
        };

        var jsonStr = JSON.stringify( searchParam );
        ConsoleLog( "send param : " + jsonStr );

        httpRequest("POST", jsonStr, function( http ) {
            var resObj = JSON.parse(http.responseText);

            if( resObj.result != "undefined" && resObj.result == "fail" ){
                ConsoleLog( "request ChapterList!!! " + resObj.error );
            }
            else {
                if (resObj.length != "undefined") {    // 배열로 받아올 경우
                    setChapterArray( resObj );
                }else{
                    ConsoleLog( "Bible ChapterList Receive Error!!");
                }
            }

            callback();

        }) ;

    };

};