/*jshint esversion: 6 */
// 'use strict';

/* DATABASE */
const CONFIG = require('../config/config');
const mysql = require('mysql2');

const connection = mysql.createConnection(CONFIG.db);

connection.connect(err => {
 if (err) {
    console.error('An error occurred while connecting to the DB', err);
    throw err;
  }
  console.log("Connected to the database ==> " + CONFIG.db);
});

module.exports = connection;

