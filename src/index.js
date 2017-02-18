var angular = require('angular');
require('angular-ui-router');
require('./index.scss');
require('angular-animate');
require('chart.js');
require('angular-chart.js');
require('angularjs-slider');
require('angularjs-datepicker');

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
var homeController = require('./modules/home/controller');
var inviteController = require('./modules/invite/controller');
var membersController = require('./modules/members/controller');
var confirmationController = require('./modules/confirmation/controller');
var invitationController = require('./modules/invitation/controller');

/** @ngInject */
angular
  .module('app', ['ui.router', 'ngAnimate', 'chart.js', 'rzModule', '720kb.datepicker'])
  .config(routesConfig)
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenAuthInterceptor');
  })
  .factory('api', function () {
    return {
      endpoint: 'http://localhost:8080/api'
    };
  })
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
  .controller('ConfirmationController', confirmationController)
  .controller('InvitationController', invitationController)
  .factory('TokenStorage', tokenStorageService)
  .factory('TokenAuthInterceptor', tokenAuthInterceptor);
