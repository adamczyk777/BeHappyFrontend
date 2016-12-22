var angular = require('angular');
require('angular-ui-router');
require('./index.scss');

var routesConfig = require('./routes');
var regiserController = require('./modules/register/controller');
var loginController = require('./modules/login/controller');
var tokenStorageService = require('./services/tokenStorage.service');
var tokenAuthInterceptor = require('./services/tokenAuthInterceptor.service');
var loginService = require('./services/login.service');
var homeController = require('./modules/home/controller');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .controller('RegisterController', regiserController)
  .controller('LoginController', loginController)
  .controller('HomeController', homeController)
  .factory('TokenStorage', tokenStorageService)
  .factory('TokenAuthInterceptor', tokenAuthInterceptor)
  .factory('LoginService', loginService);
