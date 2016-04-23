(function() {
  'use strict';

  function loginController(authService, $rootScope) {
    var self = this;

    self.submit = function() {
      function onSuccess(token) {
        $rootScope.$broadcast('LOGGED_IN', token);
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