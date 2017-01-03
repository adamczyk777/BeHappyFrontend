module.exports = controller;

function controller($scope, $stateParams, $log, $http, api) { //  moment)
  $scope.therapyId = $stateParams.therapyId;

  // Daty dla kalendarza:
  $scope.now = new Date();
  $scope.minDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate() - 7);
  $scope.maxDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate());

  $scope.localFormat = 'YYYY-MM-DD';
 // obiekt, do którego widok przyczepia dane do wysłania:
  $scope.formModel = {
    date: $scope.now,
    mark: null
  };

  $scope.submitForm = function () {  // wysyła dane z formularza (nie wiem jak to ma do końca wyglądać)
    $scope.toSend = {
      date: $scope.formModel.date,
      mark: parseInt($scope.formModel.mark, 10)
    };
   // $scope.toSend.date = moment($scope.formModel.date).format($scope.localFormat);
  // TODO linijka powyzej wykrzacza angulara. Ogarnac dependencies (moment.js)
    $http({
      method: 'POST',
      url: api.endpoint + '/stats/' + $scope.therapyId,
      data: $scope.toSend
    }).then(function successCallback(response) {
      $log("Submitted! " + response);
    }, function errorCallback(response) {
      $log("Http error status code:" + response.status.toString());
    });
  };
}
