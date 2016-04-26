(function() {
  'use strict';

  function applicationController($scope) {
    var self = this;

    self.loggedIn = localStorage.getItem('authToken') ? true : false;

    function onLoggedIn(token) {
      self.loggedIn = true;
    }

    function onLoggedOut() {
      self.loggedIn = false;
    }

    $scope.$on('LOGGED_IN', onLoggedIn);
    $scope.$on('LOGGED_OUT', onLoggedOut);
  }

  angular.module('app').controller('ApplicationController', ['$scope', applicationController]);
})();