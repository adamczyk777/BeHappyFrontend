module.exports = controller;
/** @ngInject */
function controller($log, $state, $http, $stateParams, $timeout) {
  var vm = this;
  vm.id = $stateParams.id;
  $http.get('http://localhost:8082/api/users/confirm/' + vm.id)
    .then(
      function successCallback() {
        $log.log('account confirmed!');
        $timeout(function () {
          $state.go('login');
        }, 5000);
      },
      function failureCallback() {
        $log.log('something is wrong with this :/');
      }
    );
}
