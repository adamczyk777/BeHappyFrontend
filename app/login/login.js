'use strict';

angular.module('main.login', [ngRoute])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller : 'loginCtrl',
            controllerAs: "vm"
        });
    }])
    .controller('loginCtrl', ['$http', 'TokenStorage',
    function ($http, TokenStorage) {
    // $scope.onSubmit = function () { //kiedy nacisniemy przycisk submit
    //
    //     console.log("Hey i'm submitted!"); //info ze nacisniety
    //     console.log($scope.formModel); //wyswietla w konsoli co polecialo
    //
    //     $http.post("http://localhost:8080/api/v1/user/login", $scope.formModel). // wysyla to co widzielismy przed chwila
    //     success(function (data) { //log kiedy sukces w wysylaniu
    //         console.log("submitted to the server!")
    //     }).error(function(data) { //log kiedy sie zjebie
    //         console.log("there is an error, check if it's not CORS")
    //     });
    //
    // };
    // $http.get(urls.apiUrl + "users/logoutAdmin").then(
    //     function successCallback(response){
    //         TokenStorage.clear();
    //     },
    //     function failureCallback(response){
    //         console.log("Can't logout properly");
    //     }
    // );

    $scope.onSubmit = function() {
        var config={};
        config.headers = {};
        config.headers["Authorization"] = $scope.email + ":" + $scope.password;
        $http.get(
            "http://localhost:8080/api/users/login",
            {headers: {"Authorization": btoa(vm.login + ":" + vm.password)}}
        ).then(
            function onSuccess(response) {
                console.log(response.data.token);
                TokenStorage.store(response.data.token);
            },
            function onFailure(response) {
                console.log(response);
            }
        )
    }
}]);
