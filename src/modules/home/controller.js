module.exports = controller;

function controller($log, TokenStorage, $http) {
  var vm = this;

  vm.login = function () {
    var config = {};
    config.headers = {};
    config.headers.Authorization = vm.emailField + ":" + vm.passwordField;
    $http.get(
      "http://localhost:8080/api/user/login",
      {headers: {Authorization: btoa(vm.emailField + ":" + vm.passwordField)}}
    ).then(
      function onSuccess(response) {
        $log.log(response.data.token);
        TokenStorage.store(response.data.token);
      },
      function onFailure(response) {
        $log.log(response);
        $log.log(TokenStorage.retrieve());
      }
    );
  };
}
