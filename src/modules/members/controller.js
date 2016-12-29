module.exports = controller;

function controller($scope, $stateParams, $http, $log) {
  $scope.therapyId = $stateParams.therapyId;

  $scope.getMembers = function () {
    $http({
      method: 'GET',
      url: "http://localhost:8080/api/therapies/" + $scope.thId + "/members"
    }).then(function successCallback(response) {
      if (response.data === null) {
        $log("Data is null");
      } else {
        $log(response.data[0].email);
        $scope.test = 1;
      }

      $scope.patients = response.data;
      $scope.patients[$scope.patients.length] = {email: "1234@gmail.com"};
      $scope.patients[$scope.patients.length] = {email: "eloelo@poczta.onet.pl"};
      $scope.patients[$scope.patients.length] = {email: "hello@interia.pl"};
    }, function errorCallback(response) {
      $log("Cannot display members of your therapy");
      $log(response);
    });
  };
}
