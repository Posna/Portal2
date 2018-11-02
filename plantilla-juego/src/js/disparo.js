/*'use strict';
var Character = require ('./Character.js');

function Disparo(game){
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
}

Disparo.prototype.create = function(){
    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
}

function fire() {
    if (game.time.now > nextFire && bullets.countDead() > 0){
    nextFire = game.time.now + fireRate;
    var bullet = bullets.getFirstDead();
    bullet.reset(x - 8, y - 8);
    game.physics.arcade.moveToPointer(bullet, 300);
    }
}

Disparo.prototype = Object.create (Phaser.Sprite.prototype);
Disparo.prototype.constructor = Disparo;

//exportamos Disparo
module.exports = Disparo;*/