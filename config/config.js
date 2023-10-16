/*jshint esversion: 6 */
require('dotenv').config();//instatiate environment variables

let CONFIG = { app:{}, db:{} }; //Make this global to use all over the application

CONFIG.app.app      		= process.env.APP || '0.0.0.0';
CONFIG.app.port     		= process.env.PORT;
CONFIG.dialect      		= process.env.DB_DIALECT;
		
CONFIG.db.host      		= process.env.DB_HOST;
CONFIG.db.port      		= process.env.DB_PORT;
CONFIG.db.database  		= process.env.DB_NAME;
CONFIG.db.user      		= process.env.DB_USER;
CONFIG.db.password  		= process.env.DB_PASSWORD;   
CONFIG.db.connectTimeout	= process.env.DB_TIMEOUT;



//CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
//CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;
