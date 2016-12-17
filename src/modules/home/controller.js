module.exports = controller;

function controller(TherapiesService) {
  var vm = this;
  vm.create = function () {
    TherapiesService.createTherapy();
  };
}
