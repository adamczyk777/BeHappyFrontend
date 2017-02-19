module.exports = controller;

function controller(TokenStorage, $state, $log, $http, api) {
  var vm = this;

  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }

  vm.dataForm = {
    newEmail: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmed: ''
  };

  vm.changePersonalData = function () {
    $log.log("Trying to change personal data");
    $log.log(vm.dataForm.newEmail);
    $log.log(vm.dataForm.currentPassword);
    $log.log(vm.dataForm.newPassword);
    $log.log(vm.dataForm.newPasswordConfirmed);
    if (vm.dataForm.newEmail === '') { // xD
      delete vm.dataForm.newEmail;
    }
    if (vm.dataForm.newPassword === '') { // xD
      delete vm.dataForm.newPassword;
    }
    if (vm.dataForm.newPasswordConfirmed === '') { // xD
      delete vm.dataForm.newPasswordConfirmed;
    }
   // walkclean(); // removes empty variables ALE NIE DZIALA TEN SPOSOB WTF
    $log.log(vm.dataForm);
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
      $log.log("Something went wrong");
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
  // function walkclean() { // CZEMU TO NIE DZIALA ??!?!?!?!?!?!? IF STATEMENT
  //   for (var k = 0; k < vm.dataForm.length; k++) {
  //     var v = vm.dataForm[k];
  //     $log.log(vm.dataForm[k]);
  //     if (v.length === 0) { // xD NIE DZIALA JAK JEST PUSTY STRING WTFFFFF
  //       $log.log("dupa dupa dupa");
  //       delete vm.dataForm[k];
  //     }
  //   }
  // }
}
