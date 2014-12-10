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

nodeunit=function(){this.JSON||(this.JSON={}),function(){"use strict";function f(n){return 10>n?"0"+n:n}function quote(string){return escapable.lastIndex=0,escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return"string"==typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,partial,mind=gap,value=holder[key];switch(value&&"object"==typeof value&&"function"==typeof value.toJSON&&(value=value.toJSON(key)),"function"==typeof rep&&(value=rep.call(holder,key,value)),typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value)return"null";if(gap+=indent,partial=[],"[object Array]"===Object.prototype.toString.apply(value)){for(length=value.length,i=0;length>i;i+=1)partial[i]=str(i,value)||"null";return v=0===partial.length?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]",gap=mind,v}if(rep&&"object"==typeof rep)for(length=rep.length,i=0;length>i;i+=1)k=rep[i],"string"==typeof k&&(v=str(k,value),v&&partial.push(quote(k)+(gap?": ":":")+v));else for(k in value)Object.hasOwnProperty.call(value,k)&&(v=str(k,value),v&&partial.push(quote(k)+(gap?": ":":")+v));return v=0===partial.length?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}",gap=mind,v}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(value,replacer,space){var i;if(gap="",indent="","number"==typeof space)for(i=0;space>i;i+=1)indent+=" ";else"string"==typeof space&&(indent=space);if(rep=replacer,replacer&&"function"!=typeof replacer&&("object"!=typeof replacer||"number"!=typeof replacer.length))throw new Error("JSON.stringify");return str("",{"":value})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(holder,key){var k,v,value=holder[key];if(value&&"object"==typeof value)for(k in value)Object.hasOwnProperty.call(value,k)&&(v=walk(value,k),void 0!==v?value[k]=v:delete value[k]);return reviver.call(holder,key,value)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();var assert=this.assert={},types={},core={},nodeunit={},reporter={};return function(){var async={},root=this,previous_async=root.async;"undefined"!=typeof module&&module.exports?module.exports=async:root.async=async,async.noConflict=function(){return root.async=previous_async,async};var _forEach=function(arr,iterator){if(arr.forEach)return arr.forEach(iterator);for(var i=0;i<arr.length;i+=1)iterator(arr[i],i,arr)},_map=function(arr,iterator){if(arr.map)return arr.map(iterator);var results=[];return _forEach(arr,function(x,i,a){results.push(iterator(x,i,a))}),results},_reduce=function(arr,iterator,memo){return arr.reduce?arr.reduce(iterator,memo):(_forEach(arr,function(x,i,a){memo=iterator(memo,x,i,a)}),memo)},_keys=function(obj){if(Object.keys)return Object.keys(obj);var keys=[];for(var k in obj)obj.hasOwnProperty(k)&&keys.push(k);return keys},_indexOf=function(arr,item){if(arr.indexOf)return arr.indexOf(item);for(var i=0;i<arr.length;i+=1)if(arr[i]===item)return i;return-1};async.nextTick=function(fn){"undefined"!=typeof process&&process.nextTick?process.nextTick(fn):setTimeout(fn,0)},async.forEach=function(arr,iterator,callback){if(!arr.length)return callback();var completed=0;_forEach(arr,function(x){iterator(x,function(err){err?(callback(err),callback=function(){}):(completed+=1,completed===arr.length&&callback())})})},async.forEachSeries=function(arr,iterator,callback){if(!arr.length)return callback();var completed=0,iterate=function(){iterator(arr[completed],function(err){err?(callback(err),callback=function(){}):(completed+=1,completed===arr.length?callback():iterate())})};iterate()};var doParallel=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.forEach].concat(args))}},doSeries=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.forEachSeries].concat(args))}},_asyncMap=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}}),eachfn(arr,function(x,callback){iterator(x.value,function(err,v){results[x.index]=v,callback(err)})},function(err){callback(err,results)})};async.map=doParallel(_asyncMap),async.mapSeries=doSeries(_asyncMap),async.reduce=function(arr,memo,iterator,callback){async.forEachSeries(arr,function(x,callback){iterator(memo,x,function(err,v){memo=v,callback(err)})},function(err){callback(err,memo)})},async.inject=async.reduce,async.foldl=async.reduce,async.reduceRight=function(arr,memo,iterator,callback){var reversed=_map(arr,function(x){return x}).reverse();async.reduce(reversed,memo,iterator,callback)},async.foldr=async.reduceRight;var _filter=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}}),eachfn(arr,function(x,callback){iterator(x.value,function(v){v&&results.push(x),callback()})},function(){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.filter=doParallel(_filter),async.filterSeries=doSeries(_filter),async.select=async.filter,async.selectSeries=async.filterSeries;var _reject=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}}),eachfn(arr,function(x,callback){iterator(x.value,function(v){v||results.push(x),callback()})},function(){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.reject=doParallel(_reject),async.rejectSeries=doSeries(_reject);var _detect=function(eachfn,arr,iterator,main_callback){eachfn(arr,function(x,callback){iterator(x,function(result){result?main_callback(x):callback()})},function(){main_callback()})};async.detect=doParallel(_detect),async.detectSeries=doSeries(_detect),async.some=function(arr,iterator,main_callback){async.forEach(arr,function(x,callback){iterator(x,function(v){v&&(main_callback(!0),main_callback=function(){}),callback()})},function(){main_callback(!1)})},async.any=async.some,async.every=function(arr,iterator,main_callback){async.forEach(arr,function(x,callback){iterator(x,function(v){v||(main_callback(!1),main_callback=function(){}),callback()})},function(){main_callback(!0)})},async.all=async.every,async.sortBy=function(arr,iterator,callback){async.map(arr,function(x,callback){iterator(x,function(err,criteria){err?callback(err):callback(null,{value:x,criteria:criteria})})},function(err,results){if(err)return callback(err);var fn=function(left,right){var a=left.criteria,b=right.criteria;return b>a?-1:a>b?1:0};callback(null,_map(results.sort(fn),function(x){return x.value}))})},async.auto=function(tasks,callback){callback=callback||function(){};var keys=_keys(tasks);if(!keys.length)return callback(null);var completed=[],listeners=[],addListener=function(fn){listeners.unshift(fn)},removeListener=function(fn){for(var i=0;i<listeners.length;i+=1)if(listeners[i]===fn)return void listeners.splice(i,1)},taskComplete=function(){_forEach(listeners,function(fn){fn()})};addListener(function(){completed.length===keys.length&&callback(null)}),_forEach(keys,function(k){var task=tasks[k]instanceof Function?[tasks[k]]:tasks[k],taskCallback=function(err){err?(callback(err),callback=function(){}):(completed.push(k),taskComplete())},requires=task.slice(0,Math.abs(task.length-1))||[],ready=function(){return _reduce(requires,function(a,x){return a&&-1!==_indexOf(completed,x)},!0)};if(ready())task[task.length-1](taskCallback);else{var listener=function(){ready()&&(removeListener(listener),task[task.length-1](taskCallback))};addListener(listener)}})},async.waterfall=function(tasks,callback){if(!tasks.length)return callback();callback=callback||function(){};var wrapIterator=function(iterator){return function(err){if(err)callback(err),callback=function(){};else{var args=Array.prototype.slice.call(arguments,1),next=iterator.next();args.push(next?wrapIterator(next):callback),async.nextTick(function(){iterator.apply(null,args)})}}};wrapIterator(async.iterator(tasks))()},async.parallel=function(tasks,callback){if(callback=callback||function(){},tasks.constructor===Array)async.map(tasks,function(fn,callback){fn&&fn(function(err){var args=Array.prototype.slice.call(arguments,1);args.length<=1&&(args=args[0]),callback.call(null,err,args||null)})},callback);else{var results={};async.forEach(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);args.length<=1&&(args=args[0]),results[k]=args,callback(err)})},function(err){callback(err,results)})}},async.series=function(tasks,callback){if(callback=callback||function(){},tasks.constructor===Array)async.mapSeries(tasks,function(fn,callback){fn&&fn(function(err){var args=Array.prototype.slice.call(arguments,1);args.length<=1&&(args=args[0]),callback.call(null,err,args||null)})},callback);else{var results={};async.forEachSeries(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);args.length<=1&&(args=args[0]),results[k]=args,callback(err)})},function(err){callback(err,results)})}},async.iterator=function(tasks){var makeCallback=function(index){var fn=function(){return tasks.length&&tasks[index].apply(null,arguments),fn.next()};return fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null},fn};return makeCallback(0)},async.apply=function(fn){var args=Array.prototype.slice.call(arguments,1);return function(){return fn.apply(null,args.concat(Array.prototype.slice.call(arguments)))}};var _concat=function(eachfn,arr,fn,callback){var r=[];eachfn(arr,function(x,cb){fn(x,function(err,y){r=r.concat(y||[]),cb(err)})},function(err){callback(err,r)})};async.concat=doParallel(_concat),async.concatSeries=doSeries(_concat),async.whilst=function(test,iterator,callback){test()?iterator(function(err){return err?callback(err):void async.whilst(test,iterator,callback)}):callback()},async.until=function(test,iterator,callback){test()?callback():iterator(function(err){return err?callback(err):void async.until(test,iterator,callback)})},async.queue=function(worker,concurrency){var workers=0,tasks=[],q={concurrency:concurrency,push:function(data,callback){tasks.push({data:data,callback:callback}),async.nextTick(q.process)},process:function(){if(workers<q.concurrency&&tasks.length){var task=tasks.splice(0,1)[0];workers+=1,worker(task.data,function(){workers-=1,task.callback&&task.callback.apply(task,arguments),q.process()})}},length:function(){return tasks.length}};return q};var _console_fn=function(name){return function(fn){var args=Array.prototype.slice.call(arguments,1);fn.apply(null,args.concat([function(err){var args=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(err?console.error&&console.error(err):console[name]&&_forEach(args,function(x){console[name](x)}))}]))}};async.log=_console_fn("log"),async.dir=_console_fn("dir")}(),function(exports){function fail(actual,expected,message,operator,stackStartFunction){throw new assert.AssertionError({message:message,actual:actual,expected:expected,operator:operator,stackStartFunction:stackStartFunction})}function _deepEqual(actual,expected){return actual===expected?!0:actual instanceof Date&&expected instanceof Date?actual.getTime()===expected.getTime():"object"!=typeof actual&&"object"!=typeof expected?actual==expected:objEquiv(actual,expected)}function isUndefinedOrNull(value){return null===value||void 0===value}function isArguments(object){return"[object Arguments]"==Object.prototype.toString.call(object)}function objEquiv(a,b){if(isUndefinedOrNull(a)||isUndefinedOrNull(b))return!1;if(a.prototype!==b.prototype)return!1;if(isArguments(a))return isArguments(b)?(a=pSlice.call(a),b=pSlice.call(b),_deepEqual(a,b)):!1;try{var key,i,ka=_keys(a),kb=_keys(b)}catch(e){return!1}if(ka.length!=kb.length)return!1;for(ka.sort(),kb.sort(),i=ka.length-1;i>=0;i--)if(ka[i]!=kb[i])return!1;for(i=ka.length-1;i>=0;i--)if(key=ka[i],!_deepEqual(a[key],b[key]))return!1;return!0}function _throws(shouldThrow,block,err,message){var exception=null,threw=!1,typematters=!0;message=message||"",3==arguments.length?"string"==typeof err&&(message=err,typematters=!1):2==arguments.length&&(typematters=!1);try{block()}catch(e){threw=!0,exception=e}if(shouldThrow&&!threw&&fail("Missing expected exception"+(err&&err.name?" ("+err.name+").":".")+(message?" "+message:"")),!shouldThrow&&threw&&typematters&&exception instanceof err&&fail("Got unwanted exception"+(err&&err.name?" ("+err.name+").":".")+(message?" "+message:"")),shouldThrow&&threw&&typematters&&!(exception instanceof err)||!shouldThrow&&threw)throw exception}var _keys=function(obj){if(Object.keys)return Object.keys(obj);var keys=[];for(var k in obj)obj.hasOwnProperty(k)&&keys.push(k);return keys},pSlice=Array.prototype.slice,assert=exports;assert.AssertionError=function(options){this.name="AssertionError",this.message=options.message,this.actual=options.actual,this.expected=options.expected,this.operator=options.operator;var stackStartFunction=options.stackStartFunction||fail;Error.captureStackTrace&&Error.captureStackTrace(this,stackStartFunction)},assert.AssertionError.super_=Error;var ctor=function(){this.constructor=assert.AssertionError};ctor.prototype=Error.prototype,assert.AssertionError.prototype=new ctor,assert.AssertionError.prototype.toString=function(){return this.message?[this.name+":",this.message].join(" "):[this.name+":",JSON.stringify(this.expected),this.operator,JSON.stringify(this.actual)].join(" ")},assert.AssertionError.__proto__=Error.prototype,assert.fail=fail,assert.ok=function(value,message){value||fail(value,!0,message,"==",assert.ok)},assert.equal=function(actual,expected,message){actual!=expected&&fail(actual,expected,message,"==",assert.equal)},assert.notEqual=function(actual,expected,message){actual==expected&&fail(actual,expected,message,"!=",assert.notEqual)},assert.deepEqual=function(actual,expected,message){_deepEqual(actual,expected)||fail(actual,expected,message,"deepEqual",assert.deepEqual)},assert.notDeepEqual=function(actual,expected,message){_deepEqual(actual,expected)&&fail(actual,expected,message,"notDeepEqual",assert.notDeepEqual)},assert.strictEqual=function(actual,expected,message){actual!==expected&&fail(actual,expected,message,"===",assert.strictEqual)},assert.notStrictEqual=function(actual,expected,message){actual===expected&&fail(actual,expected,message,"!==",assert.notStrictEqual)},assert.throws=function(){_throws.apply(this,[!0].concat(pSlice.call(arguments)))},assert.doesNotThrow=function(){_throws.apply(this,[!1].concat(pSlice.call(arguments)))},assert.ifError=function(err){if(err)throw err}}(assert),function(exports){exports.assertion=function(obj){return{method:obj.method||"",message:obj.message||obj.error&&obj.error.message||"",error:obj.error,passed:function(){return!this.error},failed:function(){return Boolean(this.error)}}},exports.assertionList=function(arr,duration){var that=arr||[];return that.failures=function(){for(var failures=0,i=0;i<this.length;i++)this[i].failed()&&failures++;return failures},that.passes=function(){return that.length-that.failures()},that.duration=duration||0,that};var assertWrapper=function(callback){return function(new_method,assert_method,arity){return function(){var message=arguments[arity-1],a=exports.assertion({method:new_method,message:message});try{assert[assert_method].apply(null,arguments)}catch(e){a.error=e}callback(a)}}};exports.test=function(name,start,options,callback){var expecting,a_list=[],wrapAssert=assertWrapper(function(a){a_list.push(a),options.log&&async.nextTick(function(){options.log(a)})}),test={done:function(err){if(void 0!==expecting&&expecting!==a_list.length){var e=new Error("Expected "+expecting+" assertions, "+a_list.length+" ran"),a1=exports.assertion({method:"expect",error:e});a_list.push(a1),options.log&&async.nextTick(function(){options.log(a1)})}if(err){var a2=exports.assertion({error:err});a_list.push(a2),options.log&&async.nextTick(function(){options.log(a2)})}var end=(new Date).getTime();async.nextTick(function(){var assertion_list=exports.assertionList(a_list,end-start);options.testDone(name,assertion_list),callback(null,a_list)})},ok:wrapAssert("ok","ok",2),same:wrapAssert("same","deepEqual",3),equals:wrapAssert("equals","equal",3),expect:function(num){expecting=num},_assertion_list:a_list};for(var k in assert)assert.hasOwnProperty(k)&&(test[k]=wrapAssert(k,k,assert[k].length));return test},exports.options=function(opt){var optionalCallback=function(name){opt[name]=opt[name]||function(){}};return optionalCallback("moduleStart"),optionalCallback("moduleDone"),optionalCallback("testStart"),optionalCallback("testDone"),opt}}(types),function(exports){var _keys=function(obj){if(Object.keys)return Object.keys(obj);var keys=[];for(var k in obj)obj.hasOwnProperty(k)&&keys.push(k);return keys};exports.runTest=function(name,fn,opt,callback){var options=types.options(opt);options.testStart(name);var start=(new Date).getTime(),test=types.test(name,start,options,callback);try{fn(test)}catch(e){test.done(e)}},exports.runSuite=function(name,suite,opt,callback){var keys=_keys(suite);async.concatSeries(keys,function(k,cb){var _name,prop=suite[k];_name=name?[].concat(name,k):[k],_name.toString=function(){return this.join(" - ")},"function"==typeof prop?exports.runTest(_name,suite[k],opt,cb):exports.runSuite(_name,suite[k],opt,cb)},callback)},exports.runModule=function(name,mod,opt,callback){var options=types.options(opt);options.moduleStart(name);var start=(new Date).getTime();exports.runSuite(null,mod,opt,function(err,a_list){var end=(new Date).getTime(),assertion_list=types.assertionList(a_list,end-start);options.moduleDone(name,assertion_list),callback(null,a_list)})},exports.runModules=function(modules,opt){var options=types.options(opt),start=(new Date).getTime();async.concatSeries(_keys(modules),function(k,cb){exports.runModule(k,modules[k],options,cb)},function(err,all_assertions){var end=(new Date).getTime();options.done(types.assertionList(all_assertions,end-start))})};var wrapTest=function(setUp,tearDown,fn){return function(test){var context={};if(tearDown){var done=test.done;test.done=function(err){try{tearDown.call(context,function(err2){return err&&err2?(test._assertion_list.push(types.assertion({error:err})),done(err2)):void done(err||err2)})}catch(e){done(e)}}}setUp?setUp.call(context,function(err){return err?test.done(err):void fn.call(context,test)}):fn.call(context,test)}},wrapGroup=function(setUp,tearDown,group){for(var tests={},keys=_keys(group),i=0;i<keys.length;i++){var k=keys[i];"function"==typeof group[k]?tests[k]=wrapTest(setUp,tearDown,group[k]):"object"==typeof group[k]&&(tests[k]=wrapGroup(setUp,tearDown,group[k]))}return tests};exports.testCase=function(suite){var setUp=suite.setUp,tearDown=suite.tearDown;return delete suite.setUp,delete suite.tearDown,wrapGroup(setUp,tearDown,suite)}}(core),function(exports){exports.info="Browser-based test reporter",exports.run=function(modules){function setText(el,txt){"innerText"in el?el.innerText=txt:"textContent"in el&&(el.textContent=txt)}function getOrCreate(tag,id){var el=document.getElementById(id);return el||(el=document.createElement(tag),el.id=id,document.body.appendChild(el)),el}var start=(new Date).getTime(),banner=(getOrCreate("h1","nodeunit-header"),getOrCreate("h2","nodeunit-banner")),userAgent=getOrCreate("h2","nodeunit-userAgent"),tests=getOrCreate("ol","nodeunit-tests"),result=getOrCreate("p","nodeunit-testresult");setText(userAgent,navigator.userAgent),nodeunit.runModules(modules,{moduleStart:function(){},testDone:function(name,assertions){var test=document.createElement("li"),strong=document.createElement("strong");strong.innerHTML=name+' <b style="color: black;">(<b class="fail">'+assertions.failures()+'</b>, <b class="pass">'+assertions.passes()+"</b>, "+assertions.length+")</b>",test.className=assertions.failures()?"fail":"pass",test.appendChild(strong);var aList=document.createElement("ol");aList.style.display="none",test.onclick=function(){var d=aList.style.display;aList.style.display="none"==d?"block":"none"};for(var i=0;i<assertions.length;i++){var li=document.createElement("li"),a=assertions[i];a.failed()?(li.innerHTML=(a.message||a.method||"no message")+"<pre>"+(a.error.stack||a.error)+"</pre>",li.className="fail"):(li.innerHTML=a.message||a.method||"no message",li.className="pass"),aList.appendChild(li)}test.appendChild(aList),tests.appendChild(test)},done:function(assertions){var end=(new Date).getTime(),duration=end-start,failures=assertions.failures();banner.className=failures?"fail":"pass",result.innerHTML="Tests completed in "+duration+' milliseconds.<br/><span class="passed">'+assertions.passes()+'</span> assertions of <span class="all">'+assertions.length+"<span> passed, "+assertions.failures()+" failed."}})}}(reporter),nodeunit=core,nodeunit.assert=assert,nodeunit.reporter=reporter,nodeunit.run=reporter.run,nodeunit}();