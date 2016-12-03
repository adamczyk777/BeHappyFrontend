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
             {
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
             }
         ];


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

