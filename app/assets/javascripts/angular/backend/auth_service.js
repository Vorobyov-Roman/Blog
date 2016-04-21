(function() {
  'use strict';

  function authService(userService) {
    this.register = function(userinfo) {
      return userService.save({ userinfo: userinfo }).$promise;
    }
  }

  angular.module('backend').service('authService', ['userService', authService]);
})();