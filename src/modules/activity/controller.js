module.exports = controller;
/** @ngInject */
function controller($stateParams) {
  var vm = this;
  vm.therapyId = $stateParams.therapyId;
}

