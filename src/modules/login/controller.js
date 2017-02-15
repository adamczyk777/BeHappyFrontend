module.exports = controller;
/** @ngInject */
function controller($log, TokenStorage, $http, api, $state) {
  var vm = this;

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
        $log.log(response.data.token);
        TokenStorage.store(response.data.token);
        $state.go('app.home', {page: 1});
      },
      function onFailure(response) {
        $log.log(response);
        $log.log(vm.loginForm);
        $log.log(TokenStorage.retrieve());
      }
    );
  };
}
