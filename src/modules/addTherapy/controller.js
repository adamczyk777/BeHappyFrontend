module.exports = controller;
var moment = require('moment');
/* @ngInject */
function controller($scope, $http, $log, $state, api) {
  // vm = this;
  $scope.formModel = {};
  $scope.roleModel = {};

  $scope.onSubmit = function () {
    $scope.localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
    $scope.date = moment($scope.formModel.beginningDate).format($scope.localFormat);
    $scope.toSend = {
      name: $scope.formModel.name,
      beginningDate: $scope.date,
      role: $scope.formModel.role
    };
    $log.log($scope.toSend.name);
    $log.log($scope.toSend.beginningDate);
    $log.log($scope.toSend.role);
    $http({
      method: 'POST',
      url: api.endpoint + '/therapies',
      data: $scope.toSend
    }).then(function successCallback() {
      $state.reload();
      $log.log("Submitted!");
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
}
