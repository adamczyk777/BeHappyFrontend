var app = angular.module('minmax', [
    'jcs-auto-validate'
]);

app.controller('MinMaxCtrl', function ($scope, $http) {
    $scope.formModel = {};

    $scope.onSubmit = function () {
        console.log("Hey i'm submitted");
        console.log($scope.formModel);

        $http.post('url', $scope.formModel).success(function (data) {
                console.log('submitted');
            }).error(function (data) {
                console.log('error');
        });
    };
});