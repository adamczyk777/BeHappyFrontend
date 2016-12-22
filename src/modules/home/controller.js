module.exports = controller;

function controller(TokenStorage, $state) {
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
}
