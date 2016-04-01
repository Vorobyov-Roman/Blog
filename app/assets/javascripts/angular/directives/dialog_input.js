(function() {
  'use strict';

  function dialogInput() {
    return {
      templateUrl: 'dialog_input_template.view',
      restrict: 'E',
      scope: {},
      replace: true
    };
  }

  angular.module('app').directive('dialogInput', dialogInput);
})();
