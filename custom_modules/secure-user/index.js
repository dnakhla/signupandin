'use strict'
const bcrypt = require('bcryptjs'); //used to hash passwords
const mysql = require('mysql'); //used to connect to db
const salt_length = 10; //setting for salt length used in new passwords
const selectStatment = 'SELECT id,email, CONVERT(password_hashed USING utf8) as password_hashed FROM users WHERE email like ?'; //how we pull use object
const insertStatment = 'INSERT INTO users SET ?'; //how and where we insert


function hashPassword(user_email, password) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(salt_length, function (err, salt) {
            if (err) {
                return reject(err)
            }
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    reject(err)
                } else {
                    const userObject = {
                        user: user_email,
                        password_hashed: hash
                    }
                    resolve(userObject);
                }
            });
        });
    });
}

function getUserAttempt(user_email_candidate, password_candidate, db) {
    let _userObject;
    return getUser(user_email_candidate, db)
        .then(function (userObject) {
            _userObject = userObject;
            let userObjectCandidate = Object.assign({
                password_candidate: password_candidate
            }, userObject);
            return testUserObject(userObjectCandidate);
        })
        .then(function (isCorrect) {
            if (isCorrect) {
                return _userObject;
            } else {
                return Promise.reject('Incorrect Password.')
            }

        });
}


function addUserToDb(userObject, db) {
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(db);
        connection.query(insertStatment, [userObject], function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows);
            }
            connection.destroy();
        });
    });
}


function testUserObject(userObject) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(userObject.password_candidate, userObject.password_hash, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function addUser(user_email, password, db) {
    return hashPassword(user_email, password)
        .then(function (userObject) {
            return addUserToDb(userObject, db);
        });
}

function getUser(email_candidate, db) {
    let email = (email_candidate);
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(db);
        connection.query(selectStatment, [email], function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows);
            }
            connection.destroy();
        });
    });
}

module.exports = {
    addUser: getUserAttempt,
    getUser: getUser
}
