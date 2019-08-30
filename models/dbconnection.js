/* DATABASE */
const CONFIG = require('./config/config');
const mysql = require('mysql2');
const connection = mysql.createConnection(CONFIG.db);
connection.connect(err => {
 if (err) {
    console.error('An error occurred while connecting to the DB')
    throw err
  }
  console.log("Connected to the database " + CONFIG.db.database);
});
const ip = 876814380;
connection.query('SELECT * FROM iplist WHERE  ? BETWEEN ip_from AND ip_to', [ip], (error, result, fields) => {
  if (error) {
    console.error('An error occurred while executing the query');
    throw error;
  }
  console.log("Here is the result: ", result);
});

module.exports = connection;