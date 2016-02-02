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

  var AsyncMe = function (options) {

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

  }

  $.fn.asyncMe.noConflict = function () {
    $.fn.asyncMe = old;
    return this;
  }

})(window.jQuery);
