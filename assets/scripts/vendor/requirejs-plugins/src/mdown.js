/** @license
 * RequireJS plugin for loading Markdown files and converting them into HTML.
 * Author: Miller Medeiros
 * Version: 0.1.1 (2012/02/17)
 * Released under the MIT license
 */

define(["text","markdownConverter"],function(n,e){var t={};return{load:function(i,r,o,u){n.get(r.toUrl(i),function(n){n=e.makeHtml(n),u.isBuild?(t[i]=n,o(n)):o(n)})},write:function(e,i,r){if(i in t){var o=n.jsEscape(t[i]);r.asModule(e+"!"+i,"define(function () { return '"+o+"';});\n")}}}});