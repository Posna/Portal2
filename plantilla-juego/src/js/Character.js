'use strict';

function Character(game, x,y, name){
    //this.playScene = playScene;
   // this.keyboard = this.game.input.keyboard;    
    Phaser.Sprite.call(this, game, x, y, name);
    this.canJump = true;
    this.carryingObj = false;    
    this.canTeleport = false;
    this.dead = false;
    this.anchor.setTo(0.5, 0.5);
    this.x = x;
    console.log("creadoCharacter");

}

Character.prototype = Object.create (Phaser.Sprite.prototype);
Character.prototype.constructor = Character;
//Character.prototype.nombreFuncion = function nombr(){loquehaga};

//exportamos Charcter
module.exports = Character;