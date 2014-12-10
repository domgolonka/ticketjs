/** @license
 * RequireJS plugin for loading files without adding the JS extension, useful for
 * JSONP services and any other kind of resource that already contain a file
 * extension or that shouldn't have one (like dynamic scripts).
 * Author: Miller Medeiros
 * Version: 0.3.1 (2011/12/07)
 * Released under the MIT license
 */

define([],function(){var QUERY_PARAM="noext";return{load:function(name,req,onLoad){req([req.toUrl(name)],function(mod){onLoad(mod)})},normalize:function(name){return name+=name.indexOf("?")<0?"?":"&",name+QUERY_PARAM+"=1"}}});