var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  room: {type: String, default: ''},
  date: {type: Date, default: new Date()}
});

module.exports = mongoose.model('User', UserSchema);