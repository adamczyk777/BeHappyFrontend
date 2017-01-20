module.exports = controller;
var moment = require('moment');
/** @ngInject */
function controller($scope, $stateParams, $log, $http, api, $state, TokenStorage) {
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }
  $scope.therapyId = $stateParams.therapyId;

  // slider:
  $scope.slider = {
    value: 10
  };

  // Daty dla kalendarza:
  $scope.minDate = moment().subtract(7, 'd').format('YYYY-MM-DD'); // data 7 dni wczesniej
  $scope.maxDate = moment().format("YYYY-MM-DD"); // dzisiejsza data

 // obiekt, do którego widok przyczepia dane do wysłania:
  $scope.formModel = {
    date: $scope.maxDate, // jesli nie wybrano daty domyslna to dzisiejsza
    mark: null,
    fears: null
  };

  $scope.sendMood = function () {
    $scope.toSend = {
      date: $scope.formModel.date,
      mark: parseInt($scope.formModel.mark, 10)
    };

    $http({
      method: 'POST',
      url: api.endpoint + $scope.therapyId,
      data: $scope.toSend
    }).then(function successCallback(response) {
      $log.log("Submitted! " + response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
}
