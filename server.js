const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');

let configDB = require('./config/database');
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, {
  useMongoClient: true
}); // connect to database

require('./config/passport')(passport); //pass passport for configuration
//GET OUR API ROUTES
const api = require('./server/route/api');

const app = express();

app.use(logger('dev'));
//PARSER FOR POST DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie Parser
app.use(cookieParser());
//Handle session
app.use(session( {secret: 'iloverockandroll',
                  resave: true,
                  saveUninitialized: false
})); //Session secret
// Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Points STATIC FILES TO DIST
app.use( express.static(path.join(__dirname, 'dist')));

//SET API ROUTES
app.use('/api', api);

app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

/*GET port from environment and store in express
*/
const port = process.env.port || '3000';
app.set('port', port);

//CREATE HTTP SERVER
const server = http.createServer(app);

// PiggyBack WebSocket on HTTP Server
const io = require('socket.io')(server);
//Hold connected user list
let users = [];

io.on('connection', (socket)=> {
  console.log('A User Connected', socket.id);

  socket.on('send-nickname', function (nickname) {
    socket.nickname= nickname;
    users.push(socket.nickname);
    console.log(users);
  });

  socket.on('disconnect', () =>{
    console.log('A User Disconnected');
  });

  socket.on('add-user', (username) => {
    console.log(username +' Logged in');

    //storing variable
    socket.username = username;
    users[socket.id] = socket.username;
  //  Tell everyone
    socket.broadcast.emit( 'broadcast', {description: username + ' Logged in'});

    //TODO: Getting all users list
  //  TODO: Sending all users list, and setting if online or offline

  });

  socket.on('add-message', (message) => {
    io.emit('message', { text: message, name: socket.nickname})
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', socket.username + " is typing..")
  })
});

server.listen(port, ()=> console.log(`API running on localhost:${port}`));
