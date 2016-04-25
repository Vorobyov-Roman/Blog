(function() {
  'use strict';

  function signupController(authService, $scope, $rootScope) {
    var self = this;
    var dialog = $('#signup');

    function closeDialog() {
      dialog.modal('hide').on('hidden.bs.modal', function(e) {
        self.userinfo = null;
        $scope.$broadcast('CLEAR_FORM');
      });
    }

    self.submit = function() {
      function onSuccess(data) {
        var credentials = {
          name: self.userinfo.name,
          password: self.userinfo.password
        }

        authService.logIn(credentials).then(function(token) {
          $rootScope.$broadcast('LOGGED_IN', token);
          closeDialog();
        });
      }

      function onError(error) {
        console.log('error', error);
      }

      $scope.$broadcast('VALIDATE_FORM');

      if ($scope.form.$valid) {
        authService.register(self.userinfo).then(onSuccess, onError);
      }
    }

    self.close = function() {
      closeDialog();
    }
  }

  angular.module('app').controller('SignupController', [
    'authService',
    '$scope',
    '$rootScope',
    signupController
  ]);
})();