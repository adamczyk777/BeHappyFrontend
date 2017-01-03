module.exports = controller;

function controller($scope, TokenStorage, $stateParams, $state) {

  if(TokenStorage.retrieve() === null){
    $state.go('app.login');
  }

  $scope.therapyId = $stateParams.therapyId;
}

