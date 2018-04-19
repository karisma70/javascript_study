/**
 * Created by Administrator on 2017-12-23.
 */


var searchBibleBookNum =  0;
var searchBibleChapterNum = 0;


function adjustBibleBookChapter( bookNum, chapterNum ){

    var retChapterObj = {
        bookTitle: "",
        bookNum : 0,     // book, chapter, paragraph 등으로 구성된 검색
        chapterNum : 0
    };

    var chapter = bibleChapterList.getChapterByNumber( bookNum );
    retChapterObj.bookTitle = chapter.title;
    retChapterObj.bookNum = bookNum;
    retChapterObj.chapterNum = chapterNum;

    if( chapterNum == 0 ){
        if( chapter.bookNumber <= 1) {      // 창세기 이면
            retChapterObj.bookNum = 1;
            retChapterObj.chapterNum = 1;
        }else {
            var beforeChapter = bibleChapterList.getChapterByNumber( chapter.bookNumber -1 );
            retChapterObj.bookTitle = beforeChapter.title;
            retChapterObj.bookNum = beforeChapter.bookNumber;
            retChapterObj.chapterNum = beforeChapter.lastNum;
        }
    }else {
        if (chapter.lastNum < chapterNum) {
            if (( chapter.lastNum + 1 ) == chapterNum) {
                var nextChapter = bibleChapterList.getChapterByNumber(chapter.bookNumber + 1);
                if (nextChapter) {
                    retChapterObj.bookTitle = nextChapter.title;
                    retChapterObj.bookNum = nextChapter.bookNumber;
                    retChapterObj.chapterNum = 1;
                } else {
                    retChapterObj.chapterNum = chapter.lastNum.toString();
                }
            } else {
                retChapterObj.chapterNum = chapter.lastNum.toString();
            }
        }
    }

    return retChapterObj;
}




function searchBibleWord_( word ){

    dvBibleWord.value = word;

    searchBibleWord();
}


function searchBibleWord(){
    if( dvBibleWord.value == "" ){
        return;
    }

    saveSearchWordsToStorage();

    adjustScrDiv.setIsFullScr("false");

    var searchWord = dvBibleWord.value;
    // searchWord = " "+removeSpaceInWord( searchWord );
    searchWord = removeSpaceInWord( searchWord );

    var searchParam = {
        type: "Word",     // book, chapter, paragraph 등으로 구성된 검색
        option: {}
    };
    searchParam.option.content= { $regex : searchWord };   // db.getCollection('bible').find({content: { $regex : "바울" } } );

    beforeChapterSearchParam = { type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: { "title": "",
            "chapter" : ""
        }
    };

    tabMenu.selectTab('tab2Menu');

    reqeustAndShowContents( '#tab2', searchParam, -1, function( param, resObj ){
        if( resObj.length < 1 ) {
            ConsoleLog( "검색결과가 없어서 재검색!!!");
            var placeWord = param.option.content.$regex;
            var biblePlace = layerManager.getPoiByName(placeWord).biblePlace;
            param.option.content = {$regex: biblePlace};

            reqeustAndShowContents( '#tab2', param, -1, function( param, resObj ){
                // moveToPlaceByWord( param.option.content.$regex );
            } );
        } else {
            // moveToPlaceByWord( param.option.content.$regex );
        }
    } );
}



function decreaseBibleChapter(){
    /*
    var chapter = parseInt( dvBibleChapter.value);
    chapter -= 1;
    dvBibleChapter.value = String( chapter );
    searchBibleChapter();
    */

    var chapter = parseInt( dvBibleChapter.value);
    chapter -= 1;
    dvBibleChapter.value = String( chapter );

    var objChapter =  adjustBibleBookChapter( parseInt( dvBibleTitle.value), parseInt( dvBibleChapter.value) );

    dvBibleTitle.value = objChapter.bookNum.toString();
    dvBibleChapter.value = objChapter.chapterNum.toString();

    saveSearchWordsToStorage();
}


