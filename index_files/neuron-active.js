/**
 * @preserve Neuron JavaScript Framework & Library
 * author i@kael.me
 */

// "use strict";
 
/**
 * corek
 * seed.js -> lang/ -> ua/ -> loader/ -> oop/ -> selector/ -> dom/ -> biz/
 */

/**
 * module seed
 */

/**
 * @param {undefined=} undef
 *
 * REMEMBER: NEVER use undefined, because writing 'undefined = true;' will bring mass catastrophe
 */ 
;(function(host, K, undef){

// exactly, K must be an object, or override it
K = host[K] = host && host[K] || {};


/**
 * host of global runtime environment
 
 * @type {Object}
 	exports, if NodeJS
	DOMWindow, if browsers 	
 */
K.__HOST = host = K.__HOST || host;


/**
 * isXXX method - basic javascript type detecting
 
 * NEVER use DP._type to test for a certain type in your javascript for business, 
 * since the returned string may be subject to change in a future version 
 
 * ALWAYS use DP.isXXX instead, because:
  	- typeof is unreliable and imprecise
  	- the best method to detect whether the passed object matches a specified type is ever changing
  	
   in the future, DP.isXXX method may support Object.is(obj, type) of ECMAScript6		
 * ------------------------------------------------------------------------------------ */
K._type = function(){
	
	/**
	 * @param {all} obj
	 * @param {boolean=} strict, 
	 	if true, method _type will only return a certain type from the type_list
	 
	 * NEVER use K._type(undefined)
	 * for undefined/null, use obj === undefined / obj === null instead
	 
	 * for host objects, always return 'object'
	 */
	function _type(obj, strict){
		return type_map[ toString.call(obj) ] || !strict && obj && 'object' || undef;
	};

	var toString = Object.prototype.toString,
		_K = K,
		
		// basic javascript types
		// never include any host types or new types of javascript variables for compatibility
		type_list = 'Boolean Number String Function Array Date RegExp Object'.split(' '),
		i = type_list.length,
		
		type_map = {},
		name,
		name_lower, 
		isObject;
		
	while( i -- ){
		name = type_list[i];
		name_lower = name.toLowerCase();
		
		type_map[ '[object ' + name + ']' ] = name_lower;
		
		_K['is' + name] = name === 'Object' ?
		
			// Object.prototype.toString in IE:
			// undefined 	-> [object Object]
			// null 		-> [object Object]
			isObject = function(nl){
				return function(o){
					return !!o && _type(o) === nl;
				}
			}(name_lower)
		:
			function(nl){
				return function(o){
					return _type(o) === nl;
				}
			}(name_lower);
	}
	
	
	/**
	 * whether an object is created by '{}', new Object(), or new myClass() [1]
	 * to put the first priority on performance, just make a simple method to detect plainObject.
	 * so it's imprecise in many aspects, which might fail with:
	 *	- location
	 *	- other obtrusive changes of global objects which is forbidden
	 */
	_K.isPlainObject = function(obj){
	
		// undefined 	-> false
		// null			-> false
		return !!obj && toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj;
	};
	
	
	/**
	 * simple method to detect DOMWindow in a clean world that has not been destroyed
	 */
	_K.isWindow = function(obj){
	
		// toString.call(window):
		// [object Object]	-> IE
		// [object global]	-> Chrome
		// [object Window]	-> Firefox
		
		// isObject(window)	-> 'object'
		return isObject(obj) && 'setInterval' in obj; 
	};
	
	
	/**
	 * never use isNaN function, use DP.isNaN instead.  NaN === NaN // false
	 * @return {boolean} 
	 	true, if Number(obj) is NaN
	 	
	 * ref:
	 * http://es5.github.com/#x15.1.2.4
	 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/isNaN
	 */
	// TODO
	// _K.isNaN = function(obj){
	//	return obj == null || !/\d/.test( obj ) || isNaN( obj );
	// };

	return _type;
}();


/**
 * build time will be replaced when packaging and compressing
 */
K.build = '2012-12-19 17:22:41';


/**
 * atom to identify the Neuron Object
 * @temp
 * @const
 */
K.__ = {};

K._env = {};

K.log = function(){};


// switch debug-mode on, and load 'log' module
K._debugOn = function(){
    // K.provide('log', function(K){ K.log('debug module attached') });
    K._env.debug = true;
};


})( 
	typeof exports !== 'undefined' ? 
		  exports  // NodeJS
		: this,    // other environment, usually on browsers
		
	'DP'
);


/**
 
 --------------------------------------------------
 [1] DP.isPlainObject will accept instances created by new myClass, but some libs don't, such as jQuery of whose strategy is dangerous, I thought.
 for example:
 suppose somebody, a newbie, wrote something like this:
 <code>
 	Object.prototype.destroyTheWorld = true;
 	DP.isPlainObject({}); // true
 </code>
 
 if use jQuery: (at least up to 1.6.4)
 <code>
 	jQuery.isPlainObject({}); // false
 </code>
 
 
 milestone 2.0 ------------------------------------
 
 2011-10-11  Kael:
 - add DP.isWindow method
 - add an atom to identify the Neuron Object
 
 2011-10-04  Kael:
 - fix a but that DP.isObject(undefined/null) -> true in IE
 
 2011-09-04  Kael:
 - add global support for CommonJS(NodeJS)
 
 Global TODO:
 A. make Slick Selector Engine slim
 B. remove setAttribute opponent from Slick
 C. [business] move inline script for header searching after the HTML structure of header
 
 2011-09-02  Kael:
 - rename core.js as seed.js
 - remove everything unnecessary out of seed.js
 - seed.js will only manage the DP namespace and provide support for type detection
 
 milestone 1.0 ------------------------------------

 2010-08-27  Kael:
 - add global configuration: DP.__PARSER as DOM selector and parser

 2010-08-16  Kael:
 TODO:
 √ GLOBAL: remove all native implements of non-ECMAScript5 standards


 2011-03-19  Kael: move DP.type to lang.js
 2011-03-01  Kael Zhang: add adapter for typeOf of mootools
 2010-12-13  Kael Zhang: fix the getter of DP.data
 2010-10-09  Kael Zhang: create file
 
 */
/**
 * ECMAScript5 implementation
 	- methods native object implemented
 	- methods native object extends
 	
 * STANDALONE language enhancement
 * always has no dependencies on Neuron
 
 * codes from mootools, MDC or by Kael Zhang
 
 Array.prototype
 	- indexOf
 	- lastIndexOf
 	- filter
 	- forEach
 	- every
 	- map
 	- some
 	- reduce
 	- reduceRight
 
 Object
 	- create
 	- keys
 	
 String.prototype
 	- trim
 	- trimLeft
 	- trimRight
 
 */

;(function(){

function extend(host, methods){
	for(var name in methods){
		if(!host[name]){
			host[name] = methods[name];
		}
	}
};


function implement(host, methods){
	extend(host.prototype, methods);
};


// ref: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array
implement(Array, {

// Accessor methods ------------------------
	
	indexOf: function (value, from) {
		var len = this.length >>> 0;
		
		from = Number(from) || 0;
		from = Math[from < 0 ? 'ceil' : 'floor'](from);
		
		if (from < 0) {
			from = Math.max(from + len, 0);
		}
		
		for (; from < len; from ++) {
			if (from in this && this[from] === value) {
				return from;
			}
		}
		
		return -1;
	},
	
	lastIndexOf: function (value, from) {
		var len = this.length >>> 0;
		
		from = Number(from) || len - 1;
		from = Math[from < 0 ? 'ceil' : 'floor'](from);
		
		if (from < 0) {
			from += len;
		}
		
		from = Math.min(from, len - 1);
		
		for (; from >= 0; from--) {
			if (from in this && this[from] === value) {
				return from;
			}
		}
		
		return -1;
	},


// Iteration methods -----------------------

	filter: function(fn, context){
		var result = [];
		for (var i = 0, len = this.length; i < len; i++){
			if ((i in this) && fn.call(context, this[i], i, this)){
				result.push(this[i]);
			}
		}
		return result;
	},

	forEach: function(fn, context){
		for (var i = 0, len = this.length; i < len; i++){
			if (i in this){
				fn.call(context, this[i], i, this);
			}
		}
	},
	
	every: function(fn, context){
		for (var i = 0, len = this.length; i < len; i++){
			if ((i in this) && !fn.call(context, this[i], i, this)){
				return false;
			}
		}
		return true;
	},	

	map: function(fn, context){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++){
			if (i in this) results[i] = fn.call(context, this[i], i, this);
		}
		return results;
	},

	some: function(fn, context){
		for (var i = 0, l = this.length; i < l; i++){
			if ((i in this) && fn.call(context, this[i], i, this)) return true;
		}
		return false;
	},

	reduce: function (fn /* [, initialValue ] */) {
		if(typeof fn !== 'function') {
			throw new TypeError(fn + ' is not an function');
		}
		
		var self = this,
			len = self.length >>> 0, 
			i = 0, 
			result;
		
		if (arguments.length > 1) {
			result = arguments[1];
			
		}else{
			do {
				if (i in self) {
					result = self[i++];
					break;
				}
				
				// if array contains no values, no initial value to return
				if (++ i >= len) {
					throw new TypeError('reduce of empty array with on initial value');
				}
			}while(true);
		}
		
		for (; i < len; i++) {
			if (i in self) {
				result = fn.call(null, result, self[i], i, self);
			}
		}
		
		return result;
	},
	
	reduceRight: function (fn /* [, initialValue ] */) {
		if(typeof fn !== 'function') {
			throw new TypeError(fn + ' is not an function');
		}
		
		var self = this,
			len = self.length >>> 0, 
			i = len - 1, 
			result;
		
		if (arguments.length > 1) {
			result = arguments[1];
			
		}else {
			do {
				if (i in self) {
					result = self[i--];
					break;
				}
				// if array contains no values, no initial value to return
				if (-- i < 0){
					throw new TypeError('reduce of empty array with on initial value');
				}
			
			}while (true);
		}
		
		for (; i >= 0; i--) {
			if (i in self) {
				result = fn.call(null, result, self[i], i, self);
			}
		}
		
		return result;
	}

});


/**
implement(Function, {
	bind: // use DP.bind instead to prevent further problems
});
*/


var hasOwnProperty = Object.prototype.hasOwnProperty,
	has_dontEnumBug = !{toString:''}.propertyIsEnumerable('toString'),
	NONT_ENUMS = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];


extend(Object, {

	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
	create: function(o){
		if (arguments.length > 1) {  
            throw new Error('Object.create only accepts 1 param.');  
        }
          
        function F() {}  
        F.prototype = o;
          
        return new F();
	},
	
	// refs:
	// http://ejohn.org/blog/ecmascript-5-objects-and-properties/
	// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
	// https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute
	// http://msdn.microsoft.com/en-us/library/adebfyya(v=vs.94).aspx
	keys: (function () {
		var DontEnums = NONT_ENUMS,
			DontEnumsLength = DontEnums.length;
		
		return function (o) {
			if (o !== Object(o)) {
				throw new TypeError(o + ' is not an object');
			}
			
			var result = [],
				name;
			
			for (name in o) {
				if (hasOwnProperty.call(o, name)) {
					result.push(name);
				}
			}
				
			if (has_dontEnumBug) {
				for (var i = 0; i < DontEnumsLength; i++) {
					if (hasOwnProperty.call(o, DontEnums[i])) {
						result.push(DontEnums[i]);
					}
				}
			}
			
			return result;
		};
		
	})()
	
	// for our current OOP pattern, we don't reply on Object based inheritance
	// so Neuron has not implemented the methods of Object such as Object.defineProperty, etc.
});


implement(String, {
	trimLeft: function(){
		return this.replace(/^\s+/, '');
	},
	
	trimRight: function(){
		return this.replace(/\s+$/, '');
	},
	
	trim: function(){
		return this.trimLeft().trimRight();
	}
});


})();

/**
 change log:
 
 2012-04-05  Kael:
 - use trimLeft and trimRight to do a entire trim
 
 2012-03-02  Kael:
 - Optimize the performance of String.trim method for IE who always do a bad work with regular expressions.
 	It may even cause IE browsers(IE6-8) expectedly crash if use `/^\s+|\s+$/` to trim a big string which contains a lot of whitespaces.
 
 */
/**
 * language and OOP enhancement for non-ECMAScript5 standards
 */

;(function(K, undef){
	
/**
 * copy all properties in the supplier to the receiver
 * @param r {Object} receiver
 * @param s {Object} supplier
 * @param or {boolean=} whether override the existing property in the receiver
 * @param cl {(Array.<string>)=} copy list, an array of selected properties
 */
function mix(r, s, or, cl) {
	if (!s || !r) return r;
	var i = 0, c, len;
	or = or || or === undef;

	if (cl && (len = cl.length)) {
		for (; i < len; i++) {
			c = cl[i];
			if ( (c in s) && (or || !(c in r) ) ) {
				r[c] = s[c];
			}
		}
	} else {
		for (c in s) {
			if (or || !(c in r)) {
				r[c] = s[c];
			}
		}
	}
	return r;
};
	
	
/**
 * bind the this pointer of a function	
 * @param {function()} fn
 * @param {Object} bind
 */
function bind_method(fn, bind){
	return function(){
		return fn.apply(bind, arguments);
	}
};

/**
 * transform functions that have the signature fn(key, value)
 * to 
 * functions that could accept object arguments

 * @param {function()} fn
 * @param {boolean} noStrict if true, overloadSetter will not check the type of parameter 'key'
 */
function overloadSetter(fn, noStrict){

	// @return {undefined} setter method will always return this, 
	// for the sake of potential chain-style invocations
	return function(key, value){
	
		// @this
		// for instance method, 'this' is the context
		// for normal functions, if use ecma strict, 'this' is undefined
		var self = this, ret = self;
		
		if (K.isObject(key)){
			K.each(key, function(v, k){
				fn.call(self, k, v);
			});
			
		}else if(noStrict || K.isString(key)){
		
			// use apply instead of fn.call(self, key, value)
			// so the overloaded function could receive more arguments
			ret = fn.apply(self, arguments);
		}
		
		return ret;
	};
};


/**
 * memoize static result of a complicated method to save time
 * @param {function(string...)} fn method which only accepts string parameters
 */
function memoizeMethod(fn){
	var stack = {};
	
	return function(){
		var arg = array_join.call(arguments, MEMOIZE_JOINER);
	
		return (arg in stack) ? stack[arg] : (stack[arg] = fn.apply(this, arguments));
	}
};


/**
 * clone an object as a pure array, and ignore non-number properties
 * @param {Array} array
 * @param {Array|Object} host required, receiver which the array be cloned to
 */
function clonePureArray(array, host){
	var i = array.length,
		start = host.length;
		
	while(i --){
		host[start + i] = array[i];
	}
	
	return host;
};


/**
 * transform constructor functions to functions that could change a method of a instance or singleton 
 */
/*
function overload_for_instance_method(fn){
	var self = this;

	return function(methodname, instance){
		var arg = arguments;
	
		return K.isFunction(methodname) ?
			fn.apply(self, arg)
		:	instance[methodname] = fn.call(instance, instance[methodname], instance);
	};
};
*/


function toQueryString(obj, splitter){
	var key, value, ret = [], encode = encodeURIComponent;
	
	for(key in obj){
		!K.isObject(value = obj[key]) && !K.isArray(value) && ret.push(key + '=' + encode(value));
	}
	
	return ret.join(splitter || '&');
};


/**
 * @private
 * @param {mixed} o
 * @param {Object} marked stack for marked objects
 * @param {function()=} filter filter function
 		function(value, key, depth)
 			value {mixed}
 			key {string}
 			depth {number} using depth parameter with a recursive object is DANGEROUS[1], make sure you really wanna do this
 			
 * @param {Object=} host, the receiver of the cloned menbers, for both inner and external use
 * @param {Object=} cached stack for cached objects which are the clones of marked objects
 * @param {number=} depth, for inner use
 */
function clone(o, filter, marked, cached, depth){
	var marker, id, key, value, is_array, host;
	
	// internal use
	cached || (cached = {});
	depth || (depth = 1);
	
	switch(K._type(o)){
		case 'array':
			host = [];
			is_array = true;
			// |
			// v
			
		// object, plainObject, instance
		case 'object':
			if( !( K.isPlainObject(o) || is_array) ){
			
				// in IE, when o is undefined or null or host objects
				// element(DOMElement, HTMLWindow, HTMLDocument, HTMLhtmlElement), collections
				// arguments
				return o;
			}
		
			marker = CLONE_MARKER;
			host || (host = {});
		
			if(o[marker]){
				return cached[o[marker]];
			}
			
			id = _guid ++;
			
			// mark copied object to prevent duplicately cloning
			o[marker] = id;
			
			// store the marked object in order to santitize the markers after cloning
			marked[id] = o;
			
			// cache the tidy clone of the marked object
			cached[id] = host;
			
			// always use for-in loop
			// 'coz on many situation, o is not a pure object or array, eg.
			// var a = []; a.a = 123;
			for(key in o){
				value = o[key];
				
				if(
					// !CLONE_MARKER
					key !== marker &&
					
					// checking filter
					(!filter || filter.call(o, value, key, depth))
				){
					host[key] = clone(value, filter, marked, cached, depth + 1);
				}
			}
			
			// free
			marked = cached = null;
		
			return host;
			
		case 'date':
			return new Date(o);
		
		// ECMAScript5+
		
		// in ECMAScript3 standard, regexps can't be cloned, because
		// a regular expression literal returns a shared object each time the literal is evaluated
		// such as Firefox(<4), but IEs betray the rules of ECMA3
		case 'regexp':
			return new RegExp(o);
			
		
		default:
			// number, boolean, 
			return o;
	}
};


var	NOOP 			= function(){},
	array_join 		= Array.prototype.join,
	CLONE_MARKER 	= '>_>~cloned',
	MEMOIZE_JOINER 	= '~^_^~',

	_guid = 1;

		  
/**
 * language enhancement 
 
 * for non-ECMAScript5 implementations, we'll add them into the DP namespace
 * and ECMAScript5 standard methods will be included in native.js
 * --------------------------------------------------------------------------------------------- */
	
K.mix = mix;
	

K.guid = function(){
	return _guid ++;
};


/**
 * forEach method for Object
 * which will not look for the prototype chain
 */
K.each = function(obj, fn, context){
	if(K.isFunction(fn)){
	
		context = context || obj;

		if(K.isObject(obj)){
			var keys = Object.keys(obj), i = 0, len = keys.length, key;
			
			for(; i < len; i ++){
				key = keys[i];
				obj.hasOwnProperty(key) && fn.call(context, obj[key], key);
			}
			
		}else if(K.isArray(obj)){
			obj.forEach(fn, context);
		}
	}
};
 

/**
 * deep clone an object, including properties on prototype chain.()
 * is able to deal with recursive object, unlike the poor Object.clone of mootools
 
 * @param {Object|Array} o
 * @param {?function()} filter filter function(value, key, depth)
 * @return {Object} the cloned object
 
 usage:
 <code>
	 var a = {}, b = {b: 1}, c; a.a = a;
	 c = DP.clone(a); 		// clone a to c
 </code>
 */
K.clone = function(o, filter) {
	var marked = {},
		m = CLONE_MARKER,
		cloned = clone(o, filter, marked);
	
	// remove CLONE_MARKER
	K.each(marked, function(v){
		try{
			delete v[m];
		}catch(e){
			var U;
			K.log('del clone m err', e);
			v[m] = U;
		}
	});
	
	marked = null;
	
	return cloned;
};


/**
 * bind 'this' pointer for a function
 * or bind a method for a constructor
 * @usage:
 * <code>
   1. DP.bind(myFunction, {a:1});
   2. DP.bind('method', {a:1, method: function(){ alert(this.a) }});
 
 * </code>
 * 
 */
K.bind = function(fn, bind){
	return K.isFunction(fn) ?
		bind_method(fn, bind)
	:
		(bind[fn] = bind_method(bind[fn], bind));
};


/**
 * method to encapsulate the delayed function
 */
K.delay = function(fn, delay, isInterval){
	var ret = {
		start: function(){
			ret.cancel();
			return ret.id = isInterval ? setInterval(fn, delay) : setTimeout(fn, delay);
		},
		cancel: function(){
			var timer = ret.id;
			
			ret.id = isInterval ? clearInterval(timer) : clearTimeout(timer);
			return ret;
		}
	};
	
	return ret;
};


/**
 * @param {all} array
 		if nodelist, returns an array which generated from the nodelist
 		if Array, returns the array itself
 		otherwise, returns an array contains the subject
 * @param {Array=} host
 * @param {boolean=} force if true, the subject will pretend to be an array, `force` will be usefull if you call makeArray with an array-like object
 */
K.makeArray = function(array, host, force){
	var NULL = null;
	
	host || (host = []);
	
	// if is already an array, do nothing to improve performance	
	if(K.isArray(array)){
		host = host.length ? host.concat(array) : array;
		
	// false 		-> [false]
	// null 		-> []
	// undefined 	-> K.makeArray() -> []
	}else if(array != NULL){
		if(
			!force && (
				array.length == NULL ||
				
				// DP.isObject(arguments) -> true(all browsers)
				
				// Object.prototype.toString.call(arguments);
				// -> [object Arguments]  	if Chrome, IE >= 9, Firefox >= 4
				// -> [object Object]		if Firefox < 4, IE < 9
				!K.isObject(array) ||
				
				// if is DOM subject
				// <select>.length === <select>.options.length
				
				// ATTENSION:
				// <select>.options === <select> (tested up to IE9)
				// so, never try to DP.makeArray(select.options)
				array.nodeType ||
				
				// K.isObject(window)	-> true
				// window also has 'length' property
				'setInterval' in array
			)
		){
			host.push(array)
			
		}else{
		
			// IE fails on collections and <select>.options (refers to <select>)
			// use array clone instead of Array.prototype.slice
			clonePureArray(array, host);
		}
	}

	return host;
};


/**
 * @param {string} template template string
 * @param {Object} params
 */
K.sub = function(template, params){
	
	// suppose:
	// template = 'abc{a}\\{b}';
	// params = { a: 1, b: 2 };
	
	// returns: 'abc1{b}'
	return ('' + template).replace(/\\?\{([^{}]+)\}/g, function(match, name){ // name -> match group 1
	
		// never substitute escaped braces `\\{}`
		// '\\{b}' -> '{b}'
		return match.charAt(0) === '\\' ? match.slice(1)
			:
				// '{a}' -> '1'
				( params[name] != null ? params[name] : '');
	});
};


K.toQueryString = function(obj, splitter){
	return K.isObject(obj) ?
		toQueryString( K.clone(obj, function(v, k, d){
				
				// abandon deep object members
				// copy depth: 1
				return d < 2;
			}
		), splitter)
		
		: obj;
};


/**
 * OOP Enhancement 
 * --------------------------------------------------------------------------------------------- */
 
 
/**
 * overload a setter function or a setter method of a instance
 */
K._overloadSetter = overloadSetter; // overload_for_instance_method( batch_setter ),

/**
 * 
 */
// _overloadInstanceMethod: overload_for_instance_method,

/**
 * run a method once and only ONCE before the real method executed
 * usefull for lazy initialization
 *
 * @example
 * if Overlay::show is the public api to show the overlay
 * but it has a initialization method, which we want to be called just before the overlay shows, not the very moment when the instance of Overlay created,
 * so,
 * we apply:
 * initialization method 	-> Overlay::_showInit
 * real show method 		-> Overlay::show
 * and then:
 *
 * @usage
	 <code>
	 	// before 'show', '_showInit' will be executed only once
	 	DP._onceBefore('show', '_showInit', Overlay.prototype);
	 </code>
 */
K._onceBefore = function(real_method_name, init_method_name, belong){
	var init = belong[init_method_name],
		real = belong[real_method_name];
		
	belong[real_method_name] = function(){
		var ret, self = this;
	
		init.call(self);
		
		ret = real.apply(self, arguments);
		self[real_method_name] = real;
		
		return ret;
	};
};

/**
 @usage
	 <code>
		funcion myMethod(string){....}
		var memoizedMyMethod = DP._memoize(myMethod);
	 </code>
 */
K._memoize = memoizeMethod; // overload_for_instance_method( memoizeMethod )


})(DP);


