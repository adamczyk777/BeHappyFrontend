(function () {
    var app = angular.module('newTherapy', [ ]);

    app.controller('TestController', ['$scope', '$http', function($scope, $http){
        $scope.formModel = {};

        $scope.onSubmit = function () {
            $scope.formModel.beginningDate = "1111-11-11T23:00:00.00"
          /*  $scope.formModel.beginningDate = $scope.formModel.beginningDate.getUTCFullYear()
            + "-" + $scope.formModel.beginningDate.getUTCMonth()
            + "-" + $scope.formModel.beginningDate.getUTCDay() + "T23:00:00.000";*/
            /*+ $scope.formModel.beginningDate.getUTCHours() + ":"
            + $scope.formModel.beginningDate.getUTCMinutes() + ":"
            + $scope.formModel.beginningDate.getUTCSeconds() + ":"
            + $scope.formModel.beginningDate.getUTCMilliseconds();*/


            $scope.formModel.role = "THERAPIST";
    /*        $scope.formModel.patientsCount = 0;
            $scope.formModel.therapistsCount = 0;
            $scope.formModel.wardensCount = 0;
            //$scope.formModel.date = $filter('date')(new Date(), "MM/dd/yyyy")
            if ($scope.formModel.role.localeCompare("WARDEN") == 0){
                $scope.formModel.wardensCount ++;
            }
            if ($scope.formModel.role.localeCompare("THERAPIST") == 0){
                $scope.formModel.therapistsCount ++;
            }
            if ($scope.formModel.role.localeCompare("PATIENT") == 0){
                $scope.formModel.patientsCount ++;
            }*/

            var toSend = {
                //id: $scope.formModel.id,
                name: $scope.formModel.name,
                beginningDate: $scope.formModel.beginningDate,
             /*   patientsCount: $scope.formModel.patientsCount,
                therapistsCount: $scope.formModel.therapistsCount,
                wardensCount: $scope.formModel.wardensCount,*/
                role: $scope.formModel.role
            };

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/therapies',
                /*data: toSend*/
                data: $scope.formModel,
                //headers: {'X-Auth-Token': 'loremIpsumToken'}    //FIXME Change it into a real token
                /*params: {name: $scope.formModel.name,
                         date: $scope.formModel.date,
                         role: $scope.formModel.role}*/
            }).then(function successCallback(response) {
                alert("Submitted!");
            }, function errorCallback(response) {
                if (response.status == 409){
                    alert("Therapy with given name exists for you")
                }
                else
                {
                    alert("Http error status code:" + response.status.toString());
                }
            });

        };
    }]);

/*    app.filter('timezone', function(){

        return function (val, offset) {
            if (val != null && val.length > 16) {
                return val.substring(0, 16)
            }
            return val;
        };
    });*/

})();