function tabDecreaseBibleChapterAndSearch(){

    searchBibleChapterNum -= 1;
    var objChapter =  adjustBibleBookChapter( searchBibleBookNum, searchBibleChapterNum );

    if( parseInt( dvBibleTitle.value ) == searchBibleBookNum &&  parseInt( dvBibleChapter.value) ==  searchBibleChapterNum+1 ){
        dvBibleTitle.value = objChapter.bookNum.toString();
        dvBibleChapter.value = objChapter.chapterNum.toString();

        saveSearchWordsToStorage();
    }

    searchBibleBookNum = objChapter.bookNum;
    searchBibleChapterNum = objChapter.chapterNum;

    tabSearchBibleChapter();
}


function increaseBibleChapter(){
    /*
    var chapter = parseInt( dvBibleChapter.value);
    chapter += 1;
    dvBibleChapter.value = String( chapter );
    searchBibleChapter();
    */

    var chapter = parseInt( dvBibleChapter.value);
    chapter += 1;
    dvBibleChapter.value = String( chapter );

    var objChapter =  adjustBibleBookChapter( parseInt( dvBibleTitle.value), parseInt( dvBibleChapter.value) );

    dvBibleTitle.value = objChapter.bookNum.toString();
    dvBibleChapter.value = objChapter.chapterNum.toString();

    // makeSearchChapterParam();

    searchBibleBookNum = objChapter.bookNum;
    searchBibleChapterNum = objChapter.chapterNum;

    saveSearchWordsToStorage();
}


function tabIncreaseBibleChapterAndSearch() {

    searchBibleChapterNum += 1;
    var objChapter =  adjustBibleBookChapter( searchBibleBookNum, searchBibleChapterNum );

    if( parseInt( dvBibleTitle.value ) == searchBibleBookNum &&  parseInt( dvBibleChapter.value) ==  searchBibleChapterNum-1 ){
        dvBibleTitle.value = objChapter.bookNum.toString();
        dvBibleChapter.value = objChapter.chapterNum.toString();

        saveSearchWordsToStorage();
    }

    searchBibleBookNum = objChapter.bookNum;
    searchBibleChapterNum = objChapter.chapterNum;

    tabSearchBibleChapter( );
}




function makeSearchChapterParam(){
    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {}
    };

    function consistSearchOpt( obj ){
        searchParam.option[obj.name] = obj.value;
    }

    function consistSearchOpt( optionName, obj ){
        searchParam.option[optionName] = obj.value;
    }

    if( dvBibleTitle.value == "" ){
        return;
    } else {
        // consistSearchOpt( "title", bibleTitle  );
        // searchParam.option["title"] = dvBibleTitle.value;
        var chapter = bibleChapterList.getChapterByNumber( dvBibleTitle.value );
        searchParam.option["title"] = chapter.title;
    }

    if( dvBibleChapter.value == "" ){
        return;
    } else {
        if( dvBibleChapter.value == 0 ){
            var chapter = bibleChapterList.getChapterByNumber( parseInt( dvBibleTitle.value) );
            if( chapter.bookNumber <= 1) {
                dvBibleChapter.value = "1";
                dvBibleTitle.value = "1";
                return;
            }else {
                var beforeChapter = bibleChapterList.getChapterByNumber( chapter.bookNumber -1 );
                dvBibleTitle.value = beforeChapter.bookNumber;
                dvBibleChapter.value = beforeChapter.lastNum;
                searchParam.option["title"] = beforeChapter.title;
            }
        }else{
            var chapter = bibleChapterList.getChapterByNumber( parseInt( dvBibleTitle.value) );
            if( chapter.lastNum < parseInt( dvBibleChapter.value) ){
                if( ( chapter.lastNum + 1 ) ==  parseInt( dvBibleChapter.value) ){
                    var nextChapter = bibleChapterList.getChapterByNumber( chapter.bookNumber +1);
                    if( nextChapter ) {
                        dvBibleTitle.value = nextChapter.bookNumber.toString();
                        dvBibleChapter.value = "1";
                        searchParam.option["title"] = nextChapter.title;
                    }else{
                        dvBibleChapter.value = chapter.lastNum.toString();
                    }
                }else{
                    dvBibleChapter.value = chapter.lastNum.toString();
                }
            }

        }

        // consistSearchOpt( "chapter", dvBibleChapter );
        searchParam.option["chapter"] = parseInt( dvBibleChapter.value );
    }

    return searchParam;
}


