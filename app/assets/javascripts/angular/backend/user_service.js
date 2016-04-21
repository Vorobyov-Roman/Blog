(function() {
  'use strict';

  function userService($resource) {
    return $resource('/api/users/:id', { id: '@id' });
  }

  angular.module('backend').factory('userService', ['$resource', userService]);
})();