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
    game.load.image('bullet', '/assets/images/bulletspriteright.png');
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
    game.NUMBER_OF_BULLETS = 6; // six bullets at a time
	// Create an object representing our gun
    game.gun = game.add.sprite(0, 0, 'pistol');
	game.gun.x = (game.width/2-game.gun.width/2);
	game.gun.y = (game.height+game.gun.height/5);
	// Set the pivot point to the center of the gun
    game.gun.anchor.setTo(0.5, 1.0);
	// Create an object pool of bullets
    game.bulletPool = game.add.group();
    for(var i = 0; i < game.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        var bullet = game.add.sprite(0, 0, 'bullet');
		// bullet.frame = 12;
        game.bulletPool.add(bullet);
        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);
        // Enable physics on the bullet
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        // Set its initial state to "dead".
        bullet.kill();
    }
	// Simulate a pointer click/tap input at the center of the stage
    // when the example begins running (to center the sprite).
    game.input.activePointer.x = game.width/2;
    game.input.activePointer.y = game.height/2;


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

function shootBullet() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (game.lastBulletShotAt === undefined) game.lastBulletShotAt = 0;
	if (game.lastBulletShotAt > game.time.now) return;
    if (game.time.now - game.lastBulletShotAt < game.SHOT_DELAY) return;
    game.lastBulletShotAt = game.time.now;
    // Get a dead bullet from the pool
    var bullet = game.bulletPool.getFirstDead();
    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) {
		game.lastBulletShotAt = game.time.now + 1500;
		console.log("reloading");
		return;
	}
    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();
    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
    // Set the bullet position to the gun position.
    // bullet.reset(game.gun.x, (game.gun.y - game.gun.height/2));
	var point = new Phaser.Point(game.gun.x, game.gun.y - game.gun.height/2);
	point.rotate(game.gun.x, game.gun.y, game.gun.rotation);
	bullet.reset(point.x, point.y);
	bullet.rotation = game.gun.rotation - 1.5708;
    // Shoot it in the right direction
	bullet.body.velocity.x = Math.cos(bullet.rotation) * game.BULLET_SPEED;
    bullet.body.velocity.y = Math.sin(bullet.rotation) * game.BULLET_SPEED;
};

function update() {
	// Aim the gun at the pointer.
    // All this function does is calculate the angle using
    // Math.atan2(yPointer-yGun, xPointer-xGun)
    game.gun.rotation = game.physics.arcade.angleToPointer(game.gun) + 1.5708;
	// console.log(game.gun.rotation);
	// Shoot a bullet
    if (game.input.activePointer.isDown) {
        shootBullet();
    }






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
	game.debug.body(game.gun);



	// START OF OLD CODE
    // game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    // game.debug.spriteInfo(player, 32, 450);

}



// End of document on load call
}
