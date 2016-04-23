(function() {
  'use strict';

  function modelService($http) {
    return function(resource) {
      this.create = function(data) {
        return $http.post('/api/' + resource, data);
      }
    }
  }

  angular.module('backend').factory('modelService', ['$http', modelService]);
})();