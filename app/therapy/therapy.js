angular.module('main')
    .controller('TherapyController', ['$scope', '$http', '$httpBackend', function($scope, $http, $httpBackend) {
        $scope.therapies =  [];
        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/therapies',
         //   headers: {'X-Auth-Token': 'loremIpsumToken'}    //FIXME Change it into a real token
        }).then(function successCallback(response) {
            $scope.therapies = response.data;
        }, function errorCallback(response) {
            console.log("Cannot display list of your therapies");
            console.log(response);
        });


    }])
    .controller("PanelController", ['$scope', '$http', function($scope, $http){
        $scope.selectTab = function(setTab){
            $scope.tab = setTab;
        };
        $scope.checkTab = function(checkTab){
             return  $scope.tab === checkTab;
        };

        $scope.getMembers = function() {

            alert($scope.thId);
            $http({
                method: 'GET',
                url: "http://localhost:8080/api/therapies/" + $scope.thId + "/members"
                /*url: 'http://localhost:3000/therapies'*/
            }).then(function successCallback(response) {
                $scope.patients = response.data;
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
        //http://localhost:8080/api/therapies/{therapy_id}/members


         $scope.addPatient = function(patient, role){
             alert("Assigned!");
             $scope.message = {id:patient.id, role: role};
             $http.post("http://localhost:8080/api/therapies/" + $scope.thId + "/members", $scope.message);
             success(function (data) {
                 console.log(":)")
             }).error(function(data) {
                 console.log(":(")
             });
         };

    }]);



