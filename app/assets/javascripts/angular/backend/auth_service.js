(function() {
  'use strict';

  function authService($http, $q, Model, jwtHelper) {
    var User = new Model('users');

    this.register = function(userinfo) {
      return User.create({ userinfo: userinfo });
    }

    this.logIn = function(userinfo) {
      var defObj = $q.defer();

      var credentials = {
        name: userinfo.name,
        password: userinfo.password
      }

      $http.post('/api/login', { userinfo: credentials }).then(
        function success(response) {
          var token = response.data.token;

          localStorage.setItem('authToken', token);

          defObj.resolve(token);
        },
        function error(error) { defObj.reject(error) }
      );

      return defObj.promise;
    }

    this.logOut = function() {
      localStorage.removeItem('authToken');
    }
  }

  angular.module('backend').service('authService', [
    '$http',
    '$q',
    'modelService',
    'jwtHelper',
    authService
  ]);
})();