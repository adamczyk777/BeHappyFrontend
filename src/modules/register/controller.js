module.exports = controller;
/** @ngInject */
function controller($log, $http, $stateParams, api) {
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

      $http({
        method: 'GET',
        url: uri
      }).then(function successCallback(response) {
        $log.log("GET POSZEDŁ");
        $log.log(response.data);
      }, function errorCallback(response) {
        $log.log("chuj kurwa nie poszedl");
        $log.log(response);
      });

      $http.post(uri, vm.sendForm)// TODO endpoint
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
      uri = api.endpoint + '/users/invites/' + $stateParams.userId;
      vm.sendForm = {password: vm.registerForm.password};
      $log.log("sendForm:");
      $log.log(vm.sendForm);
      $http.put(uri, vm.sendForm)// TODO endpoint
        .then(
          function successCallback() {
            $log.log("Request Sent");
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
