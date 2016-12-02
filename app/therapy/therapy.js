(function(){
    var app = angular.module('therapy', [ ]);

    app.controller('TherapyController', function(){
        this.products = therapies;
    });

    app.directive("therapyDescription", function () {
       return {
         restrict: 'E',
         templateUrl: 'therapy-description.html'
       };
    });
    var therapies = [
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
        },
    ];

    var test = 'Lorem ipsum test variable for controllers';

    app.controller("PanelController", function(){
        this.tab = 2;   //FIXME if possible change it into ng-init

        this.selectTab = function(setTab){
            this.tab = setTab;
        };
        this.isSelected = function(checkTab){
            return this.tab === checkTab;
        };

    });

})();

