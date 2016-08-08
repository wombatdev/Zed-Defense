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

var connectCounter = 0;

io.on('connection', function(socket) {
    connectCounter++;
    io.emit('playerJoin', connectCounter);
    console.log('player'+connectCounter+' joined');
    socket.on('zombieDeath', function(msg) {
        console.log(msg);
    });
    // socket.on('player1move', function(msg) {
    //     console.log(msg);
    //     io.emit('player1move', msg);
    // });
    // socket.on('player2move', function(msg) {
    //     console.log(msg);
    //     io.emit('player2move', msg);
    // });
    socket.on('disconnect', function() {
        console.log("player has left");
        connectCounter--;
    });
});

http.listen(3001, function() {
    console.log("We're online on *:3001");
});
