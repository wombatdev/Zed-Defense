var bootState = {

    // The create function is Phaser standard and is auto-called
    create: function() {

        // Starting the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Calling the load state
        game.state.start('load');
    }
};
