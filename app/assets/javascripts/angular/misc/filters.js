(function() {
  'use strict';

  function camelToDash() {
    return function(str) {
      return str.replace(/[A-Z]/g, function(capital) {
        return '-' + capital.toLowerCase();
      });
    }
  }

  function chopped() {
    return function(str) {
      return str.split('.').pop();
    }
  }

  function capitalized() {
    return function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  angular.module('utility')
    .filter('camelToDash', camelToDash)
    .filter('chopped', chopped)
    .filter('capitalized', capitalized);
})();