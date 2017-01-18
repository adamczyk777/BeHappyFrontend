module.exports = controller;
/** @ngInject */
function controller($resource, TestService, $scope, $log) {
  // var vm = this;

  $scope.therapies = TestService.getTherapies().$promise
    .then(function successCallback(response) {
      $scope.therapies = response.data;
      $scope.therapyName = $scope.findTherapyName();
      $log.log($scope.therapies);
      $log.log($scope.therapyName);
    }, function errorCallback(response) {
      $log.log("Cannot get data from server.");
      $log.log(response);
    });

  $scope.members = TestService.getMembers().$promise
    .then(function successCallback(response) {
      if (response.data === null) {
        $log.log("Data is null");
      } else {
        $log.log(response.data[0]);
        $scope.test = 1;
      }
      $scope.patients = response.data;
    }, function errorCallback(response) {
      $log.log("Cannot display members of your therapy");
      $log.log(response);
    });

  $log.log($scope.therapies);
  $log.log($scope.members);
}
