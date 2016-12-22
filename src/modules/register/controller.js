module.exports = controller;

function controller(TokenStorage, $log, $http, $state) {
  var vm = this;

  vm.registerForm = {};

  vm.register = function () {
    $http.post("http://localhost:8080/api/user/register", vm.registerForm) // TODO: edit endpoint to match online server
      .then(
        function successCallback(response) {
          $log.log("Poszło, Uff... xD");
          TokenStorage.store(response.data.token);
          $state.go('app.home');
        },
        function failureCallback(response) {
          $log.log("Mamy błąd :/");
          $log.log(response);
        });
  };
}
