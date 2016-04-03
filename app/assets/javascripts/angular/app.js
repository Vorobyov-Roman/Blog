(function() {
  'use strict';

  angular.module('utility', []);
  angular.module('validators', ['utility']);
  angular.module('app', ['ngRoute', 'templates', 'validators', 'utility']);
})();

//= require_tree ./config
//= require_tree ./services
//= require_tree ./controllers
//= require_tree ./directives
