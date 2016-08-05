window.onload = function() {

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update,
	render: render
});

function preload() {
	game.load.image('enemy', '/assets/images/trumpzombiesprite.png');
	game.load.image('pistol', '/assets/images/pistol.png');
    game.load.image('bullet', '/assets/images/bullet.png');
	// game.MAX_ZOMBIES = 500; // number of zombies });
}

// var weapon;
var sprite;
var bullets;

var fireRate = 100;
var nextFire = 0;

function create() {
	// Define constants
    game.SHOT_DELAY = 100; // milliseconds (10 bullets/second)
    game.BULLET_SPEED = 500; // pixels/second
    game.NUMBER_OF_BULLETS = 1; // one bullet at a time

	// Create an object representing our gun
    this.gun = this.game.add.sprite((this.game.width/2-16), (this.game.height-80), 'pistol');












	// START OF OLD CODE
	// //  Creates 1 single bullet, using the 'bullet' graphic
    // var weapon = game.add.weapon(1, 'bullet');
	//
    // //  The bullet will be automatically killed when it leaves the world bounds
    // weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	//
    // //  Because our bullet is drawn facing up, we need to offset its rotation:
    // weapon.bulletAngleOffset = 90;
	//
    // //  The speed at which the bullet is fired
    // weapon.bulletSpeed = 400;
	//
	// // //  We're going to be using physics, so enable the Arcade Physics system
    // game.physics.startSystem(Phaser.Physics.ARCADE);
	//
    // //  A simple background for our game
    // // game.add.sprite(0, 0, 'sky');
	//
	// player = game.add.sprite(game.world.width/2, game.world.height - 150, 'pistol');
	// //  We need to enable physics on the player
	// game.physics.arcade.enable(player);
	// player.body.collideWorldBounds = true;
	//
	// enemies = game.add.group();
	//
    // enemies.enableBody = true;
	//
    // //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 2; i++)
    // {
    //     //  Create a star inside of the 'stars' group
    //     var enemy = enemies.create(game.world.width/2 - (i * 70), game.world.height*0.25, 'enemy');
    //     //  Let gravity do its thing
    //     enemy.body.gravity.y = 6;
    // }
	//
    // bullets = game.add.group();
    // bullets.enableBody = true;
    // bullets.physicsBodyType = Phaser.Physics.ARCADE;
	//
    // bullets.createMultiple(1, 'bullet');
    // bullets.setAll('checkWorldBounds', true);
    // bullets.setAll('outOfBoundsKill', true);
}

function update() {







	// START OF OLD CODE
//     if (game.input.activePointer.isDown)
//     {
//         fire();
//     }
// 	enemies.scale.x += .003;
// 	enemies.scale.y += .003;
// 	game.physics.arcade.overlap(player, enemies, playerDeath, null, this);
// 	function playerDeath (player, enemy) {
//     // Removes the star from the screen
//     player.kill();
// 	console.log("death");
// 	}
// 	//  Collide the player and the stars with the platforms
// 	game.physics.arcade.collide(bullets, enemies, enemyDeath, null, this);
// 	function enemyDeath (bullet, enemy) {
// 		bullet.kill();
// 		enemy.kill();
// 	}
// 	// game.physics.arcade.collide(stars, platforms);
// 	cursors = game.input.keyboard.createCursorKeys();
//
//     // if (cursors.left.isDown)
//     // {
//     //     //  Move to the left
//     //     player.body.velocity.x = -150;
//     //
//     //     player.animations.play('left');
//     // }
//     // else if (cursors.right.isDown)
//     // {
//     //     //  Move to the right
//     //     player.body.velocity.x = 150;
//     //
//     //     player.animations.play('right');
//     // }
//     // else
//     // {
//         //  Stand still
//         player.animations.stop();
//         player.frame = 4;
//     // }
//
// }
//
// function fire() {
//
//     if (game.time.now > nextFire && bullets.countDead() > 0) {
//         nextFire = game.time.now + fireRate;
//         var bullet = bullets.getFirstDead();
//         bullet.reset(player.x - 8, player.y - 8);
//         game.physics.arcade.moveToPointer(bullet, 300);
//     }

}

function render() {




	// START OF OLD CODE
    // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    // game.debug.spriteInfo(player, 32, 450);

}

// End of document on load call
}
