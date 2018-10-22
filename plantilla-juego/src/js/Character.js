'use strict';

function Character(game, x,y, name){
    //this.playScene = playScene;
    Phaser.Sprite.call(this, game, x, y, name);
    this.canTeleport = false;
    this.dead = false;
    this.anchor.setTo(0.5, 0.5);
    this.x = x;
    this.y = y;
    console.log("creado: " + name);
}

Character.prototype = Object.create (Phaser.Sprite.prototype);
Character.prototype.constructor = Character;
//Character.prototype.nombreFuncion = function nombr(){loquehaga};

//exportamos Charcter
module.exports = Character;