(function() {
  'use strict';

  function hasFeedback($compile) {
    return {
      restrict: 'A',
      link: function($scope, $elem, $attrs) {
        var template = '{ \
          "has-success": @.$valid && @.$dirty,\
          "has-error": @.$invalid && @.$dirty \
        }';

        var value = template
          .replace(/@/g, function() { return $attrs.hasFeedback })
          .replace(/\s/g, '');

        $elem.attr('ng-class', value);

        $elem.removeAttr('has-feedback');
        $compile($elem)($scope);
      }
    }
  }

  angular.module('myForm').directive('hasFeedback', ['$compile', hasFeedback]);
})();