(function () {

    var app = angular.module('newTherapy', [ ]);

    app.controller('TestController', ['$scope', '$http', function($scope, $http){
        $scope.formModel = {};

        $scope.onSubmit = function () {
            alert("Submitted!");
            $http.post("http://localhost:3000/therapies", $scope.formModel).
            success(function (data) {
                console.log(":)")
            }).error(function(data) {
                console.log(":(")
            });

        };
    }]);

})();
