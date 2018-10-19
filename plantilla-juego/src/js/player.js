'use strict';
var Character = require ('./Character.js');

function Player(game,x,y,name){
    //this.playScene = playScene;
    this.name = name;
    this.game = game;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    Character.call(this, game, x, y, name);//Hace lo mismo que apply
    this.canJump = true;
    this.carryingObj = false;
    this.canTeleport = false;
    this.dead = false;
    this.anchor.setTo(0.5, 0.5);//aqui no?
    this.x = x;
    this.y = y;
    //Portal gun
    this.gun = this.game.make.sprite(0,0, 'gun');
    this.gun.scale.set(0.3);
    this.gun.anchor.setTo(0.5,0.5);//si comento esto rota con un efecto un poco distinto
    this.portalGun = this.addChild(this.gun);
    console.log("creadoPlayer");
}

//Encadenamos el prototype
Player.prototype = Object.create (Character.prototype);
Player.prototype.constructor = Player;

//funcion para inicializacion: crea sprite y sus variables
Player.prototype.create = function(){
    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.scale.set(1.5);
    this.animations.add('walkRight',[7,8,9,10],10,true);
    console.log("existe");

}

Player.prototype.update = function (){
    this.move();
    this.gunAngle();
    //this.game.debug.bodyInfo(this, 32, 32);
}

Player.prototype.move = function (){
    //this.y++;
    if (this.cursors.left.isDown){

    }
    else if (this.cursors.right.isDown){
        this.body.velocity.x = 100;
        this.animations.play('walkRight');
    }
}
Player.prototype.gunAngle = function (){
    this.portalGun.rotation = this.game.physics.arcade.angleToPointer(this);
}

//Aqui funciones propias del player

//Exportamos Player
module.exports = Player;