/**
 ---------------------------------------------------------
 [1] why dangerous? you could find out. the order of the old keys and new created keys between various browsers is different
 
 change log:
 
 2012-04-05  Kael:
 - add a parameter to force makeArray treating the current subject as an array
 
 2012-01-12  Kael:
 - improve DP._overloadSetter, so that the overloaded function could receive more arguments
 
 2012-01-04  Kael:
 - DP._onceBefore will not affect prototype chain but instance only
 
 2011-10-13  Kael:
 - DP.makeArray could has an array receiver to be merged to
 
 2011-10-10  Kael:
 - fix a bug about DP.makeArray who fails to deal with document
 
 2011-10-04  Kael:
 - fix a bug about DP.clone that IE fails when cloning a NodeList or DOMElement
 - DP.clone will clone RegExp Objects
 
 2011-09-28  Kael:
 - improve the stability of DP.makeArray and DP.toQueryString
 
 2011-09-17  Kael:
 - add receiver to DP.clone to clone the list of methods into a specified object
 - fix a bug about DP.clone that unexpectedly convert Array to Object
 - to implement DP.clone use for-in instead of DP.each, so that we can unlink the prototype chain
 
 2011-09-10  Kael:
 - add DP.clone to clone an object instead of Object.clone
 	fix the bug that mootools will exceed maximum call stack size when cloning a recursive object
 	
 TODO:
 A. test memleak about cached parameter in function clone on ie

 2011-09-04  Kael:
 TODO:
 A. improve stability for DP.makeArray

 change log:
 2011-04-19  Kael:
 - add method lazyInit, fix a bug of overloadInstanceMethod
 - add method to detect the type of an object. set DP._type as semi-private method
 2011-04-15  Kael:
 - add adapter for overloadSetter, 
 - add method overloadInstanceMethod
 2011-04-1   Kael Zhang: move DP.ready to web.js
 2010-12-31  Kael Zhang:
 - add DP.data and DP.delay
 - remove domready from mootools
 */
/**
 * @module  web
 * methods for browsers and business requirement
 
 * - domready
 * - data storage
 * - getLocation
 * - UA
 */

