module.exports = controller;
/** @ngInject */
function controller($log, $state, $http, $stateParams) {
  var vm = this;
  vm.id = $stateParams.id;
  $http.get('http://behappy.io:8081/api/users/confirm/' + vm.id)
    .then(
      function successCallback() {
        $log.log('account confirmed!');
        $state.go('login');
      },
      function failureCallback() {
        $log.log('something is wrong with this :/');
      }
    );
}
