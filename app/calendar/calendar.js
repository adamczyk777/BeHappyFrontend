angular.module("calendar", ['ngMaterial', 'ngMessages']).controller('CalendarCtrl', function($scope, $http) {

    // Daty dla kalendarza:
    $scope.now = new Date();
    $scope.minDate = new Date($scope.now.getFullYear(), $scope.now.getMonth() - 1, $scope.now.getDate());
    $scope.maxDate = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate());


     // struktura, do której widok przyczepia dane do wysłania:
    $scope.formModel = {
        date: $scope.now,
        mark: "",
    };

    var therapy_id = 1; // tymczasowo, pozniej bedzie zczytywana w zaleznosci na jaka terapie wejdziemy

    $scope.submitForm = function() { // wysyła dane z formularza (wysyłanie jest pewnie do przeróbki, bo nie wiem jak to ma do końca wyglądać)
        $http.post('http://localhost:8080/api/v1/stats/' + therapy_id, $scope.formModel).then(
            function onSuccess(response) {
                console.log("Poszło!");
                console.log(message);
            },
            function onFailure(response) {
                console.log(message);
            }
        )
    };
});