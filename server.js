var express = require("express");
var app = express();
var parser = require("body-parser");
var hbs = require("express-handlebars");
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");

app.engine(".hbs", hbs({
    extname: ".hbs",
    partialsDir: "views/",
    layoutsDir: "views/",
    defaultLayout: "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.json({
    extended: true
}));

app.get('/*', function(req, res) {
    res.render('game');
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
    // socket.on('playerCountRequest', function(msg) {
    //     io.emit('playerCount', currentPlayers.length);
    // });
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
        for (var i = currentPlayers.length -1 ; i >= 0; i--) {
            if (currentPlayers[i].uid == socket.client.conn.id) {
                var response = currentPlayers.slice(i,i+1);
                console.log(response);
                console.log(currentPlayers);
            }
        }
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
});


// });

http.listen(process.env.PORT || 3001, function() {
    console.log("We're online on *:3001");
});
