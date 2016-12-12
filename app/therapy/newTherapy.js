(function () {

    var app = angular.module('newTherapy', [ ]);

    app.controller('TestController', ['$scope', '$http', function($scope, $http){
        $scope.formModel = {};
        $scope.roleModel = {};

        $scope.onSubmit = function () {
            //var data = $.param($scope.formModel);
            $scope.formModel.patientsCount = 0;
            $scope.formModel.therapistsCount = 0;
            $scope.formModel.wardensCount = 0;
            if ($scope.formModel.role.localeCompare("WARDEN") == 0){
                $scope.formModel.wardensCount ++;
            }
            if ($scope.formModel.role.localeCompare("THERAPIST") == 0){
                $scope.formModel.therapistsCount ++;
            }
            if ($scope.formModel.role.localeCompare("PATIENT") == 0){
                $scope.formModel.patientsCount ++;
            }
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/therapies',
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