/*
function searchBibleChapter( callback ){

    var searchParam = makeSearchChapterParam();

    saveSearchWordsToStorage();

    tabMenu.selectTab('tab1Menu');

    if( searchParam.option["title"] == beforeChapterSearchParam.option["title"]
        && searchParam.option["chapter"] == beforeChapterSearchParam.option["chapter"] ) {
        adjustScrDiv.setIsFullScr("false");
        return;
    }

    beforeChapterSearchParam = copyObject( searchParam );

    reqeustAndShowContents('#tab1', searchParam, -1, function(){
        adjustScrDiv.setIsFullScr("false");
        if( callback ){
            callback();
        }
    } );
}
*/


function searchBibleChapter( callback ){

    searchBibleBookNum =  parseInt( dvBibleTitle.value);
    searchBibleChapterNum = parseInt( dvBibleChapter.value);

    if(isNaN( dvBibleChapter.value ) == true) {
        alert( "숫자를 입력해 주세요");
        $("#bibleChapter").focus();
        return;
    }

    tabMenu.selectTab('tab1Menu');

    var objChapter =  adjustBibleBookChapter( parseInt( dvBibleTitle.value), parseInt( dvBibleChapter.value) );
    dvBibleTitle.value = objChapter.bookNum.toString();
    dvBibleChapter.value = objChapter.chapterNum.toString();

    saveSearchWordsToStorage();

    searchBibleChapter_( objChapter, callback );
}


function tabSearchBibleChapter(){

    var objChapter =  adjustBibleBookChapter( searchBibleBookNum, searchBibleChapterNum );

    searchBibleChapter_( objChapter );
}




function searchBibleChapter_( objChapter, callback ){

    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {}
    };

    searchParam.option["title"] = objChapter.bookTitle;
    searchParam.option["chapter"] = objChapter.chapterNum;

    reqeustAndShowContents('#tab1', searchParam, -1, function(){
        if( callback ){
            callback();
        }

    } );


}




function requestBibleWithChapter( title, chapter, paragraph ){

    /*
    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {
            "title" : title,
            "chapter" : chapter
        }
    };

    var bookNum = bibleChapterList.getBookNumberByName( title );
    if( bookNum > 0 ) {
        dvBibleTitle.value = bookNum.toString();
    }

    dvBibleChapter.value = chapter;

    saveSearchWordsToStorage();

    tabMenu.selectTab('tab1Menu');

    reqeustAndShowContents( '#tab1', searchParam, paragraph, function(){
        adjustScrDiv.setIsFullScr("false");
    } );
    */

    // var chapter = bibleChapterList.getChapterByShortName( shortTitle );

    var bookNum = bibleChapterList.getBookNumberByName( title );

    searchBibleBookNum = bookNum;
    searchBibleChapterNum = chapter;

    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {
            "title" : title,
            "chapter" : chapter
        }
    };


    tabMenu.selectTab('tab1Menu');

    reqeustAndShowContents( '#tab1', searchParam, paragraph, function(){
        // adjustScrDiv.setIsFullScr("false");
        footerMenu.top();
    } );
}

