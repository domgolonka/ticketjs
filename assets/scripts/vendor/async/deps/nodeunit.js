/*!
 * Nodeunit
 * https://github.com/caolan/nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * json2.js
 * http://www.JSON.org/json2.js
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*!
 * Nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 * Only code on that line will be removed, its mostly to avoid requiring code
 * that is node specific
 */

nodeunit=function(){this.JSON||(this.JSON={}),function(){"use strict";function f(n){return 10>n?"0"+n:n}function quote(n){return escapable.lastIndex=0,escapable.test(n)?'"'+n.replace(escapable,function(n){var t=meta[n];return"string"==typeof t?t:"\\u"+("0000"+n.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+n+'"'}function str(n,t){var e,r,o,i,u,a=gap,c=t[n];switch(c&&"object"==typeof c&&"function"==typeof c.toJSON&&(c=c.toJSON(n)),"function"==typeof rep&&(c=rep.call(t,n,c)),typeof c){case"string":return quote(c);case"number":return isFinite(c)?String(c):"null";case"boolean":case"null":return String(c);case"object":if(!c)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(c)){for(i=c.length,e=0;i>e;e+=1)u[e]=str(e,c)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+a+"]":"["+u.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(i=rep.length,e=0;i>e;e+=1)r=rep[e],"string"==typeof r&&(o=str(r,c),o&&u.push(quote(r)+(gap?": ":":")+o));else for(r in c)Object.hasOwnProperty.call(c,r)&&(o=str(r,c),o&&u.push(quote(r)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+a+"}":"{"+u.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(n,t,e){var r;if(gap="",indent="","number"==typeof e)for(r=0;e>r;r+=1)indent+=" ";else"string"==typeof e&&(indent=e);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":n})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(n,t){var e,r,o=n[t];if(o&&"object"==typeof o)for(e in o)Object.hasOwnProperty.call(o,e)&&(r=walk(o,e),void 0!==r?o[e]=r:delete o[e]);return reviver.call(n,t,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(n){return"\\u"+("0000"+n.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();var assert=this.assert={},types={},core={},nodeunit={},reporter={};return function(){var n={},t=this,e=t.async;"undefined"!=typeof module&&module.exports?module.exports=n:t.async=n,n.noConflict=function(){return t.async=e,n};var r=function(n,t){if(n.forEach)return n.forEach(t);for(var e=0;e<n.length;e+=1)t(n[e],e,n)},o=function(n,t){if(n.map)return n.map(t);var e=[];return r(n,function(n,r,o){e.push(t(n,r,o))}),e},i=function(n,t,e){return n.reduce?n.reduce(t,e):(r(n,function(n,r,o){e=t(e,n,r,o)}),e)},u=function(n){if(Object.keys)return Object.keys(n);var t=[];for(var e in n)n.hasOwnProperty(e)&&t.push(e);return t},a=function(n,t){if(n.indexOf)return n.indexOf(t);for(var e=0;e<n.length;e+=1)if(n[e]===t)return e;return-1};n.nextTick=function(n){"undefined"!=typeof process&&process.nextTick?process.nextTick(n):setTimeout(n,0)},n.forEach=function(n,t,e){if(!n.length)return e();var o=0;r(n,function(r){t(r,function(t){t?(e(t),e=function(){}):(o+=1,o===n.length&&e())})})},n.forEachSeries=function(n,t,e){if(!n.length)return e();var r=0,o=function(){t(n[r],function(t){t?(e(t),e=function(){}):(r+=1,r===n.length?e():o())})};o()};var c=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[n.forEach].concat(e))}},s=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[n.forEachSeries].concat(e))}},f=function(n,t,e,r){var i=[];t=o(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){e(n.value,function(e,r){i[n.index]=r,t(e)})},function(n){r(n,i)})};n.map=c(f),n.mapSeries=s(f),n.reduce=function(t,e,r,o){n.forEachSeries(t,function(n,t){r(e,n,function(n,r){e=r,t(n)})},function(n){o(n,e)})},n.inject=n.reduce,n.foldl=n.reduce,n.reduceRight=function(t,e,r,i){var u=o(t,function(n){return n}).reverse();n.reduce(u,e,r,i)},n.foldr=n.reduceRight;var l=function(n,t,e,r){var i=[];t=o(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){e(n.value,function(e){e&&i.push(n),t()})},function(){r(o(i.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};n.filter=c(l),n.filterSeries=s(l),n.select=n.filter,n.selectSeries=n.filterSeries;var p=function(n,t,e,r){var i=[];t=o(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){e(n.value,function(e){e||i.push(n),t()})},function(){r(o(i.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};n.reject=c(p),n.rejectSeries=s(p);var g=function(n,t,e,r){n(t,function(n,t){e(n,function(e){e?r(n):t()})},function(){r()})};n.detect=c(g),n.detectSeries=s(g),n.some=function(t,e,r){n.forEach(t,function(n,t){e(n,function(n){n&&(r(!0),r=function(){}),t()})},function(){r(!1)})},n.any=n.some,n.every=function(t,e,r){n.forEach(t,function(n,t){e(n,function(n){n||(r(!1),r=function(){}),t()})},function(){r(!0)})},n.all=n.every,n.sortBy=function(t,e,r){n.map(t,function(n,t){e(n,function(e,r){e?t(e):t(null,{value:n,criteria:r})})},function(n,t){if(n)return r(n);var e=function(n,t){var e=n.criteria,r=t.criteria;return r>e?-1:e>r?1:0};r(null,o(t.sort(e),function(n){return n.value}))})},n.auto=function(n,t){t=t||function(){};var e=u(n);if(!e.length)return t(null);var o=[],c=[],s=function(n){c.unshift(n)},f=function(n){for(var t=0;t<c.length;t+=1)if(c[t]===n)return void c.splice(t,1)},l=function(){r(c,function(n){n()})};s(function(){o.length===e.length&&t(null)}),r(e,function(e){var r=n[e]instanceof Function?[n[e]]:n[e],u=function(n){n?(t(n),t=function(){}):(o.push(e),l())},c=r.slice(0,Math.abs(r.length-1))||[],p=function(){return i(c,function(n,t){return n&&-1!==a(o,t)},!0)};if(p())r[r.length-1](u);else{var g=function(){p()&&(f(g),r[r.length-1](u))};s(g)}})},n.waterfall=function(t,e){if(!t.length)return e();e=e||function(){};var r=function(t){return function(o){if(o)e(o),e=function(){};else{var i=Array.prototype.slice.call(arguments,1),u=t.next();i.push(u?r(u):e),n.nextTick(function(){t.apply(null,i)})}}};r(n.iterator(t))()},n.parallel=function(t,e){if(e=e||function(){},t.constructor===Array)n.map(t,function(n,t){n&&n(function(n){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),t.call(null,n,e||null)})},e);else{var r={};n.forEach(u(t),function(n,e){t[n](function(t){var o=Array.prototype.slice.call(arguments,1);o.length<=1&&(o=o[0]),r[n]=o,e(t)})},function(n){e(n,r)})}},n.series=function(t,e){if(e=e||function(){},t.constructor===Array)n.mapSeries(t,function(n,t){n&&n(function(n){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),t.call(null,n,e||null)})},e);else{var r={};n.forEachSeries(u(t),function(n,e){t[n](function(t){var o=Array.prototype.slice.call(arguments,1);o.length<=1&&(o=o[0]),r[n]=o,e(t)})},function(n){e(n,r)})}},n.iterator=function(n){var t=function(e){var r=function(){return n.length&&n[e].apply(null,arguments),r.next()};return r.next=function(){return e<n.length-1?t(e+1):null},r};return t(0)},n.apply=function(n){var t=Array.prototype.slice.call(arguments,1);return function(){return n.apply(null,t.concat(Array.prototype.slice.call(arguments)))}};var h=function(n,t,e,r){var o=[];n(t,function(n,t){e(n,function(n,e){o=o.concat(e||[]),t(n)})},function(n){r(n,o)})};n.concat=c(h),n.concatSeries=s(h),n.whilst=function(t,e,r){t()?e(function(o){return o?r(o):void n.whilst(t,e,r)}):r()},n.until=function(t,e,r){t()?r():e(function(o){return o?r(o):void n.until(t,e,r)})},n.queue=function(t,e){var r=0,o=[],i={concurrency:e,push:function(t,e){o.push({data:t,callback:e}),n.nextTick(i.process)},process:function(){if(r<i.concurrency&&o.length){var n=o.splice(0,1)[0];r+=1,t(n.data,function(){r-=1,n.callback&&n.callback.apply(n,arguments),i.process()})}},length:function(){return o.length}};return i};var d=function(n){return function(t){var e=Array.prototype.slice.call(arguments,1);t.apply(null,e.concat([function(t){var e=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(t?console.error&&console.error(t):console[n]&&r(e,function(t){console[n](t)}))}]))}};n.log=d("log"),n.dir=d("dir")}(),function(n){function t(n,t,e,r,o){throw new s.AssertionError({message:e,actual:n,expected:t,operator:r,stackStartFunction:o})}function e(n,t){return n===t?!0:n instanceof Date&&t instanceof Date?n.getTime()===t.getTime():"object"!=typeof n&&"object"!=typeof t?n==t:i(n,t)}function r(n){return null===n||void 0===n}function o(n){return"[object Arguments]"==Object.prototype.toString.call(n)}function i(n,t){if(r(n)||r(t))return!1;if(n.prototype!==t.prototype)return!1;if(o(n))return o(t)?(n=c.call(n),t=c.call(t),e(n,t)):!1;try{var i,u,s=a(n),f=a(t)}catch(l){return!1}if(s.length!=f.length)return!1;for(s.sort(),f.sort(),u=s.length-1;u>=0;u--)if(s[u]!=f[u])return!1;for(u=s.length-1;u>=0;u--)if(i=s[u],!e(n[i],t[i]))return!1;return!0}function u(n,e,r,o){var i=null,u=!1,a=!0;o=o||"",3==arguments.length?"string"==typeof r&&(o=r,a=!1):2==arguments.length&&(a=!1);try{e()}catch(c){u=!0,i=c}if(n&&!u&&t("Missing expected exception"+(r&&r.name?" ("+r.name+").":".")+(o?" "+o:"")),!n&&u&&a&&i instanceof r&&t("Got unwanted exception"+(r&&r.name?" ("+r.name+").":".")+(o?" "+o:"")),n&&u&&a&&!(i instanceof r)||!n&&u)throw i}var a=function(n){if(Object.keys)return Object.keys(n);var t=[];for(var e in n)n.hasOwnProperty(e)&&t.push(e);return t},c=Array.prototype.slice,s=n;s.AssertionError=function(n){this.name="AssertionError",this.message=n.message,this.actual=n.actual,this.expected=n.expected,this.operator=n.operator;var e=n.stackStartFunction||t;Error.captureStackTrace&&Error.captureStackTrace(this,e)},s.AssertionError.super_=Error;var f=function(){this.constructor=s.AssertionError};f.prototype=Error.prototype,s.AssertionError.prototype=new f,s.AssertionError.prototype.toString=function(){return this.message?[this.name+":",this.message].join(" "):[this.name+":",JSON.stringify(this.expected),this.operator,JSON.stringify(this.actual)].join(" ")},s.AssertionError.__proto__=Error.prototype,s.fail=t,s.ok=function(n,e){n||t(n,!0,e,"==",s.ok)},s.equal=function(n,e,r){n!=e&&t(n,e,r,"==",s.equal)},s.notEqual=function(n,e,r){n==e&&t(n,e,r,"!=",s.notEqual)},s.deepEqual=function(n,r,o){e(n,r)||t(n,r,o,"deepEqual",s.deepEqual)},s.notDeepEqual=function(n,r,o){e(n,r)&&t(n,r,o,"notDeepEqual",s.notDeepEqual)},s.strictEqual=function(n,e,r){n!==e&&t(n,e,r,"===",s.strictEqual)},s.notStrictEqual=function(n,e,r){n===e&&t(n,e,r,"!==",s.notStrictEqual)},s.throws=function(){u.apply(this,[!0].concat(c.call(arguments)))},s.doesNotThrow=function(){u.apply(this,[!1].concat(c.call(arguments)))},s.ifError=function(n){if(n)throw n}}(assert),function(n){n.assertion=function(n){return{method:n.method||"",message:n.message||n.error&&n.error.message||"",error:n.error,passed:function(){return!this.error},failed:function(){return Boolean(this.error)}}},n.assertionList=function(n,t){var e=n||[];return e.failures=function(){for(var n=0,t=0;t<this.length;t++)this[t].failed()&&n++;return n},e.passes=function(){return e.length-e.failures()},e.duration=t||0,e};var t=function(t){return function(e,r,o){return function(){var i=arguments[o-1],u=n.assertion({method:e,message:i});try{assert[r].apply(null,arguments)}catch(a){u.error=a}t(u)}}};n.test=function(e,r,o,i){var u,a=[],c=t(function(n){a.push(n),o.log&&async.nextTick(function(){o.log(n)})}),s={done:function(t){if(void 0!==u&&u!==a.length){var c=new Error("Expected "+u+" assertions, "+a.length+" ran"),s=n.assertion({method:"expect",error:c});a.push(s),o.log&&async.nextTick(function(){o.log(s)})}if(t){var f=n.assertion({error:t});a.push(f),o.log&&async.nextTick(function(){o.log(f)})}var l=(new Date).getTime();async.nextTick(function(){var t=n.assertionList(a,l-r);o.testDone(e,t),i(null,a)})},ok:c("ok","ok",2),same:c("same","deepEqual",3),equals:c("equals","equal",3),expect:function(n){u=n},_assertion_list:a};for(var f in assert)assert.hasOwnProperty(f)&&(s[f]=c(f,f,assert[f].length));return s},n.options=function(n){var t=function(t){n[t]=n[t]||function(){}};return t("moduleStart"),t("moduleDone"),t("testStart"),t("testDone"),n}}(types),function(n){var t=function(n){if(Object.keys)return Object.keys(n);var t=[];for(var e in n)n.hasOwnProperty(e)&&t.push(e);return t};n.runTest=function(n,t,e,r){var o=types.options(e);o.testStart(n);var i=(new Date).getTime(),u=types.test(n,i,o,r);try{t(u)}catch(a){u.done(a)}},n.runSuite=function(e,r,o,i){var u=t(r);async.concatSeries(u,function(t,i){var u,a=r[t];u=e?[].concat(e,t):[t],u.toString=function(){return this.join(" - ")},"function"==typeof a?n.runTest(u,r[t],o,i):n.runSuite(u,r[t],o,i)},i)},n.runModule=function(t,e,r,o){var i=types.options(r);i.moduleStart(t);var u=(new Date).getTime();n.runSuite(null,e,r,function(n,e){var r=(new Date).getTime(),a=types.assertionList(e,r-u);i.moduleDone(t,a),o(null,e)})},n.runModules=function(e,r){var o=types.options(r),i=(new Date).getTime();async.concatSeries(t(e),function(t,r){n.runModule(t,e[t],o,r)},function(n,t){var e=(new Date).getTime();o.done(types.assertionList(t,e-i))})};var e=function(n,t,e){return function(r){var o={};if(t){var i=r.done;r.done=function(n){try{t.call(o,function(t){return n&&t?(r._assertion_list.push(types.assertion({error:n})),i(t)):void i(n||t)})}catch(e){i(e)}}}n?n.call(o,function(n){return n?r.done(n):void e.call(o,r)}):e.call(o,r)}},r=function(n,o,i){for(var u={},a=t(i),c=0;c<a.length;c++){var s=a[c];"function"==typeof i[s]?u[s]=e(n,o,i[s]):"object"==typeof i[s]&&(u[s]=r(n,o,i[s]))}return u};n.testCase=function(n){var t=n.setUp,e=n.tearDown;return delete n.setUp,delete n.tearDown,r(t,e,n)}}(core),function(n){n.info="Browser-based test reporter",n.run=function(n){function t(n,t){"innerText"in n?n.innerText=t:"textContent"in n&&(n.textContent=t)}function e(n,t){var e=document.getElementById(t);return e||(e=document.createElement(n),e.id=t,document.body.appendChild(e)),e}var r=(new Date).getTime(),o=(e("h1","nodeunit-header"),e("h2","nodeunit-banner")),i=e("h2","nodeunit-userAgent"),u=e("ol","nodeunit-tests"),a=e("p","nodeunit-testresult");t(i,navigator.userAgent),nodeunit.runModules(n,{moduleStart:function(){},testDone:function(n,t){var e=document.createElement("li"),r=document.createElement("strong");r.innerHTML=n+' <b style="color: black;">(<b class="fail">'+t.failures()+'</b>, <b class="pass">'+t.passes()+"</b>, "+t.length+")</b>",e.className=t.failures()?"fail":"pass",e.appendChild(r);var o=document.createElement("ol");o.style.display="none",e.onclick=function(){var n=o.style.display;o.style.display="none"==n?"block":"none"};for(var i=0;i<t.length;i++){var a=document.createElement("li"),c=t[i];c.failed()?(a.innerHTML=(c.message||c.method||"no message")+"<pre>"+(c.error.stack||c.error)+"</pre>",a.className="fail"):(a.innerHTML=c.message||c.method||"no message",a.className="pass"),o.appendChild(a)}e.appendChild(o),u.appendChild(e)},done:function(n){var t=(new Date).getTime(),e=t-r,i=n.failures();o.className=i?"fail":"pass",a.innerHTML="Tests completed in "+e+' milliseconds.<br/><span class="passed">'+n.passes()+'</span> assertions of <span class="all">'+n.length+"<span> passed, "+n.failures()+" failed."}})}}(reporter),nodeunit=core,nodeunit.assert=assert,nodeunit.reporter=reporter,nodeunit.run=reporter.run,nodeunit}();