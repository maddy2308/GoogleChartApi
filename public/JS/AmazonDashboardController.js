(function () {
  angular.module("AmazonDashboard").controller("AmazonDashboardController", AmazonDashboardController);

  AmazonDashboardController.$inject = ['AmazonChartService'];

  function AmazonDashboardController(amazonChartService) {
    var vm = this;

    vm.highState = 25;
    vm.amazonAsinData = {};
    vm.competitors = [];
    vm.dashboard = '';

    vm.showColumnChart = showColumnChart;
    vm.showPieChart = showPieChart;
    vm.increaseHighValue = increaseHighValue;

    init();

    function init() {
      vm.competitors = ['Assurant', 'Canopy', 'SmartGuard'];
      amazonChartService.readAmazonData().then(function (response) {
        vm.amazonAsinData = response;
      });
    }

    function showColumnChart() {
      vm.dashboard = 'columnChartDashboard';
      createColumnChartDashBoard();
    }

    function showPieChart() {
      vm.dashboard = 'pieChartDashboard';
      var response = vm.amazonAsinData;
      var dt = createDataSourceForChart(response);
      // TODO
      // this is bad way of saving but for POC it is ok
      var winsObject = {1: 0, 2: 0, 3: 0, 4: 0};
      angular.forEach(dt, function (value, key) {
        var i = value.indexOf(Math.max.apply(Math, value.slice(1)));
        if (i > 0) {
          winsObject[i] += 1;
        }
      });

      createPieChartDashBoard(winsObject);
    }

    function increaseHighValue() {
      vm.highState++;
    }

    function createColumnChartDashBoard() {
      var response = vm.amazonAsinData;
      var dt = createDataSourceForChart(response);
      var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));
      var filterBattleGroup = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filter_div',
        'options': {
          'filterColumnLabel': 'BattleGroup #'
        },
        'state': {'lowValue': 1, 'highValue': vm.highState}
      });
      var data = google.visualization.arrayToDataTable(dt);
      var options = {
        height: 400,
        width: 800,
        title: 'Comparison of Amazon Prices with Square Trade Competitors',
        isStacked: 'percent',
        hAxis: {
          title: 'Battle Group #',
          format: 'decimal'
        },
        vAxis: {
          title: 'Prices'
        },
        animation: {
          "startup": true,
          duration: 1000,
          easing: 'out'
        }
      };

      var stackChart = new google.visualization.ChartWrapper({
        'chartType': 'ColumnChart',
        'containerId': 'chart_div',
        'options': options
      });

      dashboard.bind(filterBattleGroup, stackChart);
      dashboard.draw(data);
    }

    function createPieChartDashBoard(rawData) {
      var data = [['Competitor Name', 'Number Of wins']];

      angular.forEach(vm.competitors, function (value, key) {
        data.push([value, rawData[key + 1]]);
      });
      data.push(['Square Trade', rawData[4]]);

      var options = {
        title: 'Percentage of times each Competitor wins',
        width: 600,
        height: 600,
        legend: {
          position: 'right',
        },
        is3D: true
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
      chart.draw(google.visualization.arrayToDataTable(data), options);
    }

    function createDataSourceForChart(response) {
      var arrayToDataTable = [['BattleGroup #', 'Assurant', 'Canopy', 'SmartGuard', 'SquareTrade']];
      angular.forEach(response.productComparisonData, function (value, key) {
        var tempPrices = createAsinPriceObject(vm.competitors, value.competitorProducts);
        var sqTrdPrice = value.stAsin.lastPrice > 0 ? value.stAsin.lastPrice : 0;

        arrayToDataTable.push([key + 1,
          tempPrices['assurant'], tempPrices['canopy'], tempPrices['smartguard'], sqTrdPrice]);
      });
      return arrayToDataTable;
    }

    function createAsinPriceObject(competitors, competitorProducts) {
      var obj = {};

      angular.forEach(competitors, function (value, key) {
        obj[value.trim().toLowerCase()] = 0;
      });
      angular.forEach(competitorProducts, function (value, key) {
        if (value.merchant && value.lastPrice && value.lastPrice > 0) {
          obj[value.merchant.trim().toLowerCase()] = value.lastPrice;
        }
      });

      return obj;
    }

  }

})();