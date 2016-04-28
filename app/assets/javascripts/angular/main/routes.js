(function() {
  'use strict';

  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.template',
        controller: 'HomeController as ctrl',
      })
      .when('/new_post', {
        templateUrl: 'new_post.template',
        controller: 'NewPostController as ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular.module('app').config(['$routeProvider', routes]);
})();