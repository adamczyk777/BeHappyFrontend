angular.module('main').controller('loginCtrl', function ($scope, $http) {
    $scope.formModel = {};

    $scope.onSubmit = function () { //kiedy nacisniemy przycisk submit

        console.log("Hey i'm submitted!"); //info ze nacisniety
        console.log($scope.formModel); //wyswietla w konsoli co polecialo

        $http.post("http://localhost:8080/api/v1/user/login", $scope.formModel). // wysyla to co widzielismy przed chwila
        success(function (data) { //log kiedy sukces w wysylaniu
            console.log("submitted to the server!")
        }).error(function(data) { //log kiedy sie zjebie
            console.log("there is an error, check if it's not CORS")
        });

    };
});
