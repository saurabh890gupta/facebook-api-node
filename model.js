var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  facebookID:String,
  accessToken:String

  
},{collation:'User'});

module.exports = mongoose.model('User', User);