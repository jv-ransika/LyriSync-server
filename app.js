const express = require('express');

const appconfig = require('./config/appConfigs');
const Member = require('./controllers/membersController');
const msgController = require('./controllers/msgController');

const app = express();
const expressWs = require('express-ws')(app);

const PORT = appconfig.port

app.listen(PORT);

app.get('/', function (req, res) {
    console.log('get route', req.testing);
    res.end();
});

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

/* app.get('/create_group', (req, res) => {
    res.send(createHash('sha256').update(`${Date.now()}`).digest('base64').toString())
}) */
