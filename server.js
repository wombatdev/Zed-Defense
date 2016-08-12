// dependencies
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var passport = require('passport');
var config = require('./oauth.js');
var fbAuth = require('./authentication.js');

var mongoose = require('./db/connection.js');
var User = mongoose.model("User");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.set("port", process.env.PORT || 3001);
app.use("/assets", express.static("public"));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').json({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// var cmongo  = require("connect-mongo");
// var MongoSession = cmongo(session);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());



// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

app.get('/signup/facebook',
    passport.authenticate('facebook'),
    function(req, res) {});

app.get('/signup/facebook/return',
    passport.authenticate('facebook', {
        failureRedirect: '/signup'
    }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/splash', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/menu', function(req, res) {
    console.log("HEYHEYHEYHEYHEYHEYHEY");
    console.log(req);
    console.log("YOYOYOYOYOYOYOYOYOYOYYOO");
    User.findOne({_id: req.session.passport.user._id}).then(function(user){

        console.log(user);
        res.json(user);
    });
});

app.get('/*', ensureAuthenticated, function(req, res) {
    User.findById(req.session.passport.user, function(err, user) {
        if (err) {
            console.log(err); // handle errors
            console.log("You tried /*. req.isAuthenticated() was TRUE. But we did not find a user with that ID");
            res.redirect('/signup');
        } else {
            console.log("You tried /*. req.isAuthenticated() was TRUE. We found a user and are redirecting you to /menu");
            res.redirect('/menu');
        }
    });
});

// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("req.isAuthenticated() was TRUE");
        return next();
    }
    console.log("req.isAuthenticated() was FALSE");
    res.redirect('/splash');
}

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var connectCounter = 0;

var currentPlayers = [];

io.on('connection', function(socket) {
    connectCounter++;
    currentPlayers.push({
        name: 'player'+connectCounter,
        uid: socket.client.conn.id
    });
    // console.log(socket);
    console.log(socket.client.conn.id+" has joined");
    socket.on('disconnect', function() {
        console.log(socket.client.conn.id+" has left");
        for (var i = currentPlayers.length -1 ; i >= 0; i--) {
            if (currentPlayers[i].uid == socket.client.conn.id) {
                currentPlayers.splice(i,1);
            }
        }
        connectCounter--;
    });
    socket.on('otherPlayersCheckOutput', function(msg) {
        var response = currentPlayers.filter(function(player) {
            if (player.uid != socket.client.conn.id) {
                return player;
            }
        });
        console.log(response);
        console.log(currentPlayers);
        socket.emit('otherPlayersCheckInput', response);
    });
    socket.on('startGame', function(msg) {
        console.log(msg);
        io.emit('startGame', msg);
    });
    socket.on('bulletFiredOutput', function(msg) {
        var incomingMsg = JSON.parse(msg);
        socket.broadcast.emit('bulletFiredInput', JSON.stringify(incomingMsg));
    });
    socket.on('spawnZombieOutput', function(msg) {
        var incomingMsg = JSON.parse(msg);
        io.emit('spawnZombieInput', JSON.stringify(incomingMsg));
    });
    socket.on('playerMovingOutput', function(msg) {
        var direction = msg;
        var player = socket.client.conn.id;
        var response = ({
            player: player,
            direction: direction
        });
        socket.broadcast.emit('playerMovingInput', JSON.stringify(response));
    });
});

//port
http.listen(process.env.PORT || 3001, function() {
    console.log("We're online on *:3001");
});
