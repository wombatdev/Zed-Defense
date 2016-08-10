var express = require("express");
var app = express();
var session = require('express-session');
var mongoose = require('./db/connection');
var cmongo  = require("connect-mongo");
var MongoSession = cmongo(session);
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http").Server(app);
var io = require("socket.io")(http);

var User = mongoose.model("User");

app.set("port", process.env.PORT || 3001);

// app.set("view engine", "hbs");
// app.engine(".hbs", hbs({
//     extname: ".hbs",
//     partialsDir: "views/",
//     layoutsDir: "views/",
//     defaultLayout: "layout-main"
// }));

app.use("/assets", express.static("public"));
app.use(bodyParser.json({
    extended: true
}));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
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

mongoose.connect(process.env.MONGODB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
    http.listen(process.env.PORT || 3001, function() {
    console.log("We're online on *:3001");
    });
});
