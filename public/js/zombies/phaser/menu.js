var menuState = {

    create: function() {
        var titleLabel = game.add.text(80, 80, 'Zed Defense', {font: '50px Courier', fill: '#ffffff'});

        var startLabel = game.add.text(80, game.world.height-80, 'Press the spacebar to start', {font: '25px Courier', fill: '#ffffff'});

        var spacebarkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        spacebarkey.onDown.addOnce(this.startMsg, this);

        game.socket.on('startGame', function(msg) {
            game.state.start('play');
        });
    },
    startMsg: function() {
        game.socket.emit('startGame', "Game starting!");
    }
};
