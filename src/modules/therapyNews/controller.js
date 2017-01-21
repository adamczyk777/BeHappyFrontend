/* eslint-disable */
module.exports = controller;
/* @ngInject */
  /* .constant("dataUrl", "http://localhost:8080/therapy/news")
  .constant("newsListPageCount", 5)*/
function controller ($scope /* , $http, $filter, dataUrl*/) {
    $scope.data = {};
    $http.get(dataUrl)
    //.then(function (data) {
    //    $scope.data.products = data;
      .then(function (response) {
          $scope.data.therapyinfo = response.data;
        },
        function (error) {
          $scope.data.error = error;
        });
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
