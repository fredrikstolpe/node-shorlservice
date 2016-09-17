var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use('/image', require('./controllers/image')());
app.use('*', require('./controllers/wildcard-subdomain')());

app.use(require('./middleware/404'));
app.use(require('./middleware/error'));

var server = http.createServer(app);

server.listen(3000);
console.log("Listening at port 3000");