(function() {
  'use strict';

  function validUsername() {
    return {
      restrict: 'A',
      require: ['ngModel', '?inputFeedback'],
      link: function($scope, $element, $attrs, ctrls) {
        var ngModelCtrl = ctrls[0];
        var inputFeedbackCtrl = ctrls[1];

        ngModelCtrl.$validators.size = function(modelValue, viewValue) {
          var value = modelValue || viewValue;

          if (value === undefined) {
            return ngModelCtrl.$pristine;
          }

          return value.length >= 1 && value.length <= 15;
        }

        ngModelCtrl.$validators.characterSet = function(modelValue, viewValue) {
          var value = modelValue || viewValue;

          if (value === undefined) {
            return ngModelCtrl.$pristine;
          }

          return !/[^a-zA-Z0-9-_]/g.test(value);
        }

        if (inputFeedbackCtrl) {
          inputFeedbackCtrl.setInputInfo({
            name: 'username',
            placeholder: 'Username',
            type: 'text'
          });

          inputFeedbackCtrl.addMessage(
            'size',
            'The username should be 1 to 15 characters long.'
          );
          inputFeedbackCtrl.addMessage(
            'characterSet',
            'The username may only contain alphanumeric characters, underscores or dashes.'
          );
        }
      }
    }
  }

  angular.module('inputs').directive('validUsername', [validUsername]);
})();
