var User = require('../db/user'),
    express = require('express'),
    router = express.Router();
    path = require('path');

// remove users whose date has expired
// if it's over 15 seconds then delete
var x = Date.now();
setTimeout(function() {
var y = Date.now();
console.log(y-x);
}, 30000);
setInterval(function () {
  User.find({}, function (err, users) {
    var y = Date.now();
    var current = new Date().getTime() / 1000;
    for (var i = 0; i < users.length; i++) {
      if ((Math.floor(users[i].date / 1000)) + 15 < current) {
        users[i].remove();
        console.log('removed at ' + y - x);
    }
  }
  });
}, 30000);


router.put('/makeRoom', function(req, res) {
  User.create(req.body, function (err, user) {
    user.room  = req.body.room;
    user.save(req.body);
    res.send(user);
  });
});


router.get('/findRoom', function(req, res) {
  User.find({}, function (err, users) {
    if (err) 
      throw err;
    var rooms = users.filter(function(user) {
      return user.room !== '';
    });
    var randomNum = Math.floor(Math.random() * rooms.length);
    if (!rooms[randomNum])
      res.send({message: 'Sorry, no current rooms available.'});
    else
      
      res.send(rooms[randomNum]);
      if (rooms[randomNum]) {
        rooms[randomNum].remove();
      }
  });
});

module.exports = router;