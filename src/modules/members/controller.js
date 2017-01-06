module.exports = controller;

function controller($scope, $stateParams, $http, $log, api) {
  $scope.therapyId = $stateParams.therapyId;
  $scope.isHidden = 0;

  $http({
    method: 'GET',
    url: api.endpoint + "/therapies/" + $scope.therapyId + "/members"
  }).then(function successCallback(response) {
    if (response.data === null) {
      $log("Data is null");
    } else {
      $log(response.data[0].email);
      $scope.test = 1;
    }
    $scope.patients = response.data;
   /* $scope.patients[$scope.patients.length] = {email: "1234@gmail.com", role: "WARDEN"};
    $scope.patients[$scope.patients.length] = {email: "eloelo@poczta.onet.pl", role: "THERAPIST"};
    $scope.patients[$scope.patients.length] = {email: "hello@interia.pl", role: "PATIENT"}; */
  }, function errorCallback(response) {
    $log.log("Cannot display members of your therapy");
    $log.log(response);
  });

  $scope.patients = [{email: "1234@gmail.com", role: "WARDEN"}, {email: "eloelo@poczta.onet.pl", role: "THERAPIST"},
    {email: "hello@interia.pl", role: "PATIENT"}];
  $log.log($scope.patients[1]);

  $scope.deleteUser = function (user) {
    $log.log("Trying to delete user " + user.email + "!");
    $http({
      method: 'POST',
      url: "http://localhost:8080/api/therapies/#",    /* TODO waiting for endpoint*/
      data: user
    }).then(function successCallback(response) {
      $log.log("User deleted!");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };

  $scope.addUser = function (userEmail, role) {
    $log.log("Assigned!");
    $scope.message = {role: role, email: userEmail};
    $log.log($scope.message.role);
    $log.log($scope.message.email);
    $http({
      method: 'POST',
      url: api.endpoint + "/therapies/" + $scope.therapyId + "/members",
      data: $scope.message
    }).then(function successCallback(response) {
      $log.log("Submitted!");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };

  $scope.isWarden = function (role) {
    return (role === "WARDEN");
  };
  $scope.addPermission = function () {

  };

  $scope.hidePatientsList = function () {
    $scope.isHidden = ($scope.isHidden === 0) ? 1 : 0;
  };
}
