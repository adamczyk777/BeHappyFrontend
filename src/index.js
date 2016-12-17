var angular = require('angular');
require('angular-ui-router');
var routesConfig = require('./routes');
var main = require('./app/main');
require('./index.scss');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .component('app', main);
