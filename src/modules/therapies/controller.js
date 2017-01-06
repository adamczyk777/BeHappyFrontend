module.exports = controller;

function controller($scope, $stateParams, $http, $log, api) {
  // var vm = this;
  // $scope.therapyId = $stateParams.therapyId;
  $scope.therapyShow = 0;
  $scope.therapies = [];

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
  // $scope.getTherapies();
  $scope.therapies.push({name: "Therapy 1", id: 1}, {name: "Therapy 2", id: 2}, {name: "Therapy 3", id: 3});
  $log.log($scope.therapies);
  $scope.therapyId = $stateParams.therapyId;

  $scope.changeName = function (newName) {
    $log.log("Trying to change therapy name");
    $log.log(newName);
    $http({
      method: 'POST',
      url: api.endpoint + '/therapies' + $scope.therapyId, // TODO waiting for endpoint
      data: {name: newName, beginningDate: null, role: null}
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
