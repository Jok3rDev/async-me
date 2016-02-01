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
    checkAttribute($element);
    return this;

    /**
     * Vérifie si l'attribut data-src est présent et non null
     * @param  $element L'élement du DOM sur lequel est exécuté AsyncMe
     * @return booléen
     */
    function checkAttribute($element) {
      var check = true;
      check &= $element.data('src') === undefined;
      check &= $element.data('src') === null;
      console.error("L'attribut data-src n'est pas correctement formaté.");
      return check;
    }
  }
})(window.jQuery);
