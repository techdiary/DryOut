let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

//Define schema for our user
let userSchema = mongoose.Schema({

  local : {
    email: String,
    password: String,
    username: String,
  },
  facebook : {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  }
});
//Methods
//============= Generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//Checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

//Create the model for use and export it to app
module.exports = mongoose.model('User', userSchema, 'user');
