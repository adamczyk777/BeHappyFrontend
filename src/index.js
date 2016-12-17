var angular = require('angular');
require('angular-ui-router');
require('./index.scss');

var routesConfig = require('./routes');
var authController = require('./modules/auth/controller');
var homeController = require('./modules/home/controller');
var therapiesService = require('./services/therapies.service');
var registerController = require('./modules/register/controller');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .controller('AuthController', authController)
  .controller('HomeController', homeController)
  .factory('TherapiesService', therapiesService)
  .controller('RegisterController', registerController);
