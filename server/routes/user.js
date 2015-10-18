var User = require('../db/user'),
    express = require('express'),
    router = express.Router();

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
    var rooms = users.filter(function (user) {
      return user.room !== '';
    });
    res.send(rooms);
  });
});

module.exports = router;