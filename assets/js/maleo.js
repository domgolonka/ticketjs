/* --------------------------------------------------------------------------
 * Prodigystudio  : Maleo - Javascript Configuration
 *  
 * file           : maleo.js
 * Desc           : Maleo Framework - Javascript Core
 * Version        : 1.0
 * Date           : 07/12/2014
 * Author         : Prodigystudio - team
 * Author URI     : http://prodigystudio.net
 * Email          : Hello@prodigystudio.net
 *
 * Prodigy Studio. Copyright 2014. All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * Javascript Plugin configuration
      1. Chart Configuration
      2. Jquery Progress Bar
      3. Menu Configuration
      4. Bootstrap Alert
      5. SVG Shape
      6. Bootstrap Tooltip
      7. Animation Section
      8. Jquery Preload
 
 * Javascript Handle Initialization
      1. Menu
      2. Scroll to Top
      3. Toggle Search
      4. Mediaelement
      5. Fancybox
      6. Isotope
      7. Responsive Tab
      8. Chart Animation
      9. Checkbox
      10.Gap
      11.Parallax
      12.Circle Chart
      13.Progress Bar
      14.SVG Shape
      15.Prettyprint
      16.Image Retina
      17.Counter
      18.Twitter Feed
      19.Login Panel
      20.Carousel List
 * 
 * -------------------------------------------------------------------------- */

(function($) {
/* --------------------------------------------------------------------------
 * Chart Configuration
 * -------------------------------------------------------------------------- */
   "use strict";

   // jQuery easypiechart constructor
   if ($.fn.easyPieChart) {
      var defaultset = {
         barColor    : '#95a5a6',
         trackColor  : '#f1f1f1',
         scaleColor  : false,
         lineCap     : 'round',
         scaleLength : 0,
         lineWidth   : 20,
         size        : 220,
         animation   : 5000,
         font        : 16,
         bgColor     : false
      }

      $.fn.maleoChart = function (options) {

         return this.each(function() {

            var maleoConfig = $.extend({}, defaultset, options),
                widthElement = getSize(maleoConfig.size, $(this), maleoConfig.mode); 
            
            $(this).css({
               'height'       : widthElement,
               'width'        : widthElement,
               'position'     : 'relative',
               'display'      : 'inline-block',
               'margin'       : 'auto 0',
               'text-align'   : 'center',
            });

            $(this).append("<div class='percent' style='position:absolute;top:0;left:0;line-height:"+widthElement+"px;text-align:center;width:"+widthElement+"px;font-size:"+maleoConfig.font+"px;font-weight:300;'></div>");
            if (maleoConfig.bgColor) {
               widthElement = widthElement - maleoConfig.lineWidth;
               $(this).css({'padding': maleoConfig.lineWidth / 2 });
            };

            $(this).easyPieChart({
               barColor    : maleoConfig.barColor,
               trackColor  : maleoConfig.trackColor,
               scaleColor  : maleoConfig.scaleColor,
               lineCap     : maleoConfig.lineCap,
               lineWidth   : maleoConfig.lineWidth,
               size        : widthElement,
               animation   : maleoConfig.animation,
               scaleLength : maleoConfig.scaleLength,
               
               onStep: function(from, to, percent) {
                  $(this.el).find('.percent').text(Math.round(percent)+'%');
               }
            });
         });  
      }
   } 
   else {
      console.log('easyPieChart jQuery plugin not found');
   }

   function getSize(chartSize, self) {
      var defaultSize = 100,
          widthElement;
      if (chartSize == defaultSize) {
         widthElement = self.parent().width();
      } else {
         widthElement = chartSize;
      }

      return widthElement;
   }

})(jQuery), + (function ($) {
/* --------------------------------------------------------------------------
 * Jquery Progress Bar
 * -------------------------------------------------------------------------- */
   "use strict";

   // jQuery progress bar
   $.fn.maleoProgressBar = function () {
      return this.each(function() {
         var bar = $(this);
         var percentage = $(this).attr('data-percent');

         progress(percentage, bar);
      });
   }

   function progress(percent, element) {
      var progressBarWidth = percent * element.width() / 100;
      element.find('.progress-content').append("<div class='progress-meter'></div>").animate({ 
         width: progressBarWidth,
         number: percent
      }, {
         duration: 4000,
         step: function(number) { // called on every step
            // Update the element's value:
            element.find('.progress-meter').text(Math.round(number)+'%');
         } 
      });
   }

})(jQuery), + (function ($) {
/* --------------------------------------------------------------------------
 * Menu Configuration
 * -------------------------------------------------------------------------- */
   "use strict";
   
   if ($.fn.smartmenus) {
         $.fn.maleomenu = function (options) {
            return this.each(function() {
               var self = $(this);

               self.addClass('sm').addClass('mo-menu').smartmenus({
                  mainMenuSubOffsetX: 0,
                  mainMenuSubOffsetY: 10,    
                  subMenusSubOffsetX: 1,
                  subMenusSubOffsetY: -47,
                  subIndicatorsText : ''
               }).find('li.active').children('a').addClass('active');
            });
         };
   } else {
      console.log("Maleo Menu requires jQuery smartmenus plugin");
   }

})(jQuery), + (function ($) {
   "use strict";

   /* ========================================================================
    * Bootstrap: alert.js v3.1.1
    * http://getbootstrap.com/javascript/#alerts
    * ========================================================================
    * Copyright 2011-2014 Twitter, Inc.
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    * ======================================================================== */
   
   var dismiss = '[data-component="alert"]';

   var Alert   = function (el) {
      $(el).on('click', dismiss, this.close)
   }

   Alert.prototype.close = function (e) {
      var $this    = $(this)
      var selector = $this.attr('data-target')

      if (!selector) {
         selector = $this.attr('href')
         selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
      }

      var $parent = $(selector)

      if (e) e.preventDefault()

      if (!$parent.length) {
         $parent = $this.hasClass('alert') ? $this : $this.parent()
      }

      $parent.trigger(e = $.Event('close.bs.alert'))

      if (e.isDefaultPrevented()) return

         $parent.removeClass('in')

      function removeElement() {
         $parent.trigger('closed.bs.alert').remove()
      }

      $.support.transition && $parent.hasClass('fade') ?
      $parent
      .one($.support.transition.end, removeElement)
      .emulateTransitionEnd(150) :
      removeElement()
   }

   // Alert Plugin Definition

   var old = $.fn.alert

   $.fn.alert = function (option) {
      return this.each(function () {
         var $this = $(this)
         var data  = $this.data('bs.alert')

         if (!data) $this.data('bs.alert', (data = new Alert(this)))
         if (typeof option == 'string') data[option].call($this)
      })
   }

   $.fn.alert.Constructor = Alert

   // Alert No Conflict
   $.fn.alert.noConflict = function () {
      $.fn.alert = old
      return this
   }

   // Alert Data Api

   $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

})(jQuery), + (function($) {
/* --------------------------------------------------------------------------
 * SVG Shape
 * -------------------------------------------------------------------------- */
   
   "use strict";

   var SVGIcon = {
      init: function ( options, element) {
         var self = element;

         self.config = $.extend( {}, defaultSetVariable, options );
         var drawVal = { icon:self.config.icon, svgClass:self.config.svgClass, svgPath:self.config.pathClass };
         
         // add universal class
         self.addClass('svg-icon');

         // draw svg icon
         drawSvgIcon(drawVal, self);
         
         // draw gradient svg icon
         if (self.hasClass(self.config.gradientClass)) {  
            drawGradientSvgIcon(self);
         };
         
         var iconHeight = self.find('.icon-wrapper').height(),
            svgHeight = self.find('.svg').height(),
            svgPadding;

         svgPadding = (svgHeight - iconHeight) / 2;
         self.css({ 
            'text-align'   : 'center',
            'position'     : 'relative',
            'margin-top'   : self.config.positionTop,
            'margin-right' : 'auto',
            'margin-bottom': self.config.positionBottom,
            'margin-left'  : 'auto' 
         });

         self.find('.icon-wrapper').css({ 
            'position': 'absolute',
            'top': 0,
            'height' : '100%',
            'width':'100%',
            'padding-top': svgPadding + ( (svgPadding * self.config.iconTop) / 100 ), 
            'padding-bottom': svgPadding + ( (svgPadding * self.config.iconBottom) / 100 )
         });
      }
   };

   $.fn.prodigySvgIcon = function (options) {
      return this.each(function() {
         var svgIcon = Object.create( SVGIcon );

         svgIcon.init( options, $(this) );
         
         $.data( this, 'prodigySvgIcon', svgIcon );
      });
   };

   /**
    * Draw SVG Icon
    */
   function drawSvgIcon(config, e) {
      var c = config.svgClass,
         p = config.svgPath;

      if (config.icon == 'shield') { shieldSvg(c,p,e) } 
      else if (config.icon == 'hexagon') { hexagonSvg(c,p,e) } 
      else if (config.icon == 'cloud') { cloudSvg(c,p,e) } 
      else if (config.icon == 'heart') { heartSvg(c,p,e) } 
      else if (config.icon == 'square') { squareSvg(c,p,e) } 
      else if (config.icon == 'circle') { circleSvg(c,p,e) }
      else if (config.icon == 'radius') { radiusSvg(c,p,e) }  
      else { console.log('plugin in does not find your svg shape');}

      e.find('i').wrap("<div class='icon-wrapper'></div>");
   }

   /**
    * SVG Icon library
    */
   
    // shield icon svg 

   function squareSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><rect class='"+ p +"' x='6' y='6' width='500' height='500'/></svg>"); }
   function shieldSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M255.98,9.5L43.511,44.347V316.2c0,20.924,10.513,43.522,31.296,67.193c18.429,20.939,44.516,42.381,77.532,63.738c41.222,26.573,83.241,46.356,103.642,55.368c20.432-9.012,62.451-28.795,103.657-55.368c33.041-21.356,59.088-42.799,77.501-63.738c20.808-23.699,31.352-46.27,31.352-67.193V44.347L255.98,9.5z'/></svg>"); }
   function hexagonSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M273.321,499.767c-9.526,5.5-25.115,5.5-34.641,0L53.552,392.886c-9.526-5.5-17.321-19-17.321-30V149.117c0-11,7.794-24.5,17.32-30L238.681,12.233c9.526-5.5,25.114-5.5,34.641,0l185.127,106.884c9.526,5.5,17.32,19,17.32,30v213.769c0,11-7.794,24.5-17.32,30L273.321,499.767z'/></svg>"); }
   function cloudSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M137.444,107.452c-31.127,20.354-66.935,59.435-53.323,128.521c-42.044,11.59-73.346,49.331-73.346,94.98c0,54.322,44.013,98.325,98.322,98.325h296.47c54.296,0,98.321-44.003,98.321-98.325c0-44.814-27.352-80.749-71.036-94.403c3.79-20.288,2.014-55.163-31.372-79.508c-18.623-13.581-57.638-26.305-95.327,2.889C261.188,71.005,169.922,86.211,137.444,107.452z'/></svg>"); }
   function heartSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M256.957,477.293c-12.138-3.615-46.331-31.313-102.581-83.101c-45.729-41.753-77.896-74.871-96.514-99.359C24.679,251.887,8.087,210.329,8.087,170.186c0-37.735,14.164-69.447,42.492-95.142c27.111-24.487,60.09-36.729,98.938-36.729c51.398,0,87.212,21.675,107.44,65.033c20.229-43.358,56.045-65.033,107.443-65.033c38.845,0,71.823,12.241,98.933,36.729c28.331,25.696,42.489,57.407,42.489,95.142c0,29.709-8.904,60.419-26.7,92.126c-17.81,31.719-57.468,75.875-118.975,132.486c-20.226,18.862-37.029,33.921-50.379,45.162C282.648,463.244,265.051,475.688,256.957,477.293L256.957,477.293z'/></svg>"); }
   function radiusSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M506,426c0,44-36,80-80,80H86c-44,0-80-36-80-80V86C6,42,42,6,86,6h340c44,0,80,36,80,80V426z'/></svg>"); }
   function circleSvg(c,p,element) { element.append("<svg class='"+ c +"' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512'><defs class='svg-emmbed-style'></defs><path class='"+ p +"' d='M506,256c0,137.5-112.5,250-250,250S6,393.5,6,256S118.5,6,256,6S506,118.5,506,256z'/></svg>"); }
   
   /**
    * Default setting
    */

   var defaultSetVariable = { 
      icon              : 'square',             // [string]    - shield, hexagon, cloud, heart, square
      svgClass          : 'svg',             // [string]    - svg class name
      pathClass         : 'svg-path',           // [string]    - svg path class name
      positionTop       : 7,                 // [integer]   - add margin top
      positionBottom    : 12,                // [integer]   - add bottom top
      iconTop           : 0,                    // [percent]   - add padding top to icon
      iconBottom        : 0                  // [percent]   - add padding bottom to icon
   };

})(jQuery), + (function($) {
/* --------------------------------------------------------------------------
 * Bootstrap Tooltip
 * -------------------------------------------------------------------------- */

   "use strict";

   // TOOLTIP PUBLIC CLASS DEFINITION
   // ===============================

   var Tooltip = function (element, options) {
      this.type       =
      this.options    =
      this.enabled    =
      this.timeout    =
      this.hoverState =
      this.$element   = null

      this.init('tooltip', element, options)
   }

   Tooltip.DEFAULTS = {
      animation: true
      , placement: 'top'
      , selector: false
      , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
      , trigger: 'hover focus'
      , title: ''
      , delay: 0
      , html: false
      , container: false
   }

   Tooltip.prototype.init = function (type, element, options) {
      this.enabled  = true
      this.type     = type
      this.$element = $(element)
      this.options  = this.getOptions(options)

      var triggers = this.options.trigger.split(' ')

      for (var i = triggers.length; i--;) {
         var trigger = triggers[i]

         if (trigger == 'click') {
            this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
         } else if (trigger != 'manual') {
            var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
            var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

            this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
            this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
         }
      }

      this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
   }

   Tooltip.prototype.getDefaults = function () {
      return Tooltip.DEFAULTS
   }

   Tooltip.prototype.getOptions = function (options) {
      options = $.extend({}, this.getDefaults(), this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
         options.delay = {
            show: options.delay
            , hide: options.delay
         }
      }

      return options
   }

   Tooltip.prototype.getDelegateOptions = function () {
      var options  = {}
      var defaults = this.getDefaults()

      this._options && $.each(this._options, function (key, value) {
         if (defaults[key] != value) options[key] = value
      })

      return options
   }

   Tooltip.prototype.enter = function (obj) {
      var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

      clearTimeout(self.timeout)

      self.hoverState = 'in'

      if (!self.options.delay || !self.options.delay.show) return self.show()

         self.timeout = setTimeout(function () {
            if (self.hoverState == 'in') self.show()
         }, self.options.delay.show)
   }

   Tooltip.prototype.leave = function (obj) {
      var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

      clearTimeout(self.timeout)

      self.hoverState = 'out'

      if (!self.options.delay || !self.options.delay.hide) return self.hide()

         self.timeout = setTimeout(function () {
            if (self.hoverState == 'out') self.hide()
         }, self.options.delay.hide)
   }

   Tooltip.prototype.show = function () {
      var e = $.Event('show.bs.'+ this.type)

      if (this.hasContent() && this.enabled) {
         this.$element.trigger(e)

         if (e.isDefaultPrevented()) return

            var $tip = this.tip()

         this.setContent()

         if (this.options.animation) $tip.addClass('fade')

            var placement = typeof this.options.placement == 'function' ?
         this.options.placement.call(this, $tip[0], this.$element[0]) :
         this.options.placement

         var autoToken = /\s?auto?\s?/i
         var autoPlace = autoToken.test(placement)
         if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

            $tip
         .detach()
         .css({ top: 0, left: 0, display: 'block' })
         .addClass(placement)

         this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

         var pos          = this.getPosition()
         var actualWidth  = $tip[0].offsetWidth
         var actualHeight = $tip[0].offsetHeight

         if (autoPlace) {
            var $parent = this.$element.parent()

            var orgPlacement = placement
            var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
            var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
            var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
            var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

            placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
            placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
            placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
            placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
            placement

            $tip
            .removeClass(orgPlacement)
            .addClass(placement)
         }

         var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

         this.applyPlacement(calculatedOffset, placement)
         this.$element.trigger('shown.bs.' + this.type)
      }
   }

   Tooltip.prototype.applyPlacement = function(offset, placement) {
      var replace
      var $tip   = this.tip()
      var width  = $tip[0].offsetWidth
      var height = $tip[0].offsetHeight

      // manually read margins because getBoundingClientRect includes difference
      var marginTop = parseInt($tip.css('margin-top'), 10)
      var marginLeft = parseInt($tip.css('margin-left'), 10)

      // we must check for NaN for ie 8/9
      if (isNaN(marginTop))  marginTop  = 0
         if (isNaN(marginLeft)) marginLeft = 0

            offset.top  = offset.top  + marginTop
         offset.left = offset.left + marginLeft

         $tip
         .offset(offset)
         .addClass('in')

      // check to see if placing tip in new offset caused the tip to resize itself
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
         replace = true
         offset.top = offset.top + height - actualHeight
      }

      if (/bottom|top/.test(placement)) {
         var delta = 0

         if (offset.left < 0) {
            delta       = offset.left * -2
            offset.left = 0

            $tip.offset(offset)

            actualWidth  = $tip[0].offsetWidth
            actualHeight = $tip[0].offsetHeight
         }

         this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
         this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
   }

   Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
      this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
   }

   Tooltip.prototype.setContent = function () {
      var $tip  = this.tip()
      var title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
   }

   Tooltip.prototype.hide = function () {
      var that = this
      var $tip = this.tip()
      var e    = $.Event('hide.bs.' + this.type)

      function complete() {
         if (that.hoverState != 'in') $tip.detach()
      }

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

         $tip.removeClass('in')

      $.support.transition && this.$tip.hasClass('fade') ?
      $tip
      .one($.support.transition.end, complete)
      .emulateTransitionEnd(150) :
      complete()

      this.$element.trigger('hidden.bs.' + this.type)

      return this
   }

   Tooltip.prototype.fixTitle = function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
         $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
   }

   Tooltip.prototype.hasContent = function () {
      return this.getTitle()
   }

   Tooltip.prototype.getPosition = function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
         width: el.offsetWidth
         , height: el.offsetHeight
      }, this.$element.offset())
   }

   Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
      return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
   }

   Tooltip.prototype.getTitle = function () {
      var title
      var $e = this.$element
      var o  = this.options

      title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
   }

   Tooltip.prototype.tip = function () {
      return this.$tip = this.$tip || $(this.options.template)
   }

   Tooltip.prototype.arrow = function () {
      return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
   }

   Tooltip.prototype.validate = function () {
      if (!this.$element[0].parentNode) {
         this.hide()
         this.$element = null
         this.options  = null
      }
   }

   Tooltip.prototype.enable = function () {
      this.enabled = true
   }

   Tooltip.prototype.disable = function () {
      this.enabled = false
   }

   Tooltip.prototype.toggleEnabled = function () {
      this.enabled = !this.enabled
   }

   Tooltip.prototype.toggle = function (e) {
      var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
   }

   Tooltip.prototype.destroy = function () {
      this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
   }


   // TOOLTIP PLUGIN DEFINITION
   // =========================

   var old = $.fn.tooltip

   $.fn.tooltip = function (option) {
      return this.each(function () {
         var $this   = $(this)
         var data    = $this.data('bs.tooltip')
         var options = typeof option == 'object' && option

         if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
         })
   }

   $.fn.tooltip.Constructor = Tooltip


   // TOOLTIP NO CONFLICT
   // ===================

   $.fn.tooltip.noConflict = function () {
      $.fn.tooltip = old
      return this
   }

})(jQuery), + (function ($) {
  "use strict";

/* --------------------------------------------------------------------------
 * Animation Section
 * -------------------------------------------------------------------------- */

   // hide section animmation
   function animation_hide() {
      if ($(".mo-animate")[0]) {
         $('.mo-animate').css('opacity', '0');
      }
   }

   // Initialization animation
   function animation_run() {
      // touch device check
      if (!Modernizr.touch) {
         $('.mo-animate').waypoint(function() {
            var animate = $(this).attr('data-animate');
            var delayanimate = $(this).attr('data-delay');

            if( delayanimate > 0 ) {
               var delayTime = (delayanimate / 1000) + 's';

               $(this).css({
                  'visibility'              : 'visible',
                  '-webkit-animation-delay' : delayTime,
                  '-moz-animation-delay'    : delayTime,   
                  '-o-animation-delay'      : delayTime,     
                  'animation-delay'         : delayTime,
               });
            }

            $(this).css('opacity', '');
            $(this).addClass("animated " + animate);

         }, {
            offset: '80%',
            triggerOnce: true
         });
      }
   }

/* -----------------------------------------------------------------------
 * Jquery Preload
 * ----------------------------------------------------------------------- */
   if (!Modernizr.touch) {
      if ($.fn.queryLoader2) {
         // IE check
         if (navigator.userAgent.match(/msie|trident/i)){
            console.log("your browser is so old");
            // IE CSS Hack
            $(".social-icon.cube").find(".back").css("display","none");
            $(".mo-caption .preview, .mo-caption .permalink").css("left","50%");
         } else {
            $("header nav").hide();

            $("body").queryLoader2({
               barColor: "#fff",
               backgroundColor: "#93B4EB",
               percentage: true,
               barHeight: 5,
               completeAnimation: "grow",
               minimumTime: 100,
               onLoadComplete: function() {
                  // call animation_hide function
                  animation_hide(); 
                  $("header nav").show();  
               },

               onComplete: function() {
                  // call animation_run function
                  animation_run();
               }
            });
         }
      } else {
         console.log("jQuery Loader 2 plugin not found");
      }
   }
  
})(jQuery);