;(function(K, undef){

/**
 * get the readable location object of current page 
 */
function getCurrentLocation(){
	var L, H;

	// IE may throw an exception when accessing
	// a field from document.location if document.domain has been set
	// ref:
	// stackoverflow.com/questions/1498788/reading-window-location-after-setting-document-domain-in-ie6
	try {
		L = DOC.location;
		H = L.href;
	} catch(e) {
	
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		H = DOC.createElement('a');
		H.href = EMPTY;
		H = H.href;
		
		L = parseLocation(H);
	}
	
	return L;
};

/**
 * parse a link to location object
 * @param {string} H
 * @return {Object} custom location object
 */
function parseLocation(H){
	var E = nullOrEmpty, port;

	H = H.match(REGEX_URL);
	
	port = H[3];
	
	return {
		href: 		H[0],
		protocol:	H[1],
		host:		H[2] + (port ? ':' + port : EMPTY),
		hostname:	H[2],
		port:		E( port ),
		pathname:	E( H[4] ),
		search:		E( H[5] ),
		hash:		E( H[6] )
	};
};


function nullOrEmpty(str){
	return str || EMPTY;
};


var

// @const
WIN = K.__HOST,
DOC = WIN.document,
EMPTY = '',

/* 
REGEX_URL = /^
	([\w\+\.\-]+:)		// protocol
	\/\/
	([^\/?#:]+)			// domain
(?::
	(\d+)				// port
)?
	(/[^?#]*)?			// pathname
	(\?[^?#]*)?			// search
	(#.*)?				// hash
$/
*/

REGEX_URL = /^([\w\+\.\-]+:)\/\/([^\/?#:]+)(?::(\d+))?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/;


/**
 * @param {string} href
 * @return {Object}
 *	- if href undefined, returns the current location
 *	- if href is a string, returns the parsed loaction
 */
K.getLocation = function(href){
	return href ?
		parseLocation(href)
	:	getCurrentLocation();
};


})(DP);

/**
 TODO:
 - add more user-agent datas.
 - add constructor for DP.data 

 change log:
 2011-07-05  Kael:
 - remove UA.fullversion
 - add adapter for Browser.Platform
 
 2011-06-12  Kael:
 - fix a bug about the regular expression of location pattern that more than one question mark should be allowed in search query
 - add UA.chrome. 
 
 2011-04-26  Kael:
 - adapt mootools.Browser
 - remove ua.chrome, ua.safari, add ua.webkit
 
 2011-04-12  Kael Zhang:
 - fix a bug that domready could not be properly fired
 - add DP.getLocation method, 
 	1. to fix the bug of ie6, which will cause an exception when fetching the value of window.location if document.domain is already specified
 	2. which can split an specified uri into different parts
 	
 2010-12-31  Kael Zhang:
 - migrate domready event out from mootools to here, and change some way 
 - migrate .data and .delay methods from core/lang to here
 
 */
/**
 * module  oop/class
 * author  Kael Zhang
 
 * unlike mootools
	- new DP.Class will return a pure javascript constructor
	- new DP.Class could inherit from a pure javascript constructor
 */


;(function(K){

/**
 relevant javascript reserved words:

 extends
 implements

 */


/**
 Implements: 
 	- classes implemented, constructor and destructor will not be inherited
 	- destructor methods will be ignored
 	- implementing A will not make A instantiated
 
 Extends: 
	X - destructor methods will be collected

var Class = DP.Class,

	myClass = Class( baseClass, {
		Implements: [ Interface1, Interface2, 'options' ],
		// Implements: 'options events',
		
		initialize: function(){},
		
		__destruct: function(){},
		
		method: function(){}
	}),

	instance = new myClass();


Class.destroy(instance);
*/


/**
 * @return {Object}
 */
function getPrototype(obj){
	var ret, type = K._type(obj);
	
	if(type === 'function'){
		ret = obj.prototype;
	}else if(type === 'object'){
		ret = obj;
	}else if(type === 'string'){
		ret = getPrototype(EXTS[obj.toLowerCase()]);
	}
	
	return ret;
};


/**
 * @param {function()|Object} DP.Class instance or prototype of DP.Class instance
 * @param {Object} alien new prototype methods to be mixed in
 * @param {boolean} override whether new methods/props should override old methods/props
 */
function implementOne(host, alien, override){
	// prototype Object for mixin 
	var proto = getPrototype(alien);

	proto && K.mix(
		host, 
		K.clone(proto),
		// K.clone(proto, function(value, key){
		//	return PRIVATE_MEMBERS.indexOf(key) === -1;
		// }),
		
		// methods of an interface have second lowest priority
		override
	);
};


/**
 * implement a class with interfaces
 */
function implement(proto, extensions, override){
	if(typeof extensions === 'string'){
		extensions = extensions.trim().split(/\s+/);
	}

	K.makeArray(extensions).forEach(function(alien){
		implementOne(this, alien, override);
	}, proto);
};


function isPublicMember(key){
	return PRIVATE_MEMBERS.indexOf(key) === -1;
};


/**
 * method to set new attributes and inherit from super class simultaniously
 */
function setAttrs(class_, attr){
	var attrs = [], parent_attr, cls = class_;

	while(cls = cls.prototype[__SUPER_CLASS]){
		if(parent_attr = cls.ATTRS){
			break;
		}
	}
	
	class_.ATTRS = K.mix(attr || {}, K.clone(parent_attr));
};


/**
 * unlink the reference to the prototype and maintain prototype chain
 */
function resetPrototypeChain(instance){
	var value, key, type, reset;
	
	for(key in instance){
		value = instance[key];
		
		if(K.isPlainObject(value)){
			var F = function(){};
			F.prototype = value;
			reset = resetPrototypeChain(new F);
		}else{
			reset = K.clone(value);
		}
		
		instance[key] = reset;
	}
	
	return instance;
};


var INITIALIZE 		= 'initialize',
	// __DESTRUCT 		= '__destruct',
	__SUPER_CLASS 	= 'superclass',
	EXTS			= {};


// @public
function Class(base, proto){
	var EXTENDS = 'Extends';

	if(!K.isObject(proto)){
		if(K.isObject(base)){				// -> Class({ key: 123 })
			proto = base;
			base = proto[EXTENDS];
			
		}else{								// -> Class(myClass)
			return K.isFunction(base) ? base : function(){};
		}
	}	
	
	delete proto[EXTENDS];
	
	return _Class(base, proto);
};


/**
 * @private
 * @param {function()|Class}
 * @param {Object} proto must be an object
 */
function _Class(base, proto){
	function newClass(){
		var self = this,
			init = initialize;
		
		/**
		 * clean and unlink the reference relationship of the first depth between the instance and its prototype
		 * and maintain prototype chain
		 */
		resetPrototypeChain(self);
	
		if(init){
			return init.apply(self, arguments);
		}
	};
	
	var IMPLEMENTS = 'Implements',
		F,
		newProto,
		
		// so, DP.Class could make a new class inherit from a pure javascript constructor
		// inherit constructor from superclass
		initialize = proto[INITIALIZE] || base,
		exts = proto[IMPLEMENTS];
		
	delete proto[INITIALIZE];
	delete proto[IMPLEMENTS];
	
	// apply super prototypes
	if(base){
		F = function(){};
		
		// discard the parent constructor
		F.prototype = base.prototype;
		newProto = new F;
		
		// priority high to low
		// user prototype > ext > super class prototype
		exts && implement(newProto, exts, true);
		
		newProto[__SUPER_CLASS] = base;
		K.mix(newProto, proto);
		
	}else{
	
		// no super class, directly assign user prototype for performance
		newProto = proto;
		exts && implement(newProto, exts, false);
	}
	
	newClass.prototype = newProto;
	
	// fix constructor
	newProto.constructor = newClass;
	
	return newClass;
};


/**
 * @public members
 * ----------------------------------------------------------------------- */


// @deprecated
// use DP.Class instead
// for backwards compact
// K.__HOST.Class =

// DP.Class
K.Class = Class;

Class.EXTS = EXTS;
// Class.PRIVATE_MEMBERS = PRIVATE_MEMBERS;

/**
 * method to destroy a instance
 */
// Class.destroy = function(instance){
//	var destructor = instance[__DESTRUCT];
//	destructor && destructor.call(instance);
// };

Class.setAttrs = setAttrs;
Class.implement = implement;

})(DP);


/**
 change log:
 
 2012-01-30  Kael:
 - remove Class.destroy
 
 2011-11-16  Kael:
 - remove Class from the host(window)
 
 2011-10-19  Kael:
 - adjust the priority of inheritance chain as: user prototype > ext > super class prototype
 
 2011-09-19  Kael:
 - fix a bug the instance fail to clear the reference off its prototype
 
 2011-09-16  Kael:
 - remove a reserved word for possible future use
 - complete class extends
 
 2011-09-13  Kael:
 - refractor the whole implementation about Class
 
 2011-09-12  Kael:
 TODO:
 - A. add destructor support
 - B. make Class faster if there's no Extends
 - C. no merge, use DP.clone instead
 
 */
;(function(K){


/**
 * setter for class attributes
 * @private
 * @param {boolean} ghost inner use
 	if true, setValue will ignore all flags or validators and force to writing the new value
 	
 * @return {boolean} whether the new value has been successfully set
 */
function setValue(host, attr, value, override, ghost){
	var pass = true,
		setter,
		validator,
		v;

	// if ghost setting, ignore checking
	if(!ghost){
		if(attr[READ_ONLY]){
			pass = false;
			
		}else{
			validator = getMethod(host, attr, VALIDATOR);
			
			pass = !validator || validator.call(host, value);
		}
		
		if(pass && attr[WRITE_ONCE]){
			delete attr[WRITE_ONCE];
			attr[READ_ONLY] = TRUE;
		}
	}
	
	if(pass){
		setter = getMethod(host, attr, SETTER);
		
		if(setter){
			// if setter is defined, always set the return value of setter to attr.value
			attr.value = setter.call(host, value);
		}else{
		
			// mix object values
			!override && isPlainObject(value) && isPlainObject(v = attr.value) ? K.mix(v, value) : (attr.value = value);
		}
	}
	
	return pass;
};


/**
 * getter for class attributes
 */
function getValue(host, attr, undef){
	var getter = getMethod(host, attr, GETTER),
		v = attr.value;
	
	return getter ?
	
		  // getter could based on the value of the current value
		  getter.call(host, v)
		: v;
};


function getMethod(host, attr, name){
	var method = attr[name];
	
	return typeof method === 'string' ? host[method] : method;
};


/**
 * @private
 * @param {Object} host
 * @param {Object} sandbox shadow copy of the attributes of a class instance
 * @param {undefined=} undef
 */
function createGetterSetter(host, sandbox, undef){
	host.set = K._overloadSetter( function(key, value, override){
		var attr = sandbox[key];
		
		return attr ? setValue(this, attr, value, override) : false;
	});
	
	host.get = function(key){
		var attr = sandbox[key];
		
		return attr ? getValue(this, attr) : undef;
	};
	
	host.addAttr = function(key, setting){
		sandbox[key] || (sandbox[key] = K.isObject(setting) ? 
							
							// it's important to clone the setting before mixing into the sandbox,
							// or host.set method will ruin all reference
							K.clone(setting) : 
							{}
						);
	}
};


function createPublicMethod(name){
	return function(){
		var self = this,
			
			// @private
			// sandbox
			sandbox = createSandBox(self);
		
		// .set and .get methods won't be available util .setAttrs method excuted
		createGetterSetter(self, sandbox);
		
		return self[name].apply(self, arguments);
	};
};


function createSandBox(host){
	var class_ = host.constructor,
		sandbox;
	
	do{
		if(sandbox = class_.ATTRS){
			break;
		}
	} while(class_ = class_.prototype[__SUPER_CLASS]);
	
	return sandbox ? K.clone(sandbox) : {};
};


var TRUE = true,
	GETTER = 'getter',
	SETTER = 'setter',
	VALIDATOR = 'validator',
	READ_ONLY = 'readOnly',
	WRITE_ONCE = 'writeOnce',
	
	__SUPER_CLASS = 'superclass',
	
	NOOP = function(){},
	
	isPlainObject = K.isPlainObject;


/**

 ATTRS = {
 	attr: {
 		value: 100
 	},
 	
 	attrWithSetter: {
 		setter: function(){}
 	},
 	
 	attrWithProxySetter: {
 		setter: '_setTimeout'
 	},
 	
 	attrWithValidator: {
 		value: 100,
 		validator: function(v){
 			return v <= 100;
 		}
 	}
 };

 */
 
var attrs = {};

['addAttr', 'get', 'set'].forEach(function(name){
	attrs[name] = createPublicMethod(name);
});
	
K.Class.EXTS.attrs = attrs;

attrs = null;

})(DP);


/**
 2012-02-23  Kael:
 - fix a fatal reference exception for .addAttr method

 2012-01-30  Kael:
 - remove .setAttrs methdo. sandbox will be initialized by the first execution of .set, .get, or .addAttr method

 2011-10-24  Kael:
 - setAttrs method will return this
 - prevent addAttr method from affecting the existing attr object

 2011-10-18  Kael:
 TODO:
 - ? A. optimize setAttrs method, lazily initialize presets after they are called
 
 2011-09-20  Kael:
 - attr setter will return true or false to tell whether the new value has been successfully set

 2011-09-17  Kael:
 - TODO[09-15].A

 2011-09-15  Kael:
 - privatize attributes
 - create .get and .set method
 
 TODO:
 - ��?A. ATTRs inheritance

 */

/**
 * Preset of Class Extensions: 'events'
 */
;(function(K){

// @param {this} self
// @return {Array.<function()>}
function getStorage(host, type){
	var ATTR_EVENTS = '__ev',
		storage;
		
	storage = host[ATTR_EVENTS] || (host[ATTR_EVENTS] = {});
	
	return storage[type] || (storage[type] = []);
};

// @return {this}
function addOrRemoveEvent(host, type, fn, toAdd){
	var storage = getStorage(host, type),
		i = 0,
		len = storage.lenth;
		
	if(toAdd){
		// add an event
		if(K.isFunction(fn)){
			storage.push(fn);
		}
		
	}else{
		// remove an event
		if(K.isFunction(fn)){
			for(; i < len; i ++){
				if(storage[i] === fn){
					storage.splice(i, 1);
				}
			}
			
		// remove all events
		}else if(!fn){
			storage.length = 0;
		}
	}
	
	return host;
};


K.Class.EXTS.events = {
	on: K._overloadSetter(function(type, fn){
		return addOrRemoveEvent(this, type, fn, true);
	}),
	
	off: function(type, fn){
		return addOrRemoveEvent(this, type, fn);
	},
	
	fire: function(type, args){
		var self = this;
		
		args = K.makeArray(args);
		
		getStorage(self, type).forEach(function(fn){
			fn.apply(self, args);
		});
		
		return self;
	}
};

})(DP);
/*
---
name: Slick.Finder
description: The new, superfast css selector engine.
provides: Slick.Finder
requires: Slick.Parser
...
*/

(function(){

var local = {};

// Feature / Bug detection

local.isNativeCode = function(fn){
	return (/\{\s*\[native code\]\s*\}/).test('' + fn);
};

local.isXML = function(document){
	return (!!document.xmlVersion) || (!!document.xml) || (Object.prototype.toString.call(document) === '[object XMLDocument]') ||
	(document.nodeType === 9 && document.documentElement.nodeName !== 'HTML');
};

local.setDocument = function(document){
	
	// convert elements / window arguments to document. if document cannot be extrapolated, the function returns.
	
	if (document.nodeType === 9); // document
	else if (document.ownerDocument) document = document.ownerDocument; // node
	else if (document.navigator) document = document.document; // window
	else return;
	
	// check if it's the old document
	
	if (this.document === document) return;
	this.document = document;
	var root = this.root = document.documentElement;
	
	// document sort
	
	this.brokenStarGEBTN
	= this.starSelectsClosedQSA
	= this.idGetsName
	= this.brokenMixedCaseQSA
	= this.brokenGEBCN
	= false;
	
	var starSelectsClosed, starSelectsComments,
		brokenSecondClassNameGEBCN, cachedGetElementsByClassName;
	
	if (!(this.isXMLDocument = this.isXML(document))){
		
		var testNode = document.createElement('div');
		this.root.appendChild(testNode);
		var selected, id;
		
		// IE returns comment nodes for getElementsByTagName('*') for some documents
		testNode.appendChild(document.createComment(''));
		starSelectsComments = (testNode.getElementsByTagName('*').length > 0);
		
		// IE returns closed nodes (EG:"</foo>") for getElementsByTagName('*') for some documents
		try {
			testNode.innerHTML = 'foo</foo>';
			selected = testNode.getElementsByTagName('*');
			starSelectsClosed = (selected && selected.length && selected[0].nodeName.charAt(0) == '/');
		} catch(e){};
		
		this.brokenStarGEBTN = starSelectsComments || starSelectsClosed;
		
		// IE 8 returns closed nodes (EG:"</foo>") for querySelectorAll('*') for some documents
		if (testNode.querySelectorAll) try {
			testNode.innerHTML = 'foo</foo>';
			selected = testNode.querySelectorAll('*');
			this.starSelectsClosedQSA = (selected && selected.length && selected[0].nodeName.charAt(0) == '/');
		} catch(e){};
		
		// IE returns elements with the name instead of just id for getElementById for some documents
		try {
			id = 'slick_id_gets_name';
			testNode.innerHTML = ('<a name='+id+'></a><b id='+id+'></b>');
			this.idGetsName = testNode.ownerDocument.getElementById(id) === testNode.firstChild;
		} catch(e){};
		
		// Safari 3.2 QSA doesnt work with mixedcase on quirksmode
		try {
			testNode.innerHTML = '<a class="MiXedCaSe"></a>';
			this.brokenMixedCaseQSA = !testNode.querySelectorAll('.MiXedCaSe').length;
		} catch(e){};

		try {
			testNode.innerHTML = '<a class="f"></a><a class="b"></a>';
			testNode.getElementsByClassName('b').length;
			testNode.firstChild.className = 'b';
			cachedGetElementsByClassName = (testNode.getElementsByClassName('b').length != 2);
		} catch(e){};
		
		// Opera 9.6 GEBCN doesnt detects the class if its not the first one
		try {
			testNode.innerHTML = '<a class="a"></a><a class="f b a"></a>';
			brokenSecondClassNameGEBCN = (testNode.getElementsByClassName('a').length != 2);
		} catch(e){};
		
		this.brokenGEBCN = cachedGetElementsByClassName || brokenSecondClassNameGEBCN;
		
		this.root.removeChild(testNode);
		testNode = null;
		
	}
	
	// hasAttribute
	
	this.hasAttribute = (root && this.isNativeCode(root.hasAttribute)) ? function(node, attribute) {
		return node.hasAttribute(attribute);
	} : function(node, attribute) {
		node = node.getAttributeNode(attribute);
		return !!(node && (node.specified || node.nodeValue));
	};
	
	// contains
	// FIXME: Add specs: local.contains should be different for xml and html documents?
	this.contains = (root && this.isNativeCode(root.contains)) ? function(context, node){
		return context.contains(node);
	} : (root && root.compareDocumentPosition) ? function(context, node){
		return context === node || !!(context.compareDocumentPosition(node) & 16);
	} : function(context, node){
		if (node) do {
			if (node === context) return true;
		} while ((node = node.parentNode));
		return false;
	};
	
	// document order sorting
	// credits to Sizzle (http://sizzlejs.com/)
	
	this.documentSorter = (root.compareDocumentPosition) ? function(a, b){
		if (!a.compareDocumentPosition || !b.compareDocumentPosition) return 0;
		return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
	} : ('sourceIndex' in root) ? function(a, b){
		if (!a.sourceIndex || !b.sourceIndex) return 0;
		return a.sourceIndex - b.sourceIndex;
	} : (document.createRange) ? function(a, b){
		if (!a.ownerDocument || !b.ownerDocument) return 0;
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		return aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
	} : null ;
	
	this.getUID = (this.isXMLDocument) ? this.getUIDXML : this.getUIDHTML;
	
};
	
// Main Method

local.search = function(context, expression, append, first){
	
	var found = this.found = (first) ? null : (append || []);
	
	// no need to pass a context if its the current document
	
	if (expression == null){
		expression = context;
		context = document; // the current document, not local.document, cause it would be confusing
	}
	
	// context checks

	if (!context) return found; // No context
	if (context.navigator) context = context.document; // Convert the node from a window to a document
	else if (!context.nodeType) return found; // Reject misc junk input

	// setup
	
	var parsed, i;

	var uniques = this.uniques = {};
	
	if (this.document !== (context.ownerDocument || context)) this.setDocument(context);

	// expression checks
	
	if (typeof expression == 'string'){ // expression is a string
		
		// Overrides

		for (i = this.overrides.length; i--;){
			var override = this.overrides[i];
			if (override.regexp.test(expression)){
				var result = override.method.call(context, expression, found, first);
				if (result === false) continue;
				if (result === true) return found;
				return result;
			}
		}
		
		parsed = this.Slick.parse(expression);
		if (!parsed.length) return found;
	} else if (expression == null){ // there is no expression
		return found;
	} else if (expression.Slick){ // expression is a parsed Slick object
		parsed = expression;
	} else if (this.contains(context.documentElement || context, expression)){ // expression is a node
		(found) ? found.push(expression) : found = expression;
		return found;
	} else { // other junk
		return found;
	}
	
	// cache elements for the nth selectors
	
	/*<pseudo-selectors>*//*<nth-pseudo-selectors>*/
	
	this.posNTH = {};
	this.posNTHLast = {};
	this.posNTHType = {};
	this.posNTHTypeLast = {};
	
	/*</nth-pseudo-selectors>*//*</pseudo-selectors>*/
	
	// should sort if there are nodes in append and if you pass multiple expressions.
	// should remove duplicates if append already has items
	var shouldUniques = !!(append && append.length);
	
	// if append is null and there is only a single selector with one expression use pushArray, else use pushUID
	this.push = (!shouldUniques && (first || (parsed.length == 1 && parsed.expressions[0].length == 1))) ? this.pushArray : this.pushUID;
	
	if (found == null) found = [];
	
	// avoid duplicating items already in the append array
	if (shouldUniques) for (i = found.length; i--;) this.uniques[this.getUID(found[i])] = true;
	
	// default engine
	
	var j, m, n;
	var combinator, tag, id, classList, classes, attributes, pseudos;
	var currentItems, currentExpression, currentBit, lastBit, expressions = parsed.expressions;
	
	search: for (i = 0; (currentExpression = expressions[i]); i++) for (j = 0; (currentBit = currentExpression[j]); j++){

		combinator = 'combinator:' + currentBit.combinator;
		if (!this[combinator]) continue search;
		
		tag        = (this.isXMLDocument) ? currentBit.tag : currentBit.tag.toUpperCase();
		id         = currentBit.id;
		classList  = currentBit.classList;
		classes    = currentBit.classes;
		attributes = currentBit.attributes;
		pseudos    = currentBit.pseudos;
		lastBit    = (j === (currentExpression.length - 1));
	
		this.bitUniques = {};
		
		if (lastBit){
			this.uniques = uniques;
			this.found = found;
		} else {
			this.uniques = {};
			this.found = [];
		}

		if (j === 0){
			this[combinator](context, tag, id, classes, attributes, pseudos, classList);
			if (first && lastBit && found.length) break search;
		} else {
			if (first && lastBit) for (m = 0, n = currentItems.length; m < n; m++){
				this[combinator](currentItems[m], tag, id, classes, attributes, pseudos, classList);
				if (found.length) break search;
			} else for (m = 0, n = currentItems.length; m < n; m++) this[combinator](currentItems[m], tag, id, classes, attributes, pseudos, classList);
		}
		
		currentItems = this.found;
	}
	
	if (shouldUniques || (parsed.expressions.length > 1)) this.sort(found);
	
	return (first) ? (found[0] || null) : found;
};

// Utils

local.uidx = 1;
local.uidk = 'slick:uniqueid';

local.getUIDXML = function(node){
	var uid = node.getAttribute(this.uidk);
	if (!uid){
		uid = this.uidx++;
		node.setAttribute(this.uidk, uid);
	}
	return uid;
};

local.getUIDHTML = function(node){
	return node.uniqueNumber || (node.uniqueNumber = this.uidx++);
};

// sort based on the setDocument documentSorter method.

local.sort = function(results){
	if (!this.documentSorter) return results;
	results.sort(this.documentSorter);
	return results;
};

/*<pseudo-selectors>*//*<nth-pseudo-selectors>*/

local.cacheNTH = {};

local.matchNTH = /^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/;

local.parseNTHArgument = function(argument){
	var parsed = argument.match(this.matchNTH);
	if (!parsed) return false;
	var special = parsed[2] || false;
	var a = parsed[1] || 1;
	if (a == '-') a = -1;
	var b = +parsed[3] || 0;
	parsed =
		(special == 'n')	? {a: a, b: b} :
		(special == 'odd')	? {a: 2, b: 1} :
		(special == 'even')	? {a: 2, b: 0} : {a: 0, b: a};
		
	return (this.cacheNTH[argument] = parsed);
};

local.createNTHPseudo = function(child, sibling, positions, ofType){
	return function(node, argument){
		var uid = this.getUID(node);
		if (!this[positions][uid]){
			var parent = node.parentNode;
			if (!parent) return false;
			var el = parent[child], count = 1;
			if (ofType){
				var nodeName = node.nodeName;
				do {
					if (el.nodeName !== nodeName) continue;
					this[positions][this.getUID(el)] = count++;
				} while ((el = el[sibling]));
			} else {
				do {
					if (el.nodeType !== 1) continue;
					this[positions][this.getUID(el)] = count++;
				} while ((el = el[sibling]));
			}
		}
		argument = argument || 'n';
		var parsed = this.cacheNTH[argument] || this.parseNTHArgument(argument);
		if (!parsed) return false;
		var a = parsed.a, b = parsed.b, pos = this[positions][uid];
		if (a == 0) return b == pos;
		if (a > 0){
			if (pos < b) return false;
		} else {
			if (b < pos) return false;
		}
		return ((pos - b) % a) == 0;
	};
};

/*</nth-pseudo-selectors>*//*</pseudo-selectors>*/

local.pushArray = function(node, tag, id, classes, attributes, pseudos){
	if (this.matchSelector(node, tag, id, classes, attributes, pseudos)) this.found.push(node);
};

local.pushUID = function(node, tag, id, classes, attributes, pseudos){
	var uid = this.getUID(node);
	if (!this.uniques[uid] && this.matchSelector(node, tag, id, classes, attributes, pseudos)){
		this.uniques[uid] = true;
		this.found.push(node);
	}
};

local.matchNode = function(node, selector){
	var parsed = this.Slick.parse(selector);
	if (!parsed) return true;
	
	// simple (single) selectors
	if(parsed.length == 1 && parsed.expressions[0].length == 1){
		var exp = parsed.expressions[0][0];
		return this.matchSelector(node, (this.isXMLDocument) ? exp.tag : exp.tag.toUpperCase(), exp.id, exp.classes, exp.attributes, exp.pseudos);
	}

	var nodes = this.search(this.document, parsed);
	for (var i = 0, item; item = nodes[i++];){
		if (item === node) return true;
	}
	return false;
};

local.matchPseudo = function(node, name, argument){
	var pseudoName = 'pseudo:' + name;
	if (this[pseudoName]) return this[pseudoName](node, argument);
	var attribute = this.getAttribute(node, name);
	return (argument) ? argument == attribute : !!attribute;
};

local.matchSelector = function(node, tag, id, classes, attributes, pseudos){
	if (tag){
		if (tag == '*'){
			if (node.nodeName < '@') return false; // Fix for comment nodes and closed nodes
		} else {
			if (node.nodeName != tag) return false;
		}
	}
	
	if (id && node.getAttribute('id') != id) return false;

	var i, part, cls;
	if (classes) for (i = classes.length; i--;){
		cls = ('className' in node) ? node.className : node.getAttribute('class');
		if (!(cls && classes[i].regexp.test(cls))) return false;
	}
	if (attributes) for (i = attributes.length; i--;){
		part = attributes[i];
		if (part.operator ? !part.test(this.getAttribute(node, part.key)) : !this.hasAttribute(node, part.key)) return false;
	}
	if (pseudos) for (i = pseudos.length; i--;){
		part = pseudos[i];
		if (!this.matchPseudo(node, part.key, part.value)) return false;
	}
	return true;
};

var combinators = {

	' ': function(node, tag, id, classes, attributes, pseudos, classList){ // all child nodes, any level
		
		var i, item, children;

		if (!this.isXMLDocument){
			getById: if (id){
				item = this.document.getElementById(id);
				if ((!item && node.all) || (this.idGetsName && item && item.getAttributeNode('id').nodeValue != id)){
					// all[id] returns all the elements with that name or id inside node
					// if theres just one it will return the element, else it will be a collection
					children = node.all[id];
					if (!children) return;
					if (!children[0]) children = [children];
					for (i = 0; item = children[i++];) if (item.getAttributeNode('id').nodeValue == id){
						this.push(item, tag, null, classes, attributes, pseudos);
						break;
					} 
					return;
				}
				if (!item){
					// if the context is in the dom we return, else we will try GEBTN, breaking the getById label
					if (this.contains(this.document.documentElement, node)) return;
					else break getById;
				} else if (this.document !== node && !this.contains(node, item)) return;
				this.push(item, tag, null, classes, attributes, pseudos);
				return;
			}
			getByClass: if (classes && node.getElementsByClassName && !this.brokenGEBCN){
				children = node.getElementsByClassName(classList.join(' '));
				if (!(children && children.length)) break getByClass;
				for (i = 0; item = children[i++];) this.push(item, tag, id, null, attributes, pseudos);
				return;
			}
		}
		getByTag: {
			children = node.getElementsByTagName(tag);
			if (!(children && children.length)) break getByTag;
			if (!this.brokenStarGEBTN) tag = null;
			for (i = 0; item = children[i++];) this.push(item, tag, id, classes, attributes, pseudos);
		}
	},
	
	'>': function(node, tag, id, classes, attributes, pseudos){ // direct children
		if ((node = node.firstChild)) do {
			if (node.nodeType === 1) this.push(node, tag, id, classes, attributes, pseudos);
		} while ((node = node.nextSibling));
	},
	
	'+': function(node, tag, id, classes, attributes, pseudos){ // next sibling
		while ((node = node.nextSibling)) if (node.nodeType === 1){
			this.push(node, tag, id, classes, attributes, pseudos);
			break;
		}
	},

	'^': function(node, tag, id, classes, attributes, pseudos){ // first child
		node = node.firstChild;
		if (node){
			if (node.nodeType === 1) this.push(node, tag, id, classes, attributes, pseudos);
			else this['combinator:+'](node, tag, id, classes, attributes, pseudos);
		}
	},

	'~': function(node, tag, id, classes, attributes, pseudos){ // next siblings
		while ((node = node.nextSibling)){
			if (node.nodeType !== 1) continue;
			var uid = this.getUID(node);
			if (this.bitUniques[uid]) break;
			this.bitUniques[uid] = true;
			this.push(node, tag, id, classes, attributes, pseudos);
		}
	},

	'++': function(node, tag, id, classes, attributes, pseudos){ // next sibling and previous sibling
		this['combinator:+'](node, tag, id, classes, attributes, pseudos);
		this['combinator:!+'](node, tag, id, classes, attributes, pseudos);
	},

	'~~': function(node, tag, id, classes, attributes, pseudos){ // next siblings and previous siblings
		this['combinator:~'](node, tag, id, classes, attributes, pseudos);
		this['combinator:!~'](node, tag, id, classes, attributes, pseudos);
	},
	
	'!': function(node, tag, id, classes, attributes, pseudos){  // all parent nodes up to document
		while ((node = node.parentNode)) if (node !== document) this.push(node, tag, id, classes, attributes, pseudos);
	},
	
	'!>': function(node, tag, id, classes, attributes, pseudos){ // direct parent (one level)
		node = node.parentNode;
		if (node !== document) this.push(node, tag, id, classes, attributes, pseudos);
	},
	
	'!+': function(node, tag, id, classes, attributes, pseudos){ // previous sibling
		while ((node = node.previousSibling)) if (node.nodeType === 1){
			this.push(node, tag, id, classes, attributes, pseudos);
			break;
		}
	},
	
	'!^': function(node, tag, id, classes, attributes, pseudos){ // last child
		node = node.lastChild;
		if (node){
			if (node.nodeType === 1) this.push(node, tag, id, classes, attributes, pseudos);
			else this['combinator:!+'](node, tag, id, classes, attributes, pseudos);
		}
	},

	'!~': function(node, tag, id, classes, attributes, pseudos){ // previous siblings
		while ((node = node.previousSibling)){
			if (node.nodeType !== 1) continue;
			var uid = this.getUID(node);
			if (this.bitUniques[uid]) break;
			this.bitUniques[uid] = true;
			this.push(node, tag, id, classes, attributes, pseudos);
		}
	}

};

for (var c in combinators) local['combinator:' + c] = combinators[c];

var pseudos = {
	
	/*<pseudo-selectors>*/

	'empty': function(node){
		var child = node.firstChild;
		return !(child && child.nodeType == 1) && !(node.innerText || node.textContent || '').length;
	},

	'not': function(node, expression){
		return !this.matchNode(node, expression);
	},

	'contains': function(node, text){
		return (node.innerText || node.textContent || '').indexOf(text) > -1;
	},

	'first-child': function(node){
		while ((node = node.previousSibling)) if (node.nodeType === 1) return false;
		return true;
	},

	'last-child': function(node){
		while ((node = node.nextSibling)) if (node.nodeType === 1) return false;
		return true;
	},

	'only-child': function(node){
		var prev = node;
		while ((prev = prev.previousSibling)) if (prev.nodeType === 1) return false;
		var next = node;
		while ((next = next.nextSibling)) if (next.nodeType === 1) return false;
		return true;
	},
	
	/*<nth-pseudo-selectors>*/

	'nth-child': local.createNTHPseudo('firstChild', 'nextSibling', 'posNTH'),
	
	'nth-last-child': local.createNTHPseudo('lastChild', 'previousSibling', 'posNTHLast'),
	
	'nth-of-type': local.createNTHPseudo('firstChild', 'nextSibling', 'posNTHType', true),
	
	'nth-last-of-type': local.createNTHPseudo('lastChild', 'previousSibling', 'posNTHTypeLast', true),
	
	'index': function(node, index){
		return this['pseudo:nth-child'](node, '' + index + 1);
	},

	'even': function(node, argument){
		return this['pseudo:nth-child'](node, '2n');
	},

	'odd': function(node, argument){
		return this['pseudo:nth-child'](node, '2n+1');
	},
	
	/*</nth-pseudo-selectors>*/
	
	/*<of-type-pseudo-selectors>*/
	
	'first-of-type': function(node){
		var nodeName = node.nodeName;
		while ((node = node.previousSibling)) if (node.nodeName === nodeName) return false;
		return true;
	},
	
	'last-of-type': function(node){
		var nodeName = node.nodeName;
		while ((node = node.nextSibling)) if (node.nodeName === nodeName) return false;
		return true;
	},
	
	'only-of-type': function(node){
		var prev = node, nodeName = node.nodeName;
		while ((prev = prev.previousSibling)) if (prev.nodeName === nodeName) return false;
		var next = node;
		while ((next = next.nextSibling)) if (next.nodeName === nodeName) return false;
		return true;
	},
	
	/*</of-type-pseudo-selectors>*/

	// custom pseudos

	'enabled': function(node){
		return (node.disabled === false);
	},
	
	'disabled': function(node){
		return (node.disabled === true);
	},

	'checked': function(node){
		return node.checked;
	},

	'selected': function(node){
		return node.selected;
	},
	
	'focus': function(node){
		return !this.isXMLDocument && this.document.activeElement === node && (node.href || node.type || this.hasAttribute(node, 'tabindex'));
	}
	
	/*</pseudo-selectors>*/
};

for (var p in pseudos) local['pseudo:' + p] = pseudos[p];

// attributes methods

local.attributeGetters = {

	'class': function(){
		return ('className' in this) ? this.className : this.getAttribute('class');
	},
	
	'for': function(){
		return ('htmlFor' in this) ? this.htmlFor : this.getAttribute('for');
	},
	
	'href': function(){
		return ('href' in this) ? this.getAttribute('href', 2) : this.getAttribute('href');
	},
	
	'style': function(){
		return (this.style) ? this.style.cssText : this.getAttribute('style');
	}

};

local.getAttribute = function(node, name){
	// FIXME: check if getAttribute() will get input elements on a form on this browser
	// getAttribute is faster than getAttributeNode().nodeValue
	var method = this.attributeGetters[name];
	if (method) return method.call(node);
	var attributeNode = node.getAttributeNode(name);
	return attributeNode ? attributeNode.nodeValue : null;
};

// overrides

local.overrides = [];

local.override = function(regexp, method){
	this.overrides.push({regexp: regexp, method: method});
};

/*<overrides>*/

/*<query-selector-override>*/

local.override(/./, function(expression, found, first){ //querySelectorAll override

	if (!this.querySelectorAll || this.nodeType != 9 || local.isXMLDocument || local.brokenMixedCaseQSA || Slick.disableQSA) return false;
	
	var nodes, node;
	try {
		if (first) return this.querySelector(expression) || null;
		else nodes = this.querySelectorAll(expression);
	} catch(error){
		return false;
	}

	var i, hasOthers = !!(found.length);

	if (local.starSelectsClosedQSA) for (i = 0; node = nodes[i++];){
		if (node.nodeName > '@' && (!hasOthers || !local.uniques[local.getUIDHTML(node)])) found.push(node);
	} else for (i = 0; node = nodes[i++];){
		if (!hasOthers || !local.uniques[local.getUIDHTML(node)]) found.push(node);
	}

	if (hasOthers) local.sort(found);

	return true;

});

/*</query-selector-override>*/

/*<tag-override>*/

local.override(/^[\w-]+$|^\*$/, function(expression, found, first){ // tag override
	var tag = expression;
	if (tag == '*' && local.brokenStarGEBTN) return false;
	
	var nodes = this.getElementsByTagName(tag);
	
	if (first) return nodes[0] || null;
	var i, node, hasOthers = !!(found.length);
	
	for (i = 0; node = nodes[i++];){
		if (!hasOthers || !local.uniques[local.getUID(node)]) found.push(node);
	}
	
	if (hasOthers) local.sort(found);

	return true;
});

/*</tag-override>*/

/*<class-override>*/

local.override(/^\.[\w-]+$/, function(expression, found, first){ // class override
	if (local.isXMLDocument || (!this.getElementsByClassName && this.querySelectorAll)) return false;
	
	var nodes, node, i, hasOthers = !!(found && found.length), className = expression.substring(1);
	if (this.getElementsByClassName && !local.brokenGEBCN){
		nodes = this.getElementsByClassName(className);
		if (first) return nodes[0] || null;
		for (i = 0; node = nodes[i++];){
			if (!hasOthers || !local.uniques[local.getUIDHTML(node)]) found.push(node);
		}
	} else {
		var matchClass = new RegExp('(^|\\s)'+ Slick.escapeRegExp(className) +'(\\s|$)');
		nodes = this.getElementsByTagName('*');
		for (i = 0; node = nodes[i++];){
			className = node.className;
			if (!className || !matchClass.test(className)) continue;
			if (first) return node;
			if (!hasOthers || !local.uniques[local.getUIDHTML(node)]) found.push(node);
		}
	}
	if (hasOthers) local.sort(found);
	return (first) ? null : true;
});

/*</class-override>*/

/*<id-override>*/

local.override(/^#[\w-]+$/, function(expression, found, first){ // ID override
	if (local.isXMLDocument || this.nodeType != 9) return false;
	
	var id = expression.substring(1), el = this.getElementById(id);
	if (!el) return found;
	if (local.idGetsName && el.getAttributeNode('id').nodeValue != id) return false;
	if (first) return el || null;
	var hasOthers = !!(found.length);
	if (!hasOthers || !local.uniques[local.getUIDHTML(el)]) found.push(el);
	if (hasOthers) local.sort(found);
	return true;
});

/*</id-override>*/

/*</overrides>*/

if (typeof document != 'undefined') local.setDocument(document);

// Slick

var Slick = local.Slick = (this.Slick || {});

Slick.version = '0.9dev';

// Slick finder

Slick.search = function(context, expression, append){
	return local.search(context, expression, append);
};

Slick.find = function(context, expression){
	return local.search(context, expression, null, true);
};

// Slick containment checker

Slick.contains = function(container, node){
	local.setDocument(container);
	return local.contains(container, node);
};

// Slick attribute getter

Slick.getAttribute = function(node, name){
	return local.getAttribute(node, name);
};

// Slick matcher

Slick.match = function(node, selector){
	if (!(node && selector)) return false;
	if (!selector || selector === node) return true;
	if (typeof selector != 'string') return false;
	local.setDocument(node);
	return local.matchNode(node, selector);
};

// Slick attribute accessor

Slick.defineAttributeGetter = function(name, fn){
	local.attributeGetters[name] = fn;
	return this;
};

Slick.lookupAttributeGetter = function(name){
	return local.attributeGetters[name];
};

// Slick pseudo accessor

Slick.definePseudo = function(name, fn){
	local['pseudo:' + name] = function(node, argument){
		return fn.call(node, argument);
	};
	return this;
};

Slick.lookupPseudo = function(name){
	var pseudo = local['pseudo:' + name];
	if (pseudo) return function(argument){
		return pseudo.call(this, argument);
	};
	return null;
};

// Slick overrides accessor

Slick.override = function(regexp, fn){
	local.override(regexp, fn);
	return this;
};

Slick.isXML = local.isXML;

Slick.uidOf = function(node){
	return local.getUIDHTML(node);
};

if (!this.Slick) this.Slick = Slick;
	
}).apply(/*<CommonJS>*/(typeof exports != 'undefined') ? exports : /*</CommonJS>*/this);

/*
---
name: Slick.Parser
description: Standalone CSS3 Selector parser
provides: Slick.Parser
...
*/

(function(){
	
var parsed,
	separatorIndex,
	combinatorIndex,
	reversed,
	cache = {},
	reverseCache = {},
	reUnescape = /\\/g;

var parse = function(expression, isReversed){
	if (!expression) return null;
	if (expression.Slick === true) return expression;
	expression = ('' + expression).replace(/^\s+|\s+$/g, '');
	reversed = !!isReversed;
	var currentCache = (reversed) ? reverseCache : cache;
	if (currentCache[expression]) return currentCache[expression];
	parsed = {Slick: true, expressions: [], raw: expression, reverse: function(){
		return parse(this.raw, true);
	}};
	separatorIndex = -1;
	while (expression != (expression = expression.replace(regexp, parser)));
	parsed.length = parsed.expressions.length;
	return currentCache[expression] = (reversed) ? reverse(parsed) : parsed;
};

var reverseCombinator = function(combinator){
	if (combinator === '!') return ' ';
	else if (combinator === ' ') return '!';
	else if ((/^!/).test(combinator)) return combinator.replace(/^!/, '');
	else return '!' + combinator;
};

var reverse = function(expression){
	var expressions = expression.expressions;
	for (var i = 0; i < expressions.length; i++){
		var exp = expressions[i];
		var last = {parts: [], tag: '*', combinator: reverseCombinator(exp[0].combinator)};
		
		for (var j = 0; j < exp.length; j++){
			var cexp = exp[j];
			if (!cexp.reverseCombinator) cexp.reverseCombinator = ' ';
			cexp.combinator = cexp.reverseCombinator;
			delete cexp.reverseCombinator;
		}
		
		exp.reverse().push(last);
	}
	return expression;
};

var escapeRegExp = function(string){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
	return string.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, "\\$&");
};

var regexp = new RegExp(
/*
#!/usr/bin/env ruby
puts "\t\t" + DATA.read.gsub(/\(\?x\)|\s+#.*$|\s+|\\$|\\n/,'')
__END__
	"(?x)^(?:\
	  \\s* ( , ) \\s*               # Separator          \n\
	| \\s* ( <combinator>+ ) \\s*   # Combinator         \n\
	|      ( \\s+ )                 # CombinatorChildren \n\
	|      ( <unicode>+ | \\* )     # Tag                \n\
	| \\#  ( <unicode>+       )     # ID                 \n\
	| \\.  ( <unicode>+       )     # ClassName          \n\
	|                               # Attribute          \n\
	\\[  \
		\\s* (<unicode1>+)  (?:  \
			\\s* ([*^$!~|]?=)  (?:  \
				\\s* (?:\
					([\"']?)(.*?)\\9 \
				)\
			)  \
		)?  \\s*  \
	\\](?!\\]) \n\
	|   :+ ( <unicode>+ )(?:\
	\\( (?:\
		 ([\"']?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\12\
	) \\)\
	)?\
	)"
*/
	"^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|:+(<unicode>+)(?:\\((?:([\"']?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\12)\\))?)"
	.replace(/<combinator>/, '[' + escapeRegExp(">+~`!@$%^&={}\\;</") + ']')
	.replace(/<unicode>/g, '(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
	.replace(/<unicode1>/g, '(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
);

function parser(
	rawMatch,
	
	separator,
	combinator,
	combinatorChildren,
	
	tagName,
	id,
	className,
	
	attributeKey,
	attributeOperator,
	attributeQuote,
	attributeValue,
	
	pseudoClass,
	pseudoQuote,
	pseudoClassValue
){
	if (separator || separatorIndex === -1){
		parsed.expressions[++separatorIndex] = [];
		combinatorIndex = -1;
		if (separator) return '';
	}
	
	if (combinator || combinatorChildren || combinatorIndex === -1){
		combinator = combinator || ' ';
		var currentSeparator = parsed.expressions[separatorIndex];
		if (reversed && currentSeparator[combinatorIndex])
			currentSeparator[combinatorIndex].reverseCombinator = reverseCombinator(combinator);
		currentSeparator[++combinatorIndex] = {combinator: combinator, tag: '*'};
	}
	
	var currentParsed = parsed.expressions[separatorIndex][combinatorIndex];

	if (tagName){
		currentParsed.tag = tagName.replace(reUnescape, '');

	} else if (id){
		currentParsed.id = id.replace(reUnescape, '');

	} else if (className){
		className = className.replace(reUnescape, '');

		if (!currentParsed.classList) currentParsed.classList = [];
		if (!currentParsed.classes) currentParsed.classes = [];
		currentParsed.classList.push(className);
		currentParsed.classes.push({
			value: className,
			regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
		});
		
	} else if (pseudoClass){
		pseudoClassValue = pseudoClassValue ? pseudoClassValue.replace(reUnescape, '') : null;
		
		if (!currentParsed.pseudos) currentParsed.pseudos = [];
		currentParsed.pseudos.push({
			key: pseudoClass.replace(reUnescape, ''),
			value: pseudoClassValue
		});
		
	} else if (attributeKey){
		attributeKey = attributeKey.replace(reUnescape, '');
		attributeValue = (attributeValue || '').replace(reUnescape, '');
		
		var test, regexp;
		
		switch (attributeOperator){
			case '^=' : regexp = new RegExp(       '^'+ escapeRegExp(attributeValue)            ); break;
			case '$=' : regexp = new RegExp(            escapeRegExp(attributeValue) +'$'       ); break;
			case '~=' : regexp = new RegExp( '(^|\\s)'+ escapeRegExp(attributeValue) +'(\\s|$)' ); break;
			case '|=' : regexp = new RegExp(       '^'+ escapeRegExp(attributeValue) +'(-|$)'   ); break;
			case  '=' : test = function(value){
				return attributeValue == value;
			}; break;
			case '*=' : test = function(value){
				return value && value.indexOf(attributeValue) > -1;
			}; break;
			case '!=' : test = function(value){
				return attributeValue != value;
			}; break;
			default   : test = function(value){
				return !!value;
			};
		}
		
		if (!test) test = function(value){
			return value && regexp.test(value);
		};
		
		if (!currentParsed.attributes) currentParsed.attributes = [];
		currentParsed.attributes.push({
			key: attributeKey,
			operator: attributeOperator,
			value: attributeValue,
			test: test
		});
		
	}
	
	return '';
};

// Slick NS

var Slick = (this.Slick || {});

Slick.parse = function(expression){
	return parse(expression);
};

Slick.escapeRegExp = escapeRegExp;

if (!this.Slick) this.Slick = Slick;
	
}).apply(/*<CommonJS>*/(typeof exports != 'undefined') ? exports : /*</CommonJS>*/this);

/**
 @adapter DOM Selector, providing basic functionalities of Selector Engine
 
 allowed methods: (currently)
 
 1. __SELECTOR.find(selector, context = document, first)
 finds a set of matching elements, always return an array
 
 always return {Array.<DOMElement>} !important !!!!!!!!!!!!!!
 
 2. __SELECTOR.contains(context, selector)
 return {boolean}
 
 3. __SELECTOR.match(element, selector)
 return {boolean}
 
 4. __SELECTOR.uid(element)
 return {number} the uid of the element
 
 // TEMP!
 5. __SELECTOR.parse(selector)
 return {Object} selector object
 
 
 arguments:
	 context {DOMElement|DOMDocument|Array.<DOMElement>}
	 first {boolean} only get the first match of the selector
	 selector {string}
	 element {DOMElement|DOMDocument}
	 
 within the Neuron Framework, using methods of DP.__SELECTOR besides the above is forbidden
 
 */
 
;(function(K){

// Store Slick in closure
var S = Slick;

 
// adapter for Slick
K.__SELECTOR = {
	find: function(selector, context, first){
		context = K.makeArray( context || document );
		
		var ret = [],
			len = context.length,
			i = 0,
			found,
			c,
			slick = S;
			
		for(; i < len; i ++){
			c = context[i];
			
			if(first){
				found = slick.find(c, selector);
				
				// if found stop searching
				if(found){
					ret[0] = found;
					break;
				}
				
			}else{
				found = slick.search(c, selector);
				if(found.length){
				
					// find all matches
					ret = ret.concat(found);
				}
			}
		}
		
		// always return an array
		return ret;
	},
	
	contains	: S.contains,
	match		: S.match,
	parse		: S.parse,
	uid			: S.uidOf
};

})(DP);


/**

// adapter for Sizzle







*/
/**
 * user agent
 * author  Kael Zhang
 */
 
(function(K){

	// @namespace DP.UA 
var UA = K.UA = {},
    NULL = null,
    FP_VERSION_REG = /[A-Za-z\s]+/g,
    FLASH_PLUGIN_NAME = 'ShockwaveFlash',
	// @enum {RegExp}
	REGEX_UA_MATCHER = {
	
		// the behavior of Google Chrome, Safari, Maxthon 3+, 360 is dependent on the engine they based on
		// so we will no more detect the browser version but the engine version
		
		// DP.UA.chrome and DP.UA.safari are removed
		webkit	: /webkit[ \/]([^ ]+)/,
		opera	: /opera(?:.*version)?[ \/]([\w.]+)/,
		ie		: /msie ([\w.]+)/,
		mozilla	: /mozilla(?:.*? rv:([\w.]+))?/
	},
	
	DEFAULT_PLATFORM = 'other',
    fpVersion=NULL,
	userAgent = navigator.userAgent.toLowerCase(),
	platform = navigator.platform.toLowerCase();


// userAgent
['webkit', 'opera', 'ie', 'mozilla'].forEach(function(name){
	var ua = UA;

	if(!ua.version){
		var match = userAgent.match(REGEX_UA_MATCHER[name]);
			
		if(match){
			ua[name] = ua.version = parseInt(match[1]);
			UA.fullVersion = match[1];	
		}
	}
});


UA.platform = platform = platform.match(/ip(?:ad|od|hone)/) ? 'ios' 
	: ( platform.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || [DEFAULT_PLATFORM] )[0];


if(platform !== DEFAULT_PLATFORM){
	UA[platform] = true;
}

function makeInt(n) {
    return n>>>0;
}
/**
 * parse version
 * @param flashVer
 * @returns {Object}
 *  <code>
 *      vers = {major: 11, minor: 0, revision: 11}
 *  </code>
 */
function parseFlashVersion(flashVer) {
    var vers = {},
        major = makeInt(flashVer[0]),
        minor = makeInt(flashVer[1]),
        revision = makeInt(flashVer[2]);

    vers.major = major;
    vers.minor = minor;
    vers.revision = revision;

    return vers;
}

//parse platform information, to get version of flashplayer
function getFlashVersion() {
    var mF, eP, vS, ax, vS, fpVersion;
    if (UA.ie) {
        // flash ver 7 or higher version
        try {
            ax = new ActiveXObject(FLASH_PLUGIN_NAME + "." + FLASH_PLUGIN_NAME + ".7");
            vS = ax.GetVariable("$version");
        } catch (e) {
            //not check failed case here, to avoid deep context
        }
        // lower version
        if (!vS) {
            try {
                // version will be set for 6.X players only
                ax = new ActiveXObject(FLASH_PLUGIN_NAME + "." + FLASH_PLUGIN_NAME + ".6");

                // installed player is some revision of 6.0
                // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
                // so we have to be careful.

                // default to the first public version
                vS = "WIN 6,0,21,0";

                // throws if AllowScripAccess does not exist (introduced in 6.0r47)
                ax.AllowScriptAccess = "always";

                // safe to call for 6.0r47 or greater
                vS = ax.GetVariable("$version");

            } catch (e) {
                fpVersion = NULL;
            }
        }
        vS && (fpVersion = parseFlashVersion(vS.replace(/[A-Za-z\s]+/g, '').split(',')));
    } else {
        if ((mF = navigator.mimeTypes['application/x-shockwave-flash'])) {
            if ((eP = mF.enabledPlugin)) {
                vS = eP.description.replace(/\s[rd]/g, '.').replace(FP_VERSION_REG, '').split('.');
                fpVersion = parseFlashVersion(vS);
            }
        }
    }
    return fpVersion;
};
/**
 * get version of flashplayer
 * @returns {Object}
 * <code>
 *     {
 *         major: 11,  // major version
 *         minor: 0,    //minor version
 *         revision:12 //revision version
 *     }
 * </code>
 */
UA.getFlashVersion = function (){
    return fpVersion || (fpVersion=getFlashVersion());
}

})(DP);


/**
 change log:
 
 2011-09-03  Kael Zhang:
 - create file
 - remove DP.UA.chrome and DP.UA.safari
 2011-06-13 xuwei.chen
 - add UA.getFlashVersion
 */
/**
 * basic DOM parsing
 * module  DOM/core
 * author  Kael Zhang
 */
;(function(K){


/**
 nodeType: 
 ref: https://developer.mozilla.org/en/nodeType
 
	Node.ELEMENT_NODE == 1
		- document.documentElement
		- document.body
		- <head>
		
	Node.ATTRIBUTE_NODE == 2
	Node.TEXT_NODE == 3
	Node.CDATA_SECTION_NODE == 4
	Node.ENTITY_REFERENCE_NODE == 5
	Node.ENTITY_NODE == 6
	Node.PROCESSING_INSTRUCTION_NODE == 7
	Node.COMMENT_NODE == 8
	Node.DOCUMENT_NODE == 9
		- document
		
	Node.DOCUMENT_TYPE_NODE == 10
	Node.DOCUMENT_FRAGMENT_NODE == 11
	Node.NOTATION_NODE == 12
 */
 
 
/**
 *
 */
function isDOMSubject(el){
	var type;
	return K.isWindow(el) || el && (type = el.nodeType) && (type === 1 || type === 9);
};


function getContext(el){
	// window 		-> window
	// body 		-> body
	// [null]		-> [null]
	// $(window)	-> window
	return !el || isDOMSubject(el) ? el : el._ === atom && el.context; 
};


/**
 * @param {string|DOMElement} element
 * @param {(DOM|NodeList|DOMElement)=} context
 */
function DOM(element, context){

	// use ECMAScript strict
	var self = this;
	
	if(element instanceof DOM){
		return element;
		
	}else if(self instanceof DOM){
	
		// @type {Array.<DOMElement>}
		// @private
		self.context = K.makeArray(element).filter(isDOMSubject);
		
	}else{
	
		return one(element, context);
	}
};


/**
 * @param {string} name
 * @param {function()} method
 * @param {string|boolean.<false>} type
 */

// extends is one of the javascript reserved words
function extend(name, method, type){
	var generator,
		host = DOM.prototype;

	if(K.isPlainObject(name)){
		generator = IMPLEMENT_GENERATOR[method] || IMPLEMENT_GENERATOR.def;
		
		for(var n in name){
			generator(host, n, name[n]);
		}
	}else{
		generator = IMPLEMENT_GENERATOR[type] || IMPLEMENT_GENERATOR.def;
		generator(host, name, method);
	}
	
	return DOM;
};


// save the current $ in window, for the future we need to return it back
var WIN = K.__HOST,

// store the original value of $
_$ = WIN.$,
	
SELECTOR = K.__SELECTOR,
	
DOC = WIN.document,

atom = K.__,


/**
 'mutator'	:   the method modify the current context({Object} this.context, as the same as below), 
				and return the modified DOM instance(the old one) itself
					
 'iterator'	:	the method iterate the current context, may modify the context, maybe not 
				and return the modified DOM instance(the old one) itself
					
 X 'accessor'	:	the method will not modify the context, and generate something based on the current context,
				and return the new value
				(removed!)have been merged with 'def'
					
 'def' 		:   simply implement the method into the prototype of DOM,
				and the returned value determined by the method
 */
IMPLEMENT_GENERATOR = {

// never used currently
/**
	mutator: function(host, name, method){
		host[name] = function(){
			var self = this;
			method.apply(self, arguments);
			
			return self;
		}
	},
*/
	
	iterator: function(host, name, method){
		host[name] = function(){
			var self = this,
				context = self.context, 
				i = 0, len = context.length;
				
			for(; i < len; i ++){
				method.apply(context[i], arguments);
			}
			
			return self;
		}
	},

// never used currently
/**	
	accessor: function(host, name, method){
		host[name] = function(){
			return method.apply(this, arguments);
		}
	},
*/	
	def: function(host, name, method){
		host[name] = method;
	}
},


one = function(selector, context){
	var el;
	
	// $(undefined) ->
	// 	- [null]
	
	// $(el) ->
	//  - window
	//  - document
	//  - DOMElement
	if(!K.isString(selector)){
		el = selector;
	
	// $('body')
	// $('body', document)
	// $('.container', document.body)
	}else{
		el = SELECTOR.find(selector, getContext(context), true);
	}
	
	return new DOM( el );
};


DOM.all = function(selector, context){
	return K.isString(selector) ?
		
		  // $.all('body', document)
		  // $.all('li', container)
		  new DOM( SELECTOR.find(selector, getContext(context)) )
		  
		  // $.all(el, document)
		  // $.all(el)
		: one(selector);
};


// identifier to mark Neuron DOM
DOM.prototype._ = atom;


// temporary method for dom creation
// will be override in module DOM/create
/*
DOM.create = function(fragment, attributes){
	var element;
	
	if(typeof fragment === 'string'){
		element = DOC.createElement(fragment);
	}
	
	return element;
};
*/


extend({
	one: function(selector){
		return new DOM( SELECTOR.find(selector, this.context, true) );
	},
	
	all: function(selector){
		return new DOM( SELECTOR.find(selector, this.context) ); 
	},
	
	/**
	 * @param {number=} index
	 *		if index is a number, returns the element of the specified index
	 *		if index is undefined, returns the array of all matched elements
	 */
	el: function(index){
		var context = this.context;
	
		return K.isNumber(index) ? context[index] : K.clone(context);
	},

	get: function(index){
		var el = this.context[index];
		
		return new DOM( el );
	},
	
	count: function(){
		return this.context.length;
	},
	
	/**
	 all extensive modules should not rely on the private uid property of a certain element   
	 
	id: function(index){
		var context = this.context,
			el = context[index || 0];
	
		return el ? SELECTOR.uid(el) : null;
	},
	
	 */
	
	/**
	 * iterator
	 */
	forEach: function(fn){
		this.context.forEach(fn);
		return this;
	}
});


WIN.$ = K.DOM = DOM;


// traits
// @private
DOM.methods = {};


// @public
// create basic methods and hooks
DOM.__storage = {};

// method for extension
DOM.extend = extend;

// adaptor of selector engine
DOM.SELECTOR = SELECTOR;

// returns the $ object back to its original value
DOM.noConflict = function(){
	WIN.$ = _$;
	return DOM;
};


})(DP, null);


/**
 change log:
 
 2011-10-20  Kael:
 - fix a bug that if we dollar a dollared object(DP.DOM Object), we will loose matched elements
 - new DOM.forEach() now will return this
 
 2011-10-13  Kael:
 - add $.noConflict() method
 
 2011-10-11  Kael:
 - define fake package here
 - improve stability for DOM and DOM.all when fetching elements
 - fix $(window), $(document), $(el, context)
 - DOM no longer create elements. please use DOM.create instead
 - DOM and DOM.all could accept an instance of DOM as the context parameter
 - add an atom to identify Neuron DOM instance
 
 2011-09-09  Kael:
 - add .forEach method
 
 TODO
 A. add method to return $ back to window


 */
/**
 * feature detection about dom
 * module  dom/feature
 */

DP.DOM.feature = function(){

	function elementsByTagName(wrap, tagName){
		return wrap.getElementsByTagName(tagName);
	};

	var DOC = document,
		defaultView = DOC.defaultView,
		element_test = DOC.createElement('div'),
		input_test,
		
		ADD_EVENT_LISTENER = 'addEventListener',
		REMOVE_EVENT_LISTENER = 'removeEventListener',
		
		create_element_accepts_html,
		escapeQuotes,
		
		a;
	
	element_test.innerHTML = ' <link/><table></table><a href="/a" style="top:1px;float:left;opacity:.7;">a</a><input type="checkbox"/>';
	
	a = elementsByTagName(element_test, 'a')[0];
	
	try {
		input_test = DOC.createElement('<input name=x>');
		create_element_accepts_html = input_test.name == 'x';
		
		escapeQuotes = function(html){
			return ('' + html).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
		};
		
	} catch(e){}
	
	return {
		
		computedStyle: !!(defaultView && defaultView.getComputedStyle),
		
		// in some old webkit(including chrome), a.style.opacity === '0,7', so use regexp instead
		// ref: 
		opacity: /^0.7$/.test(a.style.opacity),
		
		compactEl: !DOC.compatMode || DOC.compatMode === 'CSS1Compat' ?
			  function(doc){ return doc.documentElement; } 
			: function(doc){ return doc.body; },
			
		addEvent: element_test[ADD_EVENT_LISTENER] ?
			  function(el, type, fn, useCapture){ el[ADD_EVENT_LISTENER](type, fn, !!useCapture); }
			: function(el, type, fn){ el.attachEvent('on' + type, fn); },
		
		removeEvent: element_test[REMOVE_EVENT_LISTENER] ?
			  function(el, type, fn, useCapture){ el[REMOVE_EVENT_LISTENER](type, fn, !!useCapture); }
			: function(el, type, fn){ el.detachEvent('on' + type, fn); },
			
		fragment: create_element_accepts_html ? 
		
			// Fix for readonly name and type properties in IE < 8
			function(tag, attrs){
				var name = attrs.name,
					type = attrs.type;
				
				tag = '<' + tag;
				if (name){
					tag += ' name="' + escapeQuotes(name) + '"';
				}
				
				if (type){
					tag += ' type="' + escapeQuotes(type) + '"';
				}
				
				tag += '>';
				
				delete attrs.name;
				delete attrs.type;
				
				return tag;
			} : 
			
			function(tag){
				return tag;
			}
			
	};

}();


/**
 change log:
 
 2012-01-12  Kael:
 - add the <code>useCapture</code> argument to feature.addEvent and removeEvent methods
 
 
 
 */




/**
 * module  DOM/event
 */

;(function(K){

function getWindow(element){
    // window
    return 'setInterval' in element ? element
    
        // document
        : 'getElementById' in element ? element.window
            : element.ownerDocument.window;
};


function getStorage(el){
    var id = SELECTOR.uid(el);

    return event_storage[id] || (event_storage[id] = {});
}; 


// from jQuery
function checkRelatedTarget(event){
    var related = event.relatedTarget,
        el = this;
    
    // Firefox sometimes assigns relatedTarget a XUL element
    // which we cannot access the parentNode property of
    try{
        // Chrome does something similar, the parentNode property
        // can be accessed but is null.
        if ( related && related !== document && !related.parentNode ) {
            return;
        }

        // Traverse up the tree
        while ( related && related !== el ) {
            related = related.parentNode;
        }

        if ( related !== el ) {
            // handle event if we actually just moused on to a non sub-element
            return true;
        }
        
    }catch(e){}
    
    return;
};


function removeDOMEvent(type, fn, useCapture){
    var el = this,
        storage = getStorage(el),
        remove = removeDOMEventByType,
        s;
        
    if(!storage){
        return;
    }
    
    if(fn){
        var index;
    
        s = storage[type];
        index = s ? s.fns.indexOf(fn) : -1;
        index !== -1 && remove(el, s, index, useCapture);
        
    }else{
        var types = type ?
                  storage[type] ? [type] : []
                  
                  // if type is undefined, get all types
                : Object.keys(storage),
                
            len = types.length,
            t;
        
        while(len --){
            t = types[len];     // type
            s = storage[t];     // storage
            
            s.fns.forEach(function(f, i){
                f && remove(el, s, i, useCapture);
            });
            
            s.fns.length = s.vals.length = 0;
            delete storage[t];
        }
    }
};


function removeDOMEventByType(el, storage, index, useCapture){
    
    // > If a listener was registered twice, one with capture and one without, 
    // > each must be removed separately.
    // ref: https://developer.mozilla.org/en/DOM/element.removeEventListener
    removeEvent(el, storage.base, storage.vals[index], useCapture);
    delete storage.fns[index];
    delete storage.vals[index];
};


/**
 * create an adapter and the mock object for native Event object
 * @constructor
 * @param {Event} event native Event instance
 * @param {Window} win
 * @param {Object} config
 */
function DOMEvent(event, win, config){
    if(event instanceof DOMEvent){
        return event;
        
    }else if(!event){
        return;
    }

    win || (win = K.__HOST);
    event || (event = win.event);
    config || (config = {});
    
    var self    = this,
        type    = self.type     = config.type || event.type,
        real    = self.base     = config.base || type,
        target  = self.target   = event.target || event.srcElement,
        page    = self.page     = {},
        client  = self.client   = {},
        NULL    = null,
        related,
        doc,
        touch;
        
    self.event = event;
    
    K.mix(self, event, true, ['shiftKey', 'ctrlKey', 'altKey', 'metaKey']);
        
    while (target && target.nodeType == 3){
        target = target.parentNode;
    }

    if (real.indexOf('key') !== -1){
        // TODO:
        // test function keys, on macosx and win
        self.code = event.which || event.keyCode;
        
    } else if (real === 'click' || real === 'dblclick' || real === 'contextmenu' || /mouse/i.test(real) ){
        doc = getCompactElement(win.document);
        
        page.x = event.pageX != NULL ? event.pageX : event.clientX + doc.scrollLeft;
        page.y = event.pageY != NULL ? event.pageY : event.clientY + doc.scrollTop;
        
        client.x = event.pageX != NULL ? event.pageX - win.pageXOffset : event.clientX;
        client.y = event.pageY != NULL ? event.pageY - win.pageYOffset : event.clientY;
        
        if (real === 'DOMMouseScroll' || real === 'mousewheel'){
            self.wheel = (event.wheelDelta) ? event.wheelDelta / 120 : - (event.detail || 0) / 3;
        }
        
        self.rightClick = (event.which == 3) || (event.button == 2);
        
        if (real == 'mouseover' || real == 'mouseout'){
            related = event.relatedTarget || event[(real == 'mouseover' ? 'from' : 'to') + 'Element'];
            
            while (related && related.nodeType == 3){
                related = related.parentNode;
            }
            
            self.relatedTarget = related;
        }
                
    } else if ((/^(?:gesture|touch)/i).test(real)){
        K.mix(self, event, true, ['rotation', 'scale', 'targetTouches', 'changedTouches', 'touches']);
    
        touch = self.touches && self.touches[0];
        
        if (touch){
            page.x = touch.pageX;
            page.y = touch.pageY;
            client.x = touch.clientX; 
            client.y = touch.clientY;
        }
    }
};


DOMEvent.prototype = {
    stop: function(){
        return this.stopBubble().prevent();
    },

    stopBubble: function(){
        var e = this.event, m = 'stopPropagation';
        e && ( e[m] ? e[m]() : (e.cancelBubble = true) );
        
        return this;
    },

    prevent: function(){
        var e = this.event, m = 'preventDefault';
        e && ( e[m] ? e[m]() : (e.returnValue = false) );
        
        return this;
    }
};


var DOM = K.DOM,
    SELECTOR = DOM.SELECTOR,
    storage  = DOM.__storage,
    feature  = DOM.feature,
    
    event_storage = (storage.events = {}),
    
    getCompactElement   = feature.compactEl,
    addEvent            = feature.addEvent,
    removeEvent         = feature.removeEvent,
    
    TRUE = true,
    
    Events = {
        mouseenter: {
            base: 'mouseover',
            condition: checkRelatedTarget
        },
        
        mouseleave: {
            base: 'mouseout',
            condition: checkRelatedTarget
        },
        
        mousewheel: {
            base: K.UA.mozilla ? 'DOMMouseScroll' : 'mousewheel'
        }
    },
    
    NO_EVENTS = {
        unload: TRUE,
        beforeunload: TRUE,
        resize: TRUE,
        move: TRUE,
        DOMContentLoaded: TRUE,
        readystatechange: TRUE,
        error: TRUE,
        abort: TRUE,
        scroll: TRUE
    };


// cleaner
event_storage._clean = function(id){
    var storage = event_storage[id];
    
    if(storage){
        K.each(storage, function(v, key){
            v.fns.length = v.vals.length = 0;
            delete this[key];
        });
    }
};
    

DOM.extend({

    /**
     * inspired by: Dean Edwards's addEvent lib
     * bind an event
     * @param {string} type
     * @param {function()} fn
     * @param {useOrigin} 
     */
    on: K._overloadSetter(function(type, fn, useCapture){
        var el = this,
            storage = getStorage(el),
            s = storage[type],
            fns,
            custom;
            
        if(!s){
            custom = Events[type];
        
            s = storage[type] = {
                
                // store the original fn use passed in
                fns: [], 
                
                // store the wrapped function
                vals: []
            };
            
            // based type
            s.base = custom && custom.base || type;
            
            // condition
            s.c = custom && custom.condition;
            
            // no events
            s.n = NO_EVENTS[real_type];
        }
        
        fns = s.fns;
        
        if(fns.indexOf(fn) !== -1){
            return;
        }
        fns.push(fn);
        
        
        var action,
            real_type = s.base;
        
        if(s.c){
            action = function(event){
                return s.c.call(this, event) ? fn.call(this, event) : true;
            };
            
        }else{
            action = fn;
        }

        var eventFn = s.n ?
            function(){
                return action.call(el);
            } :
            
            /**
             <code>
                $('abc').on('click', function(e){
                    // e && e.prevent();     // you never need to write any code like this
                    e.prevent();             // but directly use 'e'
                });
             </code>
             */
            function(event){
                event = new DOMEvent(event, getWindow(el), {type: type, base: real_type}); // TODO: getWindow
                if (action.call(el, event) === false){
                    event.stop();
                }
            };
            
        s.vals.push(eventFn);
        
        addEvent(el, real_type, eventFn, useCapture);
    }),
    
    
    /**
     * detach a event or events
     * .off()                                -> remove all
     * .off('click')                            -> remove all click
     * .off('click', fn)                        -> remove click method fn
     * .off({ click: fn, mouseenter: fn2 })    -> remove several events
     */
    off: K._overloadSetter(removeDOMEvent, true),
    
    
    /**
     * fire an event
     */
    fire: function(type){
        var el = this,
            storage = getStorage(el);
            
        if(storage[type]){
            storage[type].vals.forEach(function(fn){
                fn();
            });
        }
    }

}, 'iterator');


DOM.Event = DOMEvent;
DOM.Events = Events;


})(DP);

/**
 change log:
 
 2012-05-02  Kael:
 - fix mousewheel event for firefox
 
 2012-01-13  Kael:
 - when mouseenter(or other imitated event) triggered, event.type will no longer be 'mouseover'(the event name that delegated to) but 'mouseenter' itself.
     <code>
         .on('mouseenter', function(e){
             e.type; // 'mouseenter'
             e.base; // 'mouseover'
         });
     </code>
 
 2012-01-12  Kael:
 - add the useCapture argument to .on and .off methods
 
 2011-10-11  Kael:
 - improve stability when there's no event object
 - fix a bug about no-event object events
 - add method .fire()
 
 TODO:
 A. focusin, focusout
 
 2011-10-06  Kael:
 TODO:
 A. refractor event module
 
 2011-09-10  Kael:
 - basic functionalities
 
 TODO:
 X A. fix onchange event of input elements


 */
/**
 * module  DOM/css
 */
;(function(K, NULL){


// __SELECTOR makes sure that element is a DOMElement/DOMDocument
function getDocument(element){
	// window
	return 'setInterval' in element ? element.document 
	
		// document
		: 'getElementById' in element ? element 
			: element.ownerDocument;
};


function camelCase(str){
	return str.replace(REGEX_CAMELCASE, function(matchAll, match1){
		return match1.toUpperCase();
	});
};


function hyphenate(str){
	return str.replace(REGEX_HYHPENATE, function(matchAll){
		return '-' + matchAll;
	});
};

// TODO: add hooks for compatibility
function filterCSSType(name){
	return camelCase(name === 'float' ? STR_FLOAT_NAME : name);
};


// from jQuery
function swap(element, styles, callback){
	var old = {}, name;

	// Remember the old values, and insert the new ones
	for(name in styles){
		old[name] = element.style[name];
		element.style[name] = styles[name];
	}

	callback.call(element);

	// Revert the old values
	for(name in styles){
		element.style[name] = old[name];
	}
};


/**
 * Get the value of a style property for the first element
 * @this {DOMElement}
 * @param {string} name Array is not allowed, unlike mootools
 * @return {string|number|(Array.<number>)}
 	- {string} numeric values with *units*, such as font-size ('12px'), height, width, etc
 	- {number} numeric values without units, such as zIndex
 	- ? {Array} color related values, always be [<r>, <g>, <b>, <a>] // TODO
 	
 * never determine your control flow by css styles!
 */
function getCSS(name){
	name = filterCSSType(name);
	
	var el = this, ret,
		specified = CSS_methods[name];
		
	if(specified && specified.GET){
		ret = specified.GET(el);
	
	}else{
		ret = el.style[name];
		
		if(!ret || name === 'zIndex'){
			ret = currentCSS(el, name);
		}
	}
	
	// TODO: color
	
	return ret;
};


/**
 * get width and height of an element
 */
function getWH(element, property){
	var minus = property === 'width' ? ['left', 'right'] : ['top', 'bottom'], 
		ret = element[camelCase('offset-' + property)];
		
	minus.forEach(function(v){
		ret -= ( parseFloat(getCSS.call(this, 'border-' + v + '-width')) || 0 )
			  + ( parseFloat(getCSS.call(this, 'padding-' + v)) || 0 );
	}, element);
	
	return ret;
};


var DOM = K.DOM,
	UA = K.UA,
	DOC = document,
	HTML = DOC.documentElement,
	TRUE = true,
	
	currentCSS,
	
	REGEX_CAMELCASE = /-([a-z])/ig,
	REGEX_HYHPENATE = /[A-Z]/g,
	REGEX_OPACITY = /opacity=([^)]*)/,
	REGEX_FILTER_ALPHA = /alpha\([^)]*\)/i,
	// REGEX_NUM_PX = /^-?\d+(?:px)?$/i,
	// REGEX_NUM = /^-?\d+/,
	
	// 0.123
	// .23
	// 23.456
	// REGEX_CSS_VALUE_NUMBER = /^(?:\d*\.)?\d+(?=px$)/i,
	
	STR_CSSFLOAT = 'cssFloat',
	
	STYLE_INVISIBLE_SHOW = {
		position	: 'absolute',
		visibility	: 'hidden',
		display		: 'block'
	},
	
	feature = DOM.feature,
												 
	STR_FLOAT_NAME = STR_CSSFLOAT in HTML.style ?
		STR_CSSFLOAT 		// standard, IE9+
		: 'styleFloat', 	// IE5.5 - IE8, IE9
		
	CSS_methods = {},
	
	CSS_CAN_BE_SINGLE_PX = {
		// offset
		// left: TRUE, top: TRUE, bottom: TRUE, right: TRUE,
		
		// size
		width: TRUE, height: TRUE, maxwidth: TRUE, maxheight: TRUE, minwidth: TRUE, minheight: TRUE, textindent: TRUE,
		
		// text
		fontsize: TRUE, letterspacing: TRUE, lineheight: TRUE,
		
		// box
		margin: TRUE, padding: TRUE, borderwidth: TRUE
	};


// @private
// get computed styles
currentCSS = feature.curCSS = feature.computedStyle ? 

	// standard
	function(element, property){
		var defaultView = getDocument(element).defaultView,
	
			// ref: https://developer.mozilla.org/en/DOM/window.getComputedStyle
			computed = defaultView ? defaultView.getComputedStyle(element, null) : null;
			
		return (computed) ? 
			computed.getPropertyValue( property === STR_FLOAT_NAME ? 'float' : hyphenate(property) ) 
			: null;
	} :

	// IE5.5 - IE8, ref: 
	// http://msdn.microsoft.com/en-us/library/ms535231%28v=vs.85%29.aspx
	// http://www.quirksmode.org/dom/w3c_html.html
	function(element, property){
		var currentStyle = element.currentStyle;
	
		return currentStyle && currentStyle[camelCase(property)] || '';
	};
	
/*
	
	// convert all other units to pixel
	function(element, property){
		var left,
			ret = element.currentStyle && element.currentStyle[ property ],
			runtime_left = element.runtimeStyle && element.runtimeStyle[ property ],
			style = element.style;

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number ( kael: such as '1em')
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !REGEX_NUM_PX.test( ret ) && REGEX_NUM.test( ret ) ) {
			// Remember the original values
			left = style.left;

			// Put in the new values to get a computed value out(kael: pixel value)
			if ( runtime_left ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = property === 'fontSize' ? '1em' : (ret || 0);
			ret = style.pixelLeft + 'px';

			// Revert the changed values
			style.left = left;
			if ( runtime_left ) {
				elem.runtimeStyle.left = runtime_left;
			}
		}

		return ret === "" ? "auto" : ret;
	};
*/


if(!feature.opacity){

	// from jQuery
	CSS_methods.opacity = {
	
		// will never adjust 'visibility' of element, unlike mootools
		SET: function(element, opacity){
			var style = element.style,
				currentStyle = element.currentStyle,
				filter = currentStyle && currentStyle.filter || style.filter || '';

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;
			
			opacity = Number(opacity);
			opacity = opacity || opacity === 0 ?
				  'alpha(opacity=' + opacity * 100 + ')'
				: '';

			style.filter = REGEX_FILTER_ALPHA.test( filter ) ?
				  filter.replace( REGEX_FILTER_ALPHA, opacity )
				: filter + ' ' + opacity;
		},
		
		// @return {number}
		GET: function(element){
			return '' + (
				REGEX_OPACITY.test( currentCSS(element, 'filter') || '' ) ?
				  	parseFloat( RegExp.$1 ) / 100
					: 1
			);
		}
	};
}


/**
 * never use .css('margin'), but .css('margin-*') instead, as well as:
 * border, border-color, border-width, padding, etc.
 
 * it's useless that you get values like '100px 20px 10px 5px' which is hardly operated.
 
 * for a better control structure, do something like below:
 <code>
	if( parseInt($('#container').css('margin-right')) === 100){
		// code...
	}
 </code>
 */
// CSS_methods.margin


// When an element is temporarily not displayed, the height and width might be 0
// so they need special treatment
['height', 'width'].forEach(function(property){
	CSS_methods[property] = {
		GET: function(element){
			var ret;
		
			// if element is set display: none;
			if(element.offsetWidth === 0){
			
				// temporarily and shortly set the element not display:none 
				swap(element, STYLE_INVISIBLE_SHOW, function(){
					ret = getWH(element, property);
				});
				
			}else{
				ret = getWH(element, property);
			}
			
			return ret;
		}
	};
});


['top', 'right', 'bottom', 'left'].forEach(function(direction){
	var list = CSS_CAN_BE_SINGLE_PX;
	
	list[direction] = 
	list['margin' + direction] = 
	list['padding' + direction] = 
	list['border' + direction + 'width'] = true;
});


// add css getter and setter to DOM hook functions
DOM.methods.css = {
	len: 1,
	
	/**
	 * @param {string} name
	 * @param {number|string} value
	 	setter of css will be simple, value will not accept Array. unlike mootools
	 */
	SET: K._overloadSetter(function(name, value){
		name = filterCSSType(name);
	
		var el = this,
			specified = CSS_methods[name];
		
		// if has a specified setter
		if(specified && specified.SET){
			specified.SET(el, value);
			
		}else{
			if( CSS_CAN_BE_SINGLE_PX[name.toLowerCase()] && (
					// is number string and the current style type need 'px' suffix
					// -> .css('margin', '20')   
					// -> .css('margin', 20)
					(value += '') && value === '' + Number(value)
				)
			){
				value += 'px';
			}
			
			el.style[name] = value;
		}
	}),
	
	GET: getCSS	
};


})(DP, null);

