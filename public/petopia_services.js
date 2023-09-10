const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "petopia"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }

    console.log("Connected to the database.");

    const query = "SELECT service FROM appointments";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return;
        }

        console.log("Services retrieved successfully.");
        const var_service = results.map(row => row.service);
        console.log("Services:", service);
        connection.end();
    });
});