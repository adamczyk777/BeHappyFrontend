module.exports = controller;
var moment = require('moment');
/** @ngInject */

function controller($stateParams, TokenStorage, $state, $log) {
  if (!TokenStorage.isAuthenticated()) {
    $state.go('login');
  }

  var vm = this;

  vm.therapyId = $stateParams.therapyId;

  vm.formMood = { // domyslne wartosci do zapytania
    startDate: moment().subtract(7, 'd').format('YYYY-MM-DD'),
    endDate: moment().format("YYYY-MM-DD"),
    zones: 7
  };

  vm.changeMoodChart = function () {
    $log.log(vm.formMood.zones);
    vm.formMood.zones = parseInt(vm.formMood.zones, 10);
    if (vm.formMood.zones === 7) {
      vm.moodLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
      vm.moodData = [
        [6, 5, 8, 8, 5, 5, 4],
        [2, 4, 4, 1, 8, 2, 9]
      ];
    } else if (vm.formMood.zones === 31) { // miesiac
      vm.moodLabels = ["week 1", "week 2", "week 3", "week 4"];
      vm.moodData = [
        [6, 5, 8, 8],
        [2, 4, 4, 1]
      ];
    } else if (vm.formMood.zones === 12) { // rok
      vm.moodLabels = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paz", "Lis", "Gru"];
      vm.moodData = [
        [6, 5, 8, 8, 5, 5, 4, 2, 1, 1, 2, 3],
        [2, 4, 4, 1, 8, 2, 9, 1, 1, 2, 3, 2]
      ];
    }
    /* $scope.toSend = {  // to bedzie dzialac kiedys i pobierac dane z bazy, na razie powyzej jest hard-coded
     startDate: $scope.formModel.startDate,
     endDate: $scope.formModel.endDate,
     zones: $scope.formModel.zones
     };*/
    /*
     $http({
     method: 'GET',
     url: api.endpoint + $scope.therapyId,
     data: $scope.toSend
     }).then(function successCallback(response) {
     $log.log("We got DATA! " + response);
     }, function errorCallback(response) {
     $log.log("Http error status code:" + response.status.toString());
     });
     */
  };
  vm.formActivity = { // domyslne wartosci do zapytania
    startDate: moment().subtract(7, 'd').format('YYYY-MM-DD'),
    endDate: moment().format("YYYY-MM-DD"),
    zones: 7
  };

  vm.changeActivityChart = function () {
    $log.log(vm.formActivity.zones);
    vm.formActivity.zones = parseInt(vm.formActivity.zones, 10);
    if (vm.formActivity.zones === 7) {
      vm.activityLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
      vm.activityData = [
        [6, 5, 8, 8, 5, 5, 4],
        [2, 4, 4, 1, 8, 2, 9]
      ];
    } else if (vm.formActivity.zones === 31) { // miesiac
      vm.activityLabels = ["week 1", "week 2", "week 3", "week 4"];
      vm.activityData = [
        [6, 5, 8, 8],
        [2, 4, 4, 1]
      ];
    } else if (vm.formActivity.zones === 12) { // rok
      vm.activityLabels = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paz", "Lis", "Gru"];
      vm.activityData = [
         [6, 5, 8, 8, 5, 5, 4, 2, 1, 1, 2, 3],
         [2, 4, 4, 1, 8, 2, 9, 1, 1, 2, 3, 2]
      ];
    }
     /* $scope.toSend = {  // to bedzie dzialac kiedys i pobierac dane z bazy, na razie powyzej jest hard-coded
      startDate: $scope.formModel.startDate,
      endDate: $scope.formModel.endDate,
      zones: $scope.formModel.zones
      };*/
     /*
      $http({
        method: 'GET',
        url: api.endpoint + $scope.therapyId,
        data: $scope.toSend
      }).then(function successCallback(response) {
      $log.log("We got DATA! " + response);
       }, function errorCallback(response) {
       $log.log("Http error status code:" + response.status.toString());
       });
       */
  };
  // mood chart:
  vm.moodSeries = ['Your Mood', 'Your Anxiety'];
  vm.moodLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
  vm.moodData = [
    [6, 5, 8, 8, 5, 5, 4],
    [2, 4, 4, 1, 8, 2, 9]
  ];
  vm.onClick = function (points, evt) {
    $log.log(points, evt);
  };

  vm.moodDatasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
  vm.moodOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
            min: 0,
            max: 11
          },
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

  // activity chart:
  vm.activitySeries = ['Your Activity', 'Energy used'];
  vm.activityLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
  vm.activityData = [
    [6, 5, 8, 8, 5, 5, 4],
    [2, 1, 3, 1, 8, 2, 9]
  ];
  vm.onClick = function (points, evt) {
    $log.log(points, evt);
  };
  vm.activityDatasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
  vm.activityOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
            min: 0,
            max: 11
          },
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
}
