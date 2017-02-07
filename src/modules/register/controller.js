module.exports = controller;
/** @ngInject */
function controller($log, $http, $stateParams, api) {
  var vm = this;
  var uri = api.endpoint + "/users";
  vm.needEmail = 1;
  vm.registerForm = {
    email: '',
    password: ''
  };

  $log.log($stateParams.userId);
  $log.log(angular.isDefined($stateParams.userId));
  if (angular.isDefined($stateParams.userId)) {
    uri = api.endpoint + '/users/invite/' + $stateParams.userId;
    vm.registerForm.email = 'eloelo@onet.pl';
    vm.needEmail = 0;
  }

  $log.log(uri);

  vm.register = function () {
    $log.log(vm.registerForm);
    $http.post(uri, vm.registerForm)// TODO endpoint
      .then(
        function successCallback() {
          $log.log("Request Sent");
        },
        function failureCallback(response) {
          $log.log("Error while sending");
          $log.log(response);
          $log.log(vm.registerForm);
        });
  };
}
