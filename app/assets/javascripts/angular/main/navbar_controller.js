(function() {
  'use strict';

  function navbarController($rootScope, authService) {
    this.signup = function() {
      $('#signup').modal('show');
    }

    this.login = function() {
      $('#login').modal('show');
    }

    this.logout = function() {
      authService.logOut();
      $rootScope.$broadcast('LOGGED_OUT');
    }
  }

  angular.module('app').controller('NavbarController', [
    '$rootScope',
    'authService',
    navbarController
  ]);
})();