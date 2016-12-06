angular.module('main').controller('registerCtrl', function ($scope, $http) {
    $scope.formModel = {};

    $scope.onSubmit = function () { //kiedy nacisniemy przycisk submit

        console.log("Hey i'm submitted!"); //info ze nacisniety
        // console.log($scope.formModel); //wyswietla w konsoli co polecialo

        $http.post("http://localhost:8080/api/v1/user", $scope.formModel). // wysyla to co widzielismy przed chwila
        then(
            function successCallback(response) {
                console.log("submitted to the server!");
                TokenStorage.store(response.data.token);
            },
            function failureCallback(response) {
                console.log("there is an error, check if it's not CORS")
            });

    };
});