/**
 change log:
 
 2011-10-27  Kael:
 - fix the getter of css when getting 'height' of an element which it's not in the DOM
 
 2011-09-10  Kael:
 
 TODO:
 - A. test runtimeStyle, ref:
 	http://lists.w3.org/Archives/Public/www-style/2009Oct/0060.html
 	http://msdn.microsoft.com/en-us/library/ms535889(v=vs.85).aspx
 - B. computedStyle for width and height
 - C. test margin-right
 
 2011-09-09  Kael:
 - complete basic css methods
 - create getter and setter method for opacity in old ie

 */
/**
 * module  DOM/traverse
 */
 
;(function(K){

// TEMP!
function createSelectorObject(expression, combinator){
	if (!expression) return combinator;

	expression = SELECTOR.parse(expression);

	var expressions = expression.expressions;
	for (var i = expressions.length; i--;)
		expressions[i][0].combinator = combinator;

	return expression;
};


var DOM = K.DOM,

SELECTOR = K.__SELECTOR,

TRAVERSING_CONFIG = {

	/**
	 * @type {string} op selector operator
	 * @type {boolean=} f whether only get the first
	 */
	prev: {
		op: '!~',
		f: true
	},
	
	prevAll: {
		op: '!~'
	},
	
	next: {
		op: '~',
		f: true
	},
	
	nextAll: {
		op: '~'
	},
	
	child: {
		op: '>',
		f: true
	},
	
	// different with .all, return the direct offsprings
	children: {
		op: '>'	
	},
	
	parent: {
		op: '!',
		f: true
	},
	
	parents: {
		op: '!'
	}
};

K.each(TRAVERSING_CONFIG, function(cfg, key){
	this[key] = function(selector){
		return new DOM(
			SELECTOR.find(
				createSelectorObject(selector, cfg.op), 
				
				// these accessors only traverse the first element of current matches
				this.context.slice(0, 1), 
				cfg.f
			) 
		);
	}
});


/**
 * the traversing methods below will create a completely new Object
 * suppose this situation:
 
 <code>
 var container = $.one('#container'),
 	 parent = container.parent();
 
 // container and parent must be different
 
 </code>
 
 */
DOM.extend(TRAVERSING_CONFIG).extend({

	// @return {Object} the new DOM instance with the first element of the current matches
	first: function(){
		return new DOM( this.context.slice(0, 1) );
	},
	
	// @return {Object} the new DOM instance with the last element of the current matches
	last: function(){
		return new DOM( this.context.slice(-1) );
	}
	
});


})(DP);


