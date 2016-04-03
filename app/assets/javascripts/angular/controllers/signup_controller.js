(function() {
  'use strict';

  function signupController($scope) {
    var self = this;

    function getSelf(property) {
      return function() { return self[property] };
    }

    self.submit = function() {
      console.log(self.userinfo);
    }

    self.greeting = 'hello';
  }

  angular.module('app').controller('SignupController', [
    '$scope',
    signupController
  ]);
})();