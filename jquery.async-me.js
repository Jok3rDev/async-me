/**
* jQuery Async Me
* Un plug-in jQuery pour charger de manière asynchrone vos contenu multimédia.
* http://github.com/Jok3rDev/async-me
*
* Licensed under the MIT license.
* Copyright 2016 Fabrice Trimech
* https://github.com/Jok3rDev/
*/

(function($) {
  'use strict';

  var AsyncMe = function (element, options) {
    this.$element = $(element);
    this.options  = $.extend({}, $.fn.asyncMe.defaults, this.$element.data(), options);
    this.init     = null;

    this
      .checkIntegrity()
      .handlerElement()
      .run()
    ;


  };

  AsyncMe.ERROR_NOT_ATTR   = 1;
  AsyncMe.ERROR_NOT_DOM    = 2;
  AsyncMe.ERROR_NOT_EFFECT = 3;


  AsyncMe.prototype.checkIntegrity = function () {
    var check    = true;
    var $element = this.$element;

    check &= Boolean($element.data('src') === undefined);
    check &= Boolean($element.data('src') != '');

    if (check) {
      this.promptError(AsyncMe.ERROR_NOT_ATTR);
    }

    this.integrityStatus = check;

    return this;
  };


  AsyncMe.prototype.integrityTimeOut = function (options) {
    var $check = true;
    check &= Boolean(options.timeOut != null);
    check &= Boolean(Number.isInteger(options.timeOut));

    this.integrityTimeOut = check;

    return this;
  };

  AsyncMe.prototype.promptError = function (id) {
    var ret = null;
    switch (id) {
      case AsyncMe.ERROR_NOT_ATTR:
        ret = "L'attribut data-src n'est pas correctement formaté.";
      break;
      case AsyncMe.ERROR_NOT_DOM:
        ret = "L'élement du DOM définit n'est pas géré par le plug-in.";
      break;
      case AsyncMe.ERROR_NOT_EFFECT:
        ret = "L'animation spécifié n'est pas géré par le plug-in.";
      break;
      default:
        ret = "Une erreur est survenue.";
    }
    return console.error(ret);
  };

  AsyncMe.prototype.run = function () {
    var $element = this.$element;
    var that     = this;
    var tag      = this.tagToChange;

    if (this.integrityTimeOut) {
      clearTimeout(this.init);

      this.init = setTimeout(function() {
        that.runEffect($element, tag);
      }, this.options.timeOut);
    } else {
      this.runEffect($element, tag);
    }

    return this;
  };

  AsyncMe.prototype.runEffect = function () {
    var $element = this.$element;
    var tag      = this.tagToChange;
    var effect   = this.options.effect;
    var speed    = this.options.speed;
    var speed    = this.options.speed;
    var that     = this;
    var effectCollection = {
      fadein: function($element, tag) {
        $element.fadeIn(speed, function() {
          that.updateAttribut($element, tag);
        });
      },
      fadeout: function($element, tag) {
        $element.fadeOut(speed, function() {
          that.updateAttribut($element, tag);
        });
      },
      slidedown: function($element, tag) {
        $element.slideDown(speed, function() {
          that.updateAttribut($element, tag);
        });
      },
      slideup: function($element, tag) {
        $element.slideUp(speed, function() {
          that.updateAttribut($element, tag);
        });
      },
      animate: function($element, tag) {
        $element.animate(speed, function() {
          that.updateAttribut($element, tag);
        });
      },
    };


    if (effect in effectCollection && typeof effectCollection[effect] === 'function') {
      effectCollection[effect].call(this, $element, tag);
    } else {
      this.promptError(AsyncMe.ERROR_NOT_EFFECT);
    }

    return this;
  };

  AsyncMe.prototype.updateAttribut = function () {
    var $element = this.$element;
    var tag      = this.tagToChange;

    $element.attr(tag, $element.data('src'));

    return this;
  };



  AsyncMe.prototype.handlerElement = function () {
    var $element = this.$element;
    var tag      = $element.context.tagName.toLowerCase();
    var ret      = false;

    switch (tag) {
      case 'img':
      case 'iframe':
        ret = 'src';
        break;
      default:
        this.promptError(AsyncMe.ERROR_NOT_DOM);
    }

    this.tagToChange = ret;

    return this;
  };

  var old = $.fn.asyncMe;
  $.fn.asyncMe = AsyncMe;

  $.fn.asyncMe = function (option, args) {
    return this.each(function () {
      var $this = $(this)
      , data = $this.data('asyncMe')
      , options = typeof option === 'object' && option;

      if(!data) $this.data( 'asyncMe', (data = new AsyncMe(this, options)));
      if( typeof option === 'string' && option == 'text' ){ data.setText( args ) }
    });
  }

  $.fn.asyncMe.Constructor = AsyncMe;

  $.fn.asyncMe.defaults = {
    timeOut : 500,
    effect  : 'blop',
    speed   : 'slow',
  }

  $.fn.asyncMe.noConflict = function () {
    $.fn.asyncMe = old;
    return this;
  }

  $(window).on('load', function() {
    $('.async-me').asyncMe();
  });

})(window.jQuery);
