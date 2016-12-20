module.exports = controller;

function controller($log, TokenStorage, $http, $scope) {
  var vm = this;

  vm.login = function () {
    var config = {};
    config.headers = {};
    config.headers.Authorization = $scope.email + ":" + $scope.password;
    $http.get(
      "http://localhost:8080/api/user/login",
      {headers: {Authorization: btoa($scope.email + ":" + $scope.password)}}
    ).then(
      function onSuccess(response) {
        $log.log(response.data.token);
        TokenStorage.store(response.data.token);
      },
      function onFailure(response) {
        $log.log(response);
        $log.log(TokenStorage.retrieve());
      }
    );
  };
}
