'use strict';
function Player(playScene){
    this.playScene = playScene;
    this.keyboard = this.game.input.keyboard;    
    this.canJump = true;
    this.carryingObj = false;    
    this.canTeleport = false;
    this.dead = false;

}

//Encadenamos el prototype
Player.prototype = Object.create (Phasher.Sprite.prototype);//rellenar
Player.prototype.constructor = Player;

//funcion para inicializacion: crea sprite y sus variables
Player.prototype.create = function(){
    

}

Player.prototype.update = function (){


}

//Aqui funciones propias del player

//Exportamos Player
module.exports = Player;