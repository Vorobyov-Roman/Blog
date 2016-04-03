(function() {
  'use strict';

  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.view',
        controller: 'HomeController',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular.module('app').config(['$routeProvider', routes]);
})();