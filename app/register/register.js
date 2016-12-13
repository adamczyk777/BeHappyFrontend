angular.module('main')
    .controller('registerCtrl', ['$scope', '$http', "TokenStorage", function ($scope, $http, TokenStorage) {
        $scope.registerForm = {};
        $scope.onSubmit = function () {
            $http.post("http://localhost:8080/api/user/register", $scope.registerForm). // wysyla to co widzielismy przed chwila
            then(
                function successCallback(response) {
                    console.log("Poszło, Uff... xD");
                    TokenStorage.store(response.data.token);
                },
                function failureCallback(response) {
                    console.log("Mamy błąd :/");
                    alert('No cusz, nie działą :C');
                    console.log(response);
                });

        };
    }]);
