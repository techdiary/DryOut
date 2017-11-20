let LocalStratergy = require('passport-local').Strategy;

let User = require('../models/user');

//export this function to app
module.exports= function (passport) {

  //Used to sereialize user
  passport.serializeUser( function (user, done) {
    done(null, user.id);
  });

//Used to deserialize user
  passport.deserializeUser( function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//=========== LOCAL SIGNUP
  passport.use('local-signup', new LocalStratergy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //allows us to pass request back to callback
  },
    function (req, email, password, done) {
    //  asynchronous
    //  User.findOne won't be called unless data is sent back
      process.nextTick( function () {
      //  Finds a user whose email is same as forms email
      //  We are checking if user trying to login already exists
        User.findOne({ 'local.email': email}, function(err, user){
          if (err) {
            return done(err);
          }

        //  check to see if there's already a user with that email
        if (user) {
            return done(null, false, {message: 'The email is already taken'});
        }
        else {
        //    If there's no user with that email
        //  Create the user
          let newUser = new User();

        //  Set the user LocalCredentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

        //  Save the user
          newUser.save( function (err) {
            if (err) {
             throw err;
            }
            return done(null, newUser);
          });
        }
        });
      });
    }));

  // ============ LOCAL LOGIN =========
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStratergy({
    //  By default, local strategy uses username but we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Allow you to pass back the entire request to callback
  },
    function (req, email, password, done) {// Callback with email and password from out form
    //  Find a user whose email is same as the forms email
    //  we are checking if user trying to login already exists
      User.findOne( {'local.email': email}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done( null, false, {message: 'No user found'});
        }
        if(!user.validPassword(password))
          return done( null, false, { message: 'Oops! Wrong password!'});

      //  All is well, return user
        return done(null, user);
      });
    }
    ));
};



