angular.module('main').controller('loginCtrl', ['$scope', '$http', 'TokenStorage', '$location', 'urls',
    function ($scope, $http, TokenStorage, $location, urls) {
    // $scope.formModel = {};
    var self=this;

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
    $http.get(urls.apiUrl + "users/logoutAdmin").then(
        function successCallback(response){
            TokenStorage.clear();
        },
        function failureCallback(response){
            console.log("Can't logout properly");
        }
    );

    $scope.onSubmit = function() {
        var config={};
        config.headers = {};
        config.headers["Authorization"] = $scope.email + ":" + $scope.password;
        $http.get(urls.apiUrl + "users/"+urls.applicationId+"/login", config).then(
            function successCallback(response) {
                TokenStorage.store(response.headers("X-AUTH-TOKEN"));
                // $location.path("/manage").replace();   //wait for user page
                console.log("xD");
            },
            function faiulureCallback(response) {
                console.log("Can't login properly");
            }
        )
    }
}]);
