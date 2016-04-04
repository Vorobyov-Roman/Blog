(function() {
  'use strict';

  var camelToDash;
  var chopped;
  var capitalized;

  function ownAttrs(attrs) {
    var result = {};

    angular.forEach(attrs, function(value, key, obj) {
      if (key[0] != '$') {
        result[key] = value;
      }
    });

    return result;
  }

  function completeAttrs(attrs) {
    var name = chopped(attrs['ngModel']);

    return {
      name: attrs.name || name,
      placeholder: attrs.placeholder || capitalized(name)
    }
  }

  function getValidators($elem) {
    var validationRules = {};
    var validators = $elem.find('validation');

    angular.forEach(validators, function(validator) {
      angular.forEach(validator.attributes, function(rule) {
        validationRules[rule.name] = rule.value;
      });
    });

    return validationRules;
  }

  function createStructure(attrs) {
    var childInput = angular.element('<input>');
    childInput.addClass('form-control');

    angular.forEach(attrs, function(value, key) {
      childInput.attr(camelToDash(key), value);
    });

    var newElement = angular.element('<div></div>');
    newElement.addClass('form-group');
    newElement.append(childInput);

    return newElement;
  }

  function myInput($compile, $filter) {
    camelToDash = $filter('camelToDash');
    chopped     = $filter('chopped');
    capitalized = $filter('capitalized');

    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {},
      compile: function($elem, $attrs) {
        var elem;
        var attrs;

        attrs = ownAttrs($attrs);
        angular.merge(attrs, getValidators($elem), completeAttrs(attrs));
        elem = createStructure(attrs);
        $elem.replaceWith(elem);

        return function($scope, $elem, $attrs) {
          $compile($elem)($scope);
        }
      }
    }
  }

  angular.module('inputs').directive('myInput', ['$compile', '$filter', myInput]);
})();