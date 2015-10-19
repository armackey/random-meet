var express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');
    mongoose.connect('mongodb://localhost/cb');

app.use(express.static('client'));
// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes/user'));




app.listen(port);
console.log('server running on', port);