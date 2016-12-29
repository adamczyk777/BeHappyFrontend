module.exports = controller;

function controller($scope, $stateParams, $http, $log) {
  // var vm = this;
  // $scope.therapyId = $stateParams.therapyId;
  $http({
    method: 'GET',
    url: 'http://localhost:8080/api/therapies'
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
}
