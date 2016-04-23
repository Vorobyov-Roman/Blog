(function() {
  'use strict';

  function signupController(authService, $rootScope) {
    var self = this;
    var dialog = $('#signup');

    self.submit = function() {
      function onSuccess(data) {
        var credentials = {
          name: self.userinfo.name,
          password: self.userinfo.password
        }

        authService.logIn(credentials).then(function(token) {
          $rootScope.$broadcast('LOGGED_IN', token);
          dialog.modal('hide');
        });
      }

      function onError(error) {
        console.log('error');
      }

      authService.register(self.userinfo).then(onSuccess, onError);
    }
  }

  angular.module('myForm').controller('SignupController', [
    'authService',
    '$rootScope',
    signupController
  ]);
})();