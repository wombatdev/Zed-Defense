var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	// game.load.image('sky', '/assets/images/sky.png');
	// game.load.image('ground', '/assets/images/platform.png');
	game.load.image('enemy', '/assets/images/trumpzombiesprite.png');
	game.load.image('pistol', '/assets/images/pistol_one.png');
    game.load.image('bullet', '/assets/images/bullet.png');
}

// var sprite;
// var weapon;
// var cursors;
// var fireButton;
// var player;
// var enemies;

var sprite;
var bullets;

var fireRate = 100;
var nextFire = 0;

// var Bullet = function (game, key) {
//
//         Phaser.Sprite.call(this, game, 0, 0, key);
//
//         this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
//
//         this.anchor.set(0.5);
//
//         this.checkWorldBounds = true;
//         this.outOfBoundsKill = true;
//         this.exists = false;
//
//         this.tracking = false;
//         this.scaleSpeed = 0;
//
//     };
//
//     Bullet.prototype = Object.create(Phaser.Sprite.prototype);
//     Bullet.prototype.constructor = Bullet;
//
//     Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
//
//         gx = gx || 0;
//         gy = gy || 0;
//
//         this.reset(x, y);
//         this.scale.set(1);
//
//         this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
//
//         this.angle = angle;
//
//         this.body.gravity.set(gx, gy);
//
//     };
//
//     Bullet.prototype.update = function () {
//
//         if (this.tracking)
//         {
//             this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
//         }
//
//         if (this.scaleSpeed > 0)
//         {
//             this.scale.x += this.scaleSpeed;
//             this.scale.y += this.scaleSpeed;
//         }
//
//     };
//
//     var Weapon = {};
//
//     ////////////////////////////////////////////////////
//     //  A single bullet is fired in front of the ship //
//     ////////////////////////////////////////////////////
//
//     Weapon.SingleBullet = function (game) {
//
//         Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
//
//         this.nextFire = 0;
//         this.bulletSpeed = 600;
//         this.fireRate = 100;
//
//         for (var i = 0; i < 64; i++)
//         {
//             this.add(new Bullet(game, 'bullet5'), true);
//         }
//
//         return this;
//
//     };
//
//     Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
//     Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;
//
//     Weapon.SingleBullet.prototype.fire = function (source) {
//
//         if (this.game.time.time < this.nextFire) { return; }
//
//         var x = source.x + 10;
//         var y = source.y + 10;
//
//         this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
//
//         this.nextFire = this.game.time.time + this.fireRate;
//
//     };

// var platforms;
function create() {

	//  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    // game.add.sprite(0, 0, 'sky');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    // platforms.enableBody = true;
    // Here we create the ground.
    // var ground = platforms.create(0, game.world.height - 64, 'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    // ground.body.immovable = true;
    //  Now let's create two ledges
    // var ledge = platforms.create(400, 400, 'ground');
    // ledge.body.immovable = true;
    // ledge = platforms.create(-150, 250, 'ground');
    // ledge.body.immovable = true;
	// The player and its settings
	player = game.add.sprite(game.world.width/2, game.world.height - 150, 'pistol');
	//  We need to enable physics on the player
	game.physics.arcade.enable(player);

	//  Player physics properties. Give the little guy a slight bounce.
	// player.body.bounce.y = 0.2;
	// player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	// player.animations.add('left', [0, 1, 2, 3], 10, true);
	// player.animations.add('right', [5, 6, 7, 8], 10, true);
	enemies = game.add.group();

    enemies.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var enemy = enemies.create(i * 70, 0, 'enemy');
        //  Let gravity do its thing
        enemy.body.gravity.y = 6;

        //  This just gives each enemy a slightly random bounce value
        // enemy.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    // //  Creates 1 single bullet, using the 'bullet' graphic
    // weapon = game.add.weapon(1, 'bullet');
    //
    // //  The bullet will be automatically killed when it leaves the world bounds
    // weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //
    // //  Because our bullet is drawn facing up, we need to offset its rotation:
    // weapon.bulletAngleOffset = 90;
    //
    // //  The speed at which the bullet is fired
    // weapon.bulletSpeed = 400;
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
}

function update() {
    if (game.input.activePointer.isDown)
    {
        fire();
    }
	//  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(player, platforms);
	// game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, enemies, death, null, this);
	function death (player, enemy) {
    // Removes the star from the screen
    player.kill();
    console.log("death");

	}
	cursors = game.input.keyboard.createCursorKeys();
	//  Reset the players velocity (movement)
    // player.body.velocity.x = 0;

    // if (cursors.left.isDown)
    // {
    //     //  Move to the left
    //     player.body.velocity.x = -150;
    //
    //     player.animations.play('left');
    // }
    // else if (cursors.right.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.x = 150;
    //
    //     player.animations.play('right');
    // }
    // else
    // {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    // }

    //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && player.body.touching.down)
    // {
    //     player.body.velocity.y = -350;
    // }
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player.x - 8, player.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

function render() {

    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    game.debug.spriteInfo(player, 32, 450);

}
