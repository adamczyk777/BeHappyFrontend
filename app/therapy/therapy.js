(function(){
    var app = angular.module('therapy', [ ]);

    app.controller('TherapyController', ['$scope',function($scope) {

         $scope.therapies = [
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

