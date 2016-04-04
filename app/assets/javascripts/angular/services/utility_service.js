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

    this.removeFrom = function(arr, val) {
      var index = arr.indexOf(val);
      if (index != -1) {
        arr.splice(index, 1);
      }
    }
  }

  angular.module('utility').service('utility', [utility]);
})();