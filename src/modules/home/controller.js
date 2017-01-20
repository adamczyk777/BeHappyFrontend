module.exports = controller;
/* @ngInject */
function controller(TokenStorage, $state, $log, $http, api) {
  var vm = this;
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
  vm.logout = function () {
    TokenStorage.clear();
    $state.go('app.login');
  };
  vm.checkInterceptor = function () {
    $http.get(api.endpoint + '/test/secure')
      .then(function successCallback() {
        $log.log('secure endpoint is accessible');
      }, function errorCallback() {
        $log.log(TokenStorage.retrieve());
        $log.log('not working :o');
      });
  };
  vm.edit = function () {
    $state.go('app.myAccount');
  };
}