/* --------------------------------------------------------------------------
 * Javascript Handle Initialization
 * -------------------------------------------------------------------------- */

$(document).ready(function() {  

/* -----------------------------------------------------------------------
 * Menu
 * ----------------------------------------------------------------------- */
   $('#menu').maleomenu();
   
   /* Search */
   $('.input-search').keypress(function(e) {
      if (e.keyCode == 13) {
         $('.search-content form').submit();
         // e.preventDefault();
      }
   });

/* -----------------------------------------------------------------------
 * Mobile Menu Trigger
 * ----------------------------------------------------------------------- */

   screenWidth = $(window).width();
   
   if (screenWidth < 767) {
      $('<div class="menu-trigger"><i class="icon-menu"></i></div>').insertBefore(".menu-content");
      $(".menu-content").css('display','none');
      $(".menu-trigger").css('display','block');
      $(".menu-trigger").click(function(e) {
         e.preventDefault();
         $(this).toggleClass("active");
         if ($(this).hasClass("active")) {
            $(".menu-content").show();
         } else {
            $(".menu-content").hide();
         }
      });

      $(".toggle-search").click(function(e){
         e.preventDefault();
         if($(this).hasClass("search-header3")) {
            if ($(".search-content").is(":visible")){
               $(".search-content").hide(function() {
                  $(".toggle-search-wrapper").show();
                  $(".menu-trigger").show();
               });
               console.log("hide");
            } else {
               // Show - slide down.
               console.log("show");
               $(".toggle-search-wrapper").hide(function() {
                  $(".search-content").show();
                  $(".menu-trigger").hide().removeClass("active");
                  $(".menu-content").hide();
               });
            }

         } else {
            if ($(".search-content").is(":visible")){
               // Hide - slide up.
               $(".search-content").hide(function() {
                  $(".menu-content").show();
                  $(".menu-trigger").show();
               });
            } else {
               // Show - slide down.
               $(".menu-content").hide(function() {
                  $(".search-content").show();
                  $(".menu-trigger").hide();
               });
            }
         }
      });
      
   }

/* -----------------------------------------------------------------------
 * Scroll to Top
 * ----------------------------------------------------------------------- */

   var jump = function(e) {
      e.preventDefault();
      $('html,body').animate({
         scrollTop: $('html').offset().top
      },1000);
   }

   $('#top').bind("click", jump);

/* -----------------------------------------------------------------------
 * Toggle Search
 * ----------------------------------------------------------------------- */
   $(".toggle-search").click(function(e){
      e.preventDefault();
      if($(this).hasClass("search-header3")) {
         if ($(".search-content").is(":visible")){
            $(".search-content").slideUp("slow", function() {
               $(".toggle-search-wrapper").slideDown("slow");
            });
            console.log("hide");
         } else {
            // Show - slide down.
            console.log("show");
            $(".toggle-search-wrapper").slideUp("slow", function() {
               $(".search-content").slideDown("slow");
            });
         }

      } else {
         if ($(".search-content").is(":visible")){
            // Hide - slide up.
            $(".search-content").slideUp("slow", function() {
               $(".menu-content").slideDown("slow");
            });
         } else {
            // Show - slide down.
            $(".menu-content").slideUp("slow", function() {
               $(".search-content").slideDown("slow");
            });
         }
      }
   });

/* -----------------------------------------------------------------------
 * Mediaelement
 * ----------------------------------------------------------------------- */

   if ($.fn.mediaelementplayer) {
      $('audio').mediaelementplayer({
         alwaysShowControls: false,
         videoVolume: 'horizontal',
         features: ['playpause','progress','volume']
      });

      $('video').mediaelementplayer({
         alwaysShowControls: false,
         videoVolume: 'horizontal',
         features: ['playpause','progress','volume','fullscreen']
      });
   } else {
      console.log("jQuery player plugin not found");
   }

/* -----------------------------------------------------------------------
 * Fancybox
 * ----------------------------------------------------------------------- */
   
   if ($.fn.fancybox) {
      $(".fancybox").fancybox({
         padding:0,
         openEffect:'elastic',
         openSpeed:250,
         closeEffect:'elastic',
         closeSpeed:250,
         closeClick:false,
         helpers:{
            title: { type:'outside'},
            media:{}
         }
      });

      // fancybox media
      $('.fancybox-media').attr('rel', 'media-gallery').fancybox({
         openEffect : 'none',
         closeEffect : 'none',
         prevEffect : 'none',
         nextEffect : 'none',
         padding : 0,

         arrows : false,
         helpers : {
            media : {},
            buttons : {}
         }
      });
   } else {
      console.log("jQuery fancybox plugin not found");
   }

/* -----------------------------------------------------------------------
 * Isotope
 * ----------------------------------------------------------------------- */

   if ($.fn.isotope) {
      $(window).load(function () {
         var l = $(".portfolio-container");
         l.isotope({
            filter: "*",
            animationOptions: {
               duration: 750,
               easing: "linear",
               queue: false
            }
         });

         $("#portfolio-filter a").click(function () {
            var n = $(this).attr("data-filter");
            l.isotope({
               filter: n,
               animationOptions: {
                  duration: 750,
                  easing: "linear",
                  queue: false
               }
            });
            return false
         });

         var k = $("#portfolio-filter"),
         m = k.find("a");
         m.click(function () {
            var o = $(this);
            if (o.hasClass("selected")) {
               return false
            }
            var n = o.parents("#portfolio-filter");
            n.find(".selected").removeClass("selected");
            o.addClass("selected")
         })
      })

   } else {
      console.log("jQuery isotope plugin not found ");
   }

/* -----------------------------------------------------------------------
 * Responsive Tab
 * ----------------------------------------------------------------------- */
   
   if ($.fn.easyResponsiveTabs) {
      $('#top-tab').easyResponsiveTabs({ type : 'tab-top' });
       $('#bottom-tab').easyResponsiveTabs({ type : 'tab-bottom' });
      $('#left-tab').easyResponsiveTabs({ type : 'tab-left' });
      $('#right-tab').easyResponsiveTabs({ type : 'tab-right' });
      $('#accordion').easyResponsiveTabs({ type : 'accordion' });
   } else {
      console.log("jQuery easyResponsiveTabs plugin not found");
   }

/* -----------------------------------------------------------------------
 * Chart Animation
 * ----------------------------------------------------------------------- */
   
   var x = 0;
   setInterval(function(){
      x-=1;
      $("#process-chart").css('background-position', x + 'px 0');
   }, 60);

/* --------------------------------------------------------------------------
 * Checkbox
 * -------------------------------------------------------------------------- */  
  
   if ($.fn.iCheck) {
      $('input').iCheck({
         checkboxClass: 'icheckbox_flat',
         radioClass: 'iradio_flat'
      });
   } else { 
      console.log("jQuery iCheck plugin not found ")
   }

/* -----------------------------------------------------------------------
 * Gap 
 * ----------------------------------------------------------------------- */
   
   $('.gap').each(function () {
      var self = $(this),
      dataGap = self.data();

      $.each(dataGap, function(direction, val) {
         if (direction == "top")    { self.css("margin-top", val+'px'); }
         if (direction == "bottom") { self.css("margin-bottom", val+'px'); }
         if (direction == "left")   { self.css("margin-left", val+'px'); }
         if (direction == "right")  { self.css("margin-right", val+'px'); }
      });
   });

/* -----------------------------------------------------------------------
 * Parallax
 * ----------------------------------------------------------------------- */
   if (!Modernizr.touch) {
      if ($.fn.parallax) {
         $("#parallax-index2").parallax("20%", 0.1);
         $("#parallax-index3").parallax("20%", 0.1);
         $("#parallax-index5").parallax("25%", 0.1);
         $("#parallax-index6").parallax("30%", 0.1);
         $("#about-parallax").parallax("20%", 0.1);
      } else {
         console.log("jQuery parallax plugin not found");
      }
   }

/* --------------------------------------------------------------------------
 * Circle Chart
 * -------------------------------------------------------------------------- */
   if ($.fn.maleoChart) {
      function chart_run() {
         $(".chart").maleoChart({barColor: '#93B4EB', font:32 });
         $(".chart-green").maleoChart({ barColor: '#21cba9', font:32 });
         $(".chart-blue").maleoChart({ barColor: '#3ba5ed', font:32 });
         $(".chart-yellow").maleoChart({ barColor: '#fed019', font:32 });
         $(".chart-red").maleoChart({ barColor: '#fd7070', font:32 });
         $(".chart-white").maleoChart({ barColor: '#999999', font:32 });

         $(".chart2").maleoChart({barColor: '#fff', bgColor: true, lineWidth: 7, trackColor: '#aab7b8', scaleColor: '#aab7b8', scaleLength: 10, font:32 });
         $(".chart2-green").maleoChart({ barColor: '#fff', bgColor: true, lineWidth: 7, trackColor: '#72d3d8', scaleColor: '#72d3d8', scaleLength: 10, font:32 });
         $(".chart2-blue").maleoChart({ barColor: '#fff', bgColor: true, lineWidth: 7, trackColor: '#5dade2', scaleColor: '#5dade2', scaleLength: 10, font:32 });
         $(".chart2-yellow").maleoChart({ barColor: '#fff', bgColor: true, lineWidth: 7, trackColor: '#f4d03f', scaleColor: '#f4d03f', scaleLength: 10, font:32 });
         $(".chart2-red").maleoChart({ barColor: '#fff', bgColor: true, lineWidth: 7, trackColor: '#f17272', scaleColor: '#f17272', scaleLength: 10, font:32 });
         $(".chart2-white").maleoChart({ barColor: '#95a5a6', bgColor: true, lineWidth: 7, trackColor: '#fcfcfc', scaleColor: '#fcfcfc', scaleLength: 10, font:32 });
      }

      if (!Modernizr.touch) {
         // run with trigger
         $('.chart-trigger').waypoint(function() {
           chart_run();
         }, {
           offset: '80%',
           triggerOnce: true
         });

      } else { 
        chart_run(); 
      } 
   
   } else {
      console.log("jQuery maleoChart plugin not found");
   }

/* --------------------------------------------------------------------------
 * Progress Bar
 * -------------------------------------------------------------------------- */  
   if (!Modernizr.touch) {
      // run with trigger
      $('.progress-trigger').waypoint(function() {
         $('.progress-bar').maleoProgressBar();
      }, { offset: '80%', triggerOnce: true });
   } else { 
      $('.progress-bar').maleoProgressBar(); 
   } 

/* --------------------------------------------------------------------------
 * SVG Shape
 * -------------------------------------------------------------------------- */  
   $('.shield-shape').prodigySvgIcon({ icon : 'shield' });
   $('.radius-shape').prodigySvgIcon({ icon : 'radius' });
   $('.hexagon-shape').prodigySvgIcon({ icon : 'hexagon' });
   $('.cloud-shape').prodigySvgIcon({ icon : 'cloud', iconTop : 27 });
   $('.heart-shape').prodigySvgIcon({ icon : 'heart' });  
   $('.circle-shape').prodigySvgIcon({ icon : 'circle' });                 
   $('.square-shape').prodigySvgIcon({ icon : 'square' });

/* --------------------------------------------------------------------------
 * Prettyprint
 * -------------------------------------------------------------------------- */
   window.prettyPrint && prettyPrint();   

/* --------------------------------------------------------------------------
 * Image Retina
 * -------------------------------------------------------------------------- */
   if ($.fn.retina) {
      $('img.retina').retina('@2x');
   } else {
      console.log("jQuery Retina plugin not found"); 
   }

/* -----------------------------------------------------------------------
 * Counter
 * ----------------------------------------------------------------------- */

   if ($.fn.countTo) {
      if (!Modernizr.touch) {
         // run with trigger
         $('.counter-trigger').waypoint(function() { 
            counter_run() 
         }, { offset: '80%', triggerOnce: true });
      } else { counter_run(); } 

      // counter 
      function counter_run() { 
         $('.mo-counter').each(function() {
            $(this).data('countToOptions', {
               formatter: function (value, options) {
                  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
               }
            });

            // start all the timers
            $('.timer').each(count);

            function count(options) {
               var $this = $(this);
               options = $.extend({}, options || {}, $this.data('countToOptions') || {});
               $this.countTo(options);
            }
         });
      }
   } else { 
      console.log("jQuery Count plugin not found"); 
   }

/* -----------------------------------------------------------------------
 * Twitter - Feed 
 * ----------------------------------------------------------------------- */

   if ($.fn.tweet) {
      $("#twitter-feed").tweet({
         username: "envato",
         join_text: "auto",
         modpath: 'js/twitter/',
         count: 5,
         loading_text: "Loading tweets...",
         template: "<div class='twitter-text'><p>{text}</p></div>"
      });
   } else {
      console.log("twitter jQuery plugin not found");
   }

/* -----------------------------------------------------------------------
 * Index Layout 3
 * ----------------------------------------------------------------------- */
   $('html').click(function() {
      $(".login-panel").fadeOut("slow");
   });

   $('.login-panel').click(function(e){
      e.stopPropagation();
   });

   $(".login").click(function(e) {
      e.stopPropagation();
      if ($(".login-panel").is(":visible")){
         // Hide - slide up.
         $(this).removeClass("active");
         $(".login-panel").fadeOut("slow");
      } else {
         // Show - slide down.
         $(this).addClass("active");
         $(".login-panel").fadeIn("slow");
      }
   });

/* -----------------------------------------------------------------------
 * Carousel List
 * ----------------------------------------------------------------------- */ 

/* Carousel - Testimonial
 * ----------------------------------------------------------------------- */
   $("#carousel-team").owlCarousel({
      itemsCustom : [[0, 1], [400, 2], [700, 4], [1000, 3], [1200, 3], [1600, 3]],
      navigation : false, // Show next and prev buttons
      pagination: false,
      slideSpeed : 300,
      paginationSpeed : 400,
      transitionStyle : "fadeUp",
      // autoPlay: 3000 
   });

/* Carousel - Testimonial
 * ----------------------------------------------------------------------- */
   $("#carousel-testimonial").owlCarousel({
      itemsCustom : [[0, 1], [400, 3], [700, 4], [1000, 5], [1200, 6], [1600, 6]],
      navigation : false,
      pagination: false,
      slideSpeed : 300,
      paginationSpeed : 400,
      transitionStyle : "fadeUp",
      autoPlay: 3000 
   });

/* Carousel - Blog
 * ----------------------------------------------------------------------- */
   var owl = $(".blog-carousel");
         
   owl.owlCarousel({
      autoPlay : 6000,
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
      pagination: false,
      transitionStyle : "fade"
   });

   $(".carousel-next").click(function(){
      owl.trigger('owl.next');
   });

   $(".carousel-prev").click(function(){
      owl.trigger('owl.prev');
   });

/* Carousel - Portfolio single
 * ----------------------------------------------------------------------- */
   $(".portosingle-slide").owlCarousel({
      autoPlay : 6000,
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
      pagination: false,
      transitionStyle : "fade"
   });

/* Carousel - Portfolio single
 * ----------------------------------------------------------------------- */
   $("#twitter-feed ul").owlCarousel({
      itemsCustom : [[0, 1], [400, 1], [700, 1], [1000, 1], [1200, 1], [1600, 1]],
      navigation : false, 
      pagination: false,
      slideSpeed : 500,
      paginationSpeed : 400,
      transitionStyle : "backSlide",
      autoPlay: 3000 
   });

/* Carousel - Index Layout 5
 * ----------------------------------------------------------------------- */
   $("#blog-slide").owlCarousel({
      autoPlay : 7000,
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      transitionStyle : "backSlide"
   });
   
});