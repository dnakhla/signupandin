// init project
const express = require('express');
const app = express();
const Users = require('./custom_modules/secure-user'); //for password hashing
const bodyParser = require('body-parser');
const db = require('./db/db_settings.json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
app.post("/user", function (request, response) {
    let userRows = Users.getUser(request.body.email, db);
    userRows
        .then(function (data) {
            if (data.length > 0) {
                let user = data.shift();
                Users.addUser(request.body.email, request.body.password, db);
                response.json(user);
            } else {
                response.status(400)
                    .send({
                        error: 'email already exists for another account'
                    });
            }
        })
        .catch(function (err) {
            response.json({
                error: 500,
                err: err
            })
        })
});
app.get("/user/:email", function (request, response) {
    //Users.getUser()
    response.json(request.body);
});
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address()
        .port);
});
