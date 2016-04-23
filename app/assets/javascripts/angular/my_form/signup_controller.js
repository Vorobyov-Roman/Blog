(function() {
  'use strict';

  function signupController(authService) {
    var self = this;

    self.submit = function() {
      function onSuccess(data) {
        console.log('success');
      }

      function onError(error) {
        console.log('error');
      }

      authService.register(self.userinfo).then(onSuccess, onError);
    }
  }

  angular.module('myForm').controller('SignupController', [
    'authService',
    signupController
  ]);
})();