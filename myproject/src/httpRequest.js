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
                    alert( "Error!!!  code : " + e.target.status );
                }
            }
        };

        if( typeof( xmlhttp.abort ) != "undefined"){
            xmlhttp.abort = function(){
                console.log( "abort!!!");
            }
        }

        if( typeof( xmlhttp.error ) != "undefined"){
            xmlhttp.error = function(){
                abort( "error !!!");
            }
        }

        if( typeof( xmlhttp.timeout ) != "undefined"){
            xmlhttp.error = function(){
                console.log( "timeout !!!");
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

        // if ( xmlhttp.overrideMimeType)       // 사용자 정의 파일 다운로드시
           //  xmlhttp.overrideMimeType('text/plain; charset=x-user-defined');

        if( method == "POST") {
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send( urlArray[1] );
        }else{
            xmlhttp.send(null)
        }
    }

    return function( method, url, callback ){
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