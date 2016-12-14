angular.module('main')
    .controller('TestController', ['$scope', '$http', function($scope, $http){
        $scope.formModel = {};
        $scope.roleModel = {};

        $scope.onSubmit = function () {
            $scope.localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
            $scope.date = moment($scope.formModel.beginningDate).format($scope.localFormat);
             $scope.toSend = {
                name: $scope.formModel.name,
                beginningDate: $scope.date,
                role: $scope.formModel.role
            };
            alert ($scope.toSend.name);
            alert  ($scope.toSend.beginningDate);
            alert ($scope.toSend.role);
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/therapies',
                data: $scope.toSend
            }).then(function successCallback(response) {
                alert("Submitted!");
            }, function errorCallback(response) {
                alert("Http error status code:" + response.status.toString());
            });

        };
    }]);

