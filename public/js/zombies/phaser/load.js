var loadState = {

    // preoad is another Phaser standard that I'm using to define
    // and load game assets
    preload: function() {

        // Adding a loading label
        var loadingLabel = game.add.text(80, 150, "loading...", {font: '30px Courier', fill: '#ffffff'});

        // Load all assets
        game.load.image('enemy', '/assets/images/trumpzombiesprite.png');
    	game.load.image('pistol', '/assets/images/pistol.png');
        game.load.image('bullet', '/assets/images/bulletspriteright.png');
    },

    create: function() {

        // Call the menu state
        game.state.start('menu');
    }
};