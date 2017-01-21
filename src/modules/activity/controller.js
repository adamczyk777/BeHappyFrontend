module.exports = controller;
/** @ngInject */
function controller($scope, $stateParams) {
  $scope.therapyId = $stateParams.therapyId;
}

