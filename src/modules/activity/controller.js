module.exports = controller;
/* @ngInject */
function controller($scope, TokenStorage, $stateParams, $state) {
  if (TokenStorage.retrieve() === null) {
    $state.go('app.login');
  }

  $scope.therapyId = $stateParams.therapyId;
}