/**
 change log:
 
 2011-10-11  Kael:
 - optimize for compression
 - fix a syntax error
 
 
 */
/**
 * module  DOM/manipulate
 	- basic method to manipulate DOMElements
 	- initialize all specified DOM related methods defined in previous modules
 */
 
;(function(K, NULL, undef){

function hasClass(el, cls){
	var whitespace = WHITE_SPACE; 
	return (whitespace + el.className + whitespace).indexOf(whitespace + cls + whitespace) !== -1;
};

function addClass(cls){
	var el = this;
	
	if(!hasClass(el, cls)){
		el.className = ( el.className + WHITE_SPACE + cls ).trim();
	}
};

function removeClass(cls){
	this.className = this.className.replace(new RegExp('(?:^|\\s+)' + cls + '(?:\\s+|$)'), ' ').trim();
};


function getStorage(el){
	var id = SELECTOR.uid(el);

	return data_storage[id] || (data_storage[id] = {});
};


// clear data stored in the specified element
// clear attributes
function cleanElement(el){
	var id = SELECTOR.uid(el),
		dom = new DOM(el);
		
	dom.off();
	
	el.clearAttributes && el.clearAttributes();
	
	K.each(storage, function(s){
		var m = '_clean';
		
		// if has a cleaner method, use it
		s[m] ? s[m](id) : delete s[id];
	});
};


/**
 * multiple setter or single getter

 * data({a:1}) 	-> iterative setter
 * data('a', 1) -> setter
 * data('a')	-> getter
 
 @this {DOM}
 
 @param {Object} methods object contains setter and getter methods
 @paran {number} getterArgLength
 
 <code:pseudo>
 - case 1:
 	getter:
		get('value')	-> arg[0] == String, arg.len == 1 == getterArgLength
 
	setter:
	 	set('value', 1)	-> 
		set({value: 1})	-> arg[0] != String, arg.len = 1 => arg.len >= getterArgLength
		
 - case 0:
 	getter:
 		value();		-> arg.len == 0 == getterArgLength
 	
 	setter:
 		value(1)		-> arg.len > 0 => arg.len >= getterArgLength
 		
 </code:pseudo>
 */
function overloadDOMGetterSetter(methods, getterArgLength){
	return function(){
		var context = this.context,
			args = arguments,
			first_arg = args[0],
			
			type, 
			len = args.length, 
			getter_len = getterArgLength,
			m,
			hook_methods,
			no_getter_args = getter_len === 0;
		
		// getter	
		if(
			getter_len === len && 
			
			// value() || get('value')
			( no_getter_args || K.isString(first_arg) )
		){
			// getter always only deal with the value of the first element
			var first = context[0];
			
			// if no element found, return null
			return first ? methods.GET.call(context[0], first_arg) : null;
		
		// setter
		}else if(
			len >= getter_len &&
			
			// value(<whatever>) || set(<must not false>, <optional>)
			// don't judge the type of first_arg, which will be done in DP._overloadSetter
			( no_getter_args || first_arg )
		){
			m = methods.SET;
		
			m && context.forEach(function(el){
				m.apply(el, args);
			});
		}
		// else {
		// 		ex: 
		//			.attr() -> getter_len = 1, len = 0
		// 		do nothing
		// }
		
		return this;
	};
};


/**
 * @param {DOMElement|DOM} el native DOMElement or the instance of DOM
 * @return {DOMElement} native DOMElement(or the first context of DOM instance)
 */
function getFirstContext(element){
	if(typeof element === 'string'){
		element = DOM.one(element);
	}

	element = (element instanceof DOM) ? element.el(0) : element;
	return element && element.nodeType ? element : false;
};


function getAllContexts(element){
	return (element instanceof DOM) ? element.context : makeArray(element).filter(function(el){
		return el && el.nodeType;
	});
};


// @this {DOMElement}
function disposeElement(){
	var parent = this.parentNode;
	parent && parent.removeChild(this);
};

// @this {DOMElement}
function emptyElement(){

	// IE6-7 fail to call Array.prototype.slice with NodeLists
	// use DP.makeArray instead
	makeArray(this.childNodes).forEach(function(child){
		disposeElement.call(child);
	});
};


function grabElements(element, elements, where){
	elements = getAllContexts(elements);
	if(where === 'top'){
		elements = elements.reverse();
	}
	
	elements.forEach(function(el){
		el && inserters[where || 'bottom'](el, element);
	});
};


function getOptionValue(el){
	var valueNode = el.getAttributeNode('value');
	return !valueNode || valueNode.specified ? el.value : el.text;
};


function santitizeValue(value){
	return value == null ? '' : value + '';
};


var DOM = K.DOM,
	SELECTOR = DOM.SELECTOR,
	storage = DOM.__storage = {},
	makeArray = K.makeArray,
	
	WHITE_SPACE = ' ',
	
	// @type {Object}
	// list of methods for both getter and setter
	METHODS = DOM.methods,
	
	data_storage = storage.data = {},
	
	TRUE = true,
	
	// .attr() method will no longer deal with 'html' and 'text' 
	// so they are now excluded in ATTR_CONVERT and ATTR_KEY
	
	ATTR_CONVERT = {
		// defaultvalue	: 'defaultValue',
		tabindex		: 'tabIndex',
		readonly		: 'readOnly',
		'for'			: 'htmlFor',
		'class'			: 'className',
		maxlength		: 'maxLength',
		cellspacing		: 'cellSpacing',
		cellpadding		: 'cellPadding',
		rowspan			: 'rowSpan',
		colspan			: 'colSpan',
		usemap			: 'useMap',
		frameborder		: 'frameBorder',
		contenteditable	: 'contentEditable' // ,
		// type			: 'type',
		// html			: 'innerHTML',
	},
	
	ATTR_TEXT = function(){
		var STR_TEXTCONTENT = 'textContent';
		
		// TODO: test if memleak
		return STR_TEXTCONTENT in document.createElement('div') ? STR_TEXTCONTENT : 'innerText';
	}(),
	
	ATTR_KEY = {
		// html	: TRUE,
		// text	: TRUE,
		'for'	: TRUE,
		'class'	: TRUE,
		type	: TRUE  // TODO: test readonly property
	},
	
	REGEX_IS_URI_ATTR = /^(?:href|src|usemap)$/i,
	
	ATTR_BOOLS = ['compact', 'nowrap', 'ismap', 'declare', 'noshade', 'checked', 'disabled', 'readOnly', 'multiple', 'selected', 'noresize', 'defer', 'defaultChecked'],
	
	inserters = {
		before: function(context, element){
			var parent = element.parentNode;
			parent && parent.insertBefore(context, element);
		},
	
		after: function(context, element){
			var parent = element.parentNode;
			parent && parent.insertBefore(context, element.nextSibling);
		},
	
		bottom: function(context, element){
			element.appendChild(context);
		},
	
		top: function(context, element){
			element.insertBefore(context, element.firstChild);
		}
	},
	
	val_traits = {
		option: {
			GET: getOptionValue 
		},
		
		select: {
			GET: function(el){
				var selected = el.options[el.selectedIndex];
				
				return selected ? getOptionValue(selected) : '';
			},
			
			SET: function(el, value){
				var values = makeArray(value);
				
				// in IE(tested up to IE9), <select>.options === <select>
				// so you couldn't makeArray el.options by detecting the type of el.options, but have to force making.
				makeArray(el.options, [], true).forEach(function(option, i){
					option.selected = values.indexOf( getOptionValue(option) ) !== -1;
				});

				if (!values.length) {
					el.selectedIndex = -1;
				}
			}
		}
	};
	
	
// .attr() methods
METHODS.attr = {

	// arguments length of getter: 1
	len: 1,
	
	// attribute setter
	SET: K._overloadSetter( function(name, value){
		var prop = ATTR_CONVERT[name] || name, el = this;
		
		name in ATTR_KEY ? 
			el[prop] = value
			: ( ATTR_BOOLS.indexOf(prop) !== -1 ?
			
				el[prop] = !!value
				: el.setAttribute(prop, '' + value)
			  );
	}),

	// attribute getter
	// @return {string|boolean}
	GET: function(name){
		var prop = ATTR_CONVERT[name] || name,
			el = this, attrNode;
		
		return name in ATTR_KEY ? 
			
			el[prop]
			: ( REGEX_IS_URI_ATTR.test(prop) ?
			
				// getAttribute(name, 2), return value as string
				// ref: http://msdn.microsoft.com/en-us/library/ms536429%28v=vs.85%29.aspx
				el.getAttribute(prop, 2)
				
				: ( ATTR_BOOLS.indexOf(prop) !== -1 ?
					
					// if is boolean attribute
					!!el[prop]
					
					// ref: https://developer.mozilla.org/en/DOM/element.getAttributeNode
					: ( (attrNode = el.getAttributeNode(prop)) ?
						
						attrNode.nodeValue
						: NULL
					  )
				  ) 
			  );
	}
};
	

// .data() methods
METHODS.data = {
	len: 1,
	
	SET: K._overloadSetter( function(name, value){
		var s = getStorage(this);
		s[name] = value;
	}),
	
	GET: function(name){
		var s = getStorage(this);
		return s[name];
	}
};
	

/**
 * .html() methods

 * no api equivalent to .set('html', '') of mootools
 * use .empty() instead to prevent memleak
 
 * .html() is a getter
 */
METHODS.html = {

	/**
	 * avoid using .html('')
	 * use .empty() instead
	
	 * ref:
	 * Creating and Manipulating Tables: http://msdn.microsoft.com/en-us/library/ms532998%28v=vs.85%29.aspx
	 */
	SET: function(){
		var allow_table_innerHTML = false,
			table_test = document.createElement('table'),
			container = document.createElement('div'),
			WRAPPERS;
		
		try{
			table_test.innerHTML = '<tr><td></td></tr>';
			allow_table_innerHTML = true;
		}catch(e){}
		
		table_test = NULL;
		
		if(!allow_table_innerHTML){
		
			// in IE, which said by Microsoft: 
			// > However, because of the specific structure required by tables, 
			// > the innerText and innerHTML properties of the table and tr objects are read-only
			WRAPPERS = {
				table	: [1, '<table>', '</table>'],
				select	: [1, '<select>', '</select>'],
				tbody	: [2, '<table><tbody>', '</tbody></table>'],
				tr		: [3, '<table><tbody><tr>', '</tr></tbody></table>']
			};
			
			WRAPPERS.thead = WRAPPERS.tfoot = WRAPPERS.tbody;
		}

		return function(html){
			var el = this,
				wrapper = !allow_table_innerHTML && WRAPPERS[ el.tagName.toLowerCase() ];
				
			if(wrapper){
				var c = container, dimension = wrapper[0];
				c.innerHTML = wrapper[1] + html + wrapper[2];
				
				while(dimension --){
					c = c.firstChild;
				};
				
				emptyElement.call(el);
				grabElements(el, c.childNodes);
				
			}else{
				el.innerHTML = html
			}
		};
	}(),
	
	GET: function(){
		return this.innerHTML;
	}
};

	
// .text() methods
METHODS.text = {
	SET: function(text){
		emptyElement.call(this);
		this[ATTR_TEXT] = text;
	},
	
	GET: function(){	
		return this[ATTR_TEXT];
	}
};


// .val() methods
METHODS.val = {
	SET: function(value){
		// prevent set window or document
		if(this.nodeType !== 1){
			return;
		}
	
		var el = this,
			tag = this.nodeName.toLowerCase(),
			method = val_traits[tag];
			
		method && ( method = method.SET );
			
		value = K.isArray(value) ? value.map(santitizeValue) : santitizeValue(value);
			
		method ? method(el, value) : (el.value = value);
	},
	
	GET: function(){
		var el = this,
			tag = el.nodeName.toLowerCase(),
			method = val_traits[tag];
			
		method && ( method = method.GET );
			
		return method ? method(el) : el.value;
	}
};


DOM.extend({

	addClass: addClass,
	
	removeClass: removeClass,
	
	toggleClass: function(cls){
		var el = this;
		
		hasClass(el, cls) ? removeClass.call(el, cls) : addClass.call(el, cls);
	},
	
	removeData: function(name){
		if(name === undef){
			var id = SELECTOR.uid(this);
			id && delete data_storage[id]
		}else{
			var s = getStorage(this);
			delete s[name];
		}
	},
	
	removeAttr: function(name){
		var prop = ATTR_CONVERT[name], el = this;
			
			name in ATTR_KEY ? el[prop] = ''
				: ATTR_BOOLS.indexOf(prop) !== -1 ? el[prop] = false
					: self.removeAttribute(prop);
	},
	
	inject: function(element, where){
		element = getFirstContext(element);
		element && inserters[where || 'bottom'](this, element);
	},
	
	grab: function(elements, where){
		grabElements(this, elements, where);
	},
	
	dispose: disposeElement,
	
	empty: emptyElement
	
}, 'iterator'


).extend({
	hasClass: function(cls){
		return hasClass(this.context[0], cls);
	},
	
	match: function(selector){
		return SELECTOR.match(this.context[0], selector);
	},
	
	destroy: function(){
		var context = this.context;
		
		context.forEach(function(el){
			var children = K.makeArray( el.getElementsByTagName('*') );
			
			children.push(el);
			children.forEach(cleanElement);
			disposeElement.call(el);
		});
		
		return NULL;
	}
});


// extend setter and getter(batch or single) methods
K.each(METHODS, function(method, name){
	this[name] = overloadDOMGetterSetter(method, method.len || 0);
	delete method.len;
});


DOM.extend(METHODS);

DOM._overload = overloadDOMGetterSetter;

})(DP, null);


