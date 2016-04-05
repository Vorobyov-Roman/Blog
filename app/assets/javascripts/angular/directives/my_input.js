(function() {
  'use strict';

  function myInput($compile, $filter) {
    var camelToDash = $filter('camelToDash');
    var chopped     = $filter('chopped');
    var capitalized = $filter('capitalized');
    var removeNg    = $filter('removeNg');

    // Extract directive's attributes as a hash
    function ownAttrs(attrs) {
      var result = {};

      angular.forEach(attrs, function(value, key, obj) {
        if (key[0] != '$') {
          result[key] = value;
        }
      });

      return result;
    }

    // Provide unspecified attributes
    function completeAttrs(attrs) {
      var name = chopped(attrs['ngModel']);

      return {
        name: attrs.name || name,
        placeholder: attrs.placeholder || capitalized(name),
        type: attrs.type || (name === 'password' ? 'password' : 'text'),
        ngModelOptions: '{ debounce: 500 }'
      }
    }

    // Get provided validators
    function getValidationMessages($elem) {
      var validations = [];
      var validators = $elem.find('validation');

      angular.forEach(validators, function(validator) {
        var newMessage = {
          message: validator.innerHTML,
          rules: []
        }

        angular.forEach(validator.attributes, function(rule) {
          newMessage.rules.push({
            name: rule.name,
            attrs: rule.value
          });
        });

        validations.push(newMessage);
      });

      return validations;
    }

    // Create new element that will replace the directive
    function createStructure(attrs, validations) {
      // Input element
      var inputElement = angular.element('<input>');
      inputElement.addClass('form-control');

      // Move attributes from the directive to the input element
      angular.forEach(attrs, function(value, key) {
        inputElement.attr(camelToDash(key), value);
      });

      // Apply validators to the input element
      angular.forEach(validations, function(validation) {
        angular.forEach(validation.rules, function(rule) {
          inputElement.attr(rule.name, rule.attrs);
        });
      });

      // Outer wrapper that will hold input element and validation error messages
      var newElement = angular.element('<div class="form-group"></div>');
      newElement.attr('ng-class', '{ "has-error": hasError(), "has-success": hasSuccess() }');
      newElement.append(inputElement);

      // Append validation error messages
      angular.forEach(validations, function(validation, index) {
        var validationMessage = angular.element('<div></div>');
        validationMessage.attr('uib-collapse', 'validate(' + index + ')');
        validationMessage.append('<div class="validation-error">' + validation.message + '</div>');

        newElement.append(validationMessage);
      });

      return newElement;
    }

    return {
      restrict: 'E',
      require: '^form',
      scope: {},
      compile: function($elem, $attrs) {
        var attrs = {};
        var elem;
        var validations;

        angular.merge(attrs, ownAttrs($attrs), completeAttrs($attrs));
        validations = getValidationMessages($elem);
        elem = createStructure(attrs, validations);
        $elem.replaceWith(elem);

        return function($scope, $elem, $attrs, formCtrl) {
          $compile($elem)($scope);

          $scope.validate = function(index) {
            var triggers = validations[index].rules;
            var status = false;

            angular.forEach(triggers, function(trigger) {
              var triggerStatus = formCtrl[attrs.name].$error[removeNg(trigger.name)];
              status = status || (triggerStatus && formCtrl[attrs.name].$dirty);
            });

            return !status;
          }

          $scope.hasError = function() {
            return formCtrl[attrs.name].$invalid && formCtrl[attrs.name].$dirty;
          }

          $scope.hasSuccess = function() {
            return formCtrl[attrs.name].$valid && formCtrl[attrs.name].$dirty;
          }
        }
      }
    }
  }

  angular.module('inputs').directive('myInput', ['$compile', '$filter', myInput]);
})();