(function() {
  'use strict';

  function signupController(authService) {
    var self = this;

    self.submit = function() {
      authService.register(self.userinfo).then(
        function(data) { console.log('success') },
        function(error) { console.log('error') }
      );
    }
  }

  angular.module('myForm').controller('SignupController', ['authService', signupController]);
})();