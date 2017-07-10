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


