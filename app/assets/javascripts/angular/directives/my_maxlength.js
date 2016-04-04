(function() {
  'use strict';

  function myMaxlength() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        value: '=myMaxlength',
        onStatechange: '&'
      },
      link: function($scope, $elem, $attrs, ctrl) {
        ctrl.$validators.myMaxlength = function(modelValue, viewValue) {
          var value = modelValue || viewValue;

          return (value === undefined) ? ctrl.$pristine : (value.length <= $scope.value);
        }

        $scope.$watch(function() { return ctrl.$error.myMaxlength }, function(newValue, oldValue) {
          if (newValue === oldValue) { return }

          $scope.onStatechange({
            validation: 'myMaxlength',
            state: newValue,
            args: $scope.value
          });
        }, true);
      }
    }
  }

  angular.module('inputs').directive('myMaxlength', [myMaxlength]);
})();
