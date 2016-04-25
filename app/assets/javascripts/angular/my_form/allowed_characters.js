(function() {
  'use strict';

  function allowedCharacters() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, $elem, $attrs, ctrl) {
        ctrl.$validators.allowedCharacters = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          return !(new RegExp('[^' + $attrs.allowedCharacters + ']').test(value));
        }
      }
    }
  }

  angular.module('myForm').directive('allowedCharacters', [allowedCharacters]);
})();