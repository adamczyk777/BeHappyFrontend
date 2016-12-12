'use strict';

angular.module('main')
    .controller('loginCtrl', ['$http', 'TokenStorage', '$scope',
    function ($http, TokenStorage, $scope) {
        // var vm = this;
        $scope.onSubmit = function() {
            var config={};
            config.headers = {};
            config.headers["Authorization"] = $scope.email + ":" + $scope.password;
            $http.get(
                "http://localhost:8080/api/user/login",
                {headers: {"Authorization": btoa($scope.email + ":" + $scope.password)}}
            ).then(
                function onSuccess(response) {
                    console.log(response.data.token);
                    TokenStorage.store(response.data.token);
                },
                function onFailure(response) {
                    console.log(TokenStorage.retrieve());
                }
            )
        }
        $scope.logout = function() {
            console.log(TokenStorage.retrieve());
            TokenStorage.clear();
        }
        $scope.checkToken = function()
        {
            $http.get("http://localhost:8080/api/test/secure")
                .then(function successCallback(response) {
                    console.log("Success callback!");
                }, function errorCallback(response) {
                    console.log("Error callback");
                });
        }
    }]);
