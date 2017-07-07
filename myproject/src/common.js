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

function ConsoleLog( ){
    this.IsDebug = true;

    this.setDebug = function( setVal ){
        this.IsDebug = setVal;
    };
    this.getDebug = function(){
        return this.IsDebug;
    };

    this.wrap = function( func, wrapper ){
        return function() {
            var args = [func].concat(Array.prototype.slice.call(arguments));
            return wrapper.apply(this, args);
        }
    };

    this.log =  this.wrap( console.log, function( func_with_args ){
        if( this.IsDebug == true)
            return func_with_args.apply( this, Array.prototype.slice.call( arguments, 1));
        else
            return null;
    } );

    return this;
}

window.Console = new ConsoleLog();

Console.setDebug( true );