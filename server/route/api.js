const express= require('express');
const router = express.Router();

var DB = require('../db');
var uri = "mongodb://aayush24:sharmaji@meanbeta-shard-00-00-sshqm.mongodb.net:27017,meanbeta-shard-00-01-sshqm.mongodb.net:27017,meanbeta-shard-00-02-sshqm.mongodb.net:27017/users?ssl=true&replicaSet=MEANbeta-shard-0&authSource=admin";


router.get( '/', (req, res) => {
  var testObject = {
    AppName: "Dryout",
    "Version": 1.0
  };

  res.json(testObject);
} );

module.exports = router;
