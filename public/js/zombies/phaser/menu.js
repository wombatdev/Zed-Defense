var menuState = {

    create: function() {
        var titleLabel = game.add.text(80, 80, 'Zed Defense', {font: '50px Courier', fill: '#ffffff'});

        var startLabel = game.add.text(80, game.world.height-80, 'Press the spacebar to start', {font: '25px Courier', fill: '#ffffff'});

        var spacebarkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        spacebarkey.onDown.addOnce(this.startMsg, this);

        // game.socket.emit('playerCountRequest', 'request');
        // game.socket.on('playerCount', function(msg) {
        //     console.log(msg);
        // });

        // Send a socket request for additional players
        game.socket.emit('otherPlayersCheckOutput', 'request');
        game.socket.on('otherPlayersCheckInput', function(msg) {
            msg.forEach(function(player) {
                game.otherPlayersInGame.push(player);
            });
            console.log(game.otherPlayersInGame);
        });

        game.socket.on('startGame', function(msg) {
            game.state.start('play');
        });
    },
    startMsg: function() {
        game.socket.emit('startGame', "Game starting!");
    }
};
