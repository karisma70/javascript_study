
function menuDecreaseBibleChapter(){
    var chapter = parseInt( dvBibleChapter.value);
    chapter -= 1;
    dvBibleChapter.value = String( chapter );

    var objChapter =  adjustBibleBookChapter( parseInt( dvBibleTitle.value), parseInt( dvBibleChapter.value) );

    dvBibleTitle.value = objChapter.bookNum.toString();
    dvBibleChapter.value = objChapter.chapterNum.toString();

    saveSearchWordsToStorage();

    // makeSearchChapterParam();
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


function menuIncreaseBibleChapter(){
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



function footerMenuMiddle(){
    if( footerMenu.getMode() == "bottom" || footerMenu.getMode() == "hide")
        footerMenu.middle();
}



function mobileSearchBibleWord(){
    if( dvBibleWord.value == "" ){
        $("#bibleWord").focus();
        return;
    }

    saveSearchWordsToStorage();

    var searchWord = dvBibleWord.value;
    // searchWord = " "+removeSpaceInWord( searchWord );
    searchWord = removeSpaceInWord( searchWord );

    bibleSearchByWord( searchWord );

    $("#sideMenu").removeClass("open");

    footerMenu.top();
}

function bibleSearchByPlace( placeName ){
    bibleSearchByWord( placeName );

    // $("#tab2").scrollTop(0);
}


function bibleSearchByWord( searchWord ){
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

    reqeustAndShowContents( '#tab2', searchParam, -1, function( param, resObj ){
        tabMenu.selectTab('tab2Menu');

        if( footerMenu.getMode() == "bottom" || footerMenu.getMode() == "hide")
            footerMenu.middle();

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

        $("#tab2").scrollTop(0);

    } );
}


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



function menuSearchBibleChapter( callback ){

    searchBibleBookNum =  parseInt( dvBibleTitle.value);
    searchBibleChapterNum = parseInt( dvBibleChapter.value);

    if(isNaN( dvBibleChapter.value ) == true) {
        alert( "숫자를 입력해 주세요");
        $("#bibleChapter").focus();
        return;
    }

    // var searchParam = makeSearchChapterParam();
    var objChapter =  adjustBibleBookChapter( parseInt( dvBibleTitle.value), parseInt( dvBibleChapter.value) );
    dvBibleTitle.value = objChapter.bookNum.toString();
    dvBibleChapter.value = objChapter.chapterNum.toString();

    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {}
    };

    searchParam.option["title"] = objChapter.bookTitle;
    searchParam.option["chapter"] = objChapter.chapterNum;

    saveSearchWordsToStorage();

    $("#sideMenu").removeClass("open");

    tabMenu.selectTab('tab1Menu');

    reqeustAndShowContents('#tab1', searchParam, -1, function(){
        if( callback !== undefined ){
            callback();
        }

    } );
}

function tabSearchBibleChapter(){

    var objChapter =  adjustBibleBookChapter( searchBibleBookNum, searchBibleChapterNum );

    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {}
    };

    searchParam.option["title"] = objChapter.bookTitle;
    searchParam.option["chapter"] = objChapter.chapterNum;

    $("#sideMenu").removeClass("open");

    reqeustAndShowContents('#tab1', searchParam, -1, function(){
        if( callback ){
            callback();
        }

    } );

}


function appendReceiveMsg( tabID, resObj, strConvText, paragraph ){

    var lineImage = '<tr bgcolor=\"#ddd\"><td colspan=\"2\" style=\"height:2px;\"></td></tr>';

    $(tabID).append( "<tr>");
    var strChapterLinkWithBibleContent = "";
    if( tabID == '#tab1') {
        var reverseColor = 'style=\'background-color:rgb(255, 255, 255);\'';
        if( paragraph == resObj.paragraph ){
            reverseColor = 'style=\'background-color:rgb(210, 210, 210);\'';
        }
        strChapterLinkWithBibleContent = "<td width = \"25\" " + reverseColor + " >" + resObj.paragraph + "</td>" + "<td" + " " + reverseColor + ">" + strConvText + "</td>";
    }else if( tabID == '#tab2' ) {
        strChapterLinkWithBibleContent = "<td width = \"82\" >" + '<a href= "javascript:requestBibleWithShortChapter( \'' + resObj.shortTitle + '\',' + resObj.chapter + ',' + resObj.paragraph + ' )\" ' +
            'style=\"text-decoration:none; font-weight:bold; color:#0D63DB;\">'
            + resObj.shortTitle + " " + resObj.chapter + ":" + resObj.paragraph + "</a>" + "</td>"
            + "<td>" + strConvText + "</td>";
    }

    $(tabID).append( strChapterLinkWithBibleContent );
    $(tabID).append( "</tr>");
    // $(tabID).append( lineImage );

}// end of function


// tabID : '#tab1'
function reqeustAndShowContents( paramTabID, searchParam , paramParagraph, completeCallback ){

    // $(paramTabID).empty();
    // $(paramTabID).append("Waiting....");

    var tabID = paramTabID;
    var paragraph = paramParagraph;
    var jsonStr = JSON.stringify( searchParam );

    showDownloading();

    /*
    $(tabID).on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    */

    var rightRecCount = 0;
    $(tabID).empty();
    $(tabID).empty("서버로에 데이터 요청중....");

    httpRequest("POST", jsonStr, function( http ){

        hideDownloading();
        $(tabID).empty();

        var resObj = JSON.parse( http.responseText );
        if( resObj.length < 1 ){
            $(tabID).append("검색된 결과가 없습니다.");
            alert("검색된 결과가 없습니다  검색을 다시 시도해 주세요");

            if( searchParam.type == "Word"){
                gotoSearchWord();
            }

            if( completeCallback )
                completeCallback( searchParam, resObj );

            // $(tabID).off('scroll touchmove mousewheel');
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

            if (resObj.length != "undefined") {    // 배열로 받아올 경우
                for ( var idx in resObj) {
                    if( searchParam.type == "Word" ){
                        if( examinRightWordinText( searchParam.option.content.$regex, resObj[idx].content ) == true ){
                            rightRecCount ++;
                            var searchWord = removeSpaceInWord( searchParam.option.content.$regex );
                            var strConvText = makeStrongInText( layerManager, searchWord, resObj[idx] );
                            appendReceiveMsg( tabID, resObj[idx], strConvText, paragraph );
                        }
                    }else {
                        var strConvText = "";
                        strConvText = makeStrongInText( layerManager, dvBibleWord.value, resObj[idx] );
                        appendReceiveMsg( tabID, resObj[idx], strConvText, paragraph );
                    }

                }
            } else {        // 수신받은 데이터가 배열이 아니고 하나만 있을 경우
                if( searchParam.type == "Word" ){
                    if( examinRightWordinText( searchParam.option.content.$regex, resObj.content ) == true ) {
                        rightRecCount ++;
                        var searchWord = removeSpaceInWord( searchParam.option.content.$regex );
                        var strConvText = makeStrongInText( layerManager, searchWord, resObj );
                        appendReceiveMsg( tabID, resObj, strConvText, paragraph );
                    }
                } else {
                    // var strConvText = makeStrongWordOfLocation( layerManager, resObj.content );
                    var strConvText = makeStrongInText( layerManager, "", resObj );
                    appendReceiveMsg( tabID, resObj, strConvText, paragraph );
                }
            }
        }


        if( searchParam.type == "Word" && rightRecCount == 0 ) {
            alert("검색된 결과가 없습니다 검색어를 다시 입력해 주세요!");
            gotoSearchWord();
        }

        $(tabID).append( "<br></table >");

        if( tabID == '#tab1'){
            if( paragraph > 0 ){
                $(tabID).scrollTop((paragraph - 1) * 71);
            }else {
                $(tabID).scrollTop(0);
            }
        }
        else
            $(tabID).scrollTop(0);

        // $(tabID).off('scroll touchmove mousewheel');

        if( completeCallback )
            completeCallback( searchParam, resObj );

    } );    // end of httpRequest

}


function requestBibleWithShortChapter( shortTitle, chapterNum, paragraph ){

    var chapter = bibleChapterList.getChapterByShortName( shortTitle );

    searchBibleBookNum = chapter.bookNumber;
    searchBibleChapterNum = chapterNum;

    var searchParam = {
        type: "Args",     // book, chapter, paragraph 등으로 구성된 검색
        option: {
            "title" : chapter.title,
            "chapter" : chapterNum
        }
    };


    tabMenu.selectTab('tab1Menu');

    reqeustAndShowContents( '#tab1', searchParam, paragraph, function(){
        // adjustScrDiv.setIsFullScr("false");
        footerMenu.top();
    } );

}



function mobileSearchBiblePlace() {
    if (dvBiblePlace.value == "") {
        return;
    }

    dvBiblePlace.value = removeSpaceInWord(dvBiblePlace.value);


    saveSearchWordsToStorage();


    var dvSearchedPoiList = document.getElementById("searchedPoiList");
    dvSearchedPoiList.innerHTML = "";

    var strHrefText = "";

    var poiArray = layerManager.getPoiObjArrayFromDictionary( dvBiblePlace.value );

    if( poiArray.length > 1 ) {
        $("#searchedPoiList").show();

        dvSearchedPoiList.innerHTML = "<ol>";

        for (var idx in poiArray) {
            ConsoleLog(  "id : " +  poiArray[idx].id + ", Find POI : " + poiArray[idx].biblePlace + ", title : " + poiArray[idx].title);
            /*

             var tempString = '<a href=' + '"javascript:hideMenuAndMoveToPoiID( ' + poiArray[idx].id + ')\" style=\"text-decoration:none; color:rgb(0,0,0);\" >';
             tempString += poiArray[idx].title;
             tempString += '</a>';
             if( idx < poiArray.length )
             tempString += '<br>';
             */

            var tempString = '<li id=\"' + poiArray[idx].id + '\">' +  poiArray[idx].title + '</li>';

            strHrefText += tempString;
        }
        dvSearchedPoiList.innerHTML += strHrefText;
        dvSearchedPoiList.innerHTML += "</ol>";
    }else{
        $("#searchedPoiList").hide();
        poiObj = poiArray[0];
        hideMenuAndMoveToPoiID( poiObj.id );
    }

}