var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "petopia"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql_table = "CREATE TABLE accounts (firstName VARCHAR(50)," +
        "lastName VARCHAR(50)," +
        "dob DATE," +
        "gender ENUM('Male', 'Female')," +
        "phoneNumber INT," +
        "email VARCHAR(255) PRIMARY KEY," +
        "pass VARCHAR(50))";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Accounts Table Created");
    });

    var sql_table = "CREATE TABLE appointments (name VARCHAR(100), " +
        "email VARCHAR(255)," +
        "phoneNumber INT," +
        "address VARCHAR(255)," +
        "city VARCHAR(50)," +
        "service VARCHAR(100)," +
        "prefDate DATE," +
        "prefTime TIME," +
        "request VARCHAR(255)," +
        "PRIMARY KEY (name, prefDate))";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Appointment Table Created");
    });
});