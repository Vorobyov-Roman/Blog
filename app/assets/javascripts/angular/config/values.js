(function() {
  'use strict';

  angular.module('inputs').constant('VALIDATION_ERRORS', {
    size: 'The username should be 1 to 15 characters long.',
    charSet: 'The username may only contain alphanumeric characters, underscores or dashes.'
  });
})();