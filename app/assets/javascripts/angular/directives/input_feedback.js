// If used on an input, displays error messages that describe the validation fail.
// Should be provided with an error message for any validation fail that needs to be displayed.

(function() {
  'use strict';

  function inputFeedback() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        messages: '=?inputFeedback'
      },
      controller: function($scope) {
        if (!$scope.messages) $scope.messages = {};
        $scope.inputInfo = {};

        this.addMessage = function(trigger, message) {
          $scope.messages[trigger] = message;
        }

        this.setInputInfo = function(inputInfo) {
          $scope.inputInfo = inputInfo;
        }
      },
      compile: function($elem, $attrs) {
        return function($scope, $elem, $attrs, ctrl) {
          angular.forEach($scope.inputInfo, function(value, key) {
            $elem.attr(key, value);
          });

          // utility.iterateOver($scope.messages, function(trigger, message) {
          //   $scope.$watch(function() { return ctrl.$error[trigger] }, function(newValue, oldValue) {
          //     if (newValue === undefined) { return }

          //     console.log(ctrl.$error);
          //   }, true);
          // });
        }
      }
    }
  }

  angular.module('inputs').directive('inputFeedback', [inputFeedback]);
})();
