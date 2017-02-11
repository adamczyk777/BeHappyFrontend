module.exports = controller;
/** @ngInject */
function controller($log, $state, $http, $stateParams, $timeout) {
  var vm = this;
  vm.hideCounter = true;
  vm.message = "";
  vm.counter = 5;
  vm.id = $stateParams.id;
  $http.get('http://localhost:8080/api/users/confirm/' + vm.id)
    .then(
      function successCallback() {
        vm.hideCounter = false;
        vm.message = "Rejestracja potwierdzona! :)";
        $log.log('account confirmed!');
        for (var i = 0; i < 5; i++) {
          $timeout(function () {
            vm.counter--;
          }, 1000);
        }
        if (vm.counter === 0) {
          $state.go('login');
        }
      },
      function failureCallback() {
        vm.message = "Rejestracja nie powiodła się! :(";
        $log.log('something is wrong with this :/');
      }
    );
}
