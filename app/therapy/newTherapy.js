(function () {

    var app = angular.module('newTherapy', [ ]);

    app.controller('TestController', ['$scope', '$http', function($scope, $http){
        $scope.formModel = {};

        $scope.onSubmit = function () {
            //var data = $.param($scope.formModel);

            $http({
                method: 'POST',
                url: 'http://localhost:8080/therapies',
                data: $scope.formModel,
                /*params: {name: $scope.formModel.name,
                         date: $scope.formModel.date,
                         role: $scope.formModel.role}*/
            }).then(function successCallback(response) {
                alert("Submitted!");
            }, function errorCallback(response) {
                alert("Http error status code:" + response.status.toString());
            });

        };
    }]);

})();
