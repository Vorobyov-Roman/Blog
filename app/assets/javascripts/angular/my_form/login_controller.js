(function() {
  'use strict';

  function loginController(authService, $rootScope) {
    var self = this;
    var dialog = $('#login');

    self.submit = function() {
      function onSuccess(token) {
        $rootScope.$broadcast('LOGGED_IN', token);
        dialog.modal('hide');
      }

      function onError(error) {
        console.log('error');
      }

      authService.logIn(self.userinfo).then(onSuccess, onError);
    }
  }

  angular.module('myForm').controller('LoginController', [
    'authService',
    '$rootScope',
    loginController
  ]);
})();