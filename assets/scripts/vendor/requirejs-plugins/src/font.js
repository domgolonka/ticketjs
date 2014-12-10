/** @license
 * RequireJS plugin for loading web fonts using the WebFont Loader
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 */

define(["propertyParser"],function(propertyParser){function parseName(name){for(var match,data={},vendors=name.split("|"),n=vendors.length;n--;)match=rParts.exec(vendors[n]),data[match[1]]=propertyParser.parseProperties(match[2]);return data}var rParts=/^([^,]+),([^\|]+)\|?/;return{load:function(name,req,onLoad,config){if(config.isBuild)onLoad(null);else{var data=parseName(name);data.active=onLoad,data.inactive=function(){onLoad(!1)},req([("https:"===document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"],function(){WebFont.load(data)})}}}});