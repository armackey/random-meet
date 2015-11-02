var express = require('express'),
    app = express(),
    port = 5000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cool = require('cool-ascii-faces'),
    path = require('path');
    mongoose.connect('mongodb://localhost/cb');


app.use(express.static('client'));
// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes/user'));




app.listen(process.env.PORT || 5000);
console.log('server running on', port);