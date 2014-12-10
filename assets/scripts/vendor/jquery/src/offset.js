define(["./core","./var/strundefined","./core/access","./css/var/rnumnonpx","./css/curCSS","./css/addGetHookIf","./css/support","./core/init","./css","./selector"],function(jQuery,strundefined,access,rnumnonpx,curCSS,addGetHookIf,support){function getWindow(elem){return jQuery.isWindow(elem)?elem:9===elem.nodeType&&elem.defaultView}var docElem=window.document.documentElement;return jQuery.offset={setOffset:function(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={};"static"===position&&(elem.style.position="relative"),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=("absolute"===position||"fixed"===position)&&(curCSSTop+curCSSLeft).indexOf("auto")>-1,calculatePosition?(curPosition=curElem.position(),curTop=curPosition.top,curLeft=curPosition.left):(curTop=parseFloat(curCSSTop)||0,curLeft=parseFloat(curCSSLeft)||0),jQuery.isFunction(options)&&(options=options.call(elem,i,curOffset)),null!=options.top&&(props.top=options.top-curOffset.top+curTop),null!=options.left&&(props.left=options.left-curOffset.left+curLeft),"using"in options?options.using.call(elem,props):curElem.css(props)}},jQuery.fn.extend({offset:function(options){if(arguments.length)return void 0===options?this:this.each(function(i){jQuery.offset.setOffset(this,options,i)});var docElem,win,elem=this[0],box={top:0,left:0},doc=elem&&elem.ownerDocument;if(doc)return docElem=doc.documentElement,jQuery.contains(docElem,elem)?(typeof elem.getBoundingClientRect!==strundefined&&(box=elem.getBoundingClientRect()),win=getWindow(doc),{top:box.top+win.pageYOffset-docElem.clientTop,left:box.left+win.pageXOffset-docElem.clientLeft}):box},position:function(){if(this[0]){var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0};return"fixed"===jQuery.css(elem,"position")?offset=elem.getBoundingClientRect():(offsetParent=this.offsetParent(),offset=this.offset(),jQuery.nodeName(offsetParent[0],"html")||(parentOffset=offsetParent.offset()),parentOffset.top+=jQuery.css(offsetParent[0],"borderTopWidth",!0),parentOffset.left+=jQuery.css(offsetParent[0],"borderLeftWidth",!0)),{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",!0),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var offsetParent=this.offsetParent||docElem;offsetParent&&!jQuery.nodeName(offsetParent,"html")&&"static"===jQuery.css(offsetParent,"position");)offsetParent=offsetParent.offsetParent;return offsetParent||docElem})}}),jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){var win=getWindow(elem);return void 0===val?win?win[prop]:elem[method]:void(win?win.scrollTo(top?window.pageXOffset:val,top?val:window.pageYOffset):elem[method]=val)},method,val,arguments.length,null)}}),jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){return computed?(computed=curCSS(elem,prop),rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed):void 0})}),jQuery});