module.exports = controller;

/** @ngInject */
function controller($stateParams, $http, $log, $state, api) {
  var vm = this;
  var uri = api.endpoint + '/users/invitation/' + $stateParams.id;

  vm.acceptInvitation = function () {
    $log.log("AKCEPTUJE");
    $http({
      method: 'POST',
      url: uri,
      data: null
    }).then(function successCallback() {
      $log.log("Submitted!");
    }, function errorCallback(response) {
      $log.log("Http error status code:" + response.status.toString());
    });
    $state.go('app.home');
  };

  vm.refuseInvitation = function () {
    $log.log("DELETE IN PROCESS");
    $http({
      method: 'DELETE',
      url: uri
    }).then(function successCallback(response) {
      $state.reload();
      $log.log("USER NOT ADDED");
      $log.log(response);
    }, function errorCallback(response) {
      $log.log(response);
    });
    $state.go('app.home');
  };
}