// tabID : '#tab1'
function reqeustAndShowContents( tabID, searchParam , paragraph, completeCallback ){

    $(tabID).empty();
    $(tabID).append("Waiting....");

    var jsonStr = JSON.stringify( searchParam );

    httpRequest("POST", jsonStr, function( http ){
        $(tabID).empty();

        var resObj = JSON.parse( http.responseText );
        if( resObj.length < 1 ){
            $(tabID).append("검색된 결과가 없습니다.");
            if( completeCallback )
                completeCallback( searchParam, resObj );
            return;
        }

        if( searchParam.type != "Word" ) {

            $('#tabBibleBook').empty();
            $("#tabBibleBook").append( searchParam.option.title + "&nbsp;&nbsp;&nbsp;" );

            $('#tabBibleChapter').empty();
            $("#tabBibleChapter").append( "&nbsp;&nbsp;" + searchParam.option.chapter + "장&nbsp;&nbsp;" );
        }

        if( resObj.result != "undefined" && resObj.result == "fail" ){
            $(tabID).append( resObj.error + "\r\n" );
        }
        else {
            $(tabID).append( "<table>");
            //style=\'background-color:greenyellow\'
            function appendReceiveMsg( resObj, strConvText ){
                $(tabID).append( "<tr>");
                var strChapterLinkWithBibleContent = "";
                if( tabID == '#tab1') {
                    var reverseColor = '';
                    if( paragraph == resObj.paragraph ){
                        reverseColor = 'style=\'background-color:rgb(210, 210, 210);\'';
                    }
                    // strChapterLinkWithBibleContent = "<td width = \"150\" " + reverseColor + " >&nbsp;&nbsp;" + resObj.title + " " + resObj.chapter + ":" + resObj.paragraph + "</td>" + "<td" + " " + reverseColor + ">" + strConvText + "</td>";
                    strChapterLinkWithBibleContent = "<td width = \"25\" " + reverseColor + " >" + resObj.paragraph + "</td>" + "<td" + " " + reverseColor + ">" + strConvText + "</td>";
                }else if( tabID == '#tab2' ) {
                    strChapterLinkWithBibleContent = "<td width = \"150\"  >&nbsp;&nbsp;" + '<a href= "javascript:requestBibleWithChapter( \'' + resObj.title + '\',' + resObj.chapter + ',' + resObj.paragraph + ' )\" style=\"text-decoration:none; font-weight:bold; color:#0D63DB;\">'
                        + resObj.title + " " + resObj.chapter + ":" + resObj.paragraph + "</a>" + "</td>"
                        + "<td>" + strConvText + "</td>";
                }

                $(tabID).append( strChapterLinkWithBibleContent );
                $(tabID).append( "</tr>");
            }// end of function

            if (resObj.length != "undefined") {    // 배열로 받아올 경우
                for ( var idx in resObj) {
                    if( searchParam.type == "Word" ){
                        if( examinRightWordinText( searchParam.option.content.$regex, resObj[idx].content ) == true ){
                            var searchWord = removeSpaceInWord( searchParam.option.content.$regex );
                            var strConvText = makeStrongInText( layerManager, searchWord, resObj[idx] );
                            appendReceiveMsg( resObj[idx], strConvText );
                        }
                    }else {
                        var strConvText = "";
                        strConvText = makeStrongInText( layerManager, dvBibleWord.value, resObj[idx] );
                        appendReceiveMsg( resObj[idx], strConvText );
                    }

                }
            } else {        // 수신받은 데이터가 배열이 아니고 하나만 있을 경우
                if( searchParam.type == "Word" ){
                    if( examinRightWordinText( searchParam.option.content.$regex, resObj.content ) == true ) {
                        var searchWord = removeSpaceInWord( searchParam.option.content.$regex );
                        var strConvText = makeStrongInText( layerManager, searchWord, resObj );
                        appendReceiveMsg( resObj, strConvText );
                    }
                } else {
                    // var strConvText = makeStrongWordOfLocation( layerManager, resObj.content );
                    var strConvText = makeStrongInText( layerManager, "", resObj );
                    appendReceiveMsg( resObj, strConvText );
                }
            }
        }
        $(tabID).append( "<br></table >");


        if( tabID == '#tab1' && paragraph > 0 ){
            $(tabID).scrollTop( (paragraph -1)* 20 );
        }
        else
            $(tabID).scrollTop(0);

        if( completeCallback )
            completeCallback( searchParam, resObj );

    } );    // end of httpRequest

}
