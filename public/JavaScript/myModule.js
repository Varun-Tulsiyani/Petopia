var mysql = require('mysql');
var fs = require('fs');
var con;

exports.connectToDB = function () {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "petopia"
    });
    return con;
};

exports.postAuthentication = function (res, mySess, firstname, body) {
    if (firstname !== "" && firstname !== undefined) {
        mySess.setMySession(body.firstname);
        mySess.setUsernameSession(body.firstname);
        s = mySess.getMySession();
        if (s.firstname != "" && s.firstname !== undefined) {
            fs.readFile("Home.html", function (err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }
    }
};

exports.login = function (res) {
    fs.readFile("LogIn.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.logout = function (res) {
    fs.readFile("LogIn.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        con.destroy();
        return res.end();
    });
};

exports.navigateToHome = function (res) {
    fs.readFile("Home.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.navigateToUserProfile = function (res, userObj) {
    fs.readFile("Profile.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.write("<script>");
        res.write("document.getElementById(\"firstname\").innerHTML = '" + userObj[0].firstname + "';" + "\n");
        res.write("document.getElementById(\"lastname\").innerHTML = '" + userObj[0].lastname + "';" + "\n");
        res.write("document.getElementById(\"dob\").innerHTML = '" + userObj[0].dob + "';" + "\n");
        res.write("document.getElementsByClassName(\"gender\")[0].innerHTML = '" + userObj[0].gender + "';" + "\n");
        res.write("document.getElementById(\"phno\").innerHTML = '" + userObj[0].phno + "';" + "\n");
        res.write("document.getElementById(\"email\").innerHTML = '" + userObj[0].email + "';" + "\n");
        res.write("document.getElementById(\"password\").innerHTML = '" + userObj[0].password + "';" + "\n");
        res.write("</script>");
        return res.end();
    });
};

exports.authenticateUser = function (res, body, mySess, myCallback) {
    var email = body.email;
    var password = body.password;
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT * from accounts WHERE email = '" + email + "' AND password = '" + password + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result !== undefined && result.length > 0) {
                myCallback(res, mySess, result[0].firstname, body);
            }
            else {
                var message = "<script>document.getElementById(\"demo_error_message\").innerHTML = \"You have entered an incorrect username or password!\";</script> ";
                fs.readFile("login.html", function (err, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end(message);
                });
            }
        });
    });
};

exports.getUser = function (res, mySess, myCallback) {
    var sql = "SELECT * from accounts WHERE email = " + mySess.email;
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result !== undefined && result.length > 0) {
            myCallback(res, result, mySess);
        }
    });
};