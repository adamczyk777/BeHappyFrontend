module.exports = controller;
var moment = require('moment');
/** @ngInject */

function controller($stateParams, TokenStorage, $state, $log, $http, api) {
  if (!TokenStorage.isAuthenticated()) {
    $state.go('login');
  }

  var vm = this;
  vm.therapyId = $stateParams.therapyId;

  // wyciągam daty do zasięgu:
  $http({
    method: 'GET',
    url: api.endpoint + '/mood/' + vm.therapyId + '/getRange'
  }).then(function successCallback(response) {
    $log.log("Range was imported from server. " + response);
    vm.rangeDates = response.data;
  }, function errorCallback(response) {
    $log.log("Couldn't get rangeDates. Http error status code:" + response.status.toString());
  });

  // wyciagam dane do wykresu:
  vm.chosenMoodRange = vm.rangeDates;

  vm.displayMoodChart = function () {
    $http({
      method: 'GET',
      url: api.endpoint + '/mood/' + vm.therapyId + '/getStats?begindate=' + vm.chosenMoodRange[0] + '&enddate=' + vm.chosenMoodRange[1]
    }).then(function successCallback(response) {
      $log.log("MoodGraph data was imported from server. " + response);
      vm.moodGraph = response.data;
      // mood chart:
      vm.moodSeries = ['Your Mood', 'Your Anxiety'];
      if (vm.moodGraph.option === 'Days') {
        for (var i = 0; i < vm.moodGraph.length; i++) {
          vm.moodLabels[i] = vm.chosenMoodRange[0] + i;
          $log.log(vm.chosenMoodRange[0] + i);
        }
        // vm.moodLabels = [vm.chosenMoodRange[0], "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
      }
      vm.moodData = [
        vm.moodGraph.moods,
        vm.moodGraph.fears
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
    }, function errorCallback(response) {
      $log.log("Couldn't get rangeDates. Http error status code:" + response.status.toString());
    });
  };

  vm.formMood = { // domyslne wartosci do zapytania
    startDate: moment().subtract(7, 'd').format('YYYY-MM-DD'),
    endDate: moment().format("YYYY-MM-DD"),
    zones: 7
  };

  vm.changeMoodSplits = function () {
    // vm.moodGraph.
    if (vm.formMood.zones === 7) {
      vm.moodLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
    } else if (vm.formMood.zones === 31) { // miesiac
      vm.moodLabels = ["week 1", "week 2", "week 3", "week 4"];
    } else if (vm.formMood.zones === 12) { // rok
      vm.moodLabels = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paz", "Lis", "Gru"];
    }
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
