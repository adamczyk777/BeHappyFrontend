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
    });
}
