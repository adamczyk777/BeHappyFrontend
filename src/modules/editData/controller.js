module.exports = controller;

function controller(TokenStorage, $state, $log, $http, api) {
  var vm = this;

  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }

  vm.dataForm = {
    email: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmed: ''
  };

  vm.changePersonalData = function () {
    $log.log("Trying to change personal data");
    $http({
      method: 'PATCH',
      url: api.endpoint + '/users/edit',
      data: vm.dataForm
    }).then(function successCallback(response) {
      $log.log("Data changed");
      $log.log(response);
      TokenStorage.store(response.data.token);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
/*
 vm.deleteUser = function () {
    $log.log("Trying to delete user");
    $http({
      method: 'DELETE',
    //  url: "http://localhost:8080/api/user/#", // TODO endpoint
   //   data: {id: $scope.therapyId}
    }).then(function successCallback(response) {
      $log.log("User deleted");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };*/
}
