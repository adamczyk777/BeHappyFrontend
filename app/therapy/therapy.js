angular.module('main')
    .controller('TherapyController', ['$scope', '$http', '$httpBackend', function($scope, $http, $httpBackend) {
        $scope.therapies =  [];
        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/therapies'
        }).then(function successCallback(response) {
            $scope.therapies = response.data;
        }, function errorCallback(response) {
            console.log("Cannot display list of your therapies");
            console.log(response);
        });


    }])
    .controller("PanelController", ['$scope', '$http', function($scope, $http){
        $scope.patients = [];

        $scope.selectTab = function(setTab){
            $scope.tab = setTab;
        };
        $scope.checkTab = function(checkTab){
             return  $scope.tab === checkTab;
        };
        $scope.test = 0;
        $scope.getMembers = function() {

            alert($scope.thId);
             $http({
                 method: 'GET',
                 url: "http://localhost:8080/api/therapies/" + $scope.thId + "/members"
                 /*url: 'http://localhost:3000/therapies'*/
             }).then(function successCallback(response) {
                if (response.data === null) {
                    alert("Data is null");
                }
                else{
                    alert(response.data[0].email);
                    $scope.test = 1;
                }

                 $scope.patients = response.data;
                 $scope.patients[$scope.patients.length] = { email:"1234@gmail.com" };
                 $scope.patients[$scope.patients.length] = { email: "eloelo@poczta.onet.pl" };
                 $scope.patients[$scope.patients.length] = { email: "hello@interia.pl" };

             }, function errorCallback(response) {
                 console.log("Cannot display members of your therapy");
                 console.log(response);
             });
        };

        $scope.therapyId = function(setTab){
            $scope.patientsList = 1;
            $scope.thId = setTab;
            $scope.getMembers();
        };

        $scope.hidePatientsList = function () {
          $scope.patientsList = 0;
        };

    }])
    .controller("PatientsController", ['$scope', '$http', function($scope, $http){


         $scope.addPatient = function(patient, role){
             alert("Assigned!");
             $scope.message = {role: role, email: patient.email};
             alert($scope.message.role);
             alert($scope.message.email);
             $http({
                 method: 'POST',
                 url: "http://localhost:8080/api/therapies/" + $scope.thId + "/members",
                 data: $scope.message
             }).then(function successCallback(response) {
                 alert("Submitted!");
             }, function errorCallback(response) {
                 alert("Http error status code:" + response.status.toString());
             });

                  //post("http://localhost:8080/api/therapies/" + $scope.thId + "/members", $scope.message)
                    //  .success(function (data) {
                     //   console.log(":)")
                    //}).error(function(data) {
                    //     console.log(":(")
                    // });
         };

    }]);



