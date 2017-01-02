module.exports = controller;

function controller(TokenStorage, $log, $http, api, $stateParams, $state) {
  var vm = this;

  vm.extract = function () {
    vm.userId = $stateParams.userId;
    return atob(vm.userId);
  };

  vm.registerForm = {
    email: '',
    password: ''
  };

  $http.get(api.endpoint + "/invite/" + vm.userId
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

  vm.register = function () {
    $http.post(api.endpoint + "/user/register", vm.registerForm) // TODO endpoint
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
