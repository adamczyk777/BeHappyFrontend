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

  $scope.news = {};
  $scope.getNews = function () {
    $http({
      method: 'GET',
      url: api.endpoint + '/news'
    }).then(function successCallback(response) {
      $scope.news = response.data;
      $scope.therapyName = $scope.findTherapyName();
      $log.log($scope.news);
    }, function errorCallback() {
      $log.log("Cannot get data from server.");
    });
  };
  $scope.getNews();
}
