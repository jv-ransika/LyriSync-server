const express = require('express');

// importing configs
const appconfig = require('./config/appConfigs');

// importing controllers
const Member = require('./controllers/membersController');
const msgController = require('./controllers/msgController');

// creating app
const app = express();
const expressWs = require('express-ws')(app);

// start app
const PORT = appconfig.port
app.listen(PORT);

// handle ws request
app.ws('/', (ws, req) => {
    ws.on('message', function (msg) {
        msgController(ws, msg);
    });

    ws.on('close', function () {
        console.log('close - ', ws._socket.remoteAddress);
    })

    let nm = msgController(ws, `{"action" : "new_member"}`);
    if (nm) {
        console.log(`new member created id - ${nm}`);
    }
});

// get handler for emergency
// app.get('/', function (req, res) {
//     console.log('get route', req.testing);
//     res.end();
// });