/**
 * Created by Administrator on 2017-05-17.
 */
var httpRequest = (function(){
    var xmlhttp = null;


    function createRequest() {
        var http = null;

        if( window.XMLHttpRequest ){
            http = new XMLHttpRequest();
        } else if( window.ActiveXObject ){
            http = new ActiveXObject("Microsoft.XMLHTTP");      // IE를 위한 코드
        }
        return http;
    }

    function getStateString( stateNumber ){
        for( prop in xmlhttp ) {
            if ( typeof(xmlhttp[prop]) == "number") {
                if (xmlhttp[prop] == stateNumber) {
                    return prop;
                }
            }
        }
        return null;
    }


    function requestData( method, url, callback ){
        if( xmlhttp == null ){
            xmlhttp = createRequest();
        }

        var urlArray = null;
/*
        if( typeof( xmlhttp.onload ) != "undefined"){
            xmlhttp.onload = function( e ) {
                // receiveEvent( "onload", method, callback );
                console.log( "readyState : " + getStateString( e.target.readyState ) + ", status : " + e.target.status );
                callback( xmlhttp );
            }
        } else {
            xmlhttp.onreadystatechange = function ( e ) {
                console.log( "readyState : " + getStateString( e.target.readyState ) + ", status : " + e.target.status );
                if( e.target.readyState == XMLHttpRequest.DONE ) {
                    if (e.target.status == 200) {
                        callback(xmlhttp);
                    } else {
                        alert( "Error!!!  code : " + e.target.status );
                    }
                }
            }
        }
*/
        xmlhttp.onreadystatechange = function ( e ) {
            if( e.target.readyState == XMLHttpRequest.DONE ) {
                if (e.target.status == 200) {
                    callback(xmlhttp);
                } else {
                    alert( "통신이 원활하지 않습니다 네트웍 상태를 확인해 주세요  Error Code : " + e.target.status );
                }
            }
        };

        if( typeof( xmlhttp.abort ) != "undefined"){
            xmlhttp.abort = function(){
                ConsoleLog( "abort!!!");
            }
        }

        if( typeof( xmlhttp.error ) != "undefined"){
            xmlhttp.error = function(){
                abort( "error !!!");
            }
        }

        if( typeof( xmlhttp.timeout ) != "undefined"){
            xmlhttp.error = function(){
                ConsoleLog( "timeout !!!");
            }
        }

        if( method == "POST") {
            urlArray = url.split("?");
            xmlhttp.open(method, urlArray[0], true);
        } else {
            if( method == "HEAD")
                xmlhttp.open(method, url, false );
            else
                xmlhttp.open(method, url, true );
        }

        if( method == "POST") {
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send( urlArray[1] );
        }else{
            xmlhttp.send(null)
        }
    }

    return function( method, jsonStr, callback ){
        // var url = "http://13.124.86.217:8083?" + jsonStr;
        var url = "http://13.124.86.217:8082?" + jsonStr;
        ConsoleLog( url );
        requestData( method, url, callback );
        /*
        requestData( "HEAD", url, function (http) {
            // alert(xmlhttp.getAllResponseHeaders());
            http.dataLength = parseInt( http.getResponseHeader("Content-Length"));
            http.dataType = http.getResponseHeader("Content-Type");
            http.responseAttachText = "Flie Len : " + parseInt( http.getResponseHeader("Content-Length"), 10)
                + ", Last Updated Date : " + http.getResponseHeader("Last-Modified")
                + ", Content type : " + http.getResponseHeader("Content-Type");
            requestData( method, url, callback );
        });
        */
    }
}());


function requestPoiInfo( poiObj, recvFunc,  noRecvFunc){
    var searchParam = {
        type: "Poi",     // book, chapter, paragraph 등으로 구성된 검색
        option: {}
    };

    // searchParam.option["name"] = poiName;
    searchParam.option["name"] = poiObj.biblePlace;
    if( poiObj.title != "" ){
        searchParam.option["title"] = poiObj.title;
    }

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


var BibleChapterList = function() {

    var chapterArray = [];
    var callbackFunc = null;

    this.setCallback = function ( callback ){
        callbackFunc = callback;
    };

    setChapterArray = function(  objList ){
        // chapterArray = [];

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


    this.getChapterByShortName = function( chapterName ){
        for( var idx in chapterArray ){
            var chapter = chapterArray[idx];
            if( chapter.shortTitle == chapterName ){
                return chapter;
            }
        }
        return -1;
    };

    // this.requestBibleChapter = function( callback ){
    this.requestBibleChapter = function( ){
        var searchParam = {
            type: "ChapterList",
            option: {}
        };

        var jsonStr = JSON.stringify( searchParam );
        // ConsoleLog( "send param : " + jsonStr );

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

            if( callbackFunc )
                callbackFunc();

        }) ;

    };

};
