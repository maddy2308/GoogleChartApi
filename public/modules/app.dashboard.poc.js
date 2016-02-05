(function(){
    angular.module("DashboardPoc", ['ngMaterial', 'gridster', 'ngRoute'])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                when('/amazon-dasboard', {
                    templateUrl: '../public/modules/AmazonReport/amazon-dashboard.html',
                    controller: 'AmazonDashboardController',
                    controllerAs : 'amazonCtrl'
                }).
                when('/warranty-dasboard', {
                    templateUrl: '../public/modules/WarrantyReport/warranty-dashboard.html',
                    controller: 'WarrantyController',
                    controllerAs : 'warrantyCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
            }]);;
})();