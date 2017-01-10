module.exports = controller;
/* @ngInject */
function controller(TokenStorage, $log, $http, $state, api) {
  var vm = this;

  vm.registerForm = {
    email: '',
    password: ''
  };

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
