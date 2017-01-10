module.exports = controller;
/* @ngInject */
function controller(TokenStorage, $state) {
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
  // var vm = this;
}
