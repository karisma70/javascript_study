/**
 * Created by Administrator on 2017-07-07.
 */

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
        if( this.poiQue.length > 0 ){
            if( poiObj.id == this.poiQue[ this.poiQue.length-1].id )    // 동일한 id가 다시 들어오면 넣지 않는다
                return;
            this.poiQue.push(poiObj);
        }
        else {
            this.poiQue.push(poiObj);
        }
        if( this.poiQue.length > this.maxCount )
            this.poiQue.shift();
        this.cursor = this.poiQue.length-1;
        ConsoleLog( "insertPoi =>  cursor: " + this.cursor, ", poiName: " + poiObj.biblePlace );

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

        ConsoleLog( "prev!! Cursor : " + this.cursor + ", poiName: " +  this.poiQue[ this.cursor ].biblePlace );
        return this.poiQue[ this.cursor ];
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
        for( var idx in this.poiQue ){
            var tempObj = this.poiQue[idx];
            ConsoleLog( "id : " + tempObj.id + ", " + "poiName: " + tempObj.biblePlace );
        }

    };
};


function isLocalStorageEnabled() {

    if( 'localStorage' in window && window.localStorage !== null ) {
        alert("localstorage is not nul l!!");

        try {
            var mod = '__storage_test__';
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            alert("localstorage can use setItem l!!");
            return true;
        } catch (e) {
            alert("localstorage cannot use setItem l!!");
            return false;
        }
    }else{
        alert("localStorage is not support!!");
    }
}

function saveSearchWordsToStorage( ){

    if( 'localStorage' in window && window.localStorage !== null ) {
        var Obj = {
            'bibleTitle': dvBibleTitle.value,
            'bibleChapter': dvBibleChapter.value.toString(),
            'bibleWord': dvBibleWord.value,
            'biblePlace': dvBiblePlace.value
        };

        var strObj = JSON.stringify(Obj);
        // alert("JSON : " + strObj );
        var storage = window.localStorage;

        try {
            storage.setItem('bibleMap', strObj);
        }catch( ex ){
            alert( "This browser is not support for localStorage!!");
        }
    }
    else{
        alert("This browser cannot use localStorage!!");
    }
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

