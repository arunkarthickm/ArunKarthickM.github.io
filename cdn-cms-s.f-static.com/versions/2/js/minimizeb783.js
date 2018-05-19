/*!
* jQuery JavaScript Library v1.11.2
* http://jquery.com/
*
* Includes Sizzle.js
* http://sizzlejs.com/
*
* Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
* Released under the MIT license
* http://jquery.org/license
*
* Date: 2014-12-17T15:27Z
*/
(function( global, factory ) {
if ( typeof module === "object" && typeof module.exports === "object" ) {
module.exports = global.document ?
factory( global, true ) :
function( w ) {
if ( !w.document ) {
throw new Error( "jQuery requires a window with a document" );
}
return factory( w );
};
} else {
factory( global );
}
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
var deletedIds = [];
var slice = deletedIds.slice;
var concat = deletedIds.concat;
var push = deletedIds.push;
var indexOf = deletedIds.indexOf;
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var support = {};
var
version = "1.11.2",
jQuery = function( selector, context ) {
return new jQuery.fn.init( selector, context );
},
rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
rmsPrefix = /^-ms-/,
rdashAlpha = /-([\da-z])/gi,
fcamelCase = function( all, letter ) {
return letter.toUpperCase();
};
jQuery.fn = jQuery.prototype = {
jquery: version,
constructor: jQuery,
selector: "",
length: 0,
toArray: function() {
return slice.call( this );
},
get: function( num ) {
return num != null ?
( num < 0 ? this[ num + this.length ] : this[ num ] ) :
slice.call( this );
},
pushStack: function( elems ) {
var ret = jQuery.merge( this.constructor(), elems );
ret.prevObject = this;
ret.context = this.context;
return ret;
},
each: function( callback, args ) {
return jQuery.each( this, callback, args );
},
map: function( callback ) {
return this.pushStack( jQuery.map(this, function( elem, i ) {
return callback.call( elem, i, elem );
}));
},
slice: function() {
return this.pushStack( slice.apply( this, arguments ) );
},
first: function() {
return this.eq( 0 );
},
last: function() {
return this.eq( -1 );
},
eq: function( i ) {
var len = this.length,
j = +i + ( i < 0 ? len : 0 );
return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
},
end: function() {
return this.prevObject || this.constructor(null);
},
push: push,
sort: deletedIds.sort,
splice: deletedIds.splice
};
jQuery.extend = jQuery.fn.extend = function() {
var src, copyIsArray, copy, name, options, clone,
target = arguments[0] || {},
i = 1,
length = arguments.length,
deep = false;
if ( typeof target === "boolean" ) {
deep = target;
target = arguments[ i ] || {};
i++;
}
if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
target = {};
}
if ( i === length ) {
target = this;
i--;
}
for ( ; i < length; i++ ) {
if ( (options = arguments[ i ]) != null ) {
for ( name in options ) {
src = target[ name ];
copy = options[ name ];
if ( target === copy ) {
continue;
}
if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
if ( copyIsArray ) {
copyIsArray = false;
clone = src && jQuery.isArray(src) ? src : [];
} else {
clone = src && jQuery.isPlainObject(src) ? src : {};
}
target[ name ] = jQuery.extend( deep, clone, copy );
} else if ( copy !== undefined ) {
target[ name ] = copy;
}
}
}
}
return target;
};
jQuery.extend({
expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
isReady: true,
error: function( msg ) {
throw new Error( msg );
},
noop: function() {},
isFunction: function( obj ) {
return jQuery.type(obj) === "function";
},
isArray: Array.isArray || function( obj ) {
return jQuery.type(obj) === "array";
},
isWindow: function( obj ) {
/* jshint eqeqeq: false */
return obj != null && obj == obj.window;
},
isNumeric: function( obj ) {
return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
},
isEmptyObject: function( obj ) {
var name;
for ( name in obj ) {
return false;
}
return true;
},
isPlainObject: function( obj ) {
var key;
if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
return false;
}
try {
if ( obj.constructor &&
!hasOwn.call(obj, "constructor") &&
!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
return false;
}
} catch ( e ) {
return false;
}
if ( support.ownLast ) {
for ( key in obj ) {
return hasOwn.call( obj, key );
}
}
for ( key in obj ) {}
return key === undefined || hasOwn.call( obj, key );
},
type: function( obj ) {
if ( obj == null ) {
return obj + "";
}
return typeof obj === "object" || typeof obj === "function" ?
class2type[ toString.call(obj) ] || "object" :
typeof obj;
},
globalEval: function( data ) {
if ( data && jQuery.trim( data ) ) {
( window.execScript || function( data ) {
window[ "eval" ].call( window, data );
} )( data );
}
},
camelCase: function( string ) {
return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
},
nodeName: function( elem, name ) {
return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
},
each: function( obj, callback, args ) {
var value,
i = 0,
length = obj.length,
isArray = isArraylike( obj );
if ( args ) {
if ( isArray ) {
for ( ; i < length; i++ ) {
value = callback.apply( obj[ i ], args );
if ( value === false ) {
break;
}
}
} else {
for ( i in obj ) {
value = callback.apply( obj[ i ], args );
if ( value === false ) {
break;
}
}
}
} else {
if ( isArray ) {
for ( ; i < length; i++ ) {
value = callback.call( obj[ i ], i, obj[ i ] );
if ( value === false ) {
break;
}
}
} else {
for ( i in obj ) {
value = callback.call( obj[ i ], i, obj[ i ] );
if ( value === false ) {
break;
}
}
}
}
return obj;
},
trim: function( text ) {
return text == null ?
"" :
( text + "" ).replace( rtrim, "" );
},
makeArray: function( arr, results ) {
var ret = results || [];
if ( arr != null ) {
if ( isArraylike( Object(arr) ) ) {
jQuery.merge( ret,
typeof arr === "string" ?
[ arr ] : arr
);
} else {
push.call( ret, arr );
}
}
return ret;
},
inArray: function( elem, arr, i ) {
var len;
if ( arr ) {
if ( indexOf ) {
return indexOf.call( arr, elem, i );
}
len = arr.length;
i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
for ( ; i < len; i++ ) {
if ( i in arr && arr[ i ] === elem ) {
return i;
}
}
}
return -1;
},
merge: function( first, second ) {
var len = +second.length,
j = 0,
i = first.length;
while ( j < len ) {
first[ i++ ] = second[ j++ ];
}
if ( len !== len ) {
while ( second[j] !== undefined ) {
first[ i++ ] = second[ j++ ];
}
}
first.length = i;
return first;
},
grep: function( elems, callback, invert ) {
var callbackInverse,
matches = [],
i = 0,
length = elems.length,
callbackExpect = !invert;
for ( ; i < length; i++ ) {
callbackInverse = !callback( elems[ i ], i );
if ( callbackInverse !== callbackExpect ) {
matches.push( elems[ i ] );
}
}
return matches;
},
map: function( elems, callback, arg ) {
var value,
i = 0,
length = elems.length,
isArray = isArraylike( elems ),
ret = [];
if ( isArray ) {
for ( ; i < length; i++ ) {
value = callback( elems[ i ], i, arg );
if ( value != null ) {
ret.push( value );
}
}
} else {
for ( i in elems ) {
value = callback( elems[ i ], i, arg );
if ( value != null ) {
ret.push( value );
}
}
}
return concat.apply( [], ret );
},
guid: 1,
proxy: function( fn, context ) {
var args, proxy, tmp;
if ( typeof context === "string" ) {
tmp = fn[ context ];
context = fn;
fn = tmp;
}
if ( !jQuery.isFunction( fn ) ) {
return undefined;
}
args = slice.call( arguments, 2 );
proxy = function() {
return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
};
proxy.guid = fn.guid = fn.guid || jQuery.guid++;
return proxy;
},
now: function() {
return +( new Date() );
},
support: support
});
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
function isArraylike( obj ) {
var length = obj.length,
type = jQuery.type( obj );
if ( type === "function" || jQuery.isWindow( obj ) ) {
return false;
}
if ( obj.nodeType === 1 && length ) {
return true;
}
return type === "array" || length === 0 ||
typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
* Sizzle CSS Selector Engine v2.2.0-pre
* http://sizzlejs.com/
*
* Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
* Released under the MIT license
* http://jquery.org/license
*
* Date: 2014-12-16
*/
(function( window ) {
var i,
support,
Expr,
getText,
isXML,
tokenize,
compile,
select,
outermostContext,
sortInput,
hasDuplicate,
setDocument,
document,
docElem,
documentIsHTML,
rbuggyQSA,
rbuggyMatches,
matches,
contains,
expando = "sizzle" + 1 * new Date(),
preferredDoc = window.document,
dirruns = 0,
done = 0,
classCache = createCache(),
tokenCache = createCache(),
compilerCache = createCache(),
sortOrder = function( a, b ) {
if ( a === b ) {
hasDuplicate = true;
}
return 0;
},
MAX_NEGATIVE = 1 << 31,
hasOwn = ({}).hasOwnProperty,
arr = [],
pop = arr.pop,
push_native = arr.push,
push = arr.push,
slice = arr.slice,
indexOf = function( list, elem ) {
var i = 0,
len = list.length;
for ( ; i < len; i++ ) {
if ( list[i] === elem ) {
return i;
}
}
return -1;
},
booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
whitespace = "[\\x20\\t\\r\\n\\f]",
characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
identifier = characterEncoding.replace( "w", "w#" ),
attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
"*([*^$|!~]?=)" + whitespace +
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
"*\\]",
pseudos = ":(" + characterEncoding + ")(?:\\((" +
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
".*" +
")\\)|)",
rwhitespace = new RegExp( whitespace + "+", "g" ),
rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
rpseudo = new RegExp( pseudos ),
ridentifier = new RegExp( "^" + identifier + "$" ),
matchExpr = {
"ID": new RegExp( "^#(" + characterEncoding + ")" ),
"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
"ATTR": new RegExp( "^" + attributes ),
"PSEUDO": new RegExp( "^" + pseudos ),
"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
},
rinputs = /^(?:input|select|textarea|button)$/i,
rheader = /^h\d$/i,
rnative = /^[^{]+\{\s*\[native \w/,
rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
rsibling = /[+~]/,
rescape = /'|\\/g,
runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
funescape = function( _, escaped, escapedWhitespace ) {
var high = "0x" + escaped - 0x10000;
return high !== high || escapedWhitespace ?
escaped :
high < 0 ?
String.fromCharCode( high + 0x10000 ) :
String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
},
unloadHandler = function() {
setDocument();
};
try {
push.apply(
(arr = slice.call( preferredDoc.childNodes )),
preferredDoc.childNodes
);
arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
push = { apply: arr.length ?
function( target, els ) {
push_native.apply( target, slice.call(els) );
} :
function( target, els ) {
var j = target.length,
i = 0;
while ( (target[j++] = els[i++]) ) {}
target.length = j - 1;
}
};
}
function Sizzle( selector, context, results, seed ) {
var match, elem, m, nodeType,
i, groups, old, nid, newContext, newSelector;
try {
if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
setDocument( context );
}
} catch (e) { }
context = context || document;
results = results || [];
try {
nodeType = context.nodeType;
} catch (e) { }
if ( typeof selector !== "string" || !selector ||
nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
return results;
}
if ( !seed && documentIsHTML ) {
if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
if ( (m = match[1]) ) {
if ( nodeType === 9 ) {
elem = context.getElementById( m );
if ( elem && elem.parentNode ) {
if ( elem.id === m ) {
results.push( elem );
return results;
}
} else {
return results;
}
} else {
if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
contains( context, elem ) && elem.id === m ) {
results.push( elem );
return results;
}
}
} else if ( match[2] ) {
push.apply( results, context.getElementsByTagName( selector ) );
return results;
} else if ( (m = match[3]) && support.getElementsByClassName ) {
push.apply( results, context.getElementsByClassName( m ) );
return results;
}
}
if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
nid = old = expando;
newContext = context;
newSelector = nodeType !== 1 && selector;
if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
groups = tokenize( selector );
if ( (old = context.getAttribute("id")) ) {
nid = old.replace( rescape, "\\$&" );
} else {
context.setAttribute( "id", nid );
}
nid = "[id='" + nid + "'] ";
i = groups.length;
while ( i-- ) {
groups[i] = nid + toSelector( groups[i] );
}
newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
newSelector = groups.join(",");
}
if ( newSelector ) {
try {
push.apply( results,
newContext.querySelectorAll( newSelector )
);
return results;
} catch(qsaError) {
} finally {
if ( !old ) {
context.removeAttribute("id");
}
}
}
}
}
return select( selector.replace( rtrim, "$1" ), context, results, seed );
}
/**
* Create key-value caches of limited size
* @returns {Function(string, Object)} Returns the Object data after storing it on itself with
*	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
*	deleting the oldest entry
*/
function createCache() {
var keys = [];
function cache( key, value ) {
if ( keys.push( key + " " ) > Expr.cacheLength ) {
delete cache[ keys.shift() ];
}
return (cache[ key + " " ] = value);
}
return cache;
}
/**
* Mark a function for special use by Sizzle
* @param {Function} fn The function to mark
*/
function markFunction( fn ) {
fn[ expando ] = true;
return fn;
}
/**
* Support testing using an element
* @param {Function} fn Passed the created div and expects a boolean result
*/
function assert( fn ) {
var div = document.createElement("div");
try {
return !!fn( div );
} catch (e) {
return false;
} finally {
if ( div.parentNode ) {
div.parentNode.removeChild( div );
}
div = null;
}
}
/**
* Adds the same handler for all of the specified attrs
* @param {String} attrs Pipe-separated list of attributes
* @param {Function} handler The method that will be applied
*/
function addHandle( attrs, handler ) {
var arr = attrs.split("|"),
i = attrs.length;
while ( i-- ) {
Expr.attrHandle[ arr[i] ] = handler;
}
}
/**
* Checks document order of two siblings
* @param {Element} a
* @param {Element} b
* @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
*/
function siblingCheck( a, b ) {
var cur = b && a,
diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
( ~b.sourceIndex || MAX_NEGATIVE ) -
( ~a.sourceIndex || MAX_NEGATIVE );
if ( diff ) {
return diff;
}
if ( cur ) {
while ( (cur = cur.nextSibling) ) {
if ( cur === b ) {
return -1;
}
}
}
return a ? 1 : -1;
}
/**
* Returns a function to use in pseudos for input types
* @param {String} type
*/
function createInputPseudo( type ) {
return function( elem ) {
var name = elem.nodeName.toLowerCase();
return name === "input" && elem.type === type;
};
}
/**
* Returns a function to use in pseudos for buttons
* @param {String} type
*/
function createButtonPseudo( type ) {
return function( elem ) {
var name = elem.nodeName.toLowerCase();
return (name === "input" || name === "button") && elem.type === type;
};
}
/**
* Returns a function to use in pseudos for positionals
* @param {Function} fn
*/
function createPositionalPseudo( fn ) {
return markFunction(function( argument ) {
argument = +argument;
return markFunction(function( seed, matches ) {
var j,
matchIndexes = fn( [], seed.length, argument ),
i = matchIndexes.length;
while ( i-- ) {
if ( seed[ (j = matchIndexes[i]) ] ) {
seed[j] = !(matches[j] = seed[j]);
}
}
});
});
}
/**
* Checks a node for validity as a Sizzle context
* @param {Element|Object=} context
* @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
*/
function testContext( context ) {
return context && typeof context.getElementsByTagName !== "undefined" && context;
}
support = Sizzle.support = {};
/**
* Detects XML nodes
* @param {Element|Object} elem An element or a document
* @returns {Boolean} True iff elem is a non-HTML XML node
*/
isXML = Sizzle.isXML = function( elem ) {
var documentElement = elem && (elem.ownerDocument || elem).documentElement;
return documentElement ? documentElement.nodeName !== "HTML" : false;
};
/**
* Sets document-related variables once based on the current document
* @param {Element|Object} [doc] An element or document object to use to set the document
* @returns {Object} Returns the current document
*/
setDocument = Sizzle.setDocument = function( node ) {
var hasCompare, parent,
doc = node ? node.ownerDocument || node : preferredDoc;
try {
if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
return document;
}
} catch (e) { }
document = doc;
docElem = doc.documentElement;
parent = doc.defaultView;
if ( parent && parent !== parent.top ) {
if ( parent.addEventListener ) {
parent.addEventListener( "unload", unloadHandler, false );
} else if ( parent.attachEvent ) {
parent.attachEvent( "onunload", unloadHandler );
}
}
/* Support tests
---------------------------------------------------------------------- */
documentIsHTML = !isXML( doc );
/* Attributes
---------------------------------------------------------------------- */
support.attributes = assert(function( div ) {
div.className = "i";
return !div.getAttribute("className");
});
/* getElement(s)By*
---------------------------------------------------------------------- */
support.getElementsByTagName = assert(function( div ) {
div.appendChild( doc.createComment("") );
return !div.getElementsByTagName("*").length;
});
support.getElementsByClassName = rnative.test( doc.getElementsByClassName );
support.getById = assert(function( div ) {
docElem.appendChild( div ).id = expando;
return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
});
if ( support.getById ) {
Expr.find["ID"] = function( id, context ) {
if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
var m = context.getElementById( id );
return m && m.parentNode ? [ m ] : [];
}
};
Expr.filter["ID"] = function( id ) {
var attrId = id.replace( runescape, funescape );
return function( elem ) {
return elem.getAttribute("id") === attrId;
};
};
} else {
delete Expr.find["ID"];
Expr.filter["ID"] =  function( id ) {
var attrId = id.replace( runescape, funescape );
return function( elem ) {
var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
return node && node.value === attrId;
};
};
}
Expr.find["TAG"] = support.getElementsByTagName ?
function( tag, context ) {
if ( typeof context.getElementsByTagName !== "undefined" ) {
return context.getElementsByTagName( tag );
} else if ( support.qsa ) {
return context.querySelectorAll( tag );
}
} :
function( tag, context ) {
var elem,
tmp = [],
i = 0,
results = context.getElementsByTagName( tag );
if ( tag === "*" ) {
while ( (elem = results[i++]) ) {
if ( elem.nodeType === 1 ) {
tmp.push( elem );
}
}
return tmp;
}
return results;
};
Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
if ( documentIsHTML ) {
return context.getElementsByClassName( className );
}
};
/* QSA/matchesSelector
---------------------------------------------------------------------- */
rbuggyMatches = [];
rbuggyQSA = [];
if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
assert(function( div ) {
docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
"<select id='" + expando + "-\f]' msallowcapture=''>" +
"<option selected=''></option></select>";
if ( div.querySelectorAll("[msallowcapture^='']").length ) {
rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
}
if ( !div.querySelectorAll("[selected]").length ) {
rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
}
if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
rbuggyQSA.push("~=");
}
if ( !div.querySelectorAll(":checked").length ) {
rbuggyQSA.push(":checked");
}
if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
rbuggyQSA.push(".#.+[+~]");
}
});
assert(function( div ) {
var input = doc.createElement("input");
input.setAttribute( "type", "hidden" );
div.appendChild( input ).setAttribute( "name", "D" );
if ( div.querySelectorAll("[name=d]").length ) {
rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
}
if ( !div.querySelectorAll(":enabled").length ) {
rbuggyQSA.push( ":enabled", ":disabled" );
}
div.querySelectorAll("*,:x");
rbuggyQSA.push(",.*:");
});
}
if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
docElem.webkitMatchesSelector ||
docElem.mozMatchesSelector ||
docElem.oMatchesSelector ||
docElem.msMatchesSelector) )) ) {
assert(function( div ) {
support.disconnectedMatch = matches.call( div, "div" );
matches.call( div, "[s!='']:x" );
rbuggyMatches.push( "!=", pseudos );
});
}
rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
/* Contains
---------------------------------------------------------------------- */
hasCompare = rnative.test( docElem.compareDocumentPosition );
contains = hasCompare || rnative.test( docElem.contains ) ?
function( a, b ) {
var adown = a.nodeType === 9 ? a.documentElement : a,
bup = b && b.parentNode;
return a === bup || !!( bup && bup.nodeType === 1 && (
adown.contains ?
adown.contains( bup ) :
a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
));
} :
function( a, b ) {
if ( b ) {
while ( (b = b.parentNode) ) {
if ( b === a ) {
return true;
}
}
}
return false;
};
/* Sorting
---------------------------------------------------------------------- */
sortOrder = hasCompare ?
function( a, b ) {
if ( a === b ) {
hasDuplicate = true;
return 0;
}
var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
if ( compare ) {
return compare;
}
compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
a.compareDocumentPosition( b ) :
1;
if ( compare & 1 ||
(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
return -1;
}
if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
return 1;
}
return sortInput ?
( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
0;
}
return compare & 4 ? -1 : 1;
} :
function( a, b ) {
if ( a === b ) {
hasDuplicate = true;
return 0;
}
var cur,
i = 0,
aup = a.parentNode,
bup = b.parentNode,
ap = [ a ],
bp = [ b ];
if ( !aup || !bup ) {
return a === doc ? -1 :
b === doc ? 1 :
aup ? -1 :
bup ? 1 :
sortInput ?
( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
0;
} else if ( aup === bup ) {
return siblingCheck( a, b );
}
cur = a;
while ( (cur = cur.parentNode) ) {
ap.unshift( cur );
}
cur = b;
while ( (cur = cur.parentNode) ) {
bp.unshift( cur );
}
while ( ap[i] === bp[i] ) {
i++;
}
return i ?
siblingCheck( ap[i], bp[i] ) :
ap[i] === preferredDoc ? -1 :
bp[i] === preferredDoc ? 1 :
0;
};
return doc;
};
Sizzle.matches = function( expr, elements ) {
return Sizzle( expr, null, null, elements );
};
Sizzle.matchesSelector = function( elem, expr ) {
try {
if ( ( elem.ownerDocument || elem ) !== document ) {
setDocument( elem );
}
} catch (e) { }
expr = expr.replace( rattributeQuotes, "='$1']" );
if ( support.matchesSelector && documentIsHTML &&
( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
try {
var ret = matches.call( elem, expr );
if ( ret || support.disconnectedMatch ||
elem.document && elem.document.nodeType !== 11 ) {
return ret;
}
} catch (e) {}
}
return Sizzle( expr, document, null, [ elem ] ).length > 0;
};
Sizzle.contains = function( context, elem ) {
if ( ( context.ownerDocument || context ) !== document ) {
setDocument( context );
}
return contains( context, elem );
};
Sizzle.attr = function( elem, name ) {
try {
if ( ( elem.ownerDocument || elem ) !== document ) {
setDocument( elem );
}
} catch (e) { }
var fn = Expr.attrHandle[ name.toLowerCase() ],
val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
fn( elem, name, !documentIsHTML ) :
undefined;
return val !== undefined ?
val :
support.attributes || !documentIsHTML ?
elem.getAttribute( name ) :
(val = elem.getAttributeNode(name)) && val.specified ?
val.value :
null;
};
Sizzle.error = function( msg ) {
throw new Error( "Syntax error, unrecognized expression: " + msg );
};
/**
* Document sorting and removing duplicates
* @param {ArrayLike} results
*/
Sizzle.uniqueSort = function( results ) {
var elem,
duplicates = [],
j = 0,
i = 0;
hasDuplicate = !support.detectDuplicates;
sortInput = !support.sortStable && results.slice( 0 );
results.sort( sortOrder );
if ( hasDuplicate ) {
while ( (elem = results[i++]) ) {
if ( elem === results[ i ] ) {
j = duplicates.push( i );
}
}
while ( j-- ) {
results.splice( duplicates[ j ], 1 );
}
}
sortInput = null;
return results;
};
/**
* Utility function for retrieving the text value of an array of DOM nodes
* @param {Array|Element} elem
*/
getText = Sizzle.getText = function( elem ) {
var node,
ret = "",
i = 0,
nodeType = elem.nodeType;
if ( !nodeType ) {
while ( (node = elem[i++]) ) {
ret += getText( node );
}
} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
if ( typeof elem.textContent === "string" ) {
return elem.textContent;
} else {
for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
ret += getText( elem );
}
}
} else if ( nodeType === 3 || nodeType === 4 ) {
return elem.nodeValue;
}
return ret;
};
Expr = Sizzle.selectors = {
cacheLength: 50,
createPseudo: markFunction,
match: matchExpr,
attrHandle: {},
find: {},
relative: {
">": { dir: "parentNode", first: true },
" ": { dir: "parentNode" },
"+": { dir: "previousSibling", first: true },
"~": { dir: "previousSibling" }
},
preFilter: {
"ATTR": function( match ) {
match[1] = match[1].replace( runescape, funescape );
match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
if ( match[2] === "~=" ) {
match[3] = " " + match[3] + " ";
}
return match.slice( 0, 4 );
},
"CHILD": function( match ) {
/* matches from matchExpr["CHILD"]
1 type (only|nth|...)
2 what (child|of-type)
3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
4 xn-component of xn+y argument ([+-]?\d*n|)
5 sign of xn-component
6 x of xn-component
7 sign of y-component
8 y of y-component
*/
match[1] = match[1].toLowerCase();
if ( match[1].slice( 0, 3 ) === "nth" ) {
if ( !match[3] ) {
Sizzle.error( match[0] );
}
match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
} else if ( match[3] ) {
Sizzle.error( match[0] );
}
return match;
},
"PSEUDO": function( match ) {
var excess,
unquoted = !match[6] && match[2];
if ( matchExpr["CHILD"].test( match[0] ) ) {
return null;
}
if ( match[3] ) {
match[2] = match[4] || match[5] || "";
} else if ( unquoted && rpseudo.test( unquoted ) &&
(excess = tokenize( unquoted, true )) &&
(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
match[0] = match[0].slice( 0, excess );
match[2] = unquoted.slice( 0, excess );
}
return match.slice( 0, 3 );
}
},
filter: {
"TAG": function( nodeNameSelector ) {
var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
return nodeNameSelector === "*" ?
function() { return true; } :
function( elem ) {
return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
};
},
"CLASS": function( className ) {
var pattern = classCache[ className + " " ];
return pattern ||
(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
classCache( className, function( elem ) {
return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
});
},
"ATTR": function( name, operator, check ) {
return function( elem ) {
var result = Sizzle.attr( elem, name );
if ( result == null ) {
return operator === "!=";
}
if ( !operator ) {
return true;
}
result += "";
return operator === "=" ? result === check :
operator === "!=" ? result !== check :
operator === "^=" ? check && result.indexOf( check ) === 0 :
operator === "*=" ? check && result.indexOf( check ) > -1 :
operator === "$=" ? check && result.slice( -check.length ) === check :
operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
false;
};
},
"CHILD": function( type, what, argument, first, last ) {
var simple = type.slice( 0, 3 ) !== "nth",
forward = type.slice( -4 ) !== "last",
ofType = what === "of-type";
return first === 1 && last === 0 ?
function( elem ) {
return !!elem.parentNode;
} :
function( elem, context, xml ) {
var cache, outerCache, node, diff, nodeIndex, start,
dir = simple !== forward ? "nextSibling" : "previousSibling",
parent = elem.parentNode,
name = ofType && elem.nodeName.toLowerCase(),
useCache = !xml && !ofType;
if ( parent ) {
if ( simple ) {
while ( dir ) {
node = elem;
while ( (node = node[ dir ]) ) {
if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
return false;
}
}
start = dir = type === "only" && !start && "nextSibling";
}
return true;
}
start = [ forward ? parent.firstChild : parent.lastChild ];
if ( forward && useCache ) {
outerCache = parent[ expando ] || (parent[ expando ] = {});
cache = outerCache[ type ] || [];
nodeIndex = cache[0] === dirruns && cache[1];
diff = cache[0] === dirruns && cache[2];
node = nodeIndex && parent.childNodes[ nodeIndex ];
while ( (node = ++nodeIndex && node && node[ dir ] ||
(diff = nodeIndex = 0) || start.pop()) ) {
if ( node.nodeType === 1 && ++diff && node === elem ) {
outerCache[ type ] = [ dirruns, nodeIndex, diff ];
break;
}
}
} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
diff = cache[1];
} else {
while ( (node = ++nodeIndex && node && node[ dir ] ||
(diff = nodeIndex = 0) || start.pop()) ) {
if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
if ( useCache ) {
(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
}
if ( node === elem ) {
break;
}
}
}
}
diff -= last;
return diff === first || ( diff % first === 0 && diff / first >= 0 );
}
};
},
"PSEUDO": function( pseudo, argument ) {
var args,
fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
Sizzle.error( "unsupported pseudo: " + pseudo );
if ( fn[ expando ] ) {
return fn( argument );
}
if ( fn.length > 1 ) {
args = [ pseudo, pseudo, "", argument ];
return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
markFunction(function( seed, matches ) {
var idx,
matched = fn( seed, argument ),
i = matched.length;
while ( i-- ) {
idx = indexOf( seed, matched[i] );
seed[ idx ] = !( matches[ idx ] = matched[i] );
}
}) :
function( elem ) {
return fn( elem, 0, args );
};
}
return fn;
}
},
pseudos: {
"not": markFunction(function( selector ) {
var input = [],
results = [],
matcher = compile( selector.replace( rtrim, "$1" ) );
return matcher[ expando ] ?
markFunction(function( seed, matches, context, xml ) {
var elem,
unmatched = matcher( seed, null, xml, [] ),
i = seed.length;
while ( i-- ) {
if ( (elem = unmatched[i]) ) {
seed[i] = !(matches[i] = elem);
}
}
}) :
function( elem, context, xml ) {
input[0] = elem;
matcher( input, null, xml, results );
input[0] = null;
return !results.pop();
};
}),
"has": markFunction(function( selector ) {
return function( elem ) {
return Sizzle( selector, elem ).length > 0;
};
}),
"contains": markFunction(function( text ) {
text = text.replace( runescape, funescape );
return function( elem ) {
return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
};
}),
"lang": markFunction( function( lang ) {
if ( !ridentifier.test(lang || "") ) {
Sizzle.error( "unsupported lang: " + lang );
}
lang = lang.replace( runescape, funescape ).toLowerCase();
return function( elem ) {
var elemLang;
do {
if ( (elemLang = documentIsHTML ?
elem.lang :
elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
elemLang = elemLang.toLowerCase();
return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
}
} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
return false;
};
}),
"target": function( elem ) {
var hash = window.location && window.location.hash;
return hash && hash.slice( 1 ) === elem.id;
},
"root": function( elem ) {
return elem === docElem;
},
"focus": function( elem ) {
return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
},
"enabled": function( elem ) {
return elem.disabled === false;
},
"disabled": function( elem ) {
return elem.disabled === true;
},
"checked": function( elem ) {
var nodeName = elem.nodeName.toLowerCase();
return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
},
"selected": function( elem ) {
if ( elem.parentNode ) {
elem.parentNode.selectedIndex;
}
return elem.selected === true;
},
"empty": function( elem ) {
for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
if ( elem.nodeType < 6 ) {
return false;
}
}
return true;
},
"parent": function( elem ) {
return !Expr.pseudos["empty"]( elem );
},
"header": function( elem ) {
return rheader.test( elem.nodeName );
},
"input": function( elem ) {
return rinputs.test( elem.nodeName );
},
"button": function( elem ) {
var name = elem.nodeName.toLowerCase();
return name === "input" && elem.type === "button" || name === "button";
},
"text": function( elem ) {
var attr;
return elem.nodeName.toLowerCase() === "input" &&
elem.type === "text" &&
( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
},
"first": createPositionalPseudo(function() {
return [ 0 ];
}),
"last": createPositionalPseudo(function( matchIndexes, length ) {
return [ length - 1 ];
}),
"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
return [ argument < 0 ? argument + length : argument ];
}),
"even": createPositionalPseudo(function( matchIndexes, length ) {
var i = 0;
for ( ; i < length; i += 2 ) {
matchIndexes.push( i );
}
return matchIndexes;
}),
"odd": createPositionalPseudo(function( matchIndexes, length ) {
var i = 1;
for ( ; i < length; i += 2 ) {
matchIndexes.push( i );
}
return matchIndexes;
}),
"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
var i = argument < 0 ? argument + length : argument;
for ( ; --i >= 0; ) {
matchIndexes.push( i );
}
return matchIndexes;
}),
"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
var i = argument < 0 ? argument + length : argument;
for ( ; ++i < length; ) {
matchIndexes.push( i );
}
return matchIndexes;
})
}
};
Expr.pseudos["nth"] = Expr.pseudos["eq"];
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
Expr.pseudos[ i ] = createButtonPseudo( i );
}
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();
tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
var matched, match, tokens, type,
soFar, groups, preFilters,
cached = tokenCache[ selector + " " ];
if ( cached ) {
return parseOnly ? 0 : cached.slice( 0 );
}
soFar = selector;
groups = [];
preFilters = Expr.preFilter;
while ( soFar ) {
if ( !matched || (match = rcomma.exec( soFar )) ) {
if ( match ) {
soFar = soFar.slice( match[0].length ) || soFar;
}
groups.push( (tokens = []) );
}
matched = false;
if ( (match = rcombinators.exec( soFar )) ) {
matched = match.shift();
tokens.push({
value: matched,
type: match[0].replace( rtrim, " " )
});
soFar = soFar.slice( matched.length );
}
for ( type in Expr.filter ) {
if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
(match = preFilters[ type ]( match ))) ) {
matched = match.shift();
tokens.push({
value: matched,
type: type,
matches: match
});
soFar = soFar.slice( matched.length );
}
}
if ( !matched ) {
break;
}
}
return parseOnly ?
soFar.length :
soFar ?
Sizzle.error( selector ) :
tokenCache( selector, groups ).slice( 0 );
};
function toSelector( tokens ) {
var i = 0,
len = tokens.length,
selector = "";
for ( ; i < len; i++ ) {
selector += tokens[i].value;
}
return selector;
}
function addCombinator( matcher, combinator, base ) {
var dir = combinator.dir,
checkNonElements = base && dir === "parentNode",
doneName = done++;
return combinator.first ?
function( elem, context, xml ) {
while ( (elem = elem[ dir ]) ) {
if ( elem.nodeType === 1 || checkNonElements ) {
return matcher( elem, context, xml );
}
}
} :
function( elem, context, xml ) {
var oldCache, outerCache,
newCache = [ dirruns, doneName ];
if ( xml ) {
while ( (elem = elem[ dir ]) ) {
if ( elem.nodeType === 1 || checkNonElements ) {
if ( matcher( elem, context, xml ) ) {
return true;
}
}
}
} else {
while ( (elem = elem[ dir ]) ) {
if ( elem.nodeType === 1 || checkNonElements ) {
outerCache = elem[ expando ] || (elem[ expando ] = {});
if ( (oldCache = outerCache[ dir ]) &&
oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
return (newCache[ 2 ] = oldCache[ 2 ]);
} else {
outerCache[ dir ] = newCache;
if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
return true;
}
}
}
}
}
};
}
function elementMatcher( matchers ) {
return matchers.length > 1 ?
function( elem, context, xml ) {
var i = matchers.length;
while ( i-- ) {
if ( !matchers[i]( elem, context, xml ) ) {
return false;
}
}
return true;
} :
matchers[0];
}
function multipleContexts( selector, contexts, results ) {
var i = 0,
len = contexts.length;
for ( ; i < len; i++ ) {
Sizzle( selector, contexts[i], results );
}
return results;
}
function condense( unmatched, map, filter, context, xml ) {
var elem,
newUnmatched = [],
i = 0,
len = unmatched.length,
mapped = map != null;
for ( ; i < len; i++ ) {
if ( (elem = unmatched[i]) ) {
if ( !filter || filter( elem, context, xml ) ) {
newUnmatched.push( elem );
if ( mapped ) {
map.push( i );
}
}
}
}
return newUnmatched;
}
function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
if ( postFilter && !postFilter[ expando ] ) {
postFilter = setMatcher( postFilter );
}
if ( postFinder && !postFinder[ expando ] ) {
postFinder = setMatcher( postFinder, postSelector );
}
return markFunction(function( seed, results, context, xml ) {
var temp, i, elem,
preMap = [],
postMap = [],
preexisting = results.length,
elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
matcherIn = preFilter && ( seed || !selector ) ?
condense( elems, preMap, preFilter, context, xml ) :
elems,
matcherOut = matcher ?
postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
[] :
results :
matcherIn;
if ( matcher ) {
matcher( matcherIn, matcherOut, context, xml );
}
if ( postFilter ) {
temp = condense( matcherOut, postMap );
postFilter( temp, [], context, xml );
i = temp.length;
while ( i-- ) {
if ( (elem = temp[i]) ) {
matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
}
}
}
if ( seed ) {
if ( postFinder || preFilter ) {
if ( postFinder ) {
temp = [];
i = matcherOut.length;
while ( i-- ) {
if ( (elem = matcherOut[i]) ) {
temp.push( (matcherIn[i] = elem) );
}
}
postFinder( null, (matcherOut = []), temp, xml );
}
i = matcherOut.length;
while ( i-- ) {
if ( (elem = matcherOut[i]) &&
(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
seed[temp] = !(results[temp] = elem);
}
}
}
} else {
matcherOut = condense(
matcherOut === results ?
matcherOut.splice( preexisting, matcherOut.length ) :
matcherOut
);
if ( postFinder ) {
postFinder( null, results, matcherOut, xml );
} else {
push.apply( results, matcherOut );
}
}
});
}
function matcherFromTokens( tokens ) {
var checkContext, matcher, j,
len = tokens.length,
leadingRelative = Expr.relative[ tokens[0].type ],
implicitRelative = leadingRelative || Expr.relative[" "],
i = leadingRelative ? 1 : 0,
matchContext = addCombinator( function( elem ) {
return elem === checkContext;
}, implicitRelative, true ),
matchAnyContext = addCombinator( function( elem ) {
return indexOf( checkContext, elem ) > -1;
}, implicitRelative, true ),
matchers = [ function( elem, context, xml ) {
var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
(checkContext = context).nodeType ?
matchContext( elem, context, xml ) :
matchAnyContext( elem, context, xml ) );
checkContext = null;
return ret;
} ];
for ( ; i < len; i++ ) {
if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
} else {
matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
if ( matcher[ expando ] ) {
j = ++i;
for ( ; j < len; j++ ) {
if ( Expr.relative[ tokens[j].type ] ) {
break;
}
}
return setMatcher(
i > 1 && elementMatcher( matchers ),
i > 1 && toSelector(
tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
).replace( rtrim, "$1" ),
matcher,
i < j && matcherFromTokens( tokens.slice( i, j ) ),
j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
j < len && toSelector( tokens )
);
}
matchers.push( matcher );
}
}
return elementMatcher( matchers );
}
function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
var bySet = setMatchers.length > 0,
byElement = elementMatchers.length > 0,
superMatcher = function( seed, context, xml, results, outermost ) {
var elem, j, matcher,
matchedCount = 0,
i = "0",
unmatched = seed && [],
setMatched = [],
contextBackup = outermostContext,
elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
len = elems.length;
if ( outermost ) {
outermostContext = context !== document && context;
}
for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
if ( byElement && elem ) {
j = 0;
while ( (matcher = elementMatchers[j++]) ) {
if ( matcher( elem, context, xml ) ) {
results.push( elem );
break;
}
}
if ( outermost ) {
dirruns = dirrunsUnique;
}
}
if ( bySet ) {
if ( (elem = !matcher && elem) ) {
matchedCount--;
}
if ( seed ) {
unmatched.push( elem );
}
}
}
matchedCount += i;
if ( bySet && i !== matchedCount ) {
j = 0;
while ( (matcher = setMatchers[j++]) ) {
matcher( unmatched, setMatched, context, xml );
}
if ( seed ) {
if ( matchedCount > 0 ) {
while ( i-- ) {
if ( !(unmatched[i] || setMatched[i]) ) {
setMatched[i] = pop.call( results );
}
}
}
setMatched = condense( setMatched );
}
push.apply( results, setMatched );
if ( outermost && !seed && setMatched.length > 0 &&
( matchedCount + setMatchers.length ) > 1 ) {
Sizzle.uniqueSort( results );
}
}
if ( outermost ) {
dirruns = dirrunsUnique;
outermostContext = contextBackup;
}
return unmatched;
};
return bySet ?
markFunction( superMatcher ) :
superMatcher;
}
compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
var i,
setMatchers = [],
elementMatchers = [],
cached = compilerCache[ selector + " " ];
if ( !cached ) {
if ( !match ) {
match = tokenize( selector );
}
i = match.length;
while ( i-- ) {
cached = matcherFromTokens( match[i] );
if ( cached[ expando ] ) {
setMatchers.push( cached );
} else {
elementMatchers.push( cached );
}
}
cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
cached.selector = selector;
}
return cached;
};
/**
* A low-level selection function that works with Sizzle's compiled
*  selector functions
* @param {String|Function} selector A selector or a pre-compiled
*  selector function built with Sizzle.compile
* @param {Element} context
* @param {Array} [results]
* @param {Array} [seed] A set of elements to match against
*/
select = Sizzle.select = function( selector, context, results, seed ) {
var i, tokens, token, type, find,
compiled = typeof selector === "function" && selector,
match = !seed && tokenize( (selector = compiled.selector || selector) );
results = results || [];
if ( match.length === 1 ) {
tokens = match[0] = match[0].slice( 0 );
if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
support.getById && context.nodeType === 9 && documentIsHTML &&
Expr.relative[ tokens[1].type ] ) {
context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
if ( !context ) {
return results;
} else if ( compiled ) {
context = context.parentNode;
}
selector = selector.slice( tokens.shift().value.length );
}
i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
while ( i-- ) {
token = tokens[i];
if ( Expr.relative[ (type = token.type) ] ) {
break;
}
if ( (find = Expr.find[ type ]) ) {
if ( (seed = find(
token.matches[0].replace( runescape, funescape ),
rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
)) ) {
tokens.splice( i, 1 );
selector = seed.length && toSelector( tokens );
if ( !selector ) {
push.apply( results, seed );
return results;
}
break;
}
}
}
}
( compiled || compile( selector, match ) )(
seed,
context,
!documentIsHTML,
results,
rsibling.test( selector ) && testContext( context.parentNode ) || context
);
return results;
};
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
support.detectDuplicates = !!hasDuplicate;
setDocument();
support.sortDetached = assert(function( div1 ) {
return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});
if ( !assert(function( div ) {
div.innerHTML = "<a href='#'></a>";
return div.firstChild.getAttribute("href") === "#" ;
}) ) {
addHandle( "type|href|height|width", function( elem, name, isXML ) {
if ( !isXML ) {
return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
}
});
}
if ( !support.attributes || !assert(function( div ) {
div.innerHTML = "<input/>";
div.firstChild.setAttribute( "value", "" );
return div.firstChild.getAttribute( "value" ) === "";
}) ) {
addHandle( "value", function( elem, name, isXML ) {
if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
return elem.defaultValue;
}
});
}
if ( !assert(function( div ) {
return div.getAttribute("disabled") == null;
}) ) {
addHandle( booleans, function( elem, name, isXML ) {
var val;
if ( !isXML ) {
return elem[ name ] === true ? name.toLowerCase() :
(val = elem.getAttributeNode( name )) && val.specified ?
val.value :
null;
}
});
}
return Sizzle;
})( window );
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
var rneedsContext = jQuery.expr.match.needsContext;
var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
var risSimple = /^.[^:#\[\.,]*$/;
function winnow( elements, qualifier, not ) {
if ( jQuery.isFunction( qualifier ) ) {
return jQuery.grep( elements, function( elem, i ) {
/* jshint -W018 */
return !!qualifier.call( elem, i, elem ) !== not;
});
}
if ( qualifier.nodeType ) {
return jQuery.grep( elements, function( elem ) {
return ( elem === qualifier ) !== not;
});
}
if ( typeof qualifier === "string" ) {
if ( risSimple.test( qualifier ) ) {
return jQuery.filter( qualifier, elements, not );
}
qualifier = jQuery.filter( qualifier, elements );
}
return jQuery.grep( elements, function( elem ) {
return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
});
}
jQuery.filter = function( expr, elems, not ) {
var elem = elems[ 0 ];
if ( not ) {
expr = ":not(" + expr + ")";
}
return elems.length === 1 && elem.nodeType === 1 ?
jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
return elem.nodeType === 1;
}));
};
jQuery.fn.extend({
find: function( selector ) {
var i,
ret = [],
self = this,
len = self.length;
if ( typeof selector !== "string" ) {
return this.pushStack( jQuery( selector ).filter(function() {
for ( i = 0; i < len; i++ ) {
if ( jQuery.contains( self[ i ], this ) ) {
return true;
}
}
}) );
}
for ( i = 0; i < len; i++ ) {
jQuery.find( selector, self[ i ], ret );
}
ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
ret.selector = this.selector ? this.selector + " " + selector : selector;
return ret;
},
filter: function( selector ) {
return this.pushStack( winnow(this, selector || [], false) );
},
not: function( selector ) {
return this.pushStack( winnow(this, selector || [], true) );
},
is: function( selector ) {
return !!winnow(
this,
typeof selector === "string" && rneedsContext.test( selector ) ?
jQuery( selector ) :
selector || [],
false
).length;
}
});
var rootjQuery,
document = window.document,
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
init = jQuery.fn.init = function( selector, context ) {
var match, elem;
if ( !selector ) {
return this;
}
if ( typeof selector === "string" ) {
if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
match = [ null, selector, null ];
} else {
match = rquickExpr.exec( selector );
}
if ( match && (match[1] || !context) ) {
if ( match[1] ) {
context = context instanceof jQuery ? context[0] : context;
jQuery.merge( this, jQuery.parseHTML(
match[1],
context && context.nodeType ? context.ownerDocument || context : document,
true
) );
if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
for ( match in context ) {
if ( jQuery.isFunction( this[ match ] ) ) {
this[ match ]( context[ match ] );
} else {
this.attr( match, context[ match ] );
}
}
}
return this;
} else {
elem = document.getElementById( match[2] );
if ( elem && elem.parentNode ) {
if ( elem.id !== match[2] ) {
return rootjQuery.find( selector );
}
this.length = 1;
this[0] = elem;
}
this.context = document;
this.selector = selector;
return this;
}
} else if ( !context || context.jquery ) {
return ( context || rootjQuery ).find( selector );
} else {
return this.constructor( context ).find( selector );
}
} else if ( selector.nodeType ) {
this.context = this[0] = selector;
this.length = 1;
return this;
} else if ( jQuery.isFunction( selector ) ) {
return typeof rootjQuery.ready !== "undefined" ?
rootjQuery.ready( selector ) :
selector( jQuery );
}
if ( selector.selector !== undefined ) {
this.selector = selector.selector;
this.context = selector.context;
}
return jQuery.makeArray( selector, this );
};
init.prototype = jQuery.fn;
rootjQuery = jQuery( document );
var rparentsprev = /^(?:parents|prev(?:Until|All))/,
guaranteedUnique = {
children: true,
contents: true,
next: true,
prev: true
};
jQuery.extend({
dir: function( elem, dir, until ) {
var matched = [],
cur = elem[ dir ];
while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
if ( cur.nodeType === 1 ) {
matched.push( cur );
}
cur = cur[dir];
}
return matched;
},
sibling: function( n, elem ) {
var r = [];
for ( ; n; n = n.nextSibling ) {
if ( n.nodeType === 1 && n !== elem ) {
r.push( n );
}
}
return r;
}
});
jQuery.fn.extend({
has: function( target ) {
var i,
targets = jQuery( target, this ),
len = targets.length;
return this.filter(function() {
for ( i = 0; i < len; i++ ) {
if ( jQuery.contains( this, targets[i] ) ) {
return true;
}
}
});
},
closest: function( selectors, context ) {
var cur,
i = 0,
l = this.length,
matched = [],
pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
jQuery( selectors, context || this.context ) :
0;
for ( ; i < l; i++ ) {
for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
if ( cur.nodeType < 11 && (pos ?
pos.index(cur) > -1 :
cur.nodeType === 1 &&
jQuery.find.matchesSelector(cur, selectors)) ) {
matched.push( cur );
break;
}
}
}
return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
},
index: function( elem ) {
if ( !elem ) {
return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
}
if ( typeof elem === "string" ) {
return jQuery.inArray( this[0], jQuery( elem ) );
}
return jQuery.inArray(
elem.jquery ? elem[0] : elem, this );
},
add: function( selector, context ) {
return this.pushStack(
jQuery.unique(
jQuery.merge( this.get(), jQuery( selector, context ) )
)
);
},
addBack: function( selector ) {
return this.add( selector == null ?
this.prevObject : this.prevObject.filter(selector)
);
}
});
function sibling( cur, dir ) {
do {
cur = cur[ dir ];
} while ( cur && cur.nodeType !== 1 );
return cur;
}
jQuery.each({
parent: function( elem ) {
var parent = elem.parentNode;
return parent && parent.nodeType !== 11 ? parent : null;
},
parents: function( elem ) {
return jQuery.dir( elem, "parentNode" );
},
parentsUntil: function( elem, i, until ) {
return jQuery.dir( elem, "parentNode", until );
},
next: function( elem ) {
return sibling( elem, "nextSibling" );
},
prev: function( elem ) {
return sibling( elem, "previousSibling" );
},
nextAll: function( elem ) {
return jQuery.dir( elem, "nextSibling" );
},
prevAll: function( elem ) {
return jQuery.dir( elem, "previousSibling" );
},
nextUntil: function( elem, i, until ) {
return jQuery.dir( elem, "nextSibling", until );
},
prevUntil: function( elem, i, until ) {
return jQuery.dir( elem, "previousSibling", until );
},
siblings: function( elem ) {
return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
},
children: function( elem ) {
return jQuery.sibling( elem.firstChild );
},
contents: function( elem ) {
return jQuery.nodeName( elem, "iframe" ) ?
elem.contentDocument || elem.contentWindow.document :
jQuery.merge( [], elem.childNodes );
}
}, function( name, fn ) {
jQuery.fn[ name ] = function( until, selector ) {
var ret = jQuery.map( this, fn, until );
if ( name.slice( -5 ) !== "Until" ) {
selector = until;
}
if ( selector && typeof selector === "string" ) {
ret = jQuery.filter( selector, ret );
}
if ( this.length > 1 ) {
if ( !guaranteedUnique[ name ] ) {
ret = jQuery.unique( ret );
}
if ( rparentsprev.test( name ) ) {
ret = ret.reverse();
}
}
return this.pushStack( ret );
};
});
var rnotwhite = (/\S+/g);
var optionsCache = {};
function createOptions( options ) {
var object = optionsCache[ options ] = {};
jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
object[ flag ] = true;
});
return object;
}
/*
* Create a callback list using the following parameters:
*
*	options: an optional list of space-separated options that will change how
*			the callback list behaves or a more traditional option object
*
* By default a callback list will act like an event callback list and can be
* "fired" multiple times.
*
* Possible options:
*
*	once:			will ensure the callback list can only be fired once (like a Deferred)
*
*	memory:			will keep track of previous values and will call any callback added
*					after the list has been fired right away with the latest "memorized"
*					values (like a Deferred)
*
*	unique:			will ensure a callback can only be added once (no duplicate in the list)
*
*	stopOnFalse:	interrupt callings when a callback returns false
*
*/
jQuery.Callbacks = function( options ) {
options = typeof options === "string" ?
( optionsCache[ options ] || createOptions( options ) ) :
jQuery.extend( {}, options );
var // Flag to know if list is currently firing
firing,
memory,
fired,
firingLength,
firingIndex,
firingStart,
list = [],
stack = !options.once && [],
fire = function( data ) {
memory = options.memory && data;
fired = true;
firingIndex = firingStart || 0;
firingStart = 0;
firingLength = list.length;
firing = true;
for ( ; list && firingIndex < firingLength; firingIndex++ ) {
if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
memory = false; // To prevent further calls using add
break;
}
}
firing = false;
if ( list ) {
if ( stack ) {
if ( stack.length ) {
fire( stack.shift() );
}
} else if ( memory ) {
list = [];
} else {
self.disable();
}
}
},
self = {
add: function() {
if ( list ) {
var start = list.length;
(function add( args ) {
jQuery.each( args, function( _, arg ) {
var type = jQuery.type( arg );
if ( type === "function" ) {
if ( !options.unique || !self.has( arg ) ) {
list.push( arg );
}
} else if ( arg && arg.length && type !== "string" ) {
add( arg );
}
});
})( arguments );
if ( firing ) {
firingLength = list.length;
} else if ( memory ) {
firingStart = start;
fire( memory );
}
}
return this;
},
remove: function() {
if ( list ) {
jQuery.each( arguments, function( _, arg ) {
var index;
while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
list.splice( index, 1 );
if ( firing ) {
if ( index <= firingLength ) {
firingLength--;
}
if ( index <= firingIndex ) {
firingIndex--;
}
}
}
});
}
return this;
},
has: function( fn ) {
return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
},
empty: function() {
list = [];
firingLength = 0;
return this;
},
disable: function() {
list = stack = memory = undefined;
return this;
},
disabled: function() {
return !list;
},
lock: function() {
stack = undefined;
if ( !memory ) {
self.disable();
}
return this;
},
locked: function() {
return !stack;
},
fireWith: function( context, args ) {
if ( list && ( !fired || stack ) ) {
args = args || [];
args = [ context, args.slice ? args.slice() : args ];
if ( firing ) {
stack.push( args );
} else {
fire( args );
}
}
return this;
},
fire: function() {
self.fireWith( this, arguments );
return this;
},
fired: function() {
return !!fired;
}
};
return self;
};
jQuery.extend({
Deferred: function( func ) {
var tuples = [
[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
[ "notify", "progress", jQuery.Callbacks("memory") ]
],
state = "pending",
promise = {
state: function() {
return state;
},
always: function() {
deferred.done( arguments ).fail( arguments );
return this;
},
then: function( /* fnDone, fnFail, fnProgress */ ) {
var fns = arguments;
return jQuery.Deferred(function( newDefer ) {
jQuery.each( tuples, function( i, tuple ) {
var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
deferred[ tuple[1] ](function() {
var returned = fn && fn.apply( this, arguments );
if ( returned && jQuery.isFunction( returned.promise ) ) {
returned.promise()
.done( newDefer.resolve )
.fail( newDefer.reject )
.progress( newDefer.notify );
} else {
newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
}
});
});
fns = null;
}).promise();
},
promise: function( obj ) {
return obj != null ? jQuery.extend( obj, promise ) : promise;
}
},
deferred = {};
promise.pipe = promise.then;
jQuery.each( tuples, function( i, tuple ) {
var list = tuple[ 2 ],
stateString = tuple[ 3 ];
promise[ tuple[1] ] = list.add;
if ( stateString ) {
list.add(function() {
state = stateString;
}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
}
deferred[ tuple[0] ] = function() {
deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
return this;
};
deferred[ tuple[0] + "With" ] = list.fireWith;
});
promise.promise( deferred );
if ( func ) {
func.call( deferred, deferred );
}
return deferred;
},
when: function( subordinate /* , ..., subordinateN */ ) {
var i = 0,
resolveValues = slice.call( arguments ),
length = resolveValues.length,
remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
updateFunc = function( i, contexts, values ) {
return function( value ) {
contexts[ i ] = this;
values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
if ( values === progressValues ) {
deferred.notifyWith( contexts, values );
} else if ( !(--remaining) ) {
deferred.resolveWith( contexts, values );
}
};
},
progressValues, progressContexts, resolveContexts;
if ( length > 1 ) {
progressValues = new Array( length );
progressContexts = new Array( length );
resolveContexts = new Array( length );
for ( ; i < length; i++ ) {
if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
resolveValues[ i ].promise()
.done( updateFunc( i, resolveContexts, resolveValues ) )
.fail( deferred.reject )
.progress( updateFunc( i, progressContexts, progressValues ) );
} else {
--remaining;
}
}
}
if ( !remaining ) {
deferred.resolveWith( resolveContexts, resolveValues );
}
return deferred.promise();
}
});
var readyList;
jQuery.fn.ready = function( fn ) {
jQuery.ready.promise().done( fn );
return this;
};
jQuery.extend({
isReady: false,
readyWait: 1,
holdReady: function( hold ) {
if ( hold ) {
jQuery.readyWait++;
} else {
jQuery.ready( true );
}
},
ready: function( wait ) {
if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
return;
}
if ( !document.body ) {
return setTimeout( jQuery.ready );
}
jQuery.isReady = true;
if ( wait !== true && --jQuery.readyWait > 0 ) {
return;
}
readyList.resolveWith( document, [ jQuery ] );
if ( jQuery.fn.triggerHandler ) {
jQuery( document ).triggerHandler( "ready" );
jQuery( document ).off( "ready" );
}
}
});
/**
* Clean-up method for dom ready events
*/
function detach() {
if ( document.addEventListener ) {
document.removeEventListener( "DOMContentLoaded", completed, false );
window.removeEventListener( "load", completed, false );
} else {
document.detachEvent( "onreadystatechange", completed );
window.detachEvent( "onload", completed );
}
}
/**
* The ready event handler and self cleanup method
*/
function completed() {
if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
detach();
jQuery.ready();
}
}
jQuery.ready.promise = function( obj ) {
if ( !readyList ) {
readyList = jQuery.Deferred();
if ( document.readyState === "complete" ) {
setTimeout( jQuery.ready );
} else if ( document.addEventListener ) {
document.addEventListener( "DOMContentLoaded", completed, false );
window.addEventListener( "load", completed, false );
} else {
document.attachEvent( "onreadystatechange", completed );
window.attachEvent( "onload", completed );
var top = false;
try {
top = window.frameElement == null && document.documentElement;
} catch(e) {}
if ( top && top.doScroll ) {
(function doScrollCheck() {
if ( !jQuery.isReady ) {
try {
top.doScroll("left");
} catch(e) {
return setTimeout( doScrollCheck, 50 );
}
detach();
jQuery.ready();
}
})();
}
}
}
return readyList.promise( obj );
};
var strundefined = typeof undefined;
var i;
for ( i in jQuery( support ) ) {
break;
}
support.ownLast = i !== "0";
support.inlineBlockNeedsLayout = false;
jQuery(function() {
var val, div, body, container;
body = document.getElementsByTagName( "body" )[ 0 ];
if ( !body || !body.style ) {
return;
}
div = document.createElement( "div" );
container = document.createElement( "div" );
container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
body.appendChild( container ).appendChild( div );
if ( typeof div.style.zoom !== strundefined ) {
div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
if ( val ) {
body.style.zoom = 1;
}
}
body.removeChild( container );
});
(function() {
var div = document.createElement( "div" );
if (support.deleteExpando == null) {
support.deleteExpando = true;
try {
delete div.test;
} catch( e ) {
support.deleteExpando = false;
}
}
div = null;
})();
/**
* Determines whether an object can have data
*/
jQuery.acceptData = function( elem ) {
var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
nodeType = +elem.nodeType || 1;
return nodeType !== 1 && nodeType !== 9 ?
false :
!noData || noData !== true && elem.getAttribute("classid") === noData;
};
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
rmultiDash = /([A-Z])/g;
function dataAttr( elem, key, data ) {
if ( data === undefined && elem.nodeType === 1 ) {
var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
data = elem.getAttribute( name );
if ( typeof data === "string" ) {
try {
data = data === "true" ? true :
data === "false" ? false :
data === "null" ? null :
+data + "" === data ? +data :
rbrace.test( data ) ? jQuery.parseJSON( data ) :
data;
} catch( e ) {}
jQuery.data( elem, key, data );
} else {
data = undefined;
}
}
return data;
}
function isEmptyDataObject( obj ) {
var name;
for ( name in obj ) {
if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
continue;
}
if ( name !== "toJSON" ) {
return false;
}
}
return true;
}
function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
if ( !jQuery.acceptData( elem ) ) {
return;
}
var ret, thisCache,
internalKey = jQuery.expando,
isNode = elem.nodeType,
cache = isNode ? jQuery.cache : elem,
id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;
if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
return;
}
if ( !id ) {
if ( isNode ) {
id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
} else {
id = internalKey;
}
}
if ( !cache[ id ] ) {
cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
}
if ( typeof name === "object" || typeof name === "function" ) {
if ( pvt ) {
cache[ id ] = jQuery.extend( cache[ id ], name );
} else {
cache[ id ].data = jQuery.extend( cache[ id ].data, name );
}
}
thisCache = cache[ id ];
if ( !pvt ) {
if ( !thisCache.data ) {
thisCache.data = {};
}
thisCache = thisCache.data;
}
if ( data !== undefined ) {
thisCache[ jQuery.camelCase( name ) ] = data;
}
if ( typeof name === "string" ) {
ret = thisCache[ name ];
if ( ret == null ) {
ret = thisCache[ jQuery.camelCase( name ) ];
}
} else {
ret = thisCache;
}
return ret;
}
function internalRemoveData( elem, name, pvt ) {
if ( !jQuery.acceptData( elem ) ) {
return;
}
var thisCache, i,
isNode = elem.nodeType,
cache = isNode ? jQuery.cache : elem,
id = isNode ? elem[ jQuery.expando ] : jQuery.expando;
if ( !cache[ id ] ) {
return;
}
if ( name ) {
thisCache = pvt ? cache[ id ] : cache[ id ].data;
if ( thisCache ) {
if ( !jQuery.isArray( name ) ) {
if ( name in thisCache ) {
name = [ name ];
} else {
name = jQuery.camelCase( name );
if ( name in thisCache ) {
name = [ name ];
} else {
name = name.split(" ");
}
}
} else {
name = name.concat( jQuery.map( name, jQuery.camelCase ) );
}
i = name.length;
while ( i-- ) {
delete thisCache[ name[i] ];
}
if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
return;
}
}
}
if ( !pvt ) {
delete cache[ id ].data;
if ( !isEmptyDataObject( cache[ id ] ) ) {
return;
}
}
if ( isNode ) {
jQuery.cleanData( [ elem ], true );
/* jshint eqeqeq: false */
} else if ( support.deleteExpando || cache != cache.window ) {
/* jshint eqeqeq: true */
delete cache[ id ];
} else {
cache[ id ] = null;
}
}
jQuery.extend({
cache: {},
noData: {
"applet ": true,
"embed ": true,
"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
},
hasData: function( elem ) {
elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
return !!elem && !isEmptyDataObject( elem );
},
data: function( elem, name, data ) {
return internalData( elem, name, data );
},
removeData: function( elem, name ) {
return internalRemoveData( elem, name );
},
_data: function( elem, name, data ) {
return internalData( elem, name, data, true );
},
_removeData: function( elem, name ) {
return internalRemoveData( elem, name, true );
}
});
jQuery.fn.extend({
data: function( key, value ) {
var i, name, data,
elem = this[0],
attrs = elem && elem.attributes;
if ( key === undefined ) {
if ( this.length ) {
data = jQuery.data( elem );
if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
i = attrs.length;
while ( i-- ) {
if ( attrs[ i ] ) {
name = attrs[ i ].name;
if ( name.indexOf( "data-" ) === 0 ) {
name = jQuery.camelCase( name.slice(5) );
dataAttr( elem, name, data[ name ] );
}
}
}
jQuery._data( elem, "parsedAttrs", true );
}
}
return data;
}
if ( typeof key === "object" ) {
return this.each(function() {
jQuery.data( this, key );
});
}
return arguments.length > 1 ?
this.each(function() {
jQuery.data( this, key, value );
}) :
elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
},
removeData: function( key ) {
return this.each(function() {
jQuery.removeData( this, key );
});
}
});
jQuery.extend({
queue: function( elem, type, data ) {
var queue;
if ( elem ) {
type = ( type || "fx" ) + "queue";
queue = jQuery._data( elem, type );
if ( data ) {
if ( !queue || jQuery.isArray(data) ) {
queue = jQuery._data( elem, type, jQuery.makeArray(data) );
} else {
queue.push( data );
}
}
return queue || [];
}
},
dequeue: function( elem, type ) {
type = type || "fx";
var queue = jQuery.queue( elem, type ),
startLength = queue.length,
fn = queue.shift(),
hooks = jQuery._queueHooks( elem, type ),
next = function() {
jQuery.dequeue( elem, type );
};
if ( fn === "inprogress" ) {
fn = queue.shift();
startLength--;
}
if ( fn ) {
if ( type === "fx" ) {
queue.unshift( "inprogress" );
}
delete hooks.stop;
fn.call( elem, next, hooks );
}
if ( !startLength && hooks ) {
hooks.empty.fire();
}
},
_queueHooks: function( elem, type ) {
var key = type + "queueHooks";
return jQuery._data( elem, key ) || jQuery._data( elem, key, {
empty: jQuery.Callbacks("once memory").add(function() {
jQuery._removeData( elem, type + "queue" );
jQuery._removeData( elem, key );
})
});
}
});
jQuery.fn.extend({
queue: function( type, data ) {
var setter = 2;
if ( typeof type !== "string" ) {
data = type;
type = "fx";
setter--;
}
if ( arguments.length < setter ) {
return jQuery.queue( this[0], type );
}
return data === undefined ?
this :
this.each(function() {
var queue = jQuery.queue( this, type, data );
jQuery._queueHooks( this, type );
if ( type === "fx" && queue[0] !== "inprogress" ) {
jQuery.dequeue( this, type );
}
});
},
dequeue: function( type ) {
return this.each(function() {
jQuery.dequeue( this, type );
});
},
clearQueue: function( type ) {
return this.queue( type || "fx", [] );
},
promise: function( type, obj ) {
var tmp,
count = 1,
defer = jQuery.Deferred(),
elements = this,
i = this.length,
resolve = function() {
if ( !( --count ) ) {
defer.resolveWith( elements, [ elements ] );
}
};
if ( typeof type !== "string" ) {
obj = type;
type = undefined;
}
type = type || "fx";
while ( i-- ) {
tmp = jQuery._data( elements[ i ], type + "queueHooks" );
if ( tmp && tmp.empty ) {
count++;
tmp.empty.add( resolve );
}
}
resolve();
return defer.promise( obj );
}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
var isHidden = function( elem, el ) {
elem = el || elem;
return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
};
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
var i = 0,
length = elems.length,
bulk = key == null;
if ( jQuery.type( key ) === "object" ) {
chainable = true;
for ( i in key ) {
jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
}
} else if ( value !== undefined ) {
chainable = true;
if ( !jQuery.isFunction( value ) ) {
raw = true;
}
if ( bulk ) {
if ( raw ) {
fn.call( elems, value );
fn = null;
} else {
bulk = fn;
fn = function( elem, key, value ) {
return bulk.call( jQuery( elem ), value );
};
}
}
if ( fn ) {
for ( ; i < length; i++ ) {
fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
}
}
}
return chainable ?
elems :
bulk ?
fn.call( elems ) :
length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);
(function() {
var input = document.createElement( "input" ),
div = document.createElement( "div" ),
fragment = document.createDocumentFragment();
div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
support.leadingWhitespace = div.firstChild.nodeType === 3;
support.tbody = !div.getElementsByTagName( "tbody" ).length;
support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;
support.html5Clone =
document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";
input.type = "checkbox";
input.checked = true;
fragment.appendChild( input );
support.appendChecked = input.checked;
div.innerHTML = "<textarea>x</textarea>";
support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
fragment.appendChild( div );
div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
support.noCloneEvent = true;
if ( div.attachEvent ) {
div.attachEvent( "onclick", function() {
support.noCloneEvent = false;
});
div.cloneNode( true ).click();
}
if (support.deleteExpando == null) {
support.deleteExpando = true;
try {
delete div.test;
} catch( e ) {
support.deleteExpando = false;
}
}
})();
(function() {
var i, eventName,
div = document.createElement( "div" );
for ( i in { submit: true, change: true, focusin: true }) {
eventName = "on" + i;
if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
div.setAttribute( eventName, "t" );
support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
}
}
div = null;
})();
var rformElems = /^(?:input|select|textarea)$/i,
rkeyEvent = /^key/,
rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
function returnTrue() {
return true;
}
function returnFalse() {
return false;
}
function safeActiveElement() {
try {
return document.activeElement;
} catch ( err ) { }
}
/*
* Helper functions for managing events -- not part of the public interface.
* Props to Dean Edwards' addEvent library for many of the ideas.
*/
jQuery.event = {
global: {},
add: function( elem, types, handler, data, selector ) {
var tmp, events, t, handleObjIn,
special, eventHandle, handleObj,
handlers, type, namespaces, origType,
elemData = jQuery._data( elem );
if ( !elemData ) {
return;
}
if ( handler.handler ) {
handleObjIn = handler;
handler = handleObjIn.handler;
selector = handleObjIn.selector;
}
if ( !handler.guid ) {
handler.guid = jQuery.guid++;
}
if ( !(events = elemData.events) ) {
events = elemData.events = {};
}
if ( !(eventHandle = elemData.handle) ) {
eventHandle = elemData.handle = function( e ) {
return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
undefined;
};
eventHandle.elem = elem;
}
types = ( types || "" ).match( rnotwhite ) || [ "" ];
t = types.length;
while ( t-- ) {
tmp = rtypenamespace.exec( types[t] ) || [];
type = origType = tmp[1];
namespaces = ( tmp[2] || "" ).split( "." ).sort();
if ( !type ) {
continue;
}
special = jQuery.event.special[ type ] || {};
type = ( selector ? special.delegateType : special.bindType ) || type;
special = jQuery.event.special[ type ] || {};
handleObj = jQuery.extend({
type: type,
origType: origType,
data: data,
handler: handler,
guid: handler.guid,
selector: selector,
needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
namespace: namespaces.join(".")
}, handleObjIn );
if ( !(handlers = events[ type ]) ) {
handlers = events[ type ] = [];
handlers.delegateCount = 0;
if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
if ( elem.addEventListener ) {
elem.addEventListener( type, eventHandle, false );
} else if ( elem.attachEvent ) {
elem.attachEvent( "on" + type, eventHandle );
}
}
}
if ( special.add ) {
special.add.call( elem, handleObj );
if ( !handleObj.handler.guid ) {
handleObj.handler.guid = handler.guid;
}
}
if ( selector ) {
handlers.splice( handlers.delegateCount++, 0, handleObj );
} else {
handlers.push( handleObj );
}
jQuery.event.global[ type ] = true;
}
elem = null;
},
remove: function( elem, types, handler, selector, mappedTypes ) {
var j, handleObj, tmp,
origCount, t, events,
special, handlers, type,
namespaces, origType,
elemData = jQuery.hasData( elem ) && jQuery._data( elem );
if ( !elemData || !(events = elemData.events) ) {
return;
}
types = ( types || "" ).match( rnotwhite ) || [ "" ];
t = types.length;
while ( t-- ) {
tmp = rtypenamespace.exec( types[t] ) || [];
type = origType = tmp[1];
namespaces = ( tmp[2] || "" ).split( "." ).sort();
if ( !type ) {
for ( type in events ) {
jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
}
continue;
}
special = jQuery.event.special[ type ] || {};
type = ( selector ? special.delegateType : special.bindType ) || type;
handlers = events[ type ] || [];
tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
origCount = j = handlers.length;
while ( j-- ) {
handleObj = handlers[ j ];
if ( ( mappedTypes || origType === handleObj.origType ) &&
( !handler || handler.guid === handleObj.guid ) &&
( !tmp || tmp.test( handleObj.namespace ) ) &&
( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
handlers.splice( j, 1 );
if ( handleObj.selector ) {
handlers.delegateCount--;
}
if ( special.remove ) {
special.remove.call( elem, handleObj );
}
}
}
if ( origCount && !handlers.length ) {
if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
jQuery.removeEvent( elem, type, elemData.handle );
}
delete events[ type ];
}
}
if ( jQuery.isEmptyObject( events ) ) {
delete elemData.handle;
jQuery._removeData( elem, "events" );
}
},
trigger: function( event, data, elem, onlyHandlers ) {
var handle, ontype, cur,
bubbleType, special, tmp, i,
eventPath = [ elem || document ],
type = hasOwn.call( event, "type" ) ? event.type : event,
namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
cur = tmp = elem = elem || document;
if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
return;
}
if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
return;
}
if ( type.indexOf(".") >= 0 ) {
namespaces = type.split(".");
type = namespaces.shift();
namespaces.sort();
}
ontype = type.indexOf(":") < 0 && "on" + type;
event = event[ jQuery.expando ] ?
event :
new jQuery.Event( type, typeof event === "object" && event );
event.isTrigger = onlyHandlers ? 2 : 3;
event.namespace = namespaces.join(".");
event.namespace_re = event.namespace ?
new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
null;
event.result = undefined;
if ( !event.target ) {
event.target = elem;
}
data = data == null ?
[ event ] :
jQuery.makeArray( data, [ event ] );
special = jQuery.event.special[ type ] || {};
if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
return;
}
if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
bubbleType = special.delegateType || type;
if ( !rfocusMorph.test( bubbleType + type ) ) {
cur = cur.parentNode;
}
for ( ; cur; cur = cur.parentNode ) {
eventPath.push( cur );
tmp = cur;
}
if ( tmp === (elem.ownerDocument || document) ) {
eventPath.push( tmp.defaultView || tmp.parentWindow || window );
}
}
i = 0;
while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
event.type = i > 1 ?
bubbleType :
special.bindType || type;
handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
if ( handle ) {
handle.apply( cur, data );
}
handle = ontype && cur[ ontype ];
if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
event.result = handle.apply( cur, data );
if ( event.result === false ) {
event.preventDefault();
}
}
}
event.type = type;
if ( !onlyHandlers && !event.isDefaultPrevented() ) {
if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
jQuery.acceptData( elem ) ) {
if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {
tmp = elem[ ontype ];
if ( tmp ) {
elem[ ontype ] = null;
}
jQuery.event.triggered = type;
try {
elem[ type ]();
} catch ( e ) {
}
jQuery.event.triggered = undefined;
if ( tmp ) {
elem[ ontype ] = tmp;
}
}
}
}
return event.result;
},
dispatch: function( event ) {
event = jQuery.event.fix( event );
var i, ret, handleObj, matched, j,
handlerQueue = [],
args = slice.call( arguments ),
handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
special = jQuery.event.special[ event.type ] || {};
args[0] = event;
event.delegateTarget = this;
if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
return;
}
handlerQueue = jQuery.event.handlers.call( this, event, handlers );
i = 0;
while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
event.currentTarget = matched.elem;
j = 0;
while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
event.handleObj = handleObj;
event.data = handleObj.data;
ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
.apply( matched.elem, args );
if ( ret !== undefined ) {
if ( (event.result = ret) === false ) {
event.preventDefault();
event.stopPropagation();
}
}
}
}
}
if ( special.postDispatch ) {
special.postDispatch.call( this, event );
}
return event.result;
},
handlers: function( event, handlers ) {
var sel, handleObj, matches, i,
handlerQueue = [],
delegateCount = handlers.delegateCount,
cur = event.target;
if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
/* jshint eqeqeq: false */
for ( ; cur != this; cur = cur.parentNode || this ) {
/* jshint eqeqeq: true */
if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
matches = [];
for ( i = 0; i < delegateCount; i++ ) {
handleObj = handlers[ i ];
sel = handleObj.selector + " ";
if ( matches[ sel ] === undefined ) {
matches[ sel ] = handleObj.needsContext ?
jQuery( sel, this ).index( cur ) >= 0 :
jQuery.find( sel, this, null, [ cur ] ).length;
}
if ( matches[ sel ] ) {
matches.push( handleObj );
}
}
if ( matches.length ) {
handlerQueue.push({ elem: cur, handlers: matches });
}
}
}
}
if ( delegateCount < handlers.length ) {
handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
}
return handlerQueue;
},
fix: function( event ) {
if ( event[ jQuery.expando ] ) {
return event;
}
var i, prop, copy,
type = event.type,
originalEvent = event,
fixHook = this.fixHooks[ type ];
if ( !fixHook ) {
this.fixHooks[ type ] = fixHook =
rmouseEvent.test( type ) ? this.mouseHooks :
rkeyEvent.test( type ) ? this.keyHooks :
{};
}
copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
event = new jQuery.Event( originalEvent );
i = copy.length;
while ( i-- ) {
prop = copy[ i ];
event[ prop ] = originalEvent[ prop ];
}
if ( !event.target ) {
event.target = originalEvent.srcElement || document;
}
if ( event.target.nodeType === 3 ) {
event.target = event.target.parentNode;
}
event.metaKey = !!event.metaKey;
return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
},
props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks: {},
keyHooks: {
props: "char charCode key keyCode".split(" "),
filter: function( event, original ) {
if ( event.which == null ) {
event.which = original.charCode != null ? original.charCode : original.keyCode;
}
return event;
}
},
mouseHooks: {
props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter: function( event, original ) {
var body, eventDoc, doc,
button = original.button,
fromElement = original.fromElement;
if ( event.pageX == null && original.clientX != null ) {
eventDoc = event.target.ownerDocument || document;
doc = eventDoc.documentElement;
body = eventDoc.body;
event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
}
if ( !event.relatedTarget && fromElement ) {
event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
}
if ( !event.which && button !== undefined ) {
event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
}
return event;
}
},
special: {
load: {
noBubble: true
},
focus: {
trigger: function() {
if ( this !== safeActiveElement() && this.focus ) {
try {
this.focus();
return false;
} catch ( e ) {
}
}
},
delegateType: "focusin"
},
blur: {
trigger: function() {
if ( this === safeActiveElement() && this.blur ) {
this.blur();
return false;
}
},
delegateType: "focusout"
},
click: {
trigger: function() {
if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
this.click();
return false;
}
},
_default: function( event ) {
return jQuery.nodeName( event.target, "a" );
}
},
beforeunload: {
postDispatch: function( event ) {
if ( event.result !== undefined && event.originalEvent ) {
event.originalEvent.returnValue = event.result;
}
}
}
},
simulate: function( type, elem, event, bubble ) {
var e = jQuery.extend(
new jQuery.Event(),
event,
{
type: type,
isSimulated: true,
originalEvent: {}
}
);
if ( bubble ) {
jQuery.event.trigger( e, null, elem );
} else {
jQuery.event.dispatch.call( elem, e );
}
if ( e.isDefaultPrevented() ) {
event.preventDefault();
}
}
};
jQuery.removeEvent = document.removeEventListener ?
function( elem, type, handle ) {
if ( elem.removeEventListener ) {
elem.removeEventListener( type, handle, false );
}
} :
function( elem, type, handle ) {
var name = "on" + type;
if ( elem.detachEvent ) {
if ( typeof elem[ name ] === strundefined ) {
elem[ name ] = null;
}
elem.detachEvent( name, handle );
}
};
jQuery.Event = function( src, props ) {
if ( !(this instanceof jQuery.Event) ) {
return new jQuery.Event( src, props );
}
if ( src && src.type ) {
this.originalEvent = src;
this.type = src.type;
this.isDefaultPrevented = src.defaultPrevented ||
src.defaultPrevented === undefined &&
src.returnValue === false ?
returnTrue :
returnFalse;
} else {
this.type = src;
}
if ( props ) {
jQuery.extend( this, props );
}
this.timeStamp = src && src.timeStamp || jQuery.now();
this[ jQuery.expando ] = true;
};
jQuery.Event.prototype = {
isDefaultPrevented: returnFalse,
isPropagationStopped: returnFalse,
isImmediatePropagationStopped: returnFalse,
preventDefault: function() {
var e = this.originalEvent;
this.isDefaultPrevented = returnTrue;
if ( !e ) {
return;
}
if ( e.preventDefault ) {
e.preventDefault();
} else {
e.returnValue = false;
}
},
stopPropagation: function() {
var e = this.originalEvent;
this.isPropagationStopped = returnTrue;
if ( !e ) {
return;
}
if ( e.stopPropagation ) {
e.stopPropagation();
}
e.cancelBubble = true;
},
stopImmediatePropagation: function() {
var e = this.originalEvent;
this.isImmediatePropagationStopped = returnTrue;
if ( e && e.stopImmediatePropagation ) {
e.stopImmediatePropagation();
}
this.stopPropagation();
}
};
jQuery.each({
mouseenter: "mouseover",
mouseleave: "mouseout",
pointerenter: "pointerover",
pointerleave: "pointerout"
}, function( orig, fix ) {
jQuery.event.special[ orig ] = {
delegateType: fix,
bindType: fix,
handle: function( event ) {
var ret,
target = this,
related = event.relatedTarget,
handleObj = event.handleObj;
if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
event.type = handleObj.origType;
ret = handleObj.handler.apply( this, arguments );
event.type = fix;
}
return ret;
}
};
});
if ( !support.submitBubbles ) {
jQuery.event.special.submit = {
setup: function() {
if ( jQuery.nodeName( this, "form" ) ) {
return false;
}
jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
var elem = e.target,
form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
if ( form && !jQuery._data( form, "submitBubbles" ) ) {
jQuery.event.add( form, "submit._submit", function( event ) {
event._submit_bubble = true;
});
jQuery._data( form, "submitBubbles", true );
}
});
},
postDispatch: function( event ) {
if ( event._submit_bubble ) {
delete event._submit_bubble;
if ( this.parentNode && !event.isTrigger ) {
jQuery.event.simulate( "submit", this.parentNode, event, true );
}
}
},
teardown: function() {
if ( jQuery.nodeName( this, "form" ) ) {
return false;
}
jQuery.event.remove( this, "._submit" );
}
};
}
if ( !support.changeBubbles ) {
jQuery.event.special.change = {
setup: function() {
if ( rformElems.test( this.nodeName ) ) {
if ( this.type === "checkbox" || this.type === "radio" ) {
jQuery.event.add( this, "propertychange._change", function( event ) {
if ( event.originalEvent.propertyName === "checked" ) {
this._just_changed = true;
}
});
jQuery.event.add( this, "click._change", function( event ) {
if ( this._just_changed && !event.isTrigger ) {
this._just_changed = false;
}
jQuery.event.simulate( "change", this, event, true );
});
}
return false;
}
jQuery.event.add( this, "beforeactivate._change", function( e ) {
var elem = e.target;
if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
jQuery.event.add( elem, "change._change", function( event ) {
if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
jQuery.event.simulate( "change", this.parentNode, event, true );
}
});
jQuery._data( elem, "changeBubbles", true );
}
});
},
handle: function( event ) {
var elem = event.target;
if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
return event.handleObj.handler.apply( this, arguments );
}
},
teardown: function() {
jQuery.event.remove( this, "._change" );
return !rformElems.test( this.nodeName );
}
};
}
if ( !support.focusinBubbles ) {
jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
var handler = function( event ) {
jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
};
jQuery.event.special[ fix ] = {
setup: function() {
var doc = this.ownerDocument || this,
attaches = jQuery._data( doc, fix );
if ( !attaches ) {
doc.addEventListener( orig, handler, true );
}
jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
},
teardown: function() {
var doc = this.ownerDocument || this,
attaches = jQuery._data( doc, fix ) - 1;
if ( !attaches ) {
doc.removeEventListener( orig, handler, true );
jQuery._removeData( doc, fix );
} else {
jQuery._data( doc, fix, attaches );
}
}
};
});
}
jQuery.fn.extend({
on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
var type, origFn;
if ( typeof types === "object" ) {
if ( typeof selector !== "string" ) {
data = data || selector;
selector = undefined;
}
for ( type in types ) {
this.on( type, selector, data, types[ type ], one );
}
return this;
}
if ( data == null && fn == null ) {
fn = selector;
data = selector = undefined;
} else if ( fn == null ) {
if ( typeof selector === "string" ) {
fn = data;
data = undefined;
} else {
fn = data;
data = selector;
selector = undefined;
}
}
if ( fn === false ) {
fn = returnFalse;
} else if ( !fn ) {
return this;
}
if ( one === 1 ) {
origFn = fn;
fn = function( event ) {
jQuery().off( event );
return origFn.apply( this, arguments );
};
fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
}
return this.each( function() {
jQuery.event.add( this, types, fn, data, selector );
});
},
one: function( types, selector, data, fn ) {
return this.on( types, selector, data, fn, 1 );
},
off: function( types, selector, fn ) {
var handleObj, type;
if ( types && types.preventDefault && types.handleObj ) {
handleObj = types.handleObj;
jQuery( types.delegateTarget ).off(
handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
handleObj.selector,
handleObj.handler
);
return this;
}
if ( typeof types === "object" ) {
for ( type in types ) {
this.off( type, selector, types[ type ] );
}
return this;
}
if ( selector === false || typeof selector === "function" ) {
fn = selector;
selector = undefined;
}
if ( fn === false ) {
fn = returnFalse;
}
return this.each(function() {
jQuery.event.remove( this, types, fn, selector );
});
},
trigger: function( type, data ) {
return this.each(function() {
jQuery.event.trigger( type, data, this );
});
},
triggerHandler: function( type, data ) {
var elem = this[0];
if ( elem ) {
return jQuery.event.trigger( type, data, elem, true );
}
}
});
function createSafeFragment( document ) {
var list = nodeNames.split( "|" ),
safeFrag = document.createDocumentFragment();
if ( safeFrag.createElement ) {
while ( list.length ) {
safeFrag.createElement(
list.pop()
);
}
}
return safeFrag;
}
var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
rleadingWhitespace = /^\s+/,
rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
rtagName = /<([\w:]+)/,
rtbody = /<tbody/i,
rhtml = /<|&#?\w+;/,
rnoInnerhtml = /<(?:script|style|link)/i,
rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
rscriptType = /^$|\/(?:java|ecma)script/i,
rscriptTypeMasked = /^true\/(.*)/,
rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
wrapMap = {
option: [ 1, "<select multiple='multiple'>", "</select>" ],
legend: [ 1, "<fieldset>", "</fieldset>" ],
area: [ 1, "<map>", "</map>" ],
param: [ 1, "<object>", "</object>" ],
thead: [ 1, "<table>", "</table>" ],
tr: [ 2, "<table><tbody>", "</tbody></table>" ],
col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
},
safeFragment = createSafeFragment( document ),
fragmentDiv = safeFragment.appendChild( document.createElement("div") );
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;
function getAll( context, tag ) {
var elems, elem,
i = 0,
found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
undefined;
if ( !found ) {
for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
if ( !tag || jQuery.nodeName( elem, tag ) ) {
found.push( elem );
} else {
jQuery.merge( found, getAll( elem, tag ) );
}
}
}
return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
jQuery.merge( [ context ], found ) :
found;
}
function fixDefaultChecked( elem ) {
if ( rcheckableType.test( elem.type ) ) {
elem.defaultChecked = elem.checked;
}
}
function manipulationTarget( elem, content ) {
return jQuery.nodeName( elem, "table" ) &&
jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
elem.getElementsByTagName("tbody")[0] ||
elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
elem;
}
function disableScript( elem ) {
elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
return elem;
}
function restoreScript( elem ) {
var match = rscriptTypeMasked.exec( elem.type );
if ( match ) {
elem.type = match[1];
} else {
elem.removeAttribute("type");
}
return elem;
}
function setGlobalEval( elems, refElements ) {
var elem,
i = 0;
for ( ; (elem = elems[i]) != null; i++ ) {
jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
}
}
function cloneCopyEvent( src, dest ) {
if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
return;
}
var type, i, l,
oldData = jQuery._data( src ),
curData = jQuery._data( dest, oldData ),
events = oldData.events;
if ( events ) {
delete curData.handle;
curData.events = {};
for ( type in events ) {
for ( i = 0, l = events[ type ].length; i < l; i++ ) {
jQuery.event.add( dest, type, events[ type ][ i ] );
}
}
}
if ( curData.data ) {
curData.data = jQuery.extend( {}, curData.data );
}
}
function fixCloneNodeIssues( src, dest ) {
var nodeName, e, data;
if ( dest.nodeType !== 1 ) {
return;
}
nodeName = dest.nodeName.toLowerCase();
if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
data = jQuery._data( dest );
for ( e in data.events ) {
jQuery.removeEvent( dest, e, data.handle );
}
dest.removeAttribute( jQuery.expando );
}
if ( nodeName === "script" && dest.text !== src.text ) {
disableScript( dest ).text = src.text;
restoreScript( dest );
} else if ( nodeName === "object" ) {
if ( dest.parentNode ) {
dest.outerHTML = src.outerHTML;
}
if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
dest.innerHTML = src.innerHTML;
}
} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
dest.defaultChecked = dest.checked = src.checked;
if ( dest.value !== src.value ) {
dest.value = src.value;
}
} else if ( nodeName === "option" ) {
dest.defaultSelected = dest.selected = src.defaultSelected;
} else if ( nodeName === "input" || nodeName === "textarea" ) {
dest.defaultValue = src.defaultValue;
}
}
jQuery.extend({
clone: function( elem, dataAndEvents, deepDataAndEvents ) {
var destElements, node, clone, i, srcElements,
inPage = jQuery.contains( elem.ownerDocument, elem );
if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
clone = elem.cloneNode( true );
} else {
fragmentDiv.innerHTML = elem.outerHTML;
fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
}
if ( (!support.noCloneEvent || !support.noCloneChecked) &&
(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
destElements = getAll( clone );
srcElements = getAll( elem );
for ( i = 0; (node = srcElements[i]) != null; ++i ) {
if ( destElements[i] ) {
fixCloneNodeIssues( node, destElements[i] );
}
}
}
if ( dataAndEvents ) {
if ( deepDataAndEvents ) {
srcElements = srcElements || getAll( elem );
destElements = destElements || getAll( clone );
for ( i = 0; (node = srcElements[i]) != null; i++ ) {
cloneCopyEvent( node, destElements[i] );
}
} else {
cloneCopyEvent( elem, clone );
}
}
destElements = getAll( clone, "script" );
if ( destElements.length > 0 ) {
setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
}
destElements = srcElements = node = null;
return clone;
},
buildFragment: function( elems, context, scripts, selection ) {
var j, elem, contains,
tmp, tag, tbody, wrap,
l = elems.length,
safe = createSafeFragment( context ),
nodes = [],
i = 0;
for ( ; i < l; i++ ) {
elem = elems[ i ];
if ( elem || elem === 0 ) {
if ( jQuery.type( elem ) === "object" ) {
jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
} else if ( !rhtml.test( elem ) ) {
nodes.push( context.createTextNode( elem ) );
} else {
tmp = tmp || safe.appendChild( context.createElement("div") );
tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
wrap = wrapMap[ tag ] || wrapMap._default;
tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];
j = wrap[0];
while ( j-- ) {
tmp = tmp.lastChild;
}
if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
}
if ( !support.tbody ) {
elem = tag === "table" && !rtbody.test( elem ) ?
tmp.firstChild :
wrap[1] === "<table>" && !rtbody.test( elem ) ?
tmp :
0;
j = elem && elem.childNodes.length;
while ( j-- ) {
if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
elem.removeChild( tbody );
}
}
}
jQuery.merge( nodes, tmp.childNodes );
tmp.textContent = "";
while ( tmp.firstChild ) {
tmp.removeChild( tmp.firstChild );
}
tmp = safe.lastChild;
}
}
}
if ( tmp ) {
safe.removeChild( tmp );
}
if ( !support.appendChecked ) {
jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
}
i = 0;
while ( (elem = nodes[ i++ ]) ) {
if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
continue;
}
contains = jQuery.contains( elem.ownerDocument, elem );
tmp = getAll( safe.appendChild( elem ), "script" );
if ( contains ) {
setGlobalEval( tmp );
}
if ( scripts ) {
j = 0;
while ( (elem = tmp[ j++ ]) ) {
if ( rscriptType.test( elem.type || "" ) ) {
scripts.push( elem );
}
}
}
}
tmp = null;
return safe;
},
cleanData: function( elems, /* internal */ acceptData ) {
var elem, type, id, data,
i = 0,
internalKey = jQuery.expando,
cache = jQuery.cache,
deleteExpando = support.deleteExpando,
special = jQuery.event.special;
for ( ; (elem = elems[i]) != null; i++ ) {
if ( acceptData || jQuery.acceptData( elem ) ) {
id = elem[ internalKey ];
data = id && cache[ id ];
if ( data ) {
if ( data.events ) {
for ( type in data.events ) {
if ( special[ type ] ) {
jQuery.event.remove( elem, type );
} else {
jQuery.removeEvent( elem, type, data.handle );
}
}
}
if ( cache[ id ] ) {
delete cache[ id ];
if ( deleteExpando ) {
delete elem[ internalKey ];
} else if ( typeof elem.removeAttribute !== strundefined ) {
elem.removeAttribute( internalKey );
} else {
elem[ internalKey ] = null;
}
deletedIds.push( id );
}
}
}
}
}
});
jQuery.fn.extend({
text: function( value ) {
return access( this, function( value ) {
return value === undefined ?
jQuery.text( this ) :
this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
}, null, value, arguments.length );
},
append: function() {
return this.domManip( arguments, function( elem ) {
if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
var target = manipulationTarget( this, elem );
target.appendChild( elem );
}
});
},
prepend: function() {
return this.domManip( arguments, function( elem ) {
if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
var target = manipulationTarget( this, elem );
target.insertBefore( elem, target.firstChild );
}
});
},
before: function() {
return this.domManip( arguments, function( elem ) {
if ( this.parentNode ) {
this.parentNode.insertBefore( elem, this );
}
});
},
after: function() {
return this.domManip( arguments, function( elem ) {
if ( this.parentNode ) {
this.parentNode.insertBefore( elem, this.nextSibling );
}
});
},
remove: function( selector, keepData /* Internal Use Only */ ) {
var elem,
elems = selector ? jQuery.filter( selector, this ) : this,
i = 0;
for ( ; (elem = elems[i]) != null; i++ ) {
if ( !keepData && elem.nodeType === 1 ) {
jQuery.cleanData( getAll( elem ) );
}
if ( elem.parentNode ) {
if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
setGlobalEval( getAll( elem, "script" ) );
}
elem.parentNode.removeChild( elem );
}
}
return this;
},
empty: function() {
var elem,
i = 0;
for ( ; (elem = this[i]) != null; i++ ) {
if ( elem.nodeType === 1 ) {
jQuery.cleanData( getAll( elem, false ) );
}
while ( elem.firstChild ) {
elem.removeChild( elem.firstChild );
}
if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
elem.options.length = 0;
}
}
return this;
},
clone: function( dataAndEvents, deepDataAndEvents ) {
dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
return this.map(function() {
return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
});
},
html: function( value ) {
return access( this, function( value ) {
var elem = this[ 0 ] || {},
i = 0,
l = this.length;
if ( value === undefined ) {
return elem.nodeType === 1 ?
elem.innerHTML.replace( rinlinejQuery, "" ) :
undefined;
}
if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {
value = value.replace( rxhtmlTag, "<$1></$2>" );
try {
for (; i < l; i++ ) {
elem = this[i] || {};
if ( elem.nodeType === 1 ) {
jQuery.cleanData( getAll( elem, false ) );
elem.innerHTML = value;
}
}
elem = 0;
} catch(e) {}
}
if ( elem ) {
this.empty().append( value );
}
}, null, value, arguments.length );
},
replaceWith: function() {
var arg = arguments[ 0 ];
this.domManip( arguments, function( elem ) {
arg = this.parentNode;
jQuery.cleanData( getAll( this ) );
if ( arg ) {
arg.replaceChild( elem, this );
}
});
return arg && (arg.length || arg.nodeType) ? this : this.remove();
},
detach: function( selector ) {
return this.remove( selector, true );
},
domManip: function( args, callback ) {
args = concat.apply( [], args );
var first, node, hasScripts,
scripts, doc, fragment,
i = 0,
l = this.length,
set = this,
iNoClone = l - 1,
value = args[0],
isFunction = jQuery.isFunction( value );
if ( isFunction ||
( l > 1 && typeof value === "string" &&
!support.checkClone && rchecked.test( value ) ) ) {
return this.each(function( index ) {
var self = set.eq( index );
if ( isFunction ) {
args[0] = value.call( this, index, self.html() );
}
self.domManip( args, callback );
});
}
if ( l ) {
fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
first = fragment.firstChild;
if ( fragment.childNodes.length === 1 ) {
fragment = first;
}
if ( first ) {
scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
hasScripts = scripts.length;
for ( ; i < l; i++ ) {
node = fragment;
if ( i !== iNoClone ) {
node = jQuery.clone( node, true, true );
if ( hasScripts ) {
jQuery.merge( scripts, getAll( node, "script" ) );
}
}
callback.call( this[i], node, i );
}
if ( hasScripts ) {
doc = scripts[ scripts.length - 1 ].ownerDocument;
jQuery.map( scripts, restoreScript );
for ( i = 0; i < hasScripts; i++ ) {
node = scripts[ i ];
if ( rscriptType.test( node.type || "" ) &&
!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {
if ( node.src ) {
if ( jQuery._evalUrl ) {
jQuery._evalUrl( node.src );
}
} else {
jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
}
}
}
}
fragment = first = null;
}
}
return this;
}
});
jQuery.each({
appendTo: "append",
prependTo: "prepend",
insertBefore: "before",
insertAfter: "after",
replaceAll: "replaceWith"
}, function( name, original ) {
jQuery.fn[ name ] = function( selector ) {
var elems,
i = 0,
ret = [],
insert = jQuery( selector ),
last = insert.length - 1;
for ( ; i <= last; i++ ) {
elems = i === last ? this : this.clone(true);
jQuery( insert[i] )[ original ]( elems );
push.apply( ret, elems.get() );
}
return this.pushStack( ret );
};
});
var iframe,
elemdisplay = {};
/**
* Retrieve the actual display of a element
* @param {String} name nodeName of the element
* @param {Object} doc Document object
*/
function actualDisplay( name, doc ) {
var style,
elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?
style.display : jQuery.css( elem[ 0 ], "display" );
elem.detach();
return display;
}
/**
* Try to determine the default display value of an element
* @param {String} nodeName
*/
function defaultDisplay( nodeName ) {
var doc = document,
display = elemdisplay[ nodeName ];
if ( !display ) {
display = actualDisplay( nodeName, doc );
if ( display === "none" || !display ) {
iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );
doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;
doc.write();
doc.close();
display = actualDisplay( nodeName, doc );
iframe.detach();
}
elemdisplay[ nodeName ] = display;
}
return display;
}
(function() {
var shrinkWrapBlocksVal;
support.shrinkWrapBlocks = function() {
if ( shrinkWrapBlocksVal != null ) {
return shrinkWrapBlocksVal;
}
shrinkWrapBlocksVal = false;
var div, body, container;
body = document.getElementsByTagName( "body" )[ 0 ];
if ( !body || !body.style ) {
return;
}
div = document.createElement( "div" );
container = document.createElement( "div" );
container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
body.appendChild( container ).appendChild( div );
if ( typeof div.style.zoom !== strundefined ) {
div.style.cssText =
"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
"box-sizing:content-box;display:block;margin:0;border:0;" +
"padding:1px;width:1px;zoom:1";
div.appendChild( document.createElement( "div" ) ).style.width = "5px";
shrinkWrapBlocksVal = div.offsetWidth !== 3;
}
body.removeChild( container );
return shrinkWrapBlocksVal;
};
})();
var rmargin = (/^margin/);
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
var getStyles, curCSS,
rposition = /^(top|right|bottom|left)$/;
if ( window.getComputedStyle ) {
getStyles = function( elem ) {
if ( elem.ownerDocument.defaultView.opener ) {
return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
}
return window.getComputedStyle( elem, null );
};
curCSS = function( elem, name, computed ) {
var width, minWidth, maxWidth, ret,
style = elem.style;
computed = computed || getStyles( elem );
ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;
if ( computed ) {
if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
ret = jQuery.style( elem, name );
}
if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
width = style.width;
minWidth = style.minWidth;
maxWidth = style.maxWidth;
style.minWidth = style.maxWidth = style.width = ret;
ret = computed.width;
style.width = width;
style.minWidth = minWidth;
style.maxWidth = maxWidth;
}
}
return ret === undefined ?
ret :
ret + "";
};
} else if ( document.documentElement.currentStyle ) {
getStyles = function( elem ) {
return elem.currentStyle;
};
curCSS = function( elem, name, computed ) {
var left, rs, rsLeft, ret,
style = elem.style;
computed = computed || getStyles( elem );
ret = computed ? computed[ name ] : undefined;
if ( ret == null && style && style[ name ] ) {
ret = style[ name ];
}
if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {
left = style.left;
rs = elem.runtimeStyle;
rsLeft = rs && rs.left;
if ( rsLeft ) {
rs.left = elem.currentStyle.left;
}
style.left = name === "fontSize" ? "1em" : ret;
ret = style.pixelLeft + "px";
style.left = left;
if ( rsLeft ) {
rs.left = rsLeft;
}
}
return ret === undefined ?
ret :
ret + "" || "auto";
};
}
function addGetHookIf( conditionFn, hookFn ) {
return {
get: function() {
var condition = conditionFn();
if ( condition == null ) {
return;
}
if ( condition ) {
delete this.get;
return;
}
return (this.get = hookFn).apply( this, arguments );
}
};
}
(function() {
var div, style, a, pixelPositionVal, boxSizingReliableVal,
reliableHiddenOffsetsVal, reliableMarginRightVal;
div = document.createElement( "div" );
div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
a = div.getElementsByTagName( "a" )[ 0 ];
style = a && a.style;
if ( !style ) {
return;
}
style.cssText = "float:left;opacity:.5";
support.opacity = style.opacity === "0.5";
support.cssFloat = !!style.cssFloat;
div.style.backgroundClip = "content-box";
div.cloneNode( true ).style.backgroundClip = "";
support.clearCloneStyle = div.style.backgroundClip === "content-box";
support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
style.WebkitBoxSizing === "";
jQuery.extend(support, {
reliableHiddenOffsets: function() {
if ( reliableHiddenOffsetsVal == null ) {
computeStyleTests();
}
return reliableHiddenOffsetsVal;
},
boxSizingReliable: function() {
if ( boxSizingReliableVal == null ) {
computeStyleTests();
}
return boxSizingReliableVal;
},
pixelPosition: function() {
if ( pixelPositionVal == null ) {
computeStyleTests();
}
return pixelPositionVal;
},
reliableMarginRight: function() {
if ( reliableMarginRightVal == null ) {
computeStyleTests();
}
return reliableMarginRightVal;
}
});
function computeStyleTests() {
var div, body, container, contents;
body = document.getElementsByTagName( "body" )[ 0 ];
if ( !body || !body.style ) {
return;
}
div = document.createElement( "div" );
container = document.createElement( "div" );
container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
body.appendChild( container ).appendChild( div );
div.style.cssText =
"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
"border:1px;padding:1px;width:4px;position:absolute";
pixelPositionVal = boxSizingReliableVal = false;
reliableMarginRightVal = true;
if ( window.getComputedStyle ) {
pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
boxSizingReliableVal =
( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
contents = div.appendChild( document.createElement( "div" ) );
contents.style.cssText = div.style.cssText =
"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
contents.style.marginRight = contents.style.width = "0";
div.style.width = "1px";
reliableMarginRightVal =
!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
div.removeChild( contents );
}
div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
contents = div.getElementsByTagName( "td" );
contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
if ( reliableHiddenOffsetsVal ) {
contents[ 0 ].style.display = "";
contents[ 1 ].style.display = "none";
reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
}
body.removeChild( container );
}
})();
jQuery.swap = function( elem, options, callback, args ) {
var ret, name,
old = {};
for ( name in options ) {
old[ name ] = elem.style[ name ];
elem.style[ name ] = options[ name ];
}
ret = callback.apply( elem, args || [] );
for ( name in options ) {
elem.style[ name ] = old[ name ];
}
return ret;
};
var
ralpha = /alpha\([^)]*\)/i,
ropacity = /opacity\s*=\s*([^)]*)/,
rdisplayswap = /^(none|table(?!-c[ea]).+)/,
rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),
cssShow = { position: "absolute", visibility: "hidden", display: "block" },
cssNormalTransform = {
letterSpacing: "0",
fontWeight: "400"
},
cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
function vendorPropName( style, name ) {
if ( name in style ) {
return name;
}
var capName = name.charAt(0).toUpperCase() + name.slice(1),
origName = name,
i = cssPrefixes.length;
while ( i-- ) {
name = cssPrefixes[ i ] + capName;
if ( name in style ) {
return name;
}
}
return origName;
}
function showHide( elements, show ) {
var display, elem, hidden,
values = [],
index = 0,
length = elements.length;
for ( ; index < length; index++ ) {
elem = elements[ index ];
if ( !elem.style ) {
continue;
}
values[ index ] = jQuery._data( elem, "olddisplay" );
display = elem.style.display;
if ( show ) {
if ( !values[ index ] && display === "none" ) {
elem.style.display = "";
}
if ( elem.style.display === "" && isHidden( elem ) ) {
values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
}
} else {
hidden = isHidden( elem );
if ( display && display !== "none" || !hidden ) {
jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
}
}
}
for ( index = 0; index < length; index++ ) {
elem = elements[ index ];
if ( !elem.style ) {
continue;
}
if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
elem.style.display = show ? values[ index ] || "" : "none";
}
}
return elements;
}
function setPositiveNumber( elem, value, subtract ) {
var matches = rnumsplit.exec( value );
return matches ?
Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
value;
}
function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
var i = extra === ( isBorderBox ? "border" : "content" ) ?
4 :
name === "width" ? 1 : 0,
val = 0;
for ( ; i < 4; i += 2 ) {
if ( extra === "margin" ) {
val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
}
if ( isBorderBox ) {
if ( extra === "content" ) {
val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
}
if ( extra !== "margin" ) {
val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
}
} else {
val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
if ( extra !== "padding" ) {
val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
}
}
}
return val;
}
function getWidthOrHeight( elem, name, extra ) {
var valueIsBorderBox = true,
val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
styles = getStyles( elem ),
isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
if ( val <= 0 || val == null ) {
val = curCSS( elem, name, styles );
if ( val < 0 || val == null ) {
val = elem.style[ name ];
}
if ( rnumnonpx.test(val) ) {
return val;
}
valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );
val = parseFloat( val ) || 0;
}
return ( val +
augmentWidthOrHeight(
elem,
name,
extra || ( isBorderBox ? "border" : "content" ),
valueIsBorderBox,
styles
)
) + "px";
}
jQuery.extend({
cssHooks: {
opacity: {
get: function( elem, computed ) {
if ( computed ) {
var ret = curCSS( elem, "opacity" );
return ret === "" ? "1" : ret;
}
}
}
},
cssNumber: {
"columnCount": true,
"fillOpacity": true,
"flexGrow": true,
"flexShrink": true,
"fontWeight": true,
"lineHeight": true,
"opacity": true,
"order": true,
"orphans": true,
"widows": true,
"zIndex": true,
"zoom": true
},
cssProps: {
"float": support.cssFloat ? "cssFloat" : "styleFloat"
},
style: function( elem, name, value, extra ) {
if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
return;
}
var ret, type, hooks,
origName = jQuery.camelCase( name ),
style = elem.style;
name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );
hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
if ( value !== undefined ) {
type = typeof value;
if ( type === "string" && (ret = rrelNum.exec( value )) ) {
value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
type = "number";
}
if ( value == null || value !== value ) {
return;
}
if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
value += "px";
}
if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
style[ name ] = "inherit";
}
if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
try {
style[ name ] = value;
} catch(e) {}
}
} else {
if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
return ret;
}
return style[ name ];
}
},
css: function( elem, name, extra, styles ) {
var num, val, hooks,
origName = jQuery.camelCase( name );
name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );
hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
if ( hooks && "get" in hooks ) {
val = hooks.get( elem, true, extra );
}
if ( val === undefined ) {
val = curCSS( elem, name, styles );
}
if ( val === "normal" && name in cssNormalTransform ) {
val = cssNormalTransform[ name ];
}
if ( extra === "" || extra ) {
num = parseFloat( val );
return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
}
return val;
}
});
jQuery.each([ "height", "width" ], function( i, name ) {
jQuery.cssHooks[ name ] = {
get: function( elem, computed, extra ) {
if ( computed ) {
return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
jQuery.swap( elem, cssShow, function() {
return getWidthOrHeight( elem, name, extra );
}) :
getWidthOrHeight( elem, name, extra );
}
},
set: function( elem, value, extra ) {
var styles = extra && getStyles( elem );
return setPositiveNumber( elem, value, extra ?
augmentWidthOrHeight(
elem,
name,
extra,
support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
styles
) : 0
);
}
};
});
if ( !support.opacity ) {
jQuery.cssHooks.opacity = {
get: function( elem, computed ) {
return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
computed ? "1" : "";
},
set: function( elem, value ) {
var style = elem.style,
currentStyle = elem.currentStyle,
opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
filter = currentStyle && currentStyle.filter || style.filter || "";
style.zoom = 1;
if ( ( value >= 1 || value === "" ) &&
jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
style.removeAttribute ) {
style.removeAttribute( "filter" );
if ( value === "" || currentStyle && !currentStyle.filter ) {
return;
}
}
style.filter = ralpha.test( filter ) ?
filter.replace( ralpha, opacity ) :
filter + " " + opacity;
}
};
}
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
function( elem, computed ) {
if ( computed ) {
return jQuery.swap( elem, { "display": "inline-block" },
curCSS, [ elem, "marginRight" ] );
}
}
);
jQuery.each({
margin: "",
padding: "",
border: "Width"
}, function( prefix, suffix ) {
jQuery.cssHooks[ prefix + suffix ] = {
expand: function( value ) {
var i = 0,
expanded = {},
parts = typeof value === "string" ? value.split(" ") : [ value ];
for ( ; i < 4; i++ ) {
expanded[ prefix + cssExpand[ i ] + suffix ] =
parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
}
return expanded;
}
};
if ( !rmargin.test( prefix ) ) {
jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
}
});
jQuery.fn.extend({
css: function( name, value ) {
return access( this, function( elem, name, value ) {
var styles, len,
map = {},
i = 0;
if ( jQuery.isArray( name ) ) {
styles = getStyles( elem );
len = name.length;
for ( ; i < len; i++ ) {
map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
}
return map;
}
return value !== undefined ?
jQuery.style( elem, name, value ) :
jQuery.css( elem, name );
}, name, value, arguments.length > 1 );
},
show: function() {
return showHide( this, true );
},
hide: function() {
return showHide( this );
},
toggle: function( state ) {
if ( typeof state === "boolean" ) {
return state ? this.show() : this.hide();
}
return this.each(function() {
if ( isHidden( this ) ) {
jQuery( this ).show();
} else {
jQuery( this ).hide();
}
});
}
});
function Tween( elem, options, prop, end, easing ) {
return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;
Tween.prototype = {
constructor: Tween,
init: function( elem, options, prop, end, easing, unit ) {
this.elem = elem;
this.prop = prop;
this.easing = easing || "swing";
this.options = options;
this.start = this.now = this.cur();
this.end = end;
this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
},
cur: function() {
var hooks = Tween.propHooks[ this.prop ];
return hooks && hooks.get ?
hooks.get( this ) :
Tween.propHooks._default.get( this );
},
run: function( percent ) {
var eased,
hooks = Tween.propHooks[ this.prop ];
if ( this.options.duration ) {
this.pos = eased = jQuery.easing[ this.easing ](
percent, this.options.duration * percent, 0, 1, this.options.duration
);
} else {
this.pos = eased = percent;
}
this.now = ( this.end - this.start ) * eased + this.start;
if ( this.options.step ) {
this.options.step.call( this.elem, this.now, this );
}
if ( hooks && hooks.set ) {
hooks.set( this );
} else {
Tween.propHooks._default.set( this );
}
return this;
}
};
Tween.prototype.init.prototype = Tween.prototype;
Tween.propHooks = {
_default: {
get: function( tween ) {
var result;
if ( tween.elem[ tween.prop ] != null &&
(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
return tween.elem[ tween.prop ];
}
result = jQuery.css( tween.elem, tween.prop, "" );
return !result || result === "auto" ? 0 : result;
},
set: function( tween ) {
if ( jQuery.fx.step[ tween.prop ] ) {
jQuery.fx.step[ tween.prop ]( tween );
} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
} else {
tween.elem[ tween.prop ] = tween.now;
}
}
}
};
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
set: function( tween ) {
if ( tween.elem.nodeType && tween.elem.parentNode ) {
tween.elem[ tween.prop ] = tween.now;
}
}
};
jQuery.easing = {
linear: function( p ) {
return p;
},
swing: function( p ) {
return 0.5 - Math.cos( p * Math.PI ) / 2;
}
};
jQuery.fx = Tween.prototype.init;
jQuery.fx.step = {};
var
fxNow, timerId,
rfxtypes = /^(?:toggle|show|hide)$/,
rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
rrun = /queueHooks$/,
animationPrefilters = [ defaultPrefilter ],
tweeners = {
"*": [ function( prop, value ) {
var tween = this.createTween( prop, value ),
target = tween.cur(),
parts = rfxnum.exec( value ),
unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
rfxnum.exec( jQuery.css( tween.elem, prop ) ),
scale = 1,
maxIterations = 20;
if ( start && start[ 3 ] !== unit ) {
unit = unit || start[ 3 ];
parts = parts || [];
start = +target || 1;
do {
scale = scale || ".5";
start = start / scale;
jQuery.style( tween.elem, prop, start + unit );
} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
}
if ( parts ) {
start = tween.start = +start || +target || 0;
tween.unit = unit;
tween.end = parts[ 1 ] ?
start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
+parts[ 2 ];
}
return tween;
} ]
};
function createFxNow() {
setTimeout(function() {
fxNow = undefined;
});
return ( fxNow = jQuery.now() );
}
function genFx( type, includeWidth ) {
var which,
attrs = { height: type },
i = 0;
includeWidth = includeWidth ? 1 : 0;
for ( ; i < 4 ; i += 2 - includeWidth ) {
which = cssExpand[ i ];
attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
}
if ( includeWidth ) {
attrs.opacity = attrs.width = type;
}
return attrs;
}
function createTween( value, prop, animation ) {
var tween,
collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
index = 0,
length = collection.length;
for ( ; index < length; index++ ) {
if ( (tween = collection[ index ].call( animation, prop, value )) ) {
return tween;
}
}
}
function defaultPrefilter( elem, props, opts ) {
/* jshint validthis: true */
var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
anim = this,
orig = {},
style = elem.style,
hidden = elem.nodeType && isHidden( elem ),
dataShow = jQuery._data( elem, "fxshow" );
if ( !opts.queue ) {
hooks = jQuery._queueHooks( elem, "fx" );
if ( hooks.unqueued == null ) {
hooks.unqueued = 0;
oldfire = hooks.empty.fire;
hooks.empty.fire = function() {
if ( !hooks.unqueued ) {
oldfire();
}
};
}
hooks.unqueued++;
anim.always(function() {
anim.always(function() {
hooks.unqueued--;
if ( !jQuery.queue( elem, "fx" ).length ) {
hooks.empty.fire();
}
});
});
}
if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
display = jQuery.css( elem, "display" );
checkDisplay = display === "none" ?
jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;
if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
style.display = "inline-block";
} else {
style.zoom = 1;
}
}
}
if ( opts.overflow ) {
style.overflow = "hidden";
if ( !support.shrinkWrapBlocks() ) {
anim.always(function() {
style.overflow = opts.overflow[ 0 ];
style.overflowX = opts.overflow[ 1 ];
style.overflowY = opts.overflow[ 2 ];
});
}
}
for ( prop in props ) {
value = props[ prop ];
if ( rfxtypes.exec( value ) ) {
delete props[ prop ];
toggle = toggle || value === "toggle";
if ( value === ( hidden ? "hide" : "show" ) ) {
if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
hidden = true;
} else {
continue;
}
}
orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
} else {
display = undefined;
}
}
if ( !jQuery.isEmptyObject( orig ) ) {
if ( dataShow ) {
if ( "hidden" in dataShow ) {
hidden = dataShow.hidden;
}
} else {
dataShow = jQuery._data( elem, "fxshow", {} );
}
if ( toggle ) {
dataShow.hidden = !hidden;
}
if ( hidden ) {
jQuery( elem ).show();
} else {
anim.done(function() {
jQuery( elem ).hide();
});
}
anim.done(function() {
var prop;
jQuery._removeData( elem, "fxshow" );
for ( prop in orig ) {
jQuery.style( elem, prop, orig[ prop ] );
}
});
for ( prop in orig ) {
tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
if ( !( prop in dataShow ) ) {
dataShow[ prop ] = tween.start;
if ( hidden ) {
tween.end = tween.start;
tween.start = prop === "width" || prop === "height" ? 1 : 0;
}
}
}
} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
style.display = display;
}
}
function propFilter( props, specialEasing ) {
var index, name, easing, value, hooks;
for ( index in props ) {
name = jQuery.camelCase( index );
easing = specialEasing[ name ];
value = props[ index ];
if ( jQuery.isArray( value ) ) {
easing = value[ 1 ];
value = props[ index ] = value[ 0 ];
}
if ( index !== name ) {
props[ name ] = value;
delete props[ index ];
}
hooks = jQuery.cssHooks[ name ];
if ( hooks && "expand" in hooks ) {
value = hooks.expand( value );
delete props[ name ];
for ( index in value ) {
if ( !( index in props ) ) {
props[ index ] = value[ index ];
specialEasing[ index ] = easing;
}
}
} else {
specialEasing[ name ] = easing;
}
}
}
function Animation( elem, properties, options ) {
var result,
stopped,
index = 0,
length = animationPrefilters.length,
deferred = jQuery.Deferred().always( function() {
delete tick.elem;
}),
tick = function() {
if ( stopped ) {
return false;
}
var currentTime = fxNow || createFxNow(),
remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
temp = remaining / animation.duration || 0,
percent = 1 - temp,
index = 0,
length = animation.tweens.length;
for ( ; index < length ; index++ ) {
animation.tweens[ index ].run( percent );
}
deferred.notifyWith( elem, [ animation, percent, remaining ]);
if ( percent < 1 && length ) {
return remaining;
} else {
deferred.resolveWith( elem, [ animation ] );
return false;
}
},
animation = deferred.promise({
elem: elem,
props: jQuery.extend( {}, properties ),
opts: jQuery.extend( true, { specialEasing: {} }, options ),
originalProperties: properties,
originalOptions: options,
startTime: fxNow || createFxNow(),
duration: options.duration,
tweens: [],
createTween: function( prop, end ) {
var tween = jQuery.Tween( elem, animation.opts, prop, end,
animation.opts.specialEasing[ prop ] || animation.opts.easing );
animation.tweens.push( tween );
return tween;
},
stop: function( gotoEnd ) {
var index = 0,
length = gotoEnd ? animation.tweens.length : 0;
if ( stopped ) {
return this;
}
stopped = true;
for ( ; index < length ; index++ ) {
animation.tweens[ index ].run( 1 );
}
if ( gotoEnd ) {
deferred.resolveWith( elem, [ animation, gotoEnd ] );
} else {
deferred.rejectWith( elem, [ animation, gotoEnd ] );
}
return this;
}
}),
props = animation.props;
propFilter( props, animation.opts.specialEasing );
for ( ; index < length ; index++ ) {
result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
if ( result ) {
return result;
}
}
jQuery.map( props, createTween, animation );
if ( jQuery.isFunction( animation.opts.start ) ) {
animation.opts.start.call( elem, animation );
}
jQuery.fx.timer(
jQuery.extend( tick, {
elem: elem,
anim: animation,
queue: animation.opts.queue
})
);
return animation.progress( animation.opts.progress )
.done( animation.opts.done, animation.opts.complete )
.fail( animation.opts.fail )
.always( animation.opts.always );
}
jQuery.Animation = jQuery.extend( Animation, {
tweener: function( props, callback ) {
if ( jQuery.isFunction( props ) ) {
callback = props;
props = [ "*" ];
} else {
props = props.split(" ");
}
var prop,
index = 0,
length = props.length;
for ( ; index < length ; index++ ) {
prop = props[ index ];
tweeners[ prop ] = tweeners[ prop ] || [];
tweeners[ prop ].unshift( callback );
}
},
prefilter: function( callback, prepend ) {
if ( prepend ) {
animationPrefilters.unshift( callback );
} else {
animationPrefilters.push( callback );
}
}
});
jQuery.speed = function( speed, easing, fn ) {
var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
complete: fn || !fn && easing ||
jQuery.isFunction( speed ) && speed,
duration: speed,
easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
};
opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
if ( opt.queue == null || opt.queue === true ) {
opt.queue = "fx";
}
opt.old = opt.complete;
opt.complete = function() {
if ( jQuery.isFunction( opt.old ) ) {
opt.old.call( this );
}
if ( opt.queue ) {
jQuery.dequeue( this, opt.queue );
}
};
return opt;
};
jQuery.fn.extend({
fadeTo: function( speed, to, easing, callback ) {
return this.filter( isHidden ).css( "opacity", 0 ).show()
.end().animate({ opacity: to }, speed, easing, callback );
},
animate: function( prop, speed, easing, callback ) {
var empty = jQuery.isEmptyObject( prop ),
optall = jQuery.speed( speed, easing, callback ),
doAnimation = function() {
var anim = Animation( this, jQuery.extend( {}, prop ), optall );
if ( empty || jQuery._data( this, "finish" ) ) {
anim.stop( true );
}
};
doAnimation.finish = doAnimation;
return empty || optall.queue === false ?
this.each( doAnimation ) :
this.queue( optall.queue, doAnimation );
},
stop: function( type, clearQueue, gotoEnd ) {
var stopQueue = function( hooks ) {
var stop = hooks.stop;
delete hooks.stop;
stop( gotoEnd );
};
if ( typeof type !== "string" ) {
gotoEnd = clearQueue;
clearQueue = type;
type = undefined;
}
if ( clearQueue && type !== false ) {
this.queue( type || "fx", [] );
}
return this.each(function() {
var dequeue = true,
index = type != null && type + "queueHooks",
timers = jQuery.timers,
data = jQuery._data( this );
if ( index ) {
if ( data[ index ] && data[ index ].stop ) {
stopQueue( data[ index ] );
}
} else {
for ( index in data ) {
if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
stopQueue( data[ index ] );
}
}
}
for ( index = timers.length; index--; ) {
if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
timers[ index ].anim.stop( gotoEnd );
dequeue = false;
timers.splice( index, 1 );
}
}
if ( dequeue || !gotoEnd ) {
jQuery.dequeue( this, type );
}
});
},
finish: function( type ) {
if ( type !== false ) {
type = type || "fx";
}
return this.each(function() {
var index,
data = jQuery._data( this ),
queue = data[ type + "queue" ],
hooks = data[ type + "queueHooks" ],
timers = jQuery.timers,
length = queue ? queue.length : 0;
data.finish = true;
jQuery.queue( this, type, [] );
if ( hooks && hooks.stop ) {
hooks.stop.call( this, true );
}
for ( index = timers.length; index--; ) {
if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
timers[ index ].anim.stop( true );
timers.splice( index, 1 );
}
}
for ( index = 0; index < length; index++ ) {
if ( queue[ index ] && queue[ index ].finish ) {
queue[ index ].finish.call( this );
}
}
delete data.finish;
});
}
});
jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
var cssFn = jQuery.fn[ name ];
jQuery.fn[ name ] = function( speed, easing, callback ) {
return speed == null || typeof speed === "boolean" ?
cssFn.apply( this, arguments ) :
this.animate( genFx( name, true ), speed, easing, callback );
};
});
jQuery.each({
slideDown: genFx("show"),
slideUp: genFx("hide"),
slideToggle: genFx("toggle"),
fadeIn: { opacity: "show" },
fadeOut: { opacity: "hide" },
fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
jQuery.fn[ name ] = function( speed, easing, callback ) {
return this.animate( props, speed, easing, callback );
};
});
jQuery.timers = [];
jQuery.fx.tick = function() {
var timer,
timers = jQuery.timers,
i = 0;
fxNow = jQuery.now();
for ( ; i < timers.length; i++ ) {
timer = timers[ i ];
if ( !timer() && timers[ i ] === timer ) {
timers.splice( i--, 1 );
}
}
if ( !timers.length ) {
jQuery.fx.stop();
}
fxNow = undefined;
};
jQuery.fx.timer = function( timer ) {
jQuery.timers.push( timer );
if ( timer() ) {
jQuery.fx.start();
} else {
jQuery.timers.pop();
}
};
jQuery.fx.interval = 13;
jQuery.fx.start = function() {
if ( !timerId ) {
timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
}
};
jQuery.fx.stop = function() {
clearInterval( timerId );
timerId = null;
};
jQuery.fx.speeds = {
slow: 600,
fast: 200,
_default: 400
};
jQuery.fn.delay = function( time, type ) {
time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
type = type || "fx";
return this.queue( type, function( next, hooks ) {
var timeout = setTimeout( next, time );
hooks.stop = function() {
clearTimeout( timeout );
};
});
};
(function() {
var input, div, select, a, opt;
div = document.createElement( "div" );
div.setAttribute( "className", "t" );
div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
a = div.getElementsByTagName("a")[ 0 ];
select = document.createElement("select");
opt = select.appendChild( document.createElement("option") );
input = div.getElementsByTagName("input")[ 0 ];
a.style.cssText = "top:1px";
support.getSetAttribute = div.className !== "t";
support.style = /top/.test( a.getAttribute("style") );
support.hrefNormalized = a.getAttribute("href") === "/a";
support.checkOn = !!input.value;
support.optSelected = opt.selected;
support.enctype = !!document.createElement("form").enctype;
select.disabled = true;
support.optDisabled = !opt.disabled;
input = document.createElement( "input" );
input.setAttribute( "value", "" );
support.input = input.getAttribute( "value" ) === "";
input.value = "t";
input.setAttribute( "type", "radio" );
support.radioValue = input.value === "t";
})();
var rreturn = /\r/g;
jQuery.fn.extend({
val: function( value ) {
var hooks, ret, isFunction,
elem = this[0];
if ( !arguments.length ) {
if ( elem ) {
hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];
if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
return ret;
}
ret = elem.value;
return typeof ret === "string" ?
ret.replace(rreturn, "") :
ret == null ? "" : ret;
}
return;
}
isFunction = jQuery.isFunction( value );
return this.each(function( i ) {
var val;
if ( this.nodeType !== 1 ) {
return;
}
if ( isFunction ) {
val = value.call( this, i, jQuery( this ).val() );
} else {
val = value;
}
if ( val == null ) {
val = "";
} else if ( typeof val === "number" ) {
val += "";
} else if ( jQuery.isArray( val ) ) {
val = jQuery.map( val, function( value ) {
return value == null ? "" : value + "";
});
}
hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
this.value = val;
}
});
}
});
jQuery.extend({
valHooks: {
option: {
get: function( elem ) {
var val = jQuery.find.attr( elem, "value" );
return val != null ?
val :
jQuery.trim( jQuery.text( elem ) );
}
},
select: {
get: function( elem ) {
var value, option,
options = elem.options,
index = elem.selectedIndex,
one = elem.type === "select-one" || index < 0,
values = one ? null : [],
max = one ? index + 1 : options.length,
i = index < 0 ?
max :
one ? index : 0;
for ( ; i < max; i++ ) {
option = options[ i ];
if ( ( option.selected || i === index ) &&
( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
value = jQuery( option ).val();
if ( one ) {
return value;
}
values.push( value );
}
}
return values;
},
set: function( elem, value ) {
var optionSet, option,
options = elem.options,
values = jQuery.makeArray( value ),
i = options.length;
while ( i-- ) {
option = options[ i ];
if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {
try {
option.selected = optionSet = true;
} catch ( _ ) {
option.scrollHeight;
}
} else {
option.selected = false;
}
}
if ( !optionSet ) {
elem.selectedIndex = -1;
}
return options;
}
}
}
});
jQuery.each([ "radio", "checkbox" ], function() {
jQuery.valHooks[ this ] = {
set: function( elem, value ) {
if ( jQuery.isArray( value ) ) {
return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
}
}
};
if ( !support.checkOn ) {
jQuery.valHooks[ this ].get = function( elem ) {
return elem.getAttribute("value") === null ? "on" : elem.value;
};
}
});
var nodeHook, boolHook,
attrHandle = jQuery.expr.attrHandle,
ruseDefault = /^(?:checked|selected)$/i,
getSetAttribute = support.getSetAttribute,
getSetInput = support.input;
jQuery.fn.extend({
attr: function( name, value ) {
return access( this, jQuery.attr, name, value, arguments.length > 1 );
},
removeAttr: function( name ) {
return this.each(function() {
jQuery.removeAttr( this, name );
});
}
});
jQuery.extend({
attr: function( elem, name, value ) {
var hooks, ret,
nType = elem.nodeType;
if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
return;
}
if ( typeof elem.getAttribute === strundefined ) {
return jQuery.prop( elem, name, value );
}
if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
name = name.toLowerCase();
hooks = jQuery.attrHooks[ name ] ||
( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
}
if ( value !== undefined ) {
if ( value === null ) {
jQuery.removeAttr( elem, name );
} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
return ret;
} else {
elem.setAttribute( name, value + "" );
return value;
}
} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
return ret;
} else {
ret = jQuery.find.attr( elem, name );
return ret == null ?
undefined :
ret;
}
},
removeAttr: function( elem, value ) {
var name, propName,
i = 0,
attrNames = value && value.match( rnotwhite );
if ( attrNames && elem.nodeType === 1 ) {
while ( (name = attrNames[i++]) ) {
propName = jQuery.propFix[ name ] || name;
if ( jQuery.expr.match.bool.test( name ) ) {
if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
elem[ propName ] = false;
} else {
elem[ jQuery.camelCase( "default-" + name ) ] =
elem[ propName ] = false;
}
} else {
jQuery.attr( elem, name, "" );
}
elem.removeAttribute( getSetAttribute ? name : propName );
}
}
},
attrHooks: {
type: {
set: function( elem, value ) {
if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
var val = elem.value;
elem.setAttribute( "type", value );
if ( val ) {
elem.value = val;
}
return value;
}
}
}
}
});
boolHook = {
set: function( elem, value, name ) {
if ( value === false ) {
jQuery.removeAttr( elem, name );
} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );
} else {
elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
}
return name;
}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
var getter = attrHandle[ name ] || jQuery.find.attr;
attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
function( elem, name, isXML ) {
var ret, handle;
if ( !isXML ) {
handle = attrHandle[ name ];
attrHandle[ name ] = ret;
ret = getter( elem, name, isXML ) != null ?
name.toLowerCase() :
null;
attrHandle[ name ] = handle;
}
return ret;
} :
function( elem, name, isXML ) {
if ( !isXML ) {
return elem[ jQuery.camelCase( "default-" + name ) ] ?
name.toLowerCase() :
null;
}
};
});
if ( !getSetInput || !getSetAttribute ) {
jQuery.attrHooks.value = {
set: function( elem, value, name ) {
if ( jQuery.nodeName( elem, "input" ) ) {
elem.defaultValue = value;
} else {
return nodeHook && nodeHook.set( elem, value, name );
}
}
};
}
if ( !getSetAttribute ) {
nodeHook = {
set: function( elem, value, name ) {
var ret = elem.getAttributeNode( name );
if ( !ret ) {
elem.setAttributeNode(
(ret = elem.ownerDocument.createAttribute( name ))
);
}
ret.value = value += "";
if ( name === "value" || value === elem.getAttribute( name ) ) {
return value;
}
}
};
attrHandle.id = attrHandle.name = attrHandle.coords =
function( elem, name, isXML ) {
var ret;
if ( !isXML ) {
return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
ret.value :
null;
}
};
jQuery.valHooks.button = {
get: function( elem, name ) {
var ret = elem.getAttributeNode( name );
if ( ret && ret.specified ) {
return ret.value;
}
},
set: nodeHook.set
};
jQuery.attrHooks.contenteditable = {
set: function( elem, value, name ) {
nodeHook.set( elem, value === "" ? false : value, name );
}
};
jQuery.each([ "width", "height" ], function( i, name ) {
jQuery.attrHooks[ name ] = {
set: function( elem, value ) {
if ( value === "" ) {
elem.setAttribute( name, "auto" );
return value;
}
}
};
});
}
if ( !support.style ) {
jQuery.attrHooks.style = {
get: function( elem ) {
return elem.style.cssText || undefined;
},
set: function( elem, value ) {
return ( elem.style.cssText = value + "" );
}
};
}
var rfocusable = /^(?:input|select|textarea|button|object)$/i,
rclickable = /^(?:a|area)$/i;
jQuery.fn.extend({
prop: function( name, value ) {
return access( this, jQuery.prop, name, value, arguments.length > 1 );
},
removeProp: function( name ) {
name = jQuery.propFix[ name ] || name;
return this.each(function() {
try {
this[ name ] = undefined;
delete this[ name ];
} catch( e ) {}
});
}
});
jQuery.extend({
propFix: {
"for": "htmlFor",
"class": "className"
},
prop: function( elem, name, value ) {
var ret, hooks, notxml,
nType = elem.nodeType;
if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
return;
}
notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
if ( notxml ) {
name = jQuery.propFix[ name ] || name;
hooks = jQuery.propHooks[ name ];
}
if ( value !== undefined ) {
return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
ret :
( elem[ name ] = value );
} else {
return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
ret :
elem[ name ];
}
},
propHooks: {
tabIndex: {
get: function( elem ) {
var tabindex = jQuery.find.attr( elem, "tabindex" );
return tabindex ?
parseInt( tabindex, 10 ) :
rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
0 :
-1;
}
}
}
});
if ( !support.hrefNormalized ) {
jQuery.each([ "href", "src" ], function( i, name ) {
jQuery.propHooks[ name ] = {
get: function( elem ) {
return elem.getAttribute( name, 4 );
}
};
});
}
if ( !support.optSelected ) {
jQuery.propHooks.selected = {
get: function( elem ) {
var parent = elem.parentNode;
if ( parent ) {
parent.selectedIndex;
if ( parent.parentNode ) {
parent.parentNode.selectedIndex;
}
}
return null;
}
};
}
jQuery.each([
"tabIndex",
"readOnly",
"maxLength",
"cellSpacing",
"cellPadding",
"rowSpan",
"colSpan",
"useMap",
"frameBorder",
"contentEditable"
], function() {
jQuery.propFix[ this.toLowerCase() ] = this;
});
if ( !support.enctype ) {
jQuery.propFix.enctype = "encoding";
}
var rclass = /[\t\r\n\f]/g;
jQuery.fn.extend({
addClass: function( value ) {
var classes, elem, cur, clazz, j, finalValue,
i = 0,
len = this.length,
proceed = typeof value === "string" && value;
if ( jQuery.isFunction( value ) ) {
return this.each(function( j ) {
jQuery( this ).addClass( value.call( this, j, this.className ) );
});
}
if ( proceed ) {
classes = ( value || "" ).match( rnotwhite ) || [];
for ( ; i < len; i++ ) {
elem = this[ i ];
cur = elem.nodeType === 1 && ( elem.className ?
( " " + elem.className + " " ).replace( rclass, " " ) :
" "
);
if ( cur ) {
j = 0;
while ( (clazz = classes[j++]) ) {
if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
cur += clazz + " ";
}
}
finalValue = jQuery.trim( cur );
if ( elem.className !== finalValue ) {
elem.className = finalValue;
}
}
}
}
return this;
},
removeClass: function( value ) {
var classes, elem, cur, clazz, j, finalValue,
i = 0,
len = this.length,
proceed = arguments.length === 0 || typeof value === "string" && value;
if ( jQuery.isFunction( value ) ) {
return this.each(function( j ) {
jQuery( this ).removeClass( value.call( this, j, this.className ) );
});
}
if ( proceed ) {
classes = ( value || "" ).match( rnotwhite ) || [];
for ( ; i < len; i++ ) {
elem = this[ i ];
cur = elem.nodeType === 1 && ( elem.className ?
( " " + elem.className + " " ).replace( rclass, " " ) :
""
);
if ( cur ) {
j = 0;
while ( (clazz = classes[j++]) ) {
while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
cur = cur.replace( " " + clazz + " ", " " );
}
}
finalValue = value ? jQuery.trim( cur ) : "";
if ( elem.className !== finalValue ) {
elem.className = finalValue;
}
}
}
}
return this;
},
toggleClass: function( value, stateVal ) {
var type = typeof value;
if ( typeof stateVal === "boolean" && type === "string" ) {
return stateVal ? this.addClass( value ) : this.removeClass( value );
}
if ( jQuery.isFunction( value ) ) {
return this.each(function( i ) {
jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
});
}
return this.each(function() {
if ( type === "string" ) {
var className,
i = 0,
self = jQuery( this ),
classNames = value.match( rnotwhite ) || [];
while ( (className = classNames[ i++ ]) ) {
if ( self.hasClass( className ) ) {
self.removeClass( className );
} else {
self.addClass( className );
}
}
} else if ( type === strundefined || type === "boolean" ) {
if ( this.className ) {
jQuery._data( this, "__className__", this.className );
}
this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
}
});
},
hasClass: function( selector ) {
var className = " " + selector + " ",
i = 0,
l = this.length;
for ( ; i < l; i++ ) {
if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
return true;
}
}
return false;
}
});
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
jQuery.fn[ name ] = function( data, fn ) {
return arguments.length > 0 ?
this.on( name, null, data, fn ) :
this.trigger( name );
};
});
jQuery.fn.extend({
hover: function( fnOver, fnOut ) {
return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
},
bind: function( types, data, fn ) {
return this.on( types, null, data, fn );
},
unbind: function( types, fn ) {
return this.off( types, null, fn );
},
delegate: function( selector, types, data, fn ) {
return this.on( types, selector, data, fn );
},
undelegate: function( selector, types, fn ) {
return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
}
});
var nonce = jQuery.now();
var rquery = (/\?/);
var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
jQuery.parseJSON = function( data ) {
if ( window.JSON && window.JSON.parse ) {
return window.JSON.parse( data + "" );
}
var requireNonComma,
depth = null,
str = jQuery.trim( data + "" );
return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {
if ( requireNonComma && comma ) {
depth = 0;
}
if ( depth === 0 ) {
return token;
}
requireNonComma = open || comma;
depth += !close - !open;
return "";
}) ) ?
( Function( "return " + str ) )() :
jQuery.error( "Invalid JSON: " + data );
};
jQuery.parseXML = function( data ) {
var xml, tmp;
if ( !data || typeof data !== "string" ) {
return null;
}
try {
if ( window.DOMParser ) { // Standard
tmp = new DOMParser();
xml = tmp.parseFromString( data, "text/xml" );
} else { // IE
xml = new ActiveXObject( "Microsoft.XMLDOM" );
xml.async = "false";
xml.loadXML( data );
}
} catch( e ) {
xml = undefined;
}
if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
jQuery.error( "Invalid XML: " + data );
}
return xml;
};
var
ajaxLocParts,
ajaxLocation,
rhash = /#.*$/,
rts = /([?&])_=[^&]*/,
rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
rnoContent = /^(?:GET|HEAD)$/,
rprotocol = /^\/\//,
rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
/* Prefilters
* 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
* 2) These are called:
*    - BEFORE asking for a transport
*    - AFTER param serialization (s.data is a string if s.processData is true)
* 3) key is the dataType
* 4) the catchall symbol "*" can be used
* 5) execution will start with transport dataType and THEN continue down to "*" if needed
*/
prefilters = {},
/* Transports bindings
* 1) key is the dataType
* 2) the catchall symbol "*" can be used
* 3) selection will start with transport dataType and THEN go to "*" if needed
*/
transports = {},
allTypes = "*/".concat("*");
try {
ajaxLocation = location.href;
} catch( e ) {
ajaxLocation = document.createElement( "a" );
ajaxLocation.href = "";
ajaxLocation = ajaxLocation.href;
}
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
function addToPrefiltersOrTransports( structure ) {
return function( dataTypeExpression, func ) {
if ( typeof dataTypeExpression !== "string" ) {
func = dataTypeExpression;
dataTypeExpression = "*";
}
var dataType,
i = 0,
dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
if ( jQuery.isFunction( func ) ) {
while ( (dataType = dataTypes[i++]) ) {
if ( dataType.charAt( 0 ) === "+" ) {
dataType = dataType.slice( 1 ) || "*";
(structure[ dataType ] = structure[ dataType ] || []).unshift( func );
} else {
(structure[ dataType ] = structure[ dataType ] || []).push( func );
}
}
}
};
}
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
var inspected = {},
seekingTransport = ( structure === transports );
function inspect( dataType ) {
var selected;
inspected[ dataType ] = true;
jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
options.dataTypes.unshift( dataTypeOrTransport );
inspect( dataTypeOrTransport );
return false;
} else if ( seekingTransport ) {
return !( selected = dataTypeOrTransport );
}
});
return selected;
}
return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}
function ajaxExtend( target, src ) {
var deep, key,
flatOptions = jQuery.ajaxSettings.flatOptions || {};
for ( key in src ) {
if ( src[ key ] !== undefined ) {
( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
}
}
if ( deep ) {
jQuery.extend( true, target, deep );
}
return target;
}
/* Handles responses to an ajax request:
* - finds the right dataType (mediates between content-type and expected dataType)
* - returns the corresponding response
*/
function ajaxHandleResponses( s, jqXHR, responses ) {
var firstDataType, ct, finalDataType, type,
contents = s.contents,
dataTypes = s.dataTypes;
while ( dataTypes[ 0 ] === "*" ) {
dataTypes.shift();
if ( ct === undefined ) {
ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
}
}
if ( ct ) {
for ( type in contents ) {
if ( contents[ type ] && contents[ type ].test( ct ) ) {
dataTypes.unshift( type );
break;
}
}
}
if ( dataTypes[ 0 ] in responses ) {
finalDataType = dataTypes[ 0 ];
} else {
for ( type in responses ) {
if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
finalDataType = type;
break;
}
if ( !firstDataType ) {
firstDataType = type;
}
}
finalDataType = finalDataType || firstDataType;
}
if ( finalDataType ) {
if ( finalDataType !== dataTypes[ 0 ] ) {
dataTypes.unshift( finalDataType );
}
return responses[ finalDataType ];
}
}
/* Chain conversions given the request and the original response
* Also sets the responseXXX fields on the jqXHR instance
*/
function ajaxConvert( s, response, jqXHR, isSuccess ) {
var conv2, current, conv, tmp, prev,
converters = {},
dataTypes = s.dataTypes.slice();
if ( dataTypes[ 1 ] ) {
for ( conv in s.converters ) {
converters[ conv.toLowerCase() ] = s.converters[ conv ];
}
}
current = dataTypes.shift();
while ( current ) {
if ( s.responseFields[ current ] ) {
jqXHR[ s.responseFields[ current ] ] = response;
}
if ( !prev && isSuccess && s.dataFilter ) {
response = s.dataFilter( response, s.dataType );
}
prev = current;
current = dataTypes.shift();
if ( current ) {
if ( current === "*" ) {
current = prev;
} else if ( prev !== "*" && prev !== current ) {
conv = converters[ prev + " " + current ] || converters[ "* " + current ];
if ( !conv ) {
for ( conv2 in converters ) {
tmp = conv2.split( " " );
if ( tmp[ 1 ] === current ) {
conv = converters[ prev + " " + tmp[ 0 ] ] ||
converters[ "* " + tmp[ 0 ] ];
if ( conv ) {
if ( conv === true ) {
conv = converters[ conv2 ];
} else if ( converters[ conv2 ] !== true ) {
current = tmp[ 0 ];
dataTypes.unshift( tmp[ 1 ] );
}
break;
}
}
}
}
if ( conv !== true ) {
if ( conv && s[ "throws" ] ) {
response = conv( response );
} else {
try {
response = conv( response );
} catch ( e ) {
return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
}
}
}
}
}
}
return { state: "success", data: response };
}
jQuery.extend({
active: 0,
lastModified: {},
etag: {},
ajaxSettings: {
url: ajaxLocation,
type: "GET",
isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
global: true,
processData: true,
async: true,
contentType: "application/x-www-form-urlencoded; charset=UTF-8",
/*
timeout: 0,
data: null,
dataType: null,
username: null,
password: null,
cache: null,
throws: false,
traditional: false,
headers: {},
*/
accepts: {
"*": allTypes,
text: "text/plain",
html: "text/html",
xml: "application/xml, text/xml",
json: "application/json, text/javascript"
},
contents: {
xml: /xml/,
html: /html/,
json: /json/
},
responseFields: {
xml: "responseXML",
text: "responseText",
json: "responseJSON"
},
converters: {
"* text": String,
"text html": true,
"text json": jQuery.parseJSON,
"text xml": jQuery.parseXML
},
flatOptions: {
url: true,
context: true
}
},
ajaxSetup: function( target, settings ) {
return settings ?
ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
ajaxExtend( jQuery.ajaxSettings, target );
},
ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
ajaxTransport: addToPrefiltersOrTransports( transports ),
ajax: function( url, options ) {
if ( typeof url === "object" ) {
options = url;
url = undefined;
}
options = options || {};
var // Cross-domain detection vars
parts,
i,
cacheURL,
responseHeadersString,
timeoutTimer,
fireGlobals,
transport,
responseHeaders,
s = jQuery.ajaxSetup( {}, options ),
callbackContext = s.context || s,
globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
jQuery( callbackContext ) :
jQuery.event,
deferred = jQuery.Deferred(),
completeDeferred = jQuery.Callbacks("once memory"),
statusCode = s.statusCode || {},
requestHeaders = {},
requestHeadersNames = {},
state = 0,
strAbort = "canceled",
jqXHR = {
readyState: 0,
getResponseHeader: function( key ) {
var match;
if ( state === 2 ) {
if ( !responseHeaders ) {
responseHeaders = {};
while ( (match = rheaders.exec( responseHeadersString )) ) {
responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
}
}
match = responseHeaders[ key.toLowerCase() ];
}
return match == null ? null : match;
},
getAllResponseHeaders: function() {
return state === 2 ? responseHeadersString : null;
},
setRequestHeader: function( name, value ) {
var lname = name.toLowerCase();
if ( !state ) {
name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
requestHeaders[ name ] = value;
}
return this;
},
overrideMimeType: function( type ) {
if ( !state ) {
s.mimeType = type;
}
return this;
},
statusCode: function( map ) {
var code;
if ( map ) {
if ( state < 2 ) {
for ( code in map ) {
statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
}
} else {
jqXHR.always( map[ jqXHR.status ] );
}
}
return this;
},
abort: function( statusText ) {
var finalText = statusText || strAbort;
if ( transport ) {
transport.abort( finalText );
}
done( 0, finalText );
return this;
}
};
deferred.promise( jqXHR ).complete = completeDeferred.add;
jqXHR.success = jqXHR.done;
jqXHR.error = jqXHR.fail;
s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
s.type = options.method || options.type || s.method || s.type;
s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
if ( s.crossDomain == null ) {
parts = rurl.exec( s.url.toLowerCase() );
s.crossDomain = !!( parts &&
( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
);
}
if ( s.data && s.processData && typeof s.data !== "string" ) {
s.data = jQuery.param( s.data, s.traditional );
}
inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
if ( state === 2 ) {
return jqXHR;
}
fireGlobals = jQuery.event && s.global;
if ( fireGlobals && jQuery.active++ === 0 ) {
jQuery.event.trigger("ajaxStart");
}
s.type = s.type.toUpperCase();
s.hasContent = !rnoContent.test( s.type );
cacheURL = s.url;
if ( !s.hasContent ) {
if ( s.data ) {
cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
delete s.data;
}
if ( s.cache === false ) {
s.url = rts.test( cacheURL ) ?
cacheURL.replace( rts, "$1_=" + nonce++ ) :
cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
}
}
if ( s.ifModified ) {
if ( jQuery.lastModified[ cacheURL ] ) {
jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
}
if ( jQuery.etag[ cacheURL ] ) {
jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
}
}
if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
jqXHR.setRequestHeader( "Content-Type", s.contentType );
}
jqXHR.setRequestHeader(
"Accept",
s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
s.accepts[ "*" ]
);
for ( i in s.headers ) {
jqXHR.setRequestHeader( i, s.headers[ i ] );
}
if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
return jqXHR.abort();
}
strAbort = "abort";
for ( i in { success: 1, error: 1, complete: 1 } ) {
jqXHR[ i ]( s[ i ] );
}
transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
if ( !transport ) {
done( -1, "No Transport" );
} else {
jqXHR.readyState = 1;
if ( fireGlobals ) {
globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
}
if ( s.async && s.timeout > 0 ) {
timeoutTimer = setTimeout(function() {
jqXHR.abort("timeout");
}, s.timeout );
}
try {
state = 1;
transport.send( requestHeaders, done );
} catch ( e ) {
if ( state < 2 ) {
done( -1, e );
} else {
throw e;
}
}
}
function done( status, nativeStatusText, responses, headers ) {
var isSuccess, success, error, response, modified,
statusText = nativeStatusText;
if ( state === 2 ) {
return;
}
state = 2;
if ( timeoutTimer ) {
clearTimeout( timeoutTimer );
}
transport = undefined;
responseHeadersString = headers || "";
jqXHR.readyState = status > 0 ? 4 : 0;
isSuccess = status >= 200 && status < 300 || status === 304;
if ( responses ) {
response = ajaxHandleResponses( s, jqXHR, responses );
}
response = ajaxConvert( s, response, jqXHR, isSuccess );
if ( isSuccess ) {
if ( s.ifModified ) {
modified = jqXHR.getResponseHeader("Last-Modified");
if ( modified ) {
jQuery.lastModified[ cacheURL ] = modified;
}
modified = jqXHR.getResponseHeader("etag");
if ( modified ) {
jQuery.etag[ cacheURL ] = modified;
}
}
if ( status === 204 || s.type === "HEAD" ) {
statusText = "nocontent";
} else if ( status === 304 ) {
statusText = "notmodified";
} else {
statusText = response.state;
success = response.data;
error = response.error;
isSuccess = !error;
}
} else {
error = statusText;
if ( status || !statusText ) {
statusText = "error";
if ( status < 0 ) {
status = 0;
}
}
}
jqXHR.status = status;
jqXHR.statusText = ( nativeStatusText || statusText ) + "";
if ( isSuccess ) {
deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
} else {
deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
}
jqXHR.statusCode( statusCode );
statusCode = undefined;
if ( fireGlobals ) {
globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
[ jqXHR, s, isSuccess ? success : error ] );
}
completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
if ( fireGlobals ) {
globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
if ( !( --jQuery.active ) ) {
jQuery.event.trigger("ajaxStop");
}
}
}
return jqXHR;
},
getJSON: function( url, data, callback ) {
return jQuery.get( url, data, callback, "json" );
},
getScript: function( url, callback ) {
return jQuery.get( url, undefined, callback, "script" );
}
});
jQuery.each( [ "get", "post" ], function( i, method ) {
jQuery[ method ] = function( url, data, callback, type ) {
if ( jQuery.isFunction( data ) ) {
type = type || callback;
callback = data;
data = undefined;
}
return jQuery.ajax({
url: url,
type: method,
dataType: type,
data: data,
success: callback
});
};
});
jQuery._evalUrl = function( url ) {
return jQuery.ajax({
url: url,
type: "GET",
dataType: "script",
async: false,
global: false,
"throws": true
});
};
jQuery.fn.extend({
wrapAll: function( html ) {
if ( jQuery.isFunction( html ) ) {
return this.each(function(i) {
jQuery(this).wrapAll( html.call(this, i) );
});
}
if ( this[0] ) {
var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);
if ( this[0].parentNode ) {
wrap.insertBefore( this[0] );
}
wrap.map(function() {
var elem = this;
while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
elem = elem.firstChild;
}
return elem;
}).append( this );
}
return this;
},
wrapInner: function( html ) {
if ( jQuery.isFunction( html ) ) {
return this.each(function(i) {
jQuery(this).wrapInner( html.call(this, i) );
});
}
return this.each(function() {
var self = jQuery( this ),
contents = self.contents();
if ( contents.length ) {
contents.wrapAll( html );
} else {
self.append( html );
}
});
},
wrap: function( html ) {
var isFunction = jQuery.isFunction( html );
return this.each(function(i) {
jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
});
},
unwrap: function() {
return this.parent().each(function() {
if ( !jQuery.nodeName( this, "body" ) ) {
jQuery( this ).replaceWith( this.childNodes );
}
}).end();
}
});
jQuery.expr.filters.hidden = function( elem ) {
return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
(!support.reliableHiddenOffsets() &&
((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};
jQuery.expr.filters.visible = function( elem ) {
return !jQuery.expr.filters.hidden( elem );
};
var r20 = /%20/g,
rbracket = /\[\]$/,
rCRLF = /\r?\n/g,
rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
rsubmittable = /^(?:input|select|textarea|keygen)/i;
function buildParams( prefix, obj, traditional, add ) {
var name;
if ( jQuery.isArray( obj ) ) {
jQuery.each( obj, function( i, v ) {
if ( traditional || rbracket.test( prefix ) ) {
add( prefix, v );
} else {
buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
}
});
} else if ( !traditional && jQuery.type( obj ) === "object" ) {
for ( name in obj ) {
buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
}
} else {
add( prefix, obj );
}
}
jQuery.param = function( a, traditional ) {
var prefix,
s = [],
add = function( key, value ) {
value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
};
if ( traditional === undefined ) {
traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
}
if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
jQuery.each( a, function() {
add( this.name, this.value );
});
} else {
for ( prefix in a ) {
buildParams( prefix, a[ prefix ], traditional, add );
}
}
return s.join( "&" ).replace( r20, "+" );
};
jQuery.fn.extend({
serialize: function() {
return jQuery.param( this.serializeArray() );
},
serializeArray: function() {
return this.map(function() {
var elements = jQuery.prop( this, "elements" );
return elements ? jQuery.makeArray( elements ) : this;
})
.filter(function() {
var type = this.type;
return this.name && !jQuery( this ).is( ":disabled" ) &&
rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
( this.checked || !rcheckableType.test( type ) );
})
.map(function( i, elem ) {
var val = jQuery( this ).val();
return val == null ?
null :
jQuery.isArray( val ) ?
jQuery.map( val, function( val ) {
return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
}) :
{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
}).get();
}
});
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
function() {
return !this.isLocal &&
/^(get|post|head|put|delete|options)$/i.test( this.type ) &&
createStandardXHR() || createActiveXHR();
} :
createStandardXHR;
var xhrId = 0,
xhrCallbacks = {},
xhrSupported = jQuery.ajaxSettings.xhr();
if ( window.attachEvent ) {
window.attachEvent( "onunload", function() {
for ( var key in xhrCallbacks ) {
xhrCallbacks[ key ]( undefined, true );
}
});
}
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;
if ( xhrSupported ) {
jQuery.ajaxTransport(function( options ) {
if ( !options.crossDomain || support.cors ) {
var callback;
return {
send: function( headers, complete ) {
var i,
xhr = options.xhr(),
id = ++xhrId;
xhr.open( options.type, options.url, options.async, options.username, options.password );
if ( options.xhrFields ) {
for ( i in options.xhrFields ) {
xhr[ i ] = options.xhrFields[ i ];
}
}
if ( options.mimeType && xhr.overrideMimeType ) {
xhr.overrideMimeType( options.mimeType );
}
if ( !options.crossDomain && !headers["X-Requested-With"] ) {
headers["X-Requested-With"] = "XMLHttpRequest";
}
for ( i in headers ) {
if ( headers[ i ] !== undefined ) {
xhr.setRequestHeader( i, headers[ i ] + "" );
}
}
xhr.send( ( options.hasContent && options.data ) || null );
callback = function( _, isAbort ) {
var status, statusText, responses;
if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
delete xhrCallbacks[ id ];
callback = undefined;
xhr.onreadystatechange = jQuery.noop;
if ( isAbort ) {
if ( xhr.readyState !== 4 ) {
xhr.abort();
}
} else {
responses = {};
status = xhr.status;
if ( typeof xhr.responseText === "string" ) {
responses.text = xhr.responseText;
}
try {
statusText = xhr.statusText;
} catch( e ) {
statusText = "";
}
if ( !status && options.isLocal && !options.crossDomain ) {
status = responses.text ? 200 : 404;
} else if ( status === 1223 ) {
status = 204;
}
}
}
if ( responses ) {
complete( status, statusText, responses, xhr.getAllResponseHeaders() );
}
};
if ( !options.async ) {
callback();
} else if ( xhr.readyState === 4 ) {
setTimeout( callback );
} else {
xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
}
},
abort: function() {
if ( callback ) {
callback( undefined, true );
}
}
};
}
});
}
function createStandardXHR() {
try {
return new window.XMLHttpRequest();
} catch( e ) {}
}
function createActiveXHR() {
try {
return new window.ActiveXObject( "Microsoft.XMLHTTP" );
} catch( e ) {}
}
jQuery.ajaxSetup({
accepts: {
script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},
contents: {
script: /(?:java|ecma)script/
},
converters: {
"text script": function( text ) {
jQuery.globalEval( text );
return text;
}
}
});
jQuery.ajaxPrefilter( "script", function( s ) {
if ( s.cache === undefined ) {
s.cache = false;
}
if ( s.crossDomain ) {
s.type = "GET";
s.global = false;
}
});
jQuery.ajaxTransport( "script", function(s) {
if ( s.crossDomain ) {
var script,
head = document.head || jQuery("head")[0] || document.documentElement;
return {
send: function( _, callback ) {
script = document.createElement("script");
script.async = true;
if ( s.scriptCharset ) {
script.charset = s.scriptCharset;
}
script.src = s.url;
script.onload = script.onreadystatechange = function( _, isAbort ) {
if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {
script.onload = script.onreadystatechange = null;
if ( script.parentNode ) {
script.parentNode.removeChild( script );
}
script = null;
if ( !isAbort ) {
callback( 200, "success" );
}
}
};
head.insertBefore( script, head.firstChild );
},
abort: function() {
if ( script ) {
script.onload( undefined, true );
}
}
};
}
});
var oldCallbacks = [],
rjsonp = /(=)\?(?=&|$)|\?\?/;
jQuery.ajaxSetup({
jsonp: "callback",
jsonpCallback: function() {
var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
this[ callback ] = true;
return callback;
}
});
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
var callbackName, overwritten, responseContainer,
jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
"url" :
typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
);
if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
s.jsonpCallback() :
s.jsonpCallback;
if ( jsonProp ) {
s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
} else if ( s.jsonp !== false ) {
s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
}
s.converters["script json"] = function() {
if ( !responseContainer ) {
jQuery.error( callbackName + " was not called" );
}
return responseContainer[ 0 ];
};
s.dataTypes[ 0 ] = "json";
overwritten = window[ callbackName ];
window[ callbackName ] = function() {
responseContainer = arguments;
};
jqXHR.always(function() {
window[ callbackName ] = overwritten;
if ( s[ callbackName ] ) {
s.jsonpCallback = originalSettings.jsonpCallback;
oldCallbacks.push( callbackName );
}
if ( responseContainer && jQuery.isFunction( overwritten ) ) {
overwritten( responseContainer[ 0 ] );
}
responseContainer = overwritten = undefined;
});
return "script";
}
});
jQuery.parseHTML = function( data, context, keepScripts ) {
if ( !data || typeof data !== "string" ) {
return null;
}
if ( typeof context === "boolean" ) {
keepScripts = context;
context = false;
}
context = context || document;
var parsed = rsingleTag.exec( data ),
scripts = !keepScripts && [];
if ( parsed ) {
return [ context.createElement( parsed[1] ) ];
}
parsed = jQuery.buildFragment( [ data ], context, scripts );
if ( scripts && scripts.length ) {
jQuery( scripts ).remove();
}
return jQuery.merge( [], parsed.childNodes );
};
var _load = jQuery.fn.load;
/**
* Load a url into a page
*/
jQuery.fn.load = function( url, params, callback ) {
if ( typeof url !== "string" && _load ) {
return _load.apply( this, arguments );
}
var selector, response, type,
self = this,
off = url.indexOf(" ");
if ( off >= 0 ) {
selector = jQuery.trim( url.slice( off, url.length ) );
url = url.slice( 0, off );
}
if ( jQuery.isFunction( params ) ) {
callback = params;
params = undefined;
} else if ( params && typeof params === "object" ) {
type = "POST";
}
if ( self.length > 0 ) {
jQuery.ajax({
url: url,
type: type,
dataType: "html",
data: params
}).done(function( responseText ) {
response = arguments;
self.html( selector ?
jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :
responseText );
}).complete( callback && function( jqXHR, status ) {
self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
});
}
return this;
};
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
jQuery.fn[ type ] = function( fn ) {
return this.on( type, fn );
};
});
jQuery.expr.filters.animated = function( elem ) {
return jQuery.grep(jQuery.timers, function( fn ) {
return elem === fn.elem;
}).length;
};
var docElem = window.document.documentElement;
/**
* Gets a window from an element
*/
function getWindow( elem ) {
return jQuery.isWindow( elem ) ?
elem :
elem.nodeType === 9 ?
elem.defaultView || elem.parentWindow :
false;
}
jQuery.offset = {
setOffset: function( elem, options, i ) {
var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
position = jQuery.css( elem, "position" ),
curElem = jQuery( elem ),
props = {};
if ( position === "static" ) {
elem.style.position = "relative";
}
curOffset = curElem.offset();
curCSSTop = jQuery.css( elem, "top" );
curCSSLeft = jQuery.css( elem, "left" );
calculatePosition = ( position === "absolute" || position === "fixed" ) &&
jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;
if ( calculatePosition ) {
curPosition = curElem.position();
curTop = curPosition.top;
curLeft = curPosition.left;
} else {
curTop = parseFloat( curCSSTop ) || 0;
curLeft = parseFloat( curCSSLeft ) || 0;
}
if ( jQuery.isFunction( options ) ) {
options = options.call( elem, i, curOffset );
}
if ( options.top != null ) {
props.top = ( options.top - curOffset.top ) + curTop;
}
if ( options.left != null ) {
props.left = ( options.left - curOffset.left ) + curLeft;
}
if ( "using" in options ) {
options.using.call( elem, props );
} else {
curElem.css( props );
}
}
};
jQuery.fn.extend({
offset: function( options ) {
if ( arguments.length ) {
return options === undefined ?
this :
this.each(function( i ) {
jQuery.offset.setOffset( this, options, i );
});
}
var docElem, win,
box = { top: 0, left: 0 },
elem = this[ 0 ],
doc = elem && elem.ownerDocument;
if ( !doc ) {
return;
}
docElem = doc.documentElement;
if ( !jQuery.contains( docElem, elem ) ) {
return box;
}
if ( typeof elem.getBoundingClientRect !== strundefined ) {
box = elem.getBoundingClientRect();
}
win = getWindow( doc );
return {
top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
};
},
position: function() {
if ( !this[ 0 ] ) {
return;
}
var offsetParent, offset,
parentOffset = { top: 0, left: 0 },
elem = this[ 0 ];
if ( jQuery.css( elem, "position" ) === "fixed" ) {
offset = elem.getBoundingClientRect();
} else {
offsetParent = this.offsetParent();
offset = this.offset();
if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
parentOffset = offsetParent.offset();
}
parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
}
return {
top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
};
},
offsetParent: function() {
return this.map(function() {
var offsetParent = this.offsetParent || docElem;
while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
offsetParent = offsetParent.offsetParent;
}
return offsetParent || docElem;
});
}
});
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
var top = /Y/.test( prop );
jQuery.fn[ method ] = function( val ) {
return access( this, function( elem, method, val ) {
var win = getWindow( elem );
if ( val === undefined ) {
return win ? (prop in win) ? win[ prop ] :
win.document.documentElement[ method ] :
elem[ method ];
}
if ( win ) {
win.scrollTo(
!top ? val : jQuery( win ).scrollLeft(),
top ? val : jQuery( win ).scrollTop()
);
} else {
elem[ method ] = val;
}
}, method, val, arguments.length, null );
};
});
jQuery.each( [ "top", "left" ], function( i, prop ) {
jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
function( elem, computed ) {
if ( computed ) {
computed = curCSS( elem, prop );
return rnumnonpx.test( computed ) ?
jQuery( elem ).position()[ prop ] + "px" :
computed;
}
}
);
});
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
jQuery.fn[ funcName ] = function( margin, value ) {
var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
return access( this, function( elem, type, value ) {
var doc;
if ( jQuery.isWindow( elem ) ) {
return elem.document.documentElement[ "client" + name ];
}
if ( elem.nodeType === 9 ) {
doc = elem.documentElement;
return Math.max(
elem.body[ "scroll" + name ], doc[ "scroll" + name ],
elem.body[ "offset" + name ], doc[ "offset" + name ],
doc[ "client" + name ]
);
}
return value === undefined ?
jQuery.css( elem, type, extra ) :
jQuery.style( elem, type, value, extra );
}, type, chainable ? margin : undefined, chainable, null );
};
});
});
jQuery.fn.size = function() {
return this.length;
};
jQuery.fn.andSelf = jQuery.fn.addBack;
if ( typeof define === "function" && define.amd ) {
define( "jquery", [], function() {
return jQuery;
});
}
var
_jQuery = window.jQuery,
_$ = window.$;
jQuery.noConflict = function( deep ) {
if ( window.$ === jQuery ) {
window.$ = _$;
}
if ( deep && window.jQuery === jQuery ) {
window.jQuery = _jQuery;
}
return jQuery;
};
if ( typeof noGlobal === strundefined ) {
window.jQuery = window.$ = jQuery;
}
return jQuery;
}));/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.2",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.2",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.2",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.2",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.2",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.2",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()
}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.2",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);/**
* bootbox.js [v4.4.0]
*
* http://bootboxjs.com/license.txt
*/
(function (root, factory) {
"use strict";
if (typeof define === "function" && define.amd) {
define(["jquery"], factory);
} else if (typeof exports === "object") {
module.exports = factory(require("jquery"));
} else {
root.bootbox = factory(root.jQuery);
}
}(this, function init($, undefined) {
"use strict";
var templates = {
dialog:
"<div class='bootbox modal' tabindex='-1' role='dialog'>" +
"<div class='modal-dialog'>" +
"<div class='modal-content'>" +
"<div class='modal-body'><div class='bootbox-body'></div></div>" +
"</div>" +
"</div>" +
"</div>",
header:
"<div class='modal-header'>" +
"<h4 class='modal-title'></h4>" +
"</div>",
footer:
"<div class='modal-footer'></div>",
closeButton:
"<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
form:
"<form class='bootbox-form'></form>",
inputs: {
text:
"<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
textarea:
"<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
email:
"<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
select:
"<select class='bootbox-input bootbox-input-select form-control'></select>",
checkbox:
"<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
date:
"<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
time:
"<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
number:
"<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
password:
"<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
}
};
var defaults = {
locale: "en",
backdrop: "static",
animate: true,
className: null,
closeButton: true,
show: true,
container: "body"
};
var exports = {};
/**
* @private
*/
function _t(key) {
var locale = locales[defaults.locale];
return locale ? locale[key] : locales.en[key];
}
function processCallback(e, dialog, callback) {
e.stopPropagation();
e.preventDefault();
var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;
if (!preserveDialog) {
dialog.modal("hide");
}
}
function getKeyLength(obj) {
var k, t = 0;
for (k in obj) {
t ++;
}
return t;
}
function each(collection, iterator) {
var index = 0;
$.each(collection, function(key, value) {
iterator(key, value, index++);
});
}
function sanitize(options) {
var buttons;
var total;
if (typeof options !== "object") {
throw new Error("Please supply an object of options");
}
if (!options.message) {
throw new Error("Please specify a message");
}
options = $.extend({}, defaults, options);
if (!options.buttons) {
options.buttons = {};
}
buttons = options.buttons;
total = getKeyLength(buttons);
each(buttons, function(key, button, index) {
if ($.isFunction(button)) {
button = buttons[key] = {
callback: button
};
}
if ($.type(button) !== "object") {
throw new Error("button with key " + key + " must be an object");
}
if (!button.label) {
button.label = key;
}
if (!button.className) {
if (total <= 2 && index === total-1) {
button.className = "btn-primary";
} else {
button.className = "btn-default";
}
}
});
return options;
}
/**
* map a flexible set of arguments into a single returned object
* if args.length is already one just return it, otherwise
* use the properties argument to map the unnamed args to
* object properties
* so in the latter case:
* mapArguments(["foo", $.noop], ["message", "callback"])
* -> { message: "foo", callback: $.noop }
*/
function mapArguments(args, properties) {
var argn = args.length;
var options = {};
if (argn < 1 || argn > 2) {
throw new Error("Invalid argument length");
}
if (argn === 2 || typeof args[0] === "string") {
options[properties[0]] = args[0];
options[properties[1]] = args[1];
} else {
options = args[0];
}
return options;
}
/**
* merge a set of default dialog options with user supplied arguments
*/
function mergeArguments(defaults, args, properties) {
return $.extend(
true,
{},
defaults,
mapArguments(
args,
properties
)
);
}
/**
* this entry-level method makes heavy use of composition to take a simple
* range of inputs and return valid options suitable for passing to bootbox.dialog
*/
function mergeDialogOptions(className, labels, properties, args) {
var baseOptions = {
className: "bootbox-" + className,
buttons: createLabels.apply(null, labels)
};
return validateButtons(
mergeArguments(
baseOptions,
args,
properties
),
labels
);
}
/**
* from a given list of arguments return a suitable object of button labels
* all this does is normalise the given labels and translate them where possible
* e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
*/
function createLabels() {
var buttons = {};
for (var i = 0, j = arguments.length; i < j; i++) {
var argument = arguments[i];
var key = argument.toLowerCase();
var value = argument.toUpperCase();
buttons[key] = {
label: _t(value)
};
}
return buttons;
}
function validateButtons(options, buttons) {
var allowedButtons = {};
each(buttons, function(key, value) {
allowedButtons[value] = true;
});
each(options.buttons, function(key) {
if (allowedButtons[key] === undefined) {
throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
}
});
return options;
}
exports.alert = function() {
var options;
options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);
if (options.callback && !$.isFunction(options.callback)) {
throw new Error("alert requires callback property to be a function when provided");
}
/**
* overrides
*/
options.buttons.ok.callback = options.onEscape = function() {
if ($.isFunction(options.callback)) {
return options.callback.call(this);
}
return true;
};
return exports.dialog(options);
};
exports.confirm = function() {
var options;
options = mergeDialogOptions("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);
/**
* overrides; undo anything the user tried to set they shouldn't have
*/
options.buttons.cancel.callback = options.onEscape = function() {
return options.callback.call(this, false);
};
options.buttons.confirm.callback = function() {
return options.callback.call(this, true);
};
if (!$.isFunction(options.callback)) {
throw new Error("confirm requires a callback");
}
return exports.dialog(options);
};
exports.prompt = function() {
var options;
var defaults;
var dialog;
var form;
var input;
var shouldShow;
var inputOptions;
form = $(templates.form);
defaults = {
className: "bootbox-prompt",
buttons: createLabels("cancel", "confirm"),
value: "",
inputType: "text"
};
options = validateButtons(
mergeArguments(defaults, arguments, ["title", "callback"]),
["cancel", "confirm"]
);
shouldShow = (options.show === undefined) ? true : options.show;
/**
* overrides; undo anything the user tried to set they shouldn't have
*/
options.message = form;
options.buttons.cancel.callback = options.onEscape = function() {
return options.callback.call(this, null);
};
options.buttons.confirm.callback = function() {
var value;
switch (options.inputType) {
case "text":
case "textarea":
case "email":
case "select":
case "date":
case "time":
case "number":
case "password":
value = input.val();
break;
case "checkbox":
var checkedItems = input.find("input:checked");
value = [];
each(checkedItems, function(_, item) {
value.push($(item).val());
});
break;
}
return options.callback.call(this, value);
};
options.show = false;
if (!options.title) {
throw new Error("prompt requires a title");
}
if (!$.isFunction(options.callback)) {
throw new Error("prompt requires a callback");
}
if (!templates.inputs[options.inputType]) {
throw new Error("invalid prompt type");
}
input = $(templates.inputs[options.inputType]);
switch (options.inputType) {
case "text":
case "textarea":
case "email":
case "date":
case "time":
case "number":
case "password":
input.val(options.value);
break;
case "select":
var groups = {};
inputOptions = options.inputOptions || [];
if (!$.isArray(inputOptions)) {
throw new Error("Please pass an array of input options");
}
if (!inputOptions.length) {
throw new Error("prompt with select requires options");
}
each(inputOptions, function(_, option) {
var elem = input;
if (option.value === undefined || option.text === undefined) {
throw new Error("given options in wrong format");
}
if (option.group) {
if (!groups[option.group]) {
groups[option.group] = $("<optgroup/>").attr("label", option.group);
}
elem = groups[option.group];
}
elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
});
each(groups, function(_, group) {
input.append(group);
});
input.val(options.value);
break;
case "checkbox":
var values   = $.isArray(options.value) ? options.value : [options.value];
inputOptions = options.inputOptions || [];
if (!inputOptions.length) {
throw new Error("prompt with checkbox requires options");
}
if (!inputOptions[0].value || !inputOptions[0].text) {
throw new Error("given options in wrong format");
}
input = $("<div/>");
each(inputOptions, function(_, option) {
var checkbox = $(templates.inputs[options.inputType]);
checkbox.find("input").attr("value", option.value);
checkbox.find("label").append(option.text);
each(values, function(_, value) {
if (value === option.value) {
checkbox.find("input").prop("checked", true);
}
});
input.append(checkbox);
});
break;
}
if (options.placeholder) {
input.attr("placeholder", options.placeholder);
}
if (options.pattern) {
input.attr("pattern", options.pattern);
}
if (options.maxlength) {
input.attr("maxlength", options.maxlength);
}
form.append(input);
form.on("submit", function(e) {
e.preventDefault();
e.stopPropagation();
dialog.find(".btn-primary").click();
});
dialog = exports.dialog(options);
dialog.off("shown.bs.modal");
dialog.on("shown.bs.modal", function() {
input.focus();
});
if (shouldShow === true) {
dialog.modal("show");
}
return dialog;
};
exports.dialog = function(options) {
options = sanitize(options);
var dialog = $(templates.dialog);
var innerDialog = dialog.find(".modal-dialog");
var body = dialog.find(".modal-body");
var buttons = options.buttons;
var buttonStr = "";
var callbacks = {
onEscape: options.onEscape
};
if ($.fn.modal === undefined) {
throw new Error(
"$.fn.modal is not defined; please double check you have included " +
"the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ " +
"for more details."
);
}
each(buttons, function(key, button) {
buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
callbacks[key] = button.callback;
});
body.find(".bootbox-body").html(options.message);
if (options.animate === true) {
dialog.addClass("fade");
}
if (options.className) {
dialog.addClass(options.className);
}
if (options.size === "large") {
innerDialog.addClass("modal-lg");
} else if (options.size === "small") {
innerDialog.addClass("modal-sm");
}
if (options.title) {
body.before(templates.header);
}
if (options.closeButton) {
var closeButton = $(templates.closeButton);
if (options.title) {
dialog.find(".modal-header").prepend(closeButton);
} else {
closeButton.css("margin-top", "-10px").prependTo(body);
}
}
if (options.title) {
dialog.find(".modal-title").html(options.title);
}
if (buttonStr.length) {
body.after(templates.footer);
dialog.find(".modal-footer").html(buttonStr);
}
/**
* Bootstrap event listeners; used handle extra
* setup & teardown required after the underlying
* modal has performed certain actions
*/
dialog.on("hidden.bs.modal", function(e) {
if (e.target === this) {
dialog.remove();
}
});
/*
dialog.on("show.bs.modal", function() {
if (options.backdrop) {
dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
}
});
*/
dialog.on("shown.bs.modal", function() {
dialog.find(".btn-primary:first").focus();
});
/**
* Bootbox event listeners; experimental and may not last
* just an attempt to decouple some behaviours from their
* respective triggers
*/
if (options.backdrop !== "static") {
dialog.on("click.dismiss.bs.modal", function(e) {
if (dialog.children(".modal-backdrop").length) {
e.currentTarget = dialog.children(".modal-backdrop").get(0);
}
if (e.target !== e.currentTarget) {
return;
}
dialog.trigger("escape.close.bb");
});
}
dialog.on("escape.close.bb", function(e) {
if (callbacks.onEscape) {
processCallback(e, dialog, callbacks.onEscape);
}
});
/**
* Standard jQuery event listeners; used to handle user
* interaction with our dialog
*/
dialog.on("click", ".modal-footer button", function(e) {
var callbackKey = $(this).data("bb-handler");
processCallback(e, dialog, callbacks[callbackKey]);
});
dialog.on("click", ".bootbox-close-button", function(e) {
processCallback(e, dialog, callbacks.onEscape);
});
dialog.on("keyup", function(e) {
if (e.which === 27) {
dialog.trigger("escape.close.bb");
}
});
$(options.container).append(dialog);
dialog.modal({
backdrop: options.backdrop ? "static": false,
keyboard: false,
show: false
});
if (options.show) {
dialog.modal("show");
}
/*
function BBDialog(elem) {
this.elem = elem;
}
BBDialog.prototype = {
hide: function() {
return this.elem.modal("hide");
},
show: function() {
return this.elem.modal("show");
}
};
*/
return dialog;
};
exports.setDefaults = function() {
var values = {};
if (arguments.length === 2) {
values[arguments[0]] = arguments[1];
} else {
values = arguments[0];
}
$.extend(defaults, values);
};
exports.hideAll = function() {
$(".bootbox").modal("hide");
return exports;
};
/**
* standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
* unlikely to be required. If this gets too large it can be split out into separate JS files.
*/
var locales = {
bg_BG : {
OK      : "Ок",
CANCEL  : "Отказ",
CONFIRM : "Потвърждавам"
},
br : {
OK      : "OK",
CANCEL  : "Cancelar",
CONFIRM : "Sim"
},
cs : {
OK      : "OK",
CANCEL  : "Zrušit",
CONFIRM : "Potvrdit"
},
da : {
OK      : "OK",
CANCEL  : "Annuller",
CONFIRM : "Accepter"
},
de : {
OK      : "OK",
CANCEL  : "Abbrechen",
CONFIRM : "Akzeptieren"
},
el : {
OK      : "Εντάξει",
CANCEL  : "Ακύρωση",
CONFIRM : "Επιβεβαίωση"
},
en : {
OK      : "OK",
CANCEL  : "Cancel",
CONFIRM : "OK"
},
es : {
OK      : "OK",
CANCEL  : "Cancelar",
CONFIRM : "Aceptar"
},
et : {
OK      : "OK",
CANCEL  : "Katkesta",
CONFIRM : "OK"
},
fa : {
OK      : "قبول",
CANCEL  : "لغو",
CONFIRM : "تایید"
},
fi : {
OK      : "OK",
CANCEL  : "Peruuta",
CONFIRM : "OK"
},
fr : {
OK      : "OK",
CANCEL  : "Annuler",
CONFIRM : "D'accord"
},
he : {
OK      : "אישור",
CANCEL  : "ביטול",
CONFIRM : "אישור"
},
hu : {
OK      : "OK",
CANCEL  : "Mégsem",
CONFIRM : "Megerősít"
},
hr : {
OK      : "OK",
CANCEL  : "Odustani",
CONFIRM : "Potvrdi"
},
id : {
OK      : "OK",
CANCEL  : "Batal",
CONFIRM : "OK"
},
it : {
OK      : "OK",
CANCEL  : "Annulla",
CONFIRM : "Conferma"
},
ja : {
OK      : "OK",
CANCEL  : "キャンセル",
CONFIRM : "確認"
},
lt : {
OK      : "Gerai",
CANCEL  : "Atšaukti",
CONFIRM : "Patvirtinti"
},
lv : {
OK      : "Labi",
CANCEL  : "Atcelt",
CONFIRM : "Apstiprināt"
},
nl : {
OK      : "OK",
CANCEL  : "Annuleren",
CONFIRM : "Accepteren"
},
no : {
OK      : "OK",
CANCEL  : "Avbryt",
CONFIRM : "OK"
},
pl : {
OK      : "OK",
CANCEL  : "Anuluj",
CONFIRM : "Potwierdź"
},
pt : {
OK      : "OK",
CANCEL  : "Cancelar",
CONFIRM : "Confirmar"
},
ru : {
OK      : "OK",
CANCEL  : "Отмена",
CONFIRM : "Применить"
},
sq : {
OK : "OK",
CANCEL : "Anulo",
CONFIRM : "Prano"
},
sv : {
OK      : "OK",
CANCEL  : "Avbryt",
CONFIRM : "OK"
},
th : {
OK      : "ตกลง",
CANCEL  : "ยกเลิก",
CONFIRM : "ยืนยัน"
},
tr : {
OK      : "Tamam",
CANCEL  : "İptal",
CONFIRM : "Onayla"
},
zh_CN : {
OK      : "OK",
CANCEL  : "取消",
CONFIRM : "确认"
},
zh_TW : {
OK      : "OK",
CANCEL  : "取消",
CONFIRM : "確認"
}
};
exports.addLocale = function(name, values) {
$.each(["OK", "CANCEL", "CONFIRM"], function(_, v) {
if (!values[v]) {
throw new Error("Please supply a translation for '" + v + "'");
}
});
locales[name] = {
OK: values.OK,
CANCEL: values.CANCEL,
CONFIRM: values.CONFIRM
};
return exports;
};
exports.removeLocale = function(name) {
delete locales[name];
return exports;
};
exports.setLocale = function(name) {
return exports.setDefaults("locale", name);
};
exports.init = function(_$) {
return init(_$ || $);
};
return exports;
}));/*!
* Modernizr v2.7.1
* www.modernizr.com
*
* Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
* Available under the BSD and MIT licenses: www.modernizr.com/license/
*/
/*
* Modernizr tests which native CSS3 and HTML5 features are available in
* the current UA and makes the results available to you in two ways:
* as properties on a global Modernizr object, and as classes on the
* <html> element. This information allows you to progressively enhance
* your pages with a granular level of control over the experience.
*
* Modernizr has an optional (not included) conditional resource loader
* called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
* To get a build that includes Modernizr.load(), as well as choosing
* which tests to include, go to www.modernizr.com/download/
*
* Authors        Faruk Ates, Paul Irish, Alex Sexton
* Contributors   Ryan Seddon, Ben Alman
*/
window.Modernizr = (function( window, document, undefined ) {
var version = '2.7.1',
Modernizr = {},
/*>>cssclasses*/
enableClasses = true,
/*>>cssclasses*/
docElement = document.documentElement,
/**
* Create our "modernizr" element that we do most feature tests on.
*/
mod = 'modernizr',
modElem = document.createElement(mod),
mStyle = modElem.style,
/**
* Create the input element for various Web Forms feature tests.
*/
inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,
/*>>smile*/
smile = ':)',
/*>>smile*/
toString = {}.toString,
/*>>prefixes*/
prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
/*>>prefixes*/
/*>>domprefixes*/
omPrefixes = 'Webkit Moz O ms',
cssomPrefixes = omPrefixes.split(' '),
domPrefixes = omPrefixes.toLowerCase().split(' '),
/*>>domprefixes*/
/*>>ns*/
ns = {'svg': 'http://www.w3.org/2000/svg'},
/*>>ns*/
tests = {},
inputs = {},
attrs = {},
classes = [],
slice = classes.slice,
featureName, // used in testing loop
/*>>teststyles*/
injectElementWithStyles = function( rule, callback, nodes, testnames ) {
var style, ret, node, docOverflow,
div = document.createElement('div'),
body = document.body,
fakeBody = body || document.createElement('body');
if ( parseInt(nodes, 10) ) {
while ( nodes-- ) {
node = document.createElement('div');
node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
div.appendChild(node);
}
}
style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
div.id = mod;
(body ? div : fakeBody).innerHTML += style;
fakeBody.appendChild(div);
if ( !body ) {
fakeBody.style.background = '';
fakeBody.style.overflow = 'hidden';
docOverflow = docElement.style.overflow;
docElement.style.overflow = 'hidden';
docElement.appendChild(fakeBody);
}
ret = callback(div, rule);
if ( !body ) {
fakeBody.parentNode.removeChild(fakeBody);
docElement.style.overflow = docOverflow;
} else {
div.parentNode.removeChild(div);
}
return !!ret;
},
/*>>teststyles*/
/*>>mq*/
testMediaQuery = function( mq ) {
var matchMedia = window.matchMedia || window.msMatchMedia;
if ( matchMedia ) {
return matchMedia(mq).matches;
}
var bool;
injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
bool = (window.getComputedStyle ?
getComputedStyle(node, null) :
node.currentStyle)['position'] == 'absolute';
});
return bool;
},
/*>>mq*/
/*>>hasevent*/
isEventSupported = (function() {
var TAGNAMES = {
'select': 'input', 'change': 'input',
'submit': 'form', 'reset': 'form',
'error': 'img', 'load': 'img', 'abort': 'img'
};
function isEventSupported( eventName, element ) {
element = element || document.createElement(TAGNAMES[eventName] || 'div');
eventName = 'on' + eventName;
var isSupported = eventName in element;
if ( !isSupported ) {
if ( !element.setAttribute ) {
element = document.createElement('div');
}
if ( element.setAttribute && element.removeAttribute ) {
element.setAttribute(eventName, '');
isSupported = is(element[eventName], 'function');
if ( !is(element[eventName], 'undefined') ) {
element[eventName] = undefined;
}
element.removeAttribute(eventName);
}
}
element = null;
return isSupported;
}
return isEventSupported;
})(),
/*>>hasevent*/
_hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;
if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
hasOwnProp = function (object, property) {
return _hasOwnProperty.call(object, property);
};
}
else {
hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
};
}
if (!Function.prototype.bind) {
Function.prototype.bind = function bind(that) {
var target = this;
if (typeof target != "function") {
throw new TypeError();
}
var args = slice.call(arguments, 1),
bound = function () {
if (this instanceof bound) {
var F = function(){};
F.prototype = target.prototype;
var self = new F();
var result = target.apply(
self,
args.concat(slice.call(arguments))
);
if (Object(result) === result) {
return result;
}
return self;
} else {
return target.apply(
that,
args.concat(slice.call(arguments))
);
}
};
return bound;
};
}
/**
* setCss applies given styles to the Modernizr DOM node.
*/
function setCss( str ) {
mStyle.cssText = str;
}
/**
* setCssAll extrapolates all vendor-specific css strings.
*/
function setCssAll( str1, str2 ) {
return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
}
/**
* is returns a boolean for if typeof obj is exactly type.
*/
function is( obj, type ) {
return typeof obj === type;
}
/**
* contains returns a boolean for if substr is found within str.
*/
function contains( str, substr ) {
return !!~('' + str).indexOf(substr);
}
/*>>testprop*/
function testProps( props, prefixed ) {
for ( var i in props ) {
var prop = props[i];
if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
return prefixed == 'pfx' ? prop : true;
}
}
return false;
}
/*>>testprop*/
/**
* testDOMProps is a generic DOM property test; if a browser supports
*   a certain property, it won't return undefined for it.
*/
function testDOMProps( props, obj, elem ) {
for ( var i in props ) {
var item = obj[props[i]];
if ( item !== undefined) {
if (elem === false) return props[i];
if (is(item, 'function')){
return item.bind(elem || obj);
}
return item;
}
}
return false;
}
/*>>testallprops*/
/**
* testPropsAll tests a list of DOM properties we want to check against.
*   We specify literally ALL possible (known and/or likely) properties on
*   the element including the non-vendor prefixed one, for forward-
*   compatibility.
*/
function testPropsAll( prop, prefixed, elem ) {
var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');
if(is(prefixed, "string") || is(prefixed, "undefined")) {
return testProps(props, prefixed);
} else {
props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
return testDOMProps(props, prefixed, elem);
}
}
/*>>testallprops*/
/**
* Tests
* -----
*/
tests['flexbox'] = function() {
return testPropsAll('flexWrap');
};
tests['flexboxlegacy'] = function() {
return testPropsAll('boxDirection');
};
tests['canvas'] = function() {
var elem = document.createElement('canvas');
return !!(elem.getContext && elem.getContext('2d'));
};
tests['canvastext'] = function() {
return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
};
tests['webgl'] = function() {
return !!window.WebGLRenderingContext;
};
/*
* The Modernizr.touch test only indicates if the browser supports
*    touch events, which does not necessarily reflect a touchscreen
*    device, as evidenced by tablets running Windows 7 or, alas,
*    the Palm Pre / WebOS (touch) phones.
*
* Additionally, Chrome (desktop) used to lie about its support on this,
*    but that has since been rectified: crbug.com/36415
*
* We also test for Firefox 4 Multitouch Support.
*
* For more info, see: modernizr.github.com/Modernizr/touch.html
*/
tests['touch'] = function() {
var bool;
if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
bool = true;
} else {
injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
bool = node.offsetTop === 9;
});
}
return bool;
};
tests['geolocation'] = function() {
return 'geolocation' in navigator;
};
tests['postmessage'] = function() {
return !!window.postMessage;
};
tests['websqldatabase'] = function() {
return !!window.openDatabase;
};
tests['indexedDB'] = function() {
return !!testPropsAll("indexedDB", window);
};
tests['hashchange'] = function() {
return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
};
tests['history'] = function() {
return !!(window.history && history.pushState);
};
tests['draganddrop'] = function() {
var div = document.createElement('div');
return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
};
tests['websockets'] = function() {
return 'WebSocket' in window || 'MozWebSocket' in window;
};
tests['rgba'] = function() {
setCss('background-color:rgba(150,255,150,.5)');
return contains(mStyle.backgroundColor, 'rgba');
};
tests['hsla'] = function() {
setCss('background-color:hsla(120,40%,100%,.5)');
return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
};
tests['multiplebgs'] = function() {
setCss('background:url(https://),url(https://),red url(https://)');
return (/(url\s*\(.*?){3}/).test(mStyle.background);
};
tests['backgroundsize'] = function() {
return testPropsAll('backgroundSize');
};
tests['borderimage'] = function() {
return testPropsAll('borderImage');
};
tests['borderradius'] = function() {
return testPropsAll('borderRadius');
};
tests['boxshadow'] = function() {
return testPropsAll('boxShadow');
};
tests['textshadow'] = function() {
return document.createElement('div').style.textShadow === '';
};
tests['opacity'] = function() {
setCssAll('opacity:.55');
return (/^0.55$/).test(mStyle.opacity);
};
tests['cssanimations'] = function() {
return testPropsAll('animationName');
};
tests['csscolumns'] = function() {
return testPropsAll('columnCount');
};
tests['cssgradients'] = function() {
/**
* For CSS Gradients syntax, please see:
* webkit.org/blog/175/introducing-css-gradients/
* developer.mozilla.org/en/CSS/-moz-linear-gradient
* developer.mozilla.org/en/CSS/-moz-radial-gradient
* dev.w3.org/csswg/css3-images/#gradients-
*/
var str1 = 'background-image:',
str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
str3 = 'linear-gradient(left top,#9f9, white);';
setCss(
(str1 + '-webkit- '.split(' ').join(str2 + str1) +
prefixes.join(str3 + str1)).slice(0, -str1.length)
);
return contains(mStyle.backgroundImage, 'gradient');
};
tests['cssreflections'] = function() {
return testPropsAll('boxReflect');
};
tests['csstransforms'] = function() {
return !!testPropsAll('transform');
};
tests['csstransforms3d'] = function() {
var ret = !!testPropsAll('perspective');
if ( ret && 'webkitPerspective' in docElement.style ) {
injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
ret = node.offsetLeft === 9 && node.offsetHeight === 3;
});
}
return ret;
};
tests['csstransitions'] = function() {
return testPropsAll('transition');
};
/*>>fontface*/
tests['fontface'] = function() {
var bool;
injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
var style = document.getElementById('smodernizr'),
sheet = style.sheet || style.styleSheet,
cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
});
return bool;
};
/*>>fontface*/
tests['generatedcontent'] = function() {
var bool;
injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
bool = node.offsetHeight >= 3;
});
return bool;
};
tests['video'] = function() {
var elem = document.createElement('video'),
bool = false;
try {
if ( bool = !!elem.canPlayType ) {
bool      = new Boolean(bool);
bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');
bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');
bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
}
} catch(e) { }
return bool;
};
tests['audio'] = function() {
var elem = document.createElement('audio'),
bool = false;
try {
if ( bool = !!elem.canPlayType ) {
bool      = new Boolean(bool);
bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');
bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
}
} catch(e) { }
return bool;
};
tests['localstorage'] = function() {
try {
localStorage.setItem(mod, mod);
localStorage.removeItem(mod);
return true;
} catch(e) {
return false;
}
};
tests['sessionstorage'] = function() {
try {
sessionStorage.setItem(mod, mod);
sessionStorage.removeItem(mod);
return true;
} catch(e) {
return false;
}
};
tests['webworkers'] = function() {
return !!window.Worker;
};
tests['applicationcache'] = function() {
return !!window.applicationCache;
};
tests['svg'] = function() {
return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
};
tests['inlinesvg'] = function() {
var div = document.createElement('div');
div.innerHTML = '<svg/>';
return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
};
tests['smil'] = function() {
return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
};
tests['svgclippaths'] = function() {
return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
};
/*>>webforms*/
function webforms() {
/*>>input*/
Modernizr['input'] = (function( props ) {
for ( var i = 0, len = props.length; i < len; i++ ) {
attrs[ props[i] ] = !!(props[i] in inputElem);
}
if (attrs.list){
attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
}
return attrs;
})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
/*>>input*/
/*>>inputtypes*/
Modernizr['inputtypes'] = (function(props) {
for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {
inputElem.setAttribute('type', inputElemType = props[i]);
bool = inputElem.type !== 'text';
if ( bool ) {
inputElem.value         = smile;
inputElem.style.cssText = 'position:absolute;visibility:hidden;';
if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {
docElement.appendChild(inputElem);
defaultView = document.defaultView;
bool =  defaultView.getComputedStyle &&
defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
(inputElem.offsetHeight !== 0);
docElement.removeChild(inputElem);
} else if ( /^(search|tel)$/.test(inputElemType) ){
} else if ( /^(url|email)$/.test(inputElemType) ) {
bool = inputElem.checkValidity && inputElem.checkValidity() === false;
} else {
bool = inputElem.value != smile;
}
}
inputs[ props[i] ] = !!bool;
}
return inputs;
})('search tel url email datetime date month week time datetime-local number range color'.split(' '));
/*>>inputtypes*/
}
/*>>webforms*/
for ( var feature in tests ) {
if ( hasOwnProp(tests, feature) ) {
featureName  = feature.toLowerCase();
Modernizr[featureName] = tests[feature]();
classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
}
}
/*>>webforms*/
Modernizr.input || webforms();
/*>>webforms*/
/**
* addTest allows the user to define their own feature tests
* the result will be added onto the Modernizr object,
* as well as an appropriate className set on the html element
*
* @param feature - String naming the feature
* @param test - Function returning true if feature is supported, false if not
*/
Modernizr.addTest = function ( feature, test ) {
if ( typeof feature == 'object' ) {
for ( var key in feature ) {
if ( hasOwnProp( feature, key ) ) {
Modernizr.addTest( key, feature[ key ] );
}
}
} else {
feature = feature.toLowerCase();
if ( Modernizr[feature] !== undefined ) {
return Modernizr;
}
test = typeof test == 'function' ? test() : test;
if (typeof enableClasses !== "undefined" && enableClasses) {
docElement.className += ' ' + (test ? '' : 'no-') + feature;
}
Modernizr[feature] = test;
}
return Modernizr; // allow chaining.
};
setCss('');
modElem = inputElem = null;
/*>>shiv*/
/**
* @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;(function(window, document) {
/*jshint evil:true */
/** version */
var version = '3.7.0';
/** Preset options */
var options = window.html5 || {};
/** Used to skip problem elements */
var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
/** Not all elements can be cloned in IE **/
var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
/** Detect whether the browser supports default html5 styles */
var supportsHtml5Styles;
/** Name of the expando, to work with multiple documents or to re-shiv one document */
var expando = '_html5shiv';
/** The id for the the documents expando */
var expanID = 0;
/** Cached data for each document */
var expandoData = {};
/** Detect whether the browser supports unknown elements */
var supportsUnknownElements;
(function() {
try {
var a = document.createElement('a');
a.innerHTML = '<xyz></xyz>';
supportsHtml5Styles = ('hidden' in a);
supportsUnknownElements = a.childNodes.length == 1 || (function() {
(document.createElement)('a');
var frag = document.createDocumentFragment();
return (
typeof frag.cloneNode == 'undefined' ||
typeof frag.createDocumentFragment == 'undefined' ||
typeof frag.createElement == 'undefined'
);
}());
} catch(e) {
supportsHtml5Styles = true;
supportsUnknownElements = true;
}
}());
/*--------------------------------------------------------------------------*/
/**
* Creates a style sheet with the given CSS text and adds it to the document.
* @private
* @param {Document} ownerDocument The document.
* @param {String} cssText The CSS text.
* @returns {StyleSheet} The style element.
*/
function addStyleSheet(ownerDocument, cssText) {
var p = ownerDocument.createElement('p'),
parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
p.innerHTML = 'x<style>' + cssText + '</style>';
return parent.insertBefore(p.lastChild, parent.firstChild);
}
/**
* Returns the value of `html5.elements` as an array.
* @private
* @returns {Array} An array of shived element node names.
*/
function getElements() {
var elements = html5.elements;
return typeof elements == 'string' ? elements.split(' ') : elements;
}
/**
* Returns the data associated to the given document
* @private
* @param {Document} ownerDocument The document.
* @returns {Object} An object of data.
*/
function getExpandoData(ownerDocument) {
var data = expandoData[ownerDocument[expando]];
if (!data) {
data = {};
expanID++;
ownerDocument[expando] = expanID;
expandoData[expanID] = data;
}
return data;
}
/**
* returns a shived element for the given nodeName and document
* @memberOf html5
* @param {String} nodeName name of the element
* @param {Document} ownerDocument The context document.
* @returns {Object} The shived element.
*/
function createElement(nodeName, ownerDocument, data){
if (!ownerDocument) {
ownerDocument = document;
}
if(supportsUnknownElements){
return ownerDocument.createElement(nodeName);
}
if (!data) {
data = getExpandoData(ownerDocument);
}
var node;
if (data.cache[nodeName]) {
node = data.cache[nodeName].cloneNode();
} else if (saveClones.test(nodeName)) {
node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
} else {
node = data.createElem(nodeName);
}
return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
}
/**
* returns a shived DocumentFragment for the given document
* @memberOf html5
* @param {Document} ownerDocument The context document.
* @returns {Object} The shived DocumentFragment.
*/
function createDocumentFragment(ownerDocument, data){
if (!ownerDocument) {
ownerDocument = document;
}
if(supportsUnknownElements){
return ownerDocument.createDocumentFragment();
}
data = data || getExpandoData(ownerDocument);
var clone = data.frag.cloneNode(),
i = 0,
elems = getElements(),
l = elems.length;
for(;i<l;i++){
clone.createElement(elems[i]);
}
return clone;
}
/**
* Shivs the `createElement` and `createDocumentFragment` methods of the document.
* @private
* @param {Document|DocumentFragment} ownerDocument The document.
* @param {Object} data of the document.
*/
function shivMethods(ownerDocument, data) {
if (!data.cache) {
data.cache = {};
data.createElem = ownerDocument.createElement;
data.createFrag = ownerDocument.createDocumentFragment;
data.frag = data.createFrag();
}
ownerDocument.createElement = function(nodeName) {
if (!html5.shivMethods) {
return data.createElem(nodeName);
}
return createElement(nodeName, ownerDocument, data);
};
ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
'var n=f.cloneNode(),c=n.createElement;' +
'h.shivMethods&&(' +
getElements().join().replace(/[\w\-]+/g, function(nodeName) {
data.createElem(nodeName);
data.frag.createElement(nodeName);
return 'c("' + nodeName + '")';
}) +
');return n}'
)(html5, data.frag);
}
/*--------------------------------------------------------------------------*/
/**
* Shivs the given document.
* @memberOf html5
* @param {Document} ownerDocument The document to shiv.
* @returns {Document} The shived document.
*/
function shivDocument(ownerDocument) {
if (!ownerDocument) {
ownerDocument = document;
}
var data = getExpandoData(ownerDocument);
if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
data.hasCSS = !!addStyleSheet(ownerDocument,
'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
'mark{background:#FF0;color:#000}' +
'template{display:none}'
);
}
if (!supportsUnknownElements) {
shivMethods(ownerDocument, data);
}
return ownerDocument;
}
/*--------------------------------------------------------------------------*/
/**
* The `html5` object is exposed so that more elements can be shived and
* existing shiving can be detected on iframes.
* @type Object
* @example
*
* // options can be changed before the script is included
* html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
*/
var html5 = {
/**
* An array or space separated string of node names of the elements to shiv.
* @memberOf html5
* @type Array|String
*/
'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',
/**
* current version of html5shiv
*/
'version': version,
/**
* A flag to indicate that the HTML5 style sheet should be inserted.
* @memberOf html5
* @type Boolean
*/
'shivCSS': (options.shivCSS !== false),
/**
* Is equal to true if a browser supports creating unknown/HTML5 elements
* @memberOf html5
* @type boolean
*/
'supportsUnknownElements': supportsUnknownElements,
/**
* A flag to indicate that the document's `createElement` and `createDocumentFragment`
* methods should be overwritten.
* @memberOf html5
* @type Boolean
*/
'shivMethods': (options.shivMethods !== false),
/**
* A string to describe the type of `html5` object ("default" or "default print").
* @memberOf html5
* @type String
*/
'type': 'default',
'shivDocument': shivDocument,
createElement: createElement,
createDocumentFragment: createDocumentFragment
};
/*--------------------------------------------------------------------------*/
window.html5 = html5;
shivDocument(document);
}(this, document));
/*>>shiv*/
Modernizr._version      = version;
/*>>prefixes*/
Modernizr._prefixes     = prefixes;
/*>>prefixes*/
/*>>domprefixes*/
Modernizr._domPrefixes  = domPrefixes;
Modernizr._cssomPrefixes  = cssomPrefixes;
/*>>domprefixes*/
/*>>mq*/
Modernizr.mq            = testMediaQuery;
/*>>mq*/
/*>>hasevent*/
Modernizr.hasEvent      = isEventSupported;
/*>>hasevent*/
/*>>testprop*/
Modernizr.testProp      = function(prop){
return testProps([prop]);
};
/*>>testprop*/
/*>>testallprops*/
Modernizr.testAllProps  = testPropsAll;
/*>>testallprops*/
/*>>teststyles*/
Modernizr.testStyles    = injectElementWithStyles;
/*>>teststyles*/
/*>>prefixed*/
Modernizr.prefixed      = function(prop, obj, elem){
if(!obj) {
return testPropsAll(prop, 'pfx');
} else {
return testPropsAll(prop, obj, elem);
}
};
/*>>prefixed*/
/*>>cssclasses*/
docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +
(enableClasses ? ' js ' + classes.join(' ') : '');
/*>>cssclasses*/
return Modernizr;
})(this, this.document);/*!
 * Isotope PACKAGED v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */

!function(t,e){"use strict";"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,n){var o,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,n);o=void 0===o?l:o}),void 0!==o?o:t}function h(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new s(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return u(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];o;){var r=s&&s[o];r&&(this.off(t,o),delete s[o]),o.apply(this,e),n+=r?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;h>e;e++){var i=u[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s.isBoxSizeOuter=r=200==t(o.width),i.removeChild(e)}}function s(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=n(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;h>l;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,x=t(s.width);x!==!1&&(a.width=x+(z?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),s=0;s<i.length;s++)o.push(i[s])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,e),delete s[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?t():document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=h[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],s=this.layout.size,r=-1!=n.indexOf("%")?parseFloat(n)/100*s.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*s.height:parseInt(o,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[o];e[s]=this.getXValue(a),e[r]="";var u=n?"paddingTop":"paddingBottom",h=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),s=parseInt(e,10),r=o===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-n,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,s){return e(t,i,n,o,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function s(t,e){var i=n.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,f[o]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=o,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;n.extend(c,e.prototype),c.option=function(t){n.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var s=e[o],r=new i(s,this);n.push(r)}return n},c._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){r++,r==s&&i()}var o=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,n)})},c.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),s={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return s},c.handleEvent=n.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},n.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=o,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),n=i._create;i._create=function(){this.id=this.layout.itemGUID++,n.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var n=e[i];this.sortData[i]=n(this.element,this)}}};var o=i.destroy;return i.destroy=function(){o.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var n=i.prototype,o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return o.forEach(function(t){n[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),n.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},n._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},n.getColumnWidth=function(){this.getSegmentSize("column","Width")},n.getRowHeight=function(){this.getSegmentSize("row","Height")},n.getSegmentSize=function(t,e){var i=t+e,n="outer"+e;if(this._getMeasurement(i,n),!this[i]){var o=this.getFirstItemSize();this[i]=o&&o[n]||this.isotope.size["inner"+e]}},n.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},n.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},n.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=Object.create(n),o.prototype.constructor=o,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,s=o/n,r=n-o%n,a=r&&1>r?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),s=Math.min.apply(Math,o),r=o.indexOf(s),a={x:this.columnWidth*r,y:s},u=s+t.size.outerHeight,h=this.cols+1-o.length,d=0;h>d;d++)this.colYs[r+d]=u;return a},i.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),s=o?n.left:n.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?n.top:n.bottom)+i.outerHeight,l=a;u>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),n=i.prototype,o={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)o[s]||(n[s]=e.prototype[s]);var r=n.measureColumns;n.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=n._getOption;return n._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var n={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,n},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,n,o,s,r,a){return e(t,i,n,o,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope/js/item"),require("isotope/js/layout-mode"),require("isotope/js/layout-modes/masonry"),require("isotope/js/layout-modes/fit-rows"),require("isotope/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,n,o,s,r){function a(t,e){return function(i,n){for(var o=0;o<t.length;o++){var s=t[o],r=i.sortData[s],a=n.sortData[s];if(r>a||a>r){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?o.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&n&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var e,i,n,o=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){n=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],n=[],o=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?n.push(a):u||a.isHidden||o.push(a)}}return{matches:i,needReveal:n,needHide:o}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return n(e.element,t)}},l.updateSortData=function(t){var e;t?(t=o.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&e>i;i++){var n=t[i];n.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),n=i[0],o=n.match(/^\[(.+)\]$/),s=o&&o[1],r=e(s,n),a=d.sortDataParsers[i[1]];
return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=a(e,this.options.sortAscending);this.filteredItems.sort(i),t!=this.sortHistory[0]&&this.sortHistory.unshift(t)}},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,n,o=e.length;for(i=0;o>i;i++)n=e[i],this.element.appendChild(n.element);var s=this._filter(e).matches;for(i=0;o>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;o>i;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=o.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,n=0;i&&i>n;n++){var s=e[n];o.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var n=t.apply(this,e);return this.options.transitionDuration=i,n},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});// Carousel
(function(theme, $) {
theme = theme || {};
var instanceName = '__carousel';
var PluginCarousel = function($el, opts) {
return this.initialize($el, opts);
};
PluginCarousel.defaults = {
loop: true,
responsive: {
0: {
items: 1
},
479: {
items: 1
},
768: {
items: 2
},
979: {
items: 3
},
1199: {
items: 4
}
},
navText: []
};
PluginCarousel.prototype = {
initialize: function($el, opts) {
if ($el.data(instanceName)) {
return this;
}
this.$el = $el;
this
.setData()
.setOptions(opts)
.build();
return this;
},
setData: function() {
this.$el.data(instanceName, this);
return this;
},
setOptions: function(opts) {
this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
wrapper: this.$el
});
return this;
},
build: function() {
if (!($.isFunction($.fn.owlCarousel))) {
return this;
}
var self = this,
$el = this.options.wrapper;
$el.addClass('owl-theme');
if ($('html').attr('dir') == 'rtl') {
this.options = $.extend(true, {}, this.options, {
rtl: true
});
}
if (this.options.items == 1) {
this.options.responsive = {}
}
if (this.options.items > 4) {
this.options = $.extend(true, {}, this.options, {
responsive: {
1199: {
items: this.options.items
}
}
});
}
if (this.options.autoHeight) {
$(window).afterResize(function() {
$el.find('.owl-stage-outer').height( $el.find('.owl-item.active').height() );
});
$(window).load(function() {
$el.find('.owl-stage-outer').height( $el.find('.owl-item.active').height() );
});
}
$el.owlCarousel(this.options).addClass("owl-carousel-init");
return this;
}
};
$.extend(theme, {
PluginCarousel: PluginCarousel
});
$.fn.themePluginCarousel = function(opts) {
return this.map(function() {
var $this = $(this);
if ($this.data(instanceName)) {
return $this.data(instanceName);
} else {
return new PluginCarousel($this, opts);
}
});
}
}).apply(this, [window.theme, jQuery]);
(function($) {
'use strict';
if ($.isFunction($.fn['themePluginCarousel'])) {
$(function() {
$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCarousel(opts);
});
});
}
}).apply(this, [jQuery]);/**
* Plugin Name: Count To
* Written by: Matt Huggins - https://github.com/mhuggins/jquery-countTo
*/
(function ($) {
$.fn.countTo = function (options) {
options = options || {};
return $(this).each(function () {
var settings = $.extend({}, $.fn.countTo.defaults, {
from:            $(this).data('from'),
to:              $(this).data('to'),
speed:           $(this).data('speed'),
refreshInterval: $(this).data('refresh-interval'),
decimals:        $(this).data('decimals')
}, options);
var loops = Math.ceil(settings.speed / settings.refreshInterval),
increment = (settings.to - settings.from) / loops;
var self = this,
$self = $(this),
loopCount = 0,
value = settings.from,
data = $self.data('countTo') || {};
$self.data('countTo', data);
if (data.interval) {
clearInterval(data.interval);
}
data.interval = setInterval(updateTimer, settings.refreshInterval);
render(value);
function updateTimer() {
value += increment;
loopCount++;
render(value);
if (typeof(settings.onUpdate) == 'function') {
settings.onUpdate.call(self, value);
}
if (loopCount >= loops) {
$self.removeData('countTo');
clearInterval(data.interval);
value = settings.to;
if (typeof(settings.onComplete) == 'function') {
settings.onComplete.call(self, value);
}
}
}
function render(value) {
var formattedValue = settings.formatter.call(self, value, settings);
$self.html(formattedValue);
}
});
};
$.fn.countTo.defaults = {
from: 0,               // the number the element should start at
to: 0,                 // the number the element should end at
speed: 1000,           // how long it should take to count between the target numbers
refreshInterval: 100,  // how often the element should be updated
decimals: 0,           // the number of decimal places to show
formatter: formatter,  // handler for formatting the value before rendering
onUpdate: null,        // callback method for every time the element is updated
onComplete: null       // callback method for when the element finishes updating
};
function formatter(value, settings) {
return value.toFixed(settings.decimals);
}
}(jQuery));
/**
* Counter Module.
* Dependencies - jQuery Count To Plugin - https://github.com/mhuggins/jquery-countTo
*/
(function(theme, $) {
theme = theme || {};
var instanceName = '__counter';
var PluginCounter = function($el, opts) {
return this.initialize($el, opts);
};
PluginCounter.defaults = {
accX: 0,
accY: 0,
speed: 3000,
refreshInterval: 100,
decimals: 0,
onUpdate: null,
onComplete: null
};
PluginCounter.prototype = {
initialize: function($el, opts) {
if ($el.data(instanceName)) {
return this;
}
this.$el = $el;
this
.setData()
.setOptions(opts)
.build();
return this;
},
setData: function() {
this.$el.data(instanceName, this);
return this;
},
setOptions: function(opts) {
this.options = $.extend(true, {}, PluginCounter.defaults, opts, {
wrapper: this.$el
});
return this;
},
build: function() {
if (!($.isFunction($.fn.countTo))) {
return this;
}
var self = this,
$el = this.options.wrapper;
$.extend(self.options, {
onComplete: function() {
if ($el.data('append')) {
$el.html($el.html() + $el.data('append'));
}
if ($el.data('prepend')) {
$el.html($el.data('prepend') + $el.html());
}
}
});
$el.appear(function() {
$el.countTo(self.options);
}, {
accX: self.options.accX,
accY: self.options.accY
});
return this;
}
};
$.extend(theme, {
PluginCounter: PluginCounter
});
$.fn.themePluginCounter = function(opts) {
return this.map(function() {
var $this = $(this);
if ($this.data(instanceName)) {
return $this.data(instanceName);
} else {
return new PluginCounter($this, opts);
}
});
}
}).apply(this, [window.theme, jQuery]);
(function($) {
'use strict';
if ($.isFunction($.fn['themePluginCounter'])) {
$(function() {
$('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCounter(opts);
});
});
}
}).apply(this, [jQuery]);jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var layoutNUM = $('#layoutNUM').val();
if (layoutNUM!='2' && layoutNUM!='15' && layoutNUM!='3' && layoutNUM!='11' && layoutNUM!='4' && layoutNUM!='20') {
if ($('.inside_page').length==0) {
if ($('.opacity-full').length>0) { //If there is no opacity FULL we take the menu right when we start scroll
var beforeScrollMenuHeight = $('#mainNav').height()+parseInt($('body').css('margin-top'),10);
} else {
if (layoutNUM!='13') {
var beforeScrollMenuHeight = parseInt($('body').css('margin-top'),10);
} else {
var beforeScrollMenuHeight = parseInt($('body').css('margin-top'),10)+40; //Layout 13 have 40px margin top
}
}
if (beforeScrollMenuHeight==0) {
beforeScrollMenuHeight = 1;
}
} else {
var beforeScrollMenuHeight = parseInt($('body').css('margin-top'),10);
}
$('body').scrollspy({
target: '#mainNav',
offset: beforeScrollMenuHeight
});
$('#mainNav').affix({
offset: {
top: beforeScrollMenuHeight
}
});
if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
setTimeout(function() {
ReduseMenuSizeWhenWeDontHavePlace();
},150);
} else {
document.fonts.ready.then(function () {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
$( window ).resize(function() {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
});
});jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var layoutNUM = $('#layoutNUM').val();
if (layoutNUM=='2') {
var beforeScrollMenuHeight = $('#mainNav .navbar-header').height()+parseInt($('body').css('margin-top'),10);
$('body').scrollspy({
target: '#mainNav #top-menu',
offset: beforeScrollMenuHeight
});
$('#mainNav #top-menu').affix({
offset: {
top: beforeScrollMenuHeight
}
});
if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
setTimeout(function() {
ReduseMenuSizeWhenWeDontHavePlace();
},150);
} else {
document.fonts.ready.then(function () {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
$( window ).resize(function() {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
});
});jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var layoutNUM = $('#layoutNUM').val();
if (layoutNUM=='15') {
if ($('.inside_page').length==0) {
var beforeScrollMenuHeight = $(window).height()-$('#mainNav').height();
} else {
var beforeScrollMenuHeight = 0;
}
$('body').scrollspy({
target: '#mainNav',
offset: 0 //Must be 0 so the second page (if he is short) will be show
});
$('#mainNav').affix({
offset: {
top: beforeScrollMenuHeight
}
});
if ($('.home_page').length !== 0) {
$('#mainNav').off('affix.bs.affix').on( 'affix.bs.affix', function () {
$('.navbar-fixed-top').css({
'position':'fixed',
'bottom':'auto',
'top':'0'
});
});
$('#mainNav').off('affix-top.bs.affix').on( 'affix-top.bs.affix', function () {
$('.navbar-fixed-top').css({
'position':'absolute',
'bottom':'0',
'top':'auto'
});
});
}
if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
setTimeout(function() {
ReduseMenuSizeWhenWeDontHavePlace();
},150);
} else {
document.fonts.ready.then(function () {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
$( window ).resize(function() {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
});
});jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var layoutNUM = $('#layoutNUM').val();
if (layoutNUM=='20') {
var topMenuHeight = $('#mainNav').height();
if ($('.inside_page').length==0) {
var beforeScrollMenuHeight = $(window).height();
} else {
var beforeScrollMenuHeight = 0;
}
$('body').scrollspy({
target: '#mainNav',
offset: 0 //Must be 0 so the second page (if he is short) will be show
});
$('#mainNav').affix({
offset: {
top: beforeScrollMenuHeight
}
});
if ($('.home_page').length !== 0) {
$('#mainNav').off('affix.bs.affix').on( 'affix.bs.affix', function () {
$('.navbar-fixed-top').css({
'position':'fixed',
'bottom':'auto',
'top':'0'
});
});
$('#mainNav').off('affix-top.bs.affix').on( 'affix-top.bs.affix', function () {
$('.navbar-fixed-top').css({
'position':'absolute',
'bottom':'-'+topMenuHeight+'px',
'top':'auto'
});
});
}
if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
setTimeout(function() {
ReduseMenuSizeWhenWeDontHavePlace();
},150);
} else {
document.fonts.ready.then(function () {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
$( window ).resize(function() {
ReduseMenuSizeWhenWeDontHavePlace();
});
}
});
});jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var layoutNUM = $('#layoutNUM').val();
if (layoutNUM=='3' || layoutNUM=='11') {
$("#menu-toggle,#smallSidebar").off('click').click(function(e) {
e.preventDefault();
e.stopPropagation();
$("#header").toggleClass("active");
layout3_changeBarsIcon();
});
$("#top-section,.s123-modules-container,.s123-pages-container,footer").off('click.bodyCloseMenu').on('click.bodyCloseMenu', function (e) {
$("#header").removeClass("active");
layout3_changeBarsIcon();
});
$('body').scrollspy({
target: '#header'
});
$('#header #top-menu li').not('.dropdown-submenu').find('a').off('click').click(function() {
$("#menu-toggle").click();
});
if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
setTimeout(function() {
ReduseMenuSizeWhenWeDontHavePlaceHeight();
},150);
} else {
document.fonts.ready.then(function () {
ReduseMenuSizeWhenWeDontHavePlaceHeight();
});
}
$( window ).resize(function() {
ReduseMenuSizeWhenWeDontHavePlaceHeight();
});
}
});
});
function layout3_changeBarsIcon() {
if ($("#header").hasClass('active')) {
$("#menu-toggle").find('.fa').removeClass('fa-bars').addClass('fa-close');
} else {
$("#menu-toggle").find('.fa').removeClass('fa-close').addClass('fa-bars');
}
}jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var layoutNUM = $('#layoutNUM').val();
if (layoutNUM=='4') {
$('body').scrollspy({
target: '#top-menu'
});
if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
setTimeout(function() {
ReduseMenuSizeWhenWeDontHavePlaceHeight();
},150);
} else {
document.fonts.ready.then(function () {
ReduseMenuSizeWhenWeDontHavePlaceHeight();
});
}
$( window ).resize(function() {
ReduseMenuSizeWhenWeDontHavePlaceHeight();
});
}
});
});jQuery(function($) {
VideoModuleInitialize();
});
/**
* The function initialize the Video Module.
*/
function VideoModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-videos');
$($section).each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $isotopeFilter = $sectionThis.find('.filter');
/**
* Video Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
delegate: '.mfp-iframe:visible',						// Isotope Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
iframe: {
patterns: {
youtube: {
index: 'youtube.com/',
id: function(url) {
var matches = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
if ( !matches || !matches[1] ) return null;
return matches[1];
},
src: '//www.youtube.com/embed/%id%?autoplay=1'
},
vimeo: {
index: 'vimeo.com/',
id: function(url) {
var matches = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
if ( !matches || !matches[5] ) return null;
return matches[5];
},
src: '//player.vimeo.com/video/%id%?autoplay=1'
}
}
},
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
}
});
gallery_SetImageWidth($sectionThis);
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.s123-module-gallery .gallery-item-wrapper',
filter: '.all'
});
/**
* Fix Images Height & Position Problem - If the Isotope sort the images
* before they already load, there is a height & position images problem.
* Reproduce: Delete browser cache (images) >> Wizard >> Pages >> Gallery >> Edit >> Close.
* Explanations: http://blog.codebusters.pl/en/images-height-and-position-problem-masonry-isotope/
* Documentations: http://isotope.metafizzy.co/layout.html#imagesloaded
*/
$isotopeContainer.imagesLoaded().progress( function( instance, image ) {
$isotopeContainer.isotope('layout');
$(image.img).css({visibility:'visible'});
});
$isotopeFilter.find('a').click(function () {
var filter = $(this).attr('data-filter');
$isotopeContainer.isotope({ filter: filter });
$isotopeFilter.find('a').parent().removeClass('active');
$(this).parent().addClass('active');
return false;
});
$(window).resize(function (event) {
var $section = $('section.s123-module-videos');
$($section).each(function( index ) {
var $sectionThis	= $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
gallery_SetImageWidth($sectionThis);
});
});
});
});
}jQuery(function($) {
GalleryModuleInitialize();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.isotope-gallery:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $isotopeFilter = $sectionThis.find('.filter');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
mainClass: 'mfp-module-gallery',
delegate: '.mfp-image:visible',						// Isotope Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
markup: '<div class="mfp-figure">'+
'<div class="mfp-close"></div>'+
'<div class="mfp-img"></div>'+
'<div class="mfp-bottom-bar fancy-scrollbar">'+
'<div class="mfp-title"></div>'+
'<div class="mfp-counter"></div>'+
'<span class="mfp-caption-close"><i class="fa fa-times"></i></span>'+
'</div>'+
'</div>',
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
},
iframe: {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
markup: '<div class="mfp-iframe-scaler">' +
'<div class="mfp-close"></div>' +
'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
'<div class="mfp-title" style="position: absolute; padding-top: 5px;"></div>' +
'</div>',
patterns: {
youtube: {
index: 'youtube.com/',
id: function(url) {
var matches = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
if ( !matches || !matches[1] ) return null;
return matches[1];
},
src: '//www.youtube.com/embed/%id%?autoplay=1'
},
vimeo: {
index: 'vimeo.com/',
id: function(url) {
var matches = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
if ( !matches || !matches[5] ) return null;
return matches[5];
},
src: '//player.vimeo.com/video/%id%?autoplay=1'
},
site123: {
index: $GLOBALS['cdn-user-files'],
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
},
site123Processing: {
index: '/files/images/video-processing.png',
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
}
}
},
callbacks: {
elementParse: function( item ) {
if( item.el.data('type') === 'video' ) {
item.type = 'iframe';
} else {
item.type = 'image';
}
},
markupParse: function(template, values, item) {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
values.title = item.el.data('caption');
/**
* Prevent closing the pop-up when the user clicks on caption, I didn't found
* a good event to handle it for all medias (including videos) so I use timeout.
*/
setTimeout(function(){
$('.mfp-title').off('click').click(function( event ) {
event.stopPropagation();
});
},500);
if ( !this.mp_currentPageUrl ) this.mp_currentPageUrl = window.location.href;
window.history.replaceState(this.mp_currentPageUrl,'Title',item.el.data('image-page-url'));
},
updateStatus: function( data ) {
var $bar = $('.mfp-bottom-bar');
var $close = $('.mfp-caption-close');
$bar.show();
$close .off('click').on('click',function( event ) {
event.stopPropagation();
$bar.hide();
});
$bar.height() > 50 ? $close .show() : $close .hide();
},
close: function(item) {
window.history.replaceState('','Title',this.mp_currentPageUrl);
}
}
});
gallery_SetImageWidth($sectionThis);
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.s123-module-gallery .gallery-item-wrapper'
});
if ( $isotopeFilter.length !== 0 ) {
var $firstCategory = $isotopeFilter.find('> li > a').first();
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter($(this),$firstCategory.attr('data-filter'));
}
});
$firstCategory.parent().addClass('active');
}
/**
* Fix Images Height & Position Problem - If the Isotope sort the images
* before they already load, there is a height & position images problem.
* Reproduce: Delete browser cache (images) >> Wizard >> Pages >> Gallery >> Edit >> Close.
* Explanations: http://blog.codebusters.pl/en/images-height-and-position-problem-masonry-isotope/
* Documentations: http://isotope.metafizzy.co/layout.html#imagesloaded
*/
$isotopeContainer.imagesLoaded().progress( function( instance, image ) {
$isotopeContainer.isotope('layout');
$(image.img).css({visibility:'visible'});
});
$isotopeFilter.find('a').click(function () {
var filter = $(this).attr('data-filter');
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter($(this),filter);
}
});
$isotopeFilter.find('a').parent().removeClass('active');
$(this).parent().addClass('active');
return false;
});
$(window).resize(function (event) {
var $section = $('section.s123-module-gallery.isotope-gallery:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis	= $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
gallery_SetImageWidth($sectionThis);
});
});
});
});
}
/**
* The function filter the items related to the selected category.
* We create a custom filter function because we like to filter
* the items via data-attributes and not by class.
*/
function gallery_Filter( $item, filter ) {
return $item.attr('data-filter') == filter || filter == 's123-g-show-all';
}
function gallery_DecideNumberOfImageByScreenWidth($sectionThis) {
var screen = $sectionThis.find('.isotope-gallery-container').width();
if (screen<=400) {
return 1;
}
if (screen<=768) {
return 2;
}
if (screen<=992) {
return 3;
}
if (screen<=1600) {
return 3;
}
if (screen>1600) {
return 4;
}
}
function gallery_SetImageWidth($sectionThis) {
var imageWidth = Math.floor($sectionThis.find('.isotope-gallery-container').width()/gallery_DecideNumberOfImageByScreenWidth($sectionThis));
if ($sectionThis.hasClass('layout-1')) {
imageWidth = imageWidth - 10;
}
$sectionThis.find('.gallery-item-wrapper').width(imageWidth);
}jQuery(function($) {
GalleryModuleInitialize_Layout4();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout4() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-4:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $categories = $sectionThis.find('.filter li');
var $images = $sectionThis.find('.gallery-image');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
mainClass: 'mfp-module-gallery',
delegate: '.mfp-image:visible',						// Categories Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
markup: '<div class="mfp-figure">'+
'<div class="mfp-close"></div>'+
'<div class="mfp-img"></div>'+
'<div class="mfp-bottom-bar fancy-scrollbar">'+
'<div class="mfp-title"></div>'+
'<div class="mfp-counter"></div>'+
'<span class="mfp-caption-close"><i class="fa fa-times"></i></span>'+
'</div>'+
'</div>',
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
},
iframe: {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
markup: '<div class="mfp-iframe-scaler">' +
'<div class="mfp-close"></div>' +
'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
'<div class="mfp-title" style="position: absolute; padding-top: 5px;"></div>' +
'</div>',
patterns: {
youtube: {
index: 'youtube.com/',
id: function(url) {
var matches = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
if ( !matches || !matches[1] ) return null;
return matches[1];
},
src: '//www.youtube.com/embed/%id%?autoplay=1'
},
vimeo: {
index: 'vimeo.com/',
id: function(url) {
var matches = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
if ( !matches || !matches[5] ) return null;
return matches[5];
},
src: '//player.vimeo.com/video/%id%?autoplay=1'
},
site123: {
index: $GLOBALS['cdn-user-files'],
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
},
site123Processing: {
index: '/files/images/video-processing.png',
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
}
}
},
callbacks: {
elementParse: function( item ) {
if( item.el.data('type') === 'video' ) {
item.type = 'iframe';
} else {
item.type = 'image';
}
},
markupParse: function(template, values, item) {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
values.title = item.el.data('caption');
/**
* Prevent closing the pop-up when the user clicks on caption, I didn't found
* a good event to handle it for all medias (including videos) so I use timeout.
*/
setTimeout(function(){
$('.mfp-title').off('click').click(function( event ) {
event.stopPropagation();
});
},500);
if ( !this.mp_currentPageUrl ) this.mp_currentPageUrl = window.location.href;
window.history.replaceState(this.mp_currentPageUrl,'Title',item.el.data('image-page-url'));
},
updateStatus: function( data ) {
var $bar = $('.mfp-bottom-bar');
var $close = $('.mfp-caption-close');
$bar.show();
$close .off('click').on('click',function( event ) {
event.stopPropagation();
$bar.hide();
});
$bar.height() > 50 ? $close .show() : $close .hide();
},
close: function(item) {
window.history.replaceState('','Title',this.mp_currentPageUrl);
}
}
});
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
$sectionThis.css({ minHeight: $sectionThis.height() });
var $filtered = $category.data('filter') == 's123-g-show-all' ? $images : $images.filter('[data-filter=' + $category.data('filter') + ']');
if ( initialize ) {
$images.hide();
$filtered.show();
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
} else {
$images.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
});
});
}jQuery(function($) {
GalleryModuleInitialize_Layout5();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout5() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-5:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $categories = $sectionThis.find('.filter li');
var $images = $sectionThis.find('.gallery-image');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
mainClass: 'mfp-module-gallery',
delegate: '.mfp-image:visible',						// Categories Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
markup: '<div class="mfp-figure">'+
'<div class="mfp-close"></div>'+
'<div class="mfp-img"></div>'+
'<div class="mfp-bottom-bar fancy-scrollbar">'+
'<div class="mfp-title"></div>'+
'<div class="mfp-counter"></div>'+
'<span class="mfp-caption-close"><i class="fa fa-times"></i></span>'+
'</div>'+
'</div>',
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
},
iframe: {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
markup: '<div class="mfp-iframe-scaler">' +
'<div class="mfp-close"></div>' +
'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
'<div class="mfp-title" style="position: absolute; padding-top: 5px;"></div>' +
'</div>',
patterns: {
youtube: {
index: 'youtube.com/',
id: function(url) {
var matches = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
if ( !matches || !matches[1] ) return null;
return matches[1];
},
src: '//www.youtube.com/embed/%id%?autoplay=1'
},
vimeo: {
index: 'vimeo.com/',
id: function(url) {
var matches = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
if ( !matches || !matches[5] ) return null;
return matches[5];
},
src: '//player.vimeo.com/video/%id%?autoplay=1'
},
site123: {
index: $GLOBALS['cdn-user-files'],
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
},
site123Processing: {
index: '/files/images/video-processing.png',
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
}
}
},
callbacks: {
elementParse: function( item ) {
if( item.el.data('type') === 'video' ) {
item.type = 'iframe';
} else {
item.type = 'image';
}
},
markupParse: function(template, values, item) {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
values.title = item.el.data('caption');
/**
* Prevent closing the pop-up when the user clicks on caption, I didn't found
* a good event to handle it for all medias (including videos) so I use timeout.
*/
setTimeout(function(){
$('.mfp-title').off('click').click(function( event ) {
event.stopPropagation();
});
},500);
if ( !this.mp_currentPageUrl ) this.mp_currentPageUrl = window.location.href;
window.history.replaceState(this.mp_currentPageUrl,'Title',item.el.data('image-page-url'));
},
updateStatus: function( data ) {
var $bar = $('.mfp-bottom-bar');
var $close = $('.mfp-caption-close');
$bar.show();
$close .off('click').on('click',function( event ) {
event.stopPropagation();
$bar.hide();
});
$bar.height() > 50 ? $close .show() : $close .hide();
},
close: function(item) {
window.history.replaceState('','Title',this.mp_currentPageUrl);
}
}
});
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
$sectionThis.css({ minHeight: $sectionThis.height() });
var $filtered = $category.data('filter') == 's123-g-show-all' ? $images : $images.filter('[data-filter=' + $category.data('filter') + ']');
if ( initialize ) {
$images.hide();
$filtered.show();
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
} else {
$images.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
});
});
}/*!
* Flickity PACKAGED v2.0.10
* Touch, responsive, flickable carousels
*
* Licensed GPLv3 for open source use
* or Flickity Commercial License for commercial use
*
* http://flickity.metafizzy.co
* Copyright 2017 Metafizzy
*/
!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,o,a){function h(t,e,n){var s,o="$()."+i+'("'+e+'")';return t.each(function(t,h){var l=a.data(h,i);if(!l)return void r(i+" not initialized. Cannot call methods, i.e. "+o);var c=l[e];if(!c||"_"==e.charAt(0))return void r(o+" is not a valid method");var d=c.apply(l,n);s=void 0===s?d:s}),void 0!==s?s:t}function l(t,e){t.each(function(t,n){var s=a.data(n,i);s?(s.option(e),s._init()):(s=new o(n,e),a.data(n,i,s))})}a=a||e||t.jQuery,a&&(o.prototype.option||(o.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=s.call(arguments,1);return h(this,t,e)}return l(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var s=Array.prototype.slice,o=t.console,r="undefined"==typeof o?function(){}:function(t){o.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],s=0;s<i.length;s++){var o=i[s],r=n&&n[o];r&&(this.off(t,o),delete n[o]),o.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<l;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function s(){if(!c){c=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var s=n(e);o.isBoxSizeOuter=r=200==t(s.width),i.removeChild(e)}}function o(e){if(s(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var o=n(e);if("none"==o.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var c=a.isBorderBox="border-box"==o.boxSizing,d=0;d<l;d++){var u=h[d],f=o[u],p=parseFloat(f);a[u]=isNaN(p)?0:p}var v=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,m=a.marginLeft+a.marginRight,y=a.marginTop+a.marginBottom,E=a.borderLeftWidth+a.borderRightWidth,S=a.borderTopWidth+a.borderBottomWidth,b=c&&r,x=t(o.width);x!==!1&&(a.width=x+(b?0:v+E));var C=t(o.height);return C!==!1&&(a.height=C+(b?0:g+S)),a.innerWidth=a.width-(v+E),a.innerHeight=a.height-(g+S),a.outerWidth=a.width+m,a.outerHeight=a.height+y,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],l=h.length,c=!1;return o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],s=n+"MatchesSelector";if(t[s])return s}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var s=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void s.push(t);e(t,n)&&s.push(t);for(var i=t.querySelectorAll(n),o=0;o<i.length;o++)s.push(i[o])}}),s},i.debounceMethod=function(t,e,i){var n=t.prototype[e],s=e+"Timeout";t.prototype[e]=function(){var t=this[s];t&&clearTimeout(t);var e=arguments,o=this;this[s]=setTimeout(function(){n.apply(o,e),delete o[s]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,s){i.docReady(function(){var o=i.toDashed(s),r="data-"+o,a=document.querySelectorAll("["+r+"]"),h=document.querySelectorAll(".js-"+o),l=i.makeArray(a).concat(i.makeArray(h)),c=r+"-options",d=t.jQuery;l.forEach(function(t){var i,o=t.getAttribute(r)||t.getAttribute(c);try{i=o&&JSON.parse(o)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var h=new e(t,i);d&&d.data(t,s,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/cell",["get-size/get-size"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("get-size")):(t.Flickity=t.Flickity||{},t.Flickity.Cell=e(t,t.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n=i.prototype;return n.create=function(){this.element.style.position="absolute",this.x=0,this.shift=0},n.destroy=function(){this.element.style.position="";var t=this.parent.originSide;this.element.style[t]=""},n.getSize=function(){this.size=e(this.element)},n.setPosition=function(t){this.x=t,this.updateTarget(),this.renderPosition(t)},n.updateTarget=n.setDefaultTarget=function(){var t="left"==this.parent.originSide?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},n.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},n.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},n.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/slide",e):"object"==typeof module&&module.exports?module.exports=e():(t.Flickity=t.Flickity||{},t.Flickity.Slide=e())}(window,function(){"use strict";function t(t){this.parent=t,this.isOriginLeft="left"==t.originSide,this.cells=[],this.outerWidth=0,this.height=0}var e=t.prototype;return e.addCell=function(t){if(this.cells.push(t),this.outerWidth+=t.size.outerWidth,this.height=Math.max(t.size.outerHeight,this.height),1==this.cells.length){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}},e.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft",e=this.getLastCell(),i=e?e.size[t]:0,n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign},e.getLastCell=function(){return this.cells[this.cells.length-1]},e.select=function(){this.changeSelectedClass("add")},e.unselect=function(){this.changeSelectedClass("remove")},e.changeSelectedClass=function(t){this.cells.forEach(function(e){e.element.classList[t]("is-selected")})},e.getCellElements=function(){return this.cells.map(function(t){return t.element})},t}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/animate",["fizzy-ui-utils/utils"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("fizzy-ui-utils")):(t.Flickity=t.Flickity||{},t.Flickity.animatePrototype=e(t,t.fizzyUIUtils))}(window,function(t,e){var i=t.requestAnimationFrame||t.webkitRequestAnimationFrame,n=0;i||(i=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-n)),s=setTimeout(t,i);return n=e+i,s});var s={};s.startAnimation=function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},s.animate=function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;i(function(){e.animate()})}};var o=function(){var t=document.documentElement.style;return"string"==typeof t.transform?"transform":"WebkitTransform"}();return s.positionSlider=function(){var t=this.x;this.options.wrapAround&&this.cells.length>1&&(t=e.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),t+=this.cursorPosition,t=this.options.rightToLeft&&o?-t:t;var i=this.getPositionValue(t);this.slider.style[o]=this.isAnimating?"translate3d("+i+",0,0)":"translateX("+i+")";var n=this.slides[0];if(n){var s=-this.x-n.target,r=s/this.slidesWidth;this.dispatchEvent("scroll",null,[r,s])}},s.positionSliderAtSelected=function(){this.cells.length&&(this.x=-this.selectedSlide.target,this.positionSlider())},s.getPositionValue=function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+"%":Math.round(t)+"px"},s.settle=function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,this.restingFrames>2&&(this.isAnimating=!1,delete this.isFreeScrolling,this.positionSlider(),this.dispatchEvent("settle"))},s.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},s._shiftCells=function(t,e,i){for(var n=0;n<t.length;n++){var s=t[n],o=e>0?i:0;s.wrapShift(o),e-=s.size.outerWidth}},s._unshiftCells=function(t){if(t&&t.length)for(var e=0;e<t.length;e++)t[e].wrapShift(0)},s.integratePhysics=function(){this.x+=this.velocity,this.velocity*=this.getFrictionFactor()},s.applyForce=function(t){this.velocity+=t},s.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]},s.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())},s.applyDragForce=function(){if(this.isPointerDown){var t=this.dragX-this.x,e=t-this.velocity;this.applyForce(e)}},s.applySelectedAttraction=function(){if(!this.isPointerDown&&!this.isFreeScrolling&&this.cells.length){var t=this.selectedSlide.target*-1-this.x,e=t*this.options.selectedAttraction;this.applyForce(e)}},s}),function(t,e){if("function"==typeof define&&define.amd)define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(i,n,s,o,r,a){return e(t,i,n,s,o,r,a)});else if("object"==typeof module&&module.exports)module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"));else{var i=t.Flickity;t.Flickity=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,i.Cell,i.Slide,i.animatePrototype)}}(window,function(t,e,i,n,s,o,r){function a(t,e){for(t=n.makeArray(t);t.length;)e.appendChild(t.shift())}function h(t,e){var i=n.getQueryElement(t);if(!i)return void(d&&d.error("Bad element for Flickity: "+(i||t)));if(this.element=i,this.element.flickityGUID){var s=f[this.element.flickityGUID];return s.option(e),s}l&&(this.$element=l(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e),this._create()}var l=t.jQuery,c=t.getComputedStyle,d=t.console,u=0,f={};h.defaults={accessibility:!0,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:!0,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},h.createMethods=[];var p=h.prototype;n.extend(p,e.prototype),p._create=function(){var e=this.guid=++u;this.element.flickityGUID=e,f[e]=this,this.selectedIndex=0,this.restingFrames=0,this.x=0,this.velocity=0,this.originSide=this.options.rightToLeft?"right":"left",this.viewport=document.createElement("div"),this.viewport.className="flickity-viewport",this._createSlider(),(this.options.resize||this.options.watchCSS)&&t.addEventListener("resize",this),h.createMethods.forEach(function(t){this[t]()},this),this.options.watchCSS?this.watchCSS():this.activate()},p.option=function(t){n.extend(this.options,t)},p.activate=function(){if(!this.isActive){this.isActive=!0,this.element.classList.add("flickity-enabled"),this.options.rightToLeft&&this.element.classList.add("flickity-rtl"),this.getSize();var t=this._filterFindCellElements(this.element.children);a(t,this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,this.element.addEventListener("keydown",this)),this.emitEvent("activate");var e,i=this.options.initialIndex;e=this.isInitActivated?this.selectedIndex:void 0!==i&&this.cells[i]?i:0,this.select(e,!1,!0),this.isInitActivated=!0}},p._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider",t.style[this.originSide]=0,this.slider=t},p._filterFindCellElements=function(t){return n.filterFindElements(t,this.options.cellSelector)},p.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},p._makeCells=function(t){var e=this._filterFindCellElements(t),i=e.map(function(t){return new s(t,this)},this);return i},p.getLastCell=function(){return this.cells[this.cells.length-1]},p.getLastSlide=function(){return this.slides[this.slides.length-1]},p.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},p._positionCells=function(t){t=t||0,this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n=this.cells.length,s=t;s<n;s++){var o=this.cells[s];o.setPosition(e),e+=o.size.outerWidth,this.maxCellHeight=Math.max(o.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e,this.updateSlides(),this._containSlides(),this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0},p._sizeCells=function(t){t.forEach(function(t){t.getSize()})},p.updateSlides=function(){if(this.slides=[],this.cells.length){var t=new o(this);this.slides.push(t);var e="left"==this.originSide,i=e?"marginRight":"marginLeft",n=this._getCanCellFit();this.cells.forEach(function(e,s){if(!t.cells.length)return void t.addCell(e);var r=t.outerWidth-t.firstMargin+(e.size.outerWidth-e.size[i]);n.call(this,s,r)?t.addCell(e):(t.updateTarget(),t=new o(this),this.slides.push(t),t.addCell(e))},this),t.updateTarget(),this.updateSelectedSlide()}},p._getCanCellFit=function(){var t=this.options.groupCells;if(!t)return function(){return!1};if("number"==typeof t){var e=parseInt(t,10);return function(t){return t%e!==0}}var i="string"==typeof t&&t.match(/^(\d+)%$/),n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}},p._init=p.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},p.getSize=function(){this.size=i(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var v={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};return p.setCellAlign=function(){var t=v[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},p.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}},p._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},p._getGapCells=function(t,e,i){for(var n=[];t>0;){var s=this.cells[e];if(!s)break;n.push(s),e+=i,t-=s.size.outerWidth}return n},p._containSlides=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length){var t=this.options.rightToLeft,e=t?"marginRight":"marginLeft",i=t?"marginLeft":"marginRight",n=this.slideableWidth-this.getLastCell().size[i],s=n<this.size.innerWidth,o=this.cursorPosition+this.cells[0].size[e],r=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){s?t.target=n*this.cellAlign:(t.target=Math.max(t.target,o),t.target=Math.min(t.target,r))},this)}},p.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),l&&this.$element){t+=this.options.namespaceJQueryEvents?".flickity":"";var s=t;if(e){var o=l.Event(e);o.type=t,s=o}this.$element.trigger(s,i)}},p.select=function(t,e,i){this.isActive&&(t=parseInt(t,10),this._wrapSelect(t),(this.options.wrapAround||e)&&(t=n.modulo(t,this.slides.length)),this.slides[t]&&(this.selectedIndex=t,this.updateSelectedSlide(),i?this.positionSliderAtSelected():this.startAnimation(),this.options.adaptiveHeight&&this.setGallerySize(),this.dispatchEvent("select"),this.dispatchEvent("cellSelect")))},p._wrapSelect=function(t){var e=this.slides.length,i=this.options.wrapAround&&e>1;if(!i)return t;var s=n.modulo(t,e),o=Math.abs(s-this.selectedIndex),r=Math.abs(s+e-this.selectedIndex),a=Math.abs(s-e-this.selectedIndex);!this.isDragSelect&&r<o?t+=e:!this.isDragSelect&&a<o&&(t-=e),t<0?this.x-=this.slideableWidth:t>=e&&(this.x+=this.slideableWidth)},p.previous=function(t,e){this.select(this.selectedIndex-1,t,e)},p.next=function(t,e){this.select(this.selectedIndex+1,t,e)},p.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];t&&(this.unselectSelectedSlide(),this.selectedSlide=t,t.select(),this.selectedCells=t.cells,this.selectedElements=t.getCellElements(),this.selectedCell=t.cells[0],this.selectedElement=this.selectedElements[0])},p.unselectSelectedSlide=function(){this.selectedSlide&&this.selectedSlide.unselect()},p.selectCell=function(t,e,i){var n;"number"==typeof t?n=this.cells[t]:("string"==typeof t&&(t=this.element.querySelector(t)),n=this.getCell(t));for(var s=0;n&&s<this.slides.length;s++){var o=this.slides[s],r=o.cells.indexOf(n);if(r!=-1)return void this.select(s,e,i)}},p.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t)return i}},p.getCells=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getCell(t);i&&e.push(i)},this),e},p.getCellElements=function(){return this.cells.map(function(t){return t.element})},p.getParentCell=function(t){var e=this.getCell(t);return e?e:(t=n.getParent(t,".flickity-slider > *"),this.getCell(t))},p.getAdjacentCellElements=function(t,e){if(!t)return this.selectedSlide.getCellElements();e=void 0===e?this.selectedIndex:e;var i=this.slides.length;if(1+2*t>=i)return this.getCellElements();for(var s=[],o=e-t;o<=e+t;o++){var r=this.options.wrapAround?n.modulo(o,i):o,a=this.slides[r];a&&(s=s.concat(a.getCellElements()))}return s},p.uiChange=function(){this.emitEvent("uiChange")},p.childUIPointerDown=function(t){this.emitEvent("childUIPointerDown",[t])},p.onresize=function(){this.watchCSS(),this.resize()},n.debounceMethod(h,"onresize",150),p.resize=function(){if(this.isActive){this.getSize(),this.options.wrapAround&&(this.x=n.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,!1,!0)}},p.watchCSS=function(){var t=this.options.watchCSS;if(t){var e=c(this.element,":after").content;e.indexOf("flickity")!=-1?this.activate():this.deactivate()}},p.onkeydown=function(t){if(this.options.accessibility&&(!document.activeElement||document.activeElement==this.element))if(37==t.keyCode){var e=this.options.rightToLeft?"next":"previous";this.uiChange(),this[e]()}else if(39==t.keyCode){var i=this.options.rightToLeft?"previous":"next";this.uiChange(),this[i]()}},p.deactivate=function(){this.isActive&&(this.element.classList.remove("flickity-enabled"),this.element.classList.remove("flickity-rtl"),this.cells.forEach(function(t){t.destroy()}),this.unselectSelectedSlide(),this.element.removeChild(this.viewport),a(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute("tabIndex"),this.element.removeEventListener("keydown",this)),this.isActive=!1,this.emitEvent("deactivate"))},p.destroy=function(){this.deactivate(),t.removeEventListener("resize",this),this.emitEvent("destroy"),l&&this.$element&&l.removeData(this.element,"flickity"),delete this.element.flickityGUID,delete f[this.guid]},n.extend(p,r),h.data=function(t){t=n.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]},n.htmlInit(h,"flickity"),l&&l.bridget&&l.bridget("flickity",h),h.setJQuery=function(t){l=t},h.Cell=s,h}),function(t,e){"function"==typeof define&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.Unipointer=e(t,t.EvEmitter)}(window,function(t,e){function i(){}function n(){}var s=n.prototype=Object.create(e.prototype);s.bindStartEvent=function(t){this._bindStartEvent(t,!0)},s.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},s._bindStartEvent=function(e,i){i=void 0===i||!!i;var n=i?"addEventListener":"removeEventListener";t.PointerEvent?e[n]("pointerdown",this):(e[n]("mousedown",this),e[n]("touchstart",this))},s.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier)return i}},s.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},s.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},s.onpointerdown=function(t){this._pointerDown(t,t)},s._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},s.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};return s._bindPostStartEvents=function(e){if(e){var i=o[e.type];i.forEach(function(e){t.addEventListener(e,this)},this),this._boundPointerEvents=i}},s._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(e){t.removeEventListener(e,this)},this),delete this._boundPointerEvents)},s.onmousemove=function(t){this._pointerMove(t,t)},s.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},s.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},s._pointerMove=function(t,e){this.pointerMove(t,e)},s.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},s.onmouseup=function(t){this._pointerUp(t,t)},s.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},s.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},s._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},s.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},s._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},s.pointerDone=i,s.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},s.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},s._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},s.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},n}),function(t,e){"function"==typeof define&&define.amd?define("unidragger/unidragger",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.Unidragger=e(t,t.Unipointer)}(window,function(t,e){function i(){}var n=i.prototype=Object.create(e.prototype);return n.bindHandles=function(){this._bindHandles(!0)},n.unbindHandles=function(){this._bindHandles(!1)},n._bindHandles=function(e){e=void 0===e||!!e;for(var i=e?"addEventListener":"removeEventListener",n=0;n<this.handles.length;n++){var s=this.handles[n];this._bindStartEvent(s,e),s[i]("click",this),t.PointerEvent&&(s.style.touchAction=e?this._touchActionValue:"")}},n._touchActionValue="none",n.pointerDown=function(t,e){if("INPUT"==t.target.nodeName&&"range"==t.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(t,e);var i=document.activeElement;i&&i.blur&&i.blur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])},n._dragPointerDown=function(t,i){this.pointerDownPoint=e.getPointerPoint(i);var n=this.canPreventDefaultOnPointerDown(t,i);n&&t.preventDefault()},n.canPreventDefaultOnPointerDown=function(t){return"SELECT"!=t.target.nodeName},n.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]),this._dragMove(t,e,i)},n._dragPointerMove=function(t,i){var n=e.getPointerPoint(i),s={x:n.x-this.pointerDownPoint.x,y:n.y-this.pointerDownPoint.y};return!this.isDragging&&this.hasDragStarted(s)&&this._dragStart(t,i),s},n.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},n.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},n._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},n._dragStart=function(t,i){this.isDragging=!0,this.dragStartPoint=e.getPointerPoint(i),this.isPreventingClicks=!0,this.dragStart(t,i)},n.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},n._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)},n.dragMove=function(t,e,i){t.preventDefault(),this.emitEvent("dragMove",[t,e,i])},n._dragEnd=function(t,e){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,e)},n.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},n.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},n._staticClick=function(t,e){if(!this.isIgnoringMouseUp||"mouseup"!=t.type){var i=t.target.nodeName;"INPUT"!=i&&"TEXTAREA"!=i||t.target.focus(),this.staticClick(t,e),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400))}},n.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},i.getPointerPoint=e.getPointerPoint,i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("unidragger"),require("fizzy-ui-utils")):t.Flickity=e(t,t.Flickity,t.Unidragger,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(t){var e="touchstart"==t.type,i="touch"==t.pointerType,n=d[t.target.nodeName];return e||i||n}function o(){return{x:t.pageXOffset,y:t.pageYOffset}}n.extend(e.defaults,{draggable:!0,dragThreshold:3}),e.createMethods.push("_createDrag");var r=e.prototype;n.extend(r,i.prototype),r._touchActionValue="pan-y";var a="createTouch"in document,h=!1;r._createDrag=function(){this.on("activate",this.bindDrag),this.on("uiChange",this._uiChangeDrag),this.on("childUIPointerDown",this._childUIPointerDownDrag),this.on("deactivate",this.unbindDrag),a&&!h&&(t.addEventListener("touchmove",function(){}),h=!0)},r.bindDrag=function(){this.options.draggable&&!this.isDragBound&&(this.element.classList.add("is-draggable"),this.handles=[this.viewport],this.bindHandles(),this.isDragBound=!0)},r.unbindDrag=function(){this.isDragBound&&(this.element.classList.remove("is-draggable"),this.unbindHandles(),delete this.isDragBound)},r._uiChangeDrag=function(){delete this.isFreeScrolling},r._childUIPointerDownDrag=function(t){t.preventDefault(),this.pointerDownFocus(t)};var l={TEXTAREA:!0,INPUT:!0,OPTION:!0},c={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};r.pointerDown=function(e,i){var n=l[e.target.nodeName]&&!c[e.target.type];if(n)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(e,i);var s=document.activeElement;s&&s.blur&&s!=this.element&&s!=document.body&&s.blur(),this.pointerDownFocus(e),this.dragX=this.x,this.viewport.classList.add("is-pointer-down"),this._bindPostStartEvents(e),this.pointerDownScroll=o(),t.addEventListener("scroll",this),this.dispatchEvent("pointerDown",e,[i])},r.pointerDownFocus=function(e){var i=s(e);if(this.options.accessibility&&!i){var n=t.pageYOffset;this.element.focus(),t.pageYOffset!=n&&t.scrollTo(t.pageXOffset,n)}};var d={INPUT:!0,SELECT:!0};return r.canPreventDefaultOnPointerDown=function(t){var e=s(t);return!e},r.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold},r.pointerUp=function(t,e){delete this.isTouchScrolling,this.viewport.classList.remove("is-pointer-down"),this.dispatchEvent("pointerUp",t,[e]),this._dragPointerUp(t,e)},r.pointerDone=function(){t.removeEventListener("scroll",this),delete this.pointerDownScroll},r.dragStart=function(e,i){this.dragStartPosition=this.x,this.startAnimation(),t.removeEventListener("scroll",this),this.dispatchEvent("dragStart",e,[i])},r.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]),this._dragMove(t,e,i)},r.dragMove=function(t,e,i){t.preventDefault(),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1,s=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var o=Math.max(-this.slides[0].target,this.dragStartPosition);s=s>o?.5*(s+o):s;var r=Math.min(-this.getLastSlide().target,this.dragStartPosition);s=s<r?.5*(s+r):s}this.dragX=s,this.dragMoveTime=new Date,this.dispatchEvent("dragMove",t,[e,i])},r.dragEnd=function(t,e){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.isDragSelect=this.options.wrapAround,this.select(i),delete this.isDragSelect,this.dispatchEvent("dragEnd",t,[e])},r.dragEndRestingSelect=function(){var t=this.getRestingPosition(),e=Math.abs(this.getSlideDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1),s=i.distance<n.distance?i.index:n.index;
return s},r._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,s=1/0,o=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};o(e,s)&&(n+=i,s=e,e=this.getSlideDistance(-t,n),null!==e);)e=Math.abs(e);return{distance:s,index:n-i}},r.getSlideDistance=function(t,e){var i=this.slides.length,s=this.options.wrapAround&&i>1,o=s?n.modulo(e,i):e,r=this.slides[o];if(!r)return null;var a=s?this.slideableWidth*Math.floor(e/i):0;return t-(r.target+a)},r.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||new Date-this.dragMoveTime>100)return 0;var t=this.getSlideDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return t>0&&e>0?1:t<0&&e<0?-1:0},r.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,s=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,s])},r.onscroll=function(){var t=o(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(Math.abs(e)>3||Math.abs(i)>3)&&this._pointerDone()},e}),function(t,e){"function"==typeof define&&define.amd?define("tap-listener/tap-listener",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.TapListener=e(t,t.Unipointer)}(window,function(t,e){function i(t){this.bindTap(t)}var n=i.prototype=Object.create(e.prototype);return n.bindTap=function(t){t&&(this.unbindTap(),this.tapElement=t,this._bindStartEvent(t,!0))},n.unbindTap=function(){this.tapElement&&(this._bindStartEvent(this.tapElement,!0),delete this.tapElement)},n.pointerUp=function(i,n){if(!this.isIgnoringMouseUp||"mouseup"!=i.type){var s=e.getPointerPoint(n),o=this.tapElement.getBoundingClientRect(),r=t.pageXOffset,a=t.pageYOffset,h=s.x>=o.left+r&&s.x<=o.right+r&&s.y>=o.top+a&&s.y<=o.bottom+a;if(h&&this.emitEvent("tap",[i,n]),"mouseup"!=i.type){this.isIgnoringMouseUp=!0;var l=this;setTimeout(function(){delete l.isIgnoringMouseUp},400)}}},n.destroy=function(){this.pointerDone(),this.unbindTap()},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/prev-next-button",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){"use strict";function s(t,e){this.direction=t,this.parent=e,this._create()}function o(t){return"string"==typeof t?t:"M "+t.x0+",50 L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50  L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z"}var r="http://www.w3.org/2000/svg";s.prototype=new i,s.prototype._create=function(){this.isEnabled=!0,this.isPrevious=this.direction==-1;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-prev-next-button",e.className+=this.isPrevious?" previous":" next",e.setAttribute("type","button"),this.disable(),e.setAttribute("aria-label",this.isPrevious?"previous":"next");var i=this.createSVG();e.appendChild(i),this.on("tap",this.onTap),this.parent.on("select",this.update.bind(this)),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.bindTap(this.element),this.element.addEventListener("click",this),this.parent.element.appendChild(this.element)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.element),i.prototype.destroy.call(this),this.element.removeEventListener("click",this)},s.prototype.createSVG=function(){var t=document.createElementNS(r,"svg");t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(r,"path"),i=o(this.parent.options.arrowShape);return e.setAttribute("d",i),e.setAttribute("class","arrow"),this.isLeft||e.setAttribute("transform","translate(100, 100) rotate(180) "),t.appendChild(e),t},s.prototype.onTap=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()}},s.prototype.handleEvent=n.handleEvent,s.prototype.onclick=function(){var t=document.activeElement;t&&t==this.element&&this.onTap()},s.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},s.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},s.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&t.length>1)return void this.enable();var e=t.length?t.length-1:0,i=this.isPrevious?0:e,n=this.parent.selectedIndex==i?"disable":"enable";this[n]()},s.prototype.destroy=function(){this.deactivate()},n.extend(e.defaults,{prevNextButtons:!0,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),e.createMethods.push("_createPrevNextButtons");var a=e.prototype;return a._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new s((-1),this),this.nextButton=new s(1,this),this.on("activate",this.activatePrevNextButtons))},a.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on("deactivate",this.deactivatePrevNextButtons)},a.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off("deactivate",this.deactivatePrevNextButtons)},e.PrevNextButton=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/page-dots",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(t){this.parent=t,this._create()}s.prototype=new i,s.prototype._create=function(){this.holder=document.createElement("ol"),this.holder.className="flickity-page-dots",this.dots=[],this.on("tap",this.onTap),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.setDots(),this.bindTap(this.holder),this.parent.element.appendChild(this.holder)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.holder),i.prototype.destroy.call(this)},s.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;t>0?this.addDots(t):t<0&&this.removeDots(-t)},s.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[];t;){var n=document.createElement("li");n.className="dot",e.appendChild(n),i.push(n),t--}this.holder.appendChild(e),this.dots=this.dots.concat(i)},s.prototype.removeDots=function(t){var e=this.dots.splice(this.dots.length-t,t);e.forEach(function(t){this.holder.removeChild(t)},this)},s.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className="dot"),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className="dot is-selected")},s.prototype.onTap=function(t){var e=t.target;if("LI"==e.nodeName){this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)}},s.prototype.destroy=function(){this.deactivate()},e.PageDots=s,n.extend(e.defaults,{pageDots:!0}),e.createMethods.push("_createPageDots");var o=e.prototype;return o._createPageDots=function(){this.options.pageDots&&(this.pageDots=new s(this),this.on("activate",this.activatePageDots),this.on("select",this.updateSelectedPageDots),this.on("cellChange",this.updatePageDots),this.on("resize",this.updatePageDots),this.on("deactivate",this.deactivatePageDots))},o.activatePageDots=function(){this.pageDots.activate()},o.updateSelectedPageDots=function(){this.pageDots.updateSelected()},o.updatePageDots=function(){this.pageDots.setDots()},o.deactivatePageDots=function(){this.pageDots.deactivate()},e.PageDots=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity")):e(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}(window,function(t,e,i){function n(t){this.parent=t,this.state="stopped",o&&(this.onVisibilityChange=function(){this.visibilityChange()}.bind(this),this.onVisibilityPlay=function(){this.visibilityPlay()}.bind(this))}var s,o;"hidden"in document?(s="hidden",o="visibilitychange"):"webkitHidden"in document&&(s="webkitHidden",o="webkitvisibilitychange"),n.prototype=Object.create(t.prototype),n.prototype.play=function(){if("playing"!=this.state){var t=document[s];if(o&&t)return void document.addEventListener(o,this.onVisibilityPlay);this.state="playing",o&&document.addEventListener(o,this.onVisibilityChange),this.tick()}},n.prototype.tick=function(){if("playing"==this.state){var t=this.parent.options.autoPlay;t="number"==typeof t?t:3e3;var e=this;this.clear(),this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},n.prototype.stop=function(){this.state="stopped",this.clear(),o&&document.removeEventListener(o,this.onVisibilityChange)},n.prototype.clear=function(){clearTimeout(this.timeout)},n.prototype.pause=function(){"playing"==this.state&&(this.state="paused",this.clear())},n.prototype.unpause=function(){"paused"==this.state&&this.play()},n.prototype.visibilityChange=function(){var t=document[s];this[t?"pause":"unpause"]()},n.prototype.visibilityPlay=function(){this.play(),document.removeEventListener(o,this.onVisibilityPlay)},e.extend(i.defaults,{pauseAutoPlayOnHover:!0}),i.createMethods.push("_createPlayer");var r=i.prototype;return r._createPlayer=function(){this.player=new n(this),this.on("activate",this.activatePlayer),this.on("uiChange",this.stopPlayer),this.on("pointerDown",this.stopPlayer),this.on("deactivate",this.deactivatePlayer)},r.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),this.element.addEventListener("mouseenter",this))},r.playPlayer=function(){this.player.play()},r.stopPlayer=function(){this.player.stop()},r.pausePlayer=function(){this.player.pause()},r.unpausePlayer=function(){this.player.unpause()},r.deactivatePlayer=function(){this.player.stop(),this.element.removeEventListener("mouseenter",this)},r.onmouseenter=function(){this.options.pauseAutoPlayOnHover&&(this.player.pause(),this.element.addEventListener("mouseleave",this))},r.onmouseleave=function(){this.player.unpause(),this.element.removeEventListener("mouseleave",this)},i.Player=n,i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){var e=document.createDocumentFragment();return t.forEach(function(t){e.appendChild(t.element)}),e}var s=e.prototype;return s.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var s=this.cells.length;e=void 0===e?s:e;var o=n(i),r=e==s;if(r)this.slider.appendChild(o);else{var a=this.cells[e].element;this.slider.insertBefore(o,a)}if(0===e)this.cells=i.concat(this.cells);else if(r)this.cells=this.cells.concat(i);else{var h=this.cells.splice(e,s-e);this.cells=this.cells.concat(i).concat(h)}this._sizeCells(i);var l=e>this.selectedIndex?0:i.length;this._cellAddedRemoved(e,l)}},s.append=function(t){this.insert(t,this.cells.length)},s.prepend=function(t){this.insert(t,0)},s.remove=function(t){var e,n,s=this.getCells(t),o=0,r=s.length;for(e=0;e<r;e++){n=s[e];var a=this.cells.indexOf(n)<this.selectedIndex;o-=a?1:0}for(e=0;e<r;e++)n=s[e],n.remove(),i.removeFrom(this.cells,n);s.length&&this._cellAddedRemoved(0,o)},s._cellAddedRemoved=function(t,e){e=e||0,this.selectedIndex+=e,this.selectedIndex=Math.max(0,Math.min(this.slides.length-1,this.selectedIndex)),this.cellChange(t,!0),this.emitEvent("cellAddedRemoved",[t,e])},s.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)}},s.cellChange=function(t,e){var i=this.slideableWidth;if(this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("cellChange",[t]),this.options.freeScroll){var n=i-this.slideableWidth;this.x+=n*this.cellAlign,this.positionSlider()}else e&&this.positionSliderAtSelected(),this.select(this.selectedIndex)},e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){"use strict";function n(t){if("IMG"==t.nodeName&&t.getAttribute("data-flickity-lazyload"))return[t];var e=t.querySelectorAll("img[data-flickity-lazyload]");return i.makeArray(e)}function s(t,e){this.img=t,this.flickity=e,this.load()}e.createMethods.push("_createLazyload");var o=e.prototype;return o._createLazyload=function(){this.on("select",this.lazyLoad)},o.lazyLoad=function(){var t=this.options.lazyLoad;if(t){var e="number"==typeof t?t:0,i=this.getAdjacentCellElements(e),o=[];i.forEach(function(t){var e=n(t);o=o.concat(e)}),o.forEach(function(t){new s(t,this)},this)}},s.prototype.handleEvent=i.handleEvent,s.prototype.load=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.img.getAttribute("data-flickity-lazyload"),this.img.removeAttribute("data-flickity-lazyload")},s.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")},s.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")},s.prototype.complete=function(t,e){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img),n=i&&i.element;this.flickity.cellSizeChange(n),this.img.classList.add(e),this.flickity.dispatchEvent("lazyLoad",t,n)},e.LazyLoader=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload")))}(window,function(t){return t}),function(t,e){"function"==typeof define&&define.amd?define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t.Flickity,t.fizzyUIUtils)}(window,function(t,e){function i(t,e,i){return(e-t)*i+t}t.createMethods.push("_createAsNavFor");var n=t.prototype;return n._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},n.setNavCompanion=function(i){i=e.getQueryElement(i);var n=t.data(i);if(n&&n!=this){this.navCompanion=n;var s=this;this.onNavCompanionSelect=function(){s.navCompanionSelect()},n.on("select",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect(!0)}},n.navCompanionSelect=function(t){if(this.navCompanion){var e=this.navCompanion.selectedCells[0],n=this.navCompanion.cells.indexOf(e),s=n+this.navCompanion.selectedCells.length-1,o=Math.floor(i(n,s,this.navCompanion.cellAlign));if(this.selectCell(o,!1,t),this.removeNavSelectedElements(),!(o>=this.cells.length)){var r=this.cells.slice(n,s+1);this.navSelectedElements=r.map(function(t){return t.element}),this.changeNavSelectedClass("add")}}},n.changeNavSelectedClass=function(t){this.navSelectedElements.forEach(function(e){e.classList[t]("is-nav-selected")})},n.activateAsNavFor=function(){this.navCompanionSelect(!0)},n.removeNavSelectedElements=function(){this.navSelectedElements&&(this.changeNavSelectedClass("remove"),delete this.navSelectedElements)},n.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.selectCell(n)},n.deactivateAsNavFor=function(){this.removeNavSelectedElements()},n.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("select",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function s(t,e,o){return this instanceof s?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?o=e:i(this.options,e),o&&this.on("always",o),this.getImages(),a&&(this.jqDeferred=new a.Deferred),void setTimeout(function(){this.check()}.bind(this))):new s(t,e,o)}function o(t){this.img=t}function r(t,e){this.url=t,this.element=e,this.img=new Image}var a=t.jQuery,h=t.console;s.prototype=Object.create(e.prototype),s.prototype.options={},s.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},s.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&l[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var s=i[n];this.addImage(s)}if("string"==typeof this.options.background){var o=t.querySelectorAll(this.options.background);for(n=0;n<o.length;n++){var r=o[n];this.addElementBackgroundImages(r)}}}};var l={1:!0,9:!0,11:!0};return s.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var s=n&&n[2];s&&this.addBackground(s,t),n=i.exec(e.backgroundImage)}},s.prototype.addImage=function(t){var e=new o(t);this.images.push(e)},s.prototype.addBackground=function(t,e){var i=new r(t,e);this.images.push(i)},s.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},s.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&h&&h.log("progress: "+i,t,e)},s.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},o.prototype=Object.create(e.prototype),o.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},o.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},o.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},o.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},o.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype=Object.create(o.prototype),r.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},r.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},s.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(a=e,a.fn.imagesLoaded=function(t,e){var i=new s(this,t,e);return i.jqDeferred.promise(a(this))})},s.makeJQueryPlugin(),s}),function(t,e){"function"==typeof define&&define.amd?define(["flickity/js/index","imagesloaded/imagesloaded"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("flickity"),require("imagesloaded")):t.Flickity=e(t,t.Flickity,t.imagesLoaded)}(window,function(t,e,i){"use strict";e.createMethods.push("_createImagesLoaded");var n=e.prototype;return n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)},n.imagesLoaded=function(){function t(t,i){var n=e.getParentCell(i.img);e.cellSizeChange(n&&n.element),e.options.freeScroll||e.positionSliderAtSelected()}if(this.options.imagesLoaded){var e=this;i(this.slider).on("progress",t)}},e});jQuery(function($) {
GalleryModuleInitialize_Layout6();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout6() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-6:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $categories = $sectionThis.find('.filter li');
var $flickityContainer = $sectionThis.find('.gallery-images-container');
/**
* Gallery Modules - Flickity Initial
* Documentation : http://flickity.metafizzy.co/options.html
*/
$flickityContainer.flickity({
imagesLoaded: true,
lazyLoad: 2
});
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.gallery-images-container, .gallery-image-caption'
});
$flickityContainer.on('settle.flickity', function() {
var $this = $(this);
var flkty = Flickity.data( this );
$this.next('.gallery-image-caption').html($(flkty.selectedElement).data('caption'));
/**
* Stop Videos - We need to stop all the videos every time the
* user slide to prevent 2 videos playing at the same time.
*/
$sectionThis.find('.gallery-image:not(.is-selected) iframe').each(function () { 	// YouTube/Vimeo
switch ( $(this).data('player') ) {
case 'youtube':
if ( this.src.indexOf("youtube.com") > -1 ) {
this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
}
break;
case 'vimeo':
if ( this.src.indexOf("vimeo.com") > -1 ) {
var player = new Vimeo.Player(this);
player.pause();
}
break;
case 'site123':
if (this.contentWindow.player) this.contentWindow.player.pause();
break;
}
});
$isotopeContainer.isotope('layout');
});
$isotopeContainer.on( 'arrangeComplete', function( event, filteredItems ) {
$flickityContainer.flickity('resize');
});
$categories.off('click').on('click',function () {
var $this = $(this);
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter_Layout6($(this),$this.data('filter'));
}
});
$categories.removeClass('active');
$this.addClass('active');
$flickityContainer.flickity('resize');
return false;
});
$categories.first().trigger('click');
});
});
}
/**
* The function filter the items related to the selected category.
* We create a custom filter function because we like to filter
* the items via data-attributes and not by class.
*/
function gallery_Filter_Layout6( $item, filter ) {
return $item.attr('data-filter') == filter;
}jQuery(function($) {
GalleryModuleInitialize_Layout7();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout7() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-7:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $categories = $sectionThis.find('.filter li');
var $flickityContainer = $sectionThis.find('.gallery-images-container');
/**
* Gallery Modules - Flickity Initial
* Documentation : http://flickity.metafizzy.co/options.html
*/
$flickityContainer.flickity({
imagesLoaded: true,
initialIndex: 1,
lazyLoad: 2
});
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.gallery-images-container, .gallery-image-caption'
});
$flickityContainer.on('settle.flickity', function() {
var $this = $(this);
var flkty = Flickity.data( this );
$this.next('.gallery-image-caption').html($(flkty.selectedElement).data('caption'));
/**
* Stop Videos - We need to stop all the videos every time the
* user slide to prevent 2 videos playing at the same time.
*/
$sectionThis.find('.gallery-video-container:not(.is-selected) iframe').each(function () { 	// YouTube/Vimeo
switch ( $(this).data('player') ) {
case 'youtube':
if ( this.src.indexOf("youtube.com") > -1 ) {
this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
}
break;
case 'vimeo':
if ( this.src.indexOf("vimeo.com") > -1 ) {
var player = new Vimeo.Player(this);
player.pause();
}
break;
case 'site123':
if (this.contentWindow.player) this.contentWindow.player.pause();
break;
}
});
$isotopeContainer.isotope('layout');
});
$isotopeContainer.on( 'arrangeComplete', function( event, filteredItems ) {
$flickityContainer.flickity('resize');
});
$categories.off('click').on('click',function () {
var $this = $(this);
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter_Layout7($(this),$this.data('filter'));
}
});
$categories.removeClass('active');
$this.addClass('active');
$flickityContainer.flickity('resize');
return false;
});
$categories.first().trigger('click');
});
});
}
/**
* The function filter the items related to the selected category.
* We create a custom filter function because we like to filter
* the items via data-attributes and not by class.
*/
function gallery_Filter_Layout7( $item, filter ) {
return $item.attr('data-filter') == filter;
}jQuery(function($) {
GalleryModuleInitialize_Layout8();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout8() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-8:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $categories = $sectionThis.find('.filter li');
var $images = $sectionThis.find('.gallery-image');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
mainClass: 'mfp-module-gallery',
delegate: '.mfp-image:visible',						// Categories Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
markup: '<div class="mfp-figure">'+
'<div class="mfp-close"></div>'+
'<div class="mfp-img"></div>'+
'<div class="mfp-bottom-bar fancy-scrollbar">'+
'<div class="mfp-title"></div>'+
'<div class="mfp-counter"></div>'+
'<span class="mfp-caption-close"><i class="fa fa-times"></i></span>'+
'</div>'+
'</div>',
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
},
iframe: {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
markup: '<div class="mfp-iframe-scaler">' +
'<div class="mfp-close"></div>' +
'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
'<div class="mfp-title" style="position: absolute; padding-top: 5px;"></div>' +
'</div>',
patterns: {
youtube: {
index: 'youtube.com/',
id: function(url) {
var matches = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
if ( !matches || !matches[1] ) return null;
return matches[1];
},
src: '//www.youtube.com/embed/%id%?autoplay=1'
},
vimeo: {
index: 'vimeo.com/',
id: function(url) {
var matches = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
if ( !matches || !matches[5] ) return null;
return matches[5];
},
src: '//player.vimeo.com/video/%id%?autoplay=1'
},
site123: {
index: $GLOBALS['cdn-user-files'],
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
},
site123Processing: {
index: '/files/images/video-processing.png',
id: function( url ) {
/**
* Mobile Handler - The auto-play is not working at mobile
* if the video is not muted, so we disable it.
*/
if ( isMobile.any() ) url += '&autoplay=0';
return url;
},
src: '/include/globalVideoPlayer.php?url=%id%'
}
}
},
callbacks: {
elementParse: function( item ) {
if( item.el.data('type') === 'video' ) {
item.type = 'iframe';
} else {
item.type = 'image';
}
},
markupParse: function(template, values, item) {
/**
* Magnific Popup doesn't show the caption on IFrames so we add it manually
* Source: https://stackoverflow.com/a/22023434/469161
*/
values.title = item.el.data('caption');
/**
* Prevent closing the pop-up when the user clicks on caption, I didn't found
* a good event to handle it for all medias (including videos) so I use timeout.
*/
setTimeout(function(){
$('.mfp-title').off('click').click(function( event ) {
event.stopPropagation();
});
},500);
if ( !this.mp_currentPageUrl ) this.mp_currentPageUrl = window.location.href;
window.history.replaceState(this.mp_currentPageUrl,'Title',item.el.data('image-page-url'));
},
updateStatus: function( data ) {
var $bar = $('.mfp-bottom-bar');
var $close = $('.mfp-caption-close');
$bar.show();
$close .off('click').on('click',function( event ) {
event.stopPropagation();
$bar.hide();
});
$bar.height() > 50 ? $close .show() : $close .hide();
},
close: function(item) {
window.history.replaceState('','Title',this.mp_currentPageUrl);
}
}
});
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
$sectionThis.css({ minHeight: $sectionThis.height() });
var $filtered = $category.data('filter') == 's123-g-show-all' ? $images : $images.filter('[data-filter=' + $category.data('filter') + ']');
if ( initialize ) {
$images.hide();
$filtered.show();
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
} else {
$images.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
});
});
}jQuery(function($) {
AboutModuleInitialize_Layout2_4();
});
function AboutModuleInitialize_Layout2_4() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-about.layout-2,section.s123-module-about.layout-4');
$section.each(function( index ) {
var $sectionThis = $(this);
var $flickityContainer = $sectionThis.find('.carousel');
/**
* Gallery Modules - Flickity Initial
* Documentation : http://flickity.metafizzy.co/options.html
*/
$flickityContainer.flickity({
imagesLoaded: true,
lazyLoad: 2,
pageDots: false
});
});
});
}jQuery(function($) {
ContactModuleInitialize();
});
/**
* The function initialize the Contact Module.
*/
function ContactModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-contact');
$section.each( function( index ) {
var $sectionThis = $(this);
if ( false ) {
buisnessHoursTemplate.init({
$buisnessHourContainer : $sectionThis.find('#businessWorkingDays'),
buisnessHourJSON : $sectionThis.find("#businessHours")
});
}
$sectionThis.find('.contactUsForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var url = "/versions/"+$('#versionNUM').val()+"/include/contactO.php";
if ( $form.hasClass('custom-form') ) {
url = "/versions/"+$('#versionNUM').val()+"/include/customFormO.php";
}
$.ajax({
type: "POST",
url: url,
data: $form.serialize(),
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: translations.ThankYouAfterSubmmit+'<iframe src="/versions/'+$('#versionNUM').val()+'/include/contactSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'&moduleID='+dataObj.moduleID+'" style="width:100%;height:30px;" frameborder="0"></iframe>',
className: 'contactUsConfirm',
backdrop: true
});
$form.find('button:submit').prop('disabled', false);
WizardNotificationUpdate();
}
});
return false;
}
});
});
$sectionThis.find('.google-map-obj').each( function( index ) {
var $this = $(this);
/**
* There is no option to get an exist instance of GMaps and
* every time its load it include some JS files. To prevent
* reinitialize of an exist object we set a custom flag.
*/
if ( !$this.data('gmapInit') ) {
var options = {
div: '#'+$this.attr('id'),
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val(),
scrollwheel: false,
draggable: isMobile.any() ? false : true
};
/**
* Layout 8 RTL Issue - That layout has an opacity div that hide the
* Google Map controllers. To handle that we add this fix only for RTL
* and we move the controllers to the right. Note: Google Maps allow
* to move also the may type controllers but we are using the GMaps API
* and they didn't add this option, so we hide it.
*/
if ( $sectionThis.hasClass('layout-8') && $('html[dir=rtl]').length !== 0 ) {
options.zoomControlOpt = {
position: 'TOP_RIGHT'
};
options.mapTypeControl = false;
}
/**
* Google Map Initialize
* Documentations: https://hpneo.github.io/gmaps/documentation.html
*/
var map =  new GMaps(options);
map.addMarker({
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val()
});
$this.data('gmapInit',true);
}
});
});
});
}jQuery(function($) {
TeamModuleInitialize();
});
/**
* The function initialize the Team Module.
*/
function TeamModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-team');
$section.each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.team-phone-btn').click(function() {
var $this = $(this);
var $teamPhone = $this.closest('.team-phone');
buildPopup('teamPopupFloatDivPhone','',$teamPhone.find('.team-phone-popover').html(),'',true,true,true,'');
});
});
});
}jQuery(function($) {
CustomFormModuleInitialize();
});
/**
* The function initialize the Custom Form Module.
*/
function CustomFormModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-custom-form-builder');
$section.each( function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.customForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var sendingDialog = bootbox.alert({
title: translations.sending,
message: '<div id="customFormLoadingMessage">'+translations.loading+'</div>',
className: 'contactUsConfirm',
backdrop: true
});
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/customFormO.php",
data: new FormData($form.get(0)),
cache: false,
contentType: false,
processData: false,
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
message = '<span>'+translations.ThankYouAfterSubmmit+'<iframe src="/versions/'+$('#versionNUM').val()+'/include/customFormSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'&moduleID='+dataObj.moduleID+'" style="width:100%;height:30px;" frameborder="0"></iframe></span>';
var $sentMessage = $(message);
sendingDialog.find('.modal-title').html(translations.sent);
sendingDialog.find('.bootbox-body').append($sentMessage.hide());
$('#customFormLoadingMessage').hide();
$sentMessage.slideDown(200);
$form.find('button:submit').prop('disabled', false);
WizardNotificationUpdate();
}
});
return false;
}
});
});
});
});
}jQuery(function($) {
MapModuleInitialize();
});
/**
* The function initialize the Map Module.
*/
function MapModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-gmap');
$($section).each( function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.gmap-obj').each( function( index ) {
var $this = $(this);
/**
* There is no option to get an exist instance of GMaps and
* every time its load it include some JS files. To prevent
* reinitialize of an exist object we set a custom flag.
*/
if ( !$this.data('gmapInit') ) {
var mapProperty = {
div: '#'+$this.attr('id'),
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val(),
scrollwheel: false,
draggable: isMobile.any() ? false : true
}
if ($sectionThis.hasClass('layout-2')) {
mapProperty.styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
}
var map =  new GMaps(mapProperty);
map.addMarker({
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val(),
infoWindow: {
content: '<p style="color: black;">' + $this.parent('div').find('.googleMapContent').val() + '</p>'
}
});
$this.data('gmapInit',true);
}
});
});
});
}jQuery(function($) {
MenuModuleInitialize();
});
/**
* The function initialize the Menu Module.
*/
function MenuModuleInitialize() {
$( document ).on( "s123.page.load", function( event ) {
var $sections = $('.s123-module-menu.layout-2');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.filter a');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
var $products = $s.find('.menu-category');
$s.find('.filter li').removeClass('active');
$category.parent().addClass('active');
var $filtered = $products.filter('[data-filter=' + $category.data('filter') + ']')
if ( initialize ) {
$products.hide();
$filtered.show();
} else {
$products.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
});
});
}/**
* Module Layout Categories plugin.
*/
function ModuleLayoutCategories( settings ) {
var MC = this;
/**
* Add categories click event
*/
MC.addClickEvent = function() {
MC.$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
MC.$categories.removeClass('active');
$category.addClass('active');
var $filtered = MC.$products.filter('[data-categories-filter=' + $category.data('categories-filter') + ']');
if ( initialize ) {
MC.$products.hide();
$filtered.show();
} else {
MC.$products.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
}
/**
* Add mobile responsive filter click event
*/
MC.addFilterButton = function() {
MC.$filterButton.off('click').on('click', function() {
var $category = $(this);
MC.$categoriesContainer.slideToggle('slow');
$category.toggleClass('active');
return false;
});
}
if ( settings.length === 0 ) return;
MC.$categories = settings.$categories;
MC.$products = settings.$products;
MC.$filterButton = settings.$filterButton;
MC.$categoriesContainer = settings.$categoriesContainer;
MC.addClickEvent();
MC.$categories.first().trigger('click',true);
if ( MC.$filterButton ) MC.addFilterButton();
};jQuery(function($) {
var rtl = $('html[dir=rtl]').length === 1;
var $section = $('section.s123-page-data-products');
var $mainImage = $section.find('.main-image > div');
var $productOwlcarousel = $section.find('#productOwlcarousel');
jQueryZoomInitialize($mainImage);
/**
* Owl Carousel 2 Initialize
* Documentation: http://www.owlcarousel.owlgraphic.com/docs/api-options.html
*/
$productOwlcarousel.owlCarousel({
autoPlay: false,
items : 4,
margin: 10,
stagePadding: 5,
startPosition: 0,
loop: false,
center: false,
nav: true,
rtl: rtl,
navText:  [
'<i class="fa fa-2x fa-angle-' + (rtl ? 'right' : 'left') + '" aria-hidden="true"></i>',
'<i class="fa fa-2x fa-angle-' + (rtl ? 'left' : 'right') + '" aria-hidden="true"></i>'
],
dots: true
});
$productOwlcarousel.find('.item').click(function() {
var $clickedImage = $(this).find('.item-image');
var videoPath = '';
if ($clickedImage.data('media-type') == 'video') {
videoPath = $clickedImage.data('video-path');
}
jQueryZoomInitialize($clickedImage );
$mainImage.css({
backgroundImage: $clickedImage.css('background-image')
});
});
/**
* The function initialize the jQuery Zoom Plugin on the main product image.
* Documentation: http://www.jacklmoore.com/zoom/
*
* @param {string} url - The URL of the image we like to zoom in to it.
*/
function jQueryZoomInitialize( $clickedImage ) {
if ($clickedImage.data('media-type') == 'video' ) {
$mainImage.empty();
$('<iframe data-player="site123" style="color:white;width:'+ $mainImage.width() +'px;height:'+ $mainImage.height() +'px" type="text/html" src="'+ '/include/globalVideoPlayer.php?url=' + $clickedImage.data('video-path') + (isMobile.any() ? '&autoplay=false': '&autoplay=true' ) +'" frameborder="0" allowfullscreen=""></iframe>').appendTo($mainImage);
} else {
$mainImage.empty();
var url = $clickedImage.data('zoom-image');
if ( isMobile.any() ) return;
$mainImage.trigger('zoom.destroy');
/**
* It take some time for the zoom image to loaded and if the user hover the image
* before the zoom image finished loaded the zoom is not activate. We fix it by
* creating a div and removing it (for activate the `'mouseover' event).
*/
var loading = $('<div style="position:absolute;width:100%;height:100%;z-index:99999;"></div>').appendTo($mainImage);
$mainImage.zoom({
url: url,
magnify: 1,
touch: true,
callback: function() {
loading.remove();
},
});
}
}
(function () {
var $productOptions = $section.find(".product-options");
var $options = $productOptions.find('.p-o-container');
if ( $productOptions.length !== 0 ) {
$options.filter('[data-type="color"]').each( function() {
var $option = $(this);
var $colors = $option.find('.p-o-color');
$colors.click( function( event ) {
var $color = $(this);
$colors.filter('.selected').removeClass('selected');
$color.addClass('selected');
$option.find('.p-o-item-value').html(fixQuotIssue($color.attr('title')));
update();
});
$colors.first().trigger('click');	// default value
});
$options.filter('[data-type="list"]').each( function() {
var $option = $(this);
var $list = $option.find('.p-o-list');
$list.change( function( event ) {
$option.find('.p-o-item-value').html(fixQuotIssue($list.val()));
update();
}).trigger('change');	// default value
});
update();
}
/**
* The function update the product options object.
*/
function update() {
var po = [];
var totalItemsPrice = 0.00;
$options.each( function() {
var $option = $(this);
var pOption = new ProductOptions();
pOption.id = $option.get(0).id;
pOption.title = fixQuotIssue($option.data('title'));
pOption.type = $option.data('type');
switch( $option.data('type') ) {
case 'color':
var $color = $option.find('.p-o-color.selected');
if ( $color.length === 0 ) return;
pOption.item.id = $color.get(0).id
pOption.item.title = fixQuotIssue($color.attr('title'));
pOption.item.price = $color.data('price');
break;
case 'list':
var $list = $option.find('.p-o-list');
var $listSelectedOpt = $list.find('option:selected');
if ( $list.find('option').length === 0 ) return;
pOption.item.id = $listSelectedOpt.get(0).id;
pOption.item.title = fixQuotIssue($list.val());
pOption.item.price = $listSelectedOpt.data('price');
break;
}
totalItemsPrice += parseFloat(pOption.item.price);
po.push(pOption);
});
$('#productOptions').html(JSON.stringify(po));
addItemsPrice(totalItemsPrice);
}
/**
* Product Option Class.
*/
function ProductOptions() {
return {
id: null,
title: null,
type: null,
item: {
id: null,
title: null,
price: 0
}
};
}
/**
* The function add product items price to the product price.
*
* @param {float} totalItemsPrice - The total items price.
*/
function addItemsPrice( totalItemsPrice ) {
var $productPrice = $section.find('#productPrice');
var $price = $productPrice.find('[data-type="price"]');
if ( !$.isNumeric(totalItemsPrice) ) return;
if ( parseFloat($productPrice.data('price'))
+ parseFloat(totalItemsPrice) == parseFloat($price.html()) ) return;
var p = parseFloat($productPrice.data('price')) + parseFloat(totalItemsPrice);
$price.html(p.toFixed(2));
}
})();
(function () {
var $ct = $section.find("#product-custom-text");
var $ct_fieldTitle = $ct.find("#ct_fieldTitle");
var $ct_charLimit = $ct.find("#ct_charLimit");
var $orderButtonPopup = $section.find(".orderButtonPopup");
$ct_fieldTitle.on('input', function( event ) {
var max = $ct.data('char-limit');
var length = $ct_fieldTitle.val().length
if ( length > max) {
$ct_fieldTitle.val($ct_fieldTitle.val().substring(0, max));
} else {
$ct_charLimit.html(max - length);
}
});
$ct_fieldTitle.blur( function( event ) {
update();
});
$orderButtonPopup.click( function( event ) {
update();
});
/**
* The function update the custom text object.
*/
function update() {
var ct = new CustomText();
ct.fieldTitle = fixQuotIssue($ct.data('field-title'));
ct.value = $ct_fieldTitle.val();
$('#customText').html(JSON.stringify(ct));
}
/**
* Custom Text Class.
*/
function CustomText() {
return {
fieldTitle: null,
value: null
};
}
})();
/**
* The function convert `&quot;` to `"`, We use data attribute to to pass
* some of the fields with `htmlspecialchars()` on the server side to
* prevent HTML break with quot, the JS function `stringify` doesn't
* handle `&quot;` chars so we fix it manually by replacing it to `"`.
* In the feature we need to stop passing the values using `data`.
*/
function fixQuotIssue( value ) {
if ( !value ) return value;
return value.toString().replace(/\&quot;/g,'\"');
}
$('.quantity_field').on('input', function() {
var $this = $(this);
if ( $this.val().length === 0 ) $this.val(1);
if ( !$.isNumeric($this.val()) ) $this.val($this.val().replace(/[^0-9]/g,''));
if ( $this.val() <= 0 ) $this.val(1);
if ( parseInt($this.val()) > parseInt($this.prop('max')) ) {
$this.val($this.prop('max'));
quantityPopover($this,translations.productQuntityLimit.replace('{{units_limitation}}',$this.prop('max')));
} else {
$section.find('.btn-buy-now.orderButtonPopup').data('quantity-amount',$this.val());
}
/**
* The function show a popover with a message related to the quantity validations.
*/
function quantityPopover( $input, message ) {
$input.popover({
container: $section,
content: message,
trigger: 'manual',
template: '<div class="popover cart-validator-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
placement: function(popover, input) {
return isMobile.any() ? 'auto' : 'bottom';
}
});
$input.popover('show');
clearTimeout($input.data('q-p-timeout'));
$input.data('q-p-timeout',setTimeout(function(){
$input.popover('destroy');
},3000));
}
});
});jQuery(function($) {
AutoSetProductsImage();
});
function AutoSetProductsImage() {
$( document ).on( "s123.page.load", function( event ) {
$('.s123-module-products').each(function() {
var $thisModule = $(this);
$thisModule.find('.product-image.autoFitByHeight').first().each(function() {
var $this = $(this);
AutoSetProductsImage_onImageReady($this.find('img'),AutoSetProductsImage_autoFitByHeight,$this,$thisModule);
});
$thisModule.find('.product-image.autoFitByWidth').first().each(function() {
var $this = $(this);
AutoSetProductsImage_onImageReady($this.find('img'),AutoSetProductsImage_autoFitByWidth,$this,$thisModule);
});
});
var $box        = $('.s123-page-data .product-container .product-images .main-image');
if ($box.length>0) {
AutoSetProductsImage_onImageReady($('.product-container .main-image .hideImageRatio'),AutoSetProductsImage_autoFitProductPage,$box,'');
}
});
}
function AutoSetProductsImage_autoFitByHeight($imgBox,$thisModule) {
var width           = $imgBox.find('img').width();
var height          = $imgBox.find('img').height();
var boxMagic_ratio  = width/height;
var boxWidth        = $imgBox.width();
$thisModule.find('.product-image.autoFitByHeight').height(boxWidth/boxMagic_ratio);
}
function AutoSetProductsImage_autoFitByWidth($imgBox,$thisModule) {
var width           = $imgBox.find('img').width();
var height          = $imgBox.find('img').height();
var boxMagic_ratio  = width/height;
var boxHeight        = $imgBox.height();
$thisModule.find('.product-image.autoFitByWidth').width(boxHeight*boxMagic_ratio);
}
function AutoSetProductsImage_autoFitProductPage($imgBox,$thisModule) {
var boxWidth    = $imgBox.width();
var imgWidth    = $('.product-container .main-image .hideImageRatio').width();
var imgHeight   = $('.product-container .main-image .hideImageRatio').height();
var ratio       = imgWidth/imgHeight;
if (boxWidth>imgWidth) {
boxWidth = imgWidth;
$imgBox.width(boxWidth);
}
$imgBox.height(boxWidth/ratio);
}
function AutoSetProductsImage_onImageReady(selector, handler, $imgBox, $thisModule) {
var list;
list = typeof selector === 'string' ? $(selector) : selector;
list.each(function(index, element) {
if (element.complete) {
setTimeout(function() {
fireHandler.call(element);
}, 0); // Won't really be 0, but close
}
else {
$(element).bind('load', fireHandler);
}
});
function fireHandler(event) {
$(this).unbind('load', fireHandler);
handler.call(this,$imgBox,$thisModule);
}
}jQuery(function($) {
ProductsModuleInitialize();
});
/**
* The function initialize the Products Module.
*/
function ProductsModuleInitialize() {
$( document ).on( "s123.page.load", function( event ) {
var $sections = $('.s123-module-products.layout-2');
$sections.each(function( index ) {
var $s = $(this);
categories = new ModuleLayoutCategories({
$products :  $s.find('.products-category'),
$categoriesContainer : $s.find('.categories-panel'),
$filterButton : $s.find('.products-responsive-filter'),
$categories : $s.find('.products-categories-container li')
});
});
});
}jQuery(function($) {
ProductsModuleInitialize_Layout3();
});
/**
* The function initialize the Products Module.
*/
function ProductsModuleInitialize_Layout3() {
$( document ).on( "s123.page.ready", function( event ) {
var $sections = $('.s123-module-products.layout-3');
$sections.each(function( index ) {
var $s = $(this);
categories = new ModuleLayoutCategories({
$products :  $s.find('.products-container > div'),
$categoriesContainer : $s.find('.categories-panel'),
$filterButton : $s.find('.products-responsive-filter'),
$categories : $s.find('.products-categories-container li')
});
});
});
}jQuery(function($) {
TimelineModuleInitialize();
});
/**
* The function initialize the Timeline Module.
*/
function TimelineModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var timelineBlocks = $('.cd-timeline-block'),
offset = 0.8;
hideBlocks(timelineBlocks, offset);
$(window).on('scroll', function(){
(!window.requestAnimationFrame)
? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
});
function hideBlocks(blocks, offset) {
blocks.each(function(){
( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
});
}
function showBlocks(blocks, offset) {
blocks.each(function(){
( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
});
}
});
}/*! flipclock 2015-01-19 */
var Base=function(){};Base.extend=function(a,b){"use strict";var c=Base.prototype.extend;Base._prototyping=!0;var d=new this;c.call(d,a),d.base=function(){},delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(null!==arguments[0])return(arguments[0].extend||c).call(arguments[0],d)};return f.ancestor=this,f.extend=this.extend,f.forEach=this.forEach,f.implement=this.implement,f.prototype=d,f.toString=this.toString,f.valueOf=function(a){return"object"==a?f:e.valueOf()},c.call(f,b),"function"==typeof f.init&&f.init(),f},Base.prototype={extend:function(a,b){if(arguments.length>1){var c=this[a];if(c&&"function"==typeof b&&(!c.valueOf||c.valueOf()!=b.valueOf())&&/\bbase\b/.test(b)){var d=b.valueOf();b=function(){var a=this.base||Base.prototype.base;this.base=c;var b=d.apply(this,arguments);return this.base=a,b},b.valueOf=function(a){return"object"==a?b:d},b.toString=Base.toString}this[a]=b}else if(a){var e=Base.prototype.extend;Base._prototyping||"function"==typeof this||(e=this.extend||e);for(var f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;i=g[h++];)a[i]!=f[i]&&e.call(this,i,a[i]);for(var i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)void 0===this.prototype[d]&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)"function"==typeof arguments[a]?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;!function(a){"use strict";FlipClock=function(a,b,c){return b instanceof Object&&b instanceof Date==!1&&(c=b,b=0),new FlipClock.Factory(a,b,c)},FlipClock.Lang={},FlipClock.Base=Base.extend({buildDate:"2014-12-12",version:"0.7.7",constructor:function(b,c){"object"!=typeof b&&(b={}),"object"!=typeof c&&(c={}),this.setOptions(a.extend(!0,{},b,c))},callback:function(a){if("function"==typeof a){for(var b=[],c=1;c<=arguments.length;c++)arguments[c]&&b.push(arguments[c]);a.apply(this,b)}},log:function(a){window.console&&console.log&&console.log(a)},getOption:function(a){return this[a]?this[a]:!1},getOptions:function(){return this},setOption:function(a,b){this[a]=b},setOptions:function(a){for(var b in a)"undefined"!=typeof a[b]&&this.setOption(b,a[b])}})}(jQuery),function(a){"use strict";FlipClock.Face=FlipClock.Base.extend({autoStart:!0,dividers:[],factory:!1,lists:[],constructor:function(a,b){this.dividers=[],this.lists=[],this.base(b),this.factory=a},build:function(){this.autoStart&&this.start()},createDivider:function(b,c,d){"boolean"!=typeof c&&c||(d=c,c=b);var e=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");d&&(e=""),b=this.factory.localize(b);var f=['<span class="'+this.factory.classes.divider+" "+(c?c:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(b?b:"")+"</span>",e,"</span>"],g=a(f.join(""));return this.dividers.push(g),g},createList:function(a,b){"object"==typeof a&&(b=a,a=0);var c=new FlipClock.List(this.factory,a,b);return this.lists.push(c),c},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0,{minimumDigits:this.factory.minimumDigits}),this.flip(this.factory.original,!1)},appendDigitToClock:function(a){a.$el.append(!1)},addDigit:function(a){var b=this.createList(a,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});this.appendDigitToClock(b)},start:function(){},stop:function(){},autoIncrement:function(){this.factory.countdown?this.decrement():this.increment()},increment:function(){this.factory.time.addSecond()},decrement:function(){0==this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond()},flip:function(b,c){var d=this;a.each(b,function(a,b){var e=d.lists[a];e?(c||b==e.digit||e.play(),e.select(b)):d.addDigit(b)})}})}(jQuery),function(a){"use strict";FlipClock.Factory=FlipClock.Base.extend({animationRate:1e3,autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",countdown:!1,defaultClockFace:"HourlyCounter",defaultLanguage:"english",$el:!1,face:!0,lang:!1,language:"english",minimumDigits:0,original:!1,running:!1,time:!1,timer:!1,$wrapper:!1,constructor:function(b,c,d){d||(d={}),this.lists=[],this.running=!1,this.base(d),this.$el=a(b).addClass(this.classes.wrapper),this.$wrapper=this.$el,this.original=c instanceof Date?c:c?Math.round(c):0,this.time=new FlipClock.Time(this,this.original,{minimumDigits:this.minimumDigits,animationRate:this.animationRate}),this.timer=new FlipClock.Timer(this,d),this.loadLanguage(this.language),this.loadClockFace(this.clockFace,d),this.autoStart&&this.start()},loadClockFace:function(a,b){var c,d="Face",e=!1;return a=a.ucfirst()+d,this.face.stop&&(this.stop(),e=!0),this.$el.html(""),this.time.minimumDigits=this.minimumDigits,c=FlipClock[a]?new FlipClock[a](this,b):new FlipClock[this.defaultClockFace+d](this,b),c.build(),this.face=c,e&&this.start(),this.face},loadLanguage:function(a){var b;return b=FlipClock.Lang[a.ucfirst()]?FlipClock.Lang[a.ucfirst()]:FlipClock.Lang[a]?FlipClock.Lang[a]:FlipClock.Lang[this.defaultLanguage],this.lang=b},localize:function(a,b){var c=this.lang;if(!a)return null;var d=a.toLowerCase();return"object"==typeof b&&(c=b),c&&c[d]?c[d]:a},start:function(a){var b=this;b.running||b.countdown&&!(b.countdown&&b.time.time>0)?b.log("Trying to start timer when countdown already at 0"):(b.face.start(b.time),b.timer.start(function(){b.flip(),"function"==typeof a&&a()}))},stop:function(a){this.face.stop(),this.timer.stop(a);for(var b in this.lists)this.lists.hasOwnProperty(b)&&this.lists[b].stop()},reset:function(a){this.timer.reset(a),this.face.reset()},setTime:function(a){this.time.time=a,this.flip(!0)},getTime:function(){return this.time},setCountdown:function(a){var b=this.running;this.countdown=a?!0:!1,b&&(this.stop(),this.start())},flip:function(a){this.face.flip(!1,a)}})}(jQuery),function(a){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$el:!1,$obj:!1,items:[],lastDigit:0,constructor:function(a,b){this.factory=a,this.digit=b,this.lastDigit=b,this.$el=this.createList(),this.$obj=this.$el,b>0&&this.select(b),this.factory.$el.append(this.$el)},select:function(a){if("undefined"==typeof a?a=this.digit:this.digit=a,this.digit!=this.lastDigit){var b=this.$el.find("."+this.classes.before).removeClass(this.classes.before);this.$el.find("."+this.classes.active).removeClass(this.classes.active).addClass(this.classes.before),this.appendListItem(this.classes.active,this.digit),b.remove(),this.lastDigit=this.digit}},play:function(){this.$el.addClass(this.factory.classes.play)},stop:function(){var a=this;setTimeout(function(){a.$el.removeClass(a.factory.classes.play)},this.factory.timer.interval)},createListItem:function(a,b){return['<li class="'+(a?a:"")+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>","</a>","</li>"].join("")},appendListItem:function(a,b){var c=this.createListItem(a,b);this.$el.append(c)},createList:function(){var b=this.getPrevDigit()?this.getPrevDigit():this.digit,c=a(['<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'">',this.createListItem(this.classes.before,b),this.createListItem(this.classes.active,this.digit),"</ul>"].join(""));return c},getNextDigit:function(){return 9==this.digit?0:this.digit+1},getPrevDigit:function(){return 0==this.digit?9:this.digit-1}})}(jQuery),function(a){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},a.fn.FlipClock=function(b,c){return new FlipClock(a(this),b,c)},a.fn.flipClock=function(b,c){return a.fn.FlipClock(b,c)}}(jQuery),function(a){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(a,b,c){"object"!=typeof c&&(c={}),c.minimumDigits||(c.minimumDigits=a.minimumDigits),this.base(c),this.factory=a,b&&(this.time=b)},convertDigitsToArray:function(a){var b=[];a=a.toString();for(var c=0;c<a.length;c++)a[c].match(/^\d*$/g)&&b.push(a[c]);return b},digit:function(a){var b=this.toString(),c=b.length;return b[c-a]?b[c-a]:!1},digitize:function(b){var c=[];if(a.each(b,function(a,b){b=b.toString(),1==b.length&&(b="0"+b);for(var d=0;d<b.length;d++)c.push(b.charAt(d))}),c.length>this.minimumDigits&&(this.minimumDigits=c.length),this.minimumDigits>c.length)for(var d=c.length;d<this.minimumDigits;d++)c.unshift("0");return c},getDateObject:function(){return this.time instanceof Date?this.time:new Date((new Date).getTime()+1e3*this.getTimeSeconds())},getDayCounter:function(a){var b=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];return a&&b.push(this.getSeconds(!0)),this.digitize(b)},getDays:function(a){var b=this.getTimeSeconds()/60/60/24;return a&&(b%=7),Math.floor(b)},getHourCounter:function(){var a=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return a},getHourly:function(){return this.getHourCounter()},getHours:function(a){var b=this.getTimeSeconds()/60/60;return a&&(b%=24),Math.floor(b)},getMilitaryTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject());var c=[a.getHours(),a.getMinutes()];return b===!0&&c.push(a.getSeconds()),this.digitize(c)},getMinutes:function(a){var b=this.getTimeSeconds()/60;return a&&(b%=60),Math.floor(b)},getMinuteCounter:function(){var a=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return a},getTimeSeconds:function(a){return a||(a=new Date),this.time instanceof Date?this.factory.countdown?Math.max(this.time.getTime()/1e3-a.getTime()/1e3,0):a.getTime()/1e3-this.time.getTime()/1e3:this.time},getTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject()),console.log(a);var c=a.getHours(),d=[c>12?c-12:0===c?12:c,a.getMinutes()];return b===!0&&d.push(a.getSeconds()),this.digitize(d)},getSeconds:function(a){var b=this.getTimeSeconds();return a&&(60==b?b=0:b%=60),Math.ceil(b)},getWeeks:function(a){var b=this.getTimeSeconds()/60/60/24/7;return a&&(b%=52),Math.floor(b)},removeLeadingZeros:function(b,c){var d=0,e=[];return a.each(c,function(a){b>a?d+=parseInt(c[a],10):e.push(c[a])}),0===d?e:c},addSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()+a):this.time+=a},addSecond:function(){this.addSeconds(1)},subSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()-a):this.time-=a},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery),function(){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(a,b){this.base(b),this.factory=a,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(a){clearInterval(this.timer),this.count=0,this._setInterval(a),this.callback(this.callbacks.reset)},start:function(a){this.factory.running=!0,this._createTimer(a),this.callback(this.callbacks.start)},stop:function(a){this.factory.running=!1,this._clearInterval(a),this.callback(this.callbacks.stop),this.callback(a)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(a){this._setInterval(a)},_destroyTimer:function(a){this._clearInterval(),this.timer=!1,this.callback(a),this.callback(this.callbacks.destroy)},_interval:function(a){this.callback(this.callbacks.interval),this.callback(a),this.count++},_setInterval:function(a){var b=this;b._interval(a),b.timer=setInterval(function(){b._interval(a)},this.interval)}})}(jQuery),function(a){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul");this.factory.time.time||(this.factory.original=new Date,this.factory.time=new FlipClock.Time(this.factory,this.factory.original));var b=b?b:this.factory.time.getMilitaryTime(!1,this.showSeconds);b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.createDivider(),this.createDivider(),a(this.dividers[0]).insertBefore(this.lists[this.lists.length-2].$el),a(this.dividers[1]).insertBefore(this.lists[this.lists.length-4].$el),this.base()},flip:function(a,b){this.autoIncrement(),a=a?a:this.factory.time.getMilitaryTime(!1,this.showSeconds),this.base(a,b)}})}(jQuery),function(a){FlipClock.CounterFace=FlipClock.Face.extend({shouldAutoIncrement:!1,constructor:function(a,b){"object"!=typeof b&&(b={}),a.autoStart=b.autoStart?!0:!1,b.autoStart&&(this.shouldAutoIncrement=!0),a.increment=function(){a.countdown=!1,a.setTime(a.getTime().getTimeSeconds()+1)},a.decrement=function(){a.countdown=!0;var b=a.getTime().getTimeSeconds();b>0&&a.setTime(b-1)},a.setValue=function(b){a.setTime(b)},a.setCounter=function(b){a.setTime(b)},this.base(a,b)},build:function(){var b=this,c=this.factory.$el.find("ul"),d=this.factory.getTime().digitize([this.factory.getTime().time]);d.length>c.length&&a.each(d,function(a,c){var d=b.createList(c);d.select(c)}),a.each(this.lists,function(a,b){b.play()}),this.base()},flip:function(a,b){this.shouldAutoIncrement&&this.autoIncrement(),a||(a=this.factory.getTime().digitize([this.factory.getTime().time])),this.base(a,b)},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0),this.flip()}})}(jQuery),function(a){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul"),e=0;b=b?b:this.factory.time.getDayCounter(this.showSeconds),b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.showSeconds?a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el):e=2,a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4+e].$el),a(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length-6+e].$el),a(this.createDivider("Days",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getDayCounter(this.showSeconds)),this.autoIncrement(),this.base(a,b)}})}(jQuery),function(a){FlipClock.HourlyCounterFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b,c){var d=this,e=this.factory.$el.find("ul");c=c?c:this.factory.time.getHourCounter(),c.length>e.length&&a.each(c,function(a,b){d.createList(b)}),a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el),a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4].$el),b||a(this.createDivider("Hours",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getHourCounter()),this.autoIncrement(),this.base(a,b)},appendDigitToClock:function(a){this.base(a),this.dividers[0].insertAfter(this.dividers[0].next())}})}(jQuery),function(){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(a,b){this.base(a,b)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(a,b){a||(a=this.factory.time.getMinuteCounter()),this.base(a,b)}})}(jQuery),function(a){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(){var b=this.factory.time.getTime(!1,this.showSeconds);this.base(b),this.meridiumText=this.getMeridium(),this.meridium=a(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join("")),this.meridium.insertAfter(this.lists[this.lists.length-1].$el)},flip:function(a,b){this.meridiumText!=this.getMeridium()&&(this.meridiumText=this.getMeridium(),this.meridium.find("a").html(this.meridiumText)),this.base(this.factory.time.getTime(!1,this.showSeconds),b)},getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},isPM:function(){return"PM"==this.getMeridium()?!0:!1},isAM:function(){return"AM"==this.getMeridium()?!0:!1}})}(jQuery),function(){FlipClock.Lang.Arabic={years:"سنوات",months:"شهور",days:"أيام",hours:"ساعات",minutes:"دقائق",seconds:"ثواني"},FlipClock.Lang.ar=FlipClock.Lang.Arabic,FlipClock.Lang["ar-ar"]=FlipClock.Lang.Arabic,FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery),function(){FlipClock.Lang.Danish={years:"År",months:"Måneder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.da=FlipClock.Lang.Danish,FlipClock.Lang["da-dk"]=FlipClock.Lang.Danish,FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery),function(){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},FlipClock.Lang.de=FlipClock.Lang.German,FlipClock.Lang["de-de"]=FlipClock.Lang.German,FlipClock.Lang.german=FlipClock.Lang.German}(jQuery),function(){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},FlipClock.Lang.en=FlipClock.Lang.English,FlipClock.Lang["en-us"]=FlipClock.Lang.English,FlipClock.Lang.english=FlipClock.Lang.English}(jQuery),function(){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"},FlipClock.Lang.es=FlipClock.Lang.Spanish,FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish,FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery),function(){FlipClock.Lang.Finnish={years:"Vuotta",months:"Kuukautta",days:"Päivää",hours:"Tuntia",minutes:"Minuuttia",seconds:"Sekuntia"},FlipClock.Lang.fi=FlipClock.Lang.Finnish,FlipClock.Lang["fi-fi"]=FlipClock.Lang.Finnish,FlipClock.Lang.finnish=FlipClock.Lang.Finnish}(jQuery),function(){FlipClock.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},FlipClock.Lang.fr=FlipClock.Lang.French,FlipClock.Lang["fr-ca"]=FlipClock.Lang.French,FlipClock.Lang.french=FlipClock.Lang.French}(jQuery),function(){FlipClock.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},FlipClock.Lang.it=FlipClock.Lang.Italian,FlipClock.Lang["it-it"]=FlipClock.Lang.Italian,FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery),function(){FlipClock.Lang.Latvian={years:"Gadi",months:"Mēneši",days:"Dienas",hours:"Stundas",minutes:"Minūtes",seconds:"Sekundes"},FlipClock.Lang.lv=FlipClock.Lang.Latvian,FlipClock.Lang["lv-lv"]=FlipClock.Lang.Latvian,FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery),function(){FlipClock.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},FlipClock.Lang.nl=FlipClock.Lang.Dutch,FlipClock.Lang["nl-be"]=FlipClock.Lang.Dutch,FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery),function(){FlipClock.Lang.Norwegian={years:"År",months:"Måneder",days:"Dager",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.no=FlipClock.Lang.Norwegian,FlipClock.Lang.nb=FlipClock.Lang.Norwegian,FlipClock.Lang["no-nb"]=FlipClock.Lang.Norwegian,FlipClock.Lang.norwegian=FlipClock.Lang.Norwegian}(jQuery),function(){FlipClock.Lang.Portuguese={years:"Anos",months:"Meses",days:"Dias",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},FlipClock.Lang.pt=FlipClock.Lang.Portuguese,FlipClock.Lang["pt-br"]=FlipClock.Lang.Portuguese,FlipClock.Lang.portuguese=FlipClock.Lang.Portuguese}(jQuery),function(){FlipClock.Lang.Russian={years:"лет",months:"месяцев",days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"},FlipClock.Lang.ru=FlipClock.Lang.Russian,FlipClock.Lang["ru-ru"]=FlipClock.Lang.Russian,FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery),function(){FlipClock.Lang.Swedish={years:"År",months:"Månader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},FlipClock.Lang.sv=FlipClock.Lang.Swedish,FlipClock.Lang["sv-se"]=FlipClock.Lang.Swedish,FlipClock.Lang.swedish=FlipClock.Lang.Swedish}(jQuery),function(){FlipClock.Lang.Chinese={years:"年",months:"月",days:"日",hours:"时",minutes:"分",seconds:"秒"},FlipClock.Lang.zh=FlipClock.Lang.Chinese,FlipClock.Lang["zh-cn"]=FlipClock.Lang.Chinese,FlipClock.Lang.chinese=FlipClock.Lang.Chinese}(jQuery);jQuery(function($) {
BlogModuleInitialize();
});
/**
* The function initialize the Contact Module.
*/
function BlogModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('.blogCommentsForm').length !== 0 ) {
var $blogCommentsForm = $('.blogCommentsForm');
var $commentIframe = $('#commentIframeContent');
var $messageTextArea = $('#comment_message');
$commentIframe.off('load').on('load',function() {
/**
* The validator is not active yet
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
$commentIframe.contents().find('.blogCommentsForm').validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
setNewIframeHeight();
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
setNewIframeHeight();
}
});
*/
var showMEssage = $commentIframe.contents().find('.showMessage').val();
if( showMEssage == 1) {
showManagerApproveMessage();
}
$commentIframe.contents().find('.reply-to').each(function( index, replyLink ) {
$(replyLink).on('click',function() {
$childForm = $(this).closest('.commentBox').find('.blogCommentsForm');
if ($childForm.hasClass('hidden')) {
$childForm.removeClass('hidden');
$(this).html('Hide');
setNewIframeHeight();
} else {
$childForm.addClass('hidden');
$(this).html('Reply');
setNewIframeHeight();
}
$childForm.find('.comment_message').select();
});
});
var subComments = tryParseJSON($commentIframe.contents().find('.sub-comments').html());
showSubcomments(subComments);
setNewIframeHeight();
});
/**
* Show the sub comments of the parent comments
* @param {object} Obj - Valid Object or empty if the sent JSON string is invalid.
*/
function showSubcomments( subComments ) {
$.each(subComments,function( index, comment ) {
var $parentComments = $commentIframe.contents().find('.commentBox');
$.each($parentComments,function( index, parentComment ) {
if ($(this).data('comment-id') == comment.parentID ) {
$(parentComment).find('.sub-comments-div').append(commentHTML(comment.title,comment.time,comment.message));
}
});
});
}
/**
* The function trying to parse the sent JSON string, we use it to prevent
* JS error if the JSON is not valid from some reason.
*
* @param {string} str - JSON string.
* @return {object} Obj - Valid Object or False if the sent JSON string is invalid.
*/
function tryParseJSON( str ) {
try {
var Obj = JSON.parse(str);
if ( Obj && typeof Obj === "object" ) {
return Obj;
}
} catch (e) {}
return false;
}
function commentHTML( title,time,message ) {
var html ='';
html += '<div style="padding:5px 0px 0px 10px">';
html += '<strong>'+title+'</strong><br>';
html += '<small>'+time+'</small><br>';
html += '<span>'+message+'</span>';
html += '</div>' ;
return html;
}
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$blogCommentsForm.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
}
});
$blogCommentsForm.off('submit.blogCommentsForm').on('submit.blogCommentsForm', function( event ) {
event.preventDefault();
if ( !$blogCommentsForm.valid() ) return;
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/wizard/comments/commentO.php",
data: $blogCommentsForm.serialize(),
success: function(data) {
var dataObj = jQuery.parseJSON(data);
if ( dataObj.blockComment  == '0' ) {
$("#commentIframeContent").attr("src", function(index, attr){
return attr;
});
return false;
}
$blogCommentsForm.trigger("reset");
showManagerApproveMessage();
WizardNotificationUpdate();
}
});
return false;
});
}
});
}
function showManagerApproveMessage() {
bootbox.alert({
title: translations.sent,
message: translations.blogReviewMessage,
className: 'contactUsConfirm',
backdrop: true
});
}
function setNewIframeHeight() {
var $iframe = $("#commentIframeContent");
$iframe.height($iframe.contents().find('.sub-comment-container').outerHeight(true));
}jQuery(function($) {
PromoModuleInitialize();
});
/**
* The function initialize the Promo Module.
*/
function PromoModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-promo-module-v2');
$($section).each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.carousel').carousel();
$sectionThis.find('.promoForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var url = "/versions/"+$('#versionNUM').val()+"/include/contactO.php";
if ( $form.hasClass('custom-form') ) {
url = "/versions/"+$('#versionNUM').val()+"/include/customFormO.php";
}
$.ajax({
type: "POST",
url: url,
data: $form.serialize(),
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: translations.ThankYouAfterSubmmit+'<iframe src="/versions/'+$('#versionNUM').val()+'/include/contactSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'&moduleID='+dataObj.moduleID+'" style="width:100%;height:30px;" frameborder="0"></iframe>',
className: 'contactUsConfirm',
backdrop: true
});
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
});
});
});
}jQuery(function($) {
PromoModuleInitialize();
});
/**
* The function initialize the Promo Module.
*/
function PromoOldV1ModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-promo');
$($section).each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.carousel').carousel();
});
});
}jQuery(function($) {
CountdownModuleInitialize();
});
/**
* The function initialize the Countdown Module.
*/
function CountdownModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
$('.s123-module-countdown-container').each( function() {
var $this = $(this);
var $clock = $this.find('.clock');
var $message = $this.find('.message');
var datetime = $clock.data('datetime');
var type = $clock.data('type');
var futureDate  = new Date(datetime);
var currentDate = new Date();
var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
if( diff <= 0 ) {
diff = 0;
$message.css('visibility', 'visible');
}
switch( type ) {
case 1:
var clockFace = 'DailyCounter';
break;
case 2:
var clockFace = 'HourlyCounter';
break;
case 3:
var clockFace = 'MinuteCounter';
break;
default:
var clockFace = 'DailyCounter';
}
/**
* Countdown Modules - FlipClock Initial
* Documentation : http://flipclockjs.com/
*/
$clock = $clock.FlipClock( diff, {
clockFace: clockFace,
autoStart: true,
countdown: true,
callbacks: {
stop: function() {
$message.css('visibility', 'visible');
}
}
});
});
});
}!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="dist/",t(0)}([function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},a=o(1),r=(n(a),o(5)),c=n(r),u=o(6),s=n(u),d=o(7),f=n(d),l=o(8),m=n(l),p=o(9),b=n(p),v=o(10),g=n(v),y=o(13),w=n(y),h=[],k=!1,x=document.all&&!window.atob,j={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded"},O=function(){var e=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];return e&&(k=!0),k?(h=(0,g["default"])(h,j),(0,b["default"])(h,j.once),h):void 0},_=function(){h=(0,w["default"])(),O()},z=function(){h.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},A=function(e){return e===!0||"mobile"===e&&m["default"].mobile()||"phone"===e&&m["default"].phone()||"tablet"===e&&m["default"].tablet()||"function"==typeof e&&e()===!0},E=function(e){return j=i(j,e),h=(0,w["default"])(),A(j.disable)||x?z():(document.querySelector("body").setAttribute("data-aos-easing",j.easing),document.querySelector("body").setAttribute("data-aos-duration",j.duration),document.querySelector("body").setAttribute("data-aos-delay",j.delay),"DOMContentLoaded"===j.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?O(!0):"load"===j.startEvent?window.addEventListener(j.startEvent,function(){O(!0)}):document.addEventListener(j.startEvent,function(){O(!0)}),window.addEventListener("resize",(0,s["default"])(O,50,!0)),window.addEventListener("orientationchange",(0,s["default"])(O,50,!0)),window.addEventListener("scroll",(0,c["default"])(function(){(0,b["default"])(h,j.once)},99)),document.addEventListener("DOMNodeRemoved",function(e){var t=e.target;t&&1===t.nodeType&&t.hasAttribute&&t.hasAttribute("data-aos")&&(0,s["default"])(_,50,!0)}),(0,f["default"])("[data-aos]",_),h)};e.exports={init:E,refresh:O,refreshHard:_}},function(e,t){},,,,function(e,t,o){"use strict";function n(e,t,o){var n=!0,a=!0;if("function"!=typeof e)throw new TypeError(c);return i(o)&&(n="leading"in o?!!o.leading:n,a="trailing"in o?!!o.trailing:a),r(e,t,{leading:n,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":a(e);return!!e&&("object"==t||"function"==t)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},r=o(6),c="Expected a function";e.exports=n},function(e,t){"use strict";function o(e,t,o){function n(t){var o=b,n=v;return b=v=void 0,O=t,y=e.apply(n,o)}function a(e){return O=e,w=setTimeout(d,t),_?n(e):y}function r(e){var o=e-h,n=e-O,i=t-o;return z?x(i,g-n):i}function u(e){var o=e-h,n=e-O;return!h||o>=t||0>o||z&&n>=g}function d(){var e=j();return u(e)?f(e):void(w=setTimeout(d,r(e)))}function f(e){return clearTimeout(w),w=void 0,A&&b?n(e):(b=v=void 0,y)}function l(){void 0!==w&&clearTimeout(w),h=O=0,b=v=w=void 0}function m(){return void 0===w?y:f(j())}function p(){var e=j(),o=u(e);if(b=arguments,v=this,h=e,o){if(void 0===w)return a(h);if(z)return clearTimeout(w),w=setTimeout(d,t),n(h)}return void 0===w&&(w=setTimeout(d,t)),y}var b,v,g,y,w,h=0,O=0,_=!1,z=!1,A=!0;if("function"!=typeof e)throw new TypeError(s);return t=c(t)||0,i(o)&&(_=!!o.leading,z="maxWait"in o,g=z?k(c(o.maxWait)||0,t):g,A="trailing"in o?!!o.trailing:A),p.cancel=l,p.flush=m,p}function n(e){var t=i(e)?h.call(e):"";return t==f||t==l}function i(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function a(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||a(e)&&h.call(e)==m}function c(e){if("number"==typeof e)return e;if(r(e))return d;if(i(e)){var t=n(e.valueOf)?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(p,"");var o=v.test(e);return o||g.test(e)?y(e.slice(2),o?2:8):b.test(e)?d:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},s="Expected a function",d=NaN,f="[object Function]",l="[object GeneratorFunction]",m="[object Symbol]",p=/^\s+|\s+$/g,b=/^[-+]0x[0-9a-f]+$/i,v=/^0b[01]+$/i,g=/^0o[0-7]+$/i,y=parseInt,w=Object.prototype,h=w.toString,k=Math.max,x=Math.min,j=Date.now;e.exports=o},function(e,t){"use strict";function o(e,t){r.push({selector:e,fn:t}),!c&&a&&(c=new a(n),c.observe(i.documentElement,{childList:!0,subtree:!0,removedNodes:!0})),n()}function n(){for(var e,t,o=0,n=r.length;n>o;o++){e=r[o],t=i.querySelectorAll(e.selector);for(var a,c=0,u=t.length;u>c;c++)a=t[c],a.ready||(a.ready=!0,e.fn.call(a,a))}}Object.defineProperty(t,"__esModule",{value:!0});var i=window.document,a=window.MutationObserver||window.WebKitMutationObserver,r=[],c=void 0;t["default"]=o},function(e,t){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),i=function(){function e(){o(this,e)}return n(e,[{key:"phone",value:function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e}},{key:"mobile",value:function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t["default"]=new i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,o){var n=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof n&&("false"===n||!o&&"true"!==n)&&e.node.classList.remove("aos-animate")},n=function(e,t){var n=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,a){o(e,i+n,t)})};t["default"]=n},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(11),a=n(i),r=function(e,t){return e.forEach(function(e,o){e.node.classList.add("aos-init"),e.position=(0,a["default"])(e.node,t.offset)}),e};t["default"]=r},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(12),a=n(i),r=function(e,t){var o=0,n=0,i=window.innerHeight,r={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(r.offset&&!isNaN(r.offset)&&(n=parseInt(r.offset)),r.anchor&&document.querySelectorAll(r.anchor)&&(e=document.querySelectorAll(r.anchor)[0]),o=(0,a["default"])(e).top,r.anchorPlacement){case"top-bottom":break;case"center-bottom":o+=e.offsetHeight/2;break;case"bottom-bottom":o+=e.offsetHeight;break;case"top-center":o+=i/2;break;case"bottom-center":o+=i/2+e.offsetHeight;break;case"center-center":o+=i/2+e.offsetHeight/2;break;case"top-top":o+=i;break;case"bottom-top":o+=e.offsetHeight+i;break;case"center-top":o+=e.offsetHeight/2+i}return r.anchorPlacement||r.offset||isNaN(t)||(n=t),o+n};t["default"]=r},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){for(var t=0,o=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),o+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:o,left:t}};t["default"]=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){e=e||document.querySelectorAll("[data-aos]");var t=[];return[].forEach.call(e,function(e,o){t.push({node:e})}),t};t["default"]=o}])});jQuery(function($) {
JobsModuleInitialize();
});
/**
* The function initialize the Jobs Module.
*/
function JobsModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-jobs, section.s123-page-data-job');
$section.each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.jobsApplyBtn').click(function() {
var $applyBtn = $(this);
var websiteID = $applyBtn.data('website-id');
var moduleID = $applyBtn.data('module-id');
var uniqueID = $applyBtn.data('unique-id');
var w = $('#w').val();
buildPopup('popupJobs','',buildForm(websiteID,moduleID,uniqueID,w),'',true,false,true,'');
$('#popupJobs').find('.jobsForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var $jobsLoadingMessage = $('<div id="jobsLoadingMessage">'+translations.loading+'</div>');
var bootboxDialog = bootbox.alert({
title: translations.sending,
message: $jobsLoadingMessage,
className: 'jobsConfirm, bootbox-jobs-form',
backdrop: true
}).on("hidden.bs.modal", function() {
buildPopup_CloseAction('popupJobs');
});
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/jobsO.php",
data: new FormData($form.get(0)),
cache: false,
contentType: false,
processData: false,
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
message = '<span>'+translations.ThankYouAfterSubmmit+'</span>';
var $sentMessage = $(message);
bootboxDialog.find('.modal-title').html(translations.sent);
bootboxDialog.find('.bootbox-body').append($sentMessage.hide());
$jobsLoadingMessage.hide();
$sentMessage.slideDown(200);
$form.find('button:submit').prop('disabled', false);
WizardNotificationUpdate();
}
});
return false;
}
});
});
});
});
});
}
/**
* The function build the html of the job form
*
* @param {string} websiteID - Website ID.
* @param {string} moduleID - Module ID.
* @param {string} uniqueID - Unique item ID.
* @return {string} html - Html of the form.
*/
function buildForm( websiteID, moduleID, uniqueID, w ) {
var html = '';
html += '<form class="jobsForm">';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="first">'+translations.firstName+'</label>';
html += '<input type="text" name="jobs_first_name" placeholder="'+translations.firstName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="jobs_last_name">'+translations.lastName+'</label>';
html += '<input type="text" name="jobs_last_name" placeholder="'+translations.lastName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="jobs_phone">'+translations.phone+'</label>';
html += '<input type="text" name="jobs_phone" placeholder="'+translations.phone+'" class="form-control">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="jobs_email">'+translations.emailAddress+'</label>';
html += '<input type="text" name="jobs_email" placeholder="'+translations.emailAddress+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'" data-rule-email="true" data-msg-email="'+translations.jqueryValidMsgEmail+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-xs-12">';
html += '<div class="form-group">';
html += '<label for="">'+translations.fileUpload+'</label>';
html += '<input type="file" class="form-control" name="jobs_upload_file">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<button type="submit" class="btn btn-primary btn-block">'+translations.send+'</button>';
html += '<input type="hidden" name="w" value="'+w+'">';
html += '<input type="hidden" name="websiteID" value="'+websiteID+'">';
html += '<input type="hidden" name="moduleID" value="'+moduleID+'">';
html += '<input type="hidden" name="uniqueID" value="'+uniqueID+'">';
html += '</form>';
return html;
}jQuery(function($) {
TestimonialsModuleInitialize_Layout1();
});
/**
* The function initialize the Testimonials Module.
*/
function TestimonialsModuleInitialize_Layout1() {
$( document ).on( "s123.page.ready", function( event ) {
var $sections = $('.s123-module-testimonials.layout-1');
$sections.each(function( index ) {
var $s = $(this);
var $carousel = $s.find('[data-ride="carousel"]');
$carousel.carousel({
interval: isMobile.any() ? false : 7000
});
$carousel.find('.carousel-control.left').click(function() {
if ( $('html').attr('dir') == 'rtl' ) {
$carousel.carousel('next');
} else {
$carousel.carousel('prev');
}
});
$carousel.find('.carousel-control.right').click(function() {
if ( $('html').attr('dir') == 'rtl' ) {
$carousel.carousel('prev');
} else {
$carousel.carousel('next');
}
});
});
});
$( document ).on( "s123.page.load", function( event ) {
var $sections = $('.s123-module-testimonials.layout-1');
$sections.each(function( index ) {
var $s = $(this);
var $carousel = $s.find('[data-ride="carousel"]');
/**
* Set the Testimonials items height to the higher item height
* to prevent layout from jumping
*/
$carousel.find('.item').css({
minHeight: Math.max.apply(Math, $carousel.find('.item').map(function() { return $(this).outerHeight(); }))
});
});
});
}/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
!function(a){a.fn.appear=function(b,c){var d=a.extend({data:void 0,one:!0,accX:0,accY:0},c);return this.each(function(){var c=a(this);if(c.appeared=!1,!b)return void c.trigger("appear",d.data);var e=a(window),f=function(){if(!c.is(":visible"))return void(c.appeared=!1);var a=e.scrollLeft(),b=e.scrollTop(),f=c.offset(),g=f.left,h=f.top,i=d.accX,j=d.accY,k=c.height(),l=e.height(),m=c.width(),n=e.width();h+k+j>=b&&b+l+j>=h&&g+m+i>=a&&a+n+i>=g?c.appeared||c.trigger("appear",d.data):c.appeared=!1},g=function(){if(c.appeared=!0,d.one){e.unbind("scroll",f);var g=a.inArray(f,a.fn.appear.checks);g>=0&&a.fn.appear.checks.splice(g,1)}b.apply(this,arguments)};d.one?c.one("appear",d.data,g):c.bind("appear",d.data,g),e.scroll(f),a.fn.appear.checks.push(f),f()})},a.extend(a.fn.appear,{checks:[],timeout:null,checkAll:function(){var b=a.fn.appear.checks.length;if(b>0)for(;b--;)a.fn.appear.checks[b]()},run:function(){a.fn.appear.timeout&&clearTimeout(a.fn.appear.timeout),a.fn.appear.timeout=setTimeout(a.fn.appear.checkAll,20)}}),a.each(["append","prepend","after","before","attr","removeAttr","addClass","removeClass","toggleClass","remove","css","show","hide"],function(b,c){var d=a.fn[c];d&&(a.fn[c]=function(){var b=d.apply(this,arguments);return a.fn.appear.run(),b})})}(jQuery);!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),(null===this.settings||this._breakpoint!==d)&&(this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}}))},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.$element.is(":visible")?(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized"))):!1:!1},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.coordinates(this.settings.rtl?this.maximum():this.minimum()),c=this.coordinates(this.settings.rtl?this.minimum():this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return b>h-e&&h+e>b?d=a:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),-1===d},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(b,c){var e=this._items.length,f=c?0:this._clones.length;return!a.isNumeric(b)||1>e?b=d:(0>b||b>=e+f)&&(b=((b-f/2)%e+e)%e+f/2),b},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c=this.settings,d=this._coordinates.length,e=Math.abs(this._coordinates[d-1])-this._width,f=-1;if(c.loop)d=this._clones.length/2+this._items.length-1;else if(c.autoWidth||c.merge)for(;d-f>1;)Math.abs(this._coordinates[b=d+f>>1])<e?f=b:d=b;else d=c.center?this._items.length-1:this._items.length-c.items;return a&&(d-=this._clones.length/2),Math.max(d,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c=null;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)):c=this._coordinates[b-1]||0,c)},e.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(0>e),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&i>=d-e&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.leave("animating"),void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)},this)),this.reset(a.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,d=c.center&&Math.ceil(c.items/2)||c.items,e=c.center&&-1*d||0,f=(b.property&&b.property.value||this._core.current())+e,g=this._core.clones().length,h=a.proxy(function(a,b){this.load(b)},this);e++<d;)this.load(g/2+this._core.relative(f)),g&&a.each(this._core.clones(this._core.relative(f)),h),f++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c);heights=[],maxheight=0,a.each(d,function(b,c){heights.push(a(c).height())}),maxheight=Math.max.apply(null,heights),this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=a.attr("data-vimeo-id")?"vimeo":"youtube",d=a.attr("data-vimeo-id")||a.attr("data-youtube-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else{if(!(d[3].indexOf("vimeo")>-1))throw new Error("Video URL not supported.");c="vimeo"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="http://img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type&&a.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}))},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="http://www.youtube.com/embed/'+f.id+"?autoplay=1&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type&&(c='<iframe src="http://player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name&&(this._core.settings.autoplay?this.play():this.stop())},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){
this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(d,e){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._interval=b.setInterval(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout))},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearInterval(this._interval),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;e>a;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):0>b&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;d?a.proxy(this._overrides.to,this._core)(b,c):(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c))},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){return g[b]!==d?(e=c?b:!0,!1):void 0}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);(function(b){b.gritter={};b.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1000,time:6000};b.gritter.add=function(f){try{return a.add(f||{})}catch(d){var c="Gritter Error: "+d;(typeof(console)!="undefined"&&console.error)?console.error(c,f):alert(c)}};b.gritter.remove=function(d,c){a.removeSpecific(d,c||{})};b.gritter.removeAll=function(c){a.stop(c||{})};var a={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<a class="gritter-close" href="#" tabindex="1">Close Notification</a>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(g){if(typeof(g)=="string"){g={text:g}}if(g.text===null){throw'You must supply "text" parameter.'}if(!this._is_setup){this._runSetup()}var k=g.title,n=g.text,e=g.image||"",l=g.sticky||false,m=g.class_name||b.gritter.options.class_name,j=b.gritter.options.position,d=g.time||"";this._verifyWrapper();this._item_count++;var f=this._item_count,i=this._tpl_item;b(["before_open","after_open","before_close","after_close"]).each(function(p,q){a["_"+q+"_"+f]=(b.isFunction(g[q]))?g[q]:function(){}});this._custom_timer=0;if(d){this._custom_timer=d}var c=(e!="")?'<img src="'+e+'" class="gritter-image" />':"",h=(e!="")?"gritter-with-image":"gritter-without-image";if(k){k=this._str_replace("[[title]]",k,this._tpl_title)}else{k=""}i=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[k,n,this._tpl_close,c,this._item_count,h,m],i);if(this["_before_open_"+f]()===false){return false}b("#gritter-notice-wrapper").addClass(j).append(i);var o=b("#gritter-item-"+this._item_count);o.fadeIn(this.fade_in_speed,function(){a["_after_open_"+f](b(this))});if(!l){this._setFadeTimer(o,f)}b(o).bind("mouseenter mouseleave",function(p){if(p.type=="mouseenter"){if(!l){a._restoreItemIfFading(b(this),f)}}else{if(!l){a._setFadeTimer(b(this),f)}}a._hoverState(b(this),p.type)});b(o).find(".gritter-close").click(function(){a.removeSpecific(f,{},null,true);return false;});return f},_countRemoveWrapper:function(c,d,f){d.remove();this["_after_close_"+c](d,f);if(b(".gritter-item-wrapper").length==0){b("#gritter-notice-wrapper").remove()}},_fade:function(g,d,j,f){var j=j||{},i=(typeof(j.fade)!="undefined")?j.fade:true,c=j.speed||this.fade_out_speed,h=f;this["_before_close_"+d](g,h);if(f){g.unbind("mouseenter mouseleave")}if(i){g.animate({opacity:0},c,function(){g.animate({height:0},300,function(){a._countRemoveWrapper(d,g,h)})})}else{this._countRemoveWrapper(d,g)}},_hoverState:function(d,c){if(c=="mouseenter"){d.addClass("hover");d.find(".gritter-close").show()}else{d.removeClass("hover");d.find(".gritter-close").hide()}},removeSpecific:function(c,g,f,d){if(!f){var f=b("#gritter-item-"+c)}this._fade(f,c,g||{},d)},_restoreItemIfFading:function(d,c){clearTimeout(this["_int_id_"+c]);d.stop().css({opacity:"",height:""})},_runSetup:function(){for(opt in b.gritter.options){this[opt]=b.gritter.options[opt]}this._is_setup=1},_setFadeTimer:function(f,d){var c=(this._custom_timer)?this._custom_timer:this.time;this["_int_id_"+d]=setTimeout(function(){a._fade(f,d)},c)},stop:function(e){var c=(b.isFunction(e.before_close))?e.before_close:function(){};var f=(b.isFunction(e.after_close))?e.after_close:function(){};var d=b("#gritter-notice-wrapper");c(d);d.fadeOut(function(){b(this).remove();f()})},_str_replace:function(v,e,o,n){var k=0,h=0,t="",m="",g=0,q=0,l=[].concat(v),c=[].concat(e),u=o,d=c instanceof Array,p=u instanceof Array;u=[].concat(u);if(n){this.window[n]=0}for(k=0,g=u.length;k<g;k++){if(u[k]===""){continue}for(h=0,q=l.length;h<q;h++){t=u[k]+"";m=d?(c[h]!==undefined?c[h]:""):c[0];u[k]=(t).split(l[h]).join(m);if(n&&u[k]!==t){this.window[n]+=(t.length-u[k].length)/l[h].length}}}return p?u:u[0]},_verifyWrapper:function(){if(b("#gritter-notice-wrapper").length==0){b("body").append(this._tpl_wrap)}}}})(jQuery);
/*!
Colorbox 1.6.4
license: MIT
http://www.jacklmoore.com/colorbox
*/
(function ($, document, window) {
var
defaults = {
html: false,
photo: false,
iframe: false,
inline: false,
transition: "elastic",
speed: 300,
fadeOut: 300,
width: false,
initialWidth: "600",
innerWidth: false,
maxWidth: false,
height: false,
initialHeight: "450",
innerHeight: false,
maxHeight: false,
scalePhotos: true,
scrolling: true,
opacity: 0.9,
preloading: true,
className: false,
overlayClose: true,
escKey: true,
arrowKey: true,
top: false,
bottom: false,
left: false,
right: false,
fixed: false,
data: undefined,
closeButton: true,
fastIframe: true,
open: false,
reposition: true,
loop: true,
slideshow: false,
slideshowAuto: true,
slideshowSpeed: 2500,
slideshowStart: "start slideshow",
slideshowStop: "stop slideshow",
photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
retinaImage: false,
retinaUrl: false,
retinaSuffix: '@2x.$1',
current: "image {current} of {total}",
previous: "previous",
next: "next",
close: "close",
xhrError: "This content failed to load.",
imgError: "This image failed to load.",
returnFocus: true,
trapFocus: true,
onOpen: false,
onLoad: false,
onComplete: false,
onCleanup: false,
onClosed: false,
rel: function() {
return this.rel;
},
href: function() {
return $(this).attr('href');
},
title: function() {
return this.title;
},
createImg: function() {
var img = new Image();
var attrs = $(this).data('cbox-img-attrs');
if (typeof attrs === 'object') {
$.each(attrs, function(key, val){
img[key] = val;
});
}
return img;
},
createIframe: function() {
var iframe = document.createElement('iframe');
var attrs = $(this).data('cbox-iframe-attrs');
if (typeof attrs === 'object') {
$.each(attrs, function(key, val){
iframe[key] = val;
});
}
if ('frameBorder' in iframe) {
iframe.frameBorder = 0;
}
if ('allowTransparency' in iframe) {
iframe.allowTransparency = "true";
}
iframe.name = (new Date()).getTime(); // give the iframe a unique name to prevent caching
iframe.allowFullscreen = true;
return iframe;
}
},
colorbox = 'colorbox',
prefix = 'cbox',
boxElement = prefix + 'Element',
event_open = prefix + '_open',
event_load = prefix + '_load',
event_complete = prefix + '_complete',
event_cleanup = prefix + '_cleanup',
event_closed = prefix + '_closed',
event_purge = prefix + '_purge',
$overlay,
$box,
$wrap,
$content,
$topBorder,
$leftBorder,
$rightBorder,
$bottomBorder,
$related,
$window,
$loaded,
$loadingBay,
$loadingOverlay,
$title,
$current,
$slideshow,
$next,
$prev,
$close,
$groupControls,
$events = $('<a/>'), // $({}) would be preferred, but there is an issue with jQuery 1.4.2
settings,
interfaceHeight,
interfaceWidth,
loadedHeight,
loadedWidth,
index,
photo,
open,
active,
closing,
loadingTimer,
publicMethod,
div = "div",
requests = 0,
previousCSS = {},
init;
function $tag(tag, id, css) {
var element = document.createElement(tag);
if (id) {
element.id = prefix + id;
}
if (css) {
element.style.cssText = css;
}
return $(element);
}
function winheight() {
return window.innerHeight ? window.innerHeight : $(window).height();
}
function Settings(element, options) {
if (options !== Object(options)) {
options = {};
}
this.cache = {};
this.el = element;
this.value = function(key) {
var dataAttr;
if (this.cache[key] === undefined) {
dataAttr = $(this.el).attr('data-cbox-'+key);
if (dataAttr !== undefined) {
this.cache[key] = dataAttr;
} else if (options[key] !== undefined) {
this.cache[key] = options[key];
} else if (defaults[key] !== undefined) {
this.cache[key] = defaults[key];
}
}
return this.cache[key];
};
this.get = function(key) {
var value = this.value(key);
return $.isFunction(value) ? value.call(this.el, this) : value;
};
}
function getIndex(increment) {
var
max = $related.length,
newIndex = (index + increment) % max;
return (newIndex < 0) ? max + newIndex : newIndex;
}
function setSize(size, dimension) {
return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
}
function isImage(settings, url) {
return settings.get('photo') || settings.get('photoRegex').test(url);
}
function retinaUrl(settings, url) {
return settings.get('retinaUrl') && window.devicePixelRatio > 1 ? url.replace(settings.get('photoRegex'), settings.get('retinaSuffix')) : url;
}
function trapFocus(e) {
if ('contains' in $box[0] && !$box[0].contains(e.target) && e.target !== $overlay[0]) {
e.stopPropagation();
$box.focus();
}
}
function setClass(str) {
if (setClass.str !== str) {
$box.add($overlay).removeClass(setClass.str).addClass(str);
setClass.str = str;
}
}
function getRelated(rel) {
index = 0;
if (rel && rel !== false && rel !== 'nofollow') {
$related = $('.' + boxElement).filter(function () {
var options = $.data(this, colorbox);
var settings = new Settings(this, options);
return (settings.get('rel') === rel);
});
index = $related.index(settings.el);
if (index === -1) {
$related = $related.add(settings.el);
index = $related.length - 1;
}
} else {
$related = $(settings.el);
}
}
function trigger(event) {
$(document).trigger(event);
$events.triggerHandler(event);
}
var slideshow = (function(){
var active,
className = prefix + "Slideshow_",
click = "click." + prefix,
timeOut;
function clear () {
clearTimeout(timeOut);
}
function set() {
if (settings.get('loop') || $related[index + 1]) {
clear();
timeOut = setTimeout(publicMethod.next, settings.get('slideshowSpeed'));
}
}
function start() {
$slideshow
.html(settings.get('slideshowStop'))
.unbind(click)
.one(click, stop);
$events
.bind(event_complete, set)
.bind(event_load, clear);
$box.removeClass(className + "off").addClass(className + "on");
}
function stop() {
clear();
$events
.unbind(event_complete, set)
.unbind(event_load, clear);
$slideshow
.html(settings.get('slideshowStart'))
.unbind(click)
.one(click, function () {
publicMethod.next();
start();
});
$box.removeClass(className + "on").addClass(className + "off");
}
function reset() {
active = false;
$slideshow.hide();
clear();
$events
.unbind(event_complete, set)
.unbind(event_load, clear);
$box.removeClass(className + "off " + className + "on");
}
return function(){
if (active) {
if (!settings.get('slideshow')) {
$events.unbind(event_cleanup, reset);
reset();
}
} else {
if (settings.get('slideshow') && $related[1]) {
active = true;
$events.one(event_cleanup, reset);
if (settings.get('slideshowAuto')) {
start();
} else {
stop();
}
$slideshow.show();
}
}
};
}());
function launch(element) {
var options;
if (!closing) {
options = $(element).data(colorbox);
settings = new Settings(element, options);
getRelated(settings.get('rel'));
if (!open) {
open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
setClass(settings.get('className'));
$box.css({visibility:'hidden', display:'block', opacity:''});
$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden; visibility:hidden');
$content.css({width:'', height:''}).append($loaded);
interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();
interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
loadedHeight = $loaded.outerHeight(true);
loadedWidth = $loaded.outerWidth(true);
var initialWidth = setSize(settings.get('initialWidth'), 'x');
var initialHeight = setSize(settings.get('initialHeight'), 'y');
var maxWidth = settings.get('maxWidth');
var maxHeight = settings.get('maxHeight');
settings.w = Math.max((maxWidth !== false ? Math.min(initialWidth, setSize(maxWidth, 'x')) : initialWidth) - loadedWidth - interfaceWidth, 0);
settings.h = Math.max((maxHeight !== false ? Math.min(initialHeight, setSize(maxHeight, 'y')) : initialHeight) - loadedHeight - interfaceHeight, 0);
$loaded.css({width:'', height:settings.h});
publicMethod.position();
trigger(event_open);
settings.get('onOpen');
$groupControls.add($title).hide();
$box.focus();
if (settings.get('trapFocus')) {
if (document.addEventListener) {
document.addEventListener('focus', trapFocus, true);
$events.one(event_closed, function () {
document.removeEventListener('focus', trapFocus, true);
});
}
}
if (settings.get('returnFocus')) {
$events.one(event_closed, function () {
$(settings.el).focus();
});
}
}
var opacity = parseFloat(settings.get('opacity'));
$overlay.css({
opacity: opacity === opacity ? opacity : '',
cursor: settings.get('overlayClose') ? 'pointer' : '',
visibility: 'visible'
}).show();
if (settings.get('closeButton')) {
$close.html(settings.get('close')).appendTo($content);
} else {
$close.appendTo('<div/>'); // replace with .detach() when dropping jQuery < 1.4
}
load();
}
}
function appendHTML() {
if (!$box) {
init = false;
$window = $(window);
$box = $tag(div).attr({
id: colorbox,
'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.
role: 'dialog',
tabindex: '-1'
}).hide();
$overlay = $tag(div, "Overlay").hide();
$loadingOverlay = $([$tag(div, "LoadingOverlay")[0],$tag(div, "LoadingGraphic")[0]]);
$wrap = $tag(div, "Wrapper");
$content = $tag(div, "Content").append(
$title = $tag(div, "Title"),
$current = $tag(div, "Current"),
$prev = $('<button type="button"/>').attr({id:prefix+'Previous'}),
$next = $('<button type="button"/>').attr({id:prefix+'Next'}),
$slideshow = $('<button type="button"/>').attr({id:prefix+'Slideshow'}),
$loadingOverlay
);
$close = $('<button type="button"/>').attr({id:prefix+'Close'});
$wrap.append( // The 3x3 Grid that makes up Colorbox
$tag(div).append(
$tag(div, "TopLeft"),
$topBorder = $tag(div, "TopCenter"),
$tag(div, "TopRight")
),
$tag(div, false, 'clear:left').append(
$leftBorder = $tag(div, "MiddleLeft"),
$content,
$rightBorder = $tag(div, "MiddleRight")
),
$tag(div, false, 'clear:left').append(
$tag(div, "BottomLeft"),
$bottomBorder = $tag(div, "BottomCenter"),
$tag(div, "BottomRight")
)
).find('div div').css({'float': 'left'});
$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');
$groupControls = $next.add($prev).add($current).add($slideshow);
}
if (document.body && !$box.parent().length) {
$(document.body).append($overlay, $box.append($wrap, $loadingBay));
}
}
function addBindings() {
function clickHandler(e) {
if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
e.preventDefault();
launch(this);
}
}
if ($box) {
if (!init) {
init = true;
$next.click(function () {
publicMethod.next();
});
$prev.click(function () {
publicMethod.prev();
});
$close.click(function () {
publicMethod.close();
});
$overlay.click(function () {
if (settings.get('overlayClose')) {
publicMethod.close();
}
});
$(document).bind('keydown.' + prefix, function (e) {
var key = e.keyCode;
if (open && settings.get('escKey') && key === 27) {
e.preventDefault();
publicMethod.close();
}
if (open && settings.get('arrowKey') && $related[1] && !e.altKey) {
if (key === 37) {
e.preventDefault();
$prev.click();
} else if (key === 39) {
e.preventDefault();
$next.click();
}
}
});
if ($.isFunction($.fn.on)) {
$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
} else {
$('.'+boxElement).live('click.'+prefix, clickHandler);
}
}
return true;
}
return false;
}
if ($[colorbox]) {
return;
}
$(appendHTML);
publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
var settings;
var $obj = this;
options = options || {};
if ($.isFunction($obj)) { // assume a call to $.colorbox
$obj = $('<a/>');
options.open = true;
}
if (!$obj[0]) { // colorbox being applied to empty collection
return $obj;
}
appendHTML();
if (addBindings()) {
if (callback) {
options.onComplete = callback;
}
$obj.each(function () {
var old = $.data(this, colorbox) || {};
$.data(this, colorbox, $.extend(old, options));
}).addClass(boxElement);
settings = new Settings($obj[0], options);
if (settings.get('open')) {
launch($obj[0]);
}
}
return $obj;
};
publicMethod.position = function (speed, loadedCallback) {
var
css,
top = 0,
left = 0,
offset = $box.offset(),
scrollTop,
scrollLeft;
$window.unbind('resize.' + prefix);
$box.css({top: -9e4, left: -9e4});
scrollTop = $window.scrollTop();
scrollLeft = $window.scrollLeft();
if (settings.get('fixed')) {
offset.top -= scrollTop;
offset.left -= scrollLeft;
$box.css({position: 'fixed'});
} else {
top = scrollTop;
left = scrollLeft;
$box.css({position: 'absolute'});
}
if (settings.get('right') !== false) {
left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.get('right'), 'x'), 0);
} else if (settings.get('left') !== false) {
left += setSize(settings.get('left'), 'x');
} else {
left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
}
if (settings.get('bottom') !== false) {
top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.get('bottom'), 'y'), 0);
} else if (settings.get('top') !== false) {
top += setSize(settings.get('top'), 'y');
} else {
top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
}
$box.css({top: offset.top, left: offset.left, visibility:'visible'});
$wrap[0].style.width = $wrap[0].style.height = "9999px";
function modalDimensions() {
$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width,10) - interfaceWidth)+'px';
$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height,10) - interfaceHeight)+'px';
}
css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};
if (speed) {
var tempSpeed = 0;
$.each(css, function(i){
if (css[i] !== previousCSS[i]) {
tempSpeed = speed;
return;
}
});
speed = tempSpeed;
}
previousCSS = css;
if (!speed) {
$box.css(css);
}
$box.dequeue().animate(css, {
duration: speed || 0,
complete: function () {
modalDimensions();
active = false;
$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
if (settings.get('reposition')) {
setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
$window.bind('resize.' + prefix, publicMethod.position);
}, 1);
}
if ($.isFunction(loadedCallback)) {
loadedCallback();
}
},
step: modalDimensions
});
};
publicMethod.resize = function (options) {
var scrolltop;
if (open) {
options = options || {};
if (options.width) {
settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
}
if (options.innerWidth) {
settings.w = setSize(options.innerWidth, 'x');
}
$loaded.css({width: settings.w});
if (options.height) {
settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
}
if (options.innerHeight) {
settings.h = setSize(options.innerHeight, 'y');
}
if (!options.innerHeight && !options.height) {
scrolltop = $loaded.scrollTop();
$loaded.css({height: "auto"});
settings.h = $loaded.height();
}
$loaded.css({height: settings.h});
if(scrolltop) {
$loaded.scrollTop(scrolltop);
}
publicMethod.position(settings.get('transition') === "none" ? 0 : settings.get('speed'));
}
};
publicMethod.prep = function (object) {
if (!open) {
return;
}
var callback, speed = settings.get('transition') === "none" ? 0 : settings.get('speed');
$loaded.remove();
$loaded = $tag(div, 'LoadedContent').append(object);
function getWidth() {
settings.w = settings.w || $loaded.width();
settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
return settings.w;
}
function getHeight() {
settings.h = settings.h || $loaded.height();
settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
return settings.h;
}
$loaded.hide()
.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
.css({width: getWidth(), overflow: settings.get('scrolling') ? 'auto' : 'hidden'})
.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
.prependTo($content);
$loadingBay.hide();
$(photo).css({'float': 'none'});
setClass(settings.get('className'));
callback = function () {
var total = $related.length,
iframe,
complete;
if (!open) {
return;
}
function removeFilter() { // Needed for IE8 in versions of jQuery prior to 1.7.2
if ($.support.opacity === false) {
$box[0].style.removeAttribute('filter');
}
}
complete = function () {
clearTimeout(loadingTimer);
$loadingOverlay.hide();
trigger(event_complete);
settings.get('onComplete');
};
$title.html(settings.get('title')).show();
$loaded.show();
if (total > 1) { // handle grouping
if (typeof settings.get('current') === "string") {
$current.html(settings.get('current').replace('{current}', index + 1).replace('{total}', total)).show();
}
$next[(settings.get('loop') || index < total - 1) ? "show" : "hide"]().html(settings.get('next'));
$prev[(settings.get('loop') || index) ? "show" : "hide"]().html(settings.get('previous'));
slideshow();
if (settings.get('preloading')) {
$.each([getIndex(-1), getIndex(1)], function(){
var img,
i = $related[this],
settings = new Settings(i, $.data(i, colorbox)),
src = settings.get('href');
if (src && isImage(settings, src)) {
src = retinaUrl(settings, src);
img = document.createElement('img');
img.src = src;
}
});
}
} else {
$groupControls.hide();
}
if (settings.get('iframe')) {
iframe = settings.get('createIframe');
if (!settings.get('scrolling')) {
iframe.scrolling = "no";
}
$(iframe)
.attr({
src: settings.get('href'),
'class': prefix + 'Iframe'
})
.one('load', complete)
.appendTo($loaded);
$events.one(event_purge, function () {
iframe.src = "//about:blank";
});
if (settings.get('fastIframe')) {
$(iframe).trigger('load');
}
} else {
complete();
}
if (settings.get('transition') === 'fade') {
$box.fadeTo(speed, 1, removeFilter);
} else {
removeFilter();
}
};
if (settings.get('transition') === 'fade') {
$box.fadeTo(speed, 0, function () {
publicMethod.position(0, callback);
});
} else {
publicMethod.position(speed, callback);
}
};
function load () {
var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;
active = true;
photo = false;
trigger(event_purge);
trigger(event_load);
settings.get('onLoad');
settings.h = settings.get('height') ?
setSize(settings.get('height'), 'y') - loadedHeight - interfaceHeight :
settings.get('innerHeight') && setSize(settings.get('innerHeight'), 'y');
settings.w = settings.get('width') ?
setSize(settings.get('width'), 'x') - loadedWidth - interfaceWidth :
settings.get('innerWidth') && setSize(settings.get('innerWidth'), 'x');
settings.mw = settings.w;
settings.mh = settings.h;
if (settings.get('maxWidth')) {
settings.mw = setSize(settings.get('maxWidth'), 'x') - loadedWidth - interfaceWidth;
settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
}
if (settings.get('maxHeight')) {
settings.mh = setSize(settings.get('maxHeight'), 'y') - loadedHeight - interfaceHeight;
settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
}
href = settings.get('href');
loadingTimer = setTimeout(function () {
$loadingOverlay.show();
}, 100);
if (settings.get('inline')) {
var $target = $(href).eq(0);
$inline = $('<div>').hide().insertBefore($target);
$events.one(event_purge, function () {
$inline.replaceWith($target);
});
prep($target);
} else if (settings.get('iframe')) {
prep(" ");
} else if (settings.get('html')) {
prep(settings.get('html'));
} else if (isImage(settings, href)) {
href = retinaUrl(settings, href);
photo = settings.get('createImg');
$(photo)
.addClass(prefix + 'Photo')
.bind('error.'+prefix,function () {
prep($tag(div, 'Error').html(settings.get('imgError')));
})
.one('load', function () {
if (request !== requests) {
return;
}
setTimeout(function(){
var percent;
if (settings.get('retinaImage') && window.devicePixelRatio > 1) {
photo.height = photo.height / window.devicePixelRatio;
photo.width = photo.width / window.devicePixelRatio;
}
if (settings.get('scalePhotos')) {
setResize = function () {
photo.height -= photo.height * percent;
photo.width -= photo.width * percent;
};
if (settings.mw && photo.width > settings.mw) {
percent = (photo.width - settings.mw) / photo.width;
setResize();
}
if (settings.mh && photo.height > settings.mh) {
percent = (photo.height - settings.mh) / photo.height;
setResize();
}
}
if (settings.h) {
photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';
}
if ($related[1] && (settings.get('loop') || $related[index + 1])) {
photo.style.cursor = 'pointer';
$(photo).bind('click.'+prefix, function () {
publicMethod.next();
});
}
photo.style.width = photo.width + 'px';
photo.style.height = photo.height + 'px';
prep(photo);
}, 1);
});
photo.src = href;
} else if (href) {
$loadingBay.load(href, settings.get('data'), function (data, status) {
if (request === requests) {
prep(status === 'error' ? $tag(div, 'Error').html(settings.get('xhrError')) : $(this).contents());
}
});
}
}
publicMethod.next = function () {
if (!active && $related[1] && (settings.get('loop') || $related[index + 1])) {
index = getIndex(1);
launch($related[index]);
}
};
publicMethod.prev = function () {
if (!active && $related[1] && (settings.get('loop') || index)) {
index = getIndex(-1);
launch($related[index]);
}
};
publicMethod.close = function () {
if (open && !closing) {
closing = true;
open = false;
trigger(event_cleanup);
settings.get('onCleanup');
$window.unbind('.' + prefix);
$overlay.fadeTo(settings.get('fadeOut') || 0, 0);
$box.stop().fadeTo(settings.get('fadeOut') || 0, 0, function () {
$box.hide();
$overlay.hide();
trigger(event_purge);
$loaded.remove();
setTimeout(function () {
closing = false;
trigger(event_closed);
settings.get('onClosed');
}, 1);
});
}
};
publicMethod.remove = function () {
if (!$box) { return; }
$box.stop();
$[colorbox].close();
$box.stop(false, true).remove();
$overlay.remove();
closing = false;
$box = null;
$('.' + boxElement)
.removeData(colorbox)
.removeClass(boxElement);
$(document).unbind('click.'+prefix).unbind('keydown.'+prefix);
};
publicMethod.element = function () {
return $(settings.el);
};
publicMethod.settings = defaults;
}(jQuery, document, window));/*!
* jQuery Validation Plugin v1.14.0
*
* http://jqueryvalidation.org/
*
* Copyright (c) 2015 Jörn Zaefferer
* Released under the MIT license
*/
(function( factory ) {
if ( typeof define === "function" && define.amd ) {
define( ["jquery"], factory );
} else {
factory( jQuery );
}
}(function( $ ) {
$.extend($.fn, {
validate: function( options ) {
if ( !this.length ) {
if ( options && options.debug && window.console ) {
console.warn( "Nothing selected, can't validate, returning nothing." );
}
return;
}
var validator = $.data( this[ 0 ], "validator" );
if ( validator ) {
return validator;
}
this.attr( "novalidate", "novalidate" );
validator = new $.validator( options, this[ 0 ] );
$.data( this[ 0 ], "validator", validator );
if ( validator.settings.onsubmit ) {
this.on( "click.validate", ":submit", function( event ) {
if ( validator.settings.submitHandler ) {
validator.submitButton = event.target;
}
if ( $( this ).hasClass( "cancel" ) ) {
validator.cancelSubmit = true;
}
if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
validator.cancelSubmit = true;
}
});
this.on( "submit.validate", function( event ) {
if ( validator.settings.debug ) {
event.preventDefault();
}
function handle() {
var hidden, result;
if ( validator.settings.submitHandler ) {
if ( validator.submitButton ) {
hidden = $( "<input type='hidden'/>" )
.attr( "name", validator.submitButton.name )
.val( $( validator.submitButton ).val() )
.appendTo( validator.currentForm );
}
result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
if ( validator.submitButton ) {
hidden.remove();
}
if ( result !== undefined ) {
return result;
}
return false;
}
return true;
}
if ( validator.cancelSubmit ) {
validator.cancelSubmit = false;
return handle();
}
if ( validator.form() ) {
if ( validator.pendingRequest ) {
validator.formSubmitted = true;
return false;
}
return handle();
} else {
validator.focusInvalid();
return false;
}
});
}
return validator;
},
valid: function() {
var valid, validator, errorList;
if ( $( this[ 0 ] ).is( "form" ) ) {
valid = this.validate().form();
} else {
errorList = [];
valid = true;
validator = $( this[ 0 ].form ).validate();
this.each( function() {
valid = validator.element( this ) && valid;
errorList = errorList.concat( validator.errorList );
});
validator.errorList = errorList;
}
return valid;
},
rules: function( command, argument ) {
var element = this[ 0 ],
settings, staticRules, existingRules, data, param, filtered;
if ( command ) {
settings = $.data( element.form, "validator" ).settings;
staticRules = settings.rules;
existingRules = $.validator.staticRules( element );
switch ( command ) {
case "add":
$.extend( existingRules, $.validator.normalizeRule( argument ) );
delete existingRules.messages;
staticRules[ element.name ] = existingRules;
if ( argument.messages ) {
settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
}
break;
case "remove":
if ( !argument ) {
delete staticRules[ element.name ];
return existingRules;
}
filtered = {};
$.each( argument.split( /\s/ ), function( index, method ) {
filtered[ method ] = existingRules[ method ];
delete existingRules[ method ];
if ( method === "required" ) {
$( element ).removeAttr( "aria-required" );
}
});
return filtered;
}
}
data = $.validator.normalizeRules(
$.extend(
{},
$.validator.classRules( element ),
$.validator.attributeRules( element ),
$.validator.dataRules( element ),
$.validator.staticRules( element )
), element );
if ( data.required ) {
param = data.required;
delete data.required;
data = $.extend( { required: param }, data );
$( element ).attr( "aria-required", "true" );
}
if ( data.remote ) {
param = data.remote;
delete data.remote;
data = $.extend( data, { remote: param });
}
return data;
}
});
$.extend( $.expr[ ":" ], {
blank: function( a ) {
return !$.trim( "" + $( a ).val() );
},
filled: function( a ) {
return !!$.trim( "" + $( a ).val() );
},
unchecked: function( a ) {
return !$( a ).prop( "checked" );
}
});
$.validator = function( options, form ) {
this.settings = $.extend( true, {}, $.validator.defaults, options );
this.currentForm = form;
this.init();
};
$.validator.format = function( source, params ) {
if ( arguments.length === 1 ) {
return function() {
var args = $.makeArray( arguments );
args.unshift( source );
return $.validator.format.apply( this, args );
};
}
if ( arguments.length > 2 && params.constructor !== Array  ) {
params = $.makeArray( arguments ).slice( 1 );
}
if ( params.constructor !== Array ) {
params = [ params ];
}
$.each( params, function( i, n ) {
source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
return n;
});
});
return source;
};
$.extend( $.validator, {
defaults: {
messages: {},
groups: {},
rules: {},
errorClass: "error",
validClass: "valid",
errorElement: "label",
focusCleanup: false,
focusInvalid: true,
errorContainer: $( [] ),
errorLabelContainer: $( [] ),
onsubmit: true,
ignore: ":hidden",
ignoreTitle: false,
onfocusin: function( element ) {
this.lastActive = element;
if ( this.settings.focusCleanup ) {
if ( this.settings.unhighlight ) {
this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
}
this.hideThese( this.errorsFor( element ) );
}
},
onfocusout: function( element ) {
if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
this.element( element );
}
},
onkeyup: function( element, event ) {
var excludedKeys = [
16, 17, 18, 20, 35, 36, 37,
38, 39, 40, 45, 144, 225
];
if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
return;
} else if ( element.name in this.submitted || element === this.lastElement ) {
this.element( element );
}
},
onclick: function( element ) {
if ( element.name in this.submitted ) {
this.element( element );
} else if ( element.parentNode.name in this.submitted ) {
this.element( element.parentNode );
}
},
highlight: function( element, errorClass, validClass ) {
if ( element.type === "radio" ) {
this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
} else {
$( element ).addClass( errorClass ).removeClass( validClass );
}
},
unhighlight: function( element, errorClass, validClass ) {
if ( element.type === "radio" ) {
this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
} else {
$( element ).removeClass( errorClass ).addClass( validClass );
}
}
},
setDefaults: function( settings ) {
$.extend( $.validator.defaults, settings );
},
messages: {
required: "This field is required.",
remote: "Please fix this field.",
email: "Please enter a valid email address.",
url: "Please enter a valid URL.",
date: "Please enter a valid date.",
dateISO: "Please enter a valid date ( ISO ).",
number: "Please enter a valid number.",
digits: "Please enter only digits.",
creditcard: "Please enter a valid credit card number.",
equalTo: "Please enter the same value again.",
maxlength: $.validator.format( "Please enter no more than {0} characters." ),
minlength: $.validator.format( "Please enter at least {0} characters." ),
rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
range: $.validator.format( "Please enter a value between {0} and {1}." ),
max: $.validator.format( "Please enter a value less than or equal to {0}." ),
min: $.validator.format( "Please enter a value greater than or equal to {0}." )
},
autoCreateRanges: false,
prototype: {
init: function() {
this.labelContainer = $( this.settings.errorLabelContainer );
this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
this.submitted = {};
this.valueCache = {};
this.pendingRequest = 0;
this.pending = {};
this.invalid = {};
this.reset();
var groups = ( this.groups = {} ),
rules;
$.each( this.settings.groups, function( key, value ) {
if ( typeof value === "string" ) {
value = value.split( /\s/ );
}
$.each( value, function( index, name ) {
groups[ name ] = key;
});
});
rules = this.settings.rules;
$.each( rules, function( key, value ) {
rules[ key ] = $.validator.normalizeRule( value );
});
function delegate( event ) {
var validator = $.data( this.form, "validator" ),
eventType = "on" + event.type.replace( /^validate/, "" ),
settings = validator.settings;
if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
settings[ eventType ].call( validator, this, event );
}
}
$( this.currentForm )
.on( "focusin.validate focusout.validate keyup.validate",
":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
"[type='radio'], [type='checkbox']", delegate)
.on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);
if ( this.settings.invalidHandler ) {
$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
}
$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
},
form: function() {
this.checkForm();
$.extend( this.submitted, this.errorMap );
this.invalid = $.extend({}, this.errorMap );
if ( !this.valid() ) {
$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
}
this.showErrors();
return this.valid();
},
checkForm: function() {
this.prepareForm();
for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
this.check( elements[ i ] );
}
return this.valid();
},
element: function( element ) {
var cleanElement = this.clean( element ),
checkElement = this.validationTargetFor( cleanElement ),
result = true;
this.lastElement = checkElement;
if ( checkElement === undefined ) {
delete this.invalid[ cleanElement.name ];
} else {
this.prepareElement( checkElement );
this.currentElements = $( checkElement );
result = this.check( checkElement ) !== false;
if ( result ) {
delete this.invalid[ checkElement.name ];
} else {
this.invalid[ checkElement.name ] = true;
}
}
$( element ).attr( "aria-invalid", !result );
if ( !this.numberOfInvalids() ) {
this.toHide = this.toHide.add( this.containers );
}
this.showErrors();
return result;
},
showErrors: function( errors ) {
if ( errors ) {
$.extend( this.errorMap, errors );
this.errorList = [];
for ( var name in errors ) {
this.errorList.push({
message: errors[ name ],
element: this.findByName( name )[ 0 ]
});
}
this.successList = $.grep( this.successList, function( element ) {
return !( element.name in errors );
});
}
if ( this.settings.showErrors ) {
this.settings.showErrors.call( this, this.errorMap, this.errorList );
} else {
this.defaultShowErrors();
}
},
resetForm: function() {
if ( $.fn.resetForm ) {
$( this.currentForm ).resetForm();
}
this.submitted = {};
this.lastElement = null;
this.prepareForm();
this.hideErrors();
var i, elements = this.elements()
.removeData( "previousValue" )
.removeAttr( "aria-invalid" );
if ( this.settings.unhighlight ) {
for ( i = 0; elements[ i ]; i++ ) {
this.settings.unhighlight.call( this, elements[ i ],
this.settings.errorClass, "" );
}
} else {
elements.removeClass( this.settings.errorClass );
}
},
numberOfInvalids: function() {
return this.objectLength( this.invalid );
},
objectLength: function( obj ) {
/* jshint unused: false */
var count = 0,
i;
for ( i in obj ) {
count++;
}
return count;
},
hideErrors: function() {
this.hideThese( this.toHide );
},
hideThese: function( errors ) {
errors.not( this.containers ).text( "" );
this.addWrapper( errors ).hide();
},
valid: function() {
return this.size() === 0;
},
size: function() {
return this.errorList.length;
},
focusInvalid: function() {
if ( this.settings.focusInvalid ) {
try {
$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
.filter( ":visible" )
.focus()
.trigger( "focusin" );
} catch ( e ) {
}
}
},
findLastActive: function() {
var lastActive = this.lastActive;
return lastActive && $.grep( this.errorList, function( n ) {
return n.element.name === lastActive.name;
}).length === 1 && lastActive;
},
elements: function() {
var validator = this,
rulesCache = {};
return $( this.currentForm )
.find( "input, select, textarea" )
.not( ":submit, :reset, :image, :disabled" )
.not( this.settings.ignore )
.filter( function() {
if ( !this.name && validator.settings.debug && window.console ) {
console.error( "%o has no name assigned", this );
}
if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
return false;
}
rulesCache[ this.name ] = true;
return true;
});
},
clean: function( selector ) {
return $( selector )[ 0 ];
},
errors: function() {
var errorClass = this.settings.errorClass.split( " " ).join( "." );
return $( this.settings.errorElement + "." + errorClass, this.errorContext );
},
reset: function() {
this.successList = [];
this.errorList = [];
this.errorMap = {};
this.toShow = $( [] );
this.toHide = $( [] );
this.currentElements = $( [] );
},
prepareForm: function() {
this.reset();
this.toHide = this.errors().add( this.containers );
},
prepareElement: function( element ) {
this.reset();
this.toHide = this.errorsFor( element );
},
elementValue: function( element ) {
var val,
$element = $( element ),
type = element.type;
if ( type === "radio" || type === "checkbox" ) {
return this.findByName( element.name ).filter(":checked").val();
} else if ( type === "number" && typeof element.validity !== "undefined" ) {
return element.validity.badInput ? false : $element.val();
}
val = $element.val();
if ( typeof val === "string" ) {
return val.replace(/\r/g, "" );
}
return val;
},
check: function( element ) {
element = this.validationTargetFor( this.clean( element ) );
var rules = $( element ).rules(),
rulesCount = $.map( rules, function( n, i ) {
return i;
}).length,
dependencyMismatch = false,
val = this.elementValue( element ),
result, method, rule;
for ( method in rules ) {
rule = { method: method, parameters: rules[ method ] };
try {
result = $.validator.methods[ method ].call( this, val, element, rule.parameters );
if ( result === "dependency-mismatch" && rulesCount === 1 ) {
dependencyMismatch = true;
continue;
}
dependencyMismatch = false;
if ( result === "pending" ) {
this.toHide = this.toHide.not( this.errorsFor( element ) );
return;
}
if ( !result ) {
this.formatAndAdd( element, rule );
return false;
}
} catch ( e ) {
if ( this.settings.debug && window.console ) {
console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
}
if ( e instanceof TypeError ) {
e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
}
throw e;
}
}
if ( dependencyMismatch ) {
return;
}
if ( this.objectLength( rules ) ) {
this.successList.push( element );
}
return true;
},
customDataMessage: function( element, method ) {
return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
},
customMessage: function( name, method ) {
var m = this.settings.messages[ name ];
return m && ( m.constructor === String ? m : m[ method ]);
},
findDefined: function() {
for ( var i = 0; i < arguments.length; i++) {
if ( arguments[ i ] !== undefined ) {
return arguments[ i ];
}
}
return undefined;
},
defaultMessage: function( element, method ) {
return this.findDefined(
this.customMessage( element.name, method ),
this.customDataMessage( element, method ),
!this.settings.ignoreTitle && element.title || undefined,
$.validator.messages[ method ],
"<strong>Warning: No message defined for " + element.name + "</strong>"
);
},
formatAndAdd: function( element, rule ) {
var message = this.defaultMessage( element, rule.method ),
theregex = /\$?\{(\d+)\}/g;
if ( typeof message === "function" ) {
message = message.call( this, rule.parameters, element );
} else if ( theregex.test( message ) ) {
message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
}
this.errorList.push({
message: message,
element: element,
method: rule.method
});
this.errorMap[ element.name ] = message;
this.submitted[ element.name ] = message;
},
addWrapper: function( toToggle ) {
if ( this.settings.wrapper ) {
toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
}
return toToggle;
},
defaultShowErrors: function() {
var i, elements, error;
for ( i = 0; this.errorList[ i ]; i++ ) {
error = this.errorList[ i ];
if ( this.settings.highlight ) {
this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
}
this.showLabel( error.element, error.message );
}
if ( this.errorList.length ) {
this.toShow = this.toShow.add( this.containers );
}
if ( this.settings.success ) {
for ( i = 0; this.successList[ i ]; i++ ) {
this.showLabel( this.successList[ i ] );
}
}
if ( this.settings.unhighlight ) {
for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
}
}
this.toHide = this.toHide.not( this.toShow );
this.hideErrors();
this.addWrapper( this.toShow ).show();
},
validElements: function() {
return this.currentElements.not( this.invalidElements() );
},
invalidElements: function() {
return $( this.errorList ).map(function() {
return this.element;
});
},
showLabel: function( element, message ) {
var place, group, errorID,
error = this.errorsFor( element ),
elementID = this.idOrName( element ),
describedBy = $( element ).attr( "aria-describedby" );
if ( error.length ) {
error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
error.html( message );
} else {
error = $( "<" + this.settings.errorElement + ">" )
.attr( "id", elementID + "-error" )
.addClass( this.settings.errorClass )
.html( message || "" );
place = error;
if ( this.settings.wrapper ) {
place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
}
if ( this.labelContainer.length ) {
this.labelContainer.append( place );
} else if ( this.settings.errorPlacement ) {
this.settings.errorPlacement( place, $( element ) );
} else {
place.insertAfter( element );
}
if ( error.is( "label" ) ) {
error.attr( "for", elementID );
} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
errorID = error.attr( "id" ).replace( /(:|\.|\[|\]|\$)/g, "\\$1");
if ( !describedBy ) {
describedBy = errorID;
} else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
describedBy += " " + errorID;
}
$( element ).attr( "aria-describedby", describedBy );
group = this.groups[ element.name ];
if ( group ) {
$.each( this.groups, function( name, testgroup ) {
if ( testgroup === group ) {
$( "[name='" + name + "']", this.currentForm )
.attr( "aria-describedby", error.attr( "id" ) );
}
});
}
}
}
if ( !message && this.settings.success ) {
error.text( "" );
if ( typeof this.settings.success === "string" ) {
error.addClass( this.settings.success );
} else {
this.settings.success( error, element );
}
}
this.toShow = this.toShow.add( error );
},
errorsFor: function( element ) {
var name = this.idOrName( element ),
describer = $( element ).attr( "aria-describedby" ),
selector = "label[for='" + name + "'], label[for='" + name + "'] *";
if ( describer ) {
selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
}
return this
.errors()
.filter( selector );
},
idOrName: function( element ) {
return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
},
validationTargetFor: function( element ) {
if ( this.checkable( element ) ) {
element = this.findByName( element.name );
}
return $( element ).not( this.settings.ignore )[ 0 ];
},
checkable: function( element ) {
return ( /radio|checkbox/i ).test( element.type );
},
findByName: function( name ) {
return $( this.currentForm ).find( "[name='" + name + "']" );
},
getLength: function( value, element ) {
switch ( element.nodeName.toLowerCase() ) {
case "select":
return $( "option:selected", element ).length;
case "input":
if ( this.checkable( element ) ) {
return this.findByName( element.name ).filter( ":checked" ).length;
}
}
return value.length;
},
depend: function( param, element ) {
return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
},
dependTypes: {
"boolean": function( param ) {
return param;
},
"string": function( param, element ) {
return !!$( param, element.form ).length;
},
"function": function( param, element ) {
return param( element );
}
},
optional: function( element ) {
var val = this.elementValue( element );
return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
},
startRequest: function( element ) {
if ( !this.pending[ element.name ] ) {
this.pendingRequest++;
this.pending[ element.name ] = true;
}
},
stopRequest: function( element, valid ) {
this.pendingRequest--;
if ( this.pendingRequest < 0 ) {
this.pendingRequest = 0;
}
delete this.pending[ element.name ];
if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
$( this.currentForm ).submit();
this.formSubmitted = false;
} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
this.formSubmitted = false;
}
},
previousValue: function( element ) {
return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
old: null,
valid: true,
message: this.defaultMessage( element, "remote" )
});
},
destroy: function() {
this.resetForm();
$( this.currentForm )
.off( ".validate" )
.removeData( "validator" );
}
},
classRuleSettings: {
required: { required: true },
email: { email: true },
url: { url: true },
date: { date: true },
dateISO: { dateISO: true },
number: { number: true },
digits: { digits: true },
creditcard: { creditcard: true }
},
addClassRules: function( className, rules ) {
if ( className.constructor === String ) {
this.classRuleSettings[ className ] = rules;
} else {
$.extend( this.classRuleSettings, className );
}
},
classRules: function( element ) {
var rules = {},
classes = $( element ).attr( "class" );
if ( classes ) {
$.each( classes.split( " " ), function() {
if ( this in $.validator.classRuleSettings ) {
$.extend( rules, $.validator.classRuleSettings[ this ]);
}
});
}
return rules;
},
normalizeAttributeRule: function( rules, type, method, value ) {
if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
value = Number( value );
if ( isNaN( value ) ) {
value = undefined;
}
}
if ( value || value === 0 ) {
rules[ method ] = value;
} else if ( type === method && type !== "range" ) {
rules[ method ] = true;
}
},
attributeRules: function( element ) {
var rules = {},
$element = $( element ),
type = element.getAttribute( "type" ),
method, value;
for ( method in $.validator.methods ) {
if ( method === "required" ) {
value = element.getAttribute( method );
if ( value === "" ) {
value = true;
}
value = !!value;
} else {
value = $element.attr( method );
}
this.normalizeAttributeRule( rules, type, method, value );
}
if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
delete rules.maxlength;
}
return rules;
},
dataRules: function( element ) {
var rules = {},
$element = $( element ),
type = element.getAttribute( "type" ),
method, value;
for ( method in $.validator.methods ) {
value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
this.normalizeAttributeRule( rules, type, method, value );
}
return rules;
},
staticRules: function( element ) {
var rules = {},
validator = $.data( element.form, "validator" );
if ( validator.settings.rules ) {
rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
}
return rules;
},
normalizeRules: function( rules, element ) {
$.each( rules, function( prop, val ) {
if ( val === false ) {
delete rules[ prop ];
return;
}
if ( val.param || val.depends ) {
var keepRule = true;
switch ( typeof val.depends ) {
case "string":
keepRule = !!$( val.depends, element.form ).length;
break;
case "function":
keepRule = val.depends.call( element, element );
break;
}
if ( keepRule ) {
rules[ prop ] = val.param !== undefined ? val.param : true;
} else {
delete rules[ prop ];
}
}
});
$.each( rules, function( rule, parameter ) {
rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
});
$.each([ "minlength", "maxlength" ], function() {
if ( rules[ this ] ) {
rules[ this ] = Number( rules[ this ] );
}
});
$.each([ "rangelength", "range" ], function() {
var parts;
if ( rules[ this ] ) {
if ( $.isArray( rules[ this ] ) ) {
rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
} else if ( typeof rules[ this ] === "string" ) {
parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
}
}
});
if ( $.validator.autoCreateRanges ) {
if ( rules.min != null && rules.max != null ) {
rules.range = [ rules.min, rules.max ];
delete rules.min;
delete rules.max;
}
if ( rules.minlength != null && rules.maxlength != null ) {
rules.rangelength = [ rules.minlength, rules.maxlength ];
delete rules.minlength;
delete rules.maxlength;
}
}
return rules;
},
normalizeRule: function( data ) {
if ( typeof data === "string" ) {
var transformed = {};
$.each( data.split( /\s/ ), function() {
transformed[ this ] = true;
});
data = transformed;
}
return data;
},
addMethod: function( name, method, message ) {
$.validator.methods[ name ] = method;
$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
if ( method.length < 3 ) {
$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
}
},
methods: {
required: function( value, element, param ) {
if ( !this.depend( param, element ) ) {
return "dependency-mismatch";
}
if ( element.nodeName.toLowerCase() === "select" ) {
var val = $( element ).val();
return val && val.length > 0;
}
if ( this.checkable( element ) ) {
return this.getLength( value, element ) > 0;
}
return value.length > 0;
},
email: function( value, element ) {
return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
},
url: function( value, element ) {
return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
},
date: function( value, element ) {
return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
},
dateISO: function( value, element ) {
return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
},
number: function( value, element ) {
return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
},
digits: function( value, element ) {
return this.optional( element ) || /^\d+$/.test( value );
},
creditcard: function( value, element ) {
if ( this.optional( element ) ) {
return "dependency-mismatch";
}
if ( /[^0-9 \-]+/.test( value ) ) {
return false;
}
var nCheck = 0,
nDigit = 0,
bEven = false,
n, cDigit;
value = value.replace( /\D/g, "" );
if ( value.length < 13 || value.length > 19 ) {
return false;
}
for ( n = value.length - 1; n >= 0; n--) {
cDigit = value.charAt( n );
nDigit = parseInt( cDigit, 10 );
if ( bEven ) {
if ( ( nDigit *= 2 ) > 9 ) {
nDigit -= 9;
}
}
nCheck += nDigit;
bEven = !bEven;
}
return ( nCheck % 10 ) === 0;
},
minlength: function( value, element, param ) {
var length = $.isArray( value ) ? value.length : this.getLength( value, element );
return this.optional( element ) || length >= param;
},
maxlength: function( value, element, param ) {
var length = $.isArray( value ) ? value.length : this.getLength( value, element );
return this.optional( element ) || length <= param;
},
rangelength: function( value, element, param ) {
var length = $.isArray( value ) ? value.length : this.getLength( value, element );
return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
},
min: function( value, element, param ) {
return this.optional( element ) || value >= param;
},
max: function( value, element, param ) {
return this.optional( element ) || value <= param;
},
range: function( value, element, param ) {
return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
},
equalTo: function( value, element, param ) {
var target = $( param );
if ( this.settings.onfocusout ) {
target.off( ".validate-equalTo" ).on( "blur.validate-equalTo", function() {
$( element ).valid();
});
}
return value === target.val();
},
remote: function( value, element, param ) {
if ( this.optional( element ) ) {
return "dependency-mismatch";
}
var previous = this.previousValue( element ),
validator, data;
if (!this.settings.messages[ element.name ] ) {
this.settings.messages[ element.name ] = {};
}
previous.originalMessage = this.settings.messages[ element.name ].remote;
this.settings.messages[ element.name ].remote = previous.message;
param = typeof param === "string" && { url: param } || param;
if ( previous.old === value ) {
return previous.valid;
}
previous.old = value;
validator = this;
this.startRequest( element );
data = {};
data[ element.name ] = value;
$.ajax( $.extend( true, {
mode: "abort",
port: "validate" + element.name,
dataType: "json",
data: data,
context: validator.currentForm,
success: function( response ) {
var valid = response === true || response === "true",
errors, message, submitted;
validator.settings.messages[ element.name ].remote = previous.originalMessage;
if ( valid ) {
submitted = validator.formSubmitted;
validator.prepareElement( element );
validator.formSubmitted = submitted;
validator.successList.push( element );
delete validator.invalid[ element.name ];
validator.showErrors();
} else {
errors = {};
message = response || validator.defaultMessage( element, "remote" );
errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
validator.invalid[ element.name ] = true;
validator.showErrors( errors );
}
previous.valid = valid;
validator.stopRequest( element, valid );
}
}, param ) );
return "pending";
}
}
});
var pendingRequests = {},
ajax;
if ( $.ajaxPrefilter ) {
$.ajaxPrefilter(function( settings, _, xhr ) {
var port = settings.port;
if ( settings.mode === "abort" ) {
if ( pendingRequests[port] ) {
pendingRequests[port].abort();
}
pendingRequests[port] = xhr;
}
});
} else {
ajax = $.ajax;
$.ajax = function( settings ) {
var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
port = ( "port" in settings ? settings : $.ajaxSettings ).port;
if ( mode === "abort" ) {
if ( pendingRequests[port] ) {
pendingRequests[port].abort();
}
pendingRequests[port] = ajax.apply(this, arguments);
return pendingRequests[port];
}
return ajax.apply(this, arguments);
};
}
}));// Magnific Popup v1.0.1 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom+fastclick
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isIE7=b.indexOf("MSIE 7.")!==-1,n.isIE8=b.indexOf("MSIE 8.")!==-1,n.isLowIE=n.isIE7||n.isIE8,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(a,c){if(c===undefined||c===!1)return!0;e=a.split("_");if(e.length>1){var d=b.find(j+"-"+e[0]);if(d.length>0){var f=e[1];f==="replaceWith"?d[0]!==c[0]&&d.replaceWith(c):f==="img"?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(j+"-"+a).html(c)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H="ajax",I,J=function(){I&&a(document.body).removeClass(I)},K=function(){J(),n.req&&n.req.abort()};a.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(H),I=n.st.ajax.cursor,w(b+"."+H,K),w("BeforeChange."+H,K)},getAjax:function(b){I&&a(document.body).addClass(I),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};y("ParseAjax",f),n.appendContent(a(f.data),H),b.finished=!0,J(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var L,M=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){L&&clearInterval(L),L=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(L),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:M(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(L&&clearInterval(L),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var N,O=function(){return N===undefined&&(N=document.createElement("p").style.MozTransform!==undefined),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return O()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var P="iframe",Q="//about:blank",R=function(a){if(n.currTemplate[P]){var b=n.currTemplate[P].find("iframe");b.length&&(a||(b[0].src=Q),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(b+"."+P,function(){R()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var S=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery",e=Boolean(a.fn.mfpFastClick);n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=T(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?T(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),f=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m),g=e?"mfpFastClick":"click";d[g](function(){n.prev()}),f[g](function(){n.next()}),n.isIE7&&(x("b",d[0],!1,!0),x("a",d[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),n.container.append(d.add(f))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowLeft&&e&&n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=S(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=S(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=S(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=n.st.retina,b=a.ratio;b=isNaN(b)?b():b,b>1&&(w("ImageHasSize."+U,function(a,c){c.img.css({"max-width":c.img[0].naturalWidth/b,width:"100%"})}),w("ElementParse."+U,function(c,d){d.src=a.replaceSrc(d,b)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){r.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g=a(this),h;if(c){var i,j,k,l,m,n;g.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,r.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0];if(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)l=!0,d()}).on("touchend"+f,function(a){d();if(l||n>1)return;h=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){h=!1},b),e()})})}g.on("click"+f,function(){h||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&r.off("touchmove"+f+" touchend"+f)}}(),A()})/*! Lazy Load 2.0.0-beta.2 - MIT license - Copyright 2007-2017 Mika Tuupola */
!function(t,e){"object"==typeof exports?module.exports=e(t):"function"==typeof define&&define.amd?define([],e(t)):t.LazyLoad=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";function e(t,e){this.settings=r(s,e||{}),this.images=t||document.querySelectorAll(this.settings.selector),this.observer=null,this.init()}const s={src:"data-src",srcset:"data-srcset",selector:".lazyload"},r=function(){let t={},e=!1,s=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],s++);for(;s<o;s++)!function(s){for(let o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e&&"[object Object]"===Object.prototype.toString.call(s[o])?t[o]=r(!0,t[o],s[o]):t[o]=s[o])}(arguments[s]);return t};if(e.prototype={init:function(){if(!t.IntersectionObserver)return void this.loadImages();let e=this,s={root:null,rootMargin:"0px",threshold:[0]};this.observer=new IntersectionObserver(function(t){t.forEach(function(t){if(t.intersectionRatio>0){e.observer.unobserve(t.target);let s=t.target.getAttribute(e.settings.src),r=t.target.getAttribute(e.settings.srcset);"img"===t.target.tagName.toLowerCase()?(s&&(t.target.src=s),r&&(t.target.srcset=r)):t.target.style.backgroundImage="url("+s+")"}})},s),this.images.forEach(function(t){e.observer.observe(t)})},loadAndDestroy:function(){this.settings&&(this.loadImages(),this.destroy())},loadImages:function(){if(!this.settings)return;let t=this;this.images.forEach(function(e){let s=e.getAttribute(t.settings.src),r=e.getAttribute(t.settings.srcset);"img"===e.tagName.toLowerCase()?(s&&(e.src=s),r&&(e.srcset=r)):e.style.backgroundImage="url("+s+")"})},destroy:function(){this.settings&&(this.observer.disconnect(),this.settings=null)}},t.lazyload=function(t,s){return new e(t,s)},t.jQuery){const s=t.jQuery;s.fn.lazyload=function(t){return t=t||{},t.attribute=t.attribute||"data-src",new e(s.makeArray(this),t),this}}return e});
/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 * 
 * SITE123 Note - We edit this file, search for `SITE123` to see changes.
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position,
          opacity: this.opacity,   // SITE123 - Fix opacity when Parallax isn't active
          filter: this.filter   // SITE123 - Fix filter when Parallax isn't active
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position,
          opacity: this.opacity,   // SITE123 - Fix opacity when Parallax isn't active 
          filter: this.filter   // SITE123 - Fix filter when Parallax isn't active 
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo('body');

    // SITE123 - We add this to detect when the Parallax is active
    $('html').addClass('parallax-active');

    var slider = this.$element.find('>.parallax-slider');
    var sliderExisted = false;

    if (slider.length == 0)
      this.$slider = $('<img />').prependTo(this.$mirror);
    else {
      this.$slider = slider.prependTo(this.$mirror)
      sliderExisted = true;
    }

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      backgroundColor: this.backgroundcolor
    }).attr('id',this.idele);

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    //Add opacity to the image
    this.$slider.css('opacity',this.opacity);

    //Add filter to the image
    this.$slider.css('filter',this.filter);

    if (!sliderExisted)
      this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger('load');
    }

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    opacity:   1,
    filter:   '',
    backgroundcolor:   '#ffffff',
    idele:   '',
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 1; //We changed 2 to 1 so only the header will be fixed (without bottom)
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        this.visibility = 'visible';
        this.mirrorTop = this.boxOffsetTop  - scrollTop;
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        this.visibility = 'hidden';
      }

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window);

      var loadDimensions = function() {
        Parallax.winHeight = $win.height();
        Parallax.winWidth  = $win.width();
        Parallax.docHeight = $doc.height();
        Parallax.docWidth  = $doc.width();
      };

      var loadScrollPosition = function() {
        var winScrollTop  = $win.scrollTop();
        var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
        var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
        Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
        Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
        Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
      };

      $win.on('resize.px.parallax load.px.parallax', function() {
          loadDimensions();
          Parallax.isFresh = false;
          Parallax.requestRender();
        })
        .on('scroll.px.parallax load.px.parallax', function() {
          loadScrollPosition();
          Parallax.requestRender();
        });

      loadDimensions();
      loadScrollPosition();

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;

      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    },
    destroy: function(el){
      var i,
          parallaxElement = $(el).data('px.parallax');
      parallaxElement.$mirror.remove();
      for(i=0; i < this.sliders.length; i+=1){
        if(this.sliders[i] == parallaxElement){
          this.sliders.splice(i, 1);
        }
      }
      $(el).data('px.parallax', false);
      if(this.sliders.length === 0){
        $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
        this.isReady = false;
        Parallax.isSetup = false;
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      else if (typeof option == 'object')
      {
        $.extend($this.data('px.parallax'), options);
      }
      if (typeof option == 'string') {
        if(option == 'destroy'){
            Parallax['destroy'](this);
        }else{
          Parallax[option]();
        }
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
    $('[data-parallax="scroll"]').parallax();
  });

}(jQuery, window, document));
/*!
	Zoom 1.7.18
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);//Run when the page load (before images and other resource)
jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('.s123-module-restaurantReservation.layout-1');
$section.each(function( index ) {
var $sectionThis = $(this);
(function() {
googleMapPopUp.init({
locationData : $sectionThis.find('.mapPopupActivator')
});
})();
if ( $sectionThis.find(".restaurantWorkingDays").length == 0) return;
var rr = JSON.parse($sectionThis.find(".restaurantWorkingDays").val());
/**
* Check if the days are inactive
* If they are inactive hide the calendar and show the message
*/
var inActiveDays = 0;
$.each(rr.businessHours,function( index, dayOfWeek) {
if (!dayOfWeek.isActive) {
inActiveDays ++;
}
});
if (inActiveDays == 7 && rr.fullTime == '') {
$sectionThis.find('.note-container').removeClass('hidden');
$sectionThis.find('.calendar-container').addClass('hidden');
}
buisnessHoursTemplate.init({
$buisnessHourContainer : $sectionThis.find('.businessWorkingDays'),
buisnessHourJSON : $sectionThis.find(".restaurantWorkingDays")
});
/*
* Determinate if the business is active every day after 24:00
* if it is then move the hours after 24:00 to the next day and close the rest of the shifts
*/
if ( rr.fullTime.length == 0 ) {
$.each(rr.businessHours, function( index, day ) {
var startShift = 'startTime3';
var endShift = 'endTime3';
if ( day.startTime3 == '' || day.endTime3 == '') {
startShift = 'startTime2';
endShift = 'endTime2';
}
if ( day.startTime2 == '' || day.endTime2 == '') {
startShift = 'startTime1';
endShift = 'endTime1';
}
var startHour = parseInt(day[startShift].substring(0,2));
var startMin = day[startShift].substring(3,5);
var endHour = parseInt(day[endShift].substring(0,2));
var endMin = day[endShift].substring(3,5);
if ( endHour <= startHour ) {
rr.businessHours[index][endShift] = '23:59';
var dayIndex = (index+1);
if (index == 6) {
dayIndex = 0;
}
if ( endHour < 10) endHour = '0'+endHour.toString();
rr.businessHours[dayIndex].startTime0 = '00:'+ startMin;
rr.businessHours[dayIndex].endTime0 = endHour + ':' + endMin;
if ( !rr.businessHours[dayIndex].isActive ) {
rr.businessHours[dayIndex].isActive = true;
rr.businessHours[dayIndex].startTime1 = '';
rr.businessHours[dayIndex].endTime1 = '';
rr.businessHours[dayIndex].startTime2 = '';
rr.businessHours[dayIndex].endTime2 = '';
rr.businessHours[dayIndex].startTime3 = '';
rr.businessHours[dayIndex].endTime3 = '';
}
}
});
}
/*
* If the 24/7 is not active the determinate what days are active and if found that the day is not active then
* add to the string 'disabledDays'
*/
var disabledDays ="";
if (rr.fullTime == 'on') {
$.each(rr.businessHours,function( index, weekday ) {
weekday.isActive = true;
weekday.startTime1 ='00:00';
weekday.endTime1 ='24:00';
weekday.startTime2 ='';
weekday.endTime2 ='';
weekday.startTime3 ='';
weekday.endTime3 ='';
});
} else {
var total = rr.businessHours.length;
$.each(rr.businessHours, function( index ) {
if ( !rr.businessHours[index].isActive ) {
if (rr.firstDayOfWeek == '0') {
disabledDays += index;
} else {
disabledDays += (index + 1) % 7;
}
if ( index < ( total-1 ) ) {
disabledDays += ',';
}
}
});
}
var datePickerFormat = '';
if (rr.dateFormat == 'd/m/Y') {
datePickerFormat = 'dd/mm/yyyy';
} else {
datePickerFormat = 'mm/dd/yyyy';
}
var calendarStartTime = $sectionThis.find('.clientTimeByZone').val();
/*
* jQuery Datepicker Plugin Initial
* https://github.com/uxsolutions/bootstrap-datepicker
*/
var $datepicker = $sectionThis.find('.sandbox-container .input-group.date');
$datepicker.datepicker({
format: datePickerFormat,
weekStart: parseInt(rr.firstDayOfWeek),
todayBtn: "linked",
clearBtn: false,
language: "en",
startDate: new Date(calendarStartTime),
daysOfWeekDisabled: disabledDays,
todayHighlight: true,
orientation: 'bottom auto'
});
var $restaurantDatesContainer = $sectionThis.find('.restaurantDatesContainer');
var $restaurantTableHourContainer = $sectionThis.find('.restaurantTableHourContainer');
if ( $restaurantTableHourContainer.find('.table-hour').length == 0) {
$restaurantTableHourContainer.append('<select class="form-control table-hour" name="tableHour"></select><label class="hidden no-time-available">'+ translations.NoAvailableTime +'</label>');
}
var $tableHour = $restaurantTableHourContainer.find('.table-hour');
$datepicker.on('changeDate', function() {
var $this = $(this);
$datepicker.datepicker('hide');
$tableHour.empty();
buildHourSelect(rr, $this, $restaurantDatesContainer, $tableHour);
if ( $tableHour.text().length <=0 ) {
$tableHour.addClass('hidden');
$restaurantTableHourContainer.find('.no-time-available').removeClass('hidden');
$sectionThis.find('.makeOrder').attr('disabled',true);
} else {
$restaurantTableHourContainer.find('.no-time-available').addClass('hidden');
$tableHour.removeClass('hidden');
$sectionThis.find('.makeOrder').attr('disabled',false);
}
});
$datepicker.datepicker('setDates',new Date(calendarStartTime));
$datepicker.trigger('changeDate');
$sectionThis.find('.makeOrder').click(function() {
var $emailIcon 	= $(this);
var websiteID 	= $sectionThis.find('.websiteID').val();
var moduleID	= $sectionThis.find('.moduleID').val();
var w 			= $('#w').val();
var clientTime  = calendarStartTime.substring(0,10);
var autoConfirm = $sectionThis.find('.confirmationStyle').val();
var tableSize   = $sectionThis.find('.tableSize').val();
var tableHour 	= $sectionThis.find('.table-hour').val();
tableHour 		= changeTimeFormat(rr.timeFormat,tableHour);
var tableDate 	= $sectionThis.find('.restaurantDatesContainer input').val();
buildPopup('popupRestaurantReservations','',
buildRestaurantReservationForm(w,websiteID,moduleID,tableDate,tableSize,tableHour,clientTime,autoConfirm),'',true,false,true,'');
$('#popupRestaurantReservations').find('.restaurantReservationsFormPopup').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/restaurantReservationsO.php",
data: $form.serialize(),
success: function( data ) {
$form.trigger("reset");
$form.addClass("hidden");
$(".orderConfirmation").find(".orderId").text(JSON.parse(data).orderID);
$(".orderConfirmation").removeClass("hidden");
$form.next().find(".close-order-thank-you").on("click",function() {
buildPopup_CloseAction('popupRestaurantReservations');
$form.find(".tableSize,.table-hour").find("option:first-child").attr('selected','selected');
$sectionThis.find('.restaurantReservationsForm').get(0).reset();
$datepicker.datepicker('setDates',new Date(calendarStartTime));
$datepicker.trigger('changeDate');
});
if (autoConfirm == "1")
$form.next().find(".thankYouMessage").text(translations.ThankYouAuto+"!");
$form.find('button:submit').prop('disabled', false);
WizardNotificationUpdate();
}
});
return false;
}
});
});
});
});
});
});
function changeTimeFormat( websiteTimeFormat, time ) {
switch( websiteTimeFormat ) {
case 'H:i':
return moment(time,"hmm").format("HH:mm");
break;
case 'h:i A':
return moment(time,"hmm").format("hh:mm A");
break;
}
}
function changeDateFormat( websiteDateFormat, date ) {
switch( websiteDateFormat ) {
case 'YYYY-mm-DD m/d/Y':
return moment(date,"mm DD YYYY").format("YYYY-mm-DD");
break;
case 'YYYY-mm-DD d/m/Y':
return moment(date,"DD mm YYYY").format("YYYY-mm-DD");
break;
}
}
function buildHourSelect( rr, $this, $restaurantDatesContainer, $tableHour ) {
var dateValue = $this.find('input').val();
if ( !dateValue ) throw 'Missing date parameter';
dateValue = changeDateFormat( 'YYYY-mm-DD '+ rr.dateFormat, dateValue );
for( var i = 0 ; i <= 3 ; i++ ) {
/*
* addShift is a boolean variable that determinate if it's the second or third shift
* if it's the first shift then set it to false the rest should be on true this way
* the hours the function 'buildHourSelect' will add the new hours to the first shift
*/
var addShift = false;
if ( i > 1 ) {
addShift = true ;
}
var dayOfWeek = new Date(dateValue).getDay();
if ( dayOfWeek == 0) {
if ( parseInt(rr.firstDayOfWeek) == 1 ) {
var dataIndex = 6;
} else {
var dataIndex = dayOfWeek;
}
} else {
var dataIndex = dayOfWeek - parseInt(rr.firstDayOfWeek);
}
var startTime = 'startTime'+i;
var endTime = 'endTime'+i;
startTime = rr.businessHours[dataIndex][startTime];
endTime = rr.businessHours[dataIndex][endTime];
if (startTime == ''|| endTime == '' || !rr.businessHours[dataIndex].isActive)
continue;
var selectedDate = new Date(dateValue);
if ( getDateFormat(selectedDate) == getDateFormat(new Date()) && new Date().getTime() >= moment(dateValue+" "+startTime).valueOf()) {
startTime = moment(dateValue+" "+$restaurantDatesContainer.data('corrent-time')).valueOf();
} else {
startTime = moment(dateValue+" "+startTime).valueOf();
}
endTime = moment(dateValue+" "+endTime).valueOf();
for ( ;startTime < endTime ;  startTime += 900000 ) {
var newdate = new Date(startTime);
var newHour = newdate.getHours();
var newMinutes = newdate.getMinutes();
if (newHour.toString().length == 1 )
newHour = '0' + newHour;
if (newMinutes.toString().length == 1 )
newMinutes = '0' + newMinutes;
/*
* Prevent duplicated time because the customer can start second shift or third shift
* from the same time for example shift 1 is 08:00-12:00 and shift 2 from 12:00-16:00
* the 12:00 will be shown only 1 time
**/
var hourExists = false;
$.each($tableHour.find('option'),function(index) {
$optionVal = $(this).val();
if ($optionVal == newHour+':'+newMinutes) {
hourExists = true;
return false;
}
});
if (!hourExists)	$tableHour.append('<option value="'+newHour+':'+newMinutes+'">'+changeTimeFormat(rr.timeFormat,newHour+':'+newMinutes)+'</option>');
else continue;
}
}
}
function getDateFormat( DateChoosed ) {
var formattedDate = DateChoosed;
return formattedDate.getFullYear() +'-'+ (formattedDate.getMonth() + 1)  + '-'+ formattedDate.getDate();
}
function getAnotherDateFormat( DateChoosed ) {
var formattedDate = DateChoosed;
return (formattedDate.getMonth() + 1) +'/'+ formattedDate.getDate()+'/'+ formattedDate.getFullYear();
}
/**
* The function build the html of the order and order confirmation form
*
* @param {string} websiteID - Website ID.
* @param {string} moduleID - Module ID.
* @param {string} uniqueID - Unique item ID.
* @return {string} html - Html of the form.
*/
function buildRestaurantReservationForm( w, websiteID, moduleID, tableDate, tableSize, tableHour,clientTime, autoConfirm) {
var html = '';
html += '<form class="restaurantReservationsFormPopup">';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="restaurantFirstName" class="white">'+translations.firstName+'</label>';
html += '<input type="text" name="restaurantFirstName" placeholder="'+translations.firstName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="restaurantLastName" class="white">'+translations.lastName+'</label>';
html += '<input type="text" name="restaurantLastName" placeholder="'+translations.lastName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="restaurantPhone" class="white">'+translations.phone+'</label>';
html += '<input type="text" name="restaurantPhone" placeholder="'+translations.phone+'" class="form-control">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="restaurantEmail" class="white">'+translations.emailAddress+'</label>';
html += '<input type="text" name="restaurantEmail" placeholder="'+translations.emailAddress+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'" data-rule-email="true" data-msg-email="'+translations.jqueryValidMsgEmail+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-xs-12">';
html += '<div class="form-group">';
html += '<label for="restaurantSpecialRequest" class="white">'+translations.SpecialRequest+'</label>';
html += '<textarea class="form-control" name="restaurantSpecialRequest" placeholder="'+translations.SpecialRequest+'"></textarea>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<button type="submit" class="btn btn-primary btn-block">'+translations.send+'</button>';
html += '<input type="hidden" name="w" value="'+w+'">';
html += '<input type="hidden" name="websiteID" value="'+websiteID+'">';
html += '<input type="hidden" name="moduleID" value="'+moduleID+'">';
html += '<input type="hidden" name="tableDate" value="'+tableDate+'">';
html += '<input type="hidden" name="tableSize" value="'+tableSize+'">';
html += '<input type="hidden" name="tableHour" value="'+tableHour+'">';
html += '<input type="hidden" name="clientTime" value="'+clientTime+'">';
html += '<input type="hidden" name="autoConfirm" value="'+autoConfirm+'">';
html += '</form>';
html +='<div class="orderConfirmation hidden">';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12 col-md-offset-3">';
html += '<div class="form-group">';
html += '<label class="white thankYouMessage">'+translations.ThankYouManual+'!</label>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12 col-md-offset-3">';
html += '<div class="form-group">';
html += '<label class="white">'+translations.OrderNumber+':</label>&nbsp;';
html += '<label class="white orderId">No order</label>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-2 col-md-offset-3 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="tableDate" class="white">'+translations.Date+'</label><br>';
html += '<label for="tableDate" class="white">'+tableDate+'</label>';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-2 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="clientTime" class="white">'+translations.Hour+'</label><br>';
html += '<label for="tableHour" class="white">'+tableHour+'</label>';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-2 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="clientTime" class="white">'+translations.TableSize+'</label><br>';
html += '<label for="tableSize" class="white">'+tableSize+'</label>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12 col-md-offset-3">';
html += '<button type="button" class="btn btn-primary btn-block close-order-thank-you">'+translations.Ok+'</button>';
html += '</div>';
html += '</div>';
html += '</div>';
return html;
}jQuery(function($) {
BranchesModuleInitialize();
});
/**
* The function initialize the Branches Module.
*/
function BranchesModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-branches');
$section.each(function( index ) {
var $sectionThis = $(this);
if( $sectionThis.find(".coordinates").length > 0 ) {
var coordinates = JSON.parse($sectionThis.find(".coordinates").html());
} else {
coordinates = {};
}
var $branchtitle = $sectionThis.find('.title');
$.each($branchtitle, function( index, branchtitle) {
$(branchtitle).attr('href','https://maps.google.com/maps/place/' + coordinates[index].lat + ',' + coordinates[index].lng);
});
$sectionThis.find('.branch-phone-btn').click(function() {
var $this = $(this);
var $branchPhone = $this.closest('.branch-phone');
buildPopup('brancPopupFloatDivPhone','',$branchPhone.find('.branch-phone-popover').html(),'',true,true,true,'');
});
$sectionThis.find('.branch-fax-btn').click(function() {
var $this = $(this);
var $branchFax = $this.closest('.branch-fax');
buildPopup('brancPopupFloatDivFax','',$branchFax.find('.branch-fax-popover').html(),'',true,true,true,'');
});
$sectionThis.find('.google-map-obj').each( function( index ) {
var $this = $(this);
/**
* There is no option to get an exist instance of GMaps and
* every time its load it include some JS files. To prevent
* reinitialize of an exist object we set a custom flag.
*/
if ( !$this.data('gmapInit') ) {
var map = new GMaps({
div: '#'+$this.attr('id'),
lat: '',
lng: '',
scrollwheel: false,
draggable: isMobile.any() ? false : true
});
/**
* Set array that will contain the bounds info
* that Google maps need in order to display all of the markers.
*/
var bounds = [];
/*
*Create Loop that will add the markers by the coordinates from the JSON that is called "coordinates"
*and simultaneously convert the coordinates to Google "LatLng" object then push to the array bounds.
*/
for (var i = 0; i< coordinates.length; i++) {
map.addMarker({
lat: coordinates[i].lat,
lng: coordinates[i].lng
});
var latlng = new google.maps.LatLng(coordinates[i].lat, coordinates[i].lng);
bounds.push(latlng);
}
map.fitLatLngBounds(bounds);
$this.data('gmapInit',true);
}
});
$sectionThis.find('.send-mail').click(function() {
var $emailIcon = $(this);
var websiteID = $emailIcon.data('website-id');
var moduleID = $emailIcon.data('module-id');
var uniqueID = $emailIcon.data('unique-id');
var w = $('#w').val();
var branchInfo = {};
branchInfo.websiteID = websiteID;
branchInfo.moduleID = moduleID;
branchInfo.uniqueID = uniqueID;
branchInfo.w = w;
branchInfo.branchName = $emailIcon.data('branch-name');
branchInfo.branchEmail = getBranchemail(branchInfo.uniqueID , $emailIcon);
buildPopup('popupBranch','',buildBranchForm(branchInfo),'',true,false,true,'');
$('#popupBranch').find('.branchForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var $branchLoadingMessage = $('<div id="branchLoadingMessage">'+translations.loading+'</div>');
var bootboxDialog = bootbox.alert({
title: translations.sending,
message: $branchLoadingMessage,
className: 'branchConfirm, bootbox-branch-form',
backdrop: true
}).on("hidden.bs.modal", function() {
buildPopup_CloseAction('popupBranch');
});
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/branchO.php",
data: $form.serialize(),
success: function( data ) {
$form.trigger("reset");
message = '<span>'+translations.ThankYou+'</span>';
var $sentMessage = $(message);
bootboxDialog.find('.modal-title').html(translations.sent);
bootboxDialog.find('.bootbox-body').append($sentMessage.hide());
$branchLoadingMessage.hide();
$sentMessage.slideDown(200);
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
});
});
$.each($sectionThis.find('.branch'), function( index, branchContainer) {
buisnessHoursTemplate.init({
$buisnessHourContainer : $(branchContainer).find('.businessWorkingDays'),
buisnessHourJSON : $(branchContainer).find('.branchWorkingDays')
});
});
});
});
}
function getBranchemail( uniqueID , $emailIcon) {
var email = '';
$.each($emailIcon,function( index, emailIcon ) {
if($(emailIcon).data('unique-id') == uniqueID) {
email =  $(emailIcon).find('input').val();
}
});
return email;
}
/**
* The function build the html of the branch form
* @param {string} websiteID - Website ID.
* @param {string} moduleID - Module ID.
* @param {string} uniqueID - Unique item ID.
* @return {string} html - Html of the form.
*/
function buildBranchForm( branchInfo ) {
var websiteID = branchInfo.websiteID;
var moduleID = branchInfo.moduleID;
var uniqueID = branchInfo.uniqueID;
var w = branchInfo.w;
var branchEmail = branchInfo.branchEmail;
var branchName = branchInfo.branchName;
var html = '';
html += '<form class="s123-module-branches layout-1 branchForm">';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label id="branchEmail" for="branchEmail">'+translations.emailAddress+': <a href="mailto:'+branchEmail+'">'+branchEmail+'</a></label>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="first">'+translations.firstName+'</label>';
html += '<input type="text" name="branch_first_name" placeholder="'+translations.firstName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="branch_last_name">'+translations.lastName+'</label>';
html += '<input type="text" name="branch_last_name" placeholder="'+translations.lastName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="branch_phone">'+translations.phone+'</label>';
html += '<input type="text" name="branch_phone" placeholder="'+translations.phone+'" class="form-control">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="branch_email">'+translations.emailAddress+'</label>';
html += '<input type="text" name="branch_email" placeholder="'+translations.emailAddress+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'" data-rule-email="true" data-msg-email="'+translations.jqueryValidMsgEmail+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-xs-12">';
html += '<div class="form-group">';
html += '<label for="">'+translations.message+'</label>';
html += '<textarea class="form-control" name="branch_message" placeholder="'+translations.message+'"></textarea>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<button type="submit" class="btn btn-primary btn-block">'+translations.send+'</button>';
html += '<input type="hidden" name="w" value="'+w+'">';
html += '<input type="hidden" name="websiteID" value="'+websiteID+'">';
html += '<input type="hidden" name="moduleID" value="'+moduleID+'">';
html += '<input type="hidden" name="uniqueID" value="'+uniqueID+'">';
html += '<input type="hidden" name="branchName" value="'+branchName+'">';
html += '</form>';
return html;
}var buisnessHoursTemplate = new function() {
var buisnessHTemplate = this;
buisnessHTemplate.init = function( settings ) {
var $buisnessHourContainer = settings.$buisnessHourContainer;
$buisnessHourContainer.empty();
var buisnessHourJSON = tryParseJSON(settings.buisnessHourJSON.val());
if(buisnessHourJSON.fullTime == 'on') {
buisnessHTemplate.twentyFourSevenTemplate($buisnessHourContainer);
return false;
}
var workingDaysContainer = {};
workingDaysContainer.$businessWorkingDays = settings.$buisnessHourContainer;
workingDaysContainer.weeklyWorkingTime = buisnessHourJSON;
buisnessHTemplate.showOpeningTime(workingDaysContainer);
};
this.firstDayOfTheWeek = function ( firstDayOfWeek ) {
var firstDayOfWeek = parseInt( firstDayOfWeek );
var daysOfWeek = [translations.Sunday, translations.Monday, translations.Tuesday, translations.Wednesday, translations.Thursday, translations.Friday, translations.Saturday ];
for( var i = 0 ; i < firstDayOfWeek ; i++ ) {
daysOfWeek.push(daysOfWeek[i]);
}
daysOfWeek.splice(0,firstDayOfWeek);
return daysOfWeek;
}
this.showOpeningTime = function ( workingDaysContainer ) {
var objtContainer = {};
objtContainer.daysOfWeek = buisnessHTemplate.firstDayOfTheWeek( workingDaysContainer.weeklyWorkingTime.firstDayOfWeek);
objtContainer.$label = workingDaysContainer.$businessWorkingDays;
objtContainer.templateNumber = workingDaysContainer.$businessWorkingDays.data('template');
objtContainer.dateFormat = workingDaysContainer.weeklyWorkingTime.dateFormat;
objtContainer.timeFormat = workingDaysContainer.weeklyWorkingTime.timeFormat;
objtContainer.weeklyDaysArray = workingDaysContainer.weeklyWorkingTime.businessHours;
switch(objtContainer.templateNumber) {
case 0:
objtContainer.days = buisnessHTemplate.sequenceTemplate(objtContainer);
buisnessHTemplate.generateHTML(objtContainer);
break;
case 1:
buisnessHTemplate.generateHTML(objtContainer);
break;
}
};
this.twentyFourSevenTemplate = function ( $label ) {
var html = '<div class="day-hours">24/7</div>';
$label.append(html);
}
/* sequence of days array
* [
* 	[{Sunday},{Monday}],  		<- sequence
[{Tuesday},{Wednesday}], 	<- sequence
[{Friday},{Saturday}]  		<- sequence
* ]
*/
this.sequenceTemplate = function ( objtContainer ) {
var daysOfWeek = objtContainer.daysOfWeek;
var weeklyDaysArray = objtContainer.weeklyDaysArray;
var templateNumber = objtContainer.templateNumber;
var $label = objtContainer.$label;
var days = new Array();
var datesSequence = new Array();
days.push(datesSequence);
$.each(weeklyDaysArray,function( index, weeklyDays ) {
if(weeklyDays.isActive) {
weeklyDays.index = index;
weeklyDays.name = daysOfWeek[index];
datesSequence.push(weeklyDays);
return false;
}
});
var arrayIndex = 0;
var skipStep = true;
var compareIndex = 0;
if(datesSequence.length <= 0) return false;
$.each(weeklyDaysArray,function( index, weeklyDays ) {
if( skipStep ) {
if(compareIndex < datesSequence[0].index) {
compareIndex ++ ;
return;
}
else {
skipStep = false;
}
}
weeklyDays.name = daysOfWeek[index];
weeklyDays.index = index;
if(weeklyDays.isActive) {
if(weeklyDays.name == datesSequence[arrayIndex].name) return;
/*
* compare the current date that the loop is on and the one from the sequence array,
* if the shifts are the same then push this day to the sequence
*/
if( weeklyDays.startTime1 == datesSequence[arrayIndex].startTime1
&& weeklyDays.endTime1 == datesSequence[arrayIndex].endTime1
&& weeklyDays.startTime2 == datesSequence[arrayIndex].startTime2
&& weeklyDays.endTime2 == datesSequence[arrayIndex].endTime2
&& weeklyDays.startTime3 == datesSequence[arrayIndex].startTime3
&& weeklyDays.endTime3 == datesSequence[arrayIndex].endTime3 ) {
if(index - datesSequence[arrayIndex].index == 1) {
datesSequence.push(weeklyDays);
arrayIndex ++ ;
} else {
datesSequence = new Array();
datesSequence.push(weeklyDays);
days.push(datesSequence);
arrayIndex = 0;
}
} else {
datesSequence = new Array();
datesSequence.push(weeklyDays);
days.push(datesSequence);
arrayIndex = 0;
}
}
});
return days;
};
this.changeTimeFormat = function( websiteTimeFormat, time ) {
switch( websiteTimeFormat ) {
case 'H:i':
return moment(time,"hmm").format("HH:mm");
break;
case 'h:i A':
return moment(time,"hmm").format("hh:mm A");
break;
}
};
this.generateHTML = function ( objtContainer  ) {
var days = objtContainer.days;
var daysOfWeek = objtContainer.daysOfWeek;
var weeklyDaysArray = objtContainer.weeklyDaysArray;
var templateNumber = objtContainer.templateNumber;
var $label = objtContainer.$label;
var websiteTimeFormat = objtContainer.timeFormat;
var html = '';
switch( templateNumber ) {
case 0:
/*
* This loop is crating html output of the sequence array example:
* [
* 	[{Sunday},{Monday}],  		<- sequence
[{Tuesday},{Wednesday}], 	<- sequence
[{Friday},{Saturday}]  		<- sequence
* ]
*/
$.each(days, function( index, workingDays ) {
if (workingDays.length == 1) {
workingDays[0].startTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].startTime1);
workingDays[0].endTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].endTime1);
html += '<div class="day-name">' + workingDays[0].name + '</div><div class="day-hours">' + workingDays[0].startTime1 + ' - ' + workingDays[0].endTime1 + '</div>';
} else {
workingDays[0].startTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].startTime1);
workingDays[0].endTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].endTime1);
html += '<div class="day-hours">' + workingDays[0].name + '-' + workingDays[(workingDays.length-1)].name + '</div><div>' + workingDays[0].startTime1 + ' - ' + workingDays[0].endTime1 + '</div>';
}
if( workingDays[0].startTime2 != '' && workingDays[0].endTime2 != '' ) {
workingDays[0].startTime2 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].startTime2);
workingDays[0].endTime2 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].endTime2);
html += '<div class="day-hours">' + workingDays[0].startTime2 + '-' + workingDays[0].endTime2 + '</div>';
}
if( workingDays[0].startTime3 != '' && workingDays[0].endTime3 != '' ) {
workingDays[0].startTime3 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].startTime3);
workingDays[0].endTime3 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,workingDays[0].endTime3);
html += '<div class="day-hours">' + workingDays[0].startTime3 + '-' + workingDays[0].endTime3 +'</div>';
}
});
break;
case 1:
$.each(weeklyDaysArray,function( index, weeklyDays ) {
if(weeklyDays.isActive) {
weeklyDays.startTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,weeklyDays.startTime1);
weeklyDays.endTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat,weeklyDays.endTime1);
html += '<div class="day-name">' +  daysOfWeek[index] + '</div><div class="day-hours">' + weeklyDays.startTime1 + '-' + weeklyDays.endTime1 + '</div>';
if( weeklyDays.startTime2 != '' && weeklyDays.endTime2 != '' ) {
html += '<div class="day-hours">' + weeklyDays.startTime2 + '-' + weeklyDays.endTime2 + '</div>';
}
if( weeklyDays.startTime3 != '' && weeklyDays.endTime3 != '' ) {
html += '<div class="day-hours">' + weeklyDays.startTime3 + '-' + weeklyDays.endTime3 + '</div>';
}
}
});
break;
}
$label.append(html);
};
/**
* The function trying to parse the sent JSON string, we use it to prevent
* JS error if the JSON is not valid from some reason.
*
* @param {string} str - JSON string.
* @return {object} Obj - Valid Object or False if the sent JSON string is invalid.
*/
function tryParseJSON( str ) {
try {
var Obj = JSON.parse(str);
if ( Obj && typeof Obj === "object" ) {
return Obj;
}
} catch (e) {}
return false;
}
};// Tickets
function initializeTickets( $ticketsContainer ) {
if ( $ticketsContainer.find('.event-tickets').length === 0 ) return;
generatePopover();
$ticketsContainer.find('.event-ticket-info-btn').off('click').on('click',function( event ) {
var $btn = $(this);
if ( $btn.data('more-mode') ) {
$btn.data('more-text',$btn.text());
$btn.text($btn.data('less-text'));
} else {
$btn.text($btn.data('more-text'));
}
$btn.data('more-mode',!$btn.data('more-mode'));
$btn.prev().slideToggle(400);
});
$ticketsContainer.find('.event-checkout-btn').off('click').on('click', function() {
if ( $(this).hasClass('event-checkout-disable-btn') ) {
bootbox.alert({
message: translations.registrationClosed,
});
} else {
submitForm();
$(this).attr('disabled','true');
}
});
$ticketsContainer.find('.quantity-plus-btn').on('click', function() {
updateQuantity($(this).closest('.quantity_field').find('.quantity-value'),'plus');
});
$ticketsContainer.find('.quantity-minus-btn').on('click', function() {
updateQuantity($(this).closest('.quantity_field').find('.quantity-value'),'minus');
});
/**
* The function update the quantity
*/
function updateQuantity( $quantity, operator ) {
var number = 0;
var totalQty = 0;
var quantity = parseInt($quantity.data('quantity'));
var maxQuantity = parseInt($quantity.attr('max'));
if ( operator === 'minus' && quantity > 0 ) number = -1;
if ( operator === 'plus' && quantity < maxQuantity ) number = 1;
/**
* Positive number only and small then max quantity or small
* than 20 (the smallest between the two) limitations
*/
if ( quantity >= 0 && quantity <= maxQuantity ) {
$quantity.html(quantity + number);
$quantity.data('quantity',quantity+number);
}
totalQty = calculateTotalQty();
$('.quantity-plus-btn').removeAttr('disabled');
if ( totalQty > 0 && totalQty <= 20 ) {
$ticketsContainer.find('.popover.events-validator-popover').popover('hide');
$ticketsContainer.find('[name="ordered_tickets"]').html(JSON.stringify(update()));
$ticketsContainer.find('.event-checkout-btn').attr('disabled', false);
} else {
$ticketsContainer.find('.event-checkout-btn').attr('disabled', true);
update();
if ( totalQty > 20 ) {
activeTicketsValidator();
$ticketsContainer.find('.quantity-plus-btn').attr('disabled','disabled');
}
}
}
/**
* Submit the form register
*/
function submitForm() {
$ticketsContainer.find('.eventsRegisterForm').submit();
}
/**
* The function build the tickets JSON and update the prices
*/
function update() {
var tickets = $ticketsContainer.find('.eventSettings').html();
var $ticketsTatle = $ticketsContainer.find('.event-ticket-tatle');
var totalPrice = 0.00;
var tk = [];
/**
* parse the JSON response, we using `try` and `catch` to prevent JS
* error if the JSON isn't valid from some reason.
*/
try {
tickets = jQuery.parseJSON(tickets);
} catch (e) { return; }
$.each($ticketsTatle, function(index){
var $ticket = $(this);
var $quantityValue = $ticket.find('.quantity-value');
if ( $quantityValue.length === 0 ) return true;
var newQuantity = $quantityValue.data('quantity');
var ticketID = $ticket.find('.quantity-value').data('ticket-id');
var price = tickets[ticketID].price;
var limitQuantity = tickets[ticketID].limitQuantity;
if ( parseInt(newQuantity) > parseInt(limitQuantity) ) {
newQuantity = limitQuantity;
$quantityValue.html(limitQuantity);
}
if ( parseInt(newQuantity) > 0 ) {
var ticket = new Ticket();
ticket.id = ticketID;
ticket.quantity = newQuantity;
tk.push(ticket);
}
var total = parseFloat(price) * parseFloat(newQuantity);
$ticketsContainer.find('#total_'+ticketID+' [data-type="price"]').html(total.toFixed(2));
totalPrice = parseFloat(totalPrice) + parseFloat(total);
});
var discount = calculateCouponDiscount(totalPrice,$ticketsContainer.find('.couponDiscount'),$ticketsContainer.find('.couponType'));
if ( $.isNumeric(discount) && discount > 0 && (totalPrice-discount >= 0) ) {
$ticketsContainer.find('.event-tickets-discount').removeClass('hidden');
$ticketsContainer.find('.ticketsSubtotal [data-type="price"]').html(totalPrice.toFixed(2));
$ticketsContainer.find('.ticketsCoupon [data-type="price"]').html(discount.toFixed(2));
totalPrice = parseFloat(totalPrice) - parseFloat(discount);
} else {
$ticketsContainer.find('.event-tickets-discount').addClass('hidden');
}
$ticketsContainer.find('.event-tickets-total [data-type="price"]').html(totalPrice.toFixed(2));
return tk;
}
/**
* The function calculate the total tickets quantity
*/
function calculateTotalQty() {
var $ticketsTatle = $ticketsContainer.find('.event-ticket-tatle');
var totalQty = 0;
$.each($ticketsTatle, function(index){
var $ticket = $(this);
var $quantityValue = $ticket.find('.quantity-value');
if ( $quantityValue.length === 0 ) return true;
var newQuantity = $quantityValue.data('quantity');
totalQty = totalQty + parseInt(newQuantity);
});
return (totalQty);
}
function generatePopover() {
$quantityField = $ticketsContainer.find('.quantity_field');
$quantityField.popover({
container: 'body',
content: translations.limit20Tickets,
trigger: 'manual',
template: '<div class="popover events-validator-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
placement: function(popover, input) {
return isMobile.any() ? 'auto' : ($('html').attr('dir') === 'rtl' ? 'left' : 'right');
}
});
}
function activeTicketsValidator() {
$quantityValue = $ticketsContainer.find('.quantity-value').filter(function() {
return parseInt($(this).data('quantity'), 10) > 0;
});
$quantityField.popover('show');
};
/**
* Event Ticket Structure.
*/
function Ticket() {
return {
id: null,
quantity: 0
};
};
/**
* Update discount
*/
function updateDiscount(data) {
$couponType = $ticketsContainer.find('.couponType');
$couponCode = $ticketsContainer.find('[name="couponCode"]');
$validCoupon = $ticketsContainer.find('.valid-coupon');
$invalidCoupon = $ticketsContainer.find('.invalid-coupon');
$couponDiscount = $ticketsContainer.find('.couponDiscount');
$validCoupon.addClass('hidden');
$invalidCoupon.addClass('hidden');
if ( data.valid === 'true') {
$validCoupon.removeClass('hidden');
$couponCode.val(data.couponCode);
$couponDiscount.val(data.discount);
$couponType.val(data.type);
update();
} else {
$invalidCoupon.removeClass('hidden');
}
}
}jQuery(function($) {
var rtl = $('html[dir=rtl]').length === 1;
var $section = $('section.s123-page-data.s123-module-events.s123-page-data-events');
var $mainImage = $section.find('.main-image > div');
var $productOwlcarousel = $section.find('.productOwlcarousel');
jQueryZoomInitialize($mainImage);
/**
* Owl Carousel 2 Initialize
* Documentation: http://www.owlcarousel.owlgraphic.com/docs/api-options.html
*/
$productOwlcarousel.owlCarousel({
autoPlay: false,
items : 4,
margin: 10,
stagePadding: 5,
startPosition: 0,
loop: false,
center: false,
nav: true,
rtl: rtl,
navText:  [
'<i class="fa fa-2x fa-angle-' + (rtl ? 'right' : 'left') + '" aria-hidden="true"></i>',
'<i class="fa fa-2x fa-angle-' + (rtl ? 'left' : 'right') + '" aria-hidden="true"></i>'
],
dots: true
});
$productOwlcarousel.find('.item').click(function() {
var $clickedImage = $(this).find('.item-image');
var videoPath = '';
if ($clickedImage.data('media-type') == 'video') {
videoPath = $clickedImage.data('video-path');
}
jQueryZoomInitialize($clickedImage );
$mainImage.css({
backgroundImage: $clickedImage.css('background-image')
});
});
/**
* The function initialize the jQuery Zoom Plugin on the main product image.
* Documentation: http://www.jacklmoore.com/zoom/
*
* @param {string} url - The URL of the image we like to zoom in to it.
*/
function jQueryZoomInitialize( $clickedImage ) {
if ($clickedImage.data('media-type') == 'video' ) {
$mainImage.empty();
$('<iframe data-player="site123" style="color:white;width:'+ $mainImage.width() +'px;height:'+ $mainImage.height() +'px" type="text/html" src="'+ '/include/globalVideoPlayer.php?url=' + $clickedImage.data('video-path') + (isMobile.any() ? '&autoplay=false': '' ) +'" frameborder="0" allowfullscreen=""></iframe>').appendTo($mainImage);
} else {
$mainImage.empty();
var url = $clickedImage.data('zoom-image');
if ( isMobile.any() ) return;
$mainImage.trigger('zoom.destroy');
/**
* It take some time for the zoom image to loaded and if the user hover the image
* before the zoom image finished loaded the zoom is not activate. We fix it by
* creating a div and removing it (for activate the `'mouseover' event).
*/
var loading = $('<div style="position:absolute;width:100%;height:100%;z-index:99999;"></div>').appendTo($mainImage);
$mainImage.zoom({
url: url,
magnify: 1,
touch: true,
callback: function() {
loading.remove();
},
});
}
}
googleMapPopUp.init({
locationData : $section.find('.mapPopupActivator')
});
$productOwlcarousel.find('.item').click(function() {
var $clickedImage = $(this).find('.item-image');
$mainImage.css({
backgroundImage: $clickedImage.css('background-image')
});
});
initializeTickets($section);
});jQuery(function($) {
EventsModuleInitialize_Layout1();
});
/**
* The function initialize the Schedule Booking Module.
*/
function EventsModuleInitialize_Layout1() {
$( document ).on( 's123.page.ready', function( event ) {
var $sections = $('.s123-module-events.layout-1');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.events-categories-container li');
var $events = $s.find('.events-container > div');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
var $filtered = $events.filter('[data-event-filter=' + $category.data('categories-filter') + ']');
if ( initialize ) {
$events.hide();
$filtered.show();
} else {
$events.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
$s.find('.events-responsive-filter').click(function() {
var $category = $(this);
$s.find('.categories-panel').slideToggle('slow');
$category.toggleClass('active');
return false;
});
});
});
}jQuery(function($) {
EventsModuleInitialize_Layout2();
});
/**
* The function initialize the Schedule Booking Module.
*/
function EventsModuleInitialize_Layout2() {
$( document ).on( 's123.page.ready', function( event ) {
var $sections = $('.s123-module-events.layout-2');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.events-categories-container li');
var $events = $s.find('.events-container > div');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
var $filtered = $events.filter('[data-event-filter=' + $category.data('categories-filter') + ']');
if ( initialize ) {
$events.hide();
$filtered.show();
} else {
$events.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
$s.find('.events-responsive-filter').off('click').on('click',function() {
var $category = $(this);
$s.find('.categories-panel').slideToggle('slow');
$category.toggleClass('active');
return false;
});
});
});
}jQuery(function($) {
EventsModuleInitialize_Layout4();
});
/**
* The function initialize the Events Module.
*/
function EventsModuleInitialize_Layout4() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('.s123-module.s123-module-events.layout-4');
$section.each( function( index ) {
var $sectionThis = $(this);
initializeTickets($sectionThis);
});
});
}jQuery(function($) {
PricingModuleInitialize_Layout1();
});
/**
* The function initialize the Pricing Module.
*/
function PricingModuleInitialize_Layout1() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('.s123-module.s123-module-pricing-tables.layout-1');
$section.each(function( index ) {
var $sectionThis = $(this);
var $orderPricingTableBtn = $sectionThis.find('.order-pricing-table-btn');
$orderPricingTableBtn.off('click').on('click',function() {
var $this = $(this);
$('<form action="/versions/'+$('#versionNUM').val()+'/wizard/orders/front/addToCart.php" method="post">' +
'<input type="text" name="w" value="' + $('#w').val() + '" />' +
'<input type="text" name="websiteID" value="' + $('#websiteID').val() + '" />' +
'<input type="text" name="uniquePageID" value="' + $this.data('unique-page') + '" />' +
'<input type="text" name="moduleID" value="' + $this.data('module') + '" />' +
'<input type="text" name="tranW" value="' + $this.data('tranw') + '" />' +
'<input type="text" name="redirect" value="1" />' +
'<input type="text" name="amount" value="1" />' +
'</form>')
.appendTo('body')
.submit();
});
});
});
}jQuery(function($) {
PricingModuleInitialize_Layout2();
});
/**
* The function initialize the Pricing Module.
*/
function PricingModuleInitialize_Layout2() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('.s123-module.s123-module-pricing-tables.layout-2');
$section.each(function( index ) {
var $sectionThis = $(this);
var $orderPricingTableBtn = $sectionThis.find('.order-pricing-table-btn');
$orderPricingTableBtn.off('click').on('click',function() {
var $this = $(this);
$('<form action="/versions/'+$('#versionNUM').val()+'/wizard/orders/front/addToCart.php" method="post">' +
'<input type="text" name="w" value="' + $('#w').val() + '" />' +
'<input type="text" name="websiteID" value="' + $('#websiteID').val() + '" />' +
'<input type="text" name="uniquePageID" value="' + $this.data('unique-page') + '" />' +
'<input type="text" name="moduleID" value="' + $this.data('module') + '" />' +
'<input type="text" name="tranW" value="' + $this.data('tranw') + '" />' +
'<input type="text" name="redirect" value="1" />' +
'<input type="text" name="amount" value="1" />' +
'</form>')
.appendTo('body')
.submit();
});
});
});
}/*! @vimeo/player v2.2.0 | (c) 2017 Vimeo | MIT License | https://github.com/vimeo/player.js */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e.Vimeo=e.Vimeo||{},e.Vimeo.Player=t())}(this,function(){"use strict";function e(e,t){return t={exports:{}},e(t,t.exports),t.exports}function t(e,t,n){var r=E.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),E.set(e.element,r)}function n(e,t){return(E.get(e.element)||{})[t]||[]}function r(e,t,n){var r=E.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],E.set(e.element,r),!0;var i=r[t].indexOf(n);return-1!==i&&r[t].splice(i,1),E.set(e.element,r),r[t]&&0===r[t].length}function i(e,t){var i=n(e,t);if(i.length<1)return!1;var o=i.shift();return r(e,t,o),o}function o(e,t){var n=E.get(e);E.set(t,n),E.delete(e)}function a(e,t){return 0===e.indexOf(t.toLowerCase())?e:""+t.toLowerCase()+e.substr(0,1).toUpperCase()+e.substr(1)}function u(e){return e instanceof window.HTMLElement}function s(e){return!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e}function c(e){return/^(https?:)?\/\/((player|www).)?vimeo.com(?=$|\/)/.test(e)}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=e.url,r=t||n;if(!r)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(s(r))return"https://vimeo.com/"+r;if(c(r))return r.replace("http:","https:");if(t)throw new TypeError("“"+t+"” is not a valid video id.");throw new TypeError("“"+r+"” is not a vimeo.com url.")}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return T.reduce(function(t,n){var r=e.getAttribute("data-vimeo-"+n);return(r||""===r)&&(t[n]=""===r?1:r),t},t)}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(function(n,r){if(!c(e))throw new TypeError("“"+e+"” is not a vimeo.com url.");var i="https://vimeo.com/api/oembed.json?url="+encodeURIComponent(e);for(var o in t)t.hasOwnProperty(o)&&(i+="&"+o+"="+encodeURIComponent(t[o]));var a="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;a.open("GET",i,!0),a.onload=function(){if(404===a.status)return void r(new Error("“"+e+"” was not found."));if(403===a.status)return void r(new Error("“"+e+"” is not embeddable."));try{var t=JSON.parse(a.responseText);n(t)}catch(e){r(e)}},a.onerror=function(){var e=a.status?" ("+a.status+")":"";r(new Error("There was an error fetching the embed code from Vimeo"+e+"."))},a.send()})}function d(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function v(e){return"string"==typeof e&&(e=JSON.parse(e)),e}function p(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var r={method:t};void 0!==n&&(r.value=n);var i=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));i>=8&&i<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin)}}function y(e,t){t=v(t);var o=[],a=void 0;if(t.event){if("error"===t.event){n(e,t.data.method).forEach(function(n){var i=new Error(t.data.message);i.name=t.data.name,n.reject(i),r(e,t.data.method,n)})}o=n(e,"event:"+t.event),a=t.data}else if(t.method){var u=i(e,t.method);u&&(o.push(u),a=t.value)}o.forEach(function(t){try{if("function"==typeof t)return void t.call(e,a);t.resolve(a)}catch(e){}})}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var g=void 0!==Array.prototype.indexOf,w=void 0!==window.postMessage;if(!g||!w)throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var k="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},b=(e(function(e,t){!function(e){function t(e,t){function r(e){if(!this||this.constructor!==r)return new r(e);this._keys=[],this._values=[],this._itp=[],this.objectOnly=t,e&&n.call(this,e)}return t||w(e,"size",{get:y}),e.constructor=r,r.prototype=e,r}function n(e){this.add?e.forEach(this.add,this):e.forEach(function(e){this.set(e[0],e[1])},this)}function r(e){return this.has(e)&&(this._keys.splice(g,1),this._values.splice(g,1),this._itp.forEach(function(e){g<e[0]&&e[0]--})),-1<g}function i(e){return this.has(e)?this._values[g]:void 0}function o(e,t){if(this.objectOnly&&t!==Object(t))throw new TypeError("Invalid value used as weak collection key");if(t!=t||0===t)for(g=e.length;g--&&!k(e[g],t););else g=e.indexOf(t);return-1<g}function a(e){return o.call(this,this._values,e)}function u(e){return o.call(this,this._keys,e)}function s(e,t){return this.has(e)?this._values[g]=t:this._values[this._keys.push(e)-1]=t,this}function c(e){return this.has(e)||this._values.push(e),this}function f(){(this._keys||0).length=this._values.length=0}function l(){return p(this._itp,this._keys)}function h(){return p(this._itp,this._values)}function d(){return p(this._itp,this._keys,this._values)}function v(){return p(this._itp,this._values,this._values)}function p(e,t,n){var r=[0],i=!1;return e.push(r),{next:function(){var o,a=r[0];return!i&&a<t.length?(o=n?[t[a],n[a]]:t[a],r[0]++):(i=!0,e.splice(e.indexOf(r),1)),{done:i,value:o}}}}function y(){return this._values.length}function m(e,t){for(var n=this.entries();;){var r=n.next();if(r.done)break;e.call(t,r.value[1],r.value[0],this)}}var g,w=Object.defineProperty,k=function(e,t){return e===t||e!==e&&t!==t};"undefined"==typeof WeakMap&&(e.WeakMap=t({delete:r,clear:f,get:i,has:u,set:s},!0)),"undefined"!=typeof Map&&"function"==typeof(new Map).values&&(new Map).values().next||(e.Map=t({delete:r,has:u,get:i,set:s,keys:l,values:h,entries:d,forEach:m,clear:f})),"undefined"!=typeof Set&&"function"==typeof(new Set).values&&(new Set).values().next||(e.Set=t({has:a,add:c,delete:r,clear:f,keys:h,values:h,entries:v,forEach:m})),"undefined"==typeof WeakSet&&(e.WeakSet=t({delete:r,add:c,clear:f,has:a},!0))}(void 0!==k?k:window)}),e(function(e){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(t,n,r){n[t]=n[t]||r(),e.exports&&(e.exports=n[t])}("Promise",k,function(){function e(e,t){d.add(e,t),h||(h=p(d.drain))}function n(e){var n,r=void 0===e?"undefined":t(e);return null==e||"object"!=r&&"function"!=r||(n=e.then),"function"==typeof n&&n}function r(){for(var e=0;e<this.chain.length;e++)i(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function i(e,t,r){var i,o;try{!1===t?r.reject(e.msg):(i=!0===t?e.msg:t.call(void 0,e.msg),i===r.promise?r.reject(TypeError("Promise-chain cycle")):(o=n(i))?o.call(i,r.resolve,r.reject):r.resolve(i))}catch(e){r.reject(e)}}function o(t){var i,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(i=n(t))?e(function(){var e=new s(u);try{i.call(t,function(){o.apply(e,arguments)},function(){a.apply(e,arguments)})}catch(t){a.call(e,t)}}):(u.msg=t,u.state=1,u.chain.length>0&&e(r,u))}catch(e){a.call(new s(u),e)}}}function a(t){var n=this;n.triggered||(n.triggered=!0,n.def&&(n=n.def),n.msg=t,n.state=2,n.chain.length>0&&e(r,n))}function u(e,t,n,r){for(var i=0;i<t.length;i++)!function(i){e.resolve(t[i]).then(function(e){n(i,e)},r)}(i)}function s(e){this.def=e,this.triggered=!1}function c(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function f(t){if("function"!=typeof t)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var n=new c(this);this.then=function(t,i){var o={success:"function"!=typeof t||t,failure:"function"==typeof i&&i};return o.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");o.resolve=e,o.reject=t}),n.chain.push(o),0!==n.state&&e(r,n),o.promise},this.catch=function(e){return this.then(void 0,e)};try{t.call(void 0,function(e){o.call(n,e)},function(e){a.call(n,e)})}catch(e){a.call(n,e)}}var l,h,d,v=Object.prototype.toString,p="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),l=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==r})}}catch(e){l=function(e,t,n){return e[t]=n,e}}d=function(){function e(e,t){this.fn=e,this.self=t,this.next=void 0}var t,n,r;return{add:function(i,o){r=new e(i,o),n?n.next=r:t=r,n=r,r=void 0},drain:function(){var e=t;for(t=n=h=void 0;e;)e.fn.call(e.self),e=e.next}}}();var y=l({},"constructor",f,!1);return f.prototype=y,l(y,"__NPO__",0,!1),l(f,"resolve",function(e){var n=this;return e&&"object"==(void 0===e?"undefined":t(e))&&1===e.__NPO__?e:new n(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)})}),l(f,"reject",function(e){return new this(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)})}),l(f,"all",function(e){var t=this;return"[object Array]"!=v.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");var i=e.length,o=Array(i),a=0;u(t,e,function(e,t){o[e]=t,++a===i&&n(o)},r)})}),l(f,"race",function(e){var t=this;return"[object Array]"!=v.call(e)?t.reject(TypeError("Not an array")):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");u(t,e,function(e,t){n(t)},r)})}),f})})),E=new WeakMap,T=["id","url","width","maxwidth","height","maxheight","portrait","title","byline","color","autoplay","autopause","loop","responsive","speed"],_=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),j=new WeakMap,x=new WeakMap,Player=function(){function Player(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(m(this,Player),window.jQuery&&e instanceof jQuery&&(e.length>1&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),e=e[0]),"string"==typeof e&&(e=document.getElementById(e)),!u(e))throw new TypeError("You must pass either a valid element or a valid id.");if("IFRAME"!==e.nodeName){var r=e.querySelector("iframe");r&&(e=r)}if("IFRAME"===e.nodeName&&!c(e.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(j.has(e))return j.get(e);this.element=e,this.origin="*";var i=new b(function(r,i){var a=function(e){if(c(e.origin)&&t.element.contentWindow===e.source){"*"===t.origin&&(t.origin=e.origin);var n=v(e.data),i="event"in n&&"ready"===n.event,o="method"in n&&"ping"===n.method;if(i||o)return t.element.setAttribute("data-ready","true"),void r();y(t,n)}};if(window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent&&window.attachEvent("onmessage",a),"IFRAME"!==t.element.nodeName){var u=l(e,n);h(f(u),u).then(function(n){var r=d(n,e);return t.element=r,o(e,r),j.set(t.element,t),n}).catch(function(e){return i(e)})}});return x.set(this,i),j.set(this.element,this),"IFRAME"===this.element.nodeName&&p(this,"ping"),this}return _(Player,[{key:"callMethod",value:function(e){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new b(function(i,o){return n.ready().then(function(){t(n,e,{resolve:i,reject:o}),p(n,e,r)})})}},{key:"get",value:function(e){var n=this;return new b(function(r,i){return e=a(e,"get"),n.ready().then(function(){t(n,e,{resolve:r,reject:i}),p(n,e)})})}},{key:"set",value:function(e,n){var r=this;return b.resolve(n).then(function(n){if(e=a(e,"set"),void 0===n||null===n)throw new TypeError("There must be a value to set.");return r.ready().then(function(){return new b(function(i,o){t(r,e,{resolve:i,reject:o}),p(r,e,n)})})})}},{key:"on",value:function(e,r){if(!e)throw new TypeError("You must pass an event name.");if(!r)throw new TypeError("You must pass a callback function.");if("function"!=typeof r)throw new TypeError("The callback must be a function.");0===n(this,"event:"+e).length&&this.callMethod("addEventListener",e).catch(function(){}),t(this,"event:"+e,r)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");r(this,"event:"+e,t)&&this.callMethod("removeEventListener",e).catch(function(e){})}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=x.get(this);return b.resolve(e)}},{key:"addCuePoint",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}]),Player}();return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: "+e)};t.forEach(function(e){try{if(null!==e.getAttribute("data-vimeo-defer"))return;var t=l(e);h(f(t),t).then(function(t){return d(t,e)}).catch(n)}catch(e){n(e)}})}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,t=function(t){if(c(t.origin)&&t.data&&"spacechange"===t.data.event)for(var n=e.querySelectorAll("iframe"),r=0;r<n.length;r++)if(n[r].contentWindow===t.source){var i=n[r].parentElement;i&&-1!==i.className.indexOf("vimeo-space")&&(i.style.paddingBottom=t.data.data[0].bottom+"px");break}};window.addEventListener?window.addEventListener("message",t,!1):window.attachEvent&&window.attachEvent("onmessage",t)}(),Player});
jQuery(function($) {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-page-data-schedule-booking');
bookingInit($section);
});
});jQuery(function($) {
ScheduleBookingModuleInitialize_Layout4();
});
/**
* The function initialize the Schedule Booking Module.
*/
function ScheduleBookingModuleInitialize_Layout4() {
$( document ).on( 's123.page.ready', function( event ) {
var $sections = $('.s123-module-scheduleBookings.layout-1');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.products-categories-container li');
var $products = $s.find('.products-container > div');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
var $filtered = $products.filter('[data-product-filter=' + $category.data('categories-filter') + ']');
if ( initialize ) {
$products.hide();
$filtered.show();
} else {
$products.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
$s.find('.products-responsive-filter').click(function() {
var $category = $(this);
$s.find('.categories-panel').slideToggle('slow');
$category.toggleClass('active');
return false;
});
});
});
}jQuery(function($) {
ScheduleBookingModuleInitialize_Layout2();
});
/**
* The function initialize the Schedule Booking Module.
*/
function ScheduleBookingModuleInitialize_Layout2() {
$( document ).on( 's123.page.ready', function( event ) {
var $sections = $('.s123-module-scheduleBookings.layout-2');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.products-categories-container li');
var $products = $s.find('.products-container > div');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
var $filtered = $products.filter('[data-product-filter=' + $category.data('categories-filter') + ']');
if ( initialize ) {
$products.hide();
$filtered.show();
} else {
$products.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
$s.find('.products-responsive-filter').off('click').on('click', function() {
var $category = $(this);
$s.find('.categories-panel').slideToggle('slow');
$category.toggleClass('active');
return false;
});
});
});
}jQuery(function($) {
ScheduleBookingModuleInitialize_Layout3();
});
/**
* The function initialize the Schedule Booking Module.
*/
function ScheduleBookingModuleInitialize_Layout3() {
$( document ).on( 's123.page.ready', function( event ) {
var rtl = $('html[dir=rtl]').length === 1;
var $section = $('.s123-module.s123-module-scheduleBookings.layout-3');
$.each($section.find('.item.clearfix.box-primary'), function( index, item ) {
var $thisSection = $(item);
bookingInit($thisSection);
});
});
}// Booking Initialize
function bookingInit($booking) {
googleMapPopUp.init({
locationData : $booking.find('.mapPopupActivator')
});
var rtl = $('html[dir=rtl]').length === 1;
var $mainImage = $booking.find('.main-image > div');
var $productOwlcarousel = $booking.find('.bookingOwlcarousel');
jQueryZoomInitialize($mainImage);
/**
* Owl Carousel 2 Initialize
* Documentation: http://www.owlcarousel.owlgraphic.com/docs/api-options.html
*/
$productOwlcarousel.owlCarousel({
autoPlay: false,
items : 4,
margin: 10,
stagePadding: 5,
startPosition: 0,
loop: false,
center: false,
nav: true,
rtl: rtl,
navText:  [
'<i class="fa fa-2x fa-angle-' + (rtl ? 'right' : 'left') + '" aria-hidden="true"></i>',
'<i class="fa fa-2x fa-angle-' + (rtl ? 'left' : 'right') + '" aria-hidden="true"></i>'
],
dots: true
});
$productOwlcarousel.find('.item').click(function() {
var $clickedImage = $(this).find('.item-image');
var videoPath = '';
if ($clickedImage.data('media-type') == 'video') {
videoPath = $clickedImage.data('video-path');
}
jQueryZoomInitialize($clickedImage );
$mainImage.css({
backgroundImage: $clickedImage.css('background-image')
});
});
/**
* The function initialize the jQuery Zoom Plugin on the main product image.
* Documentation: http://www.jacklmoore.com/zoom/
*
* @param {string} url - The URL of the image we like to zoom in to it.
*/
function jQueryZoomInitialize( $clickedImage ) {
if ($clickedImage.data('media-type') == 'video' ) {
$mainImage.empty();
$('<iframe data-player="site123" style="color:white;width:'+ $mainImage.width() +'px;height:'+ $mainImage.height() +'px" type="text/html" src="'+ '/include/globalVideoPlayer.php?url=' + $clickedImage.data('video-path') + (isMobile.any() ? '&autoplay=false': '' ) +'" frameborder="0" allowfullscreen=""></iframe>').appendTo($mainImage);
} else {
$mainImage.empty();
var url = $clickedImage.data('zoom-image');
if ( isMobile.any() ) return;
$mainImage.trigger('zoom.destroy');
/**
* It take some time for the zoom image to loaded and if the user hover the image
* before the zoom image finished loaded the zoom is not activate. We fix it by
* creating a div and removing it (for activate the `'mouseover' event).
*/
var loading = $('<div style="position:absolute;width:100%;height:100%;z-index:99999;"></div>').appendTo($mainImage);
$mainImage.zoom({
url: url,
magnify: 1,
touch: true,
callback: function() {
loading.remove();
},
});
}
}
if ( $booking.find(".moduleNameWorkingDays").length == 0 ) return;
var service = JSON.parse($booking.find(".moduleNameWorkingDays").val());
/**
* Check if the days are inactive
* If they are inactive hide the calendar and show the message
*/
var inActiveDays = 0;
$.each(service.businessHours,function( index, dayOfWeek) {
if (!dayOfWeek.isActive) {
inActiveDays ++;
}
});
if (inActiveDays == 7 && service.fullTime == '') {
$booking.find('.note-container').removeClass('hidden');
$booking.find('.calendar-container').addClass('hidden');
return false;
}
/*
* Determinate if the business is active every day after 24:00
* if it is then move the hours after 24:00 to the next day and close the rest of the shifts
*/
if ( service.fullTime.length == 0 ) {
$.each(service.businessHours, function( index, day ) {
var startShift = 'startTime3';
var endShift = 'endTime3';
if ( day.startTime3 == '' || day.endTime3 == '') {
startShift = 'startTime2';
endShift = 'endTime2';
}
if ( day.startTime2 == '' || day.endTime2 == '') {
startShift = 'startTime1';
endShift = 'endTime1';
}
var startHour = parseInt(day[startShift].substring(0,2));
var startMin = day[startShift].substring(3,5);
var endHour = parseInt(day[endShift].substring(0,2));
var endMin = day[endShift].substring(3,5);
if ( endHour <= startHour ) {
service.businessHours[index][endShift] = '23:59';
var dayIndex = (index+1);
if (index == 6) {
dayIndex = 0;
}
if ( endHour < 10) endHour = '0'+endHour.toString();
service.businessHours[dayIndex].startTime0 = '00:'+ startMin;
service.businessHours[dayIndex].endTime0 = endHour + ':' + endMin;
if ( !service.businessHours[dayIndex].isActive ) {
service.businessHours[dayIndex].isActive = true;
service.businessHours[dayIndex].startTime1 = '';
service.businessHours[dayIndex].endTime1 = '';
service.businessHours[dayIndex].startTime2 = '';
service.businessHours[dayIndex].endTime2 = '';
service.businessHours[dayIndex].startTime3 = '';
service.businessHours[dayIndex].endTime3 = '';
}
}
});
}
/**
* Determinate what days are active and if found that the day is not active then
* add to the string 'disabledDays'
*/
var disabledDays ="";
if (service.fullTime == 'on') {
$.each(service.businessHours,function( index, weekday ) {
weekday.isActive = true;
weekday.startTime1 ='00:00';
weekday.endTime1 ='24:00';
weekday.startTime2 ='';
weekday.endTime2 ='';
weekday.startTime3 ='';
weekday.endTime3 ='';
});
} else {
var total = service.businessHours.length;
$.each(service.businessHours, function( index ) {
if ( !service.businessHours[index].isActive ) {
if (service.firstDayOfWeek == '0') {
disabledDays += index;
} else {
disabledDays += (index + 1) % 7;
}
if ( index < ( total-1 ) ) {
disabledDays += ',';
}
}
});
}
/*
* Sometimes there is a comma at the end of the string
* so we need to check and remove it so the calendar will behave correctly
*/
if ( disabledDays.slice(-1) === ',' ) {
disabledDays = disabledDays.slice(0,disabledDays.length-1);
}
var datePickerFormat = '';
if (service.dateFormat == 'd/m/Y') {
datePickerFormat = 'dd/mm/yyyy';
} else {
datePickerFormat = 'mm/dd/yyyy';
}
var calendarStartTime = $booking.find('.clientTimeByZone').val();
/**
* Get the section date time picker
* API: https://github.com/uxsolutions/bootstrap-datepicker
*/
var $datepicker = $booking.find('.sandbox-container .schedule-booking-date');
$datepicker.datepicker({
format: datePickerFormat,
weekStart: parseInt(service.firstDayOfWeek),
todayBtn: "linked",
clearBtn: false,
language: "en",
startDate: calendarStartTime,
daysOfWeekDisabled: disabledDays,
todayHighlight: true,
orientation: 'bottom auto'
});
var $serviceDatesContainer = $booking.find('.serviceDatesContainer');
var $serviceHourContainer = $booking.find('.serviceHourContainer');
if( $serviceHourContainer.find('.service-hour').length == 0) {
$serviceHourContainer.empty().append('<select class="form-control service-hour"></select><label class="hidden no-time-available">'+ translations.NoAvailableTime +'</label>');
}
var $tableHour = $serviceHourContainer.find('.service-hour');
var $bookingForm = $booking.find('.scheduleBookingForm');
$datepicker.on('changeDate', function() {
var $this = $(this);
$datepicker.datepicker('hide');
var $input = $booking.find('.schedule-booking-date');
var selectedDate = $booking.find('.schedule-booking-date').val();
selectedDate = changeDateFormat('YYYY-mm-DD '+ service.dateFormat, selectedDate );
var today = new Date(selectedDate);
var lastDateOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
lastDateOfMonth =  getDateFormat(lastDateOfMonth) +' '+ getHourFromDate(lastDateOfMonth);
$.ajax({
url: '/versions/'+$booking.find(".versionNUM").val()+'/wizard/modules/scheduleBooking/get-scheduled-orders.php',
method :"post",
data : $bookingForm.serialize()+'&selectedDate='+encodeURIComponent(selectedDate)+'&lastDateOfMonth='+encodeURIComponent(lastDateOfMonth)+'&cartType='+encodeURIComponent('96'),
})
.done(function( result ) {
var serviceInUsestatic = JSON.parse(result);
$booking.find('.service-in-use').val(JSON.stringify(serviceInUsestatic));
$datepicker.datepicker('hide');
$tableHour.empty();
var shifts = {};
shifts.service = service;
shifts.$calendar = $this;
shifts.$serviceDatesContainer = $serviceDatesContainer;
shifts.$tableHour = $tableHour;
shifts.serviceDuration = $booking.find('.serviceDuration').val();
shifts.timeBetweenService = $booking.find('.timeBetweenService').val();
shifts.selectedDate = selectedDate;
shifts.serviceInUse = JSON.parse($booking.find('.service-in-use').val());
shifts.serviceType = $booking.find('.serviceType').val();
shifts.maxParticipants = $booking.find('.maxParticipants').val();
buildHourSelectBox(shifts);
removeUnavailableHours(shifts);
if ( $tableHour.text().length <=0 ) {
$tableHour.addClass('hidden');
$serviceHourContainer.find('.no-time-available').removeClass('hidden');
$booking.find('.btn-buy-now').attr('disabled',true);
} else {
$serviceHourContainer.find('.no-time-available').addClass('hidden');
$tableHour.removeClass('hidden');
$booking.find('.btn-buy-now').attr('disabled',false);
}
});
});
$datepicker.datepicker('setDates',new Date(calendarStartTime));
var currentDate = $booking.find('.schedule-booking-date').val();
$booking.find('.schedule-booking-date').val(currentDate);
$bookingForm.submit( function( event ) {
var serviceOrdered = {};
var formValues = getFormValues($(this));
var price = $booking.find('.servicePrice').val();
var title = $booking.find('.serviceTitle').val();
var date = $booking.find('.schedule-booking-date').val();
var hour = $booking.find('.service-hour').val();
date = changeDateFormat( 'YYYY-mm-DD '+ service.dateFormat, date );
var selectetTime = moment(date + ' ' + hour).format("YYYY-MM-DD HH:mm:ss");
if ($('.productPrice').data('price') == 'Free') {
price = 0;
}
serviceOrdered.price = price;
serviceOrdered.title = title;
serviceOrdered.orderDate = selectetTime;
$booking.find('.scheduleBookingOrder').val(JSON.stringify(serviceOrdered));
});
function buildHourSelectBox( shifts ) {
var service = shifts.service;
var serviceDurationHour = shifts.serviceDuration.substring(0,2);
var serviceDurationHourMili = parseInt(serviceDurationHour) * 60 * 60 * 1000;
var serviceDurationMin = shifts.serviceDuration.substring(3,5);
var serviceDurationMinutesMili = parseInt(serviceDurationMin) * 60 * 1000;
var timeBetweenService = parseInt(shifts.timeBetweenService) * 60 * 1000;
var serviceInterval = parseInt(service.serviceTimeInterval) * 60 * 1000;
var $calendar = shifts.$calendar;
var dateFromCalendar = $calendar.val();
dateFromCalendar = changeDateFormat( 'YYYY-mm-DD '+ service.dateFormat, dateFromCalendar );
var $serviceDatesContainer = shifts.$serviceDatesContainer;
var $tableHour = shifts.$tableHour;
if ( !dateFromCalendar ) throw 'Missing date parameter';
for( var i = 0 ; i <= 3 ; i++ ) {
/*
* addShift is a boolean variable that determinate if it's the second or third shift
* if it's the first shift then set it to false the rest should be on true this way
* the hours the function 'buildHourSelectBox' will add the new hours to the first shift
*/
var addShift = false;
if ( i > 1 ) {
addShift = true ;
}
var dayOfWeek = moment(dateFromCalendar).day();
if ( dayOfWeek == 0) {
if ( parseInt(service.firstDayOfWeek) == 1 ) {
var dataIndex = 6;
} else {
var dataIndex = dayOfWeek;
}
} else {
var dataIndex = dayOfWeek - parseInt(service.firstDayOfWeek);
}
var startTime = 'startTime'+i;
var endTime = 'endTime'+i;
startTime = service.businessHours[dataIndex][startTime];
endTime = service.businessHours[dataIndex][endTime];
if (startTime == ''|| endTime == '' || !service.businessHours[dataIndex].isActive)
continue;
var selectedDate = new Date(dateFromCalendar);
if ( getDateFormat(selectedDate) == getDateFormat(new Date()) && new Date().getTime() >= moment(dateFromCalendar + " " + startTime).valueOf()) {
startTime = moment(dateFromCalendar + " " + $serviceDatesContainer.data('corrent-time')).valueOf();
} else {
startTime = moment(dateFromCalendar + " " + startTime).valueOf();
}
endTime = moment(dateFromCalendar + " " + endTime).valueOf();
/**
* The loop is building the shift time until the the end time - service duration - time between services
*/
for ( ;startTime <=  (endTime-serviceDurationHourMili-serviceDurationMinutesMili-timeBetweenService)  ;  startTime += serviceInterval ) {
var newdate = new Date(startTime);
var newHour = newdate.getHours();
var newMinutes = newdate.getMinutes();
if (newHour.toString().length == 1 )
newHour = '0' + newHour;
if (newMinutes.toString().length == 1 )
newMinutes = '0' + newMinutes;
var fullHour = newHour+':'+newMinutes;
/*
* Prevent duplicated time because the customer can start second shift or third shift
* from the same time for example shift 1 is 08:00-12:00 and shift 2 from 12:00-16:00
* the 12:00 will be shown only 1 time
**/
var hourExists = false;
$.each($tableHour.find('option'),function(index) {
$optionVal = $(this).val();
if ($optionVal == fullHour) {
hourExists = true;
return false;
}
});
if (!hourExists)	$tableHour.append('<option value="'+newHour+':'+newMinutes+'">'+changeTimeFormat(service.timeFormat,newHour+':'+newMinutes)+'</option>');
else continue;
}
}
}
function changeTimeFormat( websiteTimeFormat, time ) {
switch( websiteTimeFormat ) {
case 'H:i':
return moment(time,"hmm").format("HH:mm");
break;
case 'h:i A':
return moment(time,"hmm").format("hh:mm A");
break;
}
}
function changeDateFormat( websiteDateFormat, date ) {
switch( websiteDateFormat ) {
case 'YYYY-mm-DD m/d/Y':
return moment(date,"mm DD YYYY").format("YYYY-mm-DD");
break;
case 'YYYY-mm-DD d/m/Y':
return moment(date,"DD mm YYYY").format("YYYY-mm-DD");
break;
}
}
function getDateFormat( DateChoosed ) {
var formattedDate = DateChoosed;
var day = formattedDate.getDate();
if ( day < 10 ) day = '0'+day;
var month = (formattedDate.getMonth() + 1);
if ( month < 10 ) month = '0'+month;
var year = formattedDate.getFullYear();
return year +'-'+ month  + '-'+ day;
}
function getAnotherDateFormat( DateChoosed ) {
var formattedDate = DateChoosed;
var day = formattedDate.getDate();
if ( day < 10 ) day = '0'+day;
var month = (formattedDate.getMonth() + 1);
if ( month < 10 ) month = '0'+month;
var year = formattedDate.getFullYear();
return month + '/' + day + '/' +year;
}
function getAnotherDateFormatDD_MM_YYYY( DateChoosed ) {
var formattedDate = DateChoosed;
var day = formattedDate.getDate();
if ( day < 10 ) day = '0'+day;
var month = (formattedDate.getMonth() + 1);
if ( month < 10 ) month = '0'+month;
var year = formattedDate.getFullYear();
return day + '/' + month + '/' +year;
}
function getHourFromDate( DateChoosed ) {
var hourFormat = DateChoosed;
var hours = hourFormat.getHours();
if ( hours < 10 ) hours = '0' + hours;
var minutes = hourFormat.getMinutes();
if ( minutes < 10 ) minutes = '0' + minutes;
miliSeconds = hourFormat.getMilliseconds();
if ( miliSeconds < 10 ) miliSeconds = '0' + miliSeconds;
return hours + ':' + minutes + ':' + miliSeconds;
}
function getFullTimeFormat( DateChoosed ) {
return getDateFormat(DateChoosed) + ' ' + getHourFromDate(DateChoosed);
}
function removeUnavailableHours( struct ) {
var $select = struct.$tableHour;
var selectedDate = struct.$calendar.val();
selectedDate = changeDateFormat( 'YYYY-mm-DD '+ struct.service.dateFormat, selectedDate );
var serviceDurationHour = struct.serviceDuration.substring(0,2);
var serviceDurationMin = struct.serviceDuration.substring(3,5);
var unavailableHours = struct.serviceInUse;
var timeBetweenService = parseInt(struct.timeBetweenService) * 60 * 1000;
var serviceDurationHourMili = parseInt(serviceDurationHour) * 60 * 60 * 1000;
var serviceDurationMinutesMili = parseInt(serviceDurationMin) * 60 * 1000;
var serviceType = struct.serviceType;
var maxParticipants = struct.maxParticipants;
var serviceDurationInMili = serviceDurationHourMili + serviceDurationMinutesMili + timeBetweenService;
if (serviceType == 'Classes') {
var hoursToRemove = new Array();
$.each($select.find('option'), function( index, option ) {
var schedualed = 0;
var timeFromOption = moment(selectedDate + ' ' + option.value).valueOf();
var dateFromPage = moment(selectedDate + ' ' + option.value).format("YYYY-MM-DD HH:mm:ss");
$.each(unavailableHours, function( index, date ) {
if (dateFromPage.valueOf() == date.orderDate.valueOf()) {
schedualed ++;
}
if (schedualed >= maxParticipants) {
var unavailableTime = moment(date.orderDate).valueOf();
if ( timeFromOption == unavailableTime ) {
hoursToRemove.push(option.value);
}
}
});
});
for (var i = 0; i < hoursToRemove.length; i++) {
var Hour = hoursToRemove[i].substring(0,2);
var Min = hoursToRemove[i].substring(3,5);
Hour = parseInt(Hour) * 60 * 60 * 1000;
Min = parseInt(Min) * 60 * 1000;
var unavailableTime = Hour + Min;
$.each($select.find('option'), function( index, option ) {
Hour = option.value.substring(0,2);
Min = option.value.substring(3,5);
Hour = parseInt(Hour) * 60 * 60 * 1000;
Min = parseInt(Min) * 60 * 1000;
var timeFromOption = Hour + Min;
if ((timeFromOption >= unavailableTime && timeFromOption < (unavailableTime + serviceDurationInMili))
|| (timeFromOption > (unavailableTime - serviceDurationInMili) && timeFromOption < unavailableTime)) {
$(option).remove();
}
});
}
} else {
$.each(unavailableHours,function( index, date) {
var unavailableTime = moment(date.orderDate).valueOf();
$.each($select.find('option'), function( index, option) {
var timeFromOption = moment(selectedDate + ' ' + option.value).valueOf();
if ((timeFromOption >= unavailableTime && timeFromOption < (unavailableTime + serviceDurationInMili))
|| (timeFromOption > (unavailableTime - serviceDurationInMili) && timeFromOption < unavailableTime)) {
$(option).remove();
}
});
});
}
}
/**
* Update discount
*/
function updateDiscount(data) {
$couponType = $('.couponType');
$couponCode = $('.couponCode');
$validCoupon = $('.valid-coupon');
$invalidCoupon = $('.invalid-coupon');
$couponDiscount = $('.couponDiscount');
$validCoupon.addClass('hidden');
$invalidCoupon.addClass('hidden');
if ( data.valid === 'true') {
$validCoupon.removeClass('hidden');
$('.discount-text').removeClass('hidden');
$couponCode.val(data.couponCode);
$couponDiscount.val(data.discount);
$couponType.val(data.type);
var totalPrice = parseFloat($('#productPrice').data('price'));
var discount = parseFloat(calculateCouponDiscount(totalPrice,$couponDiscount,$couponType));
if ( $.isNumeric(discount) && discount > 0 ) {
$('.bookingSubtotal [data-type="price"]').html(totalPrice.toFixed(2));
$('.bookingCoupon [data-type="price"]').html(discount.toFixed(2));
totalPrice = parseFloat(totalPrice) - parseFloat(discount);
$('#productPrice [data-type="price"]').html(totalPrice.toFixed(2));
}
} else {
$invalidCoupon.removeClass('hidden');
}
}
}/*!
* Datepicker for Bootstrap v1.7.1 (https://github.com/uxsolutions/bootstrap-datepicker)
*
* Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
*/
(function(factory){
if (typeof define === "function" && define.amd) {
define(["jquery"], factory);
} else if (typeof exports === 'object') {
factory(require('jquery'));
} else {
factory(jQuery);
}
}(function($, undefined){
function UTCDate(){
return new Date(Date.UTC.apply(Date, arguments));
}
function UTCToday(){
var today = new Date();
return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
}
function isUTCEquals(date1, date2) {
return (
date1.getUTCFullYear() === date2.getUTCFullYear() &&
date1.getUTCMonth() === date2.getUTCMonth() &&
date1.getUTCDate() === date2.getUTCDate()
);
}
function alias(method, deprecationMsg){
return function(){
if (deprecationMsg !== undefined) {
$.fn.datepicker.deprecated(deprecationMsg);
}
return this[method].apply(this, arguments);
};
}
function isValidDate(d) {
return d && !isNaN(d.getTime());
}
var DateArray = (function(){
var extras = {
get: function(i){
return this.slice(i)[0];
},
contains: function(d){
var val = d && d.valueOf();
for (var i=0, l=this.length; i < l; i++)
if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 1000*60*60*24)
return i;
return -1;
},
remove: function(i){
this.splice(i,1);
},
replace: function(new_array){
if (!new_array)
return;
if (!$.isArray(new_array))
new_array = [new_array];
this.clear();
this.push.apply(this, new_array);
},
clear: function(){
this.length = 0;
},
copy: function(){
var a = new DateArray();
a.replace(this);
return a;
}
};
return function(){
var a = [];
a.push.apply(a, arguments);
$.extend(a, extras);
return a;
};
})();
var Datepicker = function(element, options){
$.data(element, 'datepicker', this);
this._process_options(options);
this.dates = new DateArray();
this.viewDate = this.o.defaultViewDate;
this.focusDate = null;
this.element = $(element);
this.isInput = this.element.is('input');
this.inputField = this.isInput ? this.element : this.element.find('input');
this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
if (this.component && this.component.length === 0)
this.component = false;
this.isInline = !this.component && this.element.is('div');
this.picker = $(DPGlobal.template);
if (this._check_template(this.o.templates.leftArrow)) {
this.picker.find('.prev').html(this.o.templates.leftArrow);
}
if (this._check_template(this.o.templates.rightArrow)) {
this.picker.find('.next').html(this.o.templates.rightArrow);
}
this._buildEvents();
this._attachEvents();
if (this.isInline){
this.picker.addClass('datepicker-inline').appendTo(this.element);
}
else {
this.picker.addClass('datepicker-dropdown dropdown-menu');
}
if (this.o.rtl){
this.picker.addClass('datepicker-rtl');
}
if (this.o.calendarWeeks) {
this.picker.find('.datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear')
.attr('colspan', function(i, val){
return Number(val) + 1;
});
}
this._process_options({
startDate: this._o.startDate,
endDate: this._o.endDate,
daysOfWeekDisabled: this.o.daysOfWeekDisabled,
daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
datesDisabled: this.o.datesDisabled
});
this._allow_update = false;
this.setViewMode(this.o.startView);
this._allow_update = true;
this.fillDow();
this.fillMonths();
this.update();
if (this.isInline){
this.show();
}
};
Datepicker.prototype = {
constructor: Datepicker,
_resolveViewName: function(view){
$.each(DPGlobal.viewModes, function(i, viewMode){
if (view === i || $.inArray(view, viewMode.names) !== -1){
view = i;
return false;
}
});
return view;
},
_resolveDaysOfWeek: function(daysOfWeek){
if (!$.isArray(daysOfWeek))
daysOfWeek = daysOfWeek.split(/[,\s]*/);
return $.map(daysOfWeek, Number);
},
_check_template: function(tmp){
try {
if (tmp === undefined || tmp === "") {
return false;
}
if ((tmp.match(/[<>]/g) || []).length <= 0) {
return true;
}
var jDom = $(tmp);
return jDom.length > 0;
}
catch (ex) {
return false;
}
},
_process_options: function(opts){
this._o = $.extend({}, this._o, opts);
var o = this.o = $.extend({}, this._o);
var lang = o.language;
if (!dates[lang]){
lang = lang.split('-')[0];
if (!dates[lang])
lang = defaults.language;
}
o.language = lang;
o.startView = this._resolveViewName(o.startView);
o.minViewMode = this._resolveViewName(o.minViewMode);
o.maxViewMode = this._resolveViewName(o.maxViewMode);
o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView));
if (o.multidate !== true){
o.multidate = Number(o.multidate) || false;
if (o.multidate !== false)
o.multidate = Math.max(0, o.multidate);
}
o.multidateSeparator = String(o.multidateSeparator);
o.weekStart %= 7;
o.weekEnd = (o.weekStart + 6) % 7;
var format = DPGlobal.parseFormat(o.format);
if (o.startDate !== -Infinity){
if (!!o.startDate){
if (o.startDate instanceof Date)
o.startDate = this._local_to_utc(this._zero_time(o.startDate));
else
o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
}
else {
o.startDate = -Infinity;
}
}
if (o.endDate !== Infinity){
if (!!o.endDate){
if (o.endDate instanceof Date)
o.endDate = this._local_to_utc(this._zero_time(o.endDate));
else
o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
}
else {
o.endDate = Infinity;
}
}
o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled||[]);
o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted||[]);
o.datesDisabled = o.datesDisabled||[];
if (!$.isArray(o.datesDisabled)) {
o.datesDisabled = o.datesDisabled.split(',');
}
o.datesDisabled = $.map(o.datesDisabled, function(d){
return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
});
var plc = String(o.orientation).toLowerCase().split(/\s+/g),
_plc = o.orientation.toLowerCase();
plc = $.grep(plc, function(word){
return /^auto|left|right|top|bottom$/.test(word);
});
o.orientation = {x: 'auto', y: 'auto'};
if (!_plc || _plc === 'auto')
; // no action
else if (plc.length === 1){
switch (plc[0]){
case 'top':
case 'bottom':
o.orientation.y = plc[0];
break;
case 'left':
case 'right':
o.orientation.x = plc[0];
break;
}
}
else {
_plc = $.grep(plc, function(word){
return /^left|right$/.test(word);
});
o.orientation.x = _plc[0] || 'auto';
_plc = $.grep(plc, function(word){
return /^top|bottom$/.test(word);
});
o.orientation.y = _plc[0] || 'auto';
}
if (o.defaultViewDate instanceof Date || typeof o.defaultViewDate === 'string') {
o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear);
} else if (o.defaultViewDate) {
var year = o.defaultViewDate.year || new Date().getFullYear();
var month = o.defaultViewDate.month || 0;
var day = o.defaultViewDate.day || 1;
o.defaultViewDate = UTCDate(year, month, day);
} else {
o.defaultViewDate = UTCToday();
}
},
_events: [],
_secondaryEvents: [],
_applyEvents: function(evs){
for (var i=0, el, ch, ev; i < evs.length; i++){
el = evs[i][0];
if (evs[i].length === 2){
ch = undefined;
ev = evs[i][1];
} else if (evs[i].length === 3){
ch = evs[i][1];
ev = evs[i][2];
}
el.on(ev, ch);
}
},
_unapplyEvents: function(evs){
for (var i=0, el, ev, ch; i < evs.length; i++){
el = evs[i][0];
if (evs[i].length === 2){
ch = undefined;
ev = evs[i][1];
} else if (evs[i].length === 3){
ch = evs[i][1];
ev = evs[i][2];
}
el.off(ev, ch);
}
},
_buildEvents: function(){
var events = {
keyup: $.proxy(function(e){
if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
this.update();
}, this),
keydown: $.proxy(this.keydown, this),
paste: $.proxy(this.paste, this)
};
if (this.o.showOnFocus === true) {
events.focus = $.proxy(this.show, this);
}
if (this.isInput) { // single input
this._events = [
[this.element, events]
];
}
else if (this.component && this.inputField.length) {
this._events = [
[this.inputField, events],
[this.component, {
click: $.proxy(this.show, this)
}]
];
}
else {
this._events = [
[this.element, {
click: $.proxy(this.show, this),
keydown: $.proxy(this.keydown, this)
}]
];
}
this._events.push(
[this.element, '*', {
blur: $.proxy(function(e){
this._focused_from = e.target;
}, this)
}],
[this.element, {
blur: $.proxy(function(e){
this._focused_from = e.target;
}, this)
}]
);
if (this.o.immediateUpdates) {
this._events.push([this.element, {
'changeYear changeMonth': $.proxy(function(e){
this.update(e.date);
}, this)
}]);
}
this._secondaryEvents = [
[this.picker, {
click: $.proxy(this.click, this)
}],
[this.picker, '.prev, .next', {
click: $.proxy(this.navArrowsClick, this)
}],
[this.picker, '.day:not(.disabled)', {
click: $.proxy(this.dayCellClick, this)
}],
[$(window), {
resize: $.proxy(this.place, this)
}],
[$(document), {
'mousedown touchstart': $.proxy(function(e){
if (!(
this.element.is(e.target) ||
this.element.find(e.target).length ||
this.picker.is(e.target) ||
this.picker.find(e.target).length ||
this.isInline
)){
this.hide();
}
}, this)
}]
];
},
_attachEvents: function(){
this._detachEvents();
this._applyEvents(this._events);
},
_detachEvents: function(){
this._unapplyEvents(this._events);
},
_attachSecondaryEvents: function(){
this._detachSecondaryEvents();
this._applyEvents(this._secondaryEvents);
},
_detachSecondaryEvents: function(){
this._unapplyEvents(this._secondaryEvents);
},
_trigger: function(event, altdate){
var date = altdate || this.dates.get(-1),
local_date = this._utc_to_local(date);
this.element.trigger({
type: event,
date: local_date,
viewMode: this.viewMode,
dates: $.map(this.dates, this._utc_to_local),
format: $.proxy(function(ix, format){
if (arguments.length === 0){
ix = this.dates.length - 1;
format = this.o.format;
} else if (typeof ix === 'string'){
format = ix;
ix = this.dates.length - 1;
}
format = format || this.o.format;
var date = this.dates.get(ix);
return DPGlobal.formatDate(date, format, this.o.language);
}, this)
});
},
show: function(){
if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
return;
if (!this.isInline)
this.picker.appendTo(this.o.container);
this.place();
this.picker.show();
this._attachSecondaryEvents();
this._trigger('show');
if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
$(this.element).blur();
}
return this;
},
hide: function(){
if (this.isInline || !this.picker.is(':visible'))
return this;
this.focusDate = null;
this.picker.hide().detach();
this._detachSecondaryEvents();
this.setViewMode(this.o.startView);
if (this.o.forceParse && this.inputField.val())
this.setValue();
this._trigger('hide');
return this;
},
destroy: function(){
this.hide();
this._detachEvents();
this._detachSecondaryEvents();
this.picker.remove();
delete this.element.data().datepicker;
if (!this.isInput){
delete this.element.data().date;
}
return this;
},
paste: function(e){
var dateString;
if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types
&& $.inArray('text/plain', e.originalEvent.clipboardData.types) !== -1) {
dateString = e.originalEvent.clipboardData.getData('text/plain');
} else if (window.clipboardData) {
dateString = window.clipboardData.getData('Text');
} else {
return;
}
this.setDate(dateString);
this.update();
e.preventDefault();
},
_utc_to_local: function(utc){
if (!utc) {
return utc;
}
var local = new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));
if (local.getTimezoneOffset() !== utc.getTimezoneOffset()) {
local = new Date(utc.getTime() + (local.getTimezoneOffset() * 60000));
}
return local;
},
_local_to_utc: function(local){
return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
},
_zero_time: function(local){
return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
},
_zero_utc_time: function(utc){
return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
},
getDates: function(){
return $.map(this.dates, this._utc_to_local);
},
getUTCDates: function(){
return $.map(this.dates, function(d){
return new Date(d);
});
},
getDate: function(){
return this._utc_to_local(this.getUTCDate());
},
getUTCDate: function(){
var selected_date = this.dates.get(-1);
if (selected_date !== undefined) {
return new Date(selected_date);
} else {
return null;
}
},
clearDates: function(){
this.inputField.val('');
this.update();
this._trigger('changeDate');
if (this.o.autoclose) {
this.hide();
}
},
setDates: function(){
var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
this.update.apply(this, args);
this._trigger('changeDate');
this.setValue();
return this;
},
setUTCDates: function(){
var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
this.setDates.apply(this, $.map(args, this._utc_to_local));
return this;
},
setDate: alias('setDates'),
setUTCDate: alias('setUTCDates'),
remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead'),
setValue: function(){
var formatted = this.getFormattedDate();
this.inputField.val(formatted);
return this;
},
getFormattedDate: function(format){
if (format === undefined)
format = this.o.format;
var lang = this.o.language;
return $.map(this.dates, function(d){
return DPGlobal.formatDate(d, format, lang);
}).join(this.o.multidateSeparator);
},
getStartDate: function(){
return this.o.startDate;
},
setStartDate: function(startDate){
this._process_options({startDate: startDate});
this.update();
this.updateNavArrows();
return this;
},
getEndDate: function(){
return this.o.endDate;
},
setEndDate: function(endDate){
this._process_options({endDate: endDate});
this.update();
this.updateNavArrows();
return this;
},
setDaysOfWeekDisabled: function(daysOfWeekDisabled){
this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
this.update();
return this;
},
setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){
this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});
this.update();
return this;
},
setDatesDisabled: function(datesDisabled){
this._process_options({datesDisabled: datesDisabled});
this.update();
return this;
},
place: function(){
if (this.isInline)
return this;
var calendarWidth = this.picker.outerWidth(),
calendarHeight = this.picker.outerHeight(),
visualPadding = 10,
container = $(this.o.container),
windowWidth = container.width(),
scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
appendOffset = container.offset();
var parentsZindex = [0];
this.element.parents().each(function(){
var itemZIndex = $(this).css('z-index');
if (itemZIndex !== 'auto' && Number(itemZIndex) !== 0) parentsZindex.push(Number(itemZIndex));
});
var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
var offset = this.component ? this.component.parent().offset() : this.element.offset();
var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
var left = offset.left - appendOffset.left + parseInt($('body').css('margin-left'),10) + parseInt($('body').css('margin-right'),10);
var top = offset.top - appendOffset.top + parseInt($('body').css('margin-top'),10);
if (this.o.container !== 'body') {
top += scrollTop;
}
this.picker.removeClass(
'datepicker-orient-top datepicker-orient-bottom '+
'datepicker-orient-right datepicker-orient-left'
);
if (this.o.orientation.x !== 'auto'){
this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
if (this.o.orientation.x === 'right')
left -= calendarWidth - width;
}
else {
if (offset.left < 0) {
this.picker.addClass('datepicker-orient-left');
left -= offset.left - visualPadding;
} else if (left + calendarWidth > windowWidth) {
this.picker.addClass('datepicker-orient-right');
left += width - calendarWidth;
} else {
if (this.o.rtl) {
this.picker.addClass('datepicker-orient-right');
} else {
this.picker.addClass('datepicker-orient-left');
}
}
}
var yorient = this.o.orientation.y,
top_overflow;
if (yorient === 'auto'){
top_overflow = -scrollTop + top - calendarHeight;
yorient = top_overflow < 0 ? 'bottom' : 'top';
}
this.picker.addClass('datepicker-orient-' + yorient);
if (yorient === 'top')
top -= calendarHeight + parseInt(this.picker.css('padding-top'));
else
top += height;
if (this.o.rtl) {
var right = windowWidth - (left + width);
this.picker.css({
top: top,
right: right,
zIndex: zIndex
});
} else {
this.picker.css({
top: top,
left: left,
zIndex: zIndex
});
}
return this;
},
_allow_update: true,
update: function(){
if (!this._allow_update)
return this;
var oldDates = this.dates.copy(),
dates = [],
fromArgs = false;
if (arguments.length){
$.each(arguments, $.proxy(function(i, date){
if (date instanceof Date)
date = this._local_to_utc(date);
dates.push(date);
}, this));
fromArgs = true;
} else {
dates = this.isInput
? this.element.val()
: this.element.data('date') || this.inputField.val();
if (dates && this.o.multidate)
dates = dates.split(this.o.multidateSeparator);
else
dates = [dates];
delete this.element.data().date;
}
dates = $.map(dates, $.proxy(function(date){
return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
}, this));
dates = $.grep(dates, $.proxy(function(date){
return (
!this.dateWithinRange(date) ||
!date
);
}, this), true);
this.dates.replace(dates);
if (this.o.updateViewDate) {
if (this.dates.length)
this.viewDate = new Date(this.dates.get(-1));
else if (this.viewDate < this.o.startDate)
this.viewDate = new Date(this.o.startDate);
else if (this.viewDate > this.o.endDate)
this.viewDate = new Date(this.o.endDate);
else
this.viewDate = this.o.defaultViewDate;
}
if (fromArgs){
this.setValue();
this.element.change();
}
else if (this.dates.length){
if (String(oldDates) !== String(this.dates) && fromArgs) {
this._trigger('changeDate');
this.element.change();
}
}
if (!this.dates.length && oldDates.length) {
this._trigger('clearDate');
this.element.change();
}
this.fill();
return this;
},
fillDow: function(){
if (this.o.showWeekDays) {
var dowCnt = this.o.weekStart,
html = '<tr>';
if (this.o.calendarWeeks){
html += '<th class="cw">&#160;</th>';
}
while (dowCnt < this.o.weekStart + 7){
html += '<th class="dow';
if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) !== -1)
html += ' disabled';
html += '">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
}
html += '</tr>';
this.picker.find('.datepicker-days thead').append(html);
}
},
fillMonths: function(){
var localDate = this._utc_to_local(this.viewDate);
var html = '';
var focused;
for (var i = 0; i < 12; i++){
focused = localDate && localDate.getMonth() === i ? ' focused' : '';
html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i] + '</span>';
}
this.picker.find('.datepicker-months td').html(html);
},
setRange: function(range){
if (!range || !range.length)
delete this.range;
else
this.range = $.map(range, function(d){
return d.valueOf();
});
this.fill();
},
getClassNames: function(date){
var cls = [],
year = this.viewDate.getUTCFullYear(),
month = this.viewDate.getUTCMonth(),
today = UTCToday();
if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
cls.push('old');
} else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
cls.push('new');
}
if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
cls.push('focused');
if (this.o.todayHighlight && isUTCEquals(date, today)) {
cls.push('today');
}
if (this.dates.contains(date) !== -1)
cls.push('active');
if (!this.dateWithinRange(date)){
cls.push('disabled');
}
if (this.dateIsDisabled(date)){
cls.push('disabled', 'disabled-date');
}
if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){
cls.push('highlighted');
}
if (this.range){
if (date > this.range[0] && date < this.range[this.range.length-1]){
cls.push('range');
}
if ($.inArray(date.valueOf(), this.range) !== -1){
cls.push('selected');
}
if (date.valueOf() === this.range[0]){
cls.push('range-start');
}
if (date.valueOf() === this.range[this.range.length-1]){
cls.push('range-end');
}
}
return cls;
},
_fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn){
var html = '';
var step = factor / 10;
var view = this.picker.find(selector);
var startVal = Math.floor(year / factor) * factor;
var endVal = startVal + step * 9;
var focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step;
var selected = $.map(this.dates, function(d){
return Math.floor(d.getUTCFullYear() / step) * step;
});
var classes, tooltip, before;
for (var currVal = startVal - step; currVal <= endVal + step; currVal += step) {
classes = [cssClass];
tooltip = null;
if (currVal === startVal - step) {
classes.push('old');
} else if (currVal === endVal + step) {
classes.push('new');
}
if ($.inArray(currVal, selected) !== -1) {
classes.push('active');
}
if (currVal < startYear || currVal > endYear) {
classes.push('disabled');
}
if (currVal === focusedVal) {
classes.push('focused');
}
if (beforeFn !== $.noop) {
before = beforeFn(new Date(currVal, 0, 1));
if (before === undefined) {
before = {};
} else if (typeof before === 'boolean') {
before = {enabled: before};
} else if (typeof before === 'string') {
before = {classes: before};
}
if (before.enabled === false) {
classes.push('disabled');
}
if (before.classes) {
classes = classes.concat(before.classes.split(/\s+/));
}
if (before.tooltip) {
tooltip = before.tooltip;
}
}
html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + currVal + '</span>';
}
view.find('.datepicker-switch').text(startVal + '-' + endVal);
view.find('td').html(html);
},
fill: function(){
var d = new Date(this.viewDate),
year = d.getUTCFullYear(),
month = d.getUTCMonth(),
startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
todaytxt = dates[this.o.language].today || dates['en'].today || '',
cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
tooltip,
before;
if (isNaN(year) || isNaN(month))
return;
this.picker.find('.datepicker-days .datepicker-switch')
.text(DPGlobal.formatDate(d, titleFormat, this.o.language));
this.picker.find('tfoot .today')
.text(todaytxt)
.css('display', this.o.todayBtn === true || this.o.todayBtn === 'linked' ? 'table-cell' : 'none');
this.picker.find('tfoot .clear')
.text(cleartxt)
.css('display', this.o.clearBtn === true ? 'table-cell' : 'none');
this.picker.find('thead .datepicker-title')
.text(this.o.title)
.css('display', typeof this.o.title === 'string' && this.o.title !== '' ? 'table-cell' : 'none');
this.updateNavArrows();
this.fillMonths();
var prevMonth = UTCDate(year, month, 0),
day = prevMonth.getUTCDate();
prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
var nextMonth = new Date(prevMonth);
if (prevMonth.getUTCFullYear() < 100){
nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
}
nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
nextMonth = nextMonth.valueOf();
var html = [];
var weekDay, clsName;
while (prevMonth.valueOf() < nextMonth){
weekDay = prevMonth.getUTCDay();
if (weekDay === this.o.weekStart){
html.push('<tr>');
if (this.o.calendarWeeks){
var
ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5),
th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
calWeek = (th - yth) / 864e5 / 7 + 1;
html.push('<td class="cw">'+ calWeek +'</td>');
}
}
clsName = this.getClassNames(prevMonth);
clsName.push('day');
var content = prevMonth.getUTCDate();
if (this.o.beforeShowDay !== $.noop){
before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
if (before === undefined)
before = {};
else if (typeof before === 'boolean')
before = {enabled: before};
else if (typeof before === 'string')
before = {classes: before};
if (before.enabled === false)
clsName.push('disabled');
if (before.classes)
clsName = clsName.concat(before.classes.split(/\s+/));
if (before.tooltip)
tooltip = before.tooltip;
if (before.content)
content = before.content;
}
if ($.isFunction($.uniqueSort)) {
clsName = $.uniqueSort(clsName);
} else {
clsName = $.unique(clsName);
}
html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + ' data-date="' + prevMonth.getTime().toString() + '">' + content + '</td>');
tooltip = null;
if (weekDay === this.o.weekEnd){
html.push('</tr>');
}
prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
}
this.picker.find('.datepicker-days tbody').html(html.join(''));
var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
var months = this.picker.find('.datepicker-months')
.find('.datepicker-switch')
.text(this.o.maxViewMode < 2 ? monthsTitle : year)
.end()
.find('tbody span').removeClass('active');
$.each(this.dates, function(i, d){
if (d.getUTCFullYear() === year)
months.eq(d.getUTCMonth()).addClass('active');
});
if (year < startYear || year > endYear){
months.addClass('disabled');
}
if (year === startYear){
months.slice(0, startMonth).addClass('disabled');
}
if (year === endYear){
months.slice(endMonth+1).addClass('disabled');
}
if (this.o.beforeShowMonth !== $.noop){
var that = this;
$.each(months, function(i, month){
var moDate = new Date(year, i, 1);
var before = that.o.beforeShowMonth(moDate);
if (before === undefined)
before = {};
else if (typeof before === 'boolean')
before = {enabled: before};
else if (typeof before === 'string')
before = {classes: before};
if (before.enabled === false && !$(month).hasClass('disabled'))
$(month).addClass('disabled');
if (before.classes)
$(month).addClass(before.classes);
if (before.tooltip)
$(month).prop('title', before.tooltip);
});
}
this._fill_yearsView(
'.datepicker-years',
'year',
10,
year,
startYear,
endYear,
this.o.beforeShowYear
);
this._fill_yearsView(
'.datepicker-decades',
'decade',
100,
year,
startYear,
endYear,
this.o.beforeShowDecade
);
this._fill_yearsView(
'.datepicker-centuries',
'century',
1000,
year,
startYear,
endYear,
this.o.beforeShowCentury
);
},
updateNavArrows: function(){
if (!this._allow_update)
return;
var d = new Date(this.viewDate),
year = d.getUTCFullYear(),
month = d.getUTCMonth(),
startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
prevIsDisabled,
nextIsDisabled,
factor = 1;
switch (this.viewMode){
case 0:
prevIsDisabled = year <= startYear && month <= startMonth;
nextIsDisabled = year >= endYear && month >= endMonth;
break;
case 4:
factor *= 10;
/* falls through */
case 3:
factor *= 10;
/* falls through */
case 2:
factor *= 10;
/* falls through */
case 1:
prevIsDisabled = Math.floor(year / factor) * factor <= startYear;
nextIsDisabled = Math.floor(year / factor) * factor + factor >= endYear;
break;
}
this.picker.find('.prev').toggleClass('disabled', prevIsDisabled);
this.picker.find('.next').toggleClass('disabled', nextIsDisabled);
},
click: function(e){
e.preventDefault();
e.stopPropagation();
var target, dir, day, year, month;
target = $(e.target);
if (target.hasClass('datepicker-switch') && this.viewMode !== this.o.maxViewMode){
this.setViewMode(this.viewMode + 1);
}
if (target.hasClass('today') && !target.hasClass('day')){
this.setViewMode(0);
this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
}
if (target.hasClass('clear')){
this.clearDates();
}
if (!target.hasClass('disabled')){
if (target.hasClass('month')
|| target.hasClass('year')
|| target.hasClass('decade')
|| target.hasClass('century')) {
this.viewDate.setUTCDate(1);
day = 1;
if (this.viewMode === 1){
month = target.parent().find('span').index(target);
year = this.viewDate.getUTCFullYear();
this.viewDate.setUTCMonth(month);
} else {
month = 0;
year = Number(target.text());
this.viewDate.setUTCFullYear(year);
}
this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate);
if (this.viewMode === this.o.minViewMode){
this._setDate(UTCDate(year, month, day));
} else {
this.setViewMode(this.viewMode - 1);
this.fill();
}
}
}
if (this.picker.is(':visible') && this._focused_from){
this._focused_from.focus();
}
delete this._focused_from;
},
dayCellClick: function(e){
var $target = $(e.currentTarget);
var timestamp = $target.data('date');
var date = new Date(timestamp);
if (this.o.updateViewDate) {
if (date.getUTCFullYear() !== this.viewDate.getUTCFullYear()) {
this._trigger('changeYear', this.viewDate);
}
if (date.getUTCMonth() !== this.viewDate.getUTCMonth()) {
this._trigger('changeMonth', this.viewDate);
}
}
this._setDate(date);
},
navArrowsClick: function(e){
var $target = $(e.currentTarget);
var dir = $target.hasClass('prev') ? -1 : 1;
if (this.viewMode !== 0){
dir *= DPGlobal.viewModes[this.viewMode].navStep * 12;
}
this.viewDate = this.moveMonth(this.viewDate, dir);
this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate);
this.fill();
},
_toggle_multidate: function(date){
var ix = this.dates.contains(date);
if (!date){
this.dates.clear();
}
if (ix !== -1){
if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
this.dates.remove(ix);
}
} else if (this.o.multidate === false) {
this.dates.clear();
this.dates.push(date);
}
else {
this.dates.push(date);
}
if (typeof this.o.multidate === 'number')
while (this.dates.length > this.o.multidate)
this.dates.remove(0);
},
_setDate: function(date, which){
if (!which || which === 'date')
this._toggle_multidate(date && new Date(date));
if ((!which && this.o.updateViewDate) || which === 'view')
this.viewDate = date && new Date(date);
this.fill();
this.setValue();
if (!which || which !== 'view') {
this._trigger('changeDate');
}
this.inputField.trigger('change');
if (this.o.autoclose && (!which || which === 'date')){
this.hide();
}
},
moveDay: function(date, dir){
var newDate = new Date(date);
newDate.setUTCDate(date.getUTCDate() + dir);
return newDate;
},
moveWeek: function(date, dir){
return this.moveDay(date, dir * 7);
},
moveMonth: function(date, dir){
if (!isValidDate(date))
return this.o.defaultViewDate;
if (!dir)
return date;
var new_date = new Date(date.valueOf()),
day = new_date.getUTCDate(),
month = new_date.getUTCMonth(),
mag = Math.abs(dir),
new_month, test;
dir = dir > 0 ? 1 : -1;
if (mag === 1){
test = dir === -1
? function(){
return new_date.getUTCMonth() === month;
}
: function(){
return new_date.getUTCMonth() !== new_month;
};
new_month = month + dir;
new_date.setUTCMonth(new_month);
new_month = (new_month + 12) % 12;
}
else {
for (var i=0; i < mag; i++)
new_date = this.moveMonth(new_date, dir);
new_month = new_date.getUTCMonth();
new_date.setUTCDate(day);
test = function(){
return new_month !== new_date.getUTCMonth();
};
}
while (test()){
new_date.setUTCDate(--day);
new_date.setUTCMonth(new_month);
}
return new_date;
},
moveYear: function(date, dir){
return this.moveMonth(date, dir*12);
},
moveAvailableDate: function(date, dir, fn){
do {
date = this[fn](date, dir);
if (!this.dateWithinRange(date))
return false;
fn = 'moveDay';
}
while (this.dateIsDisabled(date));
return date;
},
weekOfDateIsDisabled: function(date){
return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
},
dateIsDisabled: function(date){
return (
this.weekOfDateIsDisabled(date) ||
$.grep(this.o.datesDisabled, function(d){
return isUTCEquals(date, d);
}).length > 0
);
},
dateWithinRange: function(date){
return date >= this.o.startDate && date <= this.o.endDate;
},
keydown: function(e){
if (!this.picker.is(':visible')){
if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
this.show();
e.stopPropagation();
}
return;
}
var dateChanged = false,
dir, newViewDate,
focusDate = this.focusDate || this.viewDate;
switch (e.keyCode){
case 27: // escape
if (this.focusDate){
this.focusDate = null;
this.viewDate = this.dates.get(-1) || this.viewDate;
this.fill();
}
else
this.hide();
e.preventDefault();
e.stopPropagation();
break;
case 37: // left
case 38: // up
case 39: // right
case 40: // down
if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
break;
dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
if (this.viewMode === 0) {
if (e.ctrlKey){
newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
if (newViewDate)
this._trigger('changeYear', this.viewDate);
} else if (e.shiftKey){
newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
if (newViewDate)
this._trigger('changeMonth', this.viewDate);
} else if (e.keyCode === 37 || e.keyCode === 39){
newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
} else if (!this.weekOfDateIsDisabled(focusDate)){
newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
}
} else if (this.viewMode === 1) {
if (e.keyCode === 38 || e.keyCode === 40) {
dir = dir * 4;
}
newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
} else if (this.viewMode === 2) {
if (e.keyCode === 38 || e.keyCode === 40) {
dir = dir * 4;
}
newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
}
if (newViewDate){
this.focusDate = this.viewDate = newViewDate;
this.setValue();
this.fill();
e.preventDefault();
}
break;
case 13: // enter
if (!this.o.forceParse)
break;
focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
if (this.o.keyboardNavigation) {
this._toggle_multidate(focusDate);
dateChanged = true;
}
this.focusDate = null;
this.viewDate = this.dates.get(-1) || this.viewDate;
this.setValue();
this.fill();
if (this.picker.is(':visible')){
e.preventDefault();
e.stopPropagation();
if (this.o.autoclose)
this.hide();
}
break;
case 9: // tab
this.focusDate = null;
this.viewDate = this.dates.get(-1) || this.viewDate;
this.fill();
this.hide();
break;
}
if (dateChanged){
if (this.dates.length)
this._trigger('changeDate');
else
this._trigger('clearDate');
this.inputField.trigger('change');
}
},
setViewMode: function(viewMode){
this.viewMode = viewMode;
this.picker
.children('div')
.hide()
.filter('.datepicker-' + DPGlobal.viewModes[this.viewMode].clsName)
.show();
this.updateNavArrows();
this._trigger('changeViewMode', new Date(this.viewDate));
}
};
var DateRangePicker = function(element, options){
$.data(element, 'datepicker', this);
this.element = $(element);
this.inputs = $.map(options.inputs, function(i){
return i.jquery ? i[0] : i;
});
delete options.inputs;
this.keepEmptyValues = options.keepEmptyValues;
delete options.keepEmptyValues;
datepickerPlugin.call($(this.inputs), options)
.on('changeDate', $.proxy(this.dateUpdated, this));
this.pickers = $.map(this.inputs, function(i){
return $.data(i, 'datepicker');
});
this.updateDates();
};
DateRangePicker.prototype = {
updateDates: function(){
this.dates = $.map(this.pickers, function(i){
return i.getUTCDate();
});
this.updateRanges();
},
updateRanges: function(){
var range = $.map(this.dates, function(d){
return d.valueOf();
});
$.each(this.pickers, function(i, p){
p.setRange(range);
});
},
dateUpdated: function(e){
if (this.updating)
return;
this.updating = true;
var dp = $.data(e.target, 'datepicker');
if (dp === undefined) {
return;
}
var new_date = dp.getUTCDate(),
keep_empty_values = this.keepEmptyValues,
i = $.inArray(e.target, this.inputs),
j = i - 1,
k = i + 1,
l = this.inputs.length;
if (i === -1)
return;
$.each(this.pickers, function(i, p){
if (!p.getUTCDate() && (p === dp || !keep_empty_values))
p.setUTCDate(new_date);
});
if (new_date < this.dates[j]){
while (j >= 0 && new_date < this.dates[j]){
this.pickers[j--].setUTCDate(new_date);
}
} else if (new_date > this.dates[k]){
while (k < l && new_date > this.dates[k]){
this.pickers[k++].setUTCDate(new_date);
}
}
this.updateDates();
delete this.updating;
},
destroy: function(){
$.map(this.pickers, function(p){ p.destroy(); });
$(this.inputs).off('changeDate', this.dateUpdated);
delete this.element.data().datepicker;
},
remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead')
};
function opts_from_el(el, prefix){
var data = $(el).data(),
out = {}, inkey,
replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
prefix = new RegExp('^' + prefix.toLowerCase());
function re_lower(_,a){
return a.toLowerCase();
}
for (var key in data)
if (prefix.test(key)){
inkey = key.replace(replace, re_lower);
out[inkey] = data[key];
}
return out;
}
function opts_from_locale(lang){
var out = {};
if (!dates[lang]){
lang = lang.split('-')[0];
if (!dates[lang])
return;
}
var d = dates[lang];
$.each(locale_opts, function(i,k){
if (k in d)
out[k] = d[k];
});
return out;
}
var old = $.fn.datepicker;
var datepickerPlugin = function(option){
var args = Array.apply(null, arguments);
args.shift();
var internal_return;
this.each(function(){
var $this = $(this),
data = $this.data('datepicker'),
options = typeof option === 'object' && option;
if (!data){
var elopts = opts_from_el(this, 'date'),
xopts = $.extend({}, defaults, elopts, options),
locopts = opts_from_locale(xopts.language),
opts = $.extend({}, defaults, locopts, elopts, options);
if ($this.hasClass('input-daterange') || opts.inputs){
$.extend(opts, {
inputs: opts.inputs || $this.find('input').toArray()
});
data = new DateRangePicker(this, opts);
}
else {
data = new Datepicker(this, opts);
}
$this.data('datepicker', data);
}
if (typeof option === 'string' && typeof data[option] === 'function'){
internal_return = data[option].apply(data, args);
}
});
if (
internal_return === undefined ||
internal_return instanceof Datepicker ||
internal_return instanceof DateRangePicker
)
return this;
if (this.length > 1)
throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
else
return internal_return;
};
$.fn.datepicker = datepickerPlugin;
var defaults = $.fn.datepicker.defaults = {
assumeNearbyYear: false,
autoclose: false,
beforeShowDay: $.noop,
beforeShowMonth: $.noop,
beforeShowYear: $.noop,
beforeShowDecade: $.noop,
beforeShowCentury: $.noop,
calendarWeeks: false,
clearBtn: false,
toggleActive: false,
daysOfWeekDisabled: [],
daysOfWeekHighlighted: [],
datesDisabled: [],
endDate: Infinity,
forceParse: true,
format: 'mm/dd/yyyy',
keepEmptyValues: false,
keyboardNavigation: true,
language: 'en',
minViewMode: 0,
maxViewMode: 4,
multidate: false,
multidateSeparator: ',',
orientation: "auto",
rtl: false,
startDate: -Infinity,
startView: 0,
todayBtn: false,
todayHighlight: false,
updateViewDate: true,
weekStart: 0,
disableTouchKeyboard: false,
enableOnReadonly: true,
showOnFocus: true,
zIndexOffset: 10,
container: 'body',
immediateUpdates: false,
title: '',
templates: {
leftArrow: '&#x00AB;',
rightArrow: '&#x00BB;'
},
showWeekDays: true
};
var locale_opts = $.fn.datepicker.locale_opts = [
'format',
'rtl',
'weekStart'
];
$.fn.datepicker.Constructor = Datepicker;
var dates = $.fn.datepicker.dates = {
en: {
days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
today: "Today",
clear: "Clear",
titleFormat: "MM yyyy"
}
};
var DPGlobal = {
viewModes: [
{
names: ['days', 'month'],
clsName: 'days',
e: 'changeMonth'
},
{
names: ['months', 'year'],
clsName: 'months',
e: 'changeYear',
navStep: 1
},
{
names: ['years', 'decade'],
clsName: 'years',
e: 'changeDecade',
navStep: 10
},
{
names: ['decades', 'century'],
clsName: 'decades',
e: 'changeCentury',
navStep: 100
},
{
names: ['centuries', 'millennium'],
clsName: 'centuries',
e: 'changeMillennium',
navStep: 1000
}
],
validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
parseFormat: function(format){
if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
return format;
var separators = format.replace(this.validParts, '\0').split('\0'),
parts = format.match(this.validParts);
if (!separators || !separators.length || !parts || parts.length === 0){
throw new Error("Invalid date format.");
}
return {separators: separators, parts: parts};
},
parseDate: function(date, format, language, assumeNearby){
if (!date)
return undefined;
if (date instanceof Date)
return date;
if (typeof format === 'string')
format = DPGlobal.parseFormat(format);
if (format.toValue)
return format.toValue(date, format, language);
var fn_map = {
d: 'moveDay',
m: 'moveMonth',
w: 'moveWeek',
y: 'moveYear'
},
dateAliases = {
yesterday: '-1d',
today: '+0d',
tomorrow: '+1d'
},
parts, part, dir, i, fn;
if (date in dateAliases){
date = dateAliases[date];
}
if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)){
parts = date.match(/([\-+]\d+)([dmwy])/gi);
date = new Date();
for (i=0; i < parts.length; i++){
part = parts[i].match(/([\-+]\d+)([dmwy])/i);
dir = Number(part[1]);
fn = fn_map[part[2].toLowerCase()];
date = Datepicker.prototype[fn](date, dir);
}
return Datepicker.prototype._zero_utc_time(date);
}
parts = date && date.match(this.nonpunctuation) || [];
function applyNearbyYear(year, threshold){
if (threshold === true)
threshold = 10;
if (year < 100){
year += 2000;
if (year > ((new Date()).getFullYear()+threshold)){
year -= 100;
}
}
return year;
}
var parsed = {},
setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
setters_map = {
yyyy: function(d,v){
return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
},
m: function(d,v){
if (isNaN(d))
return d;
v -= 1;
while (v < 0) v += 12;
v %= 12;
d.setUTCMonth(v);
while (d.getUTCMonth() !== v)
d.setUTCDate(d.getUTCDate()-1);
return d;
},
d: function(d,v){
return d.setUTCDate(v);
}
},
val, filtered;
setters_map['yy'] = setters_map['yyyy'];
setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
setters_map['dd'] = setters_map['d'];
date = UTCToday();
var fparts = format.parts.slice();
if (parts.length !== fparts.length){
fparts = $(fparts).filter(function(i,p){
return $.inArray(p, setters_order) !== -1;
}).toArray();
}
function match_part(){
var m = this.slice(0, parts[i].length),
p = parts[i].slice(0, m.length);
return m.toLowerCase() === p.toLowerCase();
}
if (parts.length === fparts.length){
var cnt;
for (i=0, cnt = fparts.length; i < cnt; i++){
val = parseInt(parts[i], 10);
part = fparts[i];
if (isNaN(val)){
switch (part){
case 'MM':
filtered = $(dates[language].months).filter(match_part);
val = $.inArray(filtered[0], dates[language].months) + 1;
break;
case 'M':
filtered = $(dates[language].monthsShort).filter(match_part);
val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
break;
}
}
parsed[part] = val;
}
var _date, s;
for (i=0; i < setters_order.length; i++){
s = setters_order[i];
if (s in parsed && !isNaN(parsed[s])){
_date = new Date(date);
setters_map[s](_date, parsed[s]);
if (!isNaN(_date))
date = _date;
}
}
}
return date;
},
formatDate: function(date, format, language){
if (!date)
return '';
if (typeof format === 'string')
format = DPGlobal.parseFormat(format);
if (format.toDisplay)
return format.toDisplay(date, format, language);
var val = {
d: date.getUTCDate(),
D: dates[language].daysShort[date.getUTCDay()],
DD: dates[language].days[date.getUTCDay()],
m: date.getUTCMonth() + 1,
M: dates[language].monthsShort[date.getUTCMonth()],
MM: dates[language].months[date.getUTCMonth()],
yy: date.getUTCFullYear().toString().substring(2),
yyyy: date.getUTCFullYear()
};
val.dd = (val.d < 10 ? '0' : '') + val.d;
val.mm = (val.m < 10 ? '0' : '') + val.m;
date = [];
var seps = $.extend([], format.separators);
for (var i=0, cnt = format.parts.length; i <= cnt; i++){
if (seps.length)
date.push(seps.shift());
date.push(val[format.parts[i]]);
}
return date.join('');
},
headTemplate: '<thead>'+
'<tr>'+
'<th colspan="7" class="datepicker-title"></th>'+
'</tr>'+
'<tr>'+
'<th class="prev">'+defaults.templates.leftArrow+'</th>'+
'<th colspan="5" class="datepicker-switch"></th>'+
'<th class="next">'+defaults.templates.rightArrow+'</th>'+
'</tr>'+
'</thead>',
contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
footTemplate: '<tfoot>'+
'<tr>'+
'<th colspan="7" class="today"></th>'+
'</tr>'+
'<tr>'+
'<th colspan="7" class="clear"></th>'+
'</tr>'+
'</tfoot>'
};
DPGlobal.template = '<div class="datepicker">'+
'<div class="datepicker-days">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
'<tbody></tbody>'+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-months">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-years">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-decades">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'<div class="datepicker-centuries">'+
'<table class="table-condensed">'+
DPGlobal.headTemplate+
DPGlobal.contTemplate+
DPGlobal.footTemplate+
'</table>'+
'</div>'+
'</div>';
$.fn.datepicker.DPGlobal = DPGlobal;
/* DATEPICKER NO CONFLICT
* =================== */
$.fn.datepicker.noConflict = function(){
$.fn.datepicker = old;
return this;
};
/* DATEPICKER VERSION
* =================== */
$.fn.datepicker.version = '1.7.1';
$.fn.datepicker.deprecated = function(msg){
var console = window.console;
if (console && console.warn) {
console.warn('DEPRECATED: ' + msg);
}
};
/* DATEPICKER DATA-API
* ================== */
$(document).on(
'focus.datepicker.data-api click.datepicker.data-api',
'[data-provide="datepicker"]',
function(e){
var $this = $(this);
if ($this.data('datepicker'))
return;
e.preventDefault();
datepickerPlugin.call($this, 'show');
}
);
$(function(){
datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
});
}));//! moment.js
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
global.moment = factory()
}(this, function () { 'use strict';
var hookCallback;
function utils_hooks__hooks () {
return hookCallback.apply(null, arguments);
}
function setHookCallback (callback) {
hookCallback = callback;
}
function isArray(input) {
return Object.prototype.toString.call(input) === '[object Array]';
}
function isDate(input) {
return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}
function map(arr, fn) {
var res = [], i;
for (i = 0; i < arr.length; ++i) {
res.push(fn(arr[i], i));
}
return res;
}
function hasOwnProp(a, b) {
return Object.prototype.hasOwnProperty.call(a, b);
}
function extend(a, b) {
for (var i in b) {
if (hasOwnProp(b, i)) {
a[i] = b[i];
}
}
if (hasOwnProp(b, 'toString')) {
a.toString = b.toString;
}
if (hasOwnProp(b, 'valueOf')) {
a.valueOf = b.valueOf;
}
return a;
}
function create_utc__createUTC (input, format, locale, strict) {
return createLocalOrUTC(input, format, locale, strict, true).utc();
}
function defaultParsingFlags() {
return {
empty           : false,
unusedTokens    : [],
unusedInput     : [],
overflow        : -2,
charsLeftOver   : 0,
nullInput       : false,
invalidMonth    : null,
invalidFormat   : false,
userInvalidated : false,
iso             : false
};
}
function getParsingFlags(m) {
if (m._pf == null) {
m._pf = defaultParsingFlags();
}
return m._pf;
}
function valid__isValid(m) {
if (m._isValid == null) {
var flags = getParsingFlags(m);
m._isValid = !isNaN(m._d.getTime()) &&
flags.overflow < 0 &&
!flags.empty &&
!flags.invalidMonth &&
!flags.invalidWeekday &&
!flags.nullInput &&
!flags.invalidFormat &&
!flags.userInvalidated;
if (m._strict) {
m._isValid = m._isValid &&
flags.charsLeftOver === 0 &&
flags.unusedTokens.length === 0 &&
flags.bigHour === undefined;
}
}
return m._isValid;
}
function valid__createInvalid (flags) {
var m = create_utc__createUTC(NaN);
if (flags != null) {
extend(getParsingFlags(m), flags);
}
else {
getParsingFlags(m).userInvalidated = true;
}
return m;
}
var momentProperties = utils_hooks__hooks.momentProperties = [];
function copyConfig(to, from) {
var i, prop, val;
if (typeof from._isAMomentObject !== 'undefined') {
to._isAMomentObject = from._isAMomentObject;
}
if (typeof from._i !== 'undefined') {
to._i = from._i;
}
if (typeof from._f !== 'undefined') {
to._f = from._f;
}
if (typeof from._l !== 'undefined') {
to._l = from._l;
}
if (typeof from._strict !== 'undefined') {
to._strict = from._strict;
}
if (typeof from._tzm !== 'undefined') {
to._tzm = from._tzm;
}
if (typeof from._isUTC !== 'undefined') {
to._isUTC = from._isUTC;
}
if (typeof from._offset !== 'undefined') {
to._offset = from._offset;
}
if (typeof from._pf !== 'undefined') {
to._pf = getParsingFlags(from);
}
if (typeof from._locale !== 'undefined') {
to._locale = from._locale;
}
if (momentProperties.length > 0) {
for (i in momentProperties) {
prop = momentProperties[i];
val = from[prop];
if (typeof val !== 'undefined') {
to[prop] = val;
}
}
}
return to;
}
var updateInProgress = false;
function Moment(config) {
copyConfig(this, config);
this._d = new Date(config._d != null ? config._d.getTime() : NaN);
if (updateInProgress === false) {
updateInProgress = true;
utils_hooks__hooks.updateOffset(this);
updateInProgress = false;
}
}
function isMoment (obj) {
return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}
function absFloor (number) {
if (number < 0) {
return Math.ceil(number);
} else {
return Math.floor(number);
}
}
function toInt(argumentForCoercion) {
var coercedNumber = +argumentForCoercion,
value = 0;
if (coercedNumber !== 0 && isFinite(coercedNumber)) {
value = absFloor(coercedNumber);
}
return value;
}
function compareArrays(array1, array2, dontConvert) {
var len = Math.min(array1.length, array2.length),
lengthDiff = Math.abs(array1.length - array2.length),
diffs = 0,
i;
for (i = 0; i < len; i++) {
if ((dontConvert && array1[i] !== array2[i]) ||
(!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
diffs++;
}
}
return diffs + lengthDiff;
}
function Locale() {
}
var locales = {};
var globalLocale;
function normalizeLocale(key) {
return key ? key.toLowerCase().replace('_', '-') : key;
}
function chooseLocale(names) {
var i = 0, j, next, locale, split;
while (i < names.length) {
split = normalizeLocale(names[i]).split('-');
j = split.length;
next = normalizeLocale(names[i + 1]);
next = next ? next.split('-') : null;
while (j > 0) {
locale = loadLocale(split.slice(0, j).join('-'));
if (locale) {
return locale;
}
if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
break;
}
j--;
}
i++;
}
return null;
}
function loadLocale(name) {
var oldLocale = null;
if (!locales[name] && typeof module !== 'undefined' &&
module && module.exports) {
try {
oldLocale = globalLocale._abbr;
require('./locale/' + name);
locale_locales__getSetGlobalLocale(oldLocale);
} catch (e) { }
}
return locales[name];
}
function locale_locales__getSetGlobalLocale (key, values) {
var data;
if (key) {
if (typeof values === 'undefined') {
data = locale_locales__getLocale(key);
}
else {
data = defineLocale(key, values);
}
if (data) {
globalLocale = data;
}
}
return globalLocale._abbr;
}
function defineLocale (name, values) {
if (values !== null) {
values.abbr = name;
locales[name] = locales[name] || new Locale();
locales[name].set(values);
locale_locales__getSetGlobalLocale(name);
return locales[name];
} else {
delete locales[name];
return null;
}
}
function locale_locales__getLocale (key) {
var locale;
if (key && key._locale && key._locale._abbr) {
key = key._locale._abbr;
}
if (!key) {
return globalLocale;
}
if (!isArray(key)) {
locale = loadLocale(key);
if (locale) {
return locale;
}
key = [key];
}
return chooseLocale(key);
}
var aliases = {};
function addUnitAlias (unit, shorthand) {
var lowerCase = unit.toLowerCase();
aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}
function normalizeUnits(units) {
return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}
function normalizeObjectUnits(inputObject) {
var normalizedInput = {},
normalizedProp,
prop;
for (prop in inputObject) {
if (hasOwnProp(inputObject, prop)) {
normalizedProp = normalizeUnits(prop);
if (normalizedProp) {
normalizedInput[normalizedProp] = inputObject[prop];
}
}
}
return normalizedInput;
}
function makeGetSet (unit, keepTime) {
return function (value) {
if (value != null) {
get_set__set(this, unit, value);
utils_hooks__hooks.updateOffset(this, keepTime);
return this;
} else {
return get_set__get(this, unit);
}
};
}
function get_set__get (mom, unit) {
return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
}
function get_set__set (mom, unit, value) {
return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
}
function getSet (units, value) {
var unit;
if (typeof units === 'object') {
for (unit in units) {
this.set(unit, units[unit]);
}
} else {
units = normalizeUnits(units);
if (typeof this[units] === 'function') {
return this[units](value);
}
}
return this;
}
function zeroFill(number, targetLength, forceSign) {
var absNumber = '' + Math.abs(number),
zerosToFill = targetLength - absNumber.length,
sign = number >= 0;
return (sign ? (forceSign ? '+' : '') : '-') +
Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
var formatFunctions = {};
var formatTokenFunctions = {};
function addFormatToken (token, padded, ordinal, callback) {
var func = callback;
if (typeof callback === 'string') {
func = function () {
return this[callback]();
};
}
if (token) {
formatTokenFunctions[token] = func;
}
if (padded) {
formatTokenFunctions[padded[0]] = function () {
return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
};
}
if (ordinal) {
formatTokenFunctions[ordinal] = function () {
return this.localeData().ordinal(func.apply(this, arguments), token);
};
}
}
function removeFormattingTokens(input) {
if (input.match(/\[[\s\S]/)) {
return input.replace(/^\[|\]$/g, '');
}
return input.replace(/\\/g, '');
}
function makeFormatFunction(format) {
var array = format.match(formattingTokens), i, length;
for (i = 0, length = array.length; i < length; i++) {
if (formatTokenFunctions[array[i]]) {
array[i] = formatTokenFunctions[array[i]];
} else {
array[i] = removeFormattingTokens(array[i]);
}
}
return function (mom) {
var output = '';
for (i = 0; i < length; i++) {
output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
}
return output;
};
}
function formatMoment(m, format) {
if (!m.isValid()) {
return m.localeData().invalidDate();
}
format = expandFormat(format, m.localeData());
formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
return formatFunctions[format](m);
}
function expandFormat(format, locale) {
var i = 5;
function replaceLongDateFormatTokens(input) {
return locale.longDateFormat(input) || input;
}
localFormattingTokens.lastIndex = 0;
while (i >= 0 && localFormattingTokens.test(format)) {
format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
localFormattingTokens.lastIndex = 0;
i -= 1;
}
return format;
}
var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999
var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf
var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
var regexes = {};
function isFunction (sth) {
return typeof sth === 'function' &&
Object.prototype.toString.call(sth) === '[object Function]';
}
function addRegexToken (token, regex, strictRegex) {
regexes[token] = isFunction(regex) ? regex : function (isStrict) {
return (isStrict && strictRegex) ? strictRegex : regex;
};
}
function getParseRegexForToken (token, config) {
if (!hasOwnProp(regexes, token)) {
return new RegExp(unescapeFormat(token));
}
return regexes[token](config._strict, config._locale);
}
function unescapeFormat(s) {
return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
return p1 || p2 || p3 || p4;
}).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
var tokens = {};
function addParseToken (token, callback) {
var i, func = callback;
if (typeof token === 'string') {
token = [token];
}
if (typeof callback === 'number') {
func = function (input, array) {
array[callback] = toInt(input);
};
}
for (i = 0; i < token.length; i++) {
tokens[token[i]] = func;
}
}
function addWeekParseToken (token, callback) {
addParseToken(token, function (input, array, config, token) {
config._w = config._w || {};
callback(input, config._w, config, token);
});
}
function addTimeToArrayFromToken(token, input, config) {
if (input != null && hasOwnProp(tokens, token)) {
tokens[token](input, config._a, config, token);
}
}
var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
function daysInMonth(year, month) {
return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}
addFormatToken('M', ['MM', 2], 'Mo', function () {
return this.month() + 1;
});
addFormatToken('MMM', 0, 0, function (format) {
return this.localeData().monthsShort(this, format);
});
addFormatToken('MMMM', 0, 0, function (format) {
return this.localeData().months(this, format);
});
addUnitAlias('month', 'M');
addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  matchWord);
addRegexToken('MMMM', matchWord);
addParseToken(['M', 'MM'], function (input, array) {
array[MONTH] = toInt(input) - 1;
});
addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
var month = config._locale.monthsParse(input, token, config._strict);
if (month != null) {
array[MONTH] = month;
} else {
getParsingFlags(config).invalidMonth = input;
}
});
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m) {
return this._months[m.month()];
}
var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m) {
return this._monthsShort[m.month()];
}
function localeMonthsParse (monthName, format, strict) {
var i, mom, regex;
if (!this._monthsParse) {
this._monthsParse = [];
this._longMonthsParse = [];
this._shortMonthsParse = [];
}
for (i = 0; i < 12; i++) {
mom = create_utc__createUTC([2000, i]);
if (strict && !this._longMonthsParse[i]) {
this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
}
if (!strict && !this._monthsParse[i]) {
regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
}
if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
return i;
} else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
return i;
} else if (!strict && this._monthsParse[i].test(monthName)) {
return i;
}
}
}
function setMonth (mom, value) {
var dayOfMonth;
if (typeof value === 'string') {
value = mom.localeData().monthsParse(value);
if (typeof value !== 'number') {
return mom;
}
}
dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
return mom;
}
function getSetMonth (value) {
if (value != null) {
setMonth(this, value);
utils_hooks__hooks.updateOffset(this, true);
return this;
} else {
return get_set__get(this, 'Month');
}
}
function getDaysInMonth () {
return daysInMonth(this.year(), this.month());
}
function checkOverflow (m) {
var overflow;
var a = m._a;
if (a && getParsingFlags(m).overflow === -2) {
overflow =
a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
-1;
if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
overflow = DATE;
}
getParsingFlags(m).overflow = overflow;
}
return m;
}
function warn(msg) {
if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
console.warn('Deprecation warning: ' + msg);
}
}
function deprecate(msg, fn) {
var firstTime = true;
return extend(function () {
if (firstTime) {
warn(msg + '\n' + (new Error()).stack);
firstTime = false;
}
return fn.apply(this, arguments);
}, fn);
}
var deprecations = {};
function deprecateSimple(name, msg) {
if (!deprecations[name]) {
warn(msg);
deprecations[name] = true;
}
}
utils_hooks__hooks.suppressDeprecationWarnings = false;
var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var isoDates = [
['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
['GGGG-[W]WW', /\d{4}-W\d{2}/],
['YYYY-DDD', /\d{4}-\d{3}/]
];
var isoTimes = [
['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
['HH:mm', /(T| )\d\d:\d\d/],
['HH', /(T| )\d\d/]
];
var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
function configFromISO(config) {
var i, l,
string = config._i,
match = from_string__isoRegex.exec(string);
if (match) {
getParsingFlags(config).iso = true;
for (i = 0, l = isoDates.length; i < l; i++) {
if (isoDates[i][1].exec(string)) {
config._f = isoDates[i][0];
break;
}
}
for (i = 0, l = isoTimes.length; i < l; i++) {
if (isoTimes[i][1].exec(string)) {
config._f += (match[6] || ' ') + isoTimes[i][0];
break;
}
}
if (string.match(matchOffset)) {
config._f += 'Z';
}
configFromStringAndFormat(config);
} else {
config._isValid = false;
}
}
function configFromString(config) {
var matched = aspNetJsonRegex.exec(config._i);
if (matched !== null) {
config._d = new Date(+matched[1]);
return;
}
configFromISO(config);
if (config._isValid === false) {
delete config._isValid;
utils_hooks__hooks.createFromInputFallback(config);
}
}
utils_hooks__hooks.createFromInputFallback = deprecate(
'moment construction falls back to js Date. This is ' +
'discouraged and will be removed in upcoming major ' +
'release. Please refer to ' +
'https://github.com/moment/moment/issues/1407 for more info.',
function (config) {
config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
}
);
function createDate (y, m, d, h, M, s, ms) {
var date = new Date(y, m, d, h, M, s, ms);
if (y < 1970) {
date.setFullYear(y);
}
return date;
}
function createUTCDate (y) {
var date = new Date(Date.UTC.apply(null, arguments));
if (y < 1970) {
date.setUTCFullYear(y);
}
return date;
}
addFormatToken(0, ['YY', 2], 0, function () {
return this.year() % 100;
});
addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
addUnitAlias('year', 'y');
addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);
addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
});
function daysInYear(year) {
return isLeapYear(year) ? 366 : 365;
}
function isLeapYear(year) {
return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
utils_hooks__hooks.parseTwoDigitYear = function (input) {
return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};
var getSetYear = makeGetSet('FullYear', false);
function getIsLeapYear () {
return isLeapYear(this.year());
}
addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');
addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);
addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
week[token.substr(0, 1)] = toInt(input);
});
function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
var end = firstDayOfWeekOfYear - firstDayOfWeek,
daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
adjustedMoment;
if (daysToDayOfWeek > end) {
daysToDayOfWeek -= 7;
}
if (daysToDayOfWeek < end - 7) {
daysToDayOfWeek += 7;
}
adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
return {
week: Math.ceil(adjustedMoment.dayOfYear() / 7),
year: adjustedMoment.year()
};
}
function localeWeek (mom) {
return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
dow : 0, // Sunday is the first day of the week.
doy : 6  // The week that contains Jan 1st is the first week of the year.
};
function localeFirstDayOfWeek () {
return this._week.dow;
}
function localeFirstDayOfYear () {
return this._week.doy;
}
function getSetWeek (input) {
var week = this.localeData().week(this);
return input == null ? week : this.add((input - week) * 7, 'd');
}
function getSetISOWeek (input) {
var week = weekOfYear(this, 1, 4).week;
return input == null ? week : this.add((input - week) * 7, 'd');
}
addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
addUnitAlias('dayOfYear', 'DDD');
addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
config._dayOfYear = toInt(input);
});
function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
if (d < firstDayOfWeek) {
d += 7;
}
weekday = weekday != null ? 1 * weekday : firstDayOfWeek;
dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;
return {
year: dayOfYear > 0 ? year : year - 1,
dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
};
}
function getSetDayOfYear (input) {
var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}
function defaults(a, b, c) {
if (a != null) {
return a;
}
if (b != null) {
return b;
}
return c;
}
function currentDateArray(config) {
var now = new Date();
if (config._useUTC) {
return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
}
return [now.getFullYear(), now.getMonth(), now.getDate()];
}
function configFromArray (config) {
var i, date, input = [], currentDate, yearToUse;
if (config._d) {
return;
}
currentDate = currentDateArray(config);
if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
dayOfYearFromWeekInfo(config);
}
if (config._dayOfYear) {
yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
if (config._dayOfYear > daysInYear(yearToUse)) {
getParsingFlags(config)._overflowDayOfYear = true;
}
date = createUTCDate(yearToUse, 0, config._dayOfYear);
config._a[MONTH] = date.getUTCMonth();
config._a[DATE] = date.getUTCDate();
}
for (i = 0; i < 3 && config._a[i] == null; ++i) {
config._a[i] = input[i] = currentDate[i];
}
for (; i < 7; i++) {
config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
}
if (config._a[HOUR] === 24 &&
config._a[MINUTE] === 0 &&
config._a[SECOND] === 0 &&
config._a[MILLISECOND] === 0) {
config._nextDay = true;
config._a[HOUR] = 0;
}
config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
if (config._tzm != null) {
config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
}
if (config._nextDay) {
config._a[HOUR] = 24;
}
}
function dayOfYearFromWeekInfo(config) {
var w, weekYear, week, weekday, dow, doy, temp;
w = config._w;
if (w.GG != null || w.W != null || w.E != null) {
dow = 1;
doy = 4;
weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
week = defaults(w.W, 1);
weekday = defaults(w.E, 1);
} else {
dow = config._locale._week.dow;
doy = config._locale._week.doy;
weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
week = defaults(w.w, 1);
if (w.d != null) {
weekday = w.d;
if (weekday < dow) {
++week;
}
} else if (w.e != null) {
weekday = w.e + dow;
} else {
weekday = dow;
}
}
temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
config._a[YEAR] = temp.year;
config._dayOfYear = temp.dayOfYear;
}
utils_hooks__hooks.ISO_8601 = function () {};
function configFromStringAndFormat(config) {
if (config._f === utils_hooks__hooks.ISO_8601) {
configFromISO(config);
return;
}
config._a = [];
getParsingFlags(config).empty = true;
var string = '' + config._i,
i, parsedInput, tokens, token, skipped,
stringLength = string.length,
totalParsedInputLength = 0;
tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
for (i = 0; i < tokens.length; i++) {
token = tokens[i];
parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
if (parsedInput) {
skipped = string.substr(0, string.indexOf(parsedInput));
if (skipped.length > 0) {
getParsingFlags(config).unusedInput.push(skipped);
}
string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
totalParsedInputLength += parsedInput.length;
}
if (formatTokenFunctions[token]) {
if (parsedInput) {
getParsingFlags(config).empty = false;
}
else {
getParsingFlags(config).unusedTokens.push(token);
}
addTimeToArrayFromToken(token, parsedInput, config);
}
else if (config._strict && !parsedInput) {
getParsingFlags(config).unusedTokens.push(token);
}
}
getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
if (string.length > 0) {
getParsingFlags(config).unusedInput.push(string);
}
if (getParsingFlags(config).bigHour === true &&
config._a[HOUR] <= 12 &&
config._a[HOUR] > 0) {
getParsingFlags(config).bigHour = undefined;
}
config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
configFromArray(config);
checkOverflow(config);
}
function meridiemFixWrap (locale, hour, meridiem) {
var isPm;
if (meridiem == null) {
return hour;
}
if (locale.meridiemHour != null) {
return locale.meridiemHour(hour, meridiem);
} else if (locale.isPM != null) {
isPm = locale.isPM(meridiem);
if (isPm && hour < 12) {
hour += 12;
}
if (!isPm && hour === 12) {
hour = 0;
}
return hour;
} else {
return hour;
}
}
function configFromStringAndArray(config) {
var tempConfig,
bestMoment,
scoreToBeat,
i,
currentScore;
if (config._f.length === 0) {
getParsingFlags(config).invalidFormat = true;
config._d = new Date(NaN);
return;
}
for (i = 0; i < config._f.length; i++) {
currentScore = 0;
tempConfig = copyConfig({}, config);
if (config._useUTC != null) {
tempConfig._useUTC = config._useUTC;
}
tempConfig._f = config._f[i];
configFromStringAndFormat(tempConfig);
if (!valid__isValid(tempConfig)) {
continue;
}
currentScore += getParsingFlags(tempConfig).charsLeftOver;
currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
getParsingFlags(tempConfig).score = currentScore;
if (scoreToBeat == null || currentScore < scoreToBeat) {
scoreToBeat = currentScore;
bestMoment = tempConfig;
}
}
extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
if (config._d) {
return;
}
var i = normalizeObjectUnits(config._i);
config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];
configFromArray(config);
}
function createFromConfig (config) {
var res = new Moment(checkOverflow(prepareConfig(config)));
if (res._nextDay) {
res.add(1, 'd');
res._nextDay = undefined;
}
return res;
}
function prepareConfig (config) {
var input = config._i,
format = config._f;
config._locale = config._locale || locale_locales__getLocale(config._l);
if (input === null || (format === undefined && input === '')) {
return valid__createInvalid({nullInput: true});
}
if (typeof input === 'string') {
config._i = input = config._locale.preparse(input);
}
if (isMoment(input)) {
return new Moment(checkOverflow(input));
} else if (isArray(format)) {
configFromStringAndArray(config);
} else if (format) {
configFromStringAndFormat(config);
} else if (isDate(input)) {
config._d = input;
} else {
configFromInput(config);
}
return config;
}
function configFromInput(config) {
var input = config._i;
if (input === undefined) {
config._d = new Date();
} else if (isDate(input)) {
config._d = new Date(+input);
} else if (typeof input === 'string') {
configFromString(config);
} else if (isArray(input)) {
config._a = map(input.slice(0), function (obj) {
return parseInt(obj, 10);
});
configFromArray(config);
} else if (typeof(input) === 'object') {
configFromObject(config);
} else if (typeof(input) === 'number') {
config._d = new Date(input);
} else {
utils_hooks__hooks.createFromInputFallback(config);
}
}
function createLocalOrUTC (input, format, locale, strict, isUTC) {
var c = {};
if (typeof(locale) === 'boolean') {
strict = locale;
locale = undefined;
}
c._isAMomentObject = true;
c._useUTC = c._isUTC = isUTC;
c._l = locale;
c._i = input;
c._f = format;
c._strict = strict;
return createFromConfig(c);
}
function local__createLocal (input, format, locale, strict) {
return createLocalOrUTC(input, format, locale, strict, false);
}
var prototypeMin = deprecate(
'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
function () {
var other = local__createLocal.apply(null, arguments);
return other < this ? this : other;
}
);
var prototypeMax = deprecate(
'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
function () {
var other = local__createLocal.apply(null, arguments);
return other > this ? this : other;
}
);
function pickBy(fn, moments) {
var res, i;
if (moments.length === 1 && isArray(moments[0])) {
moments = moments[0];
}
if (!moments.length) {
return local__createLocal();
}
res = moments[0];
for (i = 1; i < moments.length; ++i) {
if (!moments[i].isValid() || moments[i][fn](res)) {
res = moments[i];
}
}
return res;
}
function min () {
var args = [].slice.call(arguments, 0);
return pickBy('isBefore', args);
}
function max () {
var args = [].slice.call(arguments, 0);
return pickBy('isAfter', args);
}
function Duration (duration) {
var normalizedInput = normalizeObjectUnits(duration),
years = normalizedInput.year || 0,
quarters = normalizedInput.quarter || 0,
months = normalizedInput.month || 0,
weeks = normalizedInput.week || 0,
days = normalizedInput.day || 0,
hours = normalizedInput.hour || 0,
minutes = normalizedInput.minute || 0,
seconds = normalizedInput.second || 0,
milliseconds = normalizedInput.millisecond || 0;
this._milliseconds = +milliseconds +
seconds * 1e3 + // 1000
minutes * 6e4 + // 1000 * 60
hours * 36e5; // 1000 * 60 * 60
this._days = +days +
weeks * 7;
this._months = +months +
quarters * 3 +
years * 12;
this._data = {};
this._locale = locale_locales__getLocale();
this._bubble();
}
function isDuration (obj) {
return obj instanceof Duration;
}
function offset (token, separator) {
addFormatToken(token, 0, 0, function () {
var offset = this.utcOffset();
var sign = '+';
if (offset < 0) {
offset = -offset;
sign = '-';
}
return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
});
}
offset('Z', ':');
offset('ZZ', '');
addRegexToken('Z',  matchOffset);
addRegexToken('ZZ', matchOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
config._useUTC = true;
config._tzm = offsetFromString(input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(string) {
var matches = ((string || '').match(matchOffset) || []);
var chunk   = matches[matches.length - 1] || [];
var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
var minutes = +(parts[1] * 60) + toInt(parts[2]);
return parts[0] === '+' ? minutes : -minutes;
}
function cloneWithOffset(input, model) {
var res, diff;
if (model._isUTC) {
res = model.clone();
diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
res._d.setTime(+res._d + diff);
utils_hooks__hooks.updateOffset(res, false);
return res;
} else {
return local__createLocal(input).local();
}
}
function getDateOffset (m) {
return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}
utils_hooks__hooks.updateOffset = function () {};
function getSetOffset (input, keepLocalTime) {
var offset = this._offset || 0,
localAdjust;
if (input != null) {
if (typeof input === 'string') {
input = offsetFromString(input);
}
if (Math.abs(input) < 16) {
input = input * 60;
}
if (!this._isUTC && keepLocalTime) {
localAdjust = getDateOffset(this);
}
this._offset = input;
this._isUTC = true;
if (localAdjust != null) {
this.add(localAdjust, 'm');
}
if (offset !== input) {
if (!keepLocalTime || this._changeInProgress) {
add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
} else if (!this._changeInProgress) {
this._changeInProgress = true;
utils_hooks__hooks.updateOffset(this, true);
this._changeInProgress = null;
}
}
return this;
} else {
return this._isUTC ? offset : getDateOffset(this);
}
}
function getSetZone (input, keepLocalTime) {
if (input != null) {
if (typeof input !== 'string') {
input = -input;
}
this.utcOffset(input, keepLocalTime);
return this;
} else {
return -this.utcOffset();
}
}
function setOffsetToUTC (keepLocalTime) {
return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal (keepLocalTime) {
if (this._isUTC) {
this.utcOffset(0, keepLocalTime);
this._isUTC = false;
if (keepLocalTime) {
this.subtract(getDateOffset(this), 'm');
}
}
return this;
}
function setOffsetToParsedOffset () {
if (this._tzm) {
this.utcOffset(this._tzm);
} else if (typeof this._i === 'string') {
this.utcOffset(offsetFromString(this._i));
}
return this;
}
function hasAlignedHourOffset (input) {
input = input ? local__createLocal(input).utcOffset() : 0;
return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime () {
return (
this.utcOffset() > this.clone().month(0).utcOffset() ||
this.utcOffset() > this.clone().month(5).utcOffset()
);
}
function isDaylightSavingTimeShifted () {
if (typeof this._isDSTShifted !== 'undefined') {
return this._isDSTShifted;
}
var c = {};
copyConfig(c, this);
c = prepareConfig(c);
if (c._a) {
var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
this._isDSTShifted = this.isValid() &&
compareArrays(c._a, other.toArray()) > 0;
} else {
this._isDSTShifted = false;
}
return this._isDSTShifted;
}
function isLocal () {
return !this._isUTC;
}
function isUtcOffset () {
return this._isUTC;
}
function isUtc () {
return this._isUTC && this._offset === 0;
}
var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;
var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
function create__createDuration (input, key) {
var duration = input,
match = null,
sign,
ret,
diffRes;
if (isDuration(input)) {
duration = {
ms : input._milliseconds,
d  : input._days,
M  : input._months
};
} else if (typeof input === 'number') {
duration = {};
if (key) {
duration[key] = input;
} else {
duration.milliseconds = input;
}
} else if (!!(match = aspNetRegex.exec(input))) {
sign = (match[1] === '-') ? -1 : 1;
duration = {
y  : 0,
d  : toInt(match[DATE])        * sign,
h  : toInt(match[HOUR])        * sign,
m  : toInt(match[MINUTE])      * sign,
s  : toInt(match[SECOND])      * sign,
ms : toInt(match[MILLISECOND]) * sign
};
} else if (!!(match = create__isoRegex.exec(input))) {
sign = (match[1] === '-') ? -1 : 1;
duration = {
y : parseIso(match[2], sign),
M : parseIso(match[3], sign),
d : parseIso(match[4], sign),
h : parseIso(match[5], sign),
m : parseIso(match[6], sign),
s : parseIso(match[7], sign),
w : parseIso(match[8], sign)
};
} else if (duration == null) {// checks for null or undefined
duration = {};
} else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));
duration = {};
duration.ms = diffRes.milliseconds;
duration.M = diffRes.months;
}
ret = new Duration(duration);
if (isDuration(input) && hasOwnProp(input, '_locale')) {
ret._locale = input._locale;
}
return ret;
}
create__createDuration.fn = Duration.prototype;
function parseIso (inp, sign) {
var res = inp && parseFloat(inp.replace(',', '.'));
return (isNaN(res) ? 0 : res) * sign;
}
function positiveMomentsDifference(base, other) {
var res = {milliseconds: 0, months: 0};
res.months = other.month() - base.month() +
(other.year() - base.year()) * 12;
if (base.clone().add(res.months, 'M').isAfter(other)) {
--res.months;
}
res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
return res;
}
function momentsDifference(base, other) {
var res;
other = cloneWithOffset(other, base);
if (base.isBefore(other)) {
res = positiveMomentsDifference(base, other);
} else {
res = positiveMomentsDifference(other, base);
res.milliseconds = -res.milliseconds;
res.months = -res.months;
}
return res;
}
function createAdder(direction, name) {
return function (val, period) {
var dur, tmp;
if (period !== null && !isNaN(+period)) {
deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
tmp = val; val = period; period = tmp;
}
val = typeof val === 'string' ? +val : val;
dur = create__createDuration(val, period);
add_subtract__addSubtract(this, dur, direction);
return this;
};
}
function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
var milliseconds = duration._milliseconds,
days = duration._days,
months = duration._months;
updateOffset = updateOffset == null ? true : updateOffset;
if (milliseconds) {
mom._d.setTime(+mom._d + milliseconds * isAdding);
}
if (days) {
get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
}
if (months) {
setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
}
if (updateOffset) {
utils_hooks__hooks.updateOffset(mom, days || months);
}
}
var add_subtract__add      = createAdder(1, 'add');
var add_subtract__subtract = createAdder(-1, 'subtract');
function moment_calendar__calendar (time, formats) {
var now = time || local__createLocal(),
sod = cloneWithOffset(now, this).startOf('day'),
diff = this.diff(sod, 'days', true),
format = diff < -6 ? 'sameElse' :
diff < -1 ? 'lastWeek' :
diff < 0 ? 'lastDay' :
diff < 1 ? 'sameDay' :
diff < 2 ? 'nextDay' :
diff < 7 ? 'nextWeek' : 'sameElse';
return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
}
function clone () {
return new Moment(this);
}
function isAfter (input, units) {
var inputMs;
units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
if (units === 'millisecond') {
input = isMoment(input) ? input : local__createLocal(input);
return +this > +input;
} else {
inputMs = isMoment(input) ? +input : +local__createLocal(input);
return inputMs < +this.clone().startOf(units);
}
}
function isBefore (input, units) {
var inputMs;
units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
if (units === 'millisecond') {
input = isMoment(input) ? input : local__createLocal(input);
return +this < +input;
} else {
inputMs = isMoment(input) ? +input : +local__createLocal(input);
return +this.clone().endOf(units) < inputMs;
}
}
function isBetween (from, to, units) {
return this.isAfter(from, units) && this.isBefore(to, units);
}
function isSame (input, units) {
var inputMs;
units = normalizeUnits(units || 'millisecond');
if (units === 'millisecond') {
input = isMoment(input) ? input : local__createLocal(input);
return +this === +input;
} else {
inputMs = +local__createLocal(input);
return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
}
}
function diff (input, units, asFloat) {
var that = cloneWithOffset(input, this),
zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
delta, output;
units = normalizeUnits(units);
if (units === 'year' || units === 'month' || units === 'quarter') {
output = monthDiff(this, that);
if (units === 'quarter') {
output = output / 3;
} else if (units === 'year') {
output = output / 12;
}
} else {
delta = this - that;
output = units === 'second' ? delta / 1e3 : // 1000
units === 'minute' ? delta / 6e4 : // 1000 * 60
units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
delta;
}
return asFloat ? output : absFloor(output);
}
function monthDiff (a, b) {
var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
anchor = a.clone().add(wholeMonthDiff, 'months'),
anchor2, adjust;
if (b - anchor < 0) {
anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
adjust = (b - anchor) / (anchor - anchor2);
} else {
anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
adjust = (b - anchor) / (anchor2 - anchor);
}
return -(wholeMonthDiff + adjust);
}
utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
function toString () {
return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}
function moment_format__toISOString () {
var m = this.clone().utc();
if (0 < m.year() && m.year() <= 9999) {
if ('function' === typeof Date.prototype.toISOString) {
return this.toDate().toISOString();
} else {
return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}
} else {
return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}
}
function format (inputString) {
var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
return this.localeData().postformat(output);
}
function from (time, withoutSuffix) {
if (!this.isValid()) {
return this.localeData().invalidDate();
}
return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
}
function fromNow (withoutSuffix) {
return this.from(local__createLocal(), withoutSuffix);
}
function to (time, withoutSuffix) {
if (!this.isValid()) {
return this.localeData().invalidDate();
}
return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
}
function toNow (withoutSuffix) {
return this.to(local__createLocal(), withoutSuffix);
}
function locale (key) {
var newLocaleData;
if (key === undefined) {
return this._locale._abbr;
} else {
newLocaleData = locale_locales__getLocale(key);
if (newLocaleData != null) {
this._locale = newLocaleData;
}
return this;
}
}
var lang = deprecate(
'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
function (key) {
if (key === undefined) {
return this.localeData();
} else {
return this.locale(key);
}
}
);
function localeData () {
return this._locale;
}
function startOf (units) {
units = normalizeUnits(units);
switch (units) {
case 'year':
this.month(0);
/* falls through */
case 'quarter':
case 'month':
this.date(1);
/* falls through */
case 'week':
case 'isoWeek':
case 'day':
this.hours(0);
/* falls through */
case 'hour':
this.minutes(0);
/* falls through */
case 'minute':
this.seconds(0);
/* falls through */
case 'second':
this.milliseconds(0);
}
if (units === 'week') {
this.weekday(0);
}
if (units === 'isoWeek') {
this.isoWeekday(1);
}
if (units === 'quarter') {
this.month(Math.floor(this.month() / 3) * 3);
}
return this;
}
function endOf (units) {
units = normalizeUnits(units);
if (units === undefined || units === 'millisecond') {
return this;
}
return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}
function to_type__valueOf () {
return +this._d - ((this._offset || 0) * 60000);
}
function unix () {
return Math.floor(+this / 1000);
}
function toDate () {
return this._offset ? new Date(+this) : this._d;
}
function toArray () {
var m = this;
return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}
function toObject () {
var m = this;
return {
years: m.year(),
months: m.month(),
date: m.date(),
hours: m.hours(),
minutes: m.minutes(),
seconds: m.seconds(),
milliseconds: m.milliseconds()
};
}
function moment_valid__isValid () {
return valid__isValid(this);
}
function parsingFlags () {
return extend({}, getParsingFlags(this));
}
function invalidAt () {
return getParsingFlags(this).overflow;
}
addFormatToken(0, ['gg', 2], 0, function () {
return this.weekYear() % 100;
});
addFormatToken(0, ['GG', 2], 0, function () {
return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken (token, getter) {
addFormatToken(0, [token, token.length], 0, getter);
}
addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');
addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');
addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);
addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
week[token.substr(0, 2)] = toInt(input);
});
addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
});
function weeksInYear(year, dow, doy) {
return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
}
function getSetWeekYear (input) {
var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
return input == null ? year : this.add((input - year), 'y');
}
function getSetISOWeekYear (input) {
var year = weekOfYear(this, 1, 4).year;
return input == null ? year : this.add((input - year), 'y');
}
function getISOWeeksInYear () {
return weeksInYear(this.year(), 1, 4);
}
function getWeeksInYear () {
var weekInfo = this.localeData()._week;
return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
addFormatToken('Q', 0, 0, 'quarter');
addUnitAlias('quarter', 'Q');
addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
array[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter (input) {
return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken('D', ['DD', 2], 'Do', 'date');
addUnitAlias('date', 'D');
addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
});
addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
array[DATE] = toInt(input.match(match1to2)[0], 10);
});
var getSetDayOfMonth = makeGetSet('Date', true);
addFormatToken('d', 0, 'do', 'day');
addFormatToken('dd', 0, 0, function (format) {
return this.localeData().weekdaysMin(this, format);
});
addFormatToken('ddd', 0, 0, function (format) {
return this.localeData().weekdaysShort(this, format);
});
addFormatToken('dddd', 0, 0, function (format) {
return this.localeData().weekdays(this, format);
});
addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');
addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');
addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   matchWord);
addRegexToken('ddd',  matchWord);
addRegexToken('dddd', matchWord);
addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
var weekday = config._locale.weekdaysParse(input);
if (weekday != null) {
week.d = weekday;
} else {
getParsingFlags(config).invalidWeekday = input;
}
});
addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
week[token] = toInt(input);
});
function parseWeekday(input, locale) {
if (typeof input !== 'string') {
return input;
}
if (!isNaN(input)) {
return parseInt(input, 10);
}
input = locale.weekdaysParse(input);
if (typeof input === 'number') {
return input;
}
return null;
}
var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m) {
return this._weekdays[m.day()];
}
var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
return this._weekdaysShort[m.day()];
}
var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
return this._weekdaysMin[m.day()];
}
function localeWeekdaysParse (weekdayName) {
var i, mom, regex;
this._weekdaysParse = this._weekdaysParse || [];
for (i = 0; i < 7; i++) {
if (!this._weekdaysParse[i]) {
mom = local__createLocal([2000, 1]).day(i);
regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
}
if (this._weekdaysParse[i].test(weekdayName)) {
return i;
}
}
}
function getSetDayOfWeek (input) {
var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
if (input != null) {
input = parseWeekday(input, this.localeData());
return this.add(input - day, 'd');
} else {
return day;
}
}
function getSetLocaleDayOfWeek (input) {
var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
return input == null ? weekday : this.add(input - weekday, 'd');
}
function getSetISODayOfWeek (input) {
return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
}
addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, function () {
return this.hours() % 12 || 12;
});
function meridiem (token, lowercase) {
addFormatToken(token, 0, 0, function () {
return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
});
}
meridiem('a', true);
meridiem('A', false);
addUnitAlias('hour', 'h');
function matchMeridiem (isStrict, locale) {
return locale._meridiemParse;
}
addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addParseToken(['H', 'HH'], HOUR);
addParseToken(['a', 'A'], function (input, array, config) {
config._isPm = config._locale.isPM(input);
config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
array[HOUR] = toInt(input);
getParsingFlags(config).bigHour = true;
});
function localeIsPM (input) {
return ((input + '').toLowerCase().charAt(0) === 'p');
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
if (hours > 11) {
return isLower ? 'pm' : 'PM';
} else {
return isLower ? 'am' : 'AM';
}
}
var getSetHour = makeGetSet('Hours', true);
addFormatToken('m', ['mm', 2], 0, 'minute');
addUnitAlias('minute', 'm');
addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);
var getSetMinute = makeGetSet('Minutes', false);
addFormatToken('s', ['ss', 2], 0, 'second');
addUnitAlias('second', 's');
addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);
var getSetSecond = makeGetSet('Seconds', false);
addFormatToken('S', 0, 0, function () {
return ~~(this.millisecond() / 100);
});
addFormatToken(0, ['SS', 2], 0, function () {
return ~~(this.millisecond() / 10);
});
addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
return this.millisecond() * 1000000;
});
addUnitAlias('millisecond', 'ms');
addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);
var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
addRegexToken(token, matchUnsigned);
}
function parseMs(input, array) {
array[MILLISECOND] = toInt(('0.' + input) * 1000);
}
for (token = 'S'; token.length <= 9; token += 'S') {
addParseToken(token, parseMs);
}
var getSetMillisecond = makeGetSet('Milliseconds', false);
addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');
function getZoneAbbr () {
return this._isUTC ? 'UTC' : '';
}
function getZoneName () {
return this._isUTC ? 'Coordinated Universal Time' : '';
}
var momentPrototype__proto = Moment.prototype;
momentPrototype__proto.add          = add_subtract__add;
momentPrototype__proto.calendar     = moment_calendar__calendar;
momentPrototype__proto.clone        = clone;
momentPrototype__proto.diff         = diff;
momentPrototype__proto.endOf        = endOf;
momentPrototype__proto.format       = format;
momentPrototype__proto.from         = from;
momentPrototype__proto.fromNow      = fromNow;
momentPrototype__proto.to           = to;
momentPrototype__proto.toNow        = toNow;
momentPrototype__proto.get          = getSet;
momentPrototype__proto.invalidAt    = invalidAt;
momentPrototype__proto.isAfter      = isAfter;
momentPrototype__proto.isBefore     = isBefore;
momentPrototype__proto.isBetween    = isBetween;
momentPrototype__proto.isSame       = isSame;
momentPrototype__proto.isValid      = moment_valid__isValid;
momentPrototype__proto.lang         = lang;
momentPrototype__proto.locale       = locale;
momentPrototype__proto.localeData   = localeData;
momentPrototype__proto.max          = prototypeMax;
momentPrototype__proto.min          = prototypeMin;
momentPrototype__proto.parsingFlags = parsingFlags;
momentPrototype__proto.set          = getSet;
momentPrototype__proto.startOf      = startOf;
momentPrototype__proto.subtract     = add_subtract__subtract;
momentPrototype__proto.toArray      = toArray;
momentPrototype__proto.toObject     = toObject;
momentPrototype__proto.toDate       = toDate;
momentPrototype__proto.toISOString  = moment_format__toISOString;
momentPrototype__proto.toJSON       = moment_format__toISOString;
momentPrototype__proto.toString     = toString;
momentPrototype__proto.unix         = unix;
momentPrototype__proto.valueOf      = to_type__valueOf;
momentPrototype__proto.year       = getSetYear;
momentPrototype__proto.isLeapYear = getIsLeapYear;
momentPrototype__proto.weekYear    = getSetWeekYear;
momentPrototype__proto.isoWeekYear = getSetISOWeekYear;
momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;
momentPrototype__proto.month       = getSetMonth;
momentPrototype__proto.daysInMonth = getDaysInMonth;
momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
momentPrototype__proto.weeksInYear    = getWeeksInYear;
momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;
momentPrototype__proto.date       = getSetDayOfMonth;
momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
momentPrototype__proto.dayOfYear  = getSetDayOfYear;
momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;
momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;
momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;
momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;
momentPrototype__proto.utcOffset            = getSetOffset;
momentPrototype__proto.utc                  = setOffsetToUTC;
momentPrototype__proto.local                = setOffsetToLocal;
momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
momentPrototype__proto.isDST                = isDaylightSavingTime;
momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
momentPrototype__proto.isLocal              = isLocal;
momentPrototype__proto.isUtcOffset          = isUtcOffset;
momentPrototype__proto.isUtc                = isUtc;
momentPrototype__proto.isUTC                = isUtc;
momentPrototype__proto.zoneAbbr = getZoneAbbr;
momentPrototype__proto.zoneName = getZoneName;
momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
var momentPrototype = momentPrototype__proto;
function moment__createUnix (input) {
return local__createLocal(input * 1000);
}
function moment__createInZone () {
return local__createLocal.apply(null, arguments).parseZone();
}
var defaultCalendar = {
sameDay : '[Today at] LT',
nextDay : '[Tomorrow at] LT',
nextWeek : 'dddd [at] LT',
lastDay : '[Yesterday at] LT',
lastWeek : '[Last] dddd [at] LT',
sameElse : 'L'
};
function locale_calendar__calendar (key, mom, now) {
var output = this._calendar[key];
return typeof output === 'function' ? output.call(mom, now) : output;
}
var defaultLongDateFormat = {
LTS  : 'h:mm:ss A',
LT   : 'h:mm A',
L    : 'MM/DD/YYYY',
LL   : 'MMMM D, YYYY',
LLL  : 'MMMM D, YYYY h:mm A',
LLLL : 'dddd, MMMM D, YYYY h:mm A'
};
function longDateFormat (key) {
var format = this._longDateFormat[key],
formatUpper = this._longDateFormat[key.toUpperCase()];
if (format || !formatUpper) {
return format;
}
this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
return val.slice(1);
});
return this._longDateFormat[key];
}
var defaultInvalidDate = 'Invalid date';
function invalidDate () {
return this._invalidDate;
}
var defaultOrdinal = '%d';
var defaultOrdinalParse = /\d{1,2}/;
function ordinal (number) {
return this._ordinal.replace('%d', number);
}
function preParsePostFormat (string) {
return string;
}
var defaultRelativeTime = {
future : 'in %s',
past   : '%s ago',
s  : 'a few seconds',
m  : 'a minute',
mm : '%d minutes',
h  : 'an hour',
hh : '%d hours',
d  : 'a day',
dd : '%d days',
M  : 'a month',
MM : '%d months',
y  : 'a year',
yy : '%d years'
};
function relative__relativeTime (number, withoutSuffix, string, isFuture) {
var output = this._relativeTime[string];
return (typeof output === 'function') ?
output(number, withoutSuffix, string, isFuture) :
output.replace(/%d/i, number);
}
function pastFuture (diff, output) {
var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
}
function locale_set__set (config) {
var prop, i;
for (i in config) {
prop = config[i];
if (typeof prop === 'function') {
this[i] = prop;
} else {
this['_' + i] = prop;
}
}
this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
}
var prototype__proto = Locale.prototype;
prototype__proto._calendar       = defaultCalendar;
prototype__proto.calendar        = locale_calendar__calendar;
prototype__proto._longDateFormat = defaultLongDateFormat;
prototype__proto.longDateFormat  = longDateFormat;
prototype__proto._invalidDate    = defaultInvalidDate;
prototype__proto.invalidDate     = invalidDate;
prototype__proto._ordinal        = defaultOrdinal;
prototype__proto.ordinal         = ordinal;
prototype__proto._ordinalParse   = defaultOrdinalParse;
prototype__proto.preparse        = preParsePostFormat;
prototype__proto.postformat      = preParsePostFormat;
prototype__proto._relativeTime   = defaultRelativeTime;
prototype__proto.relativeTime    = relative__relativeTime;
prototype__proto.pastFuture      = pastFuture;
prototype__proto.set             = locale_set__set;
prototype__proto.months       =        localeMonths;
prototype__proto._months      = defaultLocaleMonths;
prototype__proto.monthsShort  =        localeMonthsShort;
prototype__proto._monthsShort = defaultLocaleMonthsShort;
prototype__proto.monthsParse  =        localeMonthsParse;
prototype__proto.week = localeWeek;
prototype__proto._week = defaultLocaleWeek;
prototype__proto.firstDayOfYear = localeFirstDayOfYear;
prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;
prototype__proto.weekdays       =        localeWeekdays;
prototype__proto._weekdays      = defaultLocaleWeekdays;
prototype__proto.weekdaysMin    =        localeWeekdaysMin;
prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
prototype__proto.weekdaysShort  =        localeWeekdaysShort;
prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
prototype__proto.weekdaysParse  =        localeWeekdaysParse;
prototype__proto.isPM = localeIsPM;
prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
prototype__proto.meridiem = localeMeridiem;
function lists__get (format, index, field, setter) {
var locale = locale_locales__getLocale();
var utc = create_utc__createUTC().set(setter, index);
return locale[field](utc, format);
}
function list (format, index, field, count, setter) {
if (typeof format === 'number') {
index = format;
format = undefined;
}
format = format || '';
if (index != null) {
return lists__get(format, index, field, setter);
}
var i;
var out = [];
for (i = 0; i < count; i++) {
out[i] = lists__get(format, i, field, setter);
}
return out;
}
function lists__listMonths (format, index) {
return list(format, index, 'months', 12, 'month');
}
function lists__listMonthsShort (format, index) {
return list(format, index, 'monthsShort', 12, 'month');
}
function lists__listWeekdays (format, index) {
return list(format, index, 'weekdays', 7, 'day');
}
function lists__listWeekdaysShort (format, index) {
return list(format, index, 'weekdaysShort', 7, 'day');
}
function lists__listWeekdaysMin (format, index) {
return list(format, index, 'weekdaysMin', 7, 'day');
}
locale_locales__getSetGlobalLocale('en', {
ordinalParse: /\d{1,2}(th|st|nd|rd)/,
ordinal : function (number) {
var b = number % 10,
output = (toInt(number % 100 / 10) === 1) ? 'th' :
(b === 1) ? 'st' :
(b === 2) ? 'nd' :
(b === 3) ? 'rd' : 'th';
return number + output;
}
});
utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
var mathAbs = Math.abs;
function duration_abs__abs () {
var data           = this._data;
this._milliseconds = mathAbs(this._milliseconds);
this._days         = mathAbs(this._days);
this._months       = mathAbs(this._months);
data.milliseconds  = mathAbs(data.milliseconds);
data.seconds       = mathAbs(data.seconds);
data.minutes       = mathAbs(data.minutes);
data.hours         = mathAbs(data.hours);
data.months        = mathAbs(data.months);
data.years         = mathAbs(data.years);
return this;
}
function duration_add_subtract__addSubtract (duration, input, value, direction) {
var other = create__createDuration(input, value);
duration._milliseconds += direction * other._milliseconds;
duration._days         += direction * other._days;
duration._months       += direction * other._months;
return duration._bubble();
}
function duration_add_subtract__add (input, value) {
return duration_add_subtract__addSubtract(this, input, value, 1);
}
function duration_add_subtract__subtract (input, value) {
return duration_add_subtract__addSubtract(this, input, value, -1);
}
function absCeil (number) {
if (number < 0) {
return Math.floor(number);
} else {
return Math.ceil(number);
}
}
function bubble () {
var milliseconds = this._milliseconds;
var days         = this._days;
var months       = this._months;
var data         = this._data;
var seconds, minutes, hours, years, monthsFromDays;
if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
(milliseconds <= 0 && days <= 0 && months <= 0))) {
milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
days = 0;
months = 0;
}
data.milliseconds = milliseconds % 1000;
seconds           = absFloor(milliseconds / 1000);
data.seconds      = seconds % 60;
minutes           = absFloor(seconds / 60);
data.minutes      = minutes % 60;
hours             = absFloor(minutes / 60);
data.hours        = hours % 24;
days += absFloor(hours / 24);
monthsFromDays = absFloor(daysToMonths(days));
months += monthsFromDays;
days -= absCeil(monthsToDays(monthsFromDays));
years = absFloor(months / 12);
months %= 12;
data.days   = days;
data.months = months;
data.years  = years;
return this;
}
function daysToMonths (days) {
return days * 4800 / 146097;
}
function monthsToDays (months) {
return months * 146097 / 4800;
}
function as (units) {
var days;
var months;
var milliseconds = this._milliseconds;
units = normalizeUnits(units);
if (units === 'month' || units === 'year') {
days   = this._days   + milliseconds / 864e5;
months = this._months + daysToMonths(days);
return units === 'month' ? months : months / 12;
} else {
days = this._days + Math.round(monthsToDays(this._months));
switch (units) {
case 'week'   : return days / 7     + milliseconds / 6048e5;
case 'day'    : return days         + milliseconds / 864e5;
case 'hour'   : return days * 24    + milliseconds / 36e5;
case 'minute' : return days * 1440  + milliseconds / 6e4;
case 'second' : return days * 86400 + milliseconds / 1000;
case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
default: throw new Error('Unknown unit ' + units);
}
}
}
function duration_as__valueOf () {
return (
this._milliseconds +
this._days * 864e5 +
(this._months % 12) * 2592e6 +
toInt(this._months / 12) * 31536e6
);
}
function makeAs (alias) {
return function () {
return this.as(alias);
};
}
var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');
function duration_get__get (units) {
units = normalizeUnits(units);
return this[units + 's']();
}
function makeGetter(name) {
return function () {
return this._data[name];
};
}
var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');
function weeks () {
return absFloor(this.days() / 7);
}
var round = Math.round;
var thresholds = {
s: 45,  // seconds to minute
m: 45,  // minutes to hour
h: 22,  // hours to day
d: 26,  // days to month
M: 11   // months to year
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
var duration = create__createDuration(posNegDuration).abs();
var seconds  = round(duration.as('s'));
var minutes  = round(duration.as('m'));
var hours    = round(duration.as('h'));
var days     = round(duration.as('d'));
var months   = round(duration.as('M'));
var years    = round(duration.as('y'));
var a = seconds < thresholds.s && ['s', seconds]  ||
minutes === 1          && ['m']           ||
minutes < thresholds.m && ['mm', minutes] ||
hours   === 1          && ['h']           ||
hours   < thresholds.h && ['hh', hours]   ||
days    === 1          && ['d']           ||
days    < thresholds.d && ['dd', days]    ||
months  === 1          && ['M']           ||
months  < thresholds.M && ['MM', months]  ||
years   === 1          && ['y']           || ['yy', years];
a[2] = withoutSuffix;
a[3] = +posNegDuration > 0;
a[4] = locale;
return substituteTimeAgo.apply(null, a);
}
function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
if (thresholds[threshold] === undefined) {
return false;
}
if (limit === undefined) {
return thresholds[threshold];
}
thresholds[threshold] = limit;
return true;
}
function humanize (withSuffix) {
var locale = this.localeData();
var output = duration_humanize__relativeTime(this, !withSuffix, locale);
if (withSuffix) {
output = locale.pastFuture(+this, output);
}
return locale.postformat(output);
}
var iso_string__abs = Math.abs;
function iso_string__toISOString() {
var seconds = iso_string__abs(this._milliseconds) / 1000;
var days         = iso_string__abs(this._days);
var months       = iso_string__abs(this._months);
var minutes, hours, years;
minutes           = absFloor(seconds / 60);
hours             = absFloor(minutes / 60);
seconds %= 60;
minutes %= 60;
years  = absFloor(months / 12);
months %= 12;
var Y = years;
var M = months;
var D = days;
var h = hours;
var m = minutes;
var s = seconds;
var total = this.asSeconds();
if (!total) {
return 'P0D';
}
return (total < 0 ? '-' : '') +
'P' +
(Y ? Y + 'Y' : '') +
(M ? M + 'M' : '') +
(D ? D + 'D' : '') +
((h || m || s) ? 'T' : '') +
(h ? h + 'H' : '') +
(m ? m + 'M' : '') +
(s ? s + 'S' : '');
}
var duration_prototype__proto = Duration.prototype;
duration_prototype__proto.abs            = duration_abs__abs;
duration_prototype__proto.add            = duration_add_subtract__add;
duration_prototype__proto.subtract       = duration_add_subtract__subtract;
duration_prototype__proto.as             = as;
duration_prototype__proto.asMilliseconds = asMilliseconds;
duration_prototype__proto.asSeconds      = asSeconds;
duration_prototype__proto.asMinutes      = asMinutes;
duration_prototype__proto.asHours        = asHours;
duration_prototype__proto.asDays         = asDays;
duration_prototype__proto.asWeeks        = asWeeks;
duration_prototype__proto.asMonths       = asMonths;
duration_prototype__proto.asYears        = asYears;
duration_prototype__proto.valueOf        = duration_as__valueOf;
duration_prototype__proto._bubble        = bubble;
duration_prototype__proto.get            = duration_get__get;
duration_prototype__proto.milliseconds   = milliseconds;
duration_prototype__proto.seconds        = seconds;
duration_prototype__proto.minutes        = minutes;
duration_prototype__proto.hours          = hours;
duration_prototype__proto.days           = days;
duration_prototype__proto.weeks          = weeks;
duration_prototype__proto.months         = months;
duration_prototype__proto.years          = years;
duration_prototype__proto.humanize       = humanize;
duration_prototype__proto.toISOString    = iso_string__toISOString;
duration_prototype__proto.toString       = iso_string__toISOString;
duration_prototype__proto.toJSON         = iso_string__toISOString;
duration_prototype__proto.locale         = locale;
duration_prototype__proto.localeData     = localeData;
duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
duration_prototype__proto.lang = lang;
addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');
addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
config._d = new Date(toInt(input));
});
utils_hooks__hooks.version = '2.10.6';
setHookCallback(local__createLocal);
utils_hooks__hooks.fn                    = momentPrototype;
utils_hooks__hooks.min                   = min;
utils_hooks__hooks.max                   = max;
utils_hooks__hooks.utc                   = create_utc__createUTC;
utils_hooks__hooks.unix                  = moment__createUnix;
utils_hooks__hooks.months                = lists__listMonths;
utils_hooks__hooks.isDate                = isDate;
utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
utils_hooks__hooks.invalid               = valid__createInvalid;
utils_hooks__hooks.duration              = create__createDuration;
utils_hooks__hooks.isMoment              = isMoment;
utils_hooks__hooks.weekdays              = lists__listWeekdays;
utils_hooks__hooks.parseZone             = moment__createInZone;
utils_hooks__hooks.localeData            = locale_locales__getLocale;
utils_hooks__hooks.isDuration            = isDuration;
utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
utils_hooks__hooks.defineLocale          = defineLocale;
utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
utils_hooks__hooks.normalizeUnits        = normalizeUnits;
utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
var _moment = utils_hooks__hooks;
return _moment;
}));/**
* Google map popup plugin
*/
var googleMapPopUp = new function() {
var gMapPopUp = this;
this.init = function( settings ) {
gMapPopUp.locationData = settings.locationData;
var location = gMapPopUp.locationData.data('location');
gMapPopUp.locationData.on('click',function() {
buildPopup('popupRestaurantReservations','','','/include/globalMapDisplay.php?q='+encodeURIComponent(location)+'',true,false,true,'');
});
};
};jQuery(function($) {
DonateModuleInitialize_Layout1();
});
/**
* The function initialize the Donate Module.
*/
function DonateModuleInitialize_Layout1() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('.s123-module.s123-module-donate.layout-1');
$section.each(function( index ) {
var $sectionThis = $(this);
var $donateForm = $sectionThis.find('.donateForm');
var $donateButton = $sectionThis.find('.updateCustom');
var $donateAmount = $sectionThis.find('.donate-amount');
$donateButton.off('click').on('click',function() {
$donateAmount.val($.trim($(this).data('amount')));
});
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$donateForm.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
errorPlacement: function (error, element) {
if( element.is('input[type=checkbox]') || element.is('input[type=radio]') ) {
var controls = element.closest('div[class*="col-"]');
if( controls.find(':checkbox,:radio').length > 1 ) controls.append(error);
else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
}
else if( element.is('.select2') ) {
error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
}
else if( element.is('.chosen-select') ) {
error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
}
else {
error.appendTo(element.closest('.form-group'));
}
},
submitHandler: function( form ) {
var $form = $(form);
var formValues = getFormValues($form);
$('<form action="/versions/'+$('#versionNUM').val()+'/wizard/orders/front/addToCart.php" method="post">' +
'<input type="text" name="w" value="' + $('#w').val() + '" />' +
'<input type="text" name="websiteID" value="' + $('#websiteID').val() + '" />' +
'<input type="text" name="uniquePageID" value="' + formValues.uniquePageID + '" />' +
'<input type="text" name="moduleID" value="' + formValues.moduleID + '" />' +
'<input type="text" name="tranW" value="' + formValues.tranW + '" />' +
'<input type="text" name="amount" value="1" />' +
'<input type="text" name="dynamicPrice" value="' + formValues.amount + '" />' +
'<input type="text" name="redirect" value="1" />' +
'</form>')
.appendTo('body')
.submit();
return false;
}
});
});
});
}jQuery(function($) {
foodDeliveryInitialize();
});
/**
* The function initialize the Menu Module.
*/
function foodDeliveryInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('.s123-module-foodDelivery.layout-1');
var websiteCurrency = $('[data-type="symbol"]').html();
$.each($section,function( index, section ) {
var $thisSection = $(section);
var $categories = $thisSection.find('.food-delivery-categories-container li');
var $products = $thisSection.find('.food-delivery-items-container > div');
var $options = null;
var $ct = null;
var $ct_fieldTitle = null;
var $ct_charLimit = null;
var $IframeCart = $thisSection.find('.order-info-iframe');
var IframeSrc = $('.order-info-iframe').attr('src');
var IframeHeight = $thisSection.find('.food-delivery-items-container').height();
var $cartPopup = $thisSection.find('.cart-popup');
$cartPopup.on('click',function() {
cartPopupEvent($cartPopup.data('moduleid'));
});
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
var $filtered = $products.filter('[data-product-filter=' + $category.data('categories-filter') + ']');
if ( initialize ) {
$products.hide();
$filtered.show();
} else {
$products.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
IframeHeight = $thisSection.find('.food-delivery-items-container').height();
$IframeCart.css('height',IframeHeight);
});
}
return false;
});
$categories.first().trigger('click',true);
$thisSection.find('.products-responsive-filter').click(function() {
var $category = $(this);
$thisSection.find('.categories-panel').slideToggle('slow');
$category.toggleClass('active');
return false;
});
buisnessHoursTemplate.init({
$buisnessHourContainer : $thisSection.find('.foodDeliveryWorkingDaysTemplate'),
buisnessHourJSON : $thisSection.find(".foodDeliveryWorkingDays")
});
var buisnessIsActive = checkIfActive($thisSection.find(".foodDeliveryWorkingDays").val());
$thisSection.find('.popup-order-window').addClass('disabled');
if (!buisnessIsActive) {
$thisSection.find('.open-at').addClass('hidden');
return false;
} else {
$thisSection.find('.note-for-users').addClass('hidden');
$thisSection.find('.early-orders').addClass('hidden');
}
$thisSection.find('.popup-order-window').removeClass('disabled');
var additionalData = {};
additionalData.productEdit = false;
$.each($thisSection.find('.popup-order-window'),function( index, item ) {
productPopUpEvent($(item),IframeSrc,$cartPopup,additionalData);
});
$.each($thisSection.find('.item-image.online-orders-active'),function( index, item ) {
productPopUpEvent($(item),IframeSrc,$cartPopup,additionalData);
});
$IframeCart.off('load').on('load',function() {
var $iframe = $(this);
var $edit = $iframe.contents().find('body').find('.edit-product, .product-name');
$edit.off('click').on('click',function() {
var productID = $(this).data('productid');
var uniquepageID = $(this).data('uniquepageid');
var cartType = $(this).data('carttype');
var moduleID = $(this).data('moduleid');
var customText = $(this).data('customtext');
var productOptions =  $(this).closest('.row.item').find('.hidden-product-options');
productOptions = tryParseJSON(productOptions.val());
$.each($thisSection.find('.hidden-add-to-cart'),function( index, data ) {
var productData = tryParseJSON($(data).val());
/**
* if the data is the same that means we need
* to trigger the popup window for this specific item
*/
if(productData.moduleID == moduleID && productData.uniqueID == uniquepageID) {
var $addToOrder = $(this).closest('.food-delivery-item-parent').find('.popup-order-window');
var additionalData = {};
additionalData.productEdit = true;
additionalData.productEdit = true;
additionalData.productOptions = productOptions;
additionalData.customText = customText;
productPopUpEvent($addToOrder,IframeSrc,$cartPopup,additionalData);
}
});
});
});
if ($thisSection.find('.one-page').val() == '1') {
$IframeCart.data('offset-top',$('.s123-module-foodDelivery.layout-1').offset().top);
$IframeCart.css('top',$('#mainNav').height());
} else {
$IframeCart.data('offset-top',$IframeCart.offset().top);
$IframeCart.css('top',$('#mainNav').height());
}
/*
$thisSection.find('.order-info-iframe').affix({
offset: {
top: parseInt($thisSection.find('.order-info-iframe').offset().top)
}
});
*/
});
/**
* The function is adding to the item onclick event that will show the popup window
* @param {object} object - HTML element that will receive the event.
* @param {String} String - Cart iframe src.
* @param {object} object - HTML element - identification if we should show the cart popup (mobile only).
* @param {boolean} boolean - true / false - identification if we should trigger the popup event.
*/
function productPopUpEvent($addToOrder,IframeSrc,$cartPopup,additionalData) {
$addToOrder.off('click').on('click',function() {
var $itemParent = $(this).parents('.food-delivery-item-parent');
var itemData = {};
itemData.options = JSON.parse($itemParent.find('.productOptionsSettings').val());
itemData.customText = JSON.parse($itemParent.find('.customTextSettings').val());
itemData.addToCartData = JSON.parse($itemParent.find('.hidden-add-to-cart').val());
var itemHTML = generateItemHTML(itemData,$itemParent);
/**
* Build the item window, documentation:
* http://bootboxjs.com/documentation.html
*/
var foodDeliveryWindow = bootbox.dialog({
title: translations.foodDeliverybootBoxTitle,
message: itemHTML,
className: 'foodDeliveryItemWindow',
backdrop: true,
});
foodDeliveryWindow.on('shown.bs.modal', function() {
$popUpWindow = $(this);
$popUpWindow.find('.btn-buy-now').off('click').on('click',function() {
var $this = $(this);
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/wizard/orders/front/addToCart.php",
data: {
w: $('#w').val(),
websiteID: $('#websiteID').val(),
uniquePageID: $this.data('unique-page'),
moduleID: $this.data('module'),
moduleTypeNUM : '97',
productOptions: $popUpWindow.find('#productOptions').length !== 0 ? $popUpWindow.find('#productOptions').html() : '',
customText: $popUpWindow.find('#customText').length !== 0 ? $popUpWindow.find('#customText').html() : '',
productEdit: additionalData.productEdit
},
success: function() {
$('.order-info-iframe').attr('src',IframeSrc);
/**
* We are cheeking if the floating button is visible and
* if it is then show the cart popup window from the side
*/
if ($cartPopup.is(':visible')) {
cartPopupEvent($cartPopup.data('moduleid'));
}
CountStoreItems();
bootbox.hideAll();
}
});
});
$('.foodDeliveryItemWindow').on('click',function(e) {
if ($(e.target).attr('class') != 'modal-backdrop fade in') {
return;
}
bootbox.hideAll();
});
$(document).trigger('s123.page.ready.activeOrderPopup');
if (additionalData.productEdit) {
$popUpWindow.find('.btn-buy-now').html(translations.save);
foodDeliveryOptionsInit($addToOrder);
foodDeliveryOptionsLoad($popUpWindow,additionalData.productOptions);
foodDeliveryCustomTextInit($popUpWindow);
foodDeliveryCustomTextLoad($popUpWindow,additionalData.customText);
} else {
foodDeliveryOptionsInit($addToOrder);
foodDeliveryOptionsLoad($popUpWindow,additionalData.productOptions);
foodDeliveryCustomTextInit($popUpWindow);
}
});
});
if (additionalData.productEdit) {
$addToOrder.trigger('click');
}
}
/**
* The function is loading the custom text to the popup window
* when clicking on the product edit on the product name
* @param {Object} - Modal dialog window
* @param {Object} - Custom text JSON
*/
function foodDeliveryCustomTextLoad( popUpWindow, customText ) {
popUpWindow.find('#ct_fieldTitle').val(customText).trigger('input');
}
/**
* The function is loading the product options to the popup window
* when clicking on the product edit on the product name
* @param {Object} - Modal dialog window
* @param {Object} - Product options JSON
*/
function foodDeliveryOptionsLoad( popUpWindow, productOptions ) {
if(!productOptions) {
popUpWindow.find('.p-o-radio-button').find('[name="foodDeliverRadion"]').first().trigger('click');
} else {
var pOptions = JSON.stringify(productOptions);
$.each(productOptions,function( index, option ) {
popUpWindow.find('#'+option.item.id).prop('checked',true).trigger('click');
});
popUpWindow.find('#productOptions').html(pOptions);
}
}
function cartPopupEvent( moduleID ) {
buildSmallPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&tranW='+websiteLanguageCountryFullCode+'&moduleID='+moduleID,true,false,true,'');
}
/**
* The function is checking if the business is active today
* and if it is the order now button is enabled else  it's disabled.
*/
function checkIfActive( buisnessHours ) {
if (!tryParseJSON(buisnessHours)) {
return false;
} else {
var object = tryParseJSON(buisnessHours);
var earlyOrders = object.earlyOrders;
var fullTime = object.fullTime;
var hours = object.businessHours;
var firstDayOfWeek = object.firstDayOfWeek;
if (firstDayOfWeek == '' || hours=='[]' || firstDayOfWeek == '') {
return false;
}
var dayOfTheWeek = moment(object.today).day();
if ( dayOfTheWeek == 0) {
if ( parseInt(firstDayOfWeek) == 1 ) {
var dataIndex = 6;
} else {
var dataIndex = dayOfTheWeek;
}
} else {
var dataIndex = dayOfTheWeek - parseInt(firstDayOfWeek);
}
if (hours[dataIndex].isActive || fullTime == 'on' || earlyOrders == 'yes') {
return true;
} else {
return false;
}
}
}
/**
* The function trying to parse the sent JSON string, we use it to prevent
* JS error if the JSON is not valid from some reason.
*
* @param {string} str - JSON string.
* @return {object} Obj - Valid Object or False if the sent JSON string is invalid.
*/
function tryParseJSON( str ) {
try {
var Obj = JSON.parse(str);
if ( Obj && typeof Obj === "object" ) {
return Obj;
}
} catch (e) {}
return false;
}
function foodDeliveryOptionsInit( $thisSection ) {
var $foodDeliveryItemWindow = $('.foodDeliveryItemWindow');
var $productOptions = $foodDeliveryItemWindow.find(".product-options");
$options = $productOptions.find('.p-o-container');
$.each($('.bootbox-item-price').find('span'), function( index, span ) {
if ($(span).data('type') == 'price') {
$(span).data('price',$(span).html());
}
});
if ( $productOptions.length !== 0 ) {
$options.filter('[data-type="checkbox"]').each( function() {
var $option = $(this);
var $checkbox = $option.find('.p-o-check-box').find('input[type="checkbox"]');
$checkbox.click( function( event ) {
$checkbox.filter('.selected').removeClass('selected');
foodDeliveryItemOptionsUpdate($thisSection);
});
});
$options.filter('[data-type="radioButton"]').each( function() {
var $option = $(this);
var $radio = $option.find('.p-o-radio-button').find('input[type="radio"]');
$radio.click( function( event ) {
$radio.filter('.selected').removeClass('selected');
foodDeliveryItemOptionsUpdate($thisSection);
});
});
}
}
/**
* The function update the product options object.
*/
function foodDeliveryItemOptionsUpdate( $thisSection ) {
var po = [];
var totalItemsPrice = 0.00;
$options.each( function() {
var $option = $(this);
switch( $option.data('type') ) {
case 'checkbox':
var $checkbox = $option.find('.p-o-check-box').find('input[type="checkbox"]:checked');
var $checkboxUnchecked = $option.find('.p-o-check-box').find('input[type="checkbox"]:unchecked');
$.each($checkbox,function( index, checkbox ) {
var pOption = new foodDeliveryProductOptions();
pOption.id = $option.get(0).id;
pOption.title = fixQuotIssue($option.data('title'));
pOption.type = $option.data('type');
pOption.item.id = $(checkbox).get(0).id;
pOption.item.title = fixQuotIssue($(checkbox).val());
pOption.item.price = $(checkbox).data('price');
totalItemsPrice += parseFloat(pOption.item.price);
po.push(pOption);
foodDeliveryChangePrice(po);
});
$.each($checkboxUnchecked,function( index, checkbox ) {
foodDeliveryChangePrice(po);
});
break;
case 'radioButton':
var pOption = new foodDeliveryProductOptions();
pOption.id = $option.get(0).id;
pOption.title = fixQuotIssue($option.data('title'));
pOption.type = $option.data('type');
var $radio = $option.find('.p-o-radio-button').find('input[type="radio"]:checked');
pOption.item.id = $radio.get(0).id;
pOption.item.title = fixQuotIssue($radio.val());
pOption.item.price = $radio.data('price');
totalItemsPrice += parseFloat(pOption.item.price);
po.push(pOption);
foodDeliveryChangePrice(po);
break;
}
});
$('#productOptions').html(JSON.stringify(po));
foodDeliveryaddItemsPrice(totalItemsPrice,$thisSection);
}
/**
* Change the price in the span element.
*/
function foodDeliveryChangePrice( po ) {
var $priceSpan =  $('.bootbox-item-price.total').find('span[data-type="price"]');
var price = parseFloat($priceSpan.data('price'));
$.each(po,function( index, value ) {
price = parseFloat(value.item.price) + price;
});
$priceSpan.html(price);
}
/**
* Product Option Class.
*/
function foodDeliveryProductOptions() {
return {
id: null,
title: null,
type: null,
item: {
id: null,
title: null,
price: 0
}
};
}
/**
* The function add product items price to the product price.
* @param {float} totalItemsPrice - The total items price.
*/
function foodDeliveryaddItemsPrice( totalItemsPrice, $thisSection  ) {
var $productPrice = $thisSection.find('#productPrice');
var $price = $productPrice.find('[data-type="price"]');
if ( !$.isNumeric(totalItemsPrice) ) return;
if ( parseFloat($productPrice.data('price'))
+ parseFloat(totalItemsPrice) == parseFloat($price.html()) ) return;
var p = parseFloat($productPrice.data('price')) + parseFloat(totalItemsPrice);
$price.html(p.toFixed(2));
}
function foodDeliveryCustomTextInit($thisSection) {
$ct = $('.foodDeliveryItemWindow').find('#product-custom-text');
$ct_fieldTitle = $ct.find("#ct_fieldTitle");
$ct_charLimit = $ct.find("#ct_charLimit");
var $orderButtonPopup = $thisSection.find(".btn-buy-now");
$ct_fieldTitle.on('input', function( event ) {
var max = $ct.data('char-limit');
var length = $ct_fieldTitle.val().length
if ( length > max) {
$ct_fieldTitle.val($ct_fieldTitle.val().substring(0, max));
} else {
$ct_charLimit.html(max - length);
}
foodDeliveryCustomTextUpdate();
});
}
/**
* The function update the custom text object.
*/
function foodDeliveryCustomTextUpdate() {
var ct = new CustomText();
ct.fieldTitle = fixQuotIssue($ct.data('field-title'));
ct.value = $ct_fieldTitle.val();
$('#customText').html(JSON.stringify(ct));
}
/**
* Custom Text Class.
*/
function CustomText() {
return {
fieldTitle: null,
value: null
};
}
/**
* The function convert `&quot;` to `"`, We use data attribute to to pass
* some of the fields with `htmlspecialchars()` on the server side to
* prevent HTML break with quot, the JS function `stringify` doesn't
* handle `&quot;` chars so we fix it manually by replacing it to `"`.
* In the feature we need to stop passing the values using `data`.
*/
function fixQuotIssue( value ) {
if ( !value ) return value;
return value.toString().replace(/\&quot;/g,'\"');
}
/**
* Generate the HTML string of the the item box.
* @param {Object} -> Item Data.
*/
function generateItemHTML( itemData, $itemParent ) {
var html ='';
html += foodDeliveryBootBoxTemplate();
var imageSrc = $itemParent.find('.item-image').css('background-image');
if(imageSrc) {
imageSrc = imageSrc.replace('url(','').replace(')','').replace(/\"/gi, "");
} else {
imageSrc =' ';
}
html = html.replace('{{imgsrc}}',imageSrc);
var itemPrice = '';
if ($itemParent.find('.item-details > .item-price').length > 0 ) {
var itemPrice = $itemParent.find('.item-details > .item-price').html();
}
html = html.replace('{{Price}}',itemPrice);
html = html.replace('{{Total}}',itemPrice);
var itemTitle = $itemParent.find('.item-details > h4').html();
html = html.replace('{{Header}}',itemTitle);
var itemDescription = $itemParent.find('.item-details > .item-des').html();
html = html.replace('{{Des}}',itemDescription);
var optionsHTML = generateitemoptionsHTML(itemData.options);
html = html.replace('{{itemOptions}}',optionsHTML);
var customTextHTML = generateCustomText(itemData.customText);
html = html.replace('{{customText}}',customTextHTML);
var addToCart = generateAddToCartBtn(itemData.addToCartData);
html = html.replace('{{addToCart}}',addToCart);
return html;
}
/**
* Generate the HTML string of the Custom text.
* @param {Object} -> Custom Text Structure.
*/
function generateCustomText( customTextData ) {
var html ='';
if ( customTextData.active ) {
html = '<div id="product-custom-text" data-char-limit="'+customTextData.charLimit+'" data-mandatory="'+customTextData.mandatory+'" data-field-title="'+escapeHtml(customTextData.fieldTitle)+'">';
html += '<div class="form-group">';
html += '<label for="ct_fieldTitle">'+escapeHtml(customTextData.fieldTitle)+':</label>';
html += '<div class="c-t-input-container">';
html += '<input type="text" maxlength="'+customTextData.charLimit+'" id="ct_fieldTitle" class="form-control" placeholder="'+customTextData.charLimit+'">';
html += '<span id="ct_charLimit">'+customTextData.charLimit+'</span>';
html += '</div>';
html += '</div>';
html += '<textarea id="customText" class="hidden"></textarea>';
html += '</div>';
}
return html;
}
/**
* Generate the HTML string of add to cart button.
* @param {Object} -> module id and item unique id.
*/
function generateAddToCartBtn( addToCartData ) {
var html = '';
html += '<a class="btn btn-primary btn-buy-now" data-module="'+addToCartData.moduleID+'" data-unique-page="'+addToCartData.uniqueID+'">'+translations.addToCart+'</a>';
return html;
}
/**
* Generate the HTML string of the product option.
* @param {Object} product option structure.
*/
function generateitemoptionsHTML( optionsJSON ) {
var html ='';
if ( optionsJSON.active ) {
html = '<div class="product-options">';
$.each(optionsJSON, function( index, options ) {
$.each(options, function( index, option ) {
html += '<div id="'+option.id+'" class="p-o-container" data-type="'+option.type+'" data-title="'+option.title+'">';
html += '<div class="p-o-title">'+option.title+': <span class="p-o-item-value"></span></div>';
switch ( option.type ) {
case 'color':
html += '<ul class="p-o-color-list">';
$.each( option.items,function( index, item ) {
if ( !item.price ) item.price = 0;
html += '<li id="'+item.id+'" data-price="'+item.price+websiteCurrency+'" class="p-o-color" title="'+escapeHtml(item.title)+'"><span style="background:'+item.color+';"></span></li>';
});
html += '</ul>';
break;
case 'checkbox':
html += '<div class="p-o-check-box form-group">';
$.each( option.items,function( index, item ) {
if ( !item.price ) item.price = 0;
html += '<label>';
html += '<input type="checkbox" id="'+item.id+'" data-price="'+item.price+'" value="'+escapeHtml(item.title)+'">';
html += escapeHtml(item.title)+ '- '+item.price+websiteCurrency+'</label><br>';
});
html += '</div>';
break;
case 'radioButton':
html += '<div class="p-o-radio-button form-group">';
$.each( option.items,function( index, item ) {
if ( !item.price ) item.price = 0;
html += '<label>';
html += '<input type="radio" '+ (index==0 ? "checked":"") +' id="'+item.id+'" name="foodDeliverRadion" data-price="'+item.price+'" value="'+escapeHtml(item.title)+'">';
html += escapeHtml(item.title)+ '- '+item.price+websiteCurrency+'</label><br>';
});
html += '</div>';
break;
}
html += '</div>';
});
});
html += '<textarea id="productOptions" class="hidden"></textarea>';
html += '</div>';
}
return html;
}
/**
* The function convert special characters to HTML entities, we use it when
* we add strings into HTML attributes, it used to prevent the breaks in
* the HTML e.g. title="abc"efg".
*
* Source: http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
*/
function escapeHtml( text ) {
if ( !text ) return text;
var map = {
'&': '&amp;',
'<': '&lt;',
'>': '&gt;',
'"': '&quot;',
"'": '&#039;'
};
return text.toString().replace( /[&<>"']/g, function( m ) { return map[m]; } );
}
});
}function foodDeliveryBootBoxTemplate() {
var html = '';
html += '<div class="row">';
html += '<div class="col-xs-3">';
html += '<img style="width:100%" src="{{imgsrc}}">';
html += '</div>';
html += '<div class="col-xs-9">';
html += '<span style="font-size: 1.563em;font-weight:bold;">{{Header}}</span>';
html += '<p class="bootbox-item-price" >{{Price}}</p>';
html += '<p>{{Des}}</p>';
html += '</div>';
html += '<div class="col-xs-12">';
html += '{{itemOptions}}';
html += '</div>';
html += '<div class="col-xs-12">';
html += '{{customText}}';
html += '</div>';
html += '<div class="col-xs-12 bootbox-item-price total">';
html += 'Total: {{Total}}';
html += '</div>';
html += '<div class="col-xs-12">';
html += '{{addToCart}}';
html += '</div>';
html += '</div>';
return html;
}jQuery(function($) {
PortfolioModuleInitialize_Layout1();
});
/**
* The function initialize the Portfolio Module.
*/
function PortfolioModuleInitialize_Layout1() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-portfolio.layout-1');
$section.each(function( index ) {
var $sectionThis = $(this);
var $categories = $sectionThis.find('.filter li');
var $images = $sectionThis.find('.portfolio-image');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
$sectionThis.css({ minHeight: $sectionThis.height() });
var $filtered = $category.data('filter') == 's123-g-show-all' ? $images : $images.filter('[data-filter=' + $category.data('filter') + ']');
if ( initialize ) {
$images.hide();
$filtered.show();
} else {
$images.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
});
});
}jQuery(function($) {
AgendaModuleInitialize();
});
/**
* The function initialize the Agenda Module.
*/
function AgendaModuleInitialize() {
$( document ).on( "s123.page.ready", function( event ) {
var $sections = $('.s123-module-agenda.layout-2');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.filter a');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
var $agenda = $s.find('.agenda-category');
$s.find('.filter li').removeClass('active');
$category.parent().addClass('active');
var $filtered = $agenda.filter('[data-filter=' + $category.data('filter') + ']');
if ( initialize ) {
$agenda.hide();
$filtered.show();
} else {
$agenda.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
});
});
}jQuery(function($) {
AgendaModuleInitialize_Layout3();
});
/**
* The function initialize the Agenda Module.
*/
function AgendaModuleInitialize_Layout3() {
$( document ).on( "s123.page.ready", function( event ) {
var $sections = $('.s123-module-agenda.layout-3');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.agenda-categories-container li');
var $agenda = $s.find('.agenda-category');
$categories.off('click').on('click',function ( event, initialize ) {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
var $filtered = $agenda.filter('[data-filter=' + $category.data('filter') + ']');
if ( initialize ) {
$agenda.hide();
$filtered.show();
} else {
$agenda.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$(window).trigger('scroll');
});
}
return false;
});
$categories.first().trigger('click',true);
$s.find('.agenda-responsive-filter').off('click').on('click', function() {
var $category = $(this);
$s.find('.categories-panel').slideToggle('slow');
$category.toggleClass('active');
return false;
});
});
});
}/*
* International Telephone Input v8.5.2
* https://github.com/jackocnr/intl-tel-input.git
* Licensed under the MIT license
*/
(function(factory) {
if (typeof define === "function" && define.amd) {
define([ "jquery" ], function($) {
factory($, window, document);
});
} else if (typeof module === "object" && module.exports) {
module.exports = factory(require("jquery"), window, document);
} else {
factory(jQuery, window, document);
}
})(function($, window, document, undefined) {
"use strict";
var pluginName = "intlTelInput", id = 1, // give each instance it's own id for namespaced event handling
defaults = {
allowDropdown: true,
autoHideDialCode: true,
autoPlaceholder: true,
customPlaceholder: null,
dropdownContainer: "",
excludeCountries: [],
formatOnInit: true,
geoIpLookup: null,
initialCountry: "",
nationalMode: true,
numberType: "MOBILE",
onlyCountries: [],
preferredCountries: [ "us", "gb" ],
separateDialCode: false,
utilsScript: ""
}, keys = {
UP: 38,
DOWN: 40,
ENTER: 13,
ESC: 27,
PLUS: 43,
A: 65,
Z: 90,
SPACE: 32,
TAB: 9
};
$(window).load(function() {
$.fn[pluginName].windowLoaded = true;
});
function Plugin(element, options) {
this.telInput = $(element);
this.options = $.extend({}, defaults, options);
this.ns = "." + pluginName + id++;
this.isGoodBrowser = Boolean(element.setSelectionRange);
this.hadInitialPlaceholder = Boolean($(element).attr("placeholder"));
}
Plugin.prototype = {
_init: function() {
if (this.options.nationalMode) {
this.options.autoHideDialCode = false;
}
if (this.options.separateDialCode) {
this.options.autoHideDialCode = this.options.nationalMode = false;
this.options.allowDropdown = true;
}
this.isMobile = /Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (this.isMobile) {
$("body").addClass("iti-mobile");
if (!this.options.dropdownContainer) {
this.options.dropdownContainer = "body";
}
}
this.autoCountryDeferred = new $.Deferred();
this.utilsScriptDeferred = new $.Deferred();
this._processCountryData();
this._generateMarkup();
this._setInitialState();
this._initListeners();
this._initRequests();
return [ this.autoCountryDeferred, this.utilsScriptDeferred ];
},
/********************
*  PRIVATE METHODS
********************/
_processCountryData: function() {
this._processAllCountries();
this._processCountryCodes();
this._processPreferredCountries();
},
_addCountryCode: function(iso2, dialCode, priority) {
if (!(dialCode in this.countryCodes)) {
this.countryCodes[dialCode] = [];
}
var index = priority || 0;
this.countryCodes[dialCode][index] = iso2;
},
_filterCountries: function(countryArray, processFunc) {
var i;
for (i = 0; i < countryArray.length; i++) {
countryArray[i] = countryArray[i].toLowerCase();
}
this.countries = [];
for (i = 0; i < allCountries.length; i++) {
if (processFunc($.inArray(allCountries[i].iso2, countryArray))) {
this.countries.push(allCountries[i]);
}
}
},
_processAllCountries: function() {
if (this.options.onlyCountries.length) {
this._filterCountries(this.options.onlyCountries, function(inArray) {
return inArray != -1;
});
} else if (this.options.excludeCountries.length) {
this._filterCountries(this.options.excludeCountries, function(inArray) {
return inArray == -1;
});
} else {
this.countries = allCountries;
}
},
_processCountryCodes: function() {
this.countryCodes = {};
for (var i = 0; i < this.countries.length; i++) {
var c = this.countries[i];
this._addCountryCode(c.iso2, c.dialCode, c.priority);
if (c.areaCodes) {
for (var j = 0; j < c.areaCodes.length; j++) {
this._addCountryCode(c.iso2, c.dialCode + c.areaCodes[j]);
}
}
}
},
_processPreferredCountries: function() {
this.preferredCountries = [];
for (var i = 0; i < this.options.preferredCountries.length; i++) {
var countryCode = this.options.preferredCountries[i].toLowerCase(), countryData = this._getCountryData(countryCode, false, true);
if (countryData) {
this.preferredCountries.push(countryData);
}
}
},
_generateMarkup: function() {
this.telInput.attr("autocomplete", "off");
var parentClass = "intl-tel-input";
if (this.options.allowDropdown) {
parentClass += " allow-dropdown";
}
if (this.options.separateDialCode) {
parentClass += " separate-dial-code";
}
this.telInput.wrap($("<div>", {
"class": parentClass
}));
this.flagsContainer = $("<div>", {
"class": "flag-container"
}).insertBefore(this.telInput);
var selectedFlag = $("<div>", {
"class": "selected-flag"
});
selectedFlag.appendTo(this.flagsContainer);
this.selectedFlagInner = $("<div>", {
"class": "iti-flag"
}).appendTo(selectedFlag);
if (this.options.separateDialCode) {
this.selectedDialCode = $("<div>", {
"class": "selected-dial-code"
}).appendTo(selectedFlag);
}
if (this.options.allowDropdown) {
selectedFlag.attr("tabindex", "0");
$("<div>", {
"class": "iti-arrow"
}).appendTo(selectedFlag);
this.countryList = $("<ul>", {
"class": "country-list hide"
});
if (this.preferredCountries.length) {
this._appendListItems(this.preferredCountries, "preferred");
$("<li>", {
"class": "divider"
}).appendTo(this.countryList);
}
this._appendListItems(this.countries, "");
this.countryListItems = this.countryList.children(".country");
if (this.options.dropdownContainer) {
this.dropdown = $("<div>", {
"class": "intl-tel-input iti-container"
}).append(this.countryList);
} else {
this.countryList.appendTo(this.flagsContainer);
}
} else {
this.countryListItems = $();
}
},
_appendListItems: function(countries, className) {
var tmp = "";
for (var i = 0; i < countries.length; i++) {
var c = countries[i];
tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
tmp += "<div class='flag-box'><div class='iti-flag " + c.iso2 + "'></div></div>";
tmp += "<span class='country-name'>" + c.name + "</span>";
tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
tmp += "</li>";
}
this.countryList.append(tmp);
},
_setInitialState: function() {
var val = this.telInput.val();
if (this._getDialCode(val)) {
this._updateFlagFromNumber(val, true);
} else if (this.options.initialCountry !== "auto") {
if (this.options.initialCountry) {
this._setFlag(this.options.initialCountry, true);
} else {
this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
if (!val) {
this._setFlag(this.defaultCountry, true);
}
}
if (!val && !this.options.nationalMode && !this.options.autoHideDialCode && !this.options.separateDialCode) {
this.telInput.val("+" + this.selectedCountryData.dialCode);
}
}
if (val) {
this._updateValFromNumber(val, this.options.formatOnInit);
}
},
_initListeners: function() {
this._initKeyListeners();
if (this.options.autoHideDialCode) {
this._initFocusListeners();
}
if (this.options.allowDropdown) {
this._initDropdownListeners();
}
},
_initDropdownListeners: function() {
var that = this;
var label = this.telInput.closest("label");
if (label.length) {
label.on("click" + this.ns, function(e) {
if (that.countryList.hasClass("hide")) {
that.telInput.focus();
} else {
e.preventDefault();
}
});
}
var selectedFlag = this.selectedFlagInner.parent();
selectedFlag.on("click" + this.ns, function(e) {
if (that.countryList.hasClass("hide") && !that.telInput.prop("disabled") && !that.telInput.prop("readonly")) {
that._showDropdown();
}
});
this.flagsContainer.on("keydown" + that.ns, function(e) {
var isDropdownHidden = that.countryList.hasClass("hide");
if (isDropdownHidden && (e.which == keys.UP || e.which == keys.DOWN || e.which == keys.SPACE || e.which == keys.ENTER)) {
e.preventDefault();
e.stopPropagation();
that._showDropdown();
}
if (e.which == keys.TAB) {
that._closeDropdown();
}
});
},
_initRequests: function() {
var that = this;
if (this.options.utilsScript) {
if ($.fn[pluginName].windowLoaded) {
$.fn[pluginName].loadUtils(this.options.utilsScript, this.utilsScriptDeferred);
} else {
$(window).load(function() {
$.fn[pluginName].loadUtils(that.options.utilsScript, that.utilsScriptDeferred);
});
}
} else {
this.utilsScriptDeferred.resolve();
}
if (this.options.initialCountry === "auto") {
this._loadAutoCountry();
} else {
this.autoCountryDeferred.resolve();
}
},
_loadAutoCountry: function() {
var that = this;
var cookieAutoCountry = window.Cookies ? Cookies.get("itiAutoCountry") : "";
if (cookieAutoCountry) {
$.fn[pluginName].autoCountry = cookieAutoCountry;
}
if ($.fn[pluginName].autoCountry) {
this.handleAutoCountry();
} else if (!$.fn[pluginName].startedLoadingAutoCountry) {
$.fn[pluginName].startedLoadingAutoCountry = true;
if (typeof this.options.geoIpLookup === "function") {
this.options.geoIpLookup(function(countryCode) {
$.fn[pluginName].autoCountry = countryCode.toLowerCase();
if (window.Cookies) {
Cookies.set("itiAutoCountry", $.fn[pluginName].autoCountry, {
path: "/"
});
}
setTimeout(function() {
$(".intl-tel-input input").intlTelInput("handleAutoCountry");
});
});
}
}
},
_initKeyListeners: function() {
var that = this;
this.telInput.on("keyup" + this.ns, function() {
that._updateFlagFromNumber(that.telInput.val());
});
this.telInput.on("cut" + this.ns + " paste" + this.ns + " keyup" + this.ns, function() {
setTimeout(function() {
that._updateFlagFromNumber(that.telInput.val());
});
});
},
_cap: function(number) {
var max = this.telInput.attr("maxlength");
return max && number.length > max ? number.substr(0, max) : number;
},
_initFocusListeners: function() {
var that = this;
this.telInput.on("mousedown" + this.ns, function(e) {
if (!that.telInput.is(":focus") && !that.telInput.val()) {
e.preventDefault();
that.telInput.focus();
}
});
this.telInput.on("focus" + this.ns, function(e) {
if (!that.telInput.val() && !that.telInput.prop("readonly") && that.selectedCountryData.dialCode) {
that.telInput.val("+" + that.selectedCountryData.dialCode);
that.telInput.one("keypress.plus" + that.ns, function(e) {
if (e.which == keys.PLUS) {
that.telInput.val("");
}
});
setTimeout(function() {
var input = that.telInput[0];
if (that.isGoodBrowser) {
var len = that.telInput.val().length;
input.setSelectionRange(len, len);
}
});
}
});
var form = this.telInput.prop("form");
if (form) {
$(form).on("submit" + this.ns, function() {
that._removeEmptyDialCode();
});
}
this.telInput.on("blur" + this.ns, function() {
that._removeEmptyDialCode();
});
},
_removeEmptyDialCode: function() {
var value = this.telInput.val(), startsPlus = value.charAt(0) == "+";
if (startsPlus) {
var numeric = this._getNumeric(value);
if (!numeric || this.selectedCountryData.dialCode == numeric) {
this.telInput.val("");
}
}
this.telInput.off("keypress.plus" + this.ns);
},
_getNumeric: function(s) {
return s.replace(/\D/g, "");
},
_showDropdown: function() {
this._setDropdownPosition();
var activeListItem = this.countryList.children(".active");
if (activeListItem.length) {
this._highlightListItem(activeListItem);
this._scrollTo(activeListItem);
}
this._bindDropdownListeners();
this.selectedFlagInner.children(".iti-arrow").addClass("up");
},
_setDropdownPosition: function() {
var that = this;
if (this.options.dropdownContainer) {
this.dropdown.appendTo(this.options.dropdownContainer);
}
this.dropdownHeight = this.countryList.removeClass("hide").outerHeight();
if (!this.isMobile) {
var pos = this.telInput.offset(), inputTop = pos.top, windowTop = $(window).scrollTop(), // dropdownFitsBelow = (dropdownBottom < windowBottom)
dropdownFitsBelow = inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height(), dropdownFitsAbove = inputTop - this.dropdownHeight > windowTop;
this.countryList.toggleClass("dropup", !dropdownFitsBelow && dropdownFitsAbove);
if (this.options.dropdownContainer) {
var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.innerHeight();
this.dropdown.css({
top: inputTop + extraTop,
left: pos.left
});
$(window).on("scroll" + this.ns, function() {
that._closeDropdown();
});
}
}
},
_bindDropdownListeners: function() {
var that = this;
this.countryList.on("mouseover" + this.ns, ".country", function(e) {
that._highlightListItem($(this));
});
this.countryList.on("click" + this.ns, ".country", function(e) {
that._selectListItem($(this));
});
var isOpening = true;
$("html").on("click" + this.ns, function(e) {
if (!isOpening) {
that._closeDropdown();
}
isOpening = false;
});
var query = "", queryTimer = null;
$(document).on("keydown" + this.ns, function(e) {
e.preventDefault();
if (e.which == keys.UP || e.which == keys.DOWN) {
that._handleUpDownKey(e.which);
} else if (e.which == keys.ENTER) {
that._handleEnterKey();
} else if (e.which == keys.ESC) {
that._closeDropdown();
} else if (e.which >= keys.A && e.which <= keys.Z || e.which == keys.SPACE) {
if (queryTimer) {
clearTimeout(queryTimer);
}
query += String.fromCharCode(e.which);
that._searchForCountry(query);
queryTimer = setTimeout(function() {
query = "";
}, 1e3);
}
});
},
_handleUpDownKey: function(key) {
var current = this.countryList.children(".highlight").first();
var next = key == keys.UP ? current.prev() : current.next();
if (next.length) {
if (next.hasClass("divider")) {
next = key == keys.UP ? next.prev() : next.next();
}
this._highlightListItem(next);
this._scrollTo(next);
}
},
_handleEnterKey: function() {
var currentCountry = this.countryList.children(".highlight").first();
if (currentCountry.length) {
this._selectListItem(currentCountry);
}
},
_searchForCountry: function(query) {
for (var i = 0; i < this.countries.length; i++) {
if (this._startsWith(this.countries[i].name, query)) {
var listItem = this.countryList.children("[data-country-code=" + this.countries[i].iso2 + "]").not(".preferred");
this._highlightListItem(listItem);
this._scrollTo(listItem, true);
break;
}
}
},
_startsWith: function(a, b) {
return a.substr(0, b.length).toUpperCase() == b;
},
_updateValFromNumber: function(number, doFormat, format) {
if (doFormat && window.intlTelInputUtils && this.selectedCountryData) {
if (!$.isNumeric(format)) {
format = !this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) != "+") ? intlTelInputUtils.numberFormat.NATIONAL : intlTelInputUtils.numberFormat.INTERNATIONAL;
}
number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
}
number = this._beforeSetNumber(number);
this.telInput.val(number);
},
_updateFlagFromNumber: function(number, isInit) {
if (number && this.options.nationalMode && this.selectedCountryData && this.selectedCountryData.dialCode == "1" && number.charAt(0) != "+") {
if (number.charAt(0) != "1") {
number = "1" + number;
}
number = "+" + number;
}
var dialCode = this._getDialCode(number), countryCode = null;
if (dialCode) {
var countryCodes = this.countryCodes[this._getNumeric(dialCode)], alreadySelected = this.selectedCountryData && $.inArray(this.selectedCountryData.iso2, countryCodes) != -1;
if (!alreadySelected || this._isUnknownNanp(number, dialCode)) {
for (var j = 0; j < countryCodes.length; j++) {
if (countryCodes[j]) {
countryCode = countryCodes[j];
break;
}
}
}
} else if (number.charAt(0) == "+" && this._getNumeric(number).length) {
countryCode = "";
} else if (!number || number == "+") {
countryCode = this.defaultCountry;
}
if (countryCode !== null) {
this._setFlag(countryCode, isInit);
}
},
_isUnknownNanp: function(number, dialCode) {
return dialCode == "+1" && this._getNumeric(number).length >= 4;
},
_highlightListItem: function(listItem) {
this.countryListItems.removeClass("highlight");
listItem.addClass("highlight");
},
_getCountryData: function(countryCode, ignoreOnlyCountriesOption, allowFail) {
var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
for (var i = 0; i < countryList.length; i++) {
if (countryList[i].iso2 == countryCode) {
return countryList[i];
}
}
if (allowFail) {
return null;
} else {
throw new Error("No country data for '" + countryCode + "'");
}
},
_setFlag: function(countryCode, isInit) {
var prevCountry = this.selectedCountryData && this.selectedCountryData.iso2 ? this.selectedCountryData : {};
this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
if (this.selectedCountryData.iso2) {
this.defaultCountry = this.selectedCountryData.iso2;
}
this.selectedFlagInner.attr("class", "iti-flag " + countryCode);
var title = countryCode ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
this.selectedFlagInner.parent().attr("title", title);
if (this.options.separateDialCode) {
var dialCode = this.selectedCountryData.dialCode ? "+" + this.selectedCountryData.dialCode : "", parent = this.telInput.parent();
if (prevCountry.dialCode) {
parent.removeClass("iti-sdc-" + (prevCountry.dialCode.length + 1));
}
if (dialCode) {
parent.addClass("iti-sdc-" + dialCode.length);
}
this.selectedDialCode.text(dialCode);
}
this._updatePlaceholder();
this.countryListItems.removeClass("active");
if (countryCode) {
this.countryListItems.find(".iti-flag." + countryCode).first().closest(".country").addClass("active");
}
if (!isInit && prevCountry.iso2 !== countryCode) {
this.telInput.trigger("countrychange", this.selectedCountryData);
}
},
_updatePlaceholder: function() {
if (window.intlTelInputUtils && !this.hadInitialPlaceholder && this.options.autoPlaceholder && this.selectedCountryData) {
var numberType = intlTelInputUtils.numberType[this.options.numberType], placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
placeholder = this._beforeSetNumber(placeholder);
if (typeof this.options.customPlaceholder === "function") {
placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
}
this.telInput.attr("placeholder", placeholder);
}
},
_selectListItem: function(listItem) {
this._setFlag(listItem.attr("data-country-code"));
this._closeDropdown();
this._updateDialCode(listItem.attr("data-dial-code"), true);
this.telInput.focus();
if (this.isGoodBrowser) {
var len = this.telInput.val().length;
this.telInput[0].setSelectionRange(len, len);
}
},
_closeDropdown: function() {
this.countryList.addClass("hide");
this.selectedFlagInner.children(".iti-arrow").removeClass("up");
$(document).off(this.ns);
$("html").off(this.ns);
this.countryList.off(this.ns);
if (this.options.dropdownContainer) {
if (!this.isMobile) {
$(window).off("scroll" + this.ns);
}
this.dropdown.detach();
}
},
_scrollTo: function(element, middle) {
var container = this.countryList, containerHeight = container.height(), containerTop = container.offset().top, containerBottom = containerTop + containerHeight, elementHeight = element.outerHeight(), elementTop = element.offset().top, elementBottom = elementTop + elementHeight, newScrollTop = elementTop - containerTop + container.scrollTop(), middleOffset = containerHeight / 2 - elementHeight / 2;
if (elementTop < containerTop) {
if (middle) {
newScrollTop -= middleOffset;
}
container.scrollTop(newScrollTop);
} else if (elementBottom > containerBottom) {
if (middle) {
newScrollTop += middleOffset;
}
var heightDifference = containerHeight - elementHeight;
container.scrollTop(newScrollTop - heightDifference);
}
},
_updateDialCode: function(newDialCode, hasSelectedListItem) {
var inputVal = this.telInput.val(), newNumber;
newDialCode = "+" + newDialCode;
if (inputVal.charAt(0) == "+") {
var prevDialCode = this._getDialCode(inputVal);
if (prevDialCode) {
newNumber = inputVal.replace(prevDialCode, newDialCode);
} else {
newNumber = newDialCode;
}
} else if (this.options.nationalMode || this.options.separateDialCode) {
return;
} else {
if (inputVal) {
newNumber = newDialCode + inputVal;
} else if (hasSelectedListItem || !this.options.autoHideDialCode) {
newNumber = newDialCode;
} else {
return;
}
}
this.telInput.val(newNumber);
},
_getDialCode: function(number) {
var dialCode = "";
if (number.charAt(0) == "+") {
var numericChars = "";
for (var i = 0; i < number.length; i++) {
var c = number.charAt(i);
if ($.isNumeric(c)) {
numericChars += c;
if (this.countryCodes[numericChars]) {
dialCode = number.substr(0, i + 1);
}
if (numericChars.length == 4) {
break;
}
}
}
}
return dialCode;
},
_getFullNumber: function() {
var prefix = this.options.separateDialCode ? "+" + this.selectedCountryData.dialCode : "";
return prefix + this.telInput.val();
},
_beforeSetNumber: function(number) {
if (this.options.separateDialCode) {
var dialCode = this._getDialCode(number);
if (dialCode) {
if (this.selectedCountryData.areaCodes !== null) {
dialCode = "+" + this.selectedCountryData.dialCode;
}
var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
number = number.substr(start);
}
}
return this._cap(number);
},
/********************
*  PUBLIC METHODS
********************/
handleAutoCountry: function() {
if (this.options.initialCountry === "auto") {
this.defaultCountry = $.fn[pluginName].autoCountry;
if (!this.telInput.val()) {
this.setCountry(this.defaultCountry);
}
this.autoCountryDeferred.resolve();
}
},
destroy: function() {
if (this.allowDropdown) {
this._closeDropdown();
this.selectedFlagInner.parent().off(this.ns);
this.telInput.closest("label").off(this.ns);
}
if (this.options.autoHideDialCode) {
var form = this.telInput.prop("form");
if (form) {
$(form).off(this.ns);
}
}
this.telInput.off(this.ns);
var container = this.telInput.parent();
container.before(this.telInput).remove();
},
getExtension: function() {
if (window.intlTelInputUtils) {
return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
}
return "";
},
getNumber: function(format) {
if (window.intlTelInputUtils) {
return intlTelInputUtils.formatNumber(this._getFullNumber(), this.selectedCountryData.iso2, format);
}
return "";
},
getNumberType: function() {
if (window.intlTelInputUtils) {
return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
}
return -99;
},
getSelectedCountryData: function() {
return this.selectedCountryData || {};
},
getValidationError: function() {
if (window.intlTelInputUtils) {
return intlTelInputUtils.getValidationError(this._getFullNumber(), this.selectedCountryData.iso2);
}
return -99;
},
isValidNumber: function() {
var val = $.trim(this._getFullNumber()), countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null;
},
setCountry: function(countryCode) {
countryCode = countryCode.toLowerCase();
if (!this.selectedFlagInner.hasClass(countryCode)) {
this._setFlag(countryCode);
this._updateDialCode(this.selectedCountryData.dialCode, false);
}
},
setNumber: function(number, format) {
this._updateFlagFromNumber(number);
this._updateValFromNumber(number, $.isNumeric(format), format);
},
handleUtils: function() {
if (window.intlTelInputUtils) {
if (this.telInput.val()) {
this._updateValFromNumber(this.telInput.val(), this.options.formatOnInit);
}
this._updatePlaceholder();
}
this.utilsScriptDeferred.resolve();
}
};
$.fn[pluginName] = function(options) {
var args = arguments;
if (options === undefined || typeof options === "object") {
var deferreds = [];
this.each(function() {
if (!$.data(this, "plugin_" + pluginName)) {
var instance = new Plugin(this, options);
var instanceDeferreds = instance._init();
deferreds.push(instanceDeferreds[0]);
deferreds.push(instanceDeferreds[1]);
$.data(this, "plugin_" + pluginName, instance);
}
});
return $.when.apply(null, deferreds);
} else if (typeof options === "string" && options[0] !== "_") {
var returns;
this.each(function() {
var instance = $.data(this, "plugin_" + pluginName);
if (instance instanceof Plugin && typeof instance[options] === "function") {
returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
}
if (options === "destroy") {
$.data(this, "plugin_" + pluginName, null);
}
});
return returns !== undefined ? returns : this;
}
};
/********************
*  STATIC METHODS
********************/
$.fn[pluginName].getCountryData = function() {
return allCountries;
};
$.fn[pluginName].loadUtils = function(path, utilsScriptDeferred) {
if (!$.fn[pluginName].loadedUtilsScript) {
$.fn[pluginName].loadedUtilsScript = true;
$.ajax({
url: path,
complete: function() {
$(".intl-tel-input input").intlTelInput("handleUtils");
},
dataType: "script",
cache: true
});
} else if (utilsScriptDeferred) {
utilsScriptDeferred.resolve();
}
};
$.fn[pluginName].version = "8.5.2";
var allCountries = [ [ "Afghanistan (‫افغانستان‬‎)", "af", "93" ], [ "Albania (Shqipëri)", "al", "355" ], [ "Algeria (‫الجزائر‬‎)", "dz", "213" ], [ "American Samoa", "as", "1684" ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1264" ], [ "Antigua and Barbuda", "ag", "1268" ], [ "Argentina", "ar", "54" ], [ "Armenia (Հայաստան)", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Australia", "au", "61", 0 ], [ "Austria (Österreich)", "at", "43" ], [ "Azerbaijan (Azərbaycan)", "az", "994" ], [ "Bahamas", "bs", "1242" ], [ "Bahrain (‫البحرين‬‎)", "bh", "973" ], [ "Bangladesh (বাংলাদেশ)", "bd", "880" ], [ "Barbados", "bb", "1246" ], [ "Belarus (Беларусь)", "by", "375" ], [ "Belgium (België)", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin (Bénin)", "bj", "229" ], [ "Bermuda", "bm", "1441" ], [ "Bhutan (འབྲུག)", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil (Brasil)", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1284" ], [ "Brunei", "bn", "673" ], [ "Bulgaria (България)", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi (Uburundi)", "bi", "257" ], [ "Cambodia (កម្ពុជា)", "kh", "855" ], [ "Cameroon (Cameroun)", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1 ], [ "Cayman Islands", "ky", "1345" ], [ "Central African Republic (République centrafricaine)", "cf", "236" ], [ "Chad (Tchad)", "td", "235" ], [ "Chile", "cl", "56" ], [ "China (中国)", "cn", "86" ], [ "Christmas Island", "cx", "61", 2 ], [ "Cocos (Keeling) Islands", "cc", "61", 1 ], [ "Colombia", "co", "57" ], [ "Comoros (‫جزر القمر‬‎)", "km", "269" ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia (Hrvatska)", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "599", 0 ], [ "Cyprus (Κύπρος)", "cy", "357" ], [ "Czech Republic (Česká republika)", "cz", "420" ], [ "Denmark (Danmark)", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1767" ], [ "Dominican Republic (República Dominicana)", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt (‫مصر‬‎)", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Faroe Islands (Føroyar)", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland (Suomi)", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana (Guyane française)", "gf", "594" ], [ "French Polynesia (Polynésie française)", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia (საქართველო)", "ge", "995" ], [ "Germany (Deutschland)", "de", "49" ], [ "Ghana (Gaana)", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece (Ελλάδα)", "gr", "30" ], [ "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Grenada", "gd", "1473" ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1671" ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1 ], [ "Guinea (Guinée)", "gn", "224" ], [ "Guinea-Bissau (Guiné Bissau)", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong (香港)", "hk", "852" ], [ "Hungary (Magyarország)", "hu", "36" ], [ "Iceland (Ísland)", "is", "354" ], [ "India (भारत)", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran (‫ایران‬‎)", "ir", "98" ], [ "Iraq (‫العراق‬‎)", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2 ], [ "Israel (‫ישראל‬‎)", "il", "972" ], [ "Italy (Italia)", "it", "39", 0 ], [ "Jamaica", "jm", "1876" ], [ "Japan (日本)", "jp", "81" ], [ "Jersey", "je", "44", 3 ], [ "Jordan (‫الأردن‬‎)", "jo", "962" ], [ "Kazakhstan (Казахстан)", "kz", "7", 1 ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kuwait (‫الكويت‬‎)", "kw", "965" ], [ "Kyrgyzstan (Кыргызстан)", "kg", "996" ], [ "Laos (ລາວ)", "la", "856" ], [ "Latvia (Latvija)", "lv", "371" ], [ "Lebanon (‫لبنان‬‎)", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya (‫ليبيا‬‎)", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania (Lietuva)", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau (澳門)", "mo", "853" ], [ "Macedonia (FYROM) (Македонија)", "mk", "389" ], [ "Madagascar (Madagasikara)", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania (‫موريتانيا‬‎)", "mr", "222" ], [ "Mauritius (Moris)", "mu", "230" ], [ "Mayotte", "yt", "262", 1 ], [ "Mexico (México)", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova (Republica Moldova)", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia (Монгол)", "mn", "976" ], [ "Montenegro (Crna Gora)", "me", "382" ], [ "Montserrat", "ms", "1664" ], [ "Morocco (‫المغرب‬‎)", "ma", "212", 0 ], [ "Mozambique (Moçambique)", "mz", "258" ], [ "Myanmar (Burma) (မြန်မာ)", "mm", "95" ], [ "Namibia (Namibië)", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal (नेपाल)", "np", "977" ], [ "Netherlands (Nederland)", "nl", "31" ], [ "New Caledonia (Nouvelle-Calédonie)", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger (Nijar)", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea (조선 민주주의 인민 공화국)", "kp", "850" ], [ "Northern Mariana Islands", "mp", "1670" ], [ "Norway (Norge)", "no", "47", 0 ], [ "Oman (‫عُمان‬‎)", "om", "968" ], [ "Pakistan (‫پاکستان‬‎)", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine (‫فلسطين‬‎)", "ps", "970" ], [ "Panama (Panamá)", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru (Perú)", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland (Polska)", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar (‫قطر‬‎)", "qa", "974" ], [ "Réunion (La Réunion)", "re", "262", 0 ], [ "Romania (România)", "ro", "40" ], [ "Russia (Россия)", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barthélemy (Saint-Barthélemy)", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1869" ], [ "Saint Lucia", "lc", "1758" ], [ "Saint Martin (Saint-Martin (partie française))", "mf", "590", 2 ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1784" ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239" ], [ "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966" ], [ "Senegal (Sénégal)", "sn", "221" ], [ "Serbia (Србија)", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1721" ], [ "Slovakia (Slovensko)", "sk", "421" ], [ "Slovenia (Slovenija)", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia (Soomaaliya)", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea (대한민국)", "kr", "82" ], [ "South Sudan (‫جنوب السودان‬‎)", "ss", "211" ], [ "Spain (España)", "es", "34" ], [ "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94" ], [ "Sudan (‫السودان‬‎)", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen", "sj", "47", 1 ], [ "Swaziland", "sz", "268" ], [ "Sweden (Sverige)", "se", "46" ], [ "Switzerland (Schweiz)", "ch", "41" ], [ "Syria (‫سوريا‬‎)", "sy", "963" ], [ "Taiwan (台灣)", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand (ไทย)", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1868" ], [ "Tunisia (‫تونس‬‎)", "tn", "216" ], [ "Turkey (Türkiye)", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1649" ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1340" ], [ "Uganda", "ug", "256" ], [ "Ukraine (Україна)", "ua", "380" ], [ "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan (Oʻzbekiston)", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City (Città del Vaticano)", "va", "39", 1 ], [ "Venezuela", "ve", "58" ], [ "Vietnam (Việt Nam)", "vn", "84" ], [ "Wallis and Futuna", "wf", "681" ], [ "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1 ], [ "Yemen (‫اليمن‬‎)", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "Åland Islands", "ax", "358", 1 ] ];
for (var i = 0; i < allCountries.length; i++) {
var c = allCountries[i];
allCountries[i] = {
name: c[0],
iso2: c[1],
dialCode: c[2],
priority: c[3] || 0,
areaCodes: c[4] || null
};
}
});if (typeof menuScrollOffset === 'undefined') {
var menuScrollOffset = 0;
}
var menuScrollOffset_mobile = 60;
/**
* Detecting Mobile Devices with JavaScript
*/
var isMobile = {
Android: function() {
return navigator.userAgent.match(/Android/i);
},
BlackBerry: function() {
return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function() {
return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function() {
return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function() {
return navigator.userAgent.match(/IEMobile/i);
},
any: function() {
return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}
};
var whatScreen = {
any: function() {
var screenWidth = $(window).width();
if (screenWidth<=544) {
return 'mobile';
}
if (screenWidth>544 && screenWidth<=767) {
return 'tablet';
}
if (screenWidth>768) {
return 'desktop';
}
}
};
/**
* The function refresh some plugins related to DOM changes.
* In some cases the document height is changing and every time its
* changed we must Refresh some plugins that based on the it. To do
* so we fake a Mutation Observer using an Interval. We try to use
* the browsers MutationObserver object but we can not use it, Firefox
* trow an infinity loop to the `function( mutations, observer )`
* callback function when we used `attributes=true` and `attributeFilter`
* with `style`. For now we only need the Mutation Observer for the
* document height so every time it change we fix the necessary plugins.
*/
function MutationObserverHandler() {
$( document ).on( 's123.page.ready', function( event ) {
clearInterval(window.S123_MutationObserver_Interval);
window.S123_MutationObserver_Interval = setInterval( function() {
if ( document.S123_MutationObserver_Height !== $(document).height() ) {
$(document).trigger('s123.page.ready.refreshParallaxImages');
$(document).trigger('s123.page.ready.refreshAOS');
document.S123_MutationObserver_Height = $(document).height();
}
}, 250);
});
/**
* We can not use this code because FireFox issue, please read the function
* documentations for more informations.
*/
/*
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
if( !MutationObserver || $(selector).length === 0 ) return;
$( document ).on( 's123.page.ready', function( event ) {
var observer = 'S123_observer_' + selector;
var options = {
childList: true,
subtree: true,
attributes: true,
attributeFilter: ['height','style'],
attributeOldValue: true
}
if ( window[observer] ) {
window[observer].disconnect();
window[observer] = null;
}
window[observer] = new MutationObserver( function( mutations, observer ) {
console.dir(mutations);
clearTimeout(window[observer+'_delay'] );
window[observer+'_delay']  = setTimeout(function(){
callback();
}, 250);
});
window[observer].observe($(selector).get(0),options);
});
*/
}
/**
* The function Render & Refresh the Parallax object. In some cases the document
* height is changing and every time its changed we must Refresh the
* Parallax to position the image in the correct place.
*/
function RefreshParallaxImages() {
$( document ).on( 's123.page.ready.refreshParallaxImages', function( event ) {
var parallaxWindows = $('.parallax-window');
if (parallaxWindows.length>0) {
parallaxWindows.parallax('render');
parallaxWindows.parallax('refresh');
setTimeout(function() {
jQuery(window).trigger('resize').trigger('scroll');
},1000);
}
});
}
/**
* The function Destroy the Parallax object and it will reinitialize
* when we call to its `.parallax('refresh')` function. We need to
* use it when we remove a Parallax section tag because its related
* mirror still stays on the body. e.g. When we refresh the preview
* using Ajax from the wizard.
*/
function DestroyParallaxImages() {
$('.parallax-window').parallax('destroy');
}
/**
* The function refresh the AOS (animate on scroll) plugin.
* In some cases the document height is changing and every
* time its changed we must Refresh the AOS to recalculate
* all offsets and positions of elements.
* Documentation : https://github.com/michalsnik/aos
*/
function RefreshAOS() {
$( document ).on( 's123.page.ready.refreshAOS', function( event ) {
AOS.refresh();
});
}
/**
* The function initialize the Top Section.
*/
function TopSectionInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
jQuery('#websitePopupHomeVideo, .promoVideoPopup .iconsCircle').on('click',function(e) {
var $this 			= $(this);
var player 			= $this.data('player');
var videoURL 		= $this.attr('href');
e.preventDefault();
e.stopPropagation();
if ( player === 'site123') {
videoURL = '/include/globalVideoPlayer.php?url=' + encodeURIComponent(videoURL)+'&fluid=true';
}
/**
* On mobile devices we disable the videos auto load because there
* is some mobiles devices that don't know how to handle it.
*/
if ( isMobile.any() ) {
if ( player === 'site123') {
videoURL += '&autoplay=false';
} else {
videoURL = videoURL.replace('autoplay','disable-autoplay');
}
}
buildPopup('playVideo','','',videoURL,true,false,true,'');
});
s123EditorVideoTagsHandler();
jQuery('.s123-video-handler').on('click',function() {
s123VideoHandler($(this),false);
});
/**
* The videos auto load is not working on mobile devices, so we
* initialize all the videos on page load, and without auto load.
*/
if ( isMobile.any() ) {
jQuery('.s123-video-handler').imagesLoaded().progress( function( instance, image ) {
s123VideoHandler($(image.img).closest('.s123-video-handler'),true);
});
}
});
}
/**
* The function initialize the Counters Module.
*/
function CountersModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Counters Module Initialize
* Source: /files/js/module.counters.js
* Lines: 199-214
*/
if ($.isFunction($.fn['themePluginCounter'])) {
$('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCounter(opts);
});
}
});
}
/**
* The function initialize the Carousel Module.
*/
function CarouselModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Carousel Module Initialize
* Source: /files/js/module.carousel.js
* Lines: 143-153
*/
if ($.isFunction($.fn['themePluginCarousel'])) {
$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCarousel(opts);
});
}
});
}
/**
* The function initialize the contact us form on homepage.
*/
function ContactFormHomeInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('#contactUsFormHome').length !== 0 ) {
var $contactUsFormHome = $('#contactUsFormHome');
$contactUsFormHome.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var url = "/versions/"+$('#versionNUM').val()+"/include/contactO.php";
if ( $form.hasClass('custom-form') ) {
url = "/versions/"+$('#versionNUM').val()+"/include/customFormO.php";
}
$.ajax({
type: "POST",
url: url,
data: $form.serialize(),
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: translations.ThankYouAfterSubmmit+'<iframe src="/versions/'+$('#versionNUM').val()+'/include/contactSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'" style="width:100%;height:30px;" frameborder="0"></iframe>',
className: 'contactUsConfirm',
backdrop: true
});
$form.find('button:submit').prop('disabled', false);
WizardNotificationUpdate();
}
});
return false;
}
});
}
});
}
function CountStoreItemsReady() {
$( document ).on( 's123.page.ready', function( event ) {
CountStoreItems();
});
}
/* Count number of item the user have in is store */
function CountStoreItems() {
if ($('.header-cart-wrapper').length>0) {
$.ajax({
type: "GET",
url: "/versions/"+$('#versionNUM').val()+"/wizard/orders/front/countUserCart.php",
data: 'w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&tranW='+websiteLanguageCountryFullCode+'&moduleTypeNUM=37',
success: function( count ) {
var $headerCartWrapper = $('.header-cart-wrapper');
if ( parseInt(count) === 0 ) {
if ( !$headerCartWrapper.hasClass('show-static') ) {
$headerCartWrapper.hide();
ResetMoreButton();
}
$headerCartWrapper.find('.count').hide();
} else {
if ( !$headerCartWrapper.hasClass('show-static') ) {
$headerCartWrapper.show();
ResetMoreButton();
}
$headerCartWrapper.find('.count').html(count).css({ display: 'flex' });
}
}
});
}
}
function GenerateMailingSubscriptionHTML( userEmail, websiteID, w ) {
var html ='';
html +='<div class="form-group">';
html += translations.ConfirmMailingSubscrive;
html += '</div>';
html += '<div class="form-group">';
html += '<span>'+translations.subscribeTellAboutYou+'</span>';
html += '</div>';
html +='<!-- User Info -->';
html +='<div class="row">';
html +='<div class="col-xs-12 col-sm-5">';
html +='<!-- User Name -->';
html += '<div class="form-group">';
html += '<label>'+translations.firstName+'</label>';
html += '<input class="form-control user-first-name">';
html += '</div>';
html +='<!-- User Last Name -->';
html += '<div class="form-group">';
html += '<label>'+translations.lastName+'</label>';
html += '<input class="form-control user-last-name">';
html += '</div>';
html +='<!-- User Phone -->';
html += '<div class="form-group">';
html += '<label>'+translations.phone+'</label><br>';
html += '<input type="text" class="form-control phoneIntlInput" style="direction:ltr;">';
html += '</div>';
html +='<!-- User Country -->';
html += '<div class="form-group">';
html += '<label>'+translations.country+'</label>';
html += '<select class="form-control user-country"></select>';
html += '</div>';
html +='<!-- User Email -->';
html += '<input class="user-email" type="hidden" value="'+ userEmail +'">';
html += '<input class="website-id" type="hidden" value="'+ websiteID +'">';
html += '<input class="w" type="hidden" value="'+ w +'">';
html += '</div>';
html +='</div>';
return html;
}
/**
* The function initialize the Mailing Module.
*/
function MailingModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('.widget_subscribe_form').length !== 0 ) {
var $widget_subscribe_form = $('.widget_subscribe_form');
$widget_subscribe_form.each( function( index ) {
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$(this).validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
errorPlacement: function (error, element) {
error.appendTo(element.closest('.form-group'));
},
submitHandler: function( form ) {
var $form = $(form);
var $userEmail = $form.find('input[name="widget-subscribe-form-email"]');
var websiteID = $form.find('input[name="websiteID"]').val();
var w = $form.find('input[name="w"]').val();
$form.find('button:submit').prop('disabled', true);
$.ajax({
type: 'POST',
url: '/versions/'+$('#versionNUM').val()+'/include/subscribe.php',
data: $form.serialize(),
success: function(respondedMessage) {
var respondedMessage = JSON.parse(respondedMessage);
if (respondedMessage.status != 'email already subscribed') {
var outPutHTML = GenerateMailingSubscriptionHTML($userEmail.val(),websiteID,w);
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: outPutHTML,
className: 'contactUsConfirm',
backdrop: true,
buttons: {
ok: {
label: 'Update',
className: 'btn-primary'
}
}
});
var countryList = JSON.parse(respondedMessage.countryList);
var userCountryName = respondedMessage.countryName;
var countryCode = respondedMessage.countryCode;
$.each(countryList,function( countryCode, country ) {
$('.user-country').append('<option value="' + countryCode + '" '+(userCountryName ==  country.name ? 'selected' : '')+'>' + country.name + '</option>');
});
$(".phoneIntlInput").intlTelInput({
autoHideDialCode: true,
autoPlaceholder: true,
geoIpLookup: function(callback) {
callback(countryCode);
},
initialCountry: "auto",
nationalMode: true,
numberType: "MOBILE",
utilsScript: "/files/frameworks/intl-tel-input-8.5.2/build/js/utils.js"
});
$(".phoneIntlInput").removeAttr("autocomplete");
/**
* Set the phone number including the country code.
* Note: On some cases our country IP detector doesn't
* recognize the user country, because of this the phone
* country select is not automatically selected for the user,
* and if the user doesn't select a country code we get a JS
* error, so we add a `try catch` to handle this issue.
*/
try {
setTimeout(function(){
$('.contactUsConfirm').find(".phoneIntlInput").val($('.contactUsConfirm').find(".phoneIntlInput").intlTelInput("getNumber",intlTelInputUtils.numberFormat.INTERNATIONAL));
},500);
} catch (e) {
$('.contactUsConfirm').find(".phoneIntlInput").val($('.contactUsConfirm').find(".phoneIntlInput").val());
}
$('.contactUsConfirm').find('button[data-bb-handler=ok]').off('click').on('click',function() {
var websiteID = $('.contactUsConfirm').find('.website-id').val();
var w = $('.contactUsConfirm').find('.w').val();
var userEmail = $('.contactUsConfirm').find('.user-email').val();
var userFirstName = $('.contactUsConfirm').find('.user-first-name').val();
var userLastName = $('.contactUsConfirm').find('.user-last-name').val();
var userPhone = $('.contactUsConfirm').find('.phoneIntlInput').val();
userPhone =  '+' + $('.contactUsConfirm .country-list .active').data('dial-code') + userPhone;
var userCountry = $('.contactUsConfirm').find('.user-country').val();
$.ajax({
type: 'POST',
url: '/versions/'+$('#versionNUM').val()+'/include/subscribe-update-info.php',
data: {
websiteid : websiteID,
w : w,
email : userEmail,
firstName : userFirstName,
lastName : userLastName,
phone : userPhone,
country : userCountry
},
success: function(data) {
console.log(data);
}
});
});
$form.find('button:submit').prop('disabled', false);
WizardNotificationUpdate();
} else {
bootbox.alert({
title: translations.sent,
message: translations.ConfirmMailingSubscrive,
className: 'contactUsConfirm',
backdrop: true,
buttons: {
ok: {
label: translations.Ok,
className: 'btn-primary'
}
}
});
$form.find('button:submit').prop('disabled', false);
}
}
});
return false;
}
});
});
}
});
}
function OpenSearchWindow(closeLocation) {
var currentPageUrl = window.location.href;
var searchInput = '<div class="searchInput" style="display:none;">';
searchInput += '<form id="searchPopup" class="searchBox">';
searchInput += '<div class="form-group">';
searchInput += '<div class="input-group">';
searchInput += '<input type="text" name="widget-search-form-keyword" class="widget-search-form-keyword form-control input-lg" placeholder="'+translations.enterYourQuery+'" aria-required="true" autocomplete="off">';
searchInput += '<span class="input-group-btn">';
searchInput += '<button class="btn btn-lg btn-primary" type="submit"><i class="fa fa-search"></i></button>';
searchInput += '</span>';
searchInput += '</div>';
searchInput += '</div>';
searchInput += '<input type="hidden" name="w" value="'+$('#w').val()+'">';
searchInput += '<input type="hidden" name="websiteID" value="'+$('#websiteID').val()+'">';
searchInput += '</form>';
searchInput += '</div>';
searchInput += '<div class="result" style="display:none;">';
searchInput += '</div>';
buildPopup('popupFloatDivSearch','',searchInput,'',true,false,true,closeLocation);
setTimeout(function() {
var screenHeight = $('#popupFloatDivSearch .page').outerHeight(true);
var searchHeight = $('#popupFloatDivSearch .searchInput').outerHeight(true);
$('#popupFloatDivSearch .result').height(screenHeight-searchHeight);
$('#popupFloatDivSearch .searchInput').show();
$('#popupFloatDivSearch .result').show();
if (!is_touch_device()) {
$('#searchPopup .widget-search-form-keyword').focus();
}
},150);
$('#searchPopup').submit(function(event) {
var $form = $(this);
var $input = $form.find('input[name="widget-search-form-keyword"]');
var resultURL = '';
if ( $('#w').val() !='' ) {
resultURL = '/?w='+$('#w').val()+'&search='+encodeURIComponent($input.val());
} else {
resultURL = '/?search='+encodeURIComponent($input.val());
}
window.history.replaceState(currentPageUrl,'Title',resultURL);
event.preventDefault();
$form.find('button:submit').prop('disabled',true);
$input.val($.trim($input.val()));
if ( $input.val().length === 0 ) {
bootbox.alert({
message: translations.searchInputValidation,
className: 'bootbox-search-input-validation'
}).on("hidden.bs.modal", function() {
$form.find('button:submit').prop('disabled',false);
$input.focus();
});
return;
}
OpenSearchWindowSearchAjax($form);
});
$('#popupFloatDivSearch .popupCloseButton').on('click',function() {
window.history.replaceState('','Title',currentPageUrl);
});
$('#popupFloatDivSearch .cover').on('click',function() {
window.history.replaceState('','Title',currentPageUrl);
});
}
function OpenSearchWindowSearchAjax( $form, query ) {
if ( query ) $('#searchPopup').find('[name="widget-search-form-keyword"]').val(query);
$.ajax({
type: 'POST',
url: '/versions/'+$('#versionNUM').val()+'/include/searchResult/search.php',
data: $form.serialize(),
beforeSend: function() {
$('#popupFloatDivSearch .result').html('LOADING...');
},
success: function(data) {
$('#popupFloatDivSearch .result').html(data);
$( document ).trigger( 's123.page.ready.data-model' );
},
complete: function(data) {
$form.find('button:submit').prop('disabled', false);
/**
* Close the keyboard on mobile devices.
* http://stackoverflow.com/questions/5937339/ipad-safari-make-keyboard-disappear.
*/
if ( is_touch_device() ) {
document.activeElement.blur();
$form.find('input[name="widget-search-form-keyword"]').blur();
}
}
});
}
/**
* The function initialize the Search Module.
*/
function SearchModuleInitialize() {
$( document ).on( 's123.page.ready.search', function( event ) {
var $widget_search = $('.widget_search');
$widget_search.each(function() {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
errorPlacement: function (error, element) {
error.appendTo(element.closest('.form-group'));
},
submitHandler: function( form ) {
OpenSearchWindow('');
OpenSearchWindowSearchAjax($form,$form.find('[name="widget-search-form-keyword"]').val());
return false;
}
});
});
});
}
/**
* The function initialize the Modules Data Model.
* We use this model to show more data for some modules, when
* the user click on a `modules-data-model` link, its open the model
* dialog and show him the extra data.
*/
function ModulesDataModelInitialize() {
$( document ).on( 's123.page.ready.data-model', function( event ) {
$('a[data-rel="popupScreen"]').off('click.popupScreen').on('click.popupScreen',function(event) {
event.preventDefault();
var $this 	= $(this);
var href 	= $this.attr('href');
href += (href.indexOf('?') === -1 ? '?' : '&') + 'onlyContent=1';
buildPopup('pagePopupWinID','','',href,true,true,false,'');
});
});
}
/**
* The function initialize the Homepage Video Setting.
*/
function HomepageVideoSettingInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('#homepage_full_screen_3_party_video').length !== 0 ) {
var $videoIframe = $('#homepage_full_screen_3_party_video');
if ( $videoIframe[0].src.indexOf("youtube.com") > -1 ) {
(function () {
var script = document.createElement('script');
script.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
var player;
window.onYouTubePlayerAPIReady = function() {
player = new YT.Player('homepage_full_screen_3_party_video', {
playerVars: { 'autoplay': 1, 'controls': 0,'autohide':1,'wmode':'opaque','loop':1,'modestbranding':1,'rel':0,'showinfo':0 },
events: {
'onReady': onPlayerReady}
});
}
/**
* Callback function - The API will call this function when the video player is ready.
*/
function onPlayerReady(event) {
event.target.mute();
}
})();
} else if ( $videoIframe[0].src.indexOf("vimeo.com") > -1 ) {
(function () {
var script = document.createElement('script');
script.src = "https://f.vimeocdn.com/js/froogaloop2.min.js";
script.onload = function( script ) {
var player = $f($videoIframe[0]);
player.api('setVolume', 0);
};
firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
})();
}
}
});
}
/**
* The function initialize the Go-To-Top Button.
*/
function GoToTopButtonInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
$(window).scroll(function() {
var gotoTop = $('#gotoTop');
var top = 150;
if ( $(window).scrollTop() >= top ) {
gotoTop.show(200);
} else {
gotoTop.hide(200);
}
});
});
}
/**
* Active all popup in the page
*/
function ActivePopupInPage() {
$( document ).on( 's123.page.ready', function( event ) {
ActivePopupActionButtonsInPage();
});
}
function ActivePopupActionButtonsInPage() {
$('[data-toggle="search_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
OpenSearchWindow(closeLocation);
});
$('[data-toggle="social_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
if (findBootstrapEnvironment()=='xs') {
var isMobile = 'mobile';
} else {
var isMobile = '';
}
var content = $('#header-social-content').html();
/*
content += '<div class="socialBox">';
if ($('#facebook_url').val()!='') {
content += '<div class="insideBox '+ isMobile +'"><iframe src="https://www.facebook.com/plugins/page.php?href='+encodeURIComponent($('#facebook_url').val())+'&tabs=timeline&width=320&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="320" height="400" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>';
}
if ($('#twitter_url').val()!='' && findBootstrapEnvironment()!='xs') {
content += '<div class="insideBox"><a class="twitter-timeline" data-height="400" href="'+$('#twitter_url').val()+'">Tweets by</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>';
}
content += '<div>';
*/
buildPopup('popupFloatDivSearch','',content,'',true,true,true,closeLocation);
});
$('[data-toggle="phone_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
buildPopup('popupFloatDivSearch','',$('#header-phone-content').html(),'',true,true,true,closeLocation);
});
$('[data-toggle="address_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
buildPopup('popupFloatDivSearch','',$('#header-address').html(),'',true,true,true,closeLocation);
});
}
/**
* The function initialize the SITE123 banner.
*/
function Site123AdButtonInitialize() {
var $html;
var $showSmallAdOnScroll;
$( document ).on( 's123.page.ready', function( event ) {
$html = $('html');
$showSmallAdOnScroll = $('#showSmallAdOnScroll');
if ( $showSmallAdOnScroll.length === 0 ) return;
bannerHandler();
$(window).scroll(function() {
bannerHandler();
});
});
/**
* The function show and hide the banner related to the scroll bar.
*/
function bannerHandler() {
var offset = $html.hasClass('inside_page') ? 0 : 50;
if ( $(window).scrollTop() >= offset ) {
$showSmallAdOnScroll.stop().slideDown();
} else {
$showSmallAdOnScroll.stop().slideUp();
}
}
}
/**
* Active the lazy image load
*/
function ActiveLazyImageLoad() {
$( document ).on( 's123.page.ready', function( event ) {
var $lazyImages = $('img.lazyload, .bgLazyload');
/**
* Active lazy image on all images in the system.
* Documentation: https://github.com/tuupola/jquery_lazyload
*/
$lazyImages.lazyload();
});
$( document ).on( "s123.page.load", function( event ) {
/**
* Active lazy image on all images in the system.
* Documentation: https://github.com/tuupola/jquery_lazyload
*/
$('img.lazyload').lazyload();
});
}
/**
* //Set heights of different elements so everything will fit to everything
*/
function SetHeightToEle() {
$( document ).on( 's123.page.ready', function( event ) {
if (whatScreen.any()=='tablet') {
$('#top-menu').css('max-height',$(window).height()-$('.navbar-header').outerHeight(true)-menuScrollOffset_mobile);
}
});
}
function GetMenuPosition() {
$( document ).on( 's123.page.ready', function( event ) {
layoutMenuPositionTXT 			= $('#layoutMenuPositionTXT').val();
layoutMenuPositionOpenMenuTXT 	= ChangeDirection(layoutMenuPositionTXT);
if (layoutMenuPositionTXT=='left' || layoutMenuPositionTXT=='right') {
FixMenuTopPosition_SideMenu();
}
if (layoutMenuPositionTXT=='top' || layoutMenuPositionTXT=='bottom') {
FixMenuTopPosition_TopMenu();
}
});
}
/**
* The function scroll the user to the first section when
* he click on the first button in the homepage.
*/
function MoveFirstSection(sectionNUM) {
var $pages = $('#s123ModulesContainer > section');
if ( $pages.length === 0 ) return;
if ( !sectionNUM ) sectionNUM = 1;
/**
* Sometimes the user choose to scroll to a page, and then hide it from
* homepage, and if it was the last page the scroll isn't working. We like
* to prevent such cases so we scroll the user to the last page instead.
*/
if ( sectionNUM > $pages.length ) sectionNUM = $pages.length;
/**
* Fix Section Number - At the previews version of this function we used
* the next selector to get the pages `$("section")`. The selector return
* all the website sections (include the homepage), and on the wizard we
* start the section counting from `1` related to this selector. Now we fix
* the selector and choose only the website pages, so we decrease the homepage
* section for not taking actions on existing user. Basically we need to stop
* scrolling users related to section number, and change the homepage to works
* like to promos, there we scroll to pages related to the page id.
*/
sectionNUM -= 1;
/**
* Scroll Offset - Some layouts has some padding that we need to scroll up
* to it, and on mobile it will be always 60 because we have the same layout.
*/
var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : menuScrollOffset_mobile;
$('html, body').stop().animate({
scrollTop: ($pages.eq(sectionNUM).offset().top - offset)
}, 1250, 'easeInOutExpo');
}
function MoveFirstSectionOrRedirect( url ) {
var $pages = $('#s123ModulesContainer > section');
/**
* Scroll Offset - Some layouts has some padding that we need to scroll up
* to it, and on mobile it will be always 60 because we have the same layout.
*/
var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : menuScrollOffset_mobile;
if ( $pages.length !== 0 ) {
$('html, body').stop().animate({
scrollTop: ($pages.eq(0).offset().top - offset)
}, 1250, 'easeInOutExpo');
} else {
if ( url ) location.href = url;
}
}
/**
* The function scroll the user from a module to another module.
*
* @param {string} fromModuleID - Source module (module that we scroll from it).
* @param {string} toModuleID - Destination module (module that we scroll to it).
*/
function ScrollToModule( fromModuleID, toModuleID ) {
var offset = findBootstrapEnvironment()!='xs' ? menuScrollOffset : menuScrollOffset_mobile;
var $scrollTo = $('#section-' + toModuleID);
if ( $scrollTo.length === 0 && fromModuleID!='' ) $scrollTo = $('#section-' + fromModuleID).next('section');
if ($('html.inside_page').length>0) {
if ($('#w').val()!='') {
location.href = '/?w='+$('#w').val()+'#section-'+toModuleID;
} else {
location.href = '/#section-'+toModuleID;
}
} else {
if ( $scrollTo.length !== 0 ) {
$('html, body').stop().animate({
scrollTop: ($scrollTo.offset().top - offset)
}, 1250, 'easeInOutExpo');
}
}
}
var dropdownClickFlag = 0; //Tell us if the user click on dropdown menu so we will not close it with the DOCUMENT event
function activeDropDownMenus() {
$( document ).on( 's123.page.ready', function( event ) {
activeDropDownMenusAction();
});
}
function activeDropDownMenusAction() {
$('.dropdown-submenu > a').click(function(event) {
event.preventDefault();
});
$('.navPages li').find('a').off('mouseenter.hideHoverMenu');
$('.navPages').find('.dropdown-submenu').off('click.subMenu mouseenter.subMenu mouseover.subMenu mouseout.subMenu mouseleave.subMenu').on('click.subMenu mouseenter.subMenu mouseover.subMenu mouseout.subMenu mouseleave.subMenu',function(e) {
var $this = $(this).find('> a');
var eventType = e.type;
if (eventType=='mouseenter') {
activeDropDownMenusAction_open(e,$this);
}
if (eventType=='mouseover') {
$this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen','true');
}
if (eventType=='click') {
if (dropdownClickFlag==0) {
activeDropDownMenusAction_open(e,$this);
} else {
RemoveAllDropDownMenus();
}
}
if (eventType=='mouseout') {
$this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen','false');
setTimeout(function(){
if ($this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen')=='false') {
$this.parent('.dropdown-submenu').removeClass('active').removeClass('open');
}
}, 2000);
}
});
$('.navPages > li').not('.dropdown-submenu').find(' > a').off('mouseenter.hideHoverMenu').on('mouseenter.hideHoverMenu',function(e) {
$('.dropdown-submenu').removeClass('active').removeClass('open').removeClass('activePath');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
});
$(document).off('click.subMenu').on('click.subMenu',function(e) {
if (dropdownClickFlag==0 && $('.dropdown-submenu.open').length>0) {
RemoveAllDropDownMenus();
}
});
$('#popupFloatDivMenu .navPagesPopup').find('.dropdown-submenu > a').off('click.subMenu').on('click.subMenu',function(e) {
e.preventDefault();
e.stopPropagation();
var $this = $(this);
var eventType = e.type;
if (eventType=='click') {
if ($this.parent('.dropdown-submenu.active').length>0) {
$('.dropdown-submenu').removeClass('active').removeClass('open');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
} else {
$('.dropdown-submenu').removeClass('active').removeClass('open');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
$this.parent('.dropdown-submenu').addClass('active').addClass('open');
}
}
});
}
function RemoveAllDropDownMenus() {
$('.dropdown-submenu').removeClass('active').removeClass('open');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
}
function activeDropDownMenusAction_open(e,$this) {
dropdownClickFlag = 1;
$this.parent('.dropdown-submenu').addClass('active').addClass('open');
$this.parents('.dropdown-submenu').each(function() {
var $this = $(this);
$this.addClass('activePath');
});
$('.dropdown-submenu').not('.activePath').removeClass('active').removeClass('open').removeClass('activePath');
$('.dropdown-submenu.activePath').removeClass('activePath');
setTimeout(function() {
dropdownClickFlag = 0;
},1000);
}
/**
* The function remove scripts residues. Some scripts are adding HTML
* to the body, and we need to remove them manually when we refresh/reload
* page areas via Ajax, otherwise the HTML will duplicate itself when we
* trigger the `s123.page.ready` event.
*
*/
function RemoveScriptsResidues() {
$('body > .tooltip').remove();
}
/**
* The function Trigger the Site123 page ready custom event.
*/
function TriggerS123PageReady() {
RemoveScriptsResidues();
$( document ).trigger( 's123.page.ready' );
}
/**
* The function Trigger the Site123 page load custom event.
*/
function TriggerS123PageLoad() {
$( document ).trigger( 's123.page.load' );
}
/**
* The function is adding back to manager floating button
*/
function AddReturnToManagerBtn() {
/**
* If the user is from mobile device add the return to manager button
* Note: the try / catch is used to handle the cross domain origin policy.
*/
try {
if ( !window.opener || !window.opener.s123_mobilePreview ) return;
} catch( err ) {
return;
}
var html = '';
html += '<div class="returnToManager text-center">';
html += '<a>Back to manager</a>';
html += '</div>';
$(document.body).append(html);
$('.returnToManager').css({
'position' 			: 'fixed',
'bottom' 			: '0px',
'z-index' 			: '100',
'display'			: 'block',
'height'			: '53px',
'padding-top'		: '15px',
'margin-top'		: '0px',
'padding-bottom'	: '16px',
'margin-bottom'		: '0px',
'background-color' 	: '#2196F3',
'width'				: '100%'
});
$('.returnToManager a').css('color','#ffffff');
$('.returnToManager').on('click',function() {
window.close();
});
}
var layoutMenuPositionTXT;
var layoutMenuPositionOpenMenuTXT;
jQuery(function($) {
TopSectionInitialize();
CountersModuleInitialize();
CarouselModuleInitialize();
ContactFormHomeInitialize();
MailingModuleInitialize();
JobsModuleInitialize();
PromoModuleInitialize();
PromoOldV1ModuleInitialize();
ActivePopupInPage();
SearchModuleInitialize();
ModulesDataModelInitialize();
HomepageVideoSettingInitialize();
GoToTopButtonInitialize();
Site123AdButtonInitialize();
ActiveLazyImageLoad();
ActiveOrderPopup();
SetHeightToEle();
GetMenuPosition();
activeDropDownMenus();
ActiveLanguageButton();
PageScrollByClick();
RefreshScrollSpy();
openDivMenuOnMobileClick();
CountStoreItemsReady();
RefreshParallaxImages();
RefreshAOS();
MutationObserverHandler();
OpenModuleManagment();
homepageRandomText();
TriggerS123PageReady();
jqueryValidatorTranslatedMessages();
Order_FixWebsiteDomainUnderStoreSSL();
AddReturnToManagerBtn();
});
$(window).load(function () {
TriggerS123PageLoad();
});
/**
* AOS Initial - Animate On Scroll
* Note: AOS is a UMD module so we initial it outside of the ready or load events.
* Documentation : https://github.com/michalsnik/aos
*/
AOS.init({
offset: 20,
duration: 200,
delay: 0
});
/**
* The function blocking URL masking for users with a `Free Package`.
* it's mean that the user with a free package can't open his website inside
* a iFrame.
*/
function BlockUrlMasking() {
if ( !$.isNumeric($('#w').val()) && packageNUM < '2' ) {
if ( window.location != window.parent.location ) {
topWindow.location = 'https://'+domain+'.'+subDomainUrl;
}
}
}
function ChangeDirection(position) {
switch (position) {
case 'right':
return 'left';
break;
case 'left':
return 'right';
break;
case 'top':
return 'bottom';
break;
case 'bottom':
return 'top';
break;
}
}
/**
* The function handle all the add-to-cart buttons and active them for adding
* the selected product to the cart.
*/
function ActiveOrderPopup() {
$( document ).on( 's123.page.ready.activeOrderPopup', function( event ) {
$('.orderButtonPopup').off('click').on('click',function( event ) {
var $this = $(this);
if ( !atcValidator() ) return;
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/wizard/orders/front/addToCart.php",
data: {
w: $('#w').val(),
websiteID: $('#websiteID').val(),
uniquePageID: $this.data('unique-page'),
moduleID: $this.data('module'),
productOptions: $('#productOptions').length !== 0 ? $('#productOptions').html() : '',
customText: $('#customText').length !== 0 ? $('#customText').html() : '',
amount: $this.data('quantity-amount') ? $this.data('quantity-amount') : '1'
},
success: function( data ) {
if (window.frameElement && window.frameElement.id=='websitePreviewIframe') { //we make sure we don't in the interface
buildSmallPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&tranW='+websiteLanguageCountryFullCode+'&moduleID='+$this.data('module'),true,false,true,'');
} else {
parent.buildSmallPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&tranW='+websiteLanguageCountryFullCode+'&moduleID='+$this.data('module'),true,false,true,'');
}
CountStoreItems();
}
});
});
$('.orderOpenCart').off('click').on('click',function( event ) {
var $this = $(this);
if (window.frameElement && window.frameElement.id=='websitePreviewIframe') { //we make sure we don't in the interface
buildSmallPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&moduleTypeNUM=37&tranW='+websiteLanguageCountryFullCode+'',true,false,true,'');
} else {
parent.buildSmallPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&moduleTypeNUM=37&tranW='+websiteLanguageCountryFullCode+'',true,false,true,'');
}
});
});
/**
* The function check if the product have fields that need to validation
* before adding them to cart, if so the function alert the user and return
* false, otherwise it return true.
*/
function atcValidator() {
var $ct = $("#product-custom-text");
if ( $ct.length !== 0 && $ct.data('mandatory') ) {
var $ct_fieldTitle = $('#ct_fieldTitle');
if ( $ct_fieldTitle.val().length === 0 ) {
$ct_fieldTitle.popover({
container: 'body',
content: translations.productvalidatorPopover,
trigger: 'manual',
template: '<div class="popover product-validator-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
placement: function(popover, input) {
return isMobile.any() ? 'auto' : ($('html').attr('dir') === 'rtl' ? 'left' : 'right');
}
});
$ct_fieldTitle.popover('show').one('input', function(e) {
$(this).popover('hide');
});
$ct_fieldTitle.focus();
return false;
}
}
return true;
}
}
function ReduseMenuSizeWhenWeDontHavePlace() {
ReduseMenuSizeWhenWeDontHavePlace_Action($('#top-menu .navPages'),'header',8);
ReduseMenuSizeWhenWeDontHavePlace_Action($('.global_footer .nav'),'footer',4);
FixMenuTopPosition_TopMenu();
ShowMenuAfterReduseSize('header');
ShowMenuAfterReduseSize('footer');
}
function ReduseMenuSizeWhenWeDontHavePlace_Action($nav,$place,$padding) {
if (findBootstrapEnvironment()!='xs' && CheckMenuWidthSpace($place) && $nav.find('>li>a').length>1) {
if (CheckMenuWidthSpace($place)) {
if ($nav.find('.extra-nav-more').length==0) {
var x = '<li class="moduleMenu extra-nav-more dropdown-submenu"><a href="#" aria-haspopup="true" aria-expanded="true">'+translations.more.toLowerCase()+'';
if ($place=='footer') {
x += ' <span class="fa fa-caret-up"></span></a> <ul class="site-dropdown-menu dropdown-side-open-up';
} else {
x += ' <span class="fa fa-caret-down"></span></a> <ul class="site-dropdown-menu';
}
x += '"></ul></li>';
$nav.append(x);
}
var $newLIpage = $nav.find(">li").eq(-2).detach().prependTo($nav.find('.extra-nav-more>ul'));
if ($newLIpage.hasClass('dropdown-submenu')==true) {
if ( $('html').attr('dir') == 'rtl' ) {
$newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-left');
} else {
$newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-right');
}
if ($place=='header') {
if ( $('html').attr('dir') == 'rtl' ) {
$newLIpage.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-left');
} else {
$newLIpage.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-right');
}
}
if ($place=='footer') {
$newLIpage.find('.site-dropdown-menu').removeClass('dropdown-side-open-up');
$newLIpage.find('.fa-caret-up').removeClass('fa-caret-up').addClass('fa-caret-'+layoutMenuPositionOpenMenuTXT+'');
}
}
if ($nav.find('.extra-nav-more').length==0) {
$nav.find(".extra-nav-more").detach().prependTo($nav);
}
ReduseMenuSizeWhenWeDontHavePlace_Action($nav,$place,$padding);
}
}
}
function CheckMenuWidthSpace($place) {
if ($place=='header') {
switch($('#layoutNUM').val()) {
case '2':
if ($('#mainNav .site_container').width()-50<$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '5':
if ($('.body').outerWidth(false)-50<$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '13':
if ($('#mainNav .site_container').width()-50<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '21':
$('#centerLogo19').remove();
$('#top-menu').css({'padding-right':'0','padding-left':'0'});
if ($('#mainNav .site_container').width()-50<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#mainNav .navActions').outerWidth(true)+120) {
return true;
} else {
return false;
}
break;
default:
if (GetTopMenuWidthByIsContainer()<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
}
}
if ($place=='footer') {
switch($('#footer_layout').val()) {
case '2':
if ($('.global_footer .part1').outerWidth(true)-100<$('.global_footer .nav').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '1':
case '3':
case '4':
if ($('.global_footer .side2').outerWidth(true)-100<$('.global_footer .nav').outerWidth(true)) {
return true;
} else {
return false;
}
}
}
}
function GetTopMenuWidthByIsContainer() {
if ($('#mainNav .site_container').length>0) {
return $('#mainNav .site_container').width()-50;
} else {
return $(window).outerWidth(true)-50;
}
}
function ReduseMenuSizeWhenWeDontHavePlaceHeight() {
ReduseMenuSizeWhenWeDontHavePlaceHeight_action();
FixMenuTopPosition_SideMenu();
ShowMenuAfterReduseSize('');
ReduseMenuSizeWhenWeDontHavePlace_Action($('.global_footer .nav'),'footer',4);
FixMenuTopPosition_TopMenu();
ShowMenuAfterReduseSize('footer');
}
function ReduseMenuSizeWhenWeDontHavePlaceHeight_action() {
var $nav = $('#top-menu .navPages');
if (findBootstrapEnvironment()!='xs' && CheckMenuWidthSpaceHeight() && $nav.find('>li>a').length>1) {
if (CheckMenuWidthSpaceHeight()) {
if ($nav.find('.extra-nav-more').length==0) {
var x = '<li class="moduleMenu extra-nav-more dropdown-submenu"><a href="#" aria-haspopup="true" aria-expanded="true">';
if ( $('html').attr('dir') == 'rtl' ) {
x += translations.more.toLowerCase();
x += ' <span class="fa fa-caret-left"></span>';
x += '</a> <ul class="site-dropdown-menu dropdown-side-open-left"></ul></li>';
} else {
x += translations.more.toLowerCase();
x += ' <span class="fa fa-caret-right"></span>';
x += '</a> <ul class="site-dropdown-menu dropdown-side-open-right"></ul></li>';
}
$nav.append(x);
}
var $newLIpage = $nav.find(">li").eq(-2).detach().prependTo($nav.find('.extra-nav-more>ul'));
if ($newLIpage.hasClass('dropdown-submenu')==true) {
$newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-'+layoutMenuPositionOpenMenuTXT+'');
}
if ($nav.find('.extra-nav-more').length==0) {
$nav.find('.extra-nav-more').detach().prependTo($nav);
}
ReduseMenuSizeWhenWeDontHavePlaceHeight_action();
}
}
}
function CheckMenuWidthSpaceHeight() {
switch($('#layoutNUM').val()) {
default:
if ($(window).outerHeight(true)-20<$('#header .header-column-logo').outerHeight(true)+$('#header .header-column-menu').outerHeight(true)+$('#header .header-column-menu-actions').outerHeight(true)) {
return true;
} else {
return false;
}
}
}
function ShowMenuAfterReduseSize($place) {
if ( $('#top-menu').length > 0 && $('#layoutNUM').val() == '21' && $place == 'header' ) {
$('#centerLogo19').remove();
$('#top-menu').css({'padding-right':'0','padding-left':'0'});
var menuWidth = ($('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true))/2;
var sumLIofMenu = 0;
var saveLIplace = 1;
var extraPaddingFromSideOne = 0;
$('#top-menu .navPages > li').each(function() {
var $this = $(this);
sumLIofMenu += $this.outerWidth(true);
if (sumLIofMenu>=menuWidth) {
extraPaddingFromSideOne = sumLIofMenu-menuWidth;
return false;
}
saveLIplace++;
});
if ($('#top-menu .navPages > li').eq(saveLIplace-1).outerWidth(true)*0.6<=(extraPaddingFromSideOne)) {
saveLIplace = saveLIplace-1;
}
if ($('#top-menu .navPages > li').eq(saveLIplace-1).length>0) {
$('<li id="centerLogo19">'+$('.navbar-header').html()+'</li>').insertAfter($('#top-menu .navPages > li').eq(saveLIplace-1));
} else {
$('#top-menu .navPages').append('<li id="centerLogo19">'+$('.navbar-header').html()+'</li>');
}
/**
* Scrollspy Fix - We are using Bootstrap Scrollspy plugin to active the current
* menu page on scrolling at single page websites, the issue is that on Layout 2
* the website logo placed at the center of the menu, and it link the user to the
* top of the page, so Scrollspy plugin is confused and highlight it on scroll so
* its flashing. Because Scrollspy has no option to ignore a page link, we decide
* to remove the `href` from the a tag to handle it ourself to fix that issue.
* Note: The issue related only to single page websites and only to layout 2.
*/
(function () {
var $logo = $('#centerLogo19 a');
var href = $logo.attr('href');
$logo
.attr('href','javascript:void(0);')
.off('click.scrollspyFix')
.on('click.scrollspyFix', function(e) {
event.preventDefault();
location.href = href;
});
})();
ShowMenuAfterReduseSize_finishCalc();
ShowMenuAfterReduseSize_finishCalc();
ShowMenuAfterReduseSize_finishCalc();
ShowMenuAfterReduseSize_finishCalc();
}
if ( $('#header').length == 0 && $('#top-menu').length > 0 && $place == 'header' ) {
var rectMenu;
var rectHeader;
rectMenu = Math.round($('#top-menu').outerWidth());
rectHeader = Math.round($('#mainNav .site_container').width());
if ($('#mainNavMobile').is(":visible")==false && rectMenu>rectHeader && $('#top-menu .navActions .header-menu-wrapper').length==0 && $('#top-menu.affix').length==0) {
$('#top-menu .navActions').append('<li class="header-menu-wrapper replaceActionButtonsToIcon"><a data-close-location="left" class="btn" role="button" data-container="body" data-toggle="menuCallActionIcons"><i class="fa fa-bars"></i></a></li>');
$('.action-button-wrapper').hide();
TriggerS123PageReady();
ResetMoreButton();
}
rectMenu = Math.round($('#top-menu').outerWidth());
rectHeader = Math.round($('#mainNav .site_container').width());
if ($('#mainNavMobile').is(":visible")==false && rectMenu>rectHeader && $('#top-menu .navActions .header-menu-wrapper').length>0 && $('.replaceActionButtonsToIcon').length>0 && $('.replaceActionButtonsToIconRemoveExtra').length==0 && $('#top-menu.affix').length==0) {
$('.header-phone-wrapper, .header-address-wrapper, .header-social-wrapper, .header-search-wrapper').hide();
$('.replaceActionButtonsToIcon').addClass('replaceActionButtonsToIconRemoveExtra');
TriggerS123PageReady();
ResetMoreButton();
}
}
if ($('#mainNavMobile').is(":visible")) {
if ($('#mainNavMobile .navActions > li:visible').length>2) {
$('#mainNavMobile .navActions > li.header-social-wrapper ').hide();
if ($('#mainNavMobile .navActions > li:visible').length>2) {
$('#mainNavMobile .navActions > li.header-search-wrapper').hide();
if ($('#mainNavMobile .navActions > li:visible').length>2) {
$('#mainNavMobile .navActions > li.header-address-wrapper').hide();
}
}
}
}
if ($place=='' || $place=='header') {
$('#mainNav #top-menu .navPages, #mainNav #top-menu .navActions, #mainNav #top-menu .headerSocial, #header .header-row').css({
'opacity':'1'
});
}
if ($place=='footer') {
$('.global_footer .nav').css({
'opacity':'1'
});
}
$('#mainNavMobile').css({
'opacity':'1'
});
activeDropDownMenusAction();
}
function ShowMenuAfterReduseSize_finishCalc() {
var screenCenterPoint 		= $(window).outerWidth(true)/2;
var logoLeftPXforCenter 	= Math.round(screenCenterPoint-($('#centerLogo19').outerWidth(true)/2));
var logoExistingLeftPX 		= Math.round($('#centerLogo19').offset().left);
if (logoLeftPXforCenter>logoExistingLeftPX) {
var result = (logoLeftPXforCenter-logoExistingLeftPX);
var existingPadding = parseInt($('#top-menu').css('padding-left'),10);
result = result+existingPadding;
$('#top-menu').css('padding-left',(result)+'px');
} else {
var result = (logoExistingLeftPX-logoLeftPXforCenter);
var existingPadding = parseInt($('#top-menu').css('padding-right'),10);
result = result+existingPadding;
$('#top-menu').css('padding-right',(result)+'px');
}
}
function FixMenuTopPosition_SideMenu() {
$('.navPages .dropdown-submenu > a').on('click mouseenter', function(e) {
$this = $(this).parent().find('.site-dropdown-menu');
if ($this.length>0) {
setTimeout(function() {
var rect = $this[0].getBoundingClientRect();
if (rect.top + rect.height > window.innerHeight && rect.height<window.innerHeight) {
$this.css('top',parseInt($this.css('top'), 10) - (rect.top + rect.height - window.innerHeight) - 25);
}
$this.css('opacity','1');
},100);
}
});
};
function FixMenuTopPosition_TopMenu() {
$('.navPages .dropdown-submenu > a, .global_footer .nav .dropdown-submenu > a').on('click mouseenter', function(e) {
$this = $(this).parent().find('.site-dropdown-menu');
if ($this.length>0) {
setTimeout(function() {
if ($this.length>0) {
var rect = $this[0].getBoundingClientRect();
if (rect.top + rect.height > window.innerHeight && rect.height<window.innerHeight) {
$this.css({
'bottom':'100%',
'top':'auto'
});
} else {
if (rect.top<0 || rect.bottom<0) {
$this.css({
'top':'100%',
'bottom':'auto'
});
}
}
if ( $('html').attr('dir') != 'rtl' ) {
if (rect.right>window.innerWidth && rect.width<window.innerWidth) {
$this.css({
'left':'auto',
'right':'0'
});
}
} else {
if (rect.left<0 && rect.width<window.innerWidth) {
$this.css({
'right':'auto',
'left':'0'
});
}
}
}
$this.css('opacity','1');
},100);
}
});
}
function openDivMenuOnMobileClick() {
$( document ).on( 's123.page.ready', function( event ) {
$('.header-menu-wrapper a').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
openDivMenuOnMobileClickAction(closeLocation);
});
});
}
function ResetMoreButton() {
$('#mainNav #top-menu .navPages, #mainNav #top-menu .navActions, #mainNav #top-menu .headerSocial, #header .header-row, .global_footer .nav').css({
'opacity':'0'
});
$('#top-menu .navPages .extra-nav-more > ul > li').each(function() {
var $this = $(this);
if ($('#mainNav #top-menu').length>0) {
$this.find('.site-dropdown-menu').removeClass('dropdown-side-open-left');
if ( $('html').attr('dir') == 'rtl' ) {
$this.find('.fa').removeClass('fa-caret-left').addClass('fa-caret-down');
} else {
$this.find('.fa').removeClass('fa-caret-right').addClass('fa-caret-down');
}
}
$this.appendTo($('#top-menu .navPages'));
});
$('#top-menu .navPages .extra-nav-more').remove()
$('footer .navPages .extra-nav-more > ul > li').each(function() {
var $this = $(this);
$this.appendTo($('footer .navPages'));
});
$('footer .navPages .extra-nav-more').remove();
if (layoutMenuPositionTXT=='left' || layoutMenuPositionTXT=='right') {
ReduseMenuSizeWhenWeDontHavePlaceHeight();
} else {
ReduseMenuSizeWhenWeDontHavePlace();
}
}
function openDivMenuOnMobileClickAction(closeLocation) {
var pageList = '<ul class="navPagesPopup">'+$('#top-menu-mobile > ul').clone().html()+'</ul>';
var actionButtons = '<div class="navPagesPopupActionButtons">';
actionButtons += '<div class="navPagesPopupActionButtons_part1">';
if ($('.header-phone-wrapper').length>0) {
actionButtons += $('.header-phone-wrapper').clone().html();
}
if ($('.header-address-wrapper').length>0) {
actionButtons += $('.header-address-wrapper').clone().html();
}
if ($('.header-social-wrapper').length>0 && $('.header-social-wrapper.hidden').length==0) {
actionButtons += $('.header-social-wrapper').clone().html();
}
if ($('.header-search-wrapper').length>0) {
actionButtons += $('.header-search-wrapper').clone().html();
}
if ($('.website-languages-menu a').length>0) {
actionButtons += $('.website-languages-menu').clone().html();
}
actionButtons += '</div>';
if ($('.action-button-wrapper').length>0) {
actionButtons += '<div class="navPagesPopupActionButtons_part2">';
$('.action-button-wrapper').each(function() {
var $this = $(this);
actionButtons += $this.clone().html();
})
actionButtons += '</div>';
}
actionButtons += '</div>';
buildPopup('popupFloatDivMenu','',pageList+actionButtons,'',true,true,true,closeLocation);
setTimeout(function() {
var navHeight 		= $('#popupFloatDivMenu .navPagesPopup').outerHeight(true)+100; //We add another 100px so the menu will be more taller to make some space and to make some space when the user have categories
var actionHeight 	= $('.navPagesPopupActionButtons').outerHeight(true);
var screenHeight 	= $('#popupFloatDivMenu .page').outerHeight(true);
if (navHeight+actionHeight>screenHeight) {
$('#popupFloatDivMenu .navPagesPopup').height(screenHeight-actionHeight-15);
} else {
$('#popupFloatDivMenu .navPagesPopup').height(navHeight-15);
}
$('#popupFloatDivMenu .navPagesPopup .caret').remove();
$('#popupFloatDivMenu .navPagesPopup .fa-caret-right').remove();
$('#popupFloatDivMenu .navPagesPopup .fa-caret-left').remove();
$('#popupFloatDivMenu .navPagesPopup .site-dropdown-menu').css('opacity','1');
},150);
activeDropDownMenusAction();
$('#popupFloatDivMenu .navPagesPopup li').not('.dropdown-submenu').find('a').click(function() {
buildPopup_CloseAction('popupFloatDivMenu');
});
$('#popupFloatDivMenu .navPagesPopupActionButtons_part2 a').click(function() {
buildPopup_CloseAction('popupFloatDivMenu');
});
ActivePopupActionButtonsInPage();
$(document).trigger('s123.page.ready.pageScrollByClick');
ActiveLanguageButton();
}
function ActiveLanguageButton() {
$('.website-languages-menu-link').click(function() {
openDivMenuOnLanguageClickAction();
});
}
function openDivMenuOnLanguageClickAction() {
var content = '<ul class="languagesList navPagesPopup">';
$.each(languageList, function( index, language ) {
if (language['countryCode'] && language['countryCode']!='') {
content += '<li><a href="'+language['url']+'"><img src="/files/vendor/flag-icon-css-master/flags/1x1/'+language['countryCode']+'.svg" style="width:20px;height:14px;">&nbsp;'+language['name']+'</a></li>';
} else {
content += '<li><a href="'+language['url']+'">'+language['name']+'</a></li>';
}
});
content += '</ul>';
buildPopup('popupFloatDivMenuLanguages','',content,'',true,true,true,'');
}
function PageScrollByClick() {
$( document ).on( 's123.page.ready.pageScrollByClick', function( event ) {
var offset = findBootstrapEnvironment()!='xs' ? menuScrollOffset : menuScrollOffset_mobile;
$('a.page-scroll').off('click.scrollEvent').on('click.scrollEvent',function(event) {
var $anchor = $(this);
$('html, body').stop().animate({
scrollTop: ($($anchor.attr('href')).offset().top - offset)
}, 1250, 'easeInOutExpo');
event.preventDefault();
});
});
}
/**
* The function refresh the Bootstrap Scrollspy. The Scrollspy is the
* object that responsible on Highlighting the top navigation bar as
* scrolling occurs. In some cases we need to refresh the it because
* changes we made in the DOM via Ajax. e.g. changing the pages places.
* Note: We initialize it on the layouts JS files.
* Documentation: http://v4-alpha.getbootstrap.com/components/scrollspy/
*/
function RefreshScrollSpy() {
$( document ).on( 's123.page.ready.refreshScrollSpy', function( event ) {
$('body').scrollspy('refresh');
});
};
function findBootstrapEnvironment() {
var envs = ['xs', 'sm', 'md', 'lg'];
var $el = $('<div>');
$el.appendTo($('body'));
for (var i = envs.length - 1; i >= 0; i--) {
var env = envs[i];
$el.addClass('hidden-'+env);
if ($el.is(':hidden')) {
$el.remove();
return env;
}
}
}
function buildSmallPopup(popID,title,content,iframeURL,closeEsc,closeEnter,oneColor,closeLocation) {
if (iframeURL!='') {
content = '<iframe id="'+popID+'_iFrame" src="'+iframeURL+'" scrolling="no"></iframe>';
}
var x = '<div id="'+popID+'" class="quickPopupWin">';
x += '<div class="cover">';
x += '</div>';
x += '<div class="content">';
x += content;
x += '</div>';
x += '</div>';
$('body').append(x);
popupWinScrollAction(1);
setTimeout(function() {
$('#'+popID+'').find('.content').addClass('open');
},100);
$('#'+popID+' .cover').click(function() {
buildSmallPopup_CloseAction(popID);
});
}
function buildSmallPopup_CloseAction( popID ) {
var $popup = $('#'+popID);
setTimeout(function() {
$popup.find('.content').removeClass('open');
},100);
setTimeout(function() {
$('#'+popID).remove();
popupWinScrollAction(0);
},700);
}
function buildPopup(popID,title,content,iframeURL,closeEsc,closeEnter,oneColor,closeLocation) {
if ( $('#'+popID).length !== 0 ) return;
/*
window.onhashchange = function() {
if ($('#'+popID).length>0 && window.location.hash.substr(1)!=popID) {
buildPopup_CloseAction(popID);
}
}
*/
if (iframeURL!='') {
var iClass = '';
if ( iframeURL.indexOf("youtube.com") > -1 ) {
iClass 	= 'videoSize';
}
if ( iframeURL.indexOf("vimeo.com") > -1 ) {
iClass 	= 'videoSize';
}
content = '<iframe id="'+popID+'_iFrame" src="'+iframeURL+'" class="iframe '+iClass+'" allowfullscreen></iframe>';
}
var x = '<div id="'+popID+'" class="popupWin container';
if (oneColor==true) {
x += ' oneColor';
}
x += '">';
x += '<div class="cover">';
x += '</div>';
x += '<div class="content container">';
x += '<div class="page">'+content+'</div>';
x += '</div>';
x += '<div class="popupCloseButton '+closeLocation+'">';
x += '<i class="fa fa-close fa-3x"></i>';
x += '</div>';
x += '</div>';
$('body').append(x);
popupWinScrollAction(1);
$('#'+popID).find('.page').css({ overflow: 'hidden' });
setTimeout(function() {
$('#'+popID).addClass('open');
if (iframeURL=='') {
$('#'+popID).find('.page').css({ overflow: 'auto' });
}
},100);
$('#'+popID).find('.popupCloseButton').click(function() {
buildPopup_CloseAction(popID);
});
$('#'+popID+' .cover').click(function() {
buildPopup_CloseAction(popID);
});
if (iframeURL!='') {
$('#'+popID+'_iFrame').on("load",function() {
setTimeout(function() {
var screenHeight 	= $('#pagePopupWinID .page').outerHeight(true);
$('#pagePopupWinID_iFrame').height(screenHeight);
if (!is_touch_device()) {
$('#'+popID).find('.page').css({ overflow: 'hidden' });
} else {
$('#'+popID).find('.page').css({ overflow: 'auto' });
}
},300);
});
}
$(document).keyup(function(e) {
if (closeEsc==true && e.keyCode === 27) {
buildPopup_CloseAction(popID);
}
/*
if (closeEnter==true && e.keyCode === 13) {
buildPopup_CloseAction(popID);
}
*/
});
}
function is_touch_device() {
return 'ontouchstart' in window        // works on most browsers
|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
};
function buildPopup_CloseAction( popID ) {
var $popup = $('#'+popID);
$popup.find('.page').css({
overflow: 'hidden'
});
$popup.removeClass('open');
setTimeout(function() {
$('#'+popID).remove();
if ( $('.popupWin').length <= 1 ) {
popupWinScrollAction(0);
}
},700);
}
function buildPopup_CloseAllPopupsInPage() {
if ($('.popupWin').length>0) {
$('.popupWin').each(function() {
var popID = $(this).attr('id');
buildPopup_CloseAction(popID);
});
}
}
/**
* The function extend the jQuery validator Translated messages.
*
* according to this answer:
* `http://stackoverflow.com/questions/2457032/jquery-validation-change-default-error-message`
*/
function jqueryValidatorTranslatedMessages() {
jQuery.extend(jQuery.validator.messages, {
required: translations.jqueryValidMsgRequire,
remote: translations.jqueryValidMsgRemote,
email: translations.jqueryValidMsgEmail,
url: translations.jqueryValidMsgUrl,
date: translations.jqueryValidMsgDate,
dateISO: translations.jqueryValidMsgDateISO,
number: translations.jqueryValidMsgNumber,
digits: translations.jqueryValidMsgDigits,
creditcard: translations.jqueryValidMsgCreditcard,
equalTo: translations.jqueryValidMsgEqualTo,
accept: translations.jqueryValidMsgAccept,
maxlength: jQuery.validator.format(translations.jqueryValidMsgMaxlength),
minlength: jQuery.validator.format(translations.jqueryValidMsgMinlength),
rangelength: jQuery.validator.format(translations.jqueryValidMsgRangelength),
range: jQuery.validator.format(translations.jqueryValidMsgRange),
max: jQuery.validator.format(translations.jqueryValidMsgMax),
min: jQuery.validator.format(translations.jqueryValidMsgMin)
});
}
function OpenModuleManagment() {
$( document ).on( 's123.page.ready', function( event ) {
if ( !IsWizard() ) return;
/**
* Pages Menu Buttons Handler - Expand the related accordions when clicking on a button.
*/
(function () {
$('.header-phone-wrapper')
.add('.header-address-wrapper')
.add('.header-social-wrapper')
.off('click.p_m_helpers')
.on('click.p_m_helpers',function( event ) {
expandWizardHomepage('designTab','#collapseHeaderOptions');
});
})();
/**
* Logo Handler - Expand the related accordions and highlight the
* related inputs when clicking on the website logo (website name).
*/
$('#mainNav .logo_name, #header .logo_name, #mainNavMobile .logo_name')
.each(function() {
var $this = $(this);
$this.off('click.p_m_helpers').on('click.p_m_helpers',function( event ) {
if ( IsHomepage() ) event.preventDefault();
expandWizardHomepage('homepageTab','#homepageCollapse1');
var $input = topWindow.$('#name');
$input.select().focus();
});
});
/**
* Homepage Background Image Handler - Expand the related accordions when
* clicking on an homepage background image.
*/
$('#top-section')
.each(function() {
var $this = $(this);
$this.off('click.p_m_helpers').on('click.p_m_helpers',function( event ) {
var $target = $(event.target);
if ( $target.hasClass('home-image-bg') || $target.parent().is($this) ) {
expandWizardHomepage('homepageTab','#homepageCollapse8');
}
});
});
/**
* Homepage Texts Handler - Expand the related accordions and highlight the
* related inputs when clicking on an homepage text (title, slogan, etc.)
*/
$('#home_siteSlogan')
.add('#home_siteSlogan_2')
.add('#home_SecondSiteSlogan')
.each(function() {
var $this = $(this);
$this.off('click.p_m_helpers').on('click.p_m_helpers',function( event ) {
expandWizardHomepage('homepageTab','#homepageCollapse2');
var $input = topWindow.$('#'+$this.get(0).id);
$input.select().focus();
});
});
/**
* Homepage Buttons Handler - Expand the related accordions and highlight the
* related inputs when clicking on an homepage buttons.
*/
$('#home_buttonText')
.add('#home_buttonText_1')
.each(function() {
var $this = $(this);
$this.off('click.p_m_helpers').on('click.p_m_helpers',function( event ) {
expandWizardHomepage('homepageTab','#homepageCollapse3');
var $input = topWindow.$('#'+$this.get(0).id);
$input.select().focus();
});
});
/**
* Homepage Video Handler - Expand the related accordions when clicking on an homepage video.
*/
$('#top-section .homeYoutubeInline')
.add('#websitePopupHomeVideo')
.each(function() {
var $this = $(this);
$this.off('click.p_m_helpers').on('click.p_m_helpers',function( event ) {
expandWizardHomepage('homepageTab','#homepageCollapse4');
});
});
/**
* Homepage Form Handler - Expand the related accordions when clicking on an homepage form.
*/
$('#contactUsFormHome')
.each(function() {
var $this = $(this);
$this.off('click.p_m_helpers').on('click.p_m_helpers',function( event ) {
expandWizardHomepage('homepageTab','#homepageCollapse5');
});
});
/**
* Pages Header Handler - Expand the related page and highlight its page
* name input when clicking on a page header.
*/
$('.s123-page-header')
.each(function() {
var $this = $(this);
$this.off('click.p_m_helpers').on('click.p_m_helpers',function( event ) {
topWindow.OpenWizardTab('pagesTab',true);
var moduleID = $this.get(0).id.replace('section-','').replace('-title','');
var $page = topWindow.Wizard.Pages.getPage(moduleID);
$page.find('input.module_name').select().focus();
});
});
var $previewManageButton = $('.previewManageButton');
$previewManageButton.each( function( index ) {
var $pmb = $(this);
$pmb.find('> a').off('click.p_m_buttons');
switch ( $pmb.data('type') ) {
case 'homepage':
var homepage_goal = topWindow.$('#homepage_goal').val();
$pmb.find(' > a').hide();
if ( topWindow.homepageModulesArr[homepage_goal]['tool_text'] == '1' ) {
$pmb.find('[data-action="edit"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('homepageTab','#homepageCollapse2');
})
.css({ display: 'flex' });
}
if (topWindow.homepageModulesArr[homepage_goal]['tool_background'] == '1' ) {
$pmb.find('[data-action="image"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('homepageTab','#homepageCollapse8');
})
.css({ display: 'flex' });
}
if (topWindow.homepageModulesArr[homepage_goal]['tool_buttons'] == '1' ) {
$pmb.find('[data-action="buttons"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('homepageTab','#homepageCollapse3');
})
.css({ display: 'flex' });
}
if (topWindow.homepageModulesArr[homepage_goal]['tool_video'] == '1' ) {
$pmb.find('[data-action="video"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('homepageTab','#homepageCollapse4');
})
.css({ display: 'flex' });
}
if (topWindow.homepageModulesArr[homepage_goal]['tool_form'] == '1' ) {
$pmb.find('[data-action="form"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('homepageTab','#homepageCollapse5');
})
.css({ display: 'flex' });
}
$pmb.find('[data-action="layouts"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('homepageTab','#homepageCollapse7');
})
.css({ display: 'flex' });
break;
default:
$pmb.find('a.edit').on('click.p_m_buttons',function() {
event.preventDefault();
var $this 			= $(this);
var moduleID 		= $this.data('module-id');
var moduleTypeNUM 	= $this.data('module-type');
var itemID 			= $this.data('item-id');
if ( itemID == '' ) {
topWindow.OpenWizardTab('pagesTab',true);
topWindow.$('.moduleSortList .modulesEditButton[data-moduleid="'+moduleID+'"]').trigger('click');
} else {
topWindow.OpenModuleManagmentWizardFromPreview(moduleID,moduleTypeNUM,itemID);
}
});
$pmb.find('a.design').on('click.p_m_buttons',function() {
event.preventDefault();
var $this 			= $(this);
var moduleID 		= $this.data('module-id');
topWindow.OpenWizardTab('pagesTab',true);
setTimeout(function() {
topWindow.$('.moduleSortList .designModuleButton[data-module-id="'+moduleID+'"]').trigger('click');
},300);
});
}
/**
* Bootstrap Tooltip Initialize
* Documentation: https://v4-alpha.getbootstrap.com/components/tooltips/
*/
$pmb.find('> a').tooltip({
container: 'body',
placement: $('html').attr('dir') === 'rtl' ? 'right' : 'left'
});
});
$previewManageButton.css({ display: 'flex' });
/**
* Remove Wizard Flash - Sometimes the preview reload before the `setTimeout`
* remove the highlight class, so we remove it on page ready.  e.g. when clicking
* on the website logo name the page reload.
*/
topWindow.$('.p-m-b-wizard-accordion-flash').removeClass('p-m-b-wizard-accordion-flash');
/**
* The function open expand the sent accordion in the
* management wizard accordion.
*/
function expandWizardHomepage( tab, accordionId ) {
var $accordion = topWindow.$(accordionId);
topWindow.OpenWizardTab(tab,true);
if ( $accordion.hasClass('in') ) {
$accordion.closest('.panel').addClass('p-m-b-wizard-accordion-flash');
setTimeout(function() {
$accordion.closest('.panel').removeClass('p-m-b-wizard-accordion-flash');
},500);
return;
}
topWindow.$('[href="'+accordionId+'"]').trigger('click');
}
});
}
/**
* The function is handling all the videos players.
*/
function s123VideoHandler( $obj, mobile ) {
var player 			= $obj.data('player');
var videoURL 		= $obj.data('video');
var customStyle 	= $obj.find('img').attr('style') ? $obj.find('img').attr('style') : '';
var width 			= $obj.find('img').width();
var height 			= $obj.find('img').height();
if ( player === 'site123') {
videoURL = '/include/globalVideoPlayer.php?url=' + encodeURIComponent(videoURL)+'&width='+width+'&height='+height;
}
/**
* On mobile devices we disable the videos auto load because there
* is some mobiles devices that don't know how to handle it.
*/
if ( mobile ) {
if ( player === 'site123') {
videoURL += '&autoplay=false';
} else {
videoURL = videoURL.replace('autoplay','disable-autoplay');
}
}
$obj.replaceWith('<div class="video-wrapper"><iframe data-player="'+player+'" style="'+customStyle+'width:'+width+'px;height:'+height+'px;" type="text/html" src="'+videoURL+'" frameborder="0" allowfullscreen></iframe></div>');
}
/**
* The function replace the editors video tags with another HTML
* markup to support our videos handlers system (s123VideoHandler()).
*/
function s123EditorVideoTagsHandler() {
$('video.fr-draggable').each(function() {
var $video = $(this);
var src = $video.attr('src');
var extension = src.split("?")[0].split('.').pop();
var thumbnail = src.replace('.'+extension,'-thumbnail.jpg');
$video.replaceWith('<div class="s123-video-handler" data-player="site123" data-video="'+src+'" style="max-width: 100%;max-height:100%;"><img style="'+$video.attr('style')+'" src="'+thumbnail+'"><div class="s123-video-cover"><a class="s123-video-play-icon"><i class="fa fa-play"></i></a></div></div>');
});
}
/**
* The function update the website wizard notifications number, we call it
* to inform the user about a new transaction as soon as he made it, when
* he is at the interface.
*/
function WizardNotificationUpdate() {
if ( IsWizard() ) topWindow.Wizard.Notification.update();
}
/**
* The function calculate coupon discount
*/
function calculateCouponDiscount( totalPrice, $couponDiscount, $couponType ) {
if ( $couponDiscount.length === 0 || !$.isNumeric($couponDiscount.val()) ) return 0;
if ( $couponType.length === 0 || !$.isNumeric($couponType.val()) ) return 0;
if ( $couponType.val() == '0' ) {
return (parseFloat(totalPrice) * parseFloat($couponDiscount.val()) / 100);
} else {
return totalPrice > 0 ? parseFloat($couponDiscount.val()) : 0;
}
}
/**
* The function get coupon details
*/
function getCouponDetails( callback, couponCode, w, websiteID, versionNUM, total ) {
if ( couponCode.length === 0 ) return;
$.ajax({
type: "POST",
url: "/versions/"+versionNUM+"/wizard/orders/front/getCouponsAjax.php",
data: 'w='+w+'&websiteID='+websiteID+'&couponCode='+couponCode+'&total='+total,
success: function(data) {
/**
* parse the JSON response, we using `try` and `catch` to prevent
* JS error if the JSON isn't valid from some reason.
*/
try {
data = jQuery.parseJSON(data);
} catch (e) { return; }
if (callback) callback.call(this,data);
}
});
}
/**
* The function get a form and return all its inputs values.
*/
function getFormValues( $form ) {
var values = {};
$.each($form.serializeArray(), function(i, field) {
values[field.name] = field.value;
});
return values;
}
/* https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript */
function getScrollbarWidth() {
if ($(document).height() > $(window).height()) { //Make sure this page have a scroll
var outer = document.createElement("div");
outer.style.visibility = "hidden";
outer.style.width = "100px";
outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
document.body.appendChild(outer);
var widthNoScroll = outer.offsetWidth;
outer.style.overflow = "scroll";
var inner = document.createElement("div");
inner.style.width = "100%";
outer.appendChild(inner);
var widthWithScroll = inner.offsetWidth;
outer.parentNode.removeChild(outer);
return widthNoScroll - widthWithScroll;
} else {
return 0; //If this page is short without a scroll we don't add padding
}
}
function popupWinScrollAction(addBOO) {
var scrollWidth = getScrollbarWidth();
if (addBOO==1 && scrollWidth>0) {
$('body').addClass('popupWinScroll');
$('body').css('padding-right',scrollWidth+'px');
$('#mainNavMobile').css('padding-right',scrollWidth+'px');
$('#showSmallAdOnScroll').css('padding-right',scrollWidth+'px');
if (layoutMenuPositionTXT=='left' || layoutMenuPositionTXT=='right') {
} else {
$('#mainNav').css('padding-right',scrollWidth+'px');
$('#mainNav #top-menu.affix').css('padding-right',scrollWidth+'px');
}
} else {
$('body').removeClass('popupWinScroll');
$('body').css('padding-right','0px');
$('#mainNavMobile').css('padding-right','0px');
$('#showSmallAdOnScroll').css('padding-right','0px');
if (layoutMenuPositionTXT=='left' || layoutMenuPositionTXT=='right') {
} else {
$('#mainNav').css('padding-right','0px');
$('#mainNav #top-menu.affix').css('padding-right','0px');
}
}
}
/**
* The function add the website domain to all the relative links when
* the user browse under the store SSL domain. Some customers are don't
* use HTTPS, so we redirect them to a store SSL domain at the order flow.
* At those cases we must add the website domain to all the relative
* links to let the user browse to other links when he is at the order flow.
*/
function Order_FixWebsiteDomainUnderStoreSSL() {
var $store_ssl_domain = $('#store_ssl_domain');
var $orderScreen = $('#orderScreen');
var $websiteDomain = $('#websiteDomain');
if ( $orderScreen.length === 0 || $websiteDomain.length === 0 || $store_ssl_domain.length === 0 ) return;
if ( location.href.indexOf($store_ssl_domain.val()) === -1 ) return;
if ( $websiteDomain.val().length === 0 ) return;
$('a').each(function() {
var $this = $(this);
var href = $this.attr('href');
if ( href && href.charAt(0) == '/' ) {
var newHref = $websiteDomain.val() + href;
$this.attr('href',newHref);
}
});
}
/**
* The function check if the user is at the website homepage.
**/
function IsHomepage() {
return $('html.home_page').length === 1;
}
/**
* The function check if the user is at the wizard.
**/
function IsWizard() {
return topWindow.Wizard ? true : false;
}
/**
* Get the closest top parent of the window on the same domain
* to prevent cross origin domain error
*/
var topWindow = function() {
var win = window;
var top = win;
while ( win.parent != win ) {
try {
win.parent.document;
top = win.parent;
} catch (e) {}
win = win.parent;
}
return top;
}();
var holdChangeTextIntervals = []; //Hold all active interval so it will be easy to kiil them before trigger PAGE LOAD from interface
function homepageRandomText() {
$( document ).on( 's123.page.ready', function( event ) {
holdChangeTextIntervals.forEach(function(element) {
clearInterval(element);
});
$('.homepageRandomText').each(function() {
homepageRandomTextAction(this,'no');
});
$('.homepageRandomTextStop').each(function() {
homepageRandomTextAction(this,'yes');
});
});
}
function homepageRandomTextAction(t,hasStop) {
var $this = $(t);
var words = $this.data('text');
var counter = 0;
var speed = 5000;
words = words.split('|');
if (words.length>0) {
if (words[words.length-1].includes('t:')) {
var speedEle = words[words.length-1].replace(/t:(.*)/, '$1');
if ($.isNumeric(speedEle)) {
speed = speedEle;
words.splice(words.length-1, 1);
}
}
$this.html(words[counter]).addClass('elementToFadeIn');
counter++;
var inst = setInterval(function() {
$this.removeClass('elementToFadeIn');
setTimeout(function() { $this.html(words[counter]).addClass('elementToFadeIn'); }, 50);
counter++;
if (counter >= words.length) {
counter = 0;
if (hasStop=='yes') {
clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
}
}
}, speed);
holdChangeTextIntervals.push(inst);
}
}