
/**
 * Module dependencies.
 */

var express = require('express');

var mysql = require('mysql');
var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "example"

});
var app = express();
var http = require('http');
var gm = require('googlemaps');
var hbs = require('hbs');

var parsedJSON = require('./locations.json');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//google maps code
app.get('/location', function (req, res) {

res.render('location', {latlng: parsedJSON.result});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
