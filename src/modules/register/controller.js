module.exports = controller;

function controller(TokenStorage, $log, $http, $state) {
  var vm = this;

  vm.registerForm = {
    email: '',
    password: ''
  };

  vm.register = function () {
    $http.post("http://137.74.113.225:8081/api/user/register", vm.registerForm) // TODO endpoint
      .then(
        function successCallback(response) {
          $log.log("Poszło, Uff... xD");
          TokenStorage.store(response.data.token);
          $state.go('app.home');
        },
        function failureCallback(response) {
          $log.log("Mamy błąd :/");
          $log.log(response);
          $log.log(vm.registerForm);
        });
  };
}
