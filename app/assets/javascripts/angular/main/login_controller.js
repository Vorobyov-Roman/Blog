(function() {
  'use strict';

  function loginController(authService, $scope) {
    var self = this;
    var dialog = $('#login');

    function closeDialog() {
      dialog.modal('hide').on('hidden.bs.modal', function(e) {
        self.userinfo = null;
        $scope.$broadcast('CLEAR_FORM');
      });
    }

    self.submit = function() {
      $scope.$broadcast('VALIDATE_FORM');

      if ($scope.form.$valid) {
        authService.logIn(self.userinfo).then(
          function(token) { closeDialog() },
          function(error) { console.log('error', error) }
        );
      }
    }

    self.close = function() {
      closeDialog();
    }
  }

  angular.module('app').controller('LoginController', [
    'authService',
    '$scope',
    loginController
  ]);
})();
