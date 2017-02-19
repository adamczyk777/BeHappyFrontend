module.exports = controller;
/** @ngInject */
function controller($scope, TokenStorage, $state, $log, $http, $stateParams, api) {
  var vm = this;
  if (!TokenStorage.isAuthenticated()) {
    $state.go('login');
  }
  $scope.page = $stateParams.page;

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

  $scope.count = 0;
  $scope.news = {};
  $scope.firstTime = true;
  $scope.pages = [];

  $scope.getNews = function (k) {
    $http({
      method: 'GET',
      url: api.endpoint + '/news/' + k
    }).then(function successCallback(response) {
      $scope.news = response.data;
      $scope.count = Math.floor(response.data[0].count / 5) + 1;
      if (!(response.data[0].count % 5)) {
        --$scope.count;
      }

      if ($scope.firstTime) {
        for (var j = 1; j <= $scope.count; j++) {
          $scope.pages.push(j);
        }
      }
      $scope.firstTime = false;
    }, function errorCallback() {
      $log.log("Cannot get data from server.");
    });
  };

  $scope.getNews($scope.page);
  vm.editData = function () {
    $state.go('app.editData');
};
}
