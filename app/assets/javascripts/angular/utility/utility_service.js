(function() {
  'use strict';

  function utilityService() {
    this.defineGetters = function(obj, attrs) {
      angular.forEach(attrs, function(method, name) {
        Object.defineProperty(obj, name, { get: method });
      });
    }
  }

  angular.module('utility').service('utilityService', [utilityService]);
})();
