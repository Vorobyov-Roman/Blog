(function() {
  'use strict';

  function loginController(authService) {
    var self = this;

    self.submit = function() {
      authService.logIn(self.userinfo).then(
        function(data) { console.log(data) },
        function(error) { console.log('error') }
      );
    }
  }

  angular.module('myForm').controller('LoginController', ['authService', loginController]);
})();