module.exports = controller;
/** @ngInject */
function controller($log, $http, $stateParams, $state, api) {
  var vm = this;
  vm.needEmail = 1;
  var uri = '';
  vm.registerForm = {
    email: '',
    password: ''
  };

  $log.log($stateParams.userId);
  $log.log(angular.isDefined($stateParams.userId));

  $log.log(uri);

  if (angular.isDefined($stateParams.userId)) {
    vm.needEmail = 0;
  }

  vm.register = function () {
    if (vm.needEmail) {
      uri = api.endpoint + "/users";
      vm.sendForm = {email: vm.registerForm.email, password: vm.registerForm.password};
      $http.post(uri, vm.sendForm)
        .then(
          function successCallback() {
            $log.log("Request Sent");
          },
          function failureCallback(response) {
            $log.log("Error while sending");
            $log.log(response);
            $log.log(vm.sendForm);
          });
    } else {
      uri = api.endpoint + '/users/invite/' + $stateParams.userId;
      vm.sendForm = {password: vm.registerForm.password};
      $log.log("sendForm:");
      $log.log(vm.sendForm);
      $http.post(uri, vm.sendForm)
        .then(
          function successCallback() {
            $log.log("Request Sent");
            $state.go('login');
          },
          function failureCallback(response) {
            $log.log("Error while sending");
            $log.log(response);
            $log.log(vm.sendForm);
          });
    }
    $log.log(vm.sendForm);
  };
}
