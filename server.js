var express = require('express');
const db = require('./queries');
var bodyParser = require('body-parser');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', db.getMessages);
app.post('/messages', db.createMessage);

io.on('connection', () => {
  console.log('a user is connected');
});

var server = app.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
