(function() {
  'use strict';

  function authService($http, $q, userService, jwtHelper) {
    this.register = function(userinfo) {
      return userService.save({ userinfo: userinfo }).$promise;
    }

    this.logIn = function(userinfo) {
      var defObj = $q.defer();

      var credentials = {
        name: userinfo.name,
        password: userinfo.password
      }

      // Wrap in a promise to decode the token before it is sent further
      $http.post('/api/login', { userinfo: credentials }).then(
        function success(response) {
          var data = jwtHelper.decodeToken(response.data.token);
          defObj.resolve(data);
        },
        function error(error) { defObj.reject(error) }
      );

      return defObj.promise;
    }
  }

  angular.module('backend').service('authService', [
    '$http',
    '$q',
    'userService',
    'jwtHelper',
    authService
  ]);
})();