const session = require('express-session');
var mySession;

exports.setMySession = function (firstname) {
    session.firstname = firstname;
    mySession = session;
    console.log("Session Created.");
};

exports.setUsernameSession = function (firstname) {
    session.firstname = firstname;
    mySession = session;
    console.log("Username Session Created.");
};

exports.getMySession = function () {
    return mySession;
};

exports.deleteSession = function () {
    mySession = null;
    console.log("Session Deleted.");
}