/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

!function($){var $window=$(window),windowHeight=$window.height();$window.resize(function(){windowHeight=$window.height()}),$.fn.parallax=function(xpos,speedFactor,outerHeight){function update(){var pos=$window.scrollTop();$this.each(function(){var $element=$(this),top=$element.offset().top,height=getHeight($element);pos>top+height||top>pos+windowHeight||$this.css("backgroundPosition",xpos+" "+Math.round((firstTop-pos)*speedFactor)+"px")})}var getHeight,firstTop,$this=$(this);$this.each(function(){firstTop=$this.offset().top}),getHeight=outerHeight?function(jqo){return jqo.outerHeight(!0)}:function(jqo){return jqo.height()},(arguments.length<1||null===xpos)&&(xpos="50%"),(arguments.length<2||null===speedFactor)&&(speedFactor=.1),(arguments.length<3||null===outerHeight)&&(outerHeight=!0),$window.bind("scroll",update).resize(update),update()}}(jQuery);