var express = require('express');
var path = require('path');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

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

app.get('/AmazonReport', function (req, res, next) {
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


app.get('/warrantyReport', function (req, res, next) {
  var fileName = "claims_data.json";
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

app.get('/filePath2Uri', function (req, res) {
  var filePath = req.param("filePath");
  return res.send(fileUrl(filePath), options);
});

function fileUrl(str) {
  if (typeof str !== 'string') {
    throw new Error('Expected a string');
  }

  var pathName = path.resolve(str).replace(/\\/g, '/');

  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== '/') {
    pathName = '/' + pathName;
  }
  var encodedUrl = encodeURI('file://' + pathName);
  return encodedUrl;
}



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});