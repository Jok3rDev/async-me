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
  $.fn.asyncMe = function() {
    'use strict';
    console.log('Le plug-in est exécuté');
    var $element = this;
    console.log($element);
    $element.each(function(){
      checkAttribute($element);
      defineElement($element);
    });
    return this;

    /**
     * Vérifie si l'attribut data-src est présent et non null
     * @param  $element L'élement du DOM sur lequel est exécuté AsyncMe
     * @return booléen
     */
    function checkAttribute($element) {
      console.log($element);
      var check = true;
      check &= Boolean($element.data('src') === undefined);
      check &= Boolean($element.data('src') != '');

      if (check) {
        console.error("L'attribut data-src n'est pas correctement formaté.");
      }
      return check;
    }

    function defineElement($element) {

    }
  }
})(window.jQuery);
