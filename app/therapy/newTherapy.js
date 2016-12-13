angular.module('main')
    .controller('TestController', ['$scope', '$http', function($scope, $http){
        $scope.formModel = {};
        $scope.roleModel = {};

        $scope.onSubmit = function () {
            //var data = $.param($scope.formModel);
           /* $scope.formModel.patientsCount = 0;
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
            } */

            $scope.localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
            $scope.date = moment($scope.formModel.beginningDate).format($scope.localFormat);
             $scope.toSend = {
                //id: $scope.formModel.id,
                name: $scope.formModel.name,
                beginningDate: $scope.date,
                /*   patientsCount: $scope.formModel.patientsCount,
                 therapistsCount: $scope.formModel.therapistsCount,
                 wardensCount: $scope.formModel.wardensCount,*/
                role: $scope.formModel.role
            };
            alert ($scope.toSend.name);
            alert  ($scope.toSend.beginningDate);
            alert ($scope.toSend.role);
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/therapies',
                data: $scope.toSend
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

