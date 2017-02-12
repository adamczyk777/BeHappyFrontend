module.exports = controller;
/** @ngInject */
function controller($stateParams, $http, api) {
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
  vm.activityDataObject = {
    date: "2017-11-11",
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
    $http.post(api.endpoint + "/activity/" + vm.therapyId + "/add", vm.activityDataObject);
  };
}

