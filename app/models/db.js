const mysql = require('mysql');
const dbconfig = require("../config/db.config.js");
const connection = mysql.createConnection({
    host : dbconfig.HOST,
    user : dbconfig.USER,
    password : dbconfig.PASSWORD,
    database : dbconfig.DB
});
connection.connect(error => {
    if(error) throw error;
    console.log("Connection is established");
});
module.exports = connection;