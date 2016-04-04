(function() {
  'use strict';

  function arrayToString() {
    return function(arr) {
      return "['" + arr.join("', '") + "']";
    }
  }

  angular.module('utility').filter('arrayToString', [arrayToString]);
})();