module.exports = service;

function service(TokenStorage) {
  var config = {};
  config.headers = {};
  config.headers["Authorization"] = vm.email + ":" + vm.password;
  $http.get(
    "http://localhost:8080/api/user/login",
    {headers: {Authorization: btoa(vm.email + ":" + vm.password)}}
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
}
