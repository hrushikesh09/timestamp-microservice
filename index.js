var express = require('express');
var app = express();
var moment = require('moment');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/:date', function(req, res){

  var unixTimeStamp = null, date = null;

  if(moment(req.params.date).isValid()){

    unixTimeStamp = moment(req.params.date).unix();
    date = req.params.date;

  } else if(!isNaN(moment.unix(req.params.date))){

    unixTimeStamp = req.params.date;
    date = moment.unix(req.params.date).format("MMMM DD, YYYY");
  }

  var json = {
    unixTimeStamp: unixTimeStamp,
    natural: date
  }

  res.setHeader('content-type', 'application/json');
  res.send(json);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
