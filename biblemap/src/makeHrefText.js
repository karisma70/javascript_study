/**
 * Created by Administrator on 2018-03-15.
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
function makeHrefWordInText( LayerManager, strWord, bibleTitle, bibleText, color , bIsPlaceName ) {
    var strongStart = "<strong><font color='" + color + "'>";
    var strongEnd = "</font></strong>";

    /*
    bibleText = "Iye Abarim <br>요단 동쪽에 위치한 광야라는 뜻으로 성경에는 \'모압 앞 해돋는 편 광야\’로 묘사되어 있는데 이는 모압 동남편의 변방 불모지로서 대부분 암석이 많은 지역이었다";
    strWord = "모압";
    */

    if( strWord == '단'){
        ConsoleLog("Debuging Here!!!");
    }

    /*
    if( strWord == '가이사랴'){
        ConsoleLog("Debuging Here!!!");
    }

    if( strWord == '빌립보'){
        ConsoleLog("Debuging Here!!!");
    }
    */


    var strPos = bibleText.indexOf(strWord);
    if (strPos == -1) {
        return bibleText;
    }

    /*
    if( strPos > 0){
        if (bibleText.substring(strPos - 1, strPos) != ">"){
            return bibleText;
        }

        if( bibleText.substring(strPos - 1, strPos) != " " ) {
            if( bibleText.substring(strPos-1, strPos) != "'" ||  )
                return bibleText;
    }*/


    if (strPos > 0 && bibleText.substring(strPos - 1, strPos) != " " ) {
        if( bibleText.substring(strPos-1, strPos) !== ">" ) {
            if( bibleText.substring(strPos-1, strPos) !== "\'") {
                // return bibleText;
                var strRet = bibleText.substring(0, strPos + strWord.length);
                var nextString = bibleText.substring( strPos, strPos + strWord.length + 4);
                var hrefPos  = nextString.indexOf("</a>");
                if( hrefPos > -1 ){
                    strRet += bibleText.substring( strPos + strWord.length,  strPos + strWord.length + 4 );
                    strRet += makeHrefWordInText(LayerManager, strWord, bibleTitle, bibleText.substring(strPos + ( strWord.length + 5), bibleText.length), color);
                }else {
                    strRet += makeHrefWordInText(LayerManager, strWord, bibleTitle, bibleText.substring(strPos + strWord.length, bibleText.length), color);
                }
                return strRet;
            }
        }
    }

    /*
    if( strPos > 0 &&  ( bibleText.substring(strPos-1, strPos) == ">" || bibleText.substring( strPos + strWord.length, strPos + strWord.length + 1 ) == "<") ) {       // 이미 발견된 단어이므로 스킵
        return bibleText;
    }
    */

    /*
    var firstFoundedPos = bibleText.indexOf("\')");       // 이미 검색된 결과가 있으면 그냥 리턴
    if( firstFoundedPos == (strPos +strWord.length) ) {
        var tempStrText = bibleText.substring( firstFoundedPos + 4, bibleText.length);

        strPos = tempStrText.indexOf(strWord );
        var secondFoundedPos = tempStrText.indexOf("</a>");
        if( secondFoundedPos == (strPos +strWord.length)){
            return bibleText;
            // var strRet = bibleText.substring(0, strPos);
            // strRet += makeHrefWordInText(  LayerManager, strWord, bibleTitle, bibleText.substring( strPos + strWord.length, bibleText.length ), color );
            // return strRet;
        }
    }*/

    var strExamineWord = bibleText.substring(strPos-3, strPos);

    var firstFoundedPos = strExamineWord.indexOf('\" >');       // 이미 검색된 결과가 있으면 그냥 리턴
    if( firstFoundedPos >= 0 ) {
        strExamineWord = bibleText.substring(strPos, strPos + 15);
        var secondFoundedPos = strExamineWord.indexOf('</a>');       // 이미 검색된 결과가 있으면 그냥 리턴
        if( secondFoundedPos >= 0 )
            return bibleText;
    }

    strExamineWord = bibleText.substring(strPos, strPos+strWord.length +4);
    secondFoundedPos = strExamineWord.indexOf('</a>');       // 이미 검색된 결과가 있으면 그냥 리턴
    if( secondFoundedPos >= 0 )
        return bibleText;


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
    strStrong += makeHrefWordInText(  LayerManager, strWord, bibleTitle, bibleText.substring( strPos + strWord.length, bibleText.length ), color );

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

    var bibleTitle = recvObj.title;     // 성경의 책권을 의미
    var bibleText = recvObj.content;
    var boolFind = false;

    for( var order in layerContainer.poiWords ) {
        var color = "";
        var placeName = layerContainer.poiWords[order].text;
        if( placeName == searchWord ) {
            boolFind = true;
            color = "#B404AE";  // 핑크색 , //  텍스트 내에 검색어와 지명이 일치할때
        }else{
            color = "#0D63DB";  // 군청색, //  텍스트 내에 지명이 있을때 군청색
        }

        bibleText = makeHrefWordInText( LayerManager, placeName, bibleTitle, bibleText, color, true );
    }


    // if( searchWord.length > 0 &&  boolFind == false){
    if( searchWord.length > 0 ){
        bibleText = makeHrefWordInText( LayerManager, searchWord, bibleTitle, bibleText, "#DF0101", false );  // 보라색, 검색어이긴 하지만 지도 데이터에 없을때 빨간색
    }

    return bibleText;
}
