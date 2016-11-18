var express = require('express');
var moment = require('moment');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/:str', function (req, res) {
	var str = req.params['str'];
	var response;
	

	if(Date.parse(str + " 00:00:00 GMT")){
		var timeUnix = Date.parse(str + " 00:00:00 GMT")/1000;
		var timestamp = moment.unix(timeUnix).add(1, 'year').format('LL');
		response = {
			unix: timeUnix,
			natural: timestamp
		}
		res.send(response);
	}
	else if(moment.unix(str).add(1, 'year').format('LL') != "Invalid date"){
		var timestamp = moment.unix(str).add(1, 'year').format('LL');
		var timeUnix = Date.parse(timestamp)/1000;
		response = {
			unix: timeUnix,
			natural: timestamp
		}
		res.send(response);
	}
	else{
		res.send({
			unix: null,
			natural: null
		});
	}
	
	// 
});

app.listen(app.get('port'), function(){
  console.log('App listening on', app.get('port'));
});