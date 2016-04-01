(function() {
  'use strict';

  function signupController($scope) {
    var self = this;

    function getSelf(property) {
      return function() { return self[property]; };
    }

    self.submit = function() {
      console.log(self.userinfo);
    };

    $scope.$watch(getSelf('userinfo'), function(newVal) {
      // Ignore the first call from the digest loop
      if (newVal === undefined) { return; }

      console.log('Value changed');
    }, true);
  };

  angular.module('app').controller('SignupController', [
    '$scope',
    signupController
  ]);
})();