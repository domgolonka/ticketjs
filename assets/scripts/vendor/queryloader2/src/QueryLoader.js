function QueryLoader2(element,options){this.element=element,this.$element=$(element),this.options=options,this.foundUrls=[],this.destroyed=!1,this.imageCounter=0,this.imageDone=0,this.alreadyLoaded=!1,this.preloadContainer=new PreloadContainer(this),this.overlayLoader=new OverlayLoader(this),this.defaultOptions={onComplete:function(){},onLoadComplete:function(){},backgroundColor:"#000",barColor:"#fff",overlayId:"qLoverlay",barHeight:1,percentage:!1,deepSearch:!0,completeAnimation:"fade",minimumTime:500},this.init()}QueryLoader2.prototype.init=function(){console.log("Initialising QueryLoader2 for",this.element),console.log("Setting the options"),this.options=$.extend({},this.defaultOptions,this.options),console.log("Looking for images in",this.element);this.findImageInElement(this.element);if(1==this.options.deepSearch){console.log("Deep searching for images in",this.element);for(var elements=this.$element.find("*:not(script)"),i=0;i<elements.length;i++)this.findImageInElement(elements[i])}this.preloadContainer.create(),this.overlayLoader.createOverlay()},QueryLoader2.prototype.findImageInElement=function(element){var url="",obj=$(element),type="normal";if("none"!=obj.css("background-image")?(url=obj.css("background-image"),type="background"):"undefined"!=typeof obj.attr("src")&&"img"==element.nodeName.toLowerCase()&&(url=obj.attr("src")),!this.hasGradient(url)){url=this.stripUrl(url);for(var urls=url.split(", "),i=0;i<urls.length;i++)if(this.validUrl(urls[i])&&this.urlIsNew(urls[i])){console.log("Found "+urls[i]);var extra="";if(this.isIE()||this.isOpera())extra="?rand="+Math.random(),this.preloadContainer.addImage(urls[i]+extra);else if("background"==type)this.preloadContainer.addImage(urls[i]+extra);else{var image=new PreloadImage(this);image.element=obj,image.bindLoadEvent()}this.foundUrls.push(urls[i])}}},QueryLoader2.prototype.hasGradient=function(url){return-1==url.indexOf("gradient")?!1:!0},QueryLoader2.prototype.stripUrl=function(url){return url=url.replace(/url\(\"/g,""),url=url.replace(/url\(/g,""),url=url.replace(/\"\)/g,""),url=url.replace(/\)/g,"")},QueryLoader2.prototype.isIE=function(){return navigator.userAgent.match(/msie/i)},QueryLoader2.prototype.isOpera=function(){return navigator.userAgent.match(/Opera/i)},QueryLoader2.prototype.validUrl=function(url){return url.length>0&&!url.match(/^(data:)/i)?!0:!1},QueryLoader2.prototype.urlIsNew=function(url){return-1==this.foundUrls.indexOf(url)?!0:!1},QueryLoader2.prototype.destroyContainers=function(){this.destroyed=!0,this.preloadContainer.container.remove(),this.overlayLoader.container.remove()},QueryLoader2.prototype.endLoader=function(){console.log("Done preloading"),this.destroyed=!0,this.onLoadComplete()},QueryLoader2.prototype.onLoadComplete=function(){if(this.options.onLoadComplete(),"grow"==this.options.completeAnimation){var animationTime=this.options.minimumTime;this.overlayLoader.loadbar[0].parent=this,this.overlayLoader.loadbar.stop().animate({width:"100%"},animationTime,function(){$(this).animate({top:"0%",width:"100%",height:"100%"},500,function(){this.parent.overlayLoader.container[0].parent=this.parent,this.parent.overlayLoader.container.fadeOut(500,function(){this.parent.destroyContainers(),this.parent.options.onComplete()})})})}else{var animationTime=this.options.minimumTime;this.overlayLoader.container[0].parent=this,this.overlayLoader.container.fadeOut(animationTime,function(){this.parent.destroyContainers(),this.parent.options.onComplete()})}};