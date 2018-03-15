function mobileDecreaseBibleChapter(){
    var chapter = parseInt( dvBibleChapter.value);
    chapter -= 1;
    dvBibleChapter.value = String( chapter );
    // mobileSearchBibleChapter();
    // $("#menu").removeClass("open");
    makeSearchChapterParam();
}


function mobileIncreaseBibleChapter(){
    var chapter = parseInt( dvBibleChapter.value);
    chapter += 1;
    dvBibleChapter.value = String( chapter );
    // mobileSearchBibleChapter();
    // $("#menu").removeClass("open");
    makeSearchChapterParam();
}


function mobileSearchBibleWord(){
    if( dvBibleWord.value == "" ){
        $("#bibleWord").focus();
        return;
    }

    // alert("mobileSearchBibleWord!!!");

    // saveSearchWordsToStorage();

    // adjustScrDiv.setIsFullScr("false");

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

    $("#menu").removeClass("open");

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


function mobileSearchBibleChapter( callback ){

    var searchParam = makeSearchChapterParam();

    //   saveSearchWordsToStorage();

    $("#menu").removeClass("open");

    tabMenu.selectTab('tab1Menu');

    reqeustAndShowContents('#tab1', searchParam, -1, function(){
//    reqeustAndShowContents('#bibleContentTitle', searchParam, -1, function(){
        // adjustScrDiv.setIsFullScr("false");
        if( callback ){
            callback();
        }
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
                    strChapterLinkWithBibleContent = "<td width = \"80\" " + reverseColor + " >&nbsp;&nbsp;" + resObj.shortTitle + " " + resObj.chapter + ":" + resObj.paragraph + "</td>" + "<td" + " " + reverseColor + ">" + strConvText + "</td>";
                }else if( tabID == '#tab2' ) {
                    strChapterLinkWithBibleContent = "<td width = \"80\"  >&nbsp;&nbsp;" + '<a href= "javascript:requestBibleWithShortChapter( \'' + resObj.shortTitle + '\',' + resObj.chapter + ',' + resObj.paragraph + ' )\" style=\"text-decoration:none; font-weight:bold; color:#464646;\">'
                        + resObj.shortTitle + " " + resObj.chapter + ":" + resObj.paragraph + "</a>" + "</td>"
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
            $(tabID).scrollTop( (paragraph -1)* 67 );
        }
        else
            $(tabID).scrollTop(0);

        if( completeCallback )
            completeCallback( searchParam, resObj );

    } );    // end of httpRequest

}


function requestBibleWithShortChapter( shortTitle, chapterNum, paragraph ){

    var chapter = bibleChapterList.getChapterByShortName( shortTitle );
    if( chapter.bookNumber > 0 ) {
        dvBibleTitle.value = chapter.bookNumber.toString();
    }

    dvBibleChapter.value = chapter.title;

    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {
            "title" : chapter.title,
            "chapter" : chapterNum
        }
    };

    saveSearchWordsToStorage();

    tabMenu.selectTab('tab1Menu');

    reqeustAndShowContents( '#tab1', searchParam, paragraph, function(){
        adjustScrDiv.setIsFullScr("false");
    } );

}