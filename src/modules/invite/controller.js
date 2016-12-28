module.exports = controller;

function controller(TokenStorage, $log, $http, $state, $stateParams) {
  var vm = this;

  vm.extract = function () {
    vm.emailAdress = $stateParams.emailAdress;
    return atob(vm.emailAdress);
  };

  vm.registerForm = {
    email: vm.extract(),
    password: ''
  }; //koment

  vm.register = function () {
    $http.post("http://localhost:8080/api/user/register", vm.registerForm) // TODO endpoint
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
