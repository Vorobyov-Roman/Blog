// If used on an input, displays error messages that describe the validation fail.
// Should be provided with an error message for any validation fail that needs to be displayed.

(function() {
  'use strict';

  function inputFeedback(utility) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      controller: function($scope) {
        $scope.messages = {};
        $scope.inputInfo = {};

        this.addMessage = function(trigger, message) {
          $scope.messages[trigger] = message;
        }

        this.setInputInfo = function(inputInfo) {
          $scope.inputInfo = inputInfo;
        }
      },
      link: function($scope, $elem, $attrs, ctrl) {
        utility.iterateOver($scope.messages, function(trigger, message) {
          $scope.$watch(function() { return ctrl.$error[trigger]; }, function(newValue, oldValue) {
            if (newValue === undefined) { return; }

            console.log(message);
          }, true);
        });


        // for (let trigger in $scope.messages) {
        //   if (!$scope.messages.hasOwnProperty(trigger)) { continue; }

        //   $scope.$watch(function() { return ctrl.$error[trigger]; }, function(newValue, oldValue) {
        //     if (newValue === oldValue) { return; }

            
        //   }, true);
        // }
      }
    }
  }

  angular.module('validators').directive('inputFeedback', ['utility', inputFeedback]);
})();
