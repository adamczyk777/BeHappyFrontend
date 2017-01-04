module.exports = controller;

function controller(TokenStorage, $state, $log, $http, api) {
  var vm = this;
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
// vm = this;
  $scope.changeAddress = function (newAddress) {
    $log.log("Trying to change address");
    $log.log(newAddress);
    $http({
      method: 'POST',
      url: "http://localhost:8080/api//#", // TODO endpoint
      data: {name: newAddress, id: $scope.}
    }).then(function successCallback(response) {
      $log.log("Address changed");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
  $scope.changeName = function (newName) {
    $log.log("Trying to change name");
    $log.log(newName);
    $http({
      method: 'POST',
      url: "http://localhost:8080/api//#", // TODO endpoint
      data: {name: newAddress, id: $scope.}
    }).then(function successCallback(response) {
      $log.log("Address changed");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };


  $scope.deleteUser = function () {
    $log.log("Trying to delete user");
    $http({
      method: 'POST',
      url: "http://localhost:8080/api/user/#", // TODO endpoint
      data: {id: $scope.therapyId}
    }).then(function successCallback(response) {
      $log.log("User deleted");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
}
