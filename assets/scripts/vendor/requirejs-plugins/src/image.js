/** @license
 * RequireJS Image Plugin
 * Author: Miller Medeiros
 * Version: 0.2.2 (2013/02/08)
 * Released under the MIT license
 */

define([],function(){function n(){}function r(n){return n=n.replace(o,""),n+=n.indexOf("?")<0?"?":"&",n+e+"="+Math.round(2147483647*Math.random())}var e="bust",o="!bust",t="!rel";return{load:function(r,e,o,u){var a;u.isBuild?o(null):(a=new Image,a.onerror=function(n){o.error(n)},a.onload=function(){o(a);try{delete a.onload}catch(r){a.onload=n}},a.src=-1!==r.indexOf(t)?e.toUrl(r.replace(t,"")):r)},normalize:function(n){return-1===n.indexOf(o)?n:r(n)}}});