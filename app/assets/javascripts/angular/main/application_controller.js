(function() {
  'use strict';

  function applicationController($scope) {
    var self = this;

    self.loggedIn = localStorage.getItem('authToken') ? true : false;

    function onLoggedIn(token) {
      localStorage.setItem('authToken', token);
      self.loggedIn = true;
    }

    function onLoggedOut() {
      localStorage.removeItem('authToken');
      self.loggedIn = false;
    }

    $scope.$on('LOGGED_IN', onLoggedIn);
    $scope.$on('LOGGED_OUT', onLoggedOut);
  }

  angular.module('app').controller('ApplicationController', ['$scope', applicationController]);
})();