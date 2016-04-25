(function() {
  'use strict';

  function loginController(authService, $scope, $rootScope) {
    var self = this;
    var dialog = $('#login');

    function closeDialog() {
      dialog.modal('hide').on('hidden.bs.modal', function(e) {
        self.userinfo = null;
        $scope.$broadcast('CLEAR_FORM');
      });
    }

    self.submit = function() {
      function onSuccess(token) {
        $rootScope.$broadcast('LOGGED_IN', token);
        closeDialog();
      }

      function onError(error) {
        console.log('error', error);
      }

      $scope.$broadcast('VALIDATE_FORM');

      if ($scope.form.$valid) {
        authService.logIn(self.userinfo).then(onSuccess, onError);
      }
    }

    self.close = function() {
      closeDialog();
    }
  }

  angular.module('app').controller('LoginController', [
    'authService',
    '$scope',
    '$rootScope',
    loginController
  ]);
})();
