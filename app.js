const express 		= require('express');
const bodyParser 	= require('body-parser');
const app   		= express();
// Test DB connection.      
const db 			= require("./models"); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/views'));

const ipList = require('./controllers/iplist');

app.get( '/', function(req, res, next) {
	res.sendFile("./views/index.html");
});

app.post('/search/ip', ipList.getIPfields);


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Search IP has just started!");
});



