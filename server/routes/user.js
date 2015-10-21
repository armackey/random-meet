var User = require('../db/user'),
    express = require('express'),
    router = express.Router();
    path = require('path');

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
    console.log(randomNum);
    if (!rooms[randomNum])
      res.send({message: 'Sorry, no current rooms available.'});
    else
      res.send(rooms[randomNum]);
      if (rooms[randomNum]) {
        console.log(rooms[randomNum]);
        rooms[randomNum].room = '';
        rooms[randomNum].save();
      }
  });
});

module.exports = router;