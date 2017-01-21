module.exports = controller;
// var moment = require('moment');
/** @ngInject */
function controller($scope, $stateParams, $log, $http, api, $state, TokenStorage) {
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
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
      showSelectionBar: true
    }
  };

  $scope.anxietySlider = {
    mark: 5,
    options: {
      floor: 1,
      ceil: 10,
      step: 1
    }
  };

  // Daty dla kalendarza:
  // moment().subtract(7, 'd').format('YYYY-MM-DD'); // data 7 dni wczesniej
  $scope.minDate = new Date(); // jakos odjac miesiac
  $scope.minDate = $scope.minDate.toString();
  $scope.maxDate = new Date().toString(); // moment().format("YYYY-MM-DD"); // dzisiejsza data

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
      fears: $scope.formModel.fears
    };

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
