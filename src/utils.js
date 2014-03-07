var utils = {};

var __extends = function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

// lodash
/** Used to determine if values are of the language type Object */
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.io/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return !!(value && objectTypes[typeof value]);
}
function isNaN(value) {
    // `NaN` as a primitive is the only value that is not equal to itself
    // (perform the [[Class]] check first to avoid errors with some host objects in IE)
    return isNumber(value) && value != +value;
}
function isNull(value) {
    return value === null;
}
/* Note: `NaN` is considered a number. See http://es5.github.io/#x8.5. */
function isNumber(value) {
    return typeof value == 'number' ||
        value && typeof value == 'object' && toString.call(value) == numberClass || false;
}
function isRegExp(value) {
    return value && objectTypes[typeof value] && toString.call(value) == regexpClass || false;
}

function isString(value) {
    return typeof value == 'string' ||
        value && typeof value == 'object' && toString.call(value) == stringClass || false;
}

var isFunction = function (value) {
    return typeof value == 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
    isFunction = function(value) {
        return typeof value == 'function' && toString.call(value) == funcClass;
    };
}

function isDate(value) {
    return value && typeof value == 'object' && toString.call(value) == dateClass || false;
}

function isBoolean(value) {
    return value === true || value === false ||
        value && typeof value == 'object' && toString.call(value) == boolClass || false;
}

function isUndefined (value) {
    return typeof value == 'undefined';
}

// Array
/** Used to detect if a method is native */
var reNative = RegExp('^' +
    String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
);
function isNative(value) {
    return typeof value == 'function' && reNative.test(value);
}
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;
var isArray = nativeIsArray || function(value) {
    return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == arrayClass || false;
};

var nextId = (function(){
    var id = 1;
    return function(){
        return id++;
    };
})();

var arrIndexOf = function(arr, obj){
    for(var i=0; i < arr.length; i++){
        if(arr[i] === obj){
            return i;
        }
    }
    return -1;
};

/**
 _.once
 */
function once(func) {
    var ran,
        result;
    if (!isFunction(func)) {
        throw new TypeError();
    }
    return function() {
        if (ran) {
            return result;
        }
        ran = true;
        result = func.apply(this, arguments);

        // clear the `func` variable so the function may be garbage collected
        func = null;
        return result;
    };
}

var clone = function (obj) {
    if (!isObject(obj)) return obj;
    return isArray(obj) ? obj.slice() : extend({}, obj);
};
var extend = function (obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.forEach( function(source) {
        if(source){
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};
/**
 * Expose `utils`.
 */
utils.isString = isString;
utils.isUndefined = isUndefined;
utils.isBoolean = isBoolean;
utils.isDate = isDate;
utils.isFunction = isFunction;
utils.isNumber = isNumber;
utils.isNull = isNull;
utils.isNaN = isNaN;
utils.isObject = isObject;
utils.isArray = isArray;
utils.nextId = nextId;
utils.extends = __extends;
utils.arrIndexOf = arrIndexOf;
utils.once = once;
utils.clone = clone;
utils.extend = extend;
exports = module.exports = utils;