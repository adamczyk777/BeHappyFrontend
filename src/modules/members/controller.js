module.exports = controller;
/** @ngInject */
function controller($scope, $stateParams, $http, $log, $state, api, TokenStorage) {
  if (!TokenStorage.isAuthenticated()) {
    $state.go('login');
  }

  $scope.therapyId = $stateParams.therapyId;
  $scope.isHidden = 0;

  $http({
    method: 'GET',
    url: api.endpoint + "/therapies/" + $scope.therapyId + "/members"
  }).then(function successCallback(response) {
    if (response.data === null) {
      $log.log("Data is null");
    } else {
      $log.log(response.data);
      $scope.test = 1;
    }
    $scope.patients = response.data;
  }, function errorCallback(response) {
    $log.log("Cannot display members of your therapy");
    $log.log(response);
  });

  $http({
    method: 'GET',
    url: api.endpoint + "/therapies/" + $scope.therapyId + "/role" // TODO waiting for endpoint
  }).then(function successCallback(response) {
    if (response.data === null) {
      $log.log("Data is null");
    } else {
      $log.log("Got my role");
      $log.log(response.data);
    }
    $log.log("WHO I AM?");
    $scope.whoIAm = response.data;
    $log.log($scope.whoIAm);
  }, function errorCallback(response) {
    $log.log("Cannot display members of your therapy");
    $log.log(response);
  });

  // $log.log($scope.patients[1]);

  $scope.deleteUser = function (user) {
    $log.log("Trying to delete user " + user.email + "!");
    $http({
      method: 'POST',
      url: api.endpoint + "/therapies/" + $scope.therapyId + "/remove",    /* TODO waiting for endpoint*/
      data: {email: user.email}
    }).then(function successCallback(response) {
      $state.reload();
      $log.log("User deleted!");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };

  $scope.addUser = function (userEmail, role) {
    $log.log("Assigned!");
    $scope.message = {email: userEmail, role: role};
    $log.log($scope.message);
    $http({
      method: 'POST',
      url: api.endpoint + "/therapies/" + $scope.therapyId + "/members",
      data: $scope.message
    }).then(function successCallback(response) {
      $state.reload();
      $log.log("Submitted!");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
  // TODO waiting for endpoint
  $scope.canAdd = function () {
    $log.log("CAN ADD???");
    $log.log(((!($scope.whoIAm.role === "WARDEN")) || $scope.whoIAm.creator));
    $log.log("myrole???");
    $log.log($scope.whoIAm.role === "WARDEN");
    return ((!($scope.whoIAm.role === "WARDEN")) || $scope.whoIAm.creator);
    // return true;
  };
  // TODO waiting for endpoint
  $scope.canDelete = function () {
    return ($scope.whoIAm.creator || ($scope.whoIAm.role === "PATIENT"));
    // return true;
  };
  $scope.canAddPermission = function (patientRole) {
    return ($scope.whoIAm.role === "PATIENT" && patientRole === "WARDEN");
  };

  $scope.isWarden = function (role) {
    return (role === "WARDEN");
  };

  // TODO waiting for endpoint
  $scope.addPermission = function (user) {
    $log.log("Adding permission!");
    $http({
      method: 'POST',
      url: api.endpoint + "/therapies/" + $scope.therapyId + "/assignSpecial",
      data: {email: user.email}
    }).then(function successCallback(response) {
      $log.log("Submitted!");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };

  $scope.hidePatientsList = function () {
    $scope.isHidden = ($scope.isHidden === 0) ? 1 : 0;
  };
}
