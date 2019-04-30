/**
 * Created by Administrator on 2017-07-07.
 */

Date.prototype.getCurMonth = function(){
    return (this.getMonth() +1 );
};


Date.prototype.getCurDay = function(){
    return (this.getDay() +1 );
};


function removeSpaceInWord( strText){
    strText = strText.replace(/^\s*|\s*$/g, '');
    return strText;
} // 좌우 공백 제거

function copyObject( obj ){
    if( obj == null || typeof(obj) != 'object'){
        return;
    }

    var copyObj = obj.constructor();

    for( var attr in obj ){
        if( obj.hasOwnProperty( attr )){
            copyObj[attr] = obj[attr];
        }
    }

    return copyObj;
}

function cloneObject( obj ) {
    return jQuery.extend( true, {}, obj );
}

function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}


(function() {
    var IsDebug = true;

    function wrap(func, wrapper) {             // 2.
        return function () {
            var args = [func].concat(Array.prototype.slice.call(arguments));
            return wrapper.apply(this, args);
        };
    }

    window.ConsoleLog = wrap( console.log, function (func_with_args) {         // 1.
        if (IsDebug == true) {
            // return func_with_args.apply(this, Array.prototype.slice.call(arguments, 1));
            console.log( Array.prototype.slice.call(arguments, 1));
        }
    });

    window.setDebug = function (setVal) {
        IsDebug = setVal;
    };
}());


HistoryClickedPoi = function(){
    this.maxCount = 20;
    this.poiQue = [];
    this.cursor = -1;

    this.insertPoi = function( poiObj ){

        // var out = "maxCount : " + this.maxCount + ",  poiQue.length : " + this.poiQue.length + ", poiObj.biblePlace : " + poiObj.biblePlace;
        // alert( out );

        if( this.poiQue.length > 0 ){
           //  alert( "1" );
            if( poiObj.id == this.poiQue[ this.poiQue.length-1].id )    // 동일한 id가 다시 들어오면 넣지 않는다
                return;
            // alert( "2" );
            this.poiQue.push(poiObj);
           // alert( "3" );
        }
        else {
           //  alert( "4" );
            this.poiQue.push(poiObj);
           //  alert( "5" );
        }
        if( this.poiQue.length > this.maxCount ) {
            this.poiQue.shift();
           // alert( "6" );
        }
        // alert( "7" );
        this.cursor = this.poiQue.length-1;
        // ConsoleLog( "insertPoi =>  cursor: " + this.cursor, ", poiName: " + poiObj.biblePlace );

        // alert( "8, " +  poiObj.biblePlace );
        // var out2 = "insertPoi =>  cursor: " + this.cursor + ", poiName: " + poiObj.biblePlace;
        // alert( out2 );

        this.wholePrint();
    };

    this.getCurrentPoi = function(){
        return this.poiQue[ this.cursor ];
    };

    this.prevPoi = function(){
        if( this.poiQue.length < 0 )
            return null;

        this.cursor --;
        if( this.cursor < 0 )
            this.cursor = 0;

        var retObj = this.poiQue[ this.cursor ];

        ConsoleLog( "prev!! Cursor : " + this.cursor + ", poiName: " +  this.poiQue[ this.cursor ].biblePlace );
        // this.poiQue.pop();

        this.wholePrint();
        return retObj;
    };

    this.nextPoi = function(){
        if( this.poiQue.length < 0 )
            return null;

        this.cursor ++;
        if( this.cursor > this.poiQue.length-1 )
            this.cursor = this.poiQue.length-1;

        ConsoleLog( "next!! Cursor : " + this.cursor + ", poiName: " +  this.poiQue[ this.cursor ].biblePlace );
        return this.poiQue[ this.cursor ];
    };

    this.wholePrint = function(){

        return;

        for( var idx in this.poiQue ){
            var tempObj = this.poiQue[idx];
            ConsoleLog( "idx: " + idx + ", id : " + tempObj.id + ", " + "poiName: " + tempObj.biblePlace );
        }

    };
};


function setCookie( cookieName, value, duration ){
    var expDate = new Date();
    expDate.setDate( expDate.getDate() + duration );

    var strVal = value + ';  expires=' + expDate.toUTCString();
    document.cookie = cookieName + '=' + strVal + ';';
    alert(  document.cookie );
}


