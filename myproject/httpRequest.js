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

    function receiveEvent( propertyFunction, method, callback ) {
        if (xmlhttp.readyState != 4 ){
            if( propertyFunction == "onload") {
                alert("Error!! readyState Code : " + xmlhttp.readyState);
            } else {
                console.log("readyState Code : " + xmlhttp.readyState);
            }
            return;
        }

        if( xmlhttp.status == 200) {
            if (method == "HEAD") {
                alert(xmlhttp.getAllResponseHeaders());
                callback( xmlhttp );
            } else {
                callback( xmlhttp );
            }
        }
        else{
            alert( "Error!! status code : " + xmlhttp.status );
        }
    }

    function requestData( method, url, callback ){
        if( xmlhttp == null ){
            xmlhttp = createRequest();
        }

        var urlArray = null;

        if( method == "POST") {
            urlArray = url.split("?");
            xmlhttp.open(method, urlArray[0], true);
        } else {
            xmlhttp.open(method, url, true);
        }

        if( typeof( xmlhttp.onload ) != "undefined"){
            xmlhttp.onload = function() {
                receiveEvent( "onload", method, callback );
            }
        } else {
            xmlhttp.onreadystatechange = function () {
                receiveEvent( "onreadystatechange", method, callback );
            }
        }

        if( method == "POST") {
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send( urlArray[1] );
        }else{
            xmlhttp.send(null)
        }
    }

    return function( method, url, callback ){
        requestData( "HEAD", url, function (http) {
            http.responseAttachText = "Flie Len : " + parseInt( http.getResponseHeader("Content-Length"), 10) + ", Last Updated Date : "
                + http.getResponseHeader("Last-Modified") + ", Content type : " + http.getResponseHeader("Content-Type");
            requestData( method, url, callback );
        });

    }
}());
