(function() {
  'use strict';

  function myInput() {
    return {
      restrict: 'A',
      scope: {
        ctrl: '=myInput'
      },
      controller: function($scope) {
        this.onStateChange = function(validation, args) {
          console.log(validation, args);
        }
      }
    }
  }

  //angular.module('inputs').directive('myInput', [myInput]);
})();
