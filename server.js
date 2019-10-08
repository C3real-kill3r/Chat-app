var express = require('express');
const db = require('./queries');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http)

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


io.on('connection', () => {
  console.log('a user is connected')
})
// const { Client } = require('pg');
// const connectionString = 'postgres://postgres:postgres@localhost:5432/chat_app';
// const client = new Client({
//   connectionString: connectionString
// });
// client.connect();

// app.get('/messages', (req, res) => {
//   Message.find({}, (err, messages) => {
//     res.send(messages);
//   });
// });

// app.post('/messages', (req, res) => {
//   var message = new Message(req.body);
//   message.save(err => {
//     if (err) sendStatus(500);
//     res.sendStatus(200);
//   });
// });

app.get('/messages', db.getMessages);
app.post('/messages', db.createMessage);

var server = app.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
