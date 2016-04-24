(function() {
  'use strict';

  function addJwtToken($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = [function() {
      return localStorage.getItem('authToken');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
  }

  angular.module('backend').config([
    '$httpProvider',
    'jwtInterceptorProvider',
    addJwtToken
  ]);
})();