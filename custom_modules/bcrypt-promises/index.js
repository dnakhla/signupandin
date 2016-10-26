'use strict'
const bcrypt = require('bcryptjs'); //used to hash passwords
const mysql = require('mysql'); //used to connect to db
const salt_length = 10; //setting for salt length used in new passwords
const selectStatment = 'SELECT * FROM users WHERE email like ?'; //how we pull use object

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
                        password_hash: hash
                    }
                    resolve(userObject);
                }
            });
        });
    })

}
getUser('dnakhla', {
        host: "localhost",
        user: "root",
        password: "",
        database: 'test_app'
    })
    .then(console.log)
    .catch(console.log)

function getUser(email_candidate, db) {
    let email = mysql.escape(email_candidate);
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: 'test_app'
        });
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

function compare(userObject) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(userObject.password_candidate, userObject.password_hash, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });

}
