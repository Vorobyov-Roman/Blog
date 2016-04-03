(function() {
  'use strict';

  function utility() {
    this.iterateOver = function(obj, fn) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          fn(key, obj[key]);
        }
      }
    }
  }

  angular.module('utility').service('utility', [utility]);
})();