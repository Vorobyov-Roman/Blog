(function() {
  'use strict';

  angular.module('validators', []);
  angular.module('app', ['ngRoute', 'templates', 'validators']);
})();

//= require_tree ./config
//= require_tree ./services
//= require_tree ./controllers
//= require_tree ./directives
