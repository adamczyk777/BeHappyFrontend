module.exports = controller;
var moment = require('moment');
/** @ngInject */
function controller($stateParams, $log, $http, api, $state, TokenStorage) {
  if (!TokenStorage.isAuthenticated()) {
    $state.go('login');
  }

  var vm = this;
  vm.therapyId = $stateParams.therapyId;

  vm.showForm = {
    buttonSave: false,
    anxietyQuestion: true,
    anxietySlider: false
  };

  vm.logout = function () {
    TokenStorage.clear();
    $state.go('login');
  };

  // slider:
  vm.moodSlider = {
    mark: 5,
    options: {
      floor: 1,
      ceil: 10,
      step: 1,
      showTicksValues: 1,
      showSelectionBar: true
    }
  };

  vm.anxietySlider = {
    fear: 0,
    options: {
      floor: 1,
      ceil: 10,
      step: 1,
      showTicksValues: 1,
      showSelectionBar: true
    }
  };

  // Daty dla kalendarza:
  // moment().subtract(7, 'd').format('YYYY-MM-DD'); // data 7 dni wczesniej
  // moment().format("YYYY-MM-DD"); // dzisiejsza data
  vm.now = new Date();
  vm.minDate = new Date(vm.now.getFullYear(), vm.now.getMonth(), vm.now.getDate() - 31).toString(); // TODO: do zmiany, na razie 31 dni wstecz, pozniej ma byc od poczatku terapii
  vm.maxDate = new Date(vm.now.getFullYear(), vm.now.getMonth(), vm.now.getDate()).toString();

  // leki:
  vm.showAnxiety = function () { // funkcja wyswietla dodatkowy formularz
    vm.showForm.anxietySlider = true;
    vm.showForm.anxietyQuestion = false;
    vm.showForm.buttonSave = true;
  };

  vm.noAnxiety = function () { // hiding question if there were no fears and display send button
    vm.showForm.buttonSave = true;
    vm.showForm.anxietyQuestion = false;
  };

 // obiekt, do którego widok przyczepia dane do wysłania:
  vm.formModel = {
    date: vm.maxDate, // jesli nie wybrano daty domyslna to dzisiejsza
    mark: 5,
    fear: 0
  };

  vm.sendMood = function () {
    // quickfix
    vm.formModel.date = vm.date;
    vm.toSend = {
      date: moment(vm.formModel.date).format("YYYY-MM-DD"), // vm.formModel.date,
      mark: parseInt(vm.formModel.mark, 10),
      fear: parseInt(vm.formModel.fear, 10)
    };
   //  vm.toSend.date = moment(vm.formModel.date).format("YYYY-MM-DD"); // obcinanie godziny
    $log.log("date: " + vm.toSend.date);
    $log.log("mark: " + vm.torankSend.mark);
    $log.log("fear: " + vm.toSend.fear);
    $log.log(vm.toSend);
    $http({
      method: 'POST',
      url: api.endpoint + '/mood/' + vm.therapyId + '/add',
      data: vm.toSend
    }).then(function successCallback(response) {
      $log.log("Submitted! " + response);
      $state.go('app.therapies', {therapyId: vm.therapyId, page: 1});
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
  };
}
