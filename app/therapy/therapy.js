(function(){
    var app = angular.module('therapy', [ ]);





    app.controller('TherapyController', ['$scope', '$http', '$httpBackend', function($scope, $http, $httpBackend) {

        $scope.therapies =  [];
        $http({
            method: 'GET',
            url: 'http://localhost:3000/therapies'
            /*url: 'http://localhost:8080/therapies'*/
        }).then(function successCallback(response) {
            $scope.therapies = response.data;
        }, function errorCallback(response) {
            alert("Cannot display test.json")
        });


    }]);





    app.controller("PanelController", ['$scope', function($scope){
        $scope.selectTab = function(setTab){
            $scope.tab = setTab;
        };
        $scope.checkTab = function(){
             if ($scope.tab > 0)
                 return 1;
            else
                return 0;
        };

        $scope.therapyId = function(setTab){
            $scope.patientsList = 1;
            $scope.thId = setTab;
        };

        $scope.hidePatientsList = function () {
          $scope.patientsList = 0;
        };

    }]);

    app.controller("PatientsController", ['$scope', '$http', function($scope, $http){
        $scope.patients = [
           /*{
                email:"1234@gmail.com",
                id: 11                          // start counting from 11 because of server error "duplicate id"
            },
            {
                email: "eloelo@poczta.onet.pl",
                id: 12
            },
            {
                email: "hello@interia.pl",
                id: 13
            } */

        ];
         $http({
             method: 'GET',
             url: 'http://localhost:3000/patients'
             /*url: 'http://localhost:8080/therapies'*/
         }).then(function successCallback(response) {
             $scope.patients = response.data;
         }, function errorCallback(response) {
             alert("Cannot display elo.json")
         });


         $scope.addPatient = function(patient, role){
             alert("Assigned!");
             $scope.message = {id:patient.id, role: role};
             $http.post("http://localhost:3000/therapies/" + $scope.thId + "/members", $scope.message);
             success(function (data) {
                 console.log(":)")
             }).error(function(data) {
                 console.log(":(")
             });
         };

    }]);

})();

