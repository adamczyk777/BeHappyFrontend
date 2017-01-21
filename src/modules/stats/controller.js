module.exports = controller;
/* @ngInject */
function controller($scope, $log) {
  // mood chart:
  $scope.moodLabels = ["01.01.2017", "02.01.2017", "03.01.2017", "04.01.2017", "05.01.2017", "06.01.2017", "07.01.2017"];
  $scope.moodSeries = ['Your Mood', 'Your Anxiety'];
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
