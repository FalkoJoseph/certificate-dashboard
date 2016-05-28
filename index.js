// Enable promise error logging
require('promise/lib/rejection-tracking').enable();

var express = require('express');
var app = express();
var certificate = require('./src/certificate')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var promise = certificate.getCertificationData();

  certificate.getCertificationData().then(function(data) {
    responseData = {
      certInfo: JSON.stringify(data),
      runDate: new Date().toDateString()
    }

    if(request.headers['content-type'] == 'application/json') {
      response.json(responseData);
    } else {
      response.render('pages/index', responseData);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