/*
function getCookie( cookieName ){

    alert(document.cookie);

    var strSplit = document.cookie.split(';');

    for (var i = 0; i < strSplit.length; i++) {
        var strRow = strSplit[i].substr(0, strSplit[i].indexOf('='));
        strRowVal = strSplit[i].substr( strSplit[i].indexOf('=') + 1);
        strRow = strRow.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if ( strRow == cookieName) {
            // alert(  strRowVal );
            return strRowVal ; // unescape로 디코딩 후 값 리턴
        }
    }

    return "";
}
*/

function getCookie( cookieName ) {
    var search = cookieName + "=";
    var cookie = document.cookie;

    // 현재 쿠키가 존재할 경우
    if (cookie.length > 0) {
        // 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
        startIndex = cookie.indexOf(cookieName);

        // 만약 존재한다면
        if (startIndex != -1){
            startIndex += cookieName.length;
            endIndex = cookie.indexOf( ";", startIndex );

            if( endIndex == -1)
                endIndex = cookie.length;

            return cookie.substring( startIndex + 1, endIndex );
        }
    }

    return "";

}


function saveSearchWordsToCookie( ) {

    var Obj = {
        'bibleTitle': dvBibleTitle.value,
        'bibleChapter': dvBibleChapter.value.toString(),
        'bibleWord': dvBibleWord.value,
        'biblePlace': dvBiblePlace.value
    };

    var strObj = JSON.stringify(Obj);
    alert("json => " + strObj );

    setCookie( 'bibleMap', strObj, 1 );
    alert( "getCookie : " + getCookie( 'bibleMap') );
}


function getSearchWordsFromCookie( ) {

    var strText = getCookie('bibleMap' );
    if( strText == "" )
        return;

    var Obj = JSON.parse( strText );
    if( Obj == null )
        return;

    var strText = "";
    if( Obj.hasOwnProperty('bibleTitle' ) ) {
        if( typeof( Obj['bibleTitle'] ) == "string")
            strText = Obj['bibleTitle'];
    }
    if( strText == "")
        strText = "7";
    $( "#bibleTitle" ).val( strText );

    strText = "";
    if( Obj.hasOwnProperty('bibleChapter' ) ) {
        if (typeof( Obj['bibleChapter'] ) == "string")
            strText = Obj['bibleChapter'];
    }
    if( strText == "" ){
        strText = "1";
    }
    $("#bibleChapter").val( strText );

    strText = "";
    if( Obj.hasOwnProperty('bibleWord' )){
        if( typeof( Obj['bibleWord'] ) == "string")
            strText = Obj['bibleWord'];
    }
    if( strText == ""){
        strText = "바울";
    }
    $("#bibleWord").val( strText );

    strText = "";
    if( Obj.hasOwnProperty('biblePlace' )){
        if( typeof( Obj['biblePlace'] ) == "string")
            strText = Obj['biblePlace'];
    }
    if( strText == "" ){
        strText = "예루살렘";
    }
    $("#biblePlace").val( strText );

}


function checkLocalStorageEnabled() {

    if( 'localStorage' in window && window.localStorage !== null ) {
        try {
            var mod = '__storage_test__';
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            alert("localstorage cannot use setItem l!!");
            return false;
        }
    }else{
        alert("localStorage is not support!!");
        return false;
    }
}


function saveFocusPoiToStorage( ){

    if( window.focusPoiObj == null ) {
        return;
    }

    var Obj = {
        'focusPoiPlace': window.focusPoiObj.biblePlace,
        'focusPoiTitle': window.focusPoiObj.title
    };

    var strObj = JSON.stringify(Obj);
    var storage = window.localStorage;

    storage.setItem('bibleMap-poi', strObj);
}

function getFocusPoiFromStorage(){
    var strObj = localStorage.getItem('bibleMap-poi');
    //var strObj = localStorage.getItem('bibleMap-poi-');
    if (strObj == null) {
        return null;
    }

    var Obj = JSON.parse( strObj );
    if( Obj == null ) {
        return null;
    }

    var strPoiPlace = "";
    if( Obj.hasOwnProperty('focusPoiPlace')){
        if( typeof( Obj['focusPoiPlace'] ) == "string")
            strPoiPlace = Obj['focusPoiPlace'];
    }

    var strPoiTitle = "";
    if( Obj.hasOwnProperty( 'focusPoiTitle')){
        if( typeof( Obj['focusPoiTitle'] ) == "string")
            strPoiTitle = Obj['focusPoiTitle'];
    }

    if( strPoiPlace != "" ){
        var strPoi = {
            'place': strPoiPlace,
            'title': strPoiTitle
        };
        return strPoi;
    }
    else {
        return null;
    }
}



