const express = require('express');

const app = express();
var expressWs = require('express-ws')(app);

const PORT = 3000

app.listen(PORT);

app.get('/', function(req, res, next){
    console.log('get route', req.testing);
    res.send("hellow");
    res.end();
  });
  
app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(`from ${ws._socket.remoteAddress} :` + msg);
    });
    console.log('socket', ws._socket.remoteAddress);
  });

/* app.get('/getqr', (req, res) => {
    
}) */
