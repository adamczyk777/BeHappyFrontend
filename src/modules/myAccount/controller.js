module.exports = controller;

function controller(TokenStorage, $state, $log, $http, api) {
  var vm = this;
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }



}
