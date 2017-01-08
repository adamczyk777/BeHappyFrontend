module.exports = controller;

function controller($scope, $stateParams, $http, $log, api, TokenStorage, $state) {
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
  // var vm = this;
  // $scope.therapyId = $stateParams.therapyId;
  $http({
    method: 'GET',
    url: api.endpoint + '/therapies'
  }).then(function successCallback(response) {
    $scope.therapies = response.data;
  }, function errorCallback(response) {
    $log("Cannot get data from server.");
    $log(response);
  });
  // Hardcoded till authentication will work
  $scope.therapies = [{name: "Therapy 1", id: 1}, {name: "Therapy 2", id: 2}, {name: "Therapy 3", id: 3}];
  $log.log($scope.therapies[1].name, $scope.therapies[1].id);
  $scope.therapyId = $stateParams.therapyId;

  $scope.changeName = function (newName) {
    $log.log("Trying to change therapy name");
    $log.log(newName);
    $http({
      method: 'POST',
      url: "http://localhost:8080/api/therapies/#", // TODO waiting for endpoint
      data: {name: newName, id: $scope.therapyId}
    }).then(function successCallback(response) {
      $log.log("Therapy name changed");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };

  $scope.deleteTherapy = function () {
    $log.log("Trying to delete therapy");
    $http({
      method: 'POST',
      url: "http://localhost:8080/api/therapies/#", // TODO waiting for endpoint
      data: {id: $scope.therapyId}
    }).then(function successCallback(response) {
      $log.log("Therapy deleted");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
}
