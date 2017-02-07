module.exports = controller;
/** @ngInject */
function controller($log, $state, $http) {
  $http.get('http://behappy.io:8081/api/users/confirm/')
    .then(
      function successCallback () {
        $log.log('account confirmed!');
        $state.go('login');
      },
      function failureCallback () {
        $log.log('something is wrong with this :/');
      }
    );
}
