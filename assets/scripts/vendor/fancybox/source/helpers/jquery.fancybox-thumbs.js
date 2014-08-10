/*!
 * Thumbnail helper for fancyBox
 * version: 1.0.7 (Mon, 01 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             thumbs: {
 *                 width  : 50,
 *                 height : 50
 *             }
 *         }
 *     });
 *
 */

!function(t){var i=t.fancybox;i.helpers.thumbs={defaults:{width:50,height:50,position:"bottom",source:function(i){var h;return i.element&&(h=t(i.element).find("img").attr("src")),!h&&"image"===i.type&&i.href&&(h=i.href),h}},wrap:null,list:null,width:0,init:function(i,h){var e,s=this,o=i.width,n=i.height,r=i.source;e="";for(var a=0;a<h.group.length;a++)e+='<li><a style="width:'+o+"px;height:"+n+'px;" href="javascript:jQuery.fancybox.jumpto('+a+');"></a></li>';this.wrap=t('<div id="fancybox-thumbs"></div>').addClass(i.position).appendTo("body"),this.list=t("<ul>"+e+"</ul>").appendTo(this.wrap),t.each(h.group,function(i){var e=r(h.group[i]);e&&t("<img />").load(function(){var h,e,r,a=this.width,l=this.height;s.list&&a&&l&&(h=a/o,e=l/n,r=s.list.children().eq(i).find("a"),h>=1&&e>=1&&(h>e?(a=Math.floor(a/e),l=n):(a=o,l=Math.floor(l/h))),t(this).css({width:a,height:l,top:Math.floor(n/2-l/2),left:Math.floor(o/2-a/2)}),r.width(o).height(n),t(this).hide().appendTo(r).fadeIn(300))}).attr("src",e)}),this.width=this.list.children().eq(0).outerWidth(!0),this.list.width(this.width*(h.group.length+1)).css("left",Math.floor(.5*t(window).width()-(h.index*this.width+.5*this.width)))},beforeLoad:function(t,i){return i.group.length<2?void(i.helpers.thumbs=!1):void(i.margin["top"===t.position?0:2]+=t.height+15)},afterShow:function(t,i){this.list?this.onUpdate(t,i):this.init(t,i),this.list.children().removeClass("active").eq(i.index).addClass("active")},onUpdate:function(i,h){this.list&&this.list.stop(!0).animate({left:Math.floor(.5*t(window).width()-(h.index*this.width+.5*this.width))},150)},beforeClose:function(){this.wrap&&this.wrap.remove(),this.wrap=null,this.list=null,this.width=0}}}(jQuery);