// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Slim Highlighting for CodeMirror copyright (c) HicknHack Software Gmbh

!function(mod){"object"==typeof exports&&"object"==typeof module?mod(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../ruby/ruby")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed","../ruby/ruby"],mod):mod(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("slim",function(config){function backup(pos,tokenize,style){var restore=function(stream,state){return state.tokenize=tokenize,stream.pos<pos?(stream.pos=pos,style):state.tokenize(stream,state)};return function(stream,state){return state.tokenize=restore,tokenize(stream,state)}}function maybeBackup(stream,state,pat,offset,style){var cur=stream.current(),idx=cur.search(pat);return idx>-1&&(state.tokenize=backup(stream.pos,state.tokenize,style),stream.backUp(cur.length-idx-offset)),style}function continueLine(state,column){state.stack={parent:state.stack,style:"continuation",indented:column,tokenize:state.line},state.line=state.tokenize}function finishContinue(state){state.line==state.tokenize&&(state.line=state.stack.tokenize,state.stack=state.stack.parent)}function lineContinuable(column,tokenize){return function(stream,state){if(finishContinue(state),stream.match(/^\\$/))return continueLine(state,column),"lineContinuation";var style=tokenize(stream,state);return stream.eol()&&stream.current().match(/(?:^|[^\\])(?:\\\\)*\\$/)&&stream.backUp(1),style}}function commaContinuable(column,tokenize){return function(stream,state){finishContinue(state);var style=tokenize(stream,state);return stream.eol()&&stream.current().match(/,$/)&&continueLine(state,column),style}}function rubyInQuote(endQuote,tokenize){return function(stream,state){var ch=stream.peek();return ch==endQuote&&1==state.rubyState.tokenize.length?(stream.next(),state.tokenize=tokenize,"closeAttributeTag"):ruby(stream,state)}}function startRubySplat(tokenize){var rubyState,runSplat=function(stream,state){if(1==state.rubyState.tokenize.length&&!state.rubyState.context.prev){if(stream.backUp(1),stream.eatSpace())return state.rubyState=rubyState,state.tokenize=tokenize,tokenize(stream,state);stream.next()}return ruby(stream,state)};return function(stream,state){return rubyState=state.rubyState,state.rubyState=rubyMode.startState(),state.tokenize=runSplat,ruby(stream,state)}}function ruby(stream,state){return rubyMode.token(stream,state.rubyState)}function htmlLine(stream,state){return stream.match(/^\\$/)?"lineContinuation":html(stream,state)}function html(stream,state){return stream.match(/^#\{/)?(state.tokenize=rubyInQuote("}",state.tokenize),null):maybeBackup(stream,state,/[^\\]#\{/,1,htmlMode.token(stream,state.htmlState))}function startHtmlLine(lastTokenize){return function(stream,state){var style=htmlLine(stream,state);return stream.eol()&&(state.tokenize=lastTokenize),style}}function startHtmlMode(stream,state,offset){return state.stack={parent:state.stack,style:"html",indented:stream.column()+offset,tokenize:state.line},state.line=state.tokenize=html,null}function comment(stream,state){return stream.skipToEnd(),state.stack.style}function commentMode(stream,state){return state.stack={parent:state.stack,style:"comment",indented:state.indented+1,tokenize:state.line},state.line=comment,comment(stream,state)}function attributeWrapper(stream,state){return stream.eat(state.stack.endQuote)?(state.line=state.stack.line,state.tokenize=state.stack.tokenize,state.stack=state.stack.parent,null):stream.match(wrappedAttributeNameRegexp)?(state.tokenize=attributeWrapperAssign,"slimAttribute"):(stream.next(),null)}function attributeWrapperAssign(stream,state){return stream.match(/^==?/)?(state.tokenize=attributeWrapperValue,null):attributeWrapper(stream,state)}function attributeWrapperValue(stream,state){var ch=stream.peek();return'"'==ch||"'"==ch?(state.tokenize=readQuoted(ch,"string",!0,!1,attributeWrapper),stream.next(),state.tokenize(stream,state)):"["==ch?startRubySplat(attributeWrapper)(stream,state):stream.match(/^(true|false|nil)\b/)?(state.tokenize=attributeWrapper,"keyword"):startRubySplat(attributeWrapper)(stream,state)}function startAttributeWrapperMode(state,endQuote,tokenize){return state.stack={parent:state.stack,style:"wrapper",indented:state.indented+1,tokenize:tokenize,line:state.line,endQuote:endQuote},state.line=state.tokenize=attributeWrapper,null}function sub(stream,state){if(stream.match(/^#\{/))return state.tokenize=rubyInQuote("}",state.tokenize),null;var subStream=new CodeMirror.StringStream(stream.string.slice(state.stack.indented),stream.tabSize);subStream.pos=stream.pos-state.stack.indented,subStream.start=stream.start-state.stack.indented,subStream.lastColumnPos=stream.lastColumnPos-state.stack.indented,subStream.lastColumnValue=stream.lastColumnValue-state.stack.indented;var style=state.subMode.token(subStream,state.subState);return stream.pos=subStream.pos+state.stack.indented,style}function firstSub(stream,state){return state.stack.indented=stream.column(),state.line=state.tokenize=sub,state.tokenize(stream,state)}function createMode(mode){var query=embedded[mode],spec=CodeMirror.mimeModes[query];if(spec)return CodeMirror.getMode(config,spec);var factory=CodeMirror.modes[query];return factory?factory(config,{name:query}):CodeMirror.getMode(config,"null")}function getMode(mode){return modes.hasOwnProperty(mode)?modes[mode]:modes[mode]=createMode(mode)}function startSubMode(mode,state){var subMode=getMode(mode),subState=subMode.startState&&subMode.startState();return state.subMode=subMode,state.subState=subState,state.stack={parent:state.stack,style:"sub",indented:state.indented+1,tokenize:state.line},state.line=state.tokenize=firstSub,"slimSubmode"}function doctypeLine(stream){return stream.skipToEnd(),"slimDoctype"}function startLine(stream,state){var ch=stream.peek();if("<"==ch)return(state.tokenize=startHtmlLine(state.tokenize))(stream,state);if(stream.match(/^[|']/))return startHtmlMode(stream,state,1);if(stream.match(/^\/(!|\[\w+])?/))return commentMode(stream,state);if(stream.match(/^(-|==?[<>]?)/))return state.tokenize=lineContinuable(stream.column(),commaContinuable(stream.column(),ruby)),"slimSwitch";if(stream.match(/^doctype\b/))return state.tokenize=doctypeLine,"keyword";var m=stream.match(embeddedRegexp);return m?startSubMode(m[1],state):slimTag(stream,state)}function slim(stream,state){return state.startOfLine?startLine(stream,state):slimTag(stream,state)}function slimTag(stream,state){return stream.eat("*")?(state.tokenize=startRubySplat(slimTagExtras),null):stream.match(nameRegexp)?(state.tokenize=slimTagExtras,"slimTag"):slimClass(stream,state)}function slimTagExtras(stream,state){return stream.match(/^(<>?|><?)/)?(state.tokenize=slimClass,null):slimClass(stream,state)}function slimClass(stream,state){return stream.match(classIdRegexp)?(state.tokenize=slimClass,"slimId"):stream.match(classNameRegexp)?(state.tokenize=slimClass,"slimClass"):slimAttribute(stream,state)}function slimAttribute(stream,state){return stream.match(/^([\[\{\(])/)?startAttributeWrapperMode(state,closing[RegExp.$1],slimAttribute):stream.match(attributeNameRegexp)?(state.tokenize=slimAttributeAssign,"slimAttribute"):"*"==stream.peek()?(stream.next(),state.tokenize=startRubySplat(slimContent),null):slimContent(stream,state)}function slimAttributeAssign(stream,state){return stream.match(/^==?/)?(state.tokenize=slimAttributeValue,null):slimAttribute(stream,state)}function slimAttributeValue(stream,state){var ch=stream.peek();return'"'==ch||"'"==ch?(state.tokenize=readQuoted(ch,"string",!0,!1,slimAttribute),stream.next(),state.tokenize(stream,state)):"["==ch?startRubySplat(slimAttribute)(stream,state):":"==ch?startRubySplat(slimAttributeSymbols)(stream,state):stream.match(/^(true|false|nil)\b/)?(state.tokenize=slimAttribute,"keyword"):startRubySplat(slimAttribute)(stream,state)}function slimAttributeSymbols(stream,state){return stream.backUp(1),stream.match(/^[^\s],(?=:)/)?(state.tokenize=startRubySplat(slimAttributeSymbols),null):(stream.next(),slimAttribute(stream,state))}function readQuoted(quote,style,embed,unescaped,nextTokenize){return function(stream,state){finishContinue(state);var fresh=0==stream.current().length;if(stream.match(/^\\$/,fresh))return fresh?(continueLine(state,state.indented),"lineContinuation"):style;if(stream.match(/^#\{/,fresh))return fresh?(state.tokenize=rubyInQuote("}",state.tokenize),null):style;for(var ch,escaped=!1;null!=(ch=stream.next());){if(ch==quote&&(unescaped||!escaped)){state.tokenize=nextTokenize;break}if(embed&&"#"==ch&&!escaped&&stream.eat("{")){stream.backUp(2);break}escaped=!escaped&&"\\"==ch}return stream.eol()&&escaped&&stream.backUp(1),style}}function slimContent(stream,state){return stream.match(/^==?/)?(state.tokenize=ruby,"slimSwitch"):stream.match(/^\/$/)?(state.tokenize=slim,null):stream.match(/^:/)?(state.tokenize=slimTag,"slimSwitch"):(startHtmlMode(stream,state,0),state.tokenize(stream,state))}var htmlMode=CodeMirror.getMode(config,{name:"htmlmixed"}),rubyMode=CodeMirror.getMode(config,"ruby"),modes={html:htmlMode,ruby:rubyMode},embedded={ruby:"ruby",javascript:"javascript",css:"text/css",sass:"text/x-sass",scss:"text/x-scss",less:"text/x-less",styl:"text/x-styl",coffee:"coffeescript",asciidoc:"text/x-asciidoc",markdown:"text/x-markdown",textile:"text/x-textile",creole:"text/x-creole",wiki:"text/x-wiki",mediawiki:"text/x-mediawiki",rdoc:"text/x-rdoc",builder:"text/x-builder",nokogiri:"text/x-nokogiri",erb:"application/x-erb"},embeddedRegexp=function(map){var arr=[];for(var key in map)arr.push(key);return new RegExp("^("+arr.join("|")+"):")}(embedded),styleMap={commentLine:"comment",slimSwitch:"operator special",slimTag:"tag",slimId:"attribute def",slimClass:"attribute qualifier",slimAttribute:"attribute",slimSubmode:"keyword special",closeAttributeTag:null,slimDoctype:null,lineContinuation:null},closing={"{":"}","[":"]","(":")"},nameStartChar="_a-zA-ZÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�",nameChar=nameStartChar+"\\-0-9·̀-ͯ‿-⁀",nameRegexp=new RegExp("^[:"+nameStartChar+"](?::["+nameChar+"]|["+nameChar+"]*)"),attributeNameRegexp=new RegExp("^[:"+nameStartChar+"][:\\."+nameChar+"]*(?=\\s*=)"),wrappedAttributeNameRegexp=new RegExp("^[:"+nameStartChar+"][:\\."+nameChar+"]*"),classNameRegexp=/^\.-?[_a-zA-Z]+[\w\-]*/,classIdRegexp=/^#[_a-zA-Z]+[\w\-]*/,mode={startState:function(){var htmlState=htmlMode.startState(),rubyState=rubyMode.startState();return{htmlState:htmlState,rubyState:rubyState,stack:null,last:null,tokenize:slim,line:slim,indented:0}},copyState:function(state){return{htmlState:CodeMirror.copyState(htmlMode,state.htmlState),rubyState:CodeMirror.copyState(rubyMode,state.rubyState),subMode:state.subMode,subState:state.subMode&&CodeMirror.copyState(state.subMode,state.subState),stack:state.stack,last:state.last,tokenize:state.tokenize,line:state.line}},token:function(stream,state){if(stream.sol())for(state.indented=stream.indentation(),state.startOfLine=!0,state.tokenize=state.line;state.stack&&state.stack.indented>state.indented&&"slimSubmode"!=state.last;)state.line=state.tokenize=state.stack.tokenize,state.stack=state.stack.parent,state.subMode=null,state.subState=null;if(stream.eatSpace())return null;var style=state.tokenize(stream,state);return state.startOfLine=!1,style&&(state.last=style),styleMap.hasOwnProperty(style)?styleMap[style]:style},blankLine:function(state){return state.subMode&&state.subMode.blankLine?state.subMode.blankLine(state.subState):void 0},innerMode:function(state){return state.subMode?{state:state.subState,mode:state.subMode}:{state:state,mode:mode}}};return mode},"htmlmixed","ruby"),CodeMirror.defineMIME("text/x-slim","slim"),CodeMirror.defineMIME("application/x-slim","slim")});