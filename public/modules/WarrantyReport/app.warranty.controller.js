(function () {
    angular.module("DashboardPoc").controller("WarrantyController", WarrantyController);

    WarrantyController.$inject = ['WarrantyService'];

    function WarrantyController(warrantyService) {
        var vm = this;

        vm.highState = 25;
        vm.warrantyData = [];
        vm.competitors = [];
        vm.dashboard = '';
        vm.dataTable = null;


        vm.showGeoChart = showGeoChart;
        vm.showTableChart = showTableChart;
        //vm.showPieChart = showPieChart;
        //vm.increaseHighValue = increaseHighValue;

        init();

        function init() {
            warrantyService.readClaimsData().then(function (response) {
                vm.warrantyData = response;
                //showGeographyChart();
            });
        }

        function showGeoChart() {
            var stateCodeData = [];
            var dataForChartTable = [
                [{label: 'State', id: 'state'}, {label: 'Warranty Sales', id: 'sales', type: 'number'}]
            ];
            _.map(vm.warrantyData, function (warrantyObject) {
                var key = 'US-' + warrantyObject['state_code'];
                if (stateCodeData.hasOwnProperty(key)) {
                    stateCodeData[key] += 1;
                } else {
                    stateCodeData[key] = 1;
                }
            });
             _.mapObject(stateCodeData, function(val, key){
                var array = [];
                array.push(key, val);
                dataForChartTable.push(array);
            }

            );
            var data = google.visualization.arrayToDataTable(dataForChartTable);
            var geochart = new google.visualization.GeoChart(document.getElementById('chart_div'));
            geochart.draw(data, {width: 556, height: 347, region: "US", resolution: "provinces"});
        }

        function showTableChart() {
            var queryString = encodeURIComponent('select A, B, C, D');
            var query = new google.visualization.Query(
                'https://docs.google.com/spreadsheets/d/12gAbshVc9j1cO9YyGDxJVDX-X-ExrLQFovA4LJQFAAY/gviz/tq?gid=0&headers=1&tq=' + queryString);
            query.send(handleQueryResponse);
        }

        var handleQueryResponse = function(response) {
            if (response instanceof Error) {
                console.log(response);
                return;
            }
            vm.dataTable = response.getDataTable();
            drawChart();

        };

        var drawChart = function (){
            var result = google.visualization.data.group(
                vm.dataTable,
                [0, 2],
                [{'column': 0, 'aggregation': google.visualization.data.count, 'type': 'number', 'label': '# of Warranties' },
                    {'column': 2, 'aggregation': google.visualization.data.count, 'type': 'number', 'label': '# of SKU_Class'}]
            );

            var chart = new google.visualization.Table(document.getElementById('chart_div'));
            chart.draw(result, { height: 400, width: 1000 });
        }
    }
})();

