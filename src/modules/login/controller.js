module.exports = controller;

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
      api.endpoint + "user/login", // TODO: edit endpoint to make it usabvle with online server
      {headers: {Authorization: btoa(vm.emailField + ":" + vm.passwordField)}}
    ).then(
      function onSuccess(response) {
        $log.log(response.data.token);
        TokenStorage.store(response.data.token);
        $state.go('app.home');
      },
      function onFailure(response) {
        $log.log(response);
        $log.log(TokenStorage.retrieve());
      }
    );
  };
}
