(function() {
  'use strict';

  function validCharacters() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, $elem, $attrs, ctrl) {
        
      }
    }
  }

  angular.module('inputs').directive('validCharacters', [validCharacters]);
})();