/**
 change log:
 2012-04-05  Kael:
 - remove 'html' and 'text' from ATTR_KEY
 - fix a bug of setting the value for a `<select>`
 
 TODO:
 A. support and detect boolean attributes for further standards
 
 2012-03-31  Kael:
 - no longer overload DOM::attr method for 'html' and 'text' arguments, and must use .html() and .text() methods instead.
 
 2011-12-20  Kael:
 - [TODO.11-02.A] fix the getter for 'checked' and other boolean attributes
 
 TODO:
 A. refractor attr trait for better upwards compatibility
 
 2011-11-02  Kael:
 - change implementation of removeClass to eliminate unexpected whitespace

 TODO:
 √ A. deal with getter and setter of boolean attributes
 B. refractor for native events and custom events
 C. overload arguments of DOM.grab
 
 2011-10-17  Kael:
 - fix a but about DOM.destroy
 
 2011-10-12  Kael:
 - fix a bug that ie fails on collections, use DP.makeArray instead of Array.prototype.slice
 - complete .val() method
 - optimize DP.makeArray invocations
 
 TODO:
 A. santitize element value
 
 2011-09-12  Kael:
 TODO:
 A. review .inject and .grab. whether should only deal with the first element of all matches
 B. deal with more elements of tables, such as caption, colgroup, etc
 
 2011-09-08  Kael:
 - improve stability of function overloadDOMGetterSetter
 - add method hooks, DOM.methods
 TODO:
 A. overloadDOMGetterSetter: add support for iterative setters
 
 2011-09-07  Kael:
 - complete methods about attributes manipulation
 
 TODO:
 A. add .html(), .text() hook to .attr() method
 B. test readonly props
 C. test if memleak
 
 2011-09-05  Kael:
 - complete basic functionalities
 
 */
;(function(K){

var DOM = K.DOM,
	DOC = document,

	feature = DOM.feature,
	
	generateFragment = feature.fragment;


DOM.create = function(fragment, attributes){
	if (attributes){
		if(attributes.checked != null){
			attributes.defaultChecked = attributes.checked;
		}
	}else{
		attributes = {};
	}
	
	fragment = generateFragment(fragment, attributes);
	
	return new DOM(DOC.createElement(fragment)).attr(attributes);
};


})(DP);
/**
 * module  web/domready
 * author  Kael Zhang
 */
 

// TODO!!!!!  complete event
 

;(function(K, undef){


/**
 * Custom domready event
 * @private
 * ----------------------------------------------------------------------------------------------------------- */

function domready(){

	// fire domready only once
	if(!is_domready){
		is_domready = true;
		fire_domready();
	}
}

function fire_domready(){
	var self = this,
		r = readyList, fn;
		
	if(r){	
		for(var i = 0, len = r.length; i < len; i ++){
			fn = r[i]
			fn && fn.call(WIN, K);
		}

		r.length = 0;
		readyList = null;
	}
};


function bind_domready(){

	function poll_scroll(){
		try {
			// doScroll technique by Diego Perini http://javascript.nwbox.com/IEContentLoaded/
			doScroll('left');
			ready();
		} catch(ex) {
			setTimeout(poll_scroll, 10);
		}
	};
	
	function _ready(){
		_doc.off(eventType, _ready);
        _win.off('load', _ready);
		_doc = _win = null;
		domready();
	};

	var COMPLETE = 'complete', doc = WIN.document,
		doScroll = doc.documentElement.doScroll,
		eventType = doScroll ? 'readystatechange' : 'DOMContentLoaded',
		_doc = new DOM(doc),
        _win = new DOM(WIN);
		
	is_domready_binded = true;
	
	// Catch cases where ready() is called after the
	// browser event has already occurred.
	if(doc.readyState === COMPLETE) return domready();
	
	_doc.on(eventType, _ready);
	
	// A fallback to load
	// and make sure that domready event fires before load event registered by user
	_win.on('load', _ready);
	
	if(doScroll){
		var not_framed = false;
		
		try {
			not_framed = win.frameElement == null;
		} catch(e) {}
		
		if(not_framed){
			poll_scroll();
		}
	}
};


var is_domready = false,
	is_domready_binded = false,
    is_loaded = false,
    
    DOM = K.DOM,
	
    readyList = [],

	// @const
	WIN = K.__HOST;
    

K.isDomReady = function(){
	return is_domready;
};
	
K.isLoaded = function(){
	return is_loaded;
};
	
/**
 * the entire entry for domready event
 * window.addEvent('domready', fn) has been carried here, and has no more support
 * @param {function()} fn the function to be executed when dom is ready
 */
K.ready = function(fn){
	// delay the initialization of binding domready, making page render faster
	is_domready_binded || bind_domready();
	
	if(is_domready){
		fn.call(WIN, this);
	}else{
		readyList.push(fn);
	}
};


})(DP);

/**
 2011-09-04  Kael Zhang:
 - split domready alone
 - migrate event handler from mootools to Neuron
 
 2011-04-12  Kael Zhang:
 - fix a bug that domready could not be properly fired
 	
 2010-12-31  Kael Zhang:
 - migrate domready event out from mootools to here, and change some implementations
 
 */
