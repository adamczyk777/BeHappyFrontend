var angular = require('angular');
require('angular-ui-router');
require('./index.scss');

var routesConfig = require('./routes');
var registerController = require('./modules/register/controller');
var loginController = require('./modules/login/controller');
var therapiesController = require('./modules/therapies/controller');
var statsController = require('./modules/stats/controller');
var addTherapyController = require('./modules/addTherapy/controller');
var moodController = require('./modules/mood/controller');
var activityController = require('./modules/activity/controller');
var tokenStorageService = require('./services/tokenStorage.service');
var tokenAuthInterceptor = require('./services/tokenAuthInterceptor.service');
var loginService = require('./services/login.service');
var homeController = require('./modules/home/controller');
var inviteController = require('./modules/invite/controller');
var membersController = require('./modules/members/controller');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .controller('RegisterController', registerController)
  .controller('LoginController', loginController)
  .controller('HomeController', homeController)
  .controller('StatsController', statsController)
  .controller('TherapiesController', therapiesController)
  .controller('AddTherapyController', addTherapyController)
  .controller('MoodController', moodController)
  .controller('ActivityController', activityController)
  .controller('InviteController', inviteController)
  .controller('MembersController', membersController)
  .factory('TokenStorage', tokenStorageService)
  .factory('TokenAuthInterceptor', tokenAuthInterceptor)
  .factory('LoginService', loginService);
