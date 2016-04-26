(function() {
  'use strict';

  function navbarController($rootScope, $scope, authService, utilityService) {
    utilityService.defineGetters(this, {
      loggedIn: function() {
        return authService.currentUser.loggedIn;
      },
      username: function() {
        if (this.loggedIn) {
          return authService.currentUser.name;
        }

        return null;
      }
    });

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
    '$scope',
    'authService',
    'utilityService',
    navbarController
  ]);
})();