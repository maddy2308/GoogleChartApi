var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/AmazonReport', function (req, res, next) {

  var options = {
    root: __dirname + '/../resources/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Headers': "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
      'Access-Control-Allow-Methods': "GET, PUT, POST"
    }
  };

  var fileName = "AmazonReport.json";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});