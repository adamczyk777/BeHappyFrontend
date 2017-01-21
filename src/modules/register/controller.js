module.exports = controller;
/* @ngInject */
function controller(TokenStorage, $log, $http, $state, api) {
  var vm = this;

  vm.registerForm = {
    email: '',
    password: ''
  };

  vm.register = function () {
    $http.post(api.endpoint + "/users", vm.registerForm) // TODO endpoint
      .then(
        function successCallback() {
          $log.log("Request Sent");
          // TokenStorage.store(response.data.token);
          // $state.go('app.home');
        },
        function failureCallback(response) {
          $log.log("Error while sending");
          $log.log(response);
          $log.log(vm.registerForm);
        });
  };
}
