(function() {
  'use strict';

  function navbarController($rootScope, $scope, $location, authService, utilityService) {
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
    }

    this.newPost = function() {
      $location.path('/new_post');
    }
  }

  angular.module('app').controller('NavbarController', [
    '$rootScope',
    '$scope',
    '$location',
    'authService',
    'utilityService',
    navbarController
  ]);
})();