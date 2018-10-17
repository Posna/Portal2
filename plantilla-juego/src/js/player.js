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
    console.log("creadoPlayer");
}

//Encadenamos el prototype
Player.prototype = Object.create (Character.prototype);
Player.prototype.constructor = Player;

//funcion para inicializacion: crea sprite y sus variables
Player.prototype.create = function(){
    this.game.add.existing(this);//!  
    this.scale.set(1.5);
    this.animations.add('walkRight',[7,8,9,10],10,true);
    console.log("existe");

}

Player.prototype.update = function (){
    this.move();
    
}

Player.prototype.move = function (){
    if (this.cursors.left.isDown){

    }
    else if (this.cursors.right.isDown){
        //this.body.velocity.x = 500;
        this.animations.play('walkRight');
    }
}

//Aqui funciones propias del player

//Exportamos Player
module.exports = Player;