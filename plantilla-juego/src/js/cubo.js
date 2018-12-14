
var Character = require ('./Character.js');

function Cubo (game,x,y,name){
    Character.call(this, game, x, y, name);//Hace lo mismo que apply

    this.name = name;
    //this.game = game;
    this.anchor.setTo(0.5, 0.5);
    //this.scale.set(0.20);

    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
}

//Encadenamos el prototype
Cubo.prototype = Object.create (Character.prototype);
Cubo.prototype.constructor = Cubo;

Cubo.prototype.coger = function(posX, posY, coger){
    if(((posX+50 >= this.x) && posX-50 <= this.x && posY+50 >= this.y && posY-50 <= this.y) || coger)
    {
        this.x = posX +20;
        this.y = posY;
    }
}

module.exports = Cubo;

