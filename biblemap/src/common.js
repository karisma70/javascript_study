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
