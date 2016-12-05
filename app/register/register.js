var app = angular.module('minmax', [
    'jcs-autoValidate'
]);

app.controller('registerCtrl', function ($scope, $http) {
    $scope.formModel = {};

    $scope.onSubmit = function () {

        console.log("Hey i'm submitted!");
        console.log($scope.formModel);

        $http.post("http://localhost:8080/api/v1/user", $scope.formModel).
        success(function (data) {
            console.log(":)")
        }).error(function(data) {
            console.log(":(")
        });

    };
});