(function() {
  'use strict';

  function validCharacters() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        chars: '@validCharacters'
      },
      link: function($scope, $elem, $attrs, ctrl) {
        ctrl.$validators.validCharacters = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          return !(new RegExp('[^' + $scope.chars + ']').test(value));
        }
      }
    }
  }

  angular.module('myForm').directive('validCharacters', [validCharacters]);
})();