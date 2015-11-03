var express = require('express'),
    config = require('./config/config'),
    app = express(),
    port = 5000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cool = require('cool-ascii-faces'),
    path = require('path');
    mongoose.connect(process.env.MONGOLAB_URI || config.db);



app.use(express.static('client'));
// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes/user'));




app.listen(process.env.PORT || port);
console.log('server running on', port);