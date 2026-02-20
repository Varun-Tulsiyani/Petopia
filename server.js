const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const myModule = require('./public/myModule')
const mySess = require('./public/mySession')
querystring = require('querystring');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'petopia'
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.json({ success: false });
        }

        const query = "SELECT * FROM accounts WHERE email = ? AND password = ?";
        connection.query(query, [email, password], function (err, results) {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return res.json({ success: false });
            }

            if (results.length > 0) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        });
    });
});

app.post('/signup', (req, res) => {
    const { firstname, lastname, dob, gender, phoneNumber, email, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.json({ success: false });
        }

        const query = "INSERT INTO accounts (firstName, lastName, dob, gender, phoneNumber, email, pass) VALUES (?, ?, str_to_date(?, '%Y-%m-%d'), ?, ?, ?, ?)";
        connection.query(query, [firstname, lastname, dob, gender, phoneNumber, email, password], function (err, results) {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return res.json({ success: false });
            }

            if (results.length > 0) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        });
    });
});

app.post('/appointment', (req, res) => {
    const { name, email, phoneNumber, address, city, service, prefDate, prefTime, request } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.json({ success: false });
        }

        const query = "INSERT INTO appointments (name, email, phoneNumber, address, city, service, prefDate, prefTime, request) VALUES (?, ?, ?, ?, ?, ?, str_to_date(?, '%Y-%m-%d'), ?, ?)";
        connection.query(query, [name, email, phoneNumber, address, city, service, prefDate, prefTime, request], function (err, results) {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return res.json({ success: false });
            }

            if (results.length > 0) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        });
    });
});

app.get('/home', (req, res) => {
    s = mySess.getMySession();
    if (s !== undefined) {
        if (s.email != "" && s.email !== undefined) {
            myModule.navigateToHome(res, s);
        }
    } else {
        myModule.login(res);
    }
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})