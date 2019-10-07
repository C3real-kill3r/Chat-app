var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname));

const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://brybzlee:Iloveit@brybz-lee-aymrc.mongodb.net/admin?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});

var server = app.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
