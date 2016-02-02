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

  AsyncMe.prototype.checkIntegrity = function (element) {
    var check    = true;
    var $element = element;

    check &= Boolean($element.data('src') === undefined);
    check &= Boolean($element.data('src') != '');

    if (check) {
      this.promptError(1);
    }

    this.integrityStatus = check;

    return this;
  };

  AsyncMe.prototype.promptError = function (id) {
    var ret = null;
    switch (id) {
      case 1:
        ret = "L'attribut data-src n'est pas correctement formaté.";
      break;
      case 2:
        ret = "L'élement du DOM définit n'est pas géré par le plug-in.";
      break;
      default:
        ret = "Une erreur est survenue.";
    }
    return console.error(ret);
  };

  AsyncMe.prototype.run = function (element, tag) {
    var $element = element;

    $element.attr(tag, $element.data('src'));

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
        this.promptError(2);
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
  }

  $.fn.asyncMe.noConflict = function () {
    $.fn.asyncMe = old;
    return this;
  }

})(window.jQuery);
