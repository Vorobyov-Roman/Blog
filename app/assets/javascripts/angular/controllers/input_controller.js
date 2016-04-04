(function() {
  'use strict';

  function inputController($templateCache, validationErrors, utility, arrayToString) {
    var self = this;

    self.templateUrl = 'invalid_username_popover.html';
    self.reportTemplate = '<ul><li ng-repeat="error in $">{{ error }}</li></ul>';
    self.report = '';
    self.messages = [];

    $templateCache.put(self.templateUrl, self.report);

    self.onStateChange = function(validation, state, args) {
      var validationMessage = (validationErrors[validation] || angular.noop)(args);

      if (state === true) {
        self.messages.push(validationMessage);
      } else {
        utility.removeFrom(self.messages, validationMessage);
      }

      if (self.messages.length > 0) {
        self.report = self.reportTemplate.replace('$', arrayToString(self.messages));
      } else {
        self.report = '';
      }
      
      $templateCache.put(self.templateUrl, self.report);
    }
  }

  angular.module('inputs').controller('InputController', [
    '$templateCache',
    'VALIDATION_ERRORS',
    'utility',
    'arrayToStringFilter',
    inputController
  ]);
})();