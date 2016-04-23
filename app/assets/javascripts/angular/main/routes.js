(function() {
  'use strict';

  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.template',
        controller: 'HomeController as ctrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular.module('app').config(['$routeProvider', routes]);
})();