module.exports = controller;
/** @ngInject */
function controller($scope, TokenStorage, $state, $log, $http, api) {
  var vm = this;
  if (!TokenStorage.isAuthenticated()) {
    $state.go('login');
  }

  vm.logout = function () {
    TokenStorage.clear();
    $state.go('login');
  };
  vm.checkInterceptor = function () {
    $http.get(api.endpoint + '/test/secure')
      .then(function successCallback() {
        $log.log('secure endpoint is accessible');
      }, function errorCallback() {
        $log.log(TokenStorage.retrieve());
        $log.log('not working :o');
      });
  };

  $scope.chosenPage = 1;
  $scope.count = 1;
  $scope.news = [];
  $scope.number = 1;
  $scope.firstTime = true;

  $scope.getNews = function (k) {
    $http({
      method: 'GET',
      url: api.endpoint + '/news/' + k
    }).then(function successCallback(response) {
      $scope.news[k - 1] = {};
      $scope.news[k - 1] = response.data;
      $scope.news[k - 1].number = k;
      $log.log($scope.news[0].description);
      $log.log("$scope.news[k-1]");
      $log.log($scope.news[k - 1]);
      $log.log("NEWS COUNT");
      $log.log($scope.news[k - 1]);
      $scope.count = Math.floor(response.data[0].count / 5) + 1;
      $log.log("RESPONSE DATA COUNT");
      $log.log(response.data[0].count);
      $log.log("COUNT");
      $log.log($scope.count);
      if ($scope.firstTime) {
        $scope.setPage($scope.news[0]);
        for (var j = 2; j <= $scope.count; j++) {
          $scope.getNews(j);
        }
      }
      $log.log("NEWS");
      $log.log($scope.news.count);
      $scope.firstTime = false;
    }, function errorCallback() {
      $log.log("Cannot get data from server.");
    });
  };
  $scope.getNews(1);

  $scope.setPage = function (i) {
    $scope.chosenPage = i;
  };

  $scope.isChosen = function (i) {
    return ($scope.chosenPage === i);
  };
}
