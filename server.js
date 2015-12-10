var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

//setup public assets
app.use('/assets', express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

require('./app/routes.js')(app);

app.listen(port);
console.log('Listening to', port);
