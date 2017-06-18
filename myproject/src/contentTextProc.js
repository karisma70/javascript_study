/**
 * Created by Administrator on 2017-06-13.
 */

function examinRightWordinText( strWord, strText ){
    var strPos = strText.indexOf(strWord);
    if( strPos == -1 ){
        return false;
    }

    if( strText.substring(strPos-1, strPos) != " " ){
        return false;
    }
    return true;
}

function removeSpaceInWord( strText){
    strText = strText.replace(/^\s*|\s*$/g, '');
    return strText;
} // 좌우 공백 제거


// 검색어이긴 하지만 지도 데이터에 없을때 보라색
//  검색어이긴 하지만 지도 데이터에 있을때 군청색
//  텍스트 내에 지도 데이터가 있을 때 초록색
// #9C1AC8  - 보라색,  #0D63DB - 군청색 , #238106 초록색
function makeStrongWordInText( LayerManager, strWord, strText, color ) {
    var strongStart = "<strong><font color='" + color + "'>";
    var strongEnd = "</font></strong>";

    var strPos = strText.indexOf(strWord);
    if( strPos == -1 ){
        return strText;
    }

    if( strPos > 0 && strText.substring(strPos-1, strPos) != "<" && strText.substring(strPos-1, strPos) != " " ){
        return strText;
    }

    var posStart = '<a href=' + '"javascript:moveToPlaceByWord( \'' + strWord + '\')\"  style=\"text-decoration:none; font-weight:bold; color:' + color + '\" >';
    var posEnd = '</a>';
    var pos = LayerManager.getPoiByName( strWord );

    var strStrong = strText.substring(0, strPos);

    if( pos )
        strStrong += posStart;
    else
        strStrong += strongStart;
    strStrong += strWord;
    if( pos )
        strStrong += posEnd;
    else
        strStrong += strongEnd;
    strStrong += makeStrongWordInText(  LayerManager, strWord, strText.substring( strPos + strWord.length, strText.length ), color );

    return strStrong;
}


function makeStrongWordOfLocation( LayerManager, strText ) {
    var layerContainer = LayerManager.getLayerContainer();
    var retStrText = strText;

    for (prop in layerContainer.poiLayer) {
        if (layerContainer.poiLayer.hasOwnProperty(prop) && typeof layerContainer.poiLayer[prop] === "object") {
            // console.log(prop + " => typeof : " + ( typeof layerContainer.poiLayer[prop] ));

            // 검색어이긴 하지만 지도 데이터에 없을때 보라색
            //  검색어이긴 하지만 지도 데이터에 있을때 군청색
            //  텍스트 내에 지도 데이터가 있을 때 초록색
            // #9C1AC8  - 보라색,  #0D63DB - 군청색 , #238106 초록색

            var color = "#0D63DB";  // 군청색, //  텍스트 내에 지명이 있을때 군청색
            retStrText = makeStrongWordInText( LayerManager, prop, retStrText, color );
        }
    }
    return retStrText;
}

function makeStrongInText( LayerManager, searchWord, strText ) {
    var layerContainer = LayerManager.getLayerContainer();

    if( typeof strText === "undefined"){
        return "";
    }
    var retStrText = strText;
    var boolFind = false;

    for ( pos in layerContainer.poiLayer) {
        if (layerContainer.poiLayer.hasOwnProperty( pos ) && typeof layerContainer.poiLayer[ pos ] === "object") {
            var color = "";
            if( pos == searchWord ) {
                boolFind = true;
                color = "#B404AE";  // 핑크색 , //  텍스트 내에 검색어와 지명이 일치할때
                retStrText = makeStrongWordInText( LayerManager, pos, retStrText, color );
            } else {
                color = "#0D63DB";  // 군청색, //  텍스트 내에 지명이 있을때 군청색
                retStrText = makeStrongWordInText( LayerManager, pos, retStrText, color );
            }
        }
    }

    if( boolFind == false){
        retStrText = makeStrongWordInText( LayerManager, searchWord, retStrText, "#DF0101" );  // 보라색, 검색어이긴 하지만 지도 데이터에 없을때 빨간색
    }

    return retStrText;
}

