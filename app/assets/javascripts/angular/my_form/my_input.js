(function() {
  'use strict';

  function myInput($compile, $filter) {
    var camelToDash = $filter('camelToDash');
    var capitalized = $filter('capitalized');
    var chopped     = $filter('chopped');

    return {
      restrict: 'A',
      scope: {},
      require: '^^form',
      link: function($scope, $elem, $attrs, formCtrl) {
        var name = chopped($attrs.myInput);

        $attrs.name           || $elem.attr('name', name);
        $attrs.placeholder    || $elem.attr('placeholder', capitalized(name));
        $attrs.type           || $elem.attr('type', name === 'password' ? 'password' : 'text');
        $attrs.ngModel        || $elem.attr('ng-model', $attrs.myInput);
        $attrs.ngModelOptions || $elem.attr('ng-model-options', '{ debounce: 500 }');

        $elem.removeAttr('my-input');
        $compile($elem)($scope);

        $scope.$on('CLEAR_FORM', function() {
          $elem.val('');
          formCtrl[name].$setPristine();
        });

        $scope.$on('VALIDATE_FORM', function() {
          formCtrl[name].$setDirty();
        });
      }
    }
  }

  angular.module('myForm').directive('myInput', ['$compile', '$filter', myInput]);
})();