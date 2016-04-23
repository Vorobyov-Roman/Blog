(function() {
  'use strict';

  function navbarController($rootScope) {
    this.signup = function() {
      $('#signup').modal('show');
    }

    this.login = function() {
      $('#login').modal('show');
    }

    this.logout = function() {
      $rootScope.$broadcast('LOGGED_OUT');
    }
  }

  angular.module('app').controller('NavbarController', ['$rootScope', navbarController]);
})();