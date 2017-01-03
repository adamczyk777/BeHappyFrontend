module.exports = controller;

function controller(TokenStorage, $state) {
  var vm = this;
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
  vm.logout = function () {
    TokenStorage.clear();
  };
}
