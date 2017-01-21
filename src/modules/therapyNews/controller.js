/* eslint-disable */
module.exports = controller;
/* @ngInject */
  /*.constant("newsListPageCount", 5)*/
function controller ($scope /* , $http, $filter, dataUrl*/) {
  $scope.data = {};
  $scope.getNews = function () {
    $http({
      method: 'GET',
      url: api.endpoint + '/therapy/news'
    }).then(function successCallback(response) {
      $scope.data.news = response.data;
      $scope.therapyName = $scope.findTherapyName();
      $log.log($scope.news);
    }, function errorCallback(response) {
      $log.log("Cannot get data from server.");
    });
  };
    /*$http.get("http://localhost:8080/therapy/news")
    //.then(function (data) {
    //    $scope.data.products = data;
      .then(function (response) {
          $scope.data.therapyinfo = response.data;
        },
        function (error) {
          $scope.data.error = error;
        });*/
   /* $scope.selectedPage=1;
    $scope.pageSize = newsListPageCount;
    $scope.selectPage = function(newPage)
    {
      $scope.selectedPage = newPage;
    }

    $scope.getPageClass = function (page)
    {
      return $scope.selectedPage == page ? newsListActiveClass : "";
    }
    $scope.therapyFilterFn = function (info)
    {
      return selectedTherapy == null || info.therapyName == selectedTherapy;
    }*/
  }
