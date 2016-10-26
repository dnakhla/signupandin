// init project
const express = require('express');
const app = express();
const users = require('./custom_modules/secure-user'); //for password hashing
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address()
        .port);
});
