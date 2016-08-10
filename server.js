var express = require("express");
var app = express();
var mongoose = require('./db/connection.js');
var User = mongoose.model("User");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
        clientID: "1738032826451393",
        clientSecret: "38fe4507c58c9aff928331f80b4c3a15",
        callbackURL: 'http://gentle-retreat-53311.herokuapp.com/callback.html'
    },
    function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
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


app.get('/signup',
    passport.authenticate('facebook'));

app.get('callback.html',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        console.log(res);
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


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

app.set("port", process.env.PORT || 3001);

http.listen(process.env.PORT || 3001, function() {
    console.log("We're online on *:3001");
});
