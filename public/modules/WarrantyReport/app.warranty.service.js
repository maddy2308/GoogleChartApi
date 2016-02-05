(function () {

    angular.module("DashboardPoc").factory("WarrantyService", warrantyService);

    warrantyService.$inject = ['$http'];

    function warrantyService($http) {
        var service = {
            readClaimsData: readClaimsData,
            getFilePath2URI : getFilePath2URI
        };

        var baseUrl = "http://localhost:3000";

        function readClaimsData() {
            return $http.get(baseUrl + "/warrantyReport").then(getDataSuccess, getDataError);
        }

        function getFilePath2URI(filePath) {
            return $http({
                url: baseUrl + "/filePath2Uri",
                method: "GET",
                params: {filePath: filePath}
            }).then(getDataSuccess, getDataError);
            //return $http.get(baseUrl + "/filePath2Uri", ).then(getDataSuccess, getDataError);
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