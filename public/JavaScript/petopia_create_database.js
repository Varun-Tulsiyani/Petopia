var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql_database = "CREATE DATABASE petopia";
    con.query(sql_database, function (err, result) {
        if (err) throw err;
        console.log("Petopia Database Created");
    });
});