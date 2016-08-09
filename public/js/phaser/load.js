var loadState = {

    // preoad is another Phaser standard that I'm using to define
    // and load game assets
    preload: function() {

        // Adding a loading label
        var loadingLabel = game.add.text(80, 150, "loading...", {font: '30px Courier', fill: '#ffffff'});

        // Load all assets
        game.load.image('enemy', '/assets/images/trumpzombiesprite copy 2.png');
    	game.load.image('pistol', '/assets/images/pistol.png');
        game.load.image('bullet', '/assets/images/bulletspriteright.png');
        game.load.spritesheet('explosion', '/assets/images/explosion.png', 16, 16);
        game.load.image('leftarrow', '/assets/images/arrowleft.png');
        game.load.image('rightarrow', '/assets/images/arrowright.png');

        // Create empty bitmap for enemy paths
        game.bmd = null;

        // Create array to hold players
        game.otherPlayersInGame = [];
    },

    create: function() {

        // Call the menu state
        game.state.start('menu');
    }
};
