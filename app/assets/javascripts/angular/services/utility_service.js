(function() {
  'use strict';

  function utility() {
    this.removeFrom = function(arr, val) {
      var index = arr.indexOf(val);
      if (index != -1) {
        arr.splice(index, 1);
      }
    }
  }

  angular.module('utility').service('utility', [utility]);
})();