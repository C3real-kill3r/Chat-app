var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/chat_app';
const client = new Client({
  connectionString: connectionString
});
client.connect();

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        res.sendStatus(200);
    })
})


var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});
