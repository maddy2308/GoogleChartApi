(function () {

  angular.module("DashboardPoc").factory("AmazonChartService", AmazonChartService);

  AmazonChartService.$inject = ['$http'];

  function AmazonChartService($http) {
    var service = {
      readAmazonData: readAmazonData
    };

    var baseUrl = "http://localhost:3000";

    function readAmazonData() {
      return $http.get(baseUrl + "/AmazonReport").then(getDataSuccess, getDataError);
    }

    function getDataSuccess(response) {
      return response.data;
    }

    function getDataError(err) {
      return err;
    }

    return service;
  }
})();