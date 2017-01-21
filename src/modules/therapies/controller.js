module.exports = controller;
/* @ngInject */
function controller($scope, $stateParams, $http, $log, api, TokenStorage, $state) {
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
  // var vm = this;
  $scope.therapyShow = 0;
  $scope.therapies = [];
  $scope.therapyId = $stateParams.therapyId;

  $scope.findTherapyName = function () {
    for (var i = 0; i < $scope.therapies.length; i++) {
      $log.log($scope.therapyId + "===" + $scope.therapies[i].id);
      $log.log("Bool: " + $scope.therapyId === $scope.therapies[i].id);
      $log.log("therapyId type:" + typeof $scope.therapyId);
      var temp = parseInt($scope.therapyId, 10);
      $log.log("temp = " + temp);
      if (temp === $scope.therapies[i].id) {
        $log.log("therapy found!");
        return $scope.therapies[i].name;
      }
    }
  };
  $scope.getTherapies = function () {
    $http({
      method: 'GET',
      url: api.endpoint + '/therapies'
    }).then(function successCallback(response) {
      $scope.therapies = response.data;
      $scope.therapyName = $scope.findTherapyName();
      $log.log($scope.therapies);
      $log.log($scope.therapyName);
    }, function errorCallback(response) {
      $log.log("Cannot get data from server.");
      $log.log(response);
    });
  };

  $scope.getTherapies();

  $http({
    method: 'GET',
    url: api.endpoint + "/therapies/" + $scope.therapyId + "/role" // TODO waiting for endpoint
  }).then(function successCallback(response) {
    if (response.data === null) {
      $log.log("Data is null");
    } else {
      $log.log(response.data);
      $log.log("GOT MY ROLE!!!");
      $scope.whoIAm = response.data;
      $log.log($scope.whoIAm.role);
    }
    $scope.user = response.data;
  }, function errorCallback(response) {
    $log.log("Cannot display members of your therapy");
    $log.log(response);
  });

  $scope.changeName = function (newName) {
    $log.log("Trying to change therapy name");
    $log.log(newName);
    $http({
      method: 'POST',
      url: api.endpoint + '/therapies/' + $scope.therapyId,
      data: {name: newName, beginningDate: null, role: null}
    }).then(function successCallback(response) {
      $state.reload();
      $log.log($scope.therapies);
      $log.log("Therapy name changed");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };

  $scope.deleteTherapy = function () {
    $log.log("Trying to delete therapy");
    $http({
      method: 'DELETE',
      url: api.endpoint + "/therapies/" + $scope.therapyId
    }).then(function successCallback(response) {
      $state.reload();
      $log.log("Therapy deleted");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log(response);
    });
  };
  // TODO waiting for endpoint
  $scope.canEdit = function () {
    $log.log("AM I PATIENT?");
    $log.log($scope.whoIAm.role === "PATIENT");
    $log.log($scope.whoIAm.role);
    return ($scope.whoIAm.role === "PATIENT");
  };
}
