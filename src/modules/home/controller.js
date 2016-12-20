module.exports = controller;

function controller(LoginService) {
  var vm = this;
  vm.login = function () {
    LoginService.login();
  };
}
