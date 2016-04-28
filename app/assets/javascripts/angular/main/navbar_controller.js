(function() {
  'use strict';

  function navbarController($rootScope, $scope, authService, utilityService, Model) {
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

    this.newPost = function() {
      var Post = new Model('posts');
      Post.create().then(
        function(response) { console.log('success', response) },
        function(error) { console.log('error', error) }
      );
    }
  }

  angular.module('app').controller('NavbarController', [
    '$rootScope',
    '$scope',
    'authService',
    'utilityService',
    'modelService',
    navbarController
  ]);
})();