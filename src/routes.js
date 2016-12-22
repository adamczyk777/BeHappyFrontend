module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      template: require('./modules/layout.html')
    })
    .state('app.home', {
      url: '/',
      controller: 'HomeController',
      controllerAs: 'vm',
      template: require('./modules/home/view.html')
    })
    .state('app.auth', {
      url: '/auth',
      controller: 'authController',
      controllerAs: 'vm',
      template: require('./modules/auth/view.html')
    })

    .state('app.therapies', {
      url: '/therapies/:therapy_id',
      controller: 'TherapiesController',
      controllerAs: 'vm',
      template: require('./modules/therapies/view.html')
    })
    .state('app.stats', {
      url: '/stats',
      controller: 'StatsController',
      controllerAs: 'vm',
      template: require('./modules/stats/view.html')
    });
}
