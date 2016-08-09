// window.onload = function() {

// var splash = $(".splash");
// splash.on("click", function(){
// 	console.log("click");

// var menu_state = {
// 	create: function() {
// 		// Call the 'start' function when pressing the spacebar
// 		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
// 		space_key.onDown.add(this.start, this);
// 		// Defining variables
// 		var style = { font: "30px Arial", fill: "#ffffff" };
// 		var x = game.world.width/2, y = game.world.height/2;
// 		// Adding a text centered on the screen
// 		var text = this.game.add.text(x, y-50, "Press space to start", style);
// 		text.anchor.setTo(0.5, 0.5);
// 	},
// 	// Start the actual game
// 	start: function() {
// 		this.game.state.start('play');
// 	}
// };

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);

game.state.start('boot');

// function preload() {
// 	game.load.image('enemy', '/assets/images/trumpzombiesprite.png');
// 	game.load.image('pistol', '/assets/images/pistol.png');
//     game.load.image('bullet', '/assets/images/bulletspriteright.png');
// }
//
// // var weapon;
// // var sprite;
// // var bullets;
// //
// // var fireRate = 100;
// // var nextFire = 0;
//
// function create() {
// 	// Define constants
//     game.SHOT_DELAY = 250; // milliseconds (10 bullets/second)
//     game.BULLET_SPEED = 500; // pixels/second
//     game.NUMBER_OF_BULLETS = 6; // six bullets at a time
// 	game.MAX_ZOMBIES = 4; // number of zombies
// 	// Create a group to hold the enemies
//     game.enemyGroup = game.add.group();
// 	// Create an object pool of bullets
// 	game.bulletPool = game.add.group();
// 	for(var i = 0; i < game.NUMBER_OF_BULLETS; i++) {
// 		// Create each bullet and add it to the group.
// 		var bullet = game.add.sprite(0, 0, 'bullet');
// 		// bullet.frame = 12;
// 		game.bulletPool.add(bullet);
// 		// Set its pivot point to the center of the bullet
// 		bullet.anchor.setTo(0.5, 0.5);
// 		// Enable physics on the bullet
// 		game.physics.enable(bullet, Phaser.Physics.ARCADE);
// 		// Set its initial state to "dead".
// 		bullet.kill();
// 	}
// 	// Create an object representing our gun
// 	game.gun = game.add.sprite(0, 0, 'pistol');
// 	game.gun.x = (game.width/2-game.gun.width/2);
// 	game.gun.y = (game.height+game.gun.height/5);
// 	// Set the pivot point to the center of the gun
// 	game.gun.anchor.setTo(0.5, 1.0);
// 	// Simulate a pointer click/tap input at the center of the stage
// 	// when the example begins running (to center the sprite).
// 	game.input.activePointer.x = game.width/2;
// 	game.input.activePointer.y = game.height/2;
// }
//
// function update() {
// 	// Aim the gun at the pointer.
//     // All this function does is calculate the angle using
//     // Math.atan2(yPointer-yGun, xPointer-xGun)
//     game.gun.rotation = game.physics.arcade.angleToPointer(game.gun) + Math.PI/2;
// 	// Shoot a bullet
//     if (game.input.activePointer.isDown) {
//         shootBullet();
// 	}
// 	// If there are fewer than MAX_ENEMIES, launch a new one
//     if (game.enemyGroup.countLiving() < game.MAX_ZOMBIES) {
//         // Set the spawn point to a random location below the bottom edge
//         // of the stage
//         spawnZombie(game.rnd.integerInRange(50, game.width-50),
//             game.height*0.4);
//     }
// 	// If any enemy is within a certain distance of the gun, blow it up
//     game.enemyGroup.forEachAlive(function(m) {
//         // var distance = this.game.math.distance(m.x, m.y,
//         //     game.gun.x, game.gun.y);
//         if (m.y > this.game.height - m.height*0.25) {
// 			game.gun.kill();
// 			console.log("you're dead");
// 			m.scaleTween.stop();
// 			m.scaleTween.pendingDelete = false;
//             m.kill();
//         }
//     }, this);
// 	game.enemyGroup.sort('y', Phaser.Group.SORT_ASCENDING);
// 	game.bulletPool.sort('y', Phaser.Group.SORT_ASCENDING);
// 	// game.gun.sort('y', Phaser.Group.SORT_ASCENDING);
// 	game.physics.arcade.overlap(game.bulletPool, game.enemyGroup, enemyDeath, null, this);
// 	function enemyDeath (bullet, enemy) {
//     	// Removes the enemy from the screen
// 		enemy.scaleTween.stop();
// 		enemy.scaleTween.pendingDelete = false;
//     	enemy.kill();
// 		bullet.kill();
// 	}
// }
//
// function render() {
// 	// game.debug.spriteInfo(game.enemyGroup.hash[0]);
// 	// game.debug.text(game.Enemy.SPEED);
// 	// game.debug.text(game.enemyGroup[0].SPEED);
// 	// game.debug.text(game.enemyGroup[0].SPEED);
//     // game.debug.text(game.enemyGroup[0].SPEED);
//     // game.debug.text('angularAcceleration: ' + sprite.body.angularAcceleration, 32, 232);
//     // game.debug.text('angularDrag: ' + sprite.body.angularDrag, 32, 264);
//     // game.debug.text('deltaZ: ' + sprite.body.deltaZ(), 32, 296);
//
// }
//
// function shootBullet() {
// 	// Enforce a short delay between shots by recording
// 	// the time that each bullet is shot and testing if
// 	// the amount of time since the last shot is more than
// 	// the required delay.
// 	if (game.lastBulletShotAt === undefined) game.lastBulletShotAt = 0;
// 	if (game.lastBulletShotAt > game.time.now) return;
// 	if (game.time.now - game.lastBulletShotAt < game.SHOT_DELAY) return;
// 	game.lastBulletShotAt = game.time.now;
// 	// Get a dead bullet from the pool
// 	var bullet = game.bulletPool.getFirstDead();
// 	// If there aren't any bullets available then don't shoot
// 	if (bullet === null || bullet === undefined) {
// 		game.lastBulletShotAt = game.time.now + 1500;
// 		console.log("reloading");
// 		return;
// 	}
// 	// Revive the bullet
// 	// This makes the bullet "alive"
// 	bullet.revive();
// 	// Bullets should kill themselves when they leave the world.
// 	// Phaser takes care of this for me by setting this flag
// 	// but you can do it yourself by killing the bullet if
// 	// its x,y coordinates are outside of the world.
// 	bullet.checkWorldBounds = true;
// 	bullet.outOfBoundsKill = true;
// 	// Set the bullet position to the gun position.
// 	// bullet.reset(game.gun.x, (game.gun.y - game.gun.height/2));
// 	var point = new Phaser.Point(game.gun.x, game.gun.y - game.gun.height);
// 	point.rotate(game.gun.x, game.gun.y, game.gun.rotation);
// 	bullet.reset(point.x, point.y);
// 	bullet.rotation = game.gun.rotation - Math.PI/2;
// 	// Shoot it in the right direction
// 	bullet.body.velocity.x = Math.cos(bullet.rotation) * game.BULLET_SPEED;
// 	bullet.body.velocity.y = Math.sin(bullet.rotation) * game.BULLET_SPEED;
// }
//
// // Try to get a enemy from the enemyGroup
// // If a enemy isn't available, create a new one and add it to the group.
// function spawnZombie(x, y) {
//     // // Get the first dead enemy from the enemyGroup
//     var enemy = game.enemyGroup.getFirstDead();
//
//     // If there aren't any available, create a new one
//     if (enemy === null) {
//         enemy = new Enemy(game);
//         game.enemyGroup.add(enemy);
//     }
//
//     // Revive the enemy (set it's alive property to true)
//     // You can also define a onRevived event handler in your explosion objects
//     // to do stuff when they are revived.
//     enemy.revive();
// 	enemy.scale.x = 1;
// 	enemy.scale.y = 1;
// 	enemy.scaleTween.start();
// 	console.log(enemy.SPEED);
//     // Move the enemy to the given coordinates
//     enemy.x = x;
//     enemy.y = y;
//     return enemy;
// }
//
// // Enemy constructor
// var Enemy = function(game, x, y) {
//     Phaser.Sprite.call(this, game, x, y, 'enemy');
//     // Set the pivot point for this sprite to the center
//     this.anchor.setTo(0.5, 1.0);
//     // Enable physics on the enemy
//     game.physics.enable(this, Phaser.Physics.ARCADE);
//     // Define constants that affect motion
//     this.SPEED = 35; // enemy speed pixels/second
// 	// this.GROWTH_RATE = 1; // growth rate in pixels/second
//     this.TURN_RATE = 1; // turn rate in degrees/frame
//     this.WOBBLE_LIMIT = 2.5; // degrees
//     this.WOBBLE_SPEED = 350; // milliseconds
//     this.AVOID_DISTANCE = 100; // pixels
//     // Create a variable called wobble that tweens back and forth between
//     // -this.WOBBLE_LIMIT and +this.WOBBLE_LIMIT forever
//     this.wobble = this.WOBBLE_LIMIT;
//     this.wobbleTween = game.add.tween(this)
//         .to(
//             { wobble: -this.WOBBLE_LIMIT },
//             this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
//             Number.POSITIVE_INFINITY, true
//         );
// 	this.scaleTween = game.add.tween(this.scale)
// 		.to(
// 			{x: 8, y: 8}, 10000, Phaser.Easing.Linear.In, true, 0, 0, false
// 		);
// 	this.speedUpTween = game.add.tween(this)
// 		.to(
// 			{SPEED: 95}, 45000, Phaser.Easing.Linear.None, true, 0, 0, false
// 		);
// 	this.increaseSpawnRateTween = game.add.tween(game)
// 		.to(
// 			{MAX_ZOMBIES: 8}, 45000, Phaser.Easing.Linear.None, true, 0, 0, false
// 		);
// };
//
// // Enemies are a type of Phaser.Sprite
// Enemy.prototype = Object.create(Phaser.Sprite.prototype);
// Enemy.prototype.constructor = Enemy;
//
// Enemy.prototype.update = function() {
//     // If this enemy is dead, don't do any of these calculations
//     if (!this.alive) {
//         return;
//     }
//     // Calculate the angle from the enemy to the gun. game.gun.x
//     // and game.gun.y are the gun position; substitute with whatever
//     // target coordinates you need.
//     var targetAngle = game.math.angleBetween(
//         this.x, this.y,
//         game.gun.x, game.gun.y+(game.height)
//     );
//     // Add our "wobble" factor to the targetAngle to make the enemy wobble
//     // Remember that this.wobble is tweening (above)
//     targetAngle += this.game.math.degToRad(this.wobble);
//
//
//     // Make each enemy steer away from other enemies.
//     // Each enemy knows the group that it belongs to (enemyGroup).
//     // It can calculate its distance from all other enemies in the group and
//     // steer away from any that are too close. This avoidance behavior prevents
//     // all of the enemies from bunching up too tightly and following the
//     // same track.
//     var avoidAngle = 0;
//     this.parent.forEachAlive(function(m) {
//         // Don't calculate anything if the other enemy is me
//         if (this == m) return;
//         // Already found an avoidAngle so skip the rest
//         if (avoidAngle !== 0) return;
//         // Calculate the distance between me and the other enemy
//         var distance = game.math.distance(this.x, this.y, m.x, m.y);
//
//         // If the enemy is too close...
//         if (distance < this.AVOID_DISTANCE) {
//             // Chose an avoidance angle of 90 or -90 (in radians)
//             avoidAngle = Math.PI/2; // zig
//             if (game.math.chanceRoll(50)) avoidAngle *= -1; // zag
//         }
//     });
//     // Add the avoidance angle to steer clear of other enemies
//     targetAngle += avoidAngle;
//     // Gradually (this.TURN_RATE) aim the enemy towards the target angle
//     if (this.rotation !== targetAngle) {
//         // Calculate difference between the current angle and targetAngle
//         var delta = targetAngle - this.rotation;
//         // Keep it in range from -180 to 180 to make the most efficient turns.
//         if (delta > Math.PI) delta -= Math.PI * 2;
//         if (delta < -Math.PI) delta += Math.PI * 2;
//         if (delta > 0) {
//             // Turn clockwise
//             this.angle += this.TURN_RATE;
//         } else {
//             // Turn counter-clockwise
//             this.angle -= this.TURN_RATE;
//         }
//         // Just set angle to target angle if they are close
//         if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
//             this.rotation = targetAngle;
//         }
//     }
//     // Calculate velocity vector based on this.rotation and this.SPEED
//     this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
//     this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
// };
//
//
// splash.remove();
// // End of jQuery click
// });

// End of document on load call
// }