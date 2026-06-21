/*jshint esversion: 6 */
const express 		= require('express');
const bodyParser 	= require('body-parser');
const rateLimit		= require('express-rate-limit');
const app   		= express();
app.use("/public", express.static('public')); 
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

const searchLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 30,
	message: { error: 'Too many requests, please try again later.' }
});

app.post('/search/ip', searchLimiter, ipList.getIPfields);


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Search IP has just started!");
});



