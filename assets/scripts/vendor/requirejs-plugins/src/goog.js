/** @license
 * RequireJS plugin for loading Google Ajax API modules thru `google.load`
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 */

define(["async","propertyParser"],function(e,o){function t(e){var t=n.exec(e),r={moduleName:t[1],version:t[2]||"1"};return r.settings=o.parseProperties(t[3]),r}var n=/^([^,]+)(?:,([^,]+))?(?:,(.+))?/;return{load:function(e,o,n,r){if(r.isBuild)n(null);else{var s=t(e),a=s.settings;a.callback=n,o(["async!"+("https:"===document.location.protocol?"https":"http")+"://www.google.com/jsapi"],function(){google.load(s.moduleName,s.version,a)})}}}});