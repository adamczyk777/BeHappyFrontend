module.exports = controller;
/** @ngInject */
function controller(TokenStorage, $log, $http, $state, $stateParams, $scope, api) {
  var vm = this;
  var uri = api.endpoint + "/users/register";
  $scope.needEmail = 1;

  if ($stateParams.userId !== angular.isUndefined) {
    uri = api.endpoint + '/users/invite/' + $stateParams.userId;
    $scope.needEmail = 1;
  }
  vm.registerForm = {
    email: '',
    password: ''
  };

  vm.register = function () {
    $http.post(uri, vm.registerForm) // TODO endpoint
      .then(
        function successCallback() {
          $log.log("Request Sent");
          // TokenStorage.store(response.data.token);
          // $state.go('app.home');
        },
        function failureCallback(response) {
          $log.log("Error while sending");
          $log.log(response);
          $log.log(vm.registerForm);
        });
  };
}