function saveLocationToStorage( zoom, posX, posY ){
    //alert( "saveLocation !!! ");

    window.zoom = zoom;
    window.posX = posX;
    window.posY = posY;

    var Obj = {
        'zoom' : window.zoom,
        'posX'  : window.posX,
        'posY'  : window.posY
    };

    var strObj = JSON.stringify(Obj);
    var storage = window.localStorage;

    storage.setItem('bibleMap-location', strObj);
}


function getLocationFromStorage() {
    var strObj = localStorage.getItem('bibleMap-location');
    // var strObj = localStorage.getItem('bibleMap-location-');
    if (strObj == null) {
        window.zoom = 0;
        window.posX = 0;
        window.posY = 0;
        return;
    }


    var Obj = JSON.parse( strObj );
    if( Obj == null ) {
        window.zoom = 0;
        window.posX = 0;
        window.posY = 0;
        return;
    }

    if( Obj.hasOwnProperty('zoom' )){
        if( typeof( Obj['zoom'] ) == "number") {
            window.zoom = Obj['zoom'];
        }
    }

    if( Obj.hasOwnProperty('posX' )){
        if( typeof( Obj['posX'] ) == "number") {
            window.posX = Obj['posX'];
        }
    }

    if( Obj.hasOwnProperty('posY' )){
        if( typeof( Obj['posY'] ) == "number") {
            window.posY = Obj['posY'];
        }
    }
}


function saveSearchWordsToStorage( ){

    if( checkLocalStorageEnabled() == false ) {
        return;
    }

    var Obj = {
        'bibleTitle': dvBibleTitle.value,
        'bibleChapter': dvBibleChapter.value.toString(),
        'bibleWord': dvBibleWord.value,
        'biblePlace': dvBiblePlace.value
    };

    var strObj = JSON.stringify(Obj);
    var storage = window.localStorage;
    storage.setItem('bibleMap', strObj);
}


function saveCurrentDayToStorage( curDate, storageName ){
    if( checkLocalStorageEnabled() == false ) {
        return;
    }

    ConsoleLog( "Year: " + curDate.getFullYear() + ", Mon: " + curDate.getCurMonth() + ", Day: " + curDate.getCurDay() + ", Hour : " + curDate.getHours() + ", Min : " + curDate.getMinutes() );

    var Obj = {
        'year': curDate.getFullYear(),
        'mon': curDate.getCurMonth(),
        'day': curDate.getCurDay(),
        'hour' :  curDate.getHours(),
        'min' : curDate.getMinutes()
     };

    var strObj = JSON.stringify(Obj);
    // alert("JSON : " + strObj );
    var storage = window.localStorage;

    // storage.setItem('bibleMap-day', strObj);
    storage.setItem( storageName, strObj);

}

function getCurrentDayFromStorage( storageName ){
    var strObj = localStorage.getItem( storageName );
    if( strObj === undefined || strObj == null ){
        return null;
    }

    var Obj = JSON.parse( strObj );
    if( Obj == null )
        return null;

    return Obj;
}


function getSearchWordsFromStorage(){
    var strObj = localStorage.getItem( 'bibleMap');
    if( strObj == null ){
        $("#bibleTitle" ).val( "7");
        $("#bibleChapter").val( "1" );
        return;
    }
    var Obj = JSON.parse( strObj );
    if( Obj == null )
        return;

    var strText = "";
    if( Obj.hasOwnProperty('bibleTitle' ) ) {
        if( typeof( Obj['bibleTitle'] ) == "string")
            strText = Obj['bibleTitle'];
    }
    if( strText == "")
        strText = "7";
    $( "#bibleTitle" ).val( strText );

    strText = "";
    if( Obj.hasOwnProperty('bibleChapter' ) ) {
        if (typeof( Obj['bibleChapter'] ) == "string")
            strText = Obj['bibleChapter'];
    }
    if( strText == "" ){
        strText = "1";
    }
    $("#bibleChapter").val( strText );

    strText = "";
    if( Obj.hasOwnProperty('bibleWord' )){
        if( typeof( Obj['bibleWord'] ) == "string")
            strText = Obj['bibleWord'];
    }
    if( strText == ""){
        strText = "바울";
    }
    $("#bibleWord").val( strText );

    strText = "";
    if( Obj.hasOwnProperty('biblePlace' )){
        if( typeof( Obj['biblePlace'] ) == "string")
            strText = Obj['biblePlace'];
    }
    if( strText == "" ){
        strText = "예루살렘";
    }
    $("#biblePlace").val( strText );

}

