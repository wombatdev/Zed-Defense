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
        res.redirect('/menu');
    });

app.get('/', ensureAuthenticated, function(req, res) {
    User.findById(req.session.passport.user, function(err, user) {
        if (err) {
            console.log(err); // handle errors
            res.redirect('/splash');
        } else {
            res.redirect('/menu');
        }
    });
});

// app.get('/*', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
// OLD CODEBASE ABOVE ############################################################

// // dependencies
// var fs = require('fs');
// var express = require('express');
// var routes = require('./routes');
// var http = require("http").Server(app);
// var io = require("socket.io")(http);
// var path = require('path');
// var config = require('./oauth.js');
// var passport = require('passport');
// var fbAuth = require('./authentication.js');
//
// // // connect to the database
// // var mongoose = require('./db/connection.js');
// //
// // // create a user model
// // var User = mongoose.model("User");
//
// // // config
// // passport.use(new FacebookStrategy({
// //   clientID: config.facebook.clientID,
// //   clientSecret: config.facebook.clientSecret,
// //   callbackURL: config.facebook.callbackURL
// //   },
// //   function(accessToken, refreshToken, profile, done) {
// //     User.findOne({ oauthID: profile.id }, function(err, user) {
// //       if(err) {
// //         console.log(err);  // handle errors!
// //       }
// //       if (!err && user !== null) {
// //         done(null, user);
// //       } else {
// //         user = new User({
// //           oauthID: profile.id,
// //           name: profile.displayName,
// //           created: Date.now()
// //         });
// //         user.save(function(err) {
// //           if(err) {
// //             console.log(err);  // handle errors!
// //           } else {
// //             console.log("saving user ...");
// //             done(null, user);
// //           }
// //         });
// //       }
// //     });
// //   }
// // ));
//
// var app = express();
//
// app.set("port", process.env.PORT || 3001);
// app.use("/assets", express.static("public"));
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').json({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
//
// // serialize and deserialize
// passport.serializeUser(function(user, done) {
//   console.log('serializeUser: ' + user._id);
//   done(null, user._id);
// });
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user){
//     console.log(user);
//       if(!err) done(null, user);
//       else done(err, null);
//     });
// });
//
// app.get('/signup/facebook',
//     passport.authenticate('facebook'),
//     function(req, res){});
//
// app.get('callback.html',
//     passport.authenticate('facebook', { failureRedirect: 'www.yahoo.com' }),
//     function(req, res) {
//         console.log(res);
//         // Successful authentication, redirect home.
//         res.redirect('www.google.com');
//     });
//
// app.get('/*', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

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

// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
}
