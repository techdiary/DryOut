const express= require('express');
const router = express.Router();
const passport = require('passport');

// var uri = "mongodb://aayush24:sharmaji@meanbeta-shard-00-00-sshqm.mongodb.net:27017,meanbeta-shard-00-01-sshqm.mongodb.net:27017,meanbeta-shard-00-02-sshqm.mongodb.net:27017/users?ssl=true&replicaSet=MEANbeta-shard-0&authSource=admin";

router.get( '/', (req, res) => {
  var testObject = {
    AppName: "Dryout",
    "Version": 1.0
  };

  res.json(testObject);
} );

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login',
    function (err, user, info) {
      if (err) {
        res.status(401);
        return next(err);
      }
      if(!user) {
        res.status(401);
        res.json(info.message);
        return next();
      }
      //TODO: Send an Object
      res.json(`Email: ${user.local.email} Successfully logged in.`)
    })(req, res, next);
});

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup',
    function (err, user, info) {
      if (err) {
        res.status(401);
        return next(err);}
      if(!user) {
        res.status(401);
        res.json(info.message);
        return next();
      }
    res.json(`Email: ${user.local.email}, id: ${user._id} `);
    })(req, res, next);
});


module.exports = router;