/**
 * module  loader/assets
 */
;(function(K, NULL){


var 

DOC = K.__HOST.document;

if(!DOC){
    return;
}


var

HEAD = DOC.getElementsByTagName('head')[0],

REGEX_FILE_TYPE = /\.(\w+)$/i,

/**
 * method to load a resource file
 * @param {string} uri uri of resource
 * @param {function()} callback callback function
 * @param {string=} type the explicitily assigned type of the resource, 
 	can be 'js', 'css', or 'img'. default to 'img'. (optional) 
 */
loadSrc = function(uri, callback, type){
	var extension = type || uri.match(REGEX_FILE_TYPE)[1];
	
	return extension ?
		( loadSrc[ extension.toLowerCase() ] || loadSrc.img )(uri, callback)
		: NULL;
};


/**
 * static resource loader
 * meta functions for assets
 * --------------------------------------------------------------------------------------------------- */
	
loadSrc.css = function(uri, callback){
	var node = DOC.createElement('link');
	
	node.href = uri;
	node.rel = 'stylesheet';
	
	callback && assetOnload.css(node, callback);
	
	// insert new CSS in the end of `<head>` to maintain priority
	HEAD.appendChild(node);
	
	return node;
};
	
loadSrc.js = function(uri, callback){
	var node = DOC.createElement('script');
	
	node.src = uri;
	node.async = true;
	
	callback && assetOnload.js(node, callback);
	
	loadSrc.__pending = uri;
	HEAD.insertBefore(node, HEAD.firstChild);
	loadSrc.__pending = NULL;
	
	return node;
};
	
loadSrc.img = function(uri, callback){
	var node = DOC.createElement('img'),
		delay = setTimeout;
		
	function complete(name){
        node.onload = node.onabort = node.onerror = complete = NULL;

		setTimeout(function(){ 
			callback.call(node, {type: name});
			node = NULL;
		}, 0);
	};

	callback && ['load', 'abort', 'error'].forEach(function(name){
		node['on' + name] = function(){
			complete(name);
		};
	});

	node.src = uri;

	callback && node.complete && complete && complete('load');
	
	return node;
};


var

// @this {element}
assetOnload = {
	js: ( DOC.createElement('script').readyState ?
	
		/**
		 * @param {DOMElement} node
		 * @param {!function()} callback asset.js makes sure callback is not null
		 */
		function(node, callback){
	    	node.onreadystatechange = function(){
	        	var rs = node.readyState;
	        	if (rs === 'loaded' || rs === 'complete'){
	            	node.onreadystatechange = NULL;
	            	
	            	callback.call(this);
	        	}
	    	};
		} :
		
		function(node, callback){
			node.addEventListener('load', callback, false);
		}
	)
},

// assert.css from jQuery
cssOnload = ( DOC.createElement('css').attachEvent ?
	function(node, callback){
		node.attachEvent('onload', callback);
	} :
	
	function(node, callback){
		var is_loaded = false,
			sheet = node['sheet'];
			
		if(sheet){
			if(K.UA.webkit){
				is_loaded = true;
			
			}else{
				try {
					if(sheet.cssRules) {
						is_loaded = true;
					}
				} catch (ex) {
					if (ex.name === 'NS_ERROR_DOM_SECURITY_ERR') {
						is_loaded = true;
					}
				}
			}
		}
	
	    if (is_loaded) {
	    	setTimeout(function(){
	    		callback.call(node);
	    	}, 0);
	    }else {
			setTimeout(function(){
				cssOnload(node, callback);
			}, 10);
	    }
	}
); // end var

assetOnload.css = cssOnload;

/**
 * load a static source 
 * DP.load(src, cb);
 * DP.load.js(src, cb);
 * DP.load.css(src, cb);
 * DP.load.img(src, cb);
 */
K['load'] = loadSrc;

    
})(DP, null);
/**
 * @preserve Neuron core:loader v5.0.1(active mode)
 * author i@kael.me 
 */
 
/**
 
 which is ifferent from loader in passive mode, 
 active loader will automatically parse dependencies and load them into the current page.
 */

; // fix layout of UglifyJS

/**
 * include
 * X - static resource loader
 * - a commonjs module loader
 * - interface for business configuration
 
 * implements
 * - CommonJS::Modules/Wrappings                        >> http://kael.me/-cmw
 * - CommonJS::Modules/Wrappings-Explicit-Dependencies    >> http://kael.me/-cmwed
 
 * Google closure compiler advanced mode strict
 */

/**
 * @param {undefined=} undef
 */
;(function(K, NULL, undef){

/**
 * stack, config or flag for modules
 */
var    

/**
 * map -> identifier: module
 */
_mods = {},            

/**
 * map -> url: status
 */
_script_map = {},

/**
 * map -> namespace: config
 */
// _apps_map = {},

/**
 * configurations:
 *     - CDNHasher
     - santitizer
     - allowUndefinedMod
 */
_config = {},

_last_anonymous_mod = NULL,
_define_buffer_on = false,

// fix onload event on script node in ie6-9
use_interactive = K.UA.ie, // < 10,
interactive_script = NULL,

// @type {function()}
warning,
error,

Loader,
    
/**
 * @const
 */
// ex: `~myModule`
// USER_MODULE_PREFIX = '~',
APP_HOME_PREFIX = '~/',

// ex: Checkin::index
APP_NAMESPACE_SPLITTER = '::',

// REGEX_FILE_TYPE = /\.(\w+)$/i,

/**
 * abc             -> js: abc.js        
 * abc.js         -> js: abc.js
 * abc.css        -> css: abc.css
 * abc#            -> js: abc
 * abc?123        -> js: abc?123
 * abc?123.js    -> js: abc?123.js
 * abc?123.css    -> css: abc?123.css
 */
REGEX_NO_NEED_EXTENSION = /\.(?:js|css)$|#|\?/i,
REGEX_IS_CSS = /\.css(?:$|#|\?)/i,

/**
 * abc/def        -> abc
 */
REGEX_DIR_MATCHER = /.*(?=\/.*$)/,

// no operation
NOOP = function(){},

HOST = K.__HOST,
DOC = HOST.document,
HEAD = DOC.getElementsByTagName('head')[0],

getLocation = K.getLocation,

/**
 * module status
 * @enum {number}
 * @const
 */    
STATUS = {
    // the module's uri has been specified, 
    // DI -> DEFINING
    DI    : 1,

    // the module's source uri is downloading or executing
    // LD -> LOADING
    LD    : 2,
    
    // the module has been explicitly defined. 
    // DD -> DEFINED
    DD     : 3,
    
    // being analynizing and requiring the module's dependencies
    // RQ -> REQUIRING
    RQ     : 4,
    
    // the module's factory function are ready to be executed
    // the module's denpendencies are set as STATUS.RD
    // RD -> READY
    RD     : 5 //,
    
    // the module already has exports
    // the module has been initialized, i.e. the module's factory function has been executed
    // ATTACHED      : 6
},

asset = K.load;


/**
 Parameter naming:

 name           : a generic name which might be mixed types of values
 identifier     : module identifier just, such as 'io/ajax', also including relative identifiers, such as './jsonp'
 pathname       : pathname
 uri            : identifier name or url
 urn            : name of module identifier
 
 
 Object attributes:
 i      : abbr for identifier
 u      : abbr for url
 fu     : full url with contains decorations such as `.min` and `.v21`
 p      : parent or path
 ns     : namespace
 n      : urn
 m      : mod

 */

/**
 * module define
 * --------------------------------------------------------------------------------------------------- */

/**
 * method to define a module
 * @public
 * @param {string} name module name
 * @param {(Array.<string>|string)=} dependencies array of module names
 * @param {(string|function()|Object)=} factory
 *         {string}     the uri of a (packaged) module(s)
 *      {function}     the factory of a module
 *      {object}     module exports
 */
function define(name, dependencies, factory){
    var 
    
    version, info, uri, path,
    arg = arguments,
    last = arg.length - 1,
    EMPTY = '',
    _def = _define;
    
    if(arg[last] === true){                    // -> define(uri1, uri2, uri3, true);
        for_each(arg, function(path, i){
            var UNDEF;
        
            i < last && _def(EMPTY, UNDEF, UNDEF, applyRelativeURI(path, UNDEF, '/'));
        });
        return;
    }

    // overload and tidy arguments 
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if(!K.isString(name)){                  // -> define(dependencies, factory);
        factory = dependencies;
        dependencies = name;
        name = undef;
    }
    
    if(!K.isArray(dependencies)){           // -> define(factory);
        if(dependencies){
            factory = dependencies;
        }
        dependencies = undef;
    }
        
    // split name and version
    if(name){
        if(arguments.length === 1){         // -> define(uri);
            factory = applyRelativeURI(name);
            name = EMPTY;
        }
    }
    
    // TODO bug
    if(_define_buffer_on){                  // -> after define.on();
        info = generateModulePathAndURL( moduleNameToURI(name, undef, '/') );
        uri = info.u;
        path = info.p;
        name = EMPTY;
    }else{
        name = undef;
    }
    
    _def(name, path, dependencies, factory, uri);
};


/**
 * method for inner use
 * @private
 * @param {string|undefined} name
         {string}
             === '': in the case that only defining module uri
             !== '': module identifier 
         {undefined} anonymous module definition - the module has no explicit identifier
 
 * @param {string=} identifier (optional) module identifier
 * @param {(Array.<string>)=} dependencies
 * @param {(function(...[number])|Object|string)=} factory
         {string} absolute! uri
 * @param {string=} uri module uri, the extra info. for define buffer
 */
function _define(name, path, dependencies, factory, uri){
    /**    
     * @type {Object}
     * restore mod data {
             version:    {String=}    version
             status:        {Number}    module status
             uri:        {String}    source uri of module
             isCSS:        {Boolean=}    whether is css module
             
             // either of two
             factory:    {function}    factory function
             exports:    {Object}    module exports
         }
     */
    var 
    
    mod = {},
    path_info,
    existed,
    active_script_uri;
    
    /**
     * get module object 
     */
    if(name){
        
        name.indexOf('/') !== -1 && !_define_buffer_on && warning(100, name);
    
    // anonymous module define
    // define a module in a module file
    }else if(name !== ''){
        
        // via Kris Zyp
        // Ref: http://kael.me/-iikz
        if (use_interactive) {
            
            // Kael: 
            // In IE(tested on IE6-9), the onload event may NOT be fired 
            // immediately after the script is downloaded and executed
            // - it occurs much late usually, and especially if the script is in the cache, 
            // So, the anonymous module can't be associated with its javascript file by onload event
            // But, always, onload is never fired before the script is completed executed
            
            // demo: http://kael.me/TEMP/test-script-onload.php
            
            // > In IE, if the script is not in the cache, when define() is called you 
            // > can iterate through the script tags and the currently executing one will 
            // > have a script.readyState == "interactive" 
            active_script_uri = getInteractiveScript()
            
                // Kael:
                // if no interactive script, fallback to asset.__pending
                // if the script is in the cache, there is actually no interactive scripts when it's executing
                || {};
                
            active_script_uri = active_script_uri.src
                
                // > In IE, if the script is in the cache, it actually executes *during* 
                // > the DOM insertion of the script tag, so you can keep track of which 
                // > script is being requested in case define() is called during the DOM 
                // > insertion.            
                || asset.__pending;
        }
        
        if(!active_script_uri){
            // if fetching interactive script failed, fall back to normal ways
            _last_anonymous_mod = mod;
        }else{
            mod = getModuleByPath( generateModulePathAndURL(active_script_uri).p );
        }
    }
    
    switch(K._type(factory)){
        
        // define(url);
        case 'string':
            mod.s = STATUS.DI;
            path_info = generateModulePathAndURL(factory);
            uri = path_info.u;
            path = path_info.p;
            
            if(REGEX_IS_CSS.test(factory)){
                mod.isCSS = true;
            }
                    
            // need package checking
            // only those who defined with module uri that need package checking
            mod.npc = true;
            mod.p = path;
            
            break;
        
        // define(deps, factory);
        // define(factory);
        case 'function':
            mod.f = factory;
            
            // if dependencies is explicitly defined, loader will never parse them from the factory function
            // so, to define a standalone module, you can set dependencies as []
            
            // if(!dependencies){
            //    dependencies = parseDependencies(factory);
            // }
            
            if(dependencies && dependencies.length){
                mod.s = STATUS.DD;
                
                // only if defined with factory function, can a module has dependencies
                mod.deps = dependencies;
            }else{
                mod.s = STATUS.RD;
            }
            
            break;
            
        // define(exports)
        case 'object':
            mod.exports = factory;
            
            // tidy module data, when fetching interactive script succeeded
            active_script_uri && tidyModuleData(mod);
            uri = NULL;
            break;
            
        default:
            // fail silently
            return;
    }
    
    // define buffer or string type factory
    if(uri){
        mod.u = uri;
    }
    
    // give user module a special prefix
    // so that user could never override the library module by defining with:
    // <code:pseudo>
    //         DP.define('http://myurl', function(){…});
    // </code>
    // it will be saved as `~http://myurl`;
    // name && memoizeMod(USER_MODULE_PREFIX + name, mod);
    
    if(path){
        existed = getModuleByPath(path);
        existed ? ( mod = K.mix(existed, mod) ) : memoizeMod(path, mod);
    }
    
    // internal use
    return mod;
};


/**
 * module load
 * --------------------------------------------------------------------------------------------------- */
 
/**
 * method to load a module
 * @public
 * @param {Array.<String>} dependencies
 * @param {(function(...[number]))=} callback (optional)
 */
function provide(dependencies, callback){
    dependencies = K.makeArray(dependencies);
    
    _provide(dependencies, callback, {});
}; 


/**
 * @private
 * @param {Object} env environment for cyclic detecting and generating the uri of child modules
     {
         r: {string} the uri that its child dependent modules referring to
         p: {string} the uri of the parent dependent module
         n: {string} namespace of the current module
     }
 * @param {boolean=} noCallbackArgs whether callback method need arguments, for inner use
 */
function _provide(dependencies, callback, env, noCallbackArgs){
    var 

    counter = dependencies.length,
    args = [K],
    arg_counter = 0,
    cb;
        
    if(K.isFunction(callback)){
        cb = noCallbackArgs ?
            callback
        : 
            function(){
                callback.apply(NULL, args);
            };
    }
        
    if(counter === 0){
        cb && cb();
    }else{
        for_each(dependencies, function(dep, i){
            var mod = getOrDefine(dep, env),
                arg_index = mod.isCSS ? 0 : ++ arg_counter;
            
            if(isCyclic(env, mod.u)){
                warning(120);
            }
            
            provideOne(mod, function(){
                if(cb){
                    -- counter;
                
                    if(!noCallbackArgs && arg_index){
                        args[arg_index] = createRequire(env)(dep);
                    }
                    
                    if(counter === 0){
                        cb();
                    }
                }
            }, {u: mod.u, ns: mod.ns, p: env});
        });
    }
};


/**
 * @private
 * @param {string} urn
 * @param {object=} env
 * // @param {boolean=} noWarn
 */
function getOrDefine(urn, env/* , noWarn */){
    var 
    
    referenceURI = env.u,
       
    // module data
    mod,
    
    name = urn,
        
    // app data                      
    namespace,
    namesplit = urn.split(APP_NAMESPACE_SPLITTER),
    is_app_home_module,
    home_prefix = APP_HOME_PREFIX,
    
    uri, path;
    
    // -> 'index::common'
    if(namesplit[1]){
        name = namesplit[1];                            // -> 'common'
        namespace = namesplit[0].toLowerCase();         // -> 'index'
    }
        
    
    // in [Checkin::index].js
    // ex: '~/dom' 
    //     -> name: 'dom', namespace: 'Checkin'
    if(is_app_home_module = name.indexOf(home_prefix) === 0){
        name = name.substr(home_prefix.length);
    }
    
    // these below are treated as modules within the same namespace
    // '~/dom'
    // './dom'
    // '../dom'
    if(is_app_home_module || isRelativeURI(name)){
        namespace = env.ns;
    }

    uri = moduleNameToURI(
        name, 
        referenceURI,
        // if has namespace, then the base location is app home
        namespace && _config.appBase + namespace + '/'
    );
    
    path = generateModulePathAndURL(uri).p;
    mod = getModuleByPath(path);
    // warn = warn && !mod;
    
    if(!mod){
        // always define the module url when providing
        mod = _define('', undef, undef, uri);
    }
    
    if(namespace){
        mod.ns = namespace;
    }
    
    return mod;
};


/**
 * provideOne(for inner use)
 * method to provide a module, push its status to at least STATUS.ready
 * @param {Object} mod
 * @param {function()} callback
 * @param {!Object} env sandbox of environment {
         r: {string} relative uri,
         p: {Object} environment of the parent module(caller module which depends on the current 'mod' ),
         n: {string} namespace of the caller module
   }
 */
function provideOne(mod, callback, env){
    var status = mod.s, 
        parent, cb,
        _STATUS = STATUS;
    
    // Ready -> 5
    // provideOne method won't initialize the module or execute the factory function
    if(mod.exports || status === _STATUS.RD){
        callback();
    
    }else if(status >= _STATUS.DD){
        cb = function(){
            var ready = _STATUS.RD;
            
            // function cb may be executed more than once,
            // because a single module might be being required by many other modules simultainously.
            // after a certain intermediate process, maybe the module has been initialized and attached(has 'exports') 
            // and its status has been deleted.
            // so, mod.s must be checked before we set it as 'ready'
            
            // undefined < ready => false
            if(mod.s < ready){
                mod.s = ready;
            }
            
            callback();
        };
    
        // Defined -> 3
        if(status === _STATUS.DD){
            mod.s = _STATUS.RQ;
            mod.pending = [cb];
            
            // recursively loading dependencies
            _provide(mod.deps, function(){
                var m = mod;
                for_each(m.pending, function(c){
                    c();
                });
                
                m.pending.length = 0;
                delete m.pending;
            }, env, true);
            
        // Requiring -> 4
        }else{
            mod.pending.push(cb);
        }
    
    // package definition may occurs much later than module, so we check the existence when providing a module
    // if a package exists, and module file has not been loaded.
    // example:
    // before we load module 'fx/tween', we would check if package 'fx' had been defined
    // if had, loader will request fx.js first
    }else if(
        mod.npc && 
        (parent = getModuleByPath( getParentModulePath(mod.p) )) &&
        
        // prevent fake packages from being defined again
        parent.s < _STATUS.DD
    ){
        loadModuleSrc(parent, function(){
            provideOne(mod, callback, env);
            callback = null;
        });
    
    }else if(status < _STATUS.DD){
        loadModuleSrc(mod, function(){
            var last = _last_anonymous_mod;
            
            // CSS dependency
            if(mod.isCSS){
                mod.s = _STATUS.RD;
                delete mod.u;
            
            // Loading -> 2
            // handle with anonymous module define
            }else if(last && mod.s === _STATUS.LD){
                
                if(last.s < _STATUS.DD){
                    error(510);
                }
                
                K.mix(mod, last);
                _last_anonymous_mod = NULL;
                
                // when after loading a library module, 
                // and IE didn't fire onload event during the insertion of the script node
                tidyModuleData(mod);
            }
            
            provideOne(mod, callback, env);
        });
    }
};


/**
 * specify the environment for every id that required in the current module
 * including
 * - reference uri which will be set as the current module's uri 
 
 * @param {Object} envMod mod
 */
function createRequire(envMod){
    return function(id){
        var mod = getOrDefine(id, {
            u: envMod.u,
            ns: envMod.ns
        }, true);
        
        return mod.exports || generateExports(mod);
    };
};


/**
 * generate the exports if the module status is 'ready'
 */
function generateExports(mod){
    var exports = {},
        factory,
        ret;
        
    if(mod.s === STATUS.RD && K.isFunction(factory = mod.f) ){
    
        // to keep the object mod away from the executing context of factory,
        // use factory instead mod.f,
        // preventing user from fetching runtime data by 'this'
        ret = factory(K, createRequire(mod), exports);
        
        // exports:
        // TWO ways to define the exports of a module
        // 1. 
        // exports.method1 = method1;
        // exports.method2 = method2;
        
        // 2.
        // return {
        //        method1: method1,
        //        method2: method2
        // }
        
        // {2} has higher priority
        if(ret){
            exports = ret;
        }
        
        mod.exports = exports;
        tidyModuleData(mod);
    }
        
    return exports;
};


function tidyModuleData(mod){
    if(mod.exports){
        // free
        // however, to keep the code clean, 
        // tidy the data of a module at the final stage instead of at each intermediate process
        if(mod.deps){
            mod.deps.length = 0;
            delete mod.deps;
        }
        
        delete mod.f;
        delete mod.u;
        delete mod.s;
        delete mod.ns;        
        delete mod.npc;
        delete mod.p;
        // delete mod.i;
    }
    
    return mod;
};


/**
 * load a script and remove script node after loaded
 * @param {string} uri
 * @param {function()} callback
 * @param {!string.<'css', 'js'>} type the type of the source to load
 */
function loadScript(uri, callback, type){
    var node,
        cb = type === 'css' ? callback : function(){
        
            // execute the callback before tidy the script node
            callback.call(node);
    
            if(!isDebugMode()){
                try {
                    if(node.clearAttributes) {
                        node.clearAttributes();
                    }else{
                        for(var p in node){
                            delete node[p];
                        }
                    }
                } catch (e) {}
                
                HEAD.removeChild(node);
            }
            node = NULL;
        };
    
    node = asset[ type ](uri, cb);
};


/**
 * load the module's resource file
 * always load a script file no more than once
 */
function loadModuleSrc(mod, callback){
    var uri = mod.u,
        script = _script_map[uri],
        LOADED = 1;
        
    if (!script) {
        script = _script_map[uri] = [callback];
        mod.s = STATUS.LD;
        
        loadScript(uri, function(){
            var m = mod;
                
            for_each(script, function(s){
                s.call(m);
            });
            
            // TODO:
            // test
            // _script_map[uri] = LOADED;
            
            // the logic of loader ensures that, once a uri completes loading, it will never be requested 
            // delete _script_map[uri];
        }, mod.isCSS ? 'css' : 'js');
        
    } else {
        script.push(callback);
    }    
};


/**
 * module tools
 * --------------------------------------------------------------------------------------------------- */

/**
 * @param {string} name
 * @param {string=} referenceURI
 * @param {string=} base default to libBase
 * @return {string} module uri (exclude server)
 */
function moduleNameToURI(name, referenceURI, base){
    var no_need_extension = REGEX_NO_NEED_EXTENSION.test(name);
    return applyRelativeURI(name + (no_need_extension ? '' : '.js'), referenceURI, base);
};


/**
 * generate the path of a module, the path will be the identifier to determine whether a module is loaded or defined
 * @param {string} uri the absolute uri of a module. no error detection
 */
var generateModulePathAndURL = K._memoize( function(uri){
    var 
    
    cfg = _config,
    
    url = isAbsoluteURI(uri) ?
        
        // url -> 'http://i1.dpfile.com/lib/io/ajax.js'
        uri
        
        // convert loader path (exclude server) to absolute url
        // url -> '/lib/io/ajax.js'
      : cfg.CDNHasher(uri, uri.indexOf(cfg.libBase) !== -1) + uri;

    return {
        p: cfg.santitizer(getLocation(url).pathname),
        u: url
    };
});


function getParentModulePath(identifier){
    var m = identifier.match(REGEX_DIR_MATCHER);
    
    return m ? m[0] + '.js' : false;
};


/**
 * get a module by id
 * @param {string=} version
 */
function getModuleByPath(path){
    return _mods[path];
};


function memoizeMod(path, mod){
    _mods[path] = mod;
};


function isCyclic(env, uri) {
    return uri && ( env.u === uri || env.p && isCyclic(env.p, uri) );
};


function getInteractiveScript() {
    var INTERACTIVE = 'interactive';

    if (interactive_script && interactive_script.readyState === INTERACTIVE) {
        return interactive_script;
    }
    
    // DP loader only insert scripts into head
    var scripts = HEAD.getElementsByTagName('script'),
        script,
        i = 0,
        len = scripts.length;
    
    for (; i < len; i++) {
        script = scripts[i];
            if (script.readyState === INTERACTIVE) {
            return interactive_script = script;
        }
    }
    
    return NULL;
};


function isDebugMode(){
    return K._env.debug;
};


/**
 * data santitizer
 * --------------------------------------------------------------------------------------------------- */

/**
 * the reference uri for a certain module is the module's uri
 * @param {string=} referenceURI
 * @param {string=} base default to libBase
 */
function applyRelativeURI(uri, referenceURI, base){
    var ret;
    
    base || (base = _config.libBase);
    referenceURI || (referenceURI = base);
    
    // absolute uri
    if (isAbsoluteURI(uri)) {
        ret = uri;
        
    // relative uri
    }else if (isRelativeURI(uri)) {
        ret = realpath(getDir(referenceURI) + uri);
    
    // root uri
    // never use it
    // }else if (uri.indexOf('/') === 0) {
        // for inner use, referenceURI is always a absolute uri
        // so we can get its host
        // ret = getHost(referenceURI) + uri;
        
    /**
     * Neuron Loader will never apply the root base of current location.href to current modules
     * module base must be configured
     */
    }else {
        ret = base + uri.replace(/^\/+/, '');
    }
    
    return ret;
};


function isAbsoluteURI(uri){
    return uri && uri.indexOf('://') !== -1;
};


function isRelativeURI(uri){
    return uri.indexOf('./') === 0 || uri.indexOf('../') === 0;
};


/**
 * Canonicalize path.
 
 * realpath('a/b/c') ==> 'a/b/c'
 * realpath('a/b/../c') ==> 'a/c'
 * realpath('a/b/./c') ==> '/a/b/c'
 * realpath('a/b/c/') ==> 'a/b/c/'
 * #X realpath('a//b/c') ==> 'a/b/c' ?
 * realpath('a//b/c') ==> 'a//b/c'   - for 'a//b/c' is a valid uri
     -> http://jsperf.com/memoize
 */
function realpath(path) {
    var old = path.split('/'),
        ret = [];
        
    for_each(old, function(part, i){
        if (part === '..') {
            if (ret.length === 0) {
                  error(530);
            }
            ret.pop();
            
        } else if (part !== '.') {
            ret.push(part);
        }
    });
    
    return ret.join('/');
};


/*
var REGEX_FACTORY_DEPS_PARSER =  /\brequire\b\s*\(\s*['"]([^'"]*)/g;


// parse dependencies from a factory function
function parseDependencies(factory){
    return parseAllSubMatches(removeComments(String(factory)), REGEX_FACTORY_DEPS_PARSER);
};


// simply remove comments from the factory function
// http://is.gd/qEf8pH
function removeComments(code){
    return code
        .replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n')
        .replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '\n');
};
*/


/**
 * get the current directory from the location
 *
 * http://jsperf.com/regex-vs-split/2
 * vs: http://jsperf.com/regex-vs-split
 */
function getDir(uri){
    var m = uri.match(REGEX_DIR_MATCHER); // greedy match
    return (m ? m[0] : '.') + '/';
};


/**
 * @lang
 * ---------------------------------------------------------------------------------- */

function for_each(arr, fn){
    var i = 0,
        len = arr.length;
        
    for(; i < len; i ++){
        fn.call(arr, arr[i], i, arr);
    }
};


/**
 * @public
 * ---------------------------------------------------------------------------------- */

K.mix(define, {
    'on': function(){
        _define_buffer_on = true;
    },
    
    'off': function(){
        _define_buffer_on = false;
    },
    
    '__mods': _mods
});


/**
 * Configure the prefix of modules
 * @param {string} name
 * @param {object} config {
         base: {string} if not empty, it should include a left slash and exclude the right slash
             
             '/lib';  // RIGHT!
             
             '/lib/'; // WRONG!
             'lib/';     // WRONG!
   }
 */
/*
function prefix(name, config){
    var map = _apps_map;

    if(!map[name]){
        map[name] = config;
        config.base = _config.base + config.base;
    }
};
*/


// use extend method to add public methods, 
// so that google closure will NOT minify Object properties

// define a module
K['define'] = define;

// attach a module
K['provide'] = provide;

// semi-private
// will be destroyed after configuration
K.__loader = Loader = {

    // no fault tolerance
    'config': function(cfg){
        cfg.libBase = '/' + cfg.libBase;
        cfg.appBase = '/' + cfg.appBase;
    
        _config = cfg;
        
        warning = cfg.warning;
        error = cfg.error;
        
        Loader['config'] = NOOP;
    }
};


})(DP, null);


/**
 change log:
 
 import ./ChangeLog.md;
 
 */
/**
 * @module  config
 * global configurations:
 * - loader config
 		- cdn
 		- santitizer
 		- module base
 		- warning config
 * - evironment config
 		- debug mode
 		X - global dom parser
 */
 

;(function(K){


function CDNHasher(evidence, isLibMod){
    var s = isLibMod ? server : appServer;

	return 'http://' + K.sub(s, {n: evidence.length % 3 + 1});
};


function santitizer(identifier){
	return identifier.replace(REGEX_PATH_CLEANER_MIN, '').replace(REGEX_PATH_CLEANER_MD5,'').replace(REGEX_PATH_CLEANER_VERSION, '');
};


function getConfig(key, config, extra){
    var ret = config[key];
    delete config[key];
    
    return ret && ret + extra;
};

function loaderError(message){
	throw {
		message:	message,
		toString:	function(){
			return 'DP Loader: ' + message;
		}
	};
};


var

REGEX_PATH_CLEANER_MIN      = /\.min/i,
REGEX_PATH_CLEANER_MD5      = /\.[a-z0-9]{32}/i,
REGEX_PATH_CLEANER_VERSION  = /\.v(?:\d+\.)*\d+/i,

STR_LOADER  = '__loader',
STR_PROVIDE = 'provide',

NOOP        = function(){},

Loader      = K[STR_LOADER],
provide     = K[STR_PROVIDE],

// prefix = Loader.prefix,

pendingQueue    = [],

host            = K.__HOST,

__config        = host.__loaderConfig || {},

serverRoot      = '';

if(serverRoot){
    serverRoot = '/' + serverRoot.replace(/\/$/, '');
}


var

server          = getConfig('server', __config, serverRoot),
appServer       = getConfig('appServer', __config, '') || server,

config          = K.mix({
	// root path of module files
	libBase: 'lib/',
	appBase: 's/j/app/',
	
	// @return: the domain of either cdn server
	CDNHasher:	CDNHasher,
	santitizer: santitizer,
	
	warning: host.console && console.warn ?
		function(msg){
			console.warn('DP Loader: ' + msg);
		}
		: NOOP,
	
	/**
	 * custom error type
	 * @constructor
	 */
	error: loaderError
	
}, __config);


if(config.libBase === config.appBase){
    loaderError('libBase same as appBase, which is forbidden');
}


Loader.config(config);


/**
 * before module-version.js is downloaded and executed,
 * DP.provide temporarily does nothing but push the action into a pending queue
 */
K.provide = function(){
	pendingQueue.push(arguments);
};

/**
 * Loader.init will be called at the end of module-version.js
 */
Loader.init = function(){
	var _provide = provide;

	K[STR_PROVIDE] = _provide;
	
	pendingQueue.forEach(function(args){
		_provide.apply(null, args);
	});
	
	delete K[STR_LOADER];
};


})(DP);
/**
 * module  biz
 * method for business requirement
 */

;(function(K){

// --- method for DP.data ----------------------- *\
function setData(data){
	data && K.mix(stored_data, data);
};

function cloneData(){
	return K.clone(stored_data);
};

function getData(name){
	return stored_data[name];
};
// --- /method for DP.data ----------------------- *\


	// @type {Object}
var stored_data = {},
	undef;


/**
 * module  data

 * setter
 * getter

 * usage:
 * 1. DP.data()                     returns the shadow copy of the current data stack
 * 2. DP.data('abc')                returns the data named 'abc'
 * 3. DP.data('abc', 123)           set the value of 'abc' as 123
 * 4. DP.data({abc: 123, edf:456})  batch setter
 *
 * @param {all=} value 
 */
K.data = function(name, value){
	var type = K._type(name),
		empty_obj = {},
		is_getter, ret;
	
	if(name === undef){
		ret = cloneData(); // get: return shadow copy
		is_getter = true;

	}else if(type === 'string'){
		if(value === undef){
			ret = getData(name); // get: return the value of name
			is_getter = true;
		}else{
			empty_obj[name] = value;
			setData(empty_obj) // set
		}

	}else if(type === 'object'){
		setData(name); // set
	}

	return is_getter ? ret : K;
};


/**
 * attach a module for business requirement, for configurations of inline scripts
 * if wanna a certain biz module to automatically initialized, the module's exports should contain a method named 'init'
 */
K.require = function(){
	var isString = K.isString;
	
	K.makeArray(arguments).forEach(function(module){
		if(isString(module)){
			module = {
				mod: module
			};
		}
		
		K.provide(module.mod, function(K, method){
			method.init && method.init(module.config);
		});
	});
};


})(DP);


/**
 change log:
 
 2012-02-08  Kael:
 - use DP.require instead of DP.bizRequire, and no longer initialize modules after DOMReady by default. 
 	Modules loaded by DP.require should manage DOMReady by their own if necessary.
 
 2011-10-13  Kael:
 - move DP.data to biz.js
 - add DP.bizRequire method to automatically provide a batch of specified modules
 
 TODO:
 A. add a method to fake a global function to put its invocations into a queue until the real implementation attached
 
 */
﻿

// Hippo: DianPing Analysis

;(function (HIPPO_HOST_KEY, UNDEF) {

var

win = window,
doc = win.document,
loc = doc.location,
ref = doc.referrer,
screen = win.screen,

// default params
_pageId     = 0,
_shopType   = 0,
_cityId     = 0,
_domain     = 'www.dianping.com',

data_attached = {},

// @const
NOOP = function(){},

URL_BASE = 'http://hls.' + ( /51ping/.test(doc.domain) ? '51ping' : 'dianping' ) + '.com/hippo.gif?',

NET_SPEED_SAMPLE_RATE   = .5,

SCREEN_SIZE_KEY         = '__hsr',
SCREEN_COLOR_DEPTH_KEY  = '__hsc',
LOCATION_HREF_KEY       = '__hlh',
LOCATION_REFERRER_KEY   = '__hlr',
PAGE_TRACK_KEY          = '__pv',
MODULE_TRACK_KEY        = '__mv';


////////////////////////////////////////////////////////////////////////////
// lang
////////////////////////////////////////////////////////////////////////////

var


// method to stringify an object
// optimized for v8
// @param {Object} obj the object to be stringified
// @returns {string}
stringify = (function () {
    var stringify = window.JSON && JSON.stringify;
    
    return stringify ? stringify : function (obj) {
        var ret = [],
            key,
            value;

        for (key in obj) {
            value = obj[key];
        
            if(Object(value) !== value){
                ret.push( '"' + key + '":"' + ("" + value).replace(/"/g, '\\"') + '"' );
            }
        }

        return '{' + ret.join(',') + '}';
    }
})(),

AP = Array.prototype;


if(!AP.forEach){
    AP.forEach = function(fn, this_object){
        for (var i = 0, len = this.length; i < len; i++){
            if (i in this){
            
                // if fn is not callable, it will throw
                fn.call(this_object, this[i], i, this);
            }
        }
    };
}


function toQueryString(obj){
    var encode = encodeURIComponent,
        key,
        value,
        ret = [];
        
    for(key in obj){
        value = obj[key];
    
        if(Object(value) !== value){
        
            // {
            //    key1: undefined,
            //    key2: "a"
            // }
            // -> key1=&key2=a
            ret.push( key + '=' + encode(value || '') );
        }
    }
    
    return ret.join('&');
};

function mix(r, s){
    var key;

    for(key in s){
        r[key] = s[key];
    }
    
    return r;
};

function chk(key, value) {
    return typeof key === 'string' && Object(value) !== value;
};


////////////////////////////////////////////////////////////////////////////
// Hippo methods
////////////////////////////////////////////////////////////////////////////

// send a hippo request
// @param {string} key
// @param {Array.<string>} value
// @param {object} data
function send(key, value, data) {
    var query = generateQuery(key, value, data);
    
    new Image(1, 1).src = URL_BASE + query;
};


var


// 生成hippo专用的query string
// @private
generateQuery = (function () {

    // 有些内容是单次会话保持不变的，先计算出来
    var h, w, s, c, f,
        presets = {};
    
    if(loc && loc.href){
        presets[LOCATION_HREF_KEY] = loc.href;
    }
    
    if(ref){
        presets[LOCATION_REFERRER_KEY] = ref;
    }

    if (s = screen) {
        h = s.height;
        w = s.width;
        
        if (h && w) {
            presets[SCREEN_SIZE_KEY] = w + 'x' + h;
        }
        
        if (c = s.colorDepth) {
            presets[SCREEN_COLOR_DEPTH_KEY] = c + 'bit';
        }
    }

    // @param {string} key
    // @param {Array.<mixed>} value
    // @param {Object=} data
    return function(key, value, data){
        var 
        
        current = {
            '__hlt': _domain,
            '__ppp': _pageId,
            '__had': stringify(data || {}),
            'force': + new Date
        };
        
        value.push(_cityId + '|' + _shopType);

        current[key] = value.join('|');
        
        return toQueryString(mix(current, presets));
    };
    
})();


////////////////////////////////////////////////////////////////////////////
// old Hippo for legacy
////////////////////////////////////////////////////////////////////////////

// @param {number} page id of current page
// @param {string=} z base url of site
function document_hippo(pageId, domain){
    HIPPO_METHODS._setPageId(pageId);
    // HIPPO_METHODS._setDomain(domain);
    
    return document_hippo;
};


mix(document_hippo, {

    // extensive parameters for next hippo request
    // @param {string||Object} name
    // @param {mixed=} value
    ext: function (name, value) {
        var key;
    
        if (Object(name) === name) {
            for (key in name) {
                document_hippo.ext(key, name[key]);
            }

        }else if(chk(name, value)) {
            data_attached[name] = value;
        }
        
        return document_hippo;
    },
    
    // remove data that be setted by ext method
    // @param {string=} name if no name passed in, hippo will remove all relative data
    rxt: function (name) {
        if (typeof name === 'string') {
            delete data_attached[name];
            
        } else if (!arguments.length) {
            data_attached = {};
        }
        
        return document_hippo;
    },
    
    
    // send a page-view request
    // @param {number} cityId
    // @param {number=} shopType
    pv: function (cityId, shopType) {
        HIPPO_METHODS._setCityId(cityId);
        HIPPO_METHODS._setShopType(shopType);
        HIPPO_METHODS._setPVInitData(data_attached);
        data_attached = {};
        
        return document_hippo;
    },
    
    // send a module-view request
    // @param moduleId{Number}
    // @param value{*}
    mv: function (moduleId, value) {
    
        if (chk(moduleId, value)) {
            data_attached[moduleId] = value;
            
            HIPPO_METHODS.mv(data_attached);
            data_attached = {};
        }
        
        return document_hippo;
    }
});

// for backward compatibility
document.hippo = document_hippo;


////////////////////////////////////////////////////////////////////////////
// new Hippo
////////////////////////////////////////////////////////////////////////////

var

Hippo = win[HIPPO_HOST_KEY];

if(Hippo){

    // if new hippo(`_hip`) exists, push `'_setPVInitData'` to make sure there is a pv request
    Hippo.push(['_setPVInitData']);
    
}else{
    Hippo = win[HIPPO_HOST_KEY] = [];
}


var

HIPPO_METHODS = {
    _setPageId: function(pageId){
        _pageId = pageId >>> 0;
    },
    
    _setCityId: function(cityId){
        _cityId = cityId >>> 0;
    },

    _setShopType: function (shopType){
        _shopType = shopType >>> 0;
    },
    
    // _setDomain: function (domain){
    //    if(domain){
    //        _domain = domain;
    //    }
    // },
    
    _setPVInitData: function(data){
        send(PAGE_TRACK_KEY, [], data);
    },
    
    mv: function(data){
        send(
            MODULE_TRACK_KEY,
            ['', ''],
            data
        );
    }
};

Hippo.push = function(command){
    var action, data, method;

    if(command){
        action = command[0];
        data = command[1];
        method = HIPPO_METHODS[action];
        
        method && method(data);
    }
};


['_setPageId', '_setCityId', '_setShopType', /* '_setDomain',  */'_setPVInitData'].forEach(function(name){
    var method = HIPPO_METHODS[name];
    
    HIPPO_METHODS[name] = function(){
        method.apply(this, arguments);
        HIPPO_METHODS[name] = NOOP;
    };
});


// apply 
Hippo.forEach(function(command){
    Hippo.push(command);
});


Hippo.length = 0;

if(Math.random() > NET_SPEED_SAMPLE_RATE){
    return;
}

// pagetiming

var render_start = win.G_rtop, domready_time, neuron_win = DP.DOM(win);

function onDomReady(){
    domready_time = + new Date; 
};

function onLoad(){
    var
    
    version,
    perf = win.performance,
    t = perf && perf.timing,
    
    r_ready = domready_time - render_start,
    r_load = + new Date - render_start,
    
    data = {
        r_pagetiming: 1,
        r_ready: r_ready,
        r_load: r_load
    };
    
    if(t){
        mix(data, {
            r_conn     : t.connectEnd - t.connectStart,
            r_recev    : t.responseEnd - t.responseStart,
            r_ready    : t.domInteractive - t.domLoading || r_ready,
            r_wait     : t.responseStart - t.requestStart,
            r_load     : t.loadEventStart - t.domLoading || r_load
        });
    }
    
    if(window.DP && (version = DP.data('hippo_perf_version') ) ){
        data['test'] = version
    }
    
    HIPPO_METHODS.mv(data);
    
    neuron_win.off('load', onLoad);
};

DP.ready(onDomReady);

// for those pages without mootools, skip pagetiming
neuron_win.on('load', onLoad);

})('_hip');

/**
 * Change Logs
 * -2012/06/08 by xuwei.chen
 *            1 - 测速样本率控制
 *            2 - push方法实现
 *            3 - 测速方法实现
 * -2012/07/02 by xuwei.chen
 * -add timing performance(waiting, rececive, connecting),
 * -adjust loaded&domready time
 */
/**
 * clean unexpected public members, making them private.
 * after this, they could only be fetched by Neuron Loader
 */

// ;(function(K){

// var DOM = K.DOM;

// remove public members
// delete K.DOM;
delete DP.__SELECTOR;
delete DP.__;
// delete DOM.methods;
// delete DOM.feature;


// remove Slick from window
// Slick is defined with 'this.Slick'
// so, it's removable and is not [DontDelete]

// IE6 - IE8 don't support delete a property of window, even if it's defined with this.MyNameSpace 
// try{
//	delete window.Slick;
// }catch(e){
//	K.log('del Slick err');
// }


// })(DP);

/**
 change log:
 
 2011-09-08  Kael:
 - renaming the module name as dom, making it a fake package module
 
 */