module.exports = controller;

function controller($scope, $stateParams, $http, $log) {
  // var vm = this;
  $scope.therapyId = $stateParams.therapyId;

  $http({
    method: 'GET',
    url: 'http://localhost:8080/api/therapies'
  }).then(function successCallback(response) {
    $scope.therapies = response.data;
  }, function errorCallback(response) {
    $log("Cannot get data from server.");
    $log(response);
  });
}
