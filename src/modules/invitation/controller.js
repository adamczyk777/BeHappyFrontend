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
  };

  /* vm.refuseInvitation = function () {
    $http.delete(uri, null)
      .then(
      function successCallback() {
        $log.log("Request Sent");
      },
      function failureCallback(response) {
        $log.log("Error while sending");
        $log.log(response);
      });
  }; */
}
