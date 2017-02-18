module.exports = controller;
/** @ngInject */
function controller($log, TokenStorage, $http, api, $state) {
  var vm = this;

  if (TokenStorage.isAuthenticated()) {
    $state.go('app.home', {page: 1});
  }

  vm.loginForm = {
    email: '',
    password: ''
  };

  vm.login = function () {
    var config = {};
    config.headers = {};
    config.headers.Authorization = vm.loginForm.email + ":" + vm.loginForm.password;
    $http.get(
       api.endpoint + "/users/login",
      {headers: {Authorization: btoa(vm.loginForm.email + ":" + vm.loginForm.password)}}
    ).then(
      function onSuccess(response) {
        TokenStorage.store(response.data.token);
        $state.go('app.home', {page: 1});
      },
      function onFailure(response) {
        $log.log(response);
      }
    );
  };
}
