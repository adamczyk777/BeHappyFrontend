var angular = require('angular');
require('angular-ui-router');
require('./index.scss');

var routesConfig = require('./routes');
var authController = require('./modules/auth/controller');
var homeController = require('./modules/home/controller');
var therapiesController = require('./modules/therapies/controller');
var statsController = require('./modules/stats/controller');
var addTherapyController = require('./modules/addTherapy/controller');
var therapiesService = require('./services/therapies.service');
var tokenStorageService = require('./services/tokenStorage.service');
var tokenAuthInterceptor = require('./services/tokenAuthInterceptor.service');
var loginService = require('./services/login.service');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .controller('AuthController', authController)
  .controller('HomeController', homeController)
  .controller('StatsController', statsController)
  .controller('TherapiesController', therapiesController)
  .controller('addTherapyController', addTherapyController)
  .factory('TherapiesService', therapiesService)
  .factory('TokenStorage', tokenStorageService)
  .factory('TokenAuthInterceptor', tokenAuthInterceptor)
  .factory('LoginService', loginService);
