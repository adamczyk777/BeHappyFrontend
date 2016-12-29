module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        /* eslint-disable */
        views: {
          'layout': {
            template: require('./modules/layout.html')
          },
          'sidebar': {
            template: require('./modules/sidebar/sidebar.html'),
            controller: 'TherapiesController'
          }
        }
        /* eslint-enable */
      })
  /* .state('app', {
      url: '',
      abstract: true,
      template: require('./modules/layout.html')
    }) */
    .state('app.home', {
      url: '/',
      controller: 'HomeController',
      controllerAs: 'vm',
      template: require('./modules/home/view.html')
    })
    .state('app.login', {
      url: '/',
      controller: 'LoginController',
      controllerAs: 'vm',
      template: require('./modules/login/view.html')
    })
    .state('app.register', {
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
      url: '/invite/{emailAdress}',
      controller: 'InviteController',
      controllerAs: 'vm',
      template: require('./modules/invite/view.html')
    })
    .state('app.members', {
      url: '/therapies/{therapyId}/members',
      controller: 'MembersController',
      controllerAs: 'vm',
      template: require('./modules/members/view.html')
    });
}
