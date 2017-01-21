module.exports = controller;
var moment = require('moment');
/** @ngInject */
function controller($scope, $stateParams, $log, $http, api, $state, TokenStorage) {
  if (!TokenStorage.isAuthenticated()) {
    $state.go('login');
  }
  $scope.therapyId = $stateParams.therapyId;

  $scope.showForm = {
    buttonSave: false,
    anxietyQuestion: true,
    anxietySlider: false
  };

  // slider:
  $scope.moodSlider = {
    mark: 5,
    options: {
      floor: 1,
      ceil: 10,
      step: 1,
      showTicksValues: 1,
      showSelectionBar: true
    }
  };

  $scope.anxietySlider = {
    fear: 5,
    options: {
      floor: 1,
      ceil: 10,
      step: 1,
      showSelectionBar: true
    }
  };

  // Daty dla kalendarza:
  // moment().subtract(7, 'd').format('YYYY-MM-DD'); // data 7 dni wczesniej
  // moment().format("YYYY-MM-DD"); // dzisiejsza data
  $scope.now = new Date();
  $scope.minDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate() - 31).toString(); // TODO: do zmiany, na razie 31 dni wstecz, pozniej ma byc od poczatku terapii
  $scope.maxDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate()).toString();

  // leki:
  $scope.showAnxiety = function () { // funkcja wyswietla dodatkowy formularz
    $scope.showForm.anxietySlider = true;
    $scope.showForm.anxietyQuestion = false;
    $scope.showForm.buttonSave = true;
  };

  $scope.noAnxiety = function () { // hiding question if there were no fears and display send button
    $scope.showForm.buttonSave = true;
    $scope.showForm.anxietyQuestion = false;
  };

  // show save

 // obiekt, do którego widok przyczepia dane do wysłania:
  $scope.formModel = {
    date: $scope.maxDate, // jesli nie wybrano daty domyslna to dzisiejsza
    mark: null,
    fears: null
  };

  $scope.sendMood = function () {
    $scope.toSend = {
      date: $scope.formModel.date,
      mark: parseInt($scope.moodSlider.mark, 10),
      fears: parseInt($scope.anxietySlider.fear, 10)
    };
    $scope.toSend.date = moment($scope.formModel.date).format("YYYY-MM-DD"); // obcinanie godziny
    $log.log("date: " + $scope.toSend.date);
    $log.log("mark: " + $scope.toSend.mark);
    $log.log("fears: " + $scope.toSend.fears);
    $http({
      method: 'POST',
      url: api.endpoint + '/stats/' + $scope.therapyId,
      data: $scope.toSend
    }).then(function successCallback(response) {
      $log.log("Submitted! " + response);
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
}
