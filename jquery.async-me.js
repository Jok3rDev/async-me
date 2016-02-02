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

    this
      .checkIntegrity(this.$element)
      .handlerElement(this.$element)
      .run(this.$element, this.tagToChange)
    ;


  };

  AsyncMe.ERROR_NOT_ATTR = 1;
  AsyncMe.ERROR_NOT_DOM  = 2;

  AsyncMe.prototype.checkIntegrity = function (element) {
    var check    = true;
    var $element = element;

    check &= Boolean($element.data('src') === undefined);
    check &= Boolean($element.data('src') != '');

    if (check) {
      this.promptError(AsyncMe.ERROR_NOT_ATTR);
    }

    this.integrityStatus = check;

    return this;
  };

  AsyncMe.prototype.isTimeOut = function (options) {
    var $check = true;
    check &= Boolean(options.timeOut != null);

    this.isTimeOut = check;

    return this;
  };

  AsyncMe.prototype.integrityTimeOut = function (options) {
    var $check = true;
    check &= Boolean(options.timeOut != null);
    check &= Boolean(Number.isInteger(options.timeOut));

    this.isTimeOut = check;

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
      default:
        ret = "Une erreur est survenue.";
    }
    return console.error(ret);
  };

  AsyncMe.prototype.run = function (element, tag) {
    var $element = element;
    setTimeout(function() {
      $element.attr(tag, $element.data('src'))
    }, this.options.timeOut);

    return this;
  };

  AsyncMe.prototype.handlerElement = function (element) {
    var $element = element;
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
    timeOut : null,
  }

  $.fn.asyncMe.noConflict = function () {
    $.fn.asyncMe = old;
    return this;
  }

  $(window).on('load', function() {
    $('.async-me').each(function(){
      $(this).asyncMe();
    });
  });

})(window.jQuery);
