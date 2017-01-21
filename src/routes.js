module.exports = routesConfig;
/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      template: require('./modules/layout.html'),
      controller: 'TherapiesController',
      controllerAs: 'vm'
    })
    .state('app.home', {
      url: '/',
      controller: 'HomeController',
      controllerAs: 'vm',
      template: require('./modules/home/view.html')
    })
    .state('login', {
      url: '/login',
      controller: 'LoginController',
      controllerAs: 'vm',
      template: require('./modules/login/view.html')
    })
    .state('invitation', {
      url: '/register/{userId}',
      controller: 'RegisterController',
      controllerAs: 'vm',
      template: require('./modules/register/view.html')
    })
    .state('register', {
      url: '/register',
      controller: 'RegisterController',
      controllerAs: 'vm',
      template: require('./modules/register/view.html')
    })
    .state('app.therapies', {
      url: '/therapies/{therapyId}',
      controller: 'TherapiesController',
      controllerAs: 'vm',
      template: require('./modules/therapies/view.html')
    })
    .state('app.addTherapy', {
      url: '/addTherapy',
      controller: 'AddTherapyController',
      controllerAs: 'vm',
      template: require('./modules/addTherapy/view.html')
    })
    .state('app.mood', {
      url: '/mood/{therapyId}',
      controller: 'MoodController',
      controllerAs: 'vm',
      template: require('./modules/mood/view.html')
    })
    .state('app.activity', {
      url: '/activity/{therapyId}',
      controller: 'ActivityController',
      controllerAs: 'vm',
      template: require('./modules/activity/view.html')
    })
    .state('app.stats', {
      url: '/stats/{therapyId}',
      controller: 'StatsController',
      controllerAs: 'vm',
      template: require('./modules/stats/view.html')
    })
    .state('app.invite', {
      url: '/invite/{userId}',
      controller: 'InviteController',
      controllerAs: 'vm',
      template: require('./modules/invite/view.html')
    })
    .state('app.members', {
      url: '/therapies/{therapyId}/members',
      controller: 'MembersController',
      controllerAs: 'vm',
      template: require('./modules/members/view.html')
    })
    .state('confirmation', {
      url: '/users/confirm/{id}',
      controller: 'ConfirmationController',
      controllerAs: 'vm',
      template: require('./')
    })
    .state('app.personalization', {
      url: '/therapies/{therapyId}/personalization',
      controller: 'TherapiesController',
      controllerAs: 'vm',
      template: require('./modules/personalization/view.html')
    });
}
