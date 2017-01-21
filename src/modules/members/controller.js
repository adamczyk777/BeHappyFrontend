module.exports = controller;
/** @ngInject */

function controller($state, $scope, $stateParams, $http, $log, api, TokenStorage) {
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
      $log.log(response.data[0].email);
    }
    $scope.myRole = response.data;
    $log.log($scope.myRole);
  }, function errorCallback(response) {
    $log.log("Cannot display members of your therapy");
    $log.log(response);
  });

  // $log.log($scope.patients[1]);

  $scope.deleteUser = function (user) {
    $log.log("Trying to delete user " + user.email + "!");
    $http({
      method: 'DELETE',
      url: api.endpoint + "/therapies/" + $scope.therapyId + "/members",    /* TODO waiting for endpoint*/
      data: user.email
    }).then(function successCallback(response) {
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
      $log.log("Submitted!");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
  // TODO waiting for endpoint
  $scope.canAdd = function () {
    return !($scope.myRole === "WARDEN");
    // return true;
  };
  // TODO waiting for endpoint
  $scope.canDelete = function () {
    return ($scope.myRole === "PATIENT");
    // return true;
  };

  $scope.isWarden = function (role) {
    return (role === "WARDEN");
  };

  // TODO waiting for endpoint
  $scope.addPermission = function (user) {
    $log.log("Adding permission!");
    $http({
      method: 'POST',
      url: api.endpoint + "/therapies/" + $scope.therapyId + "/members/permission",
      data: user.email
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
