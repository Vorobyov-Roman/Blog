(function() {
  'use strict';

  angular.module('utility', []);
  angular.module('inputs', ['utility']);
  angular.module('app', ['ngRoute', 'templates', 'inputs', 'utility', 'ui.bootstrap']);
})();

//= require_tree ./config
//= require_tree ./misc
//= require_tree ./services
//= require_tree ./controllers
//= require_tree ./directives

