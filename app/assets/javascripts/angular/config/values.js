(function() {
  'use strict';

  angular.module('inputs').constant('VALIDATION_ERRORS', {
    myMaxlength: function(value) {
      return 'should be at most ' + value +' characters long';
    },
    charset: function() {
      return 'may only contain alphanumeric characters, underscores or dashes'
    }
  });
})();