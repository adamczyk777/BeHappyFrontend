module.exports = controller;

function controller($log, $http) {
  var vm = this;
  vm.registerForm = {};
  vm.onSubmit = function () {
    $http.post("http://localhost:8080/api/user/register", vm.registerForm) // wysyla to co widzielismy przed chwila
      .then(
        function successCallback(response) {
          $log.log("Poszło, Uff... xD");
          TokenStorage.store(response.data.token);
        },
        function failureCallback(response) {
          $log.log("Mamy błąd :/");
          $log.log(response);
        });
  };
}
