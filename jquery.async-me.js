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
  };

  AsyncMe.prototype.checkAttribute = function (element) {
    var check    = true;
    var $element = element;

    check &= Boolean($element.data('src') === undefined);
    check &= Boolean($element.data('src') != '');

    if (check) {
      this.promptError(1);
    }
    return check;
  };

  AsyncMe.prototype.promptError = function (id) {
    var ret = null;
    switch (id) {
      case 1:
        ret = "L'attribut data-src n'est pas correctement formaté.";
      break;
      default:
        ret = "Une erreur est survenue.";
    }
    return console.error(ret);
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
