var annotationChart = (function () {
  var service = {
    annotationChart: annotationChart
  };

  google.load('visualization', '1', {'packages': ['annotationchart']});
  //google.setOnLoadCallback(annotationChart);

  function annotationChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Kepler-22b mission');
    data.addColumn('string', 'Kepler title');
    data.addColumn('string', 'Kepler text');
    data.addRows([
      [new Date(2314, 2, 15), 12400, undefined, undefined],
      [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter'],
      [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall'],
      [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!'],
      [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties'],
      [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost']
    ]);

    var chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));

    var options = {
      displayAnnotations: true
    };

    chart.draw(data, options);
  }

  return service;
})();