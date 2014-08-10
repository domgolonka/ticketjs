/*
Infinite Scroll Shortcut for jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/

(function(){!function(n,e){return"function"==typeof define&&define.amd?define(["jquery","waypoints"],e):e(n.jQuery)}(window,function(n){var e;return e={container:"auto",items:".infinite-item",more:".infinite-more-link",offset:"bottom-in-view",loadingClass:"infinite-loading",onBeforePageLoad:n.noop,onAfterPageLoad:n.noop},n.waypoints("extendFn","infinite",function(t){var i,o;return o=n.extend({},n.fn.waypoint.defaults,e,t),0===n(o.more).length?this:(i="auto"===o.container?this:n(o.container),o.handler=function(e){var t;return"down"===e||"right"===e?(t=n(this),o.onBeforePageLoad(),t.waypoint("destroy"),i.addClass(o.loadingClass),n.get(n(o.more).attr("href"),function(e){var a,r,f,d;return a=n(n.parseHTML(e)),r=n(o.more),f=a.find(o.more),i.append(a.find(o.items)),i.removeClass(o.loadingClass),f.length?(r.replaceWith(f),d=function(){return t.waypoint(o)},setTimeout(d,0)):r.remove(),o.onAfterPageLoad()})):void 0},this.waypoint(o))})})}).call(this);