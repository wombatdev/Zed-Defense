var bootState = {

    // The create function is Phaser standard and is auto-called
    create: function() {

        // Call Sockets.io
        game.socket = io();
        // Starting the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add advanced timing to monitor frame rate
        game.time.advancedTiming = true

        // Calling the load state
        game.state.start('load');
    }
};