function getWhatBrowser(){
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("chrome") != -1)
        return 'Chrome';
    if (agt.indexOf("opera") != -1)
        return 'Opera';
    if (agt.indexOf("staroffice") != -1)
        return 'Star Office';
    if (agt.indexOf("webtv") != -1)
        return 'WebTV';
    if (agt.indexOf("beonex") != -1)
        return 'Beonex';
    if (agt.indexOf("chimera") != -1)
        return 'Chimera';
    if (agt.indexOf("netpositive") != -1)
        return 'NetPositive';
    if (agt.indexOf("phoenix") != -1)
        return 'Phoenix';
    if (agt.indexOf("firefox") != -1)
        return 'Firefox';
    if (agt.indexOf("safari") != -1)
        return 'Safari';
    if (agt.indexOf("skipstone") != -1)
        return 'SkipStone';
    if (agt.indexOf("netscape") != -1)
        return 'Netscape';
    if (agt.indexOf("mozilla/5.0") != -1)
        return 'Mozilla';
    if (agt.indexOf("msie") != -1) { // 익스플로러 일 경우
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return 'Internet Explorer '+rv;
    }
}


function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function IsIntersectExtent( extent, mapX, mapY ){
    if( extent[0] < mapX && extent[2] > mapX  ){
        if( extent[1] < mapY && extent[3] > mapY ) {
            return true;
        }
    }

    return false;
}

// 'bibleMap-day'
function windowReloadByCurDate( storageName ) {

    var curDate = new Date();

    var dayObj = getCurrentDayFromStorage( storageName );
    if (dayObj == null) {
        saveCurrentDayToStorage(curDate, storageName );
        // alert( "refresh!!!");
        window.location.reload(true);
        return true;
    } else {


        if (dayObj.year != curDate.getFullYear() || dayObj.mon != curDate.getCurMonth() || dayObj.day != curDate.getCurDay() || dayObj.hour != curDate.getHours() || dayObj.min != curDate.getMinutes()) {
            saveCurrentDayToStorage(curDate, storageName );
            // alert( "refresh!!!");
            window.location.reload(true);
            return true;
        }
        else
            return false;
    }
}


var IEVersionCheck = function() {

    var word;
    var version = "N/A";

    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;

    // IE old version ( IE 10 or Lower )
    if ( name == "Microsoft Internet Explorer" ) word = "msie ";

    else {
        // IE 11
        if ( agent.search("trident") > -1 ) word = "trident/.*rv:";

        // IE 12  ( Microsoft Edge )
        else if ( agent.search("edge/") > -1 ) word = "edge/";
    }

    var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
    if (  reg.exec( agent ) != null  )
        version = RegExp.$1 + RegExp.$2;

    return version;
};



function isMobile(){
    var userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.match('iphone')) {
        return true;
    } else if(userAgent.match('ipad')) { // sizes="72*72"
        return true;
    } else if(userAgent.match('ipod')) {
        return true;
    } else if(userAgent.match('android')) {
        return true;
    } else {
        return false;
    }
}


function redirectByBrowser() {

    var isReload = windowReloadByCurDate('biblemapRedirect-day');
    /*
    if (isReload == true)
        alert("updated ___ !!!");
    else
        alert("not updated ____!!");
        */

    if (isMobile() == true) {
        location.replace('biblemapMobile.html');
    }
    else {
        var iEVersion = IEVersionCheck();

        if (iEVersion == 'N/A') {
            location.replace('biblemap3D.html');
        }
        else {
            var numVersion = parseFloat(iEVersion);
            if (numVersion >= 11) {
                location.replace('biblemap3D.html');
            } else {
                location.replace('download_guide.html');
            }
        }
    }
}