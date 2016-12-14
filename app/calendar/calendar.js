angular.module('main')
    .controller('CalendarCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

        // Daty dla kalendarza:
        $scope.now = new Date();
        $scope.minDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate() - 7);
        $scope.maxDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate());

        $scope.localFormat = 'YYYY-MM-DD';

         // obiekt, do którego widok przyczepia dane do wysłania:
        $scope.formModel = {
            date: $scope.now,
            mark: null
        };

        var therapy_id = 1; // tymczasowo, pozniej bedzie zczytywana w zaleznosci na jaka terapie wejdziemy

        $scope.submitForm = function() {  // wysyła dane z formularza (nie wiem jak to ma do końca wyglądać)
            $scope.toSend = {
                date: $scope.formModel.date,
                mark: parseInt($scope.formModel.mark)
            };
            $scope.toSend.date = moment($scope.formModel.date).format($scope.localFormat);

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/stats/' + therapy_id,
                data: $scope.toSend
            }).then(function successCallback(response) {
                alert("Submitted!");
            }, function errorCallback(response) {
                alert("Http error status code:" + response.status.toString());
            });
            //var jsonToSend = JSON.stringify($scope.formModel); // zamienia obiekt na string JSON
        };
    }]);