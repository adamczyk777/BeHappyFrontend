(function(){
    var app = angular.module('therapy', [ ]);

     // app.constant = ("baseUrl", "http://localhost:3000");
    /*app.service = ('retrieveData', ['$http', 'baseUrl', function($http, baseUrl){
            this.getTherapies = function(){
                return $http.get(baseUrl + "/therapies");
            };
    }]); */
    app.controller('TherapyController', ['$scope', '$http', function($scope, $http) {

         $scope.therapies =  [
  /*           {
                 name: 'First therapy lorem',
                 id: 1
             },
             {
                 name: 'Second therapy ipsum',
                 id: 2
             },
             {
                 name: 'Third therapy dolor',
                 id: 3
             }*/
         ];
        $http({
            method: 'GET',
            url: 'http://localhost:3000/therapies'
            /*url: 'http://localhost:8080/therapies'*/
        }).then(function successCallback(response) {
            $scope.therapies = response.data;
        }, function errorCallback(response) {
            alert("Cannot display test.json")
        });



        /*retrieveData.getTherapies()
            .then(
                function(response) {
                    $scope.therapies = response.data;
                }
            ); */



    }]);

    app.directive("therapyDescription", function () {
       return {
         restrict: 'E',
         templateUrl: 'therapy-description.html'
       };
    });



    var test = 'Lorem ipsum test variable for controllers';

    app.controller("PanelController", ['$scope', function($scope){

        $scope.selectTab = function(setTab){
            $scope.tab = setTab;
        };
        $scope.isSelected = function(checkTab){
            return $scope.tab === checkTab;
        };

    }]);

})();

