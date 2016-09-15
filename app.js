var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
 
mongoose.connect('mongodb://localhost/my_database');

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected');
});

var app = express();

app.use('/api/shorl', require('./controllers/api/shorl')());

app.use(require('./middleware/404'));
app.use(require('./middleware/error'));

var server = http.createServer(app);

server.listen(3000);