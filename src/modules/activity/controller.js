module.exports = controller;
/** @ngInject */
function controller($log, $stateParams, $http, api) {
  var vm = this;
  vm.therapyId = $stateParams.therapyId;
  vm.activityList = [
    {
      activity: "",
      startTime: "",
      endTime: "",
      mark: ""
    }
  ];
  vm.packedActivity = {
    date: "",
    activities: vm.activityList
  };
  vm.addActivity = function () {
    vm.activityList.push({
      activity: "",
      startTime: "",
      endTime: "",
      mark: ""
    });
  };
  vm.sendActivityData = function () {
    $http.post(api.endpoint + "/activity/" + vm.therapyId + "/add", vm.packedActivity)
      .then(
        function successCallback(response) {
          $log.log(response);
          $log.log(vm.packedActivity);
        },
        function fialureCallback(response) {
          $log.log('somethoing went wrong with sending data');
          $log.log(response);
        });
  };
}
