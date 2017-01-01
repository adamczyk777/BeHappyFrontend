module.exports = controller;

function controller(TokenStorage, $log, $http, $state) {
  var vm = this;

  vm.registerForm = {
    email: '',
    password: ''
  };

  $http.get("http://TUTAJMABYCENDPOINTODGRZESKA"
  ).then(
    function onSuccess(response) {
      $log.log(response.data.email);
      vm.registerForm.email = response.data.email;
    },
    function onFailure(response) {
      $log.log(response);
      $log.log('ERROR');
      $state.go('app.register');
    }
  );

  $log.log(vm.registerForm);

  // vm.extract = function () {
  //   vm.emailAdress = $stateParams.emailAdress;
  //   return atob(vm.emailAdress);
  // };

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
