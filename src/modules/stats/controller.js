module.exports = controller;
var moment = require('moment');
/** @ngInject */
function controller($scope, $log, $http, api) {
  $scope.formModel = { // domyslne wartosci do zapytania
    startDate: moment().subtract(7, 'd').format('YYYY-MM-DD'),
    endDate: moment().format("YYYY-MM-DD"),
    zones: 7
  };

  $scope.changeChart = function () {
    if ($scope.formModel.zones === 7) {
      $scope.moodLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
      $scope.moodData = [
        [6, 5, 8, 8, 5, 5, 4],
        [2, 4, 4, 1, 8, 2, 9]
      ];
    } else if ($scope.formModel.zones === 31) { // miesiac
      $scope.moodLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
      $scope.moodData = [
        [6, 5, 8, 8, 5, 5, 4],
        [2, 4, 4, 1, 8, 2, 9]
      ];
    } else if ($scope.formModel.zones === 12) { // rok
      $scope.moodLabels = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paz", "Lis", "Gru"];
      $scope.moodData = [
        [6, 5, 8, 8, 5, 5, 4, 2, 1, 1, 2, 3],
        [2, 4, 4, 1, 8, 2, 9, 1, 1, 2, 3, 2]
      ];
    }
    $scope.toSend = {  // to bedzie dzialac kiedys i pobierac dane z bazy, na razie powyzej jest hard-coded
      startDate: $scope.formModel.startDate,
      endDate: $scope.formModel.endDate,
      zones: $scope.formModel.zones
    };
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
  $scope.moodSeries = ['Your Mood', 'Your Anxiety'];
  $scope.moodLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
  $scope.moodData = [
    [6, 5, 8, 8, 5, 5, 4],
    [2, 4, 4, 1, 8, 2, 9]
  ];
  $scope.onClick = function (points, evt) {
    $log.log(points, evt);
  };

  $scope.moodDatasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
  $scope.moodOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
            max: 10
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
  $scope.activityLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
  $scope.activitySeries = ['Your Activity', 'Energy used'];
  $scope.activityData = [
    [6, 5, 4, 5, 5, 5, 4],
    [2, 1, 3, 1, 8, 2, 9]
  ];
  $scope.onClick = function (points, evt) {
    $log.log(points, evt);
  };
  $scope.activityDatasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
  $scope.activityOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
            max: 10
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

  // var vm = this;
}
