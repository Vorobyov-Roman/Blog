(function() {
  'use strict';

  function validation($compile) {
    return {
      restrict: 'A',
      link: function($scope, $elem, $attrs) {
        var template = '!(@target.$error.@error && @target.$dirty)';

        var value = template
          .replace(/@target/g, function() { return $attrs.validationFor })
          .replace(/@error/g, function() { return $attrs.validation });

        $elem.addClass('validation-error');
        $elem.attr('uib-collapse', value);

        $elem.removeAttr('validation');
        $elem.removeAttr('validation-for');
        $compile($elem)($scope);
      }
    }
  }

  angular.module('myForm').directive('validation', ['$compile', validation]);
})();