angular.module('main').controller('registerCtrl', ['$scope', '$http', "TokenStorage", function ($scope, $http, TokenStorage) {
    $scope.formModel = {};
    $scope.onSubmit = function () {
        $http.post("http://localhost:8080/api/user/register", btoa($scope.formModel)). // wysyla to co widzielismy przed chwila
        then(
            function successCallback(response) {
                console.log("submitted to the server!");
                TokenStorage.store(response.data.token);
            },
            function failureCallback(response) {
                console.log("there is an error, check if it's not CORS");
                console.log(btoa($scope.formModel));
                console.log(response);
                TokenStorage.clear();
            });

    };
}]);
