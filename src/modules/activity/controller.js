module.exports = controller;
/** @ngInject */
function controller($stateParams, $http, api) {
  var vm = this;
  vm.therapyId = $stateParams.therapyId;
  vm.activityDataObject = {
    date: "2017-11-11",
    activities: [
      {
        activity: "chuj",
        startTime: "21:37:00",
        endTime: "24:00:00",
        mark: parseInt("5", 10)
      }
    ]
  };
  $http.post(api.endpoint + "/activity/" + vm.therapyId + "/add", vm.activityDataObject);
}

