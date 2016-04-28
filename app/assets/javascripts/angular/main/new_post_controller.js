(function() {
  'use strict';

  function newPostController($window, $scope) {
    this.cancel = function() {
      $window.history.back();
    }

    this.submit = function() {
      $scope.$broadcast('VALIDATE_FORM');

      if ($scope.form.$valid) {
        console.log(this.post);
      }
    }
  }

  angular.module('app').controller('NewPostController', [
    '$window',
    '$scope',
    newPostController
  ]);
})();