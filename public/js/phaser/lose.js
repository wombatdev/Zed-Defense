var loseState = {

    create: function() {
        var loseLabel = game.add.text(80, 80, 'You Lose!', {font: '50px Courier', fill: '#ffffff'});

        var restartLabel = game.add.text(80, game.world.height-80, 'Press the spacebar to restart', {font: '25px Courier', fill: '#ffffff'});

        var spacebarkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        spacebarkey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        game.state.start('menu');
    }
};
