'use strict';

angular.module('main')
    .controller('CalendarCtrl', function($scope, $http, $filter) {

        // Daty dla kalendarza:
        $scope.now = new Date();
        $scope.minDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate() - 7);
        $scope.maxDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate());


         // obiekt, do którego widok przyczepia dane do wysłania:
        $scope.formModel = {
            date: $scope.now,
            mark: "",
        };

        var therapy_id = 1; // tymczasowo, pozniej bedzie zczytywana w zaleznosci na jaka terapie wejdziemy

        $scope.submitForm = function() {  // wysyła dane z formularza (nie wiem jak to ma do końca wyglądać)
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/stats/' + therapy_id,
                data: $scope.formModel
            }).then(function successCallback(response) {
                alert("Submitted!");
            }, function errorCallback(response) {
                alert("Http error status code:" + response.status.toString());
            });
            //var jsonToSend = JSON.stringify($scope.formModel); // zamienia obiekt na string JSON
        };
    });