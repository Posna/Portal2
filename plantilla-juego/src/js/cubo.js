
var Character = require ('./Character.js');

function Cubo (game,x,y,name, portalO, portalB){
    Character.call(this, game, x, y, name);//Hace lo mismo que apply

    this.name = name;
    //this.game = game;
    this.anchor.setTo(0.5, 0.5);
    //this.scale.set(0.20);

    this.cogido = false;

    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.portalB = portalB;
    this.portalN = portalO;
    this.MAX_VELOCITY = 700;

    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
}

//Encadenamos el prototype
Cubo.prototype = Object.create (Character.prototype);
Cubo.prototype.constructor = Cubo;

Cubo.prototype.coger = function(player){
    if(this.e.justDown && this.game.physics.arcade.overlap(this, player)){
        //cubo.coger(this.x, this.y, this.game.physics.arcade.overlap(this, cubo));
        this.cogido = !this.cogido;
        console.log("eyyy");
    }

    if(this.cogido){
        this.x = player.x  + Math.cos(this.game.physics.arcade.angleToPointer(this)) * 20;
        this.y = player.y + Math.sin(this.game.physics.arcade.angleToPointer(this)) * 20;
        this.body.gravity.y = 0;
    }
    else{this.body.gravity.y = 300;}
    
}

Cubo.prototype.update = function(){
    if(this.body.velocity.y > this.MAX_VELOCITY)
        this.body.velocity.y = this.MAX_VELOCITY;
    if(this.body.velocity.x > this.MAX_VELOCITY)
        this.body.velocity.x = this.MAX_VELOCITY;
    if(this.body.onFloor()){
        this.body.velocity.x = 0;
    }
    this.portalcol();
}

Cubo.prototype.portalcol = function(){
    if(!this.game.physics.arcade.overlap(this, this.portalN)){
        this.overlapControlN = false;
    }
    if(!this.game.physics.arcade.overlap(this, this.portalB)){
        this.overlapControlB = false;
    }
    if(this.game.physics.arcade.overlap(this, this.portalN) && !this.overlapControlN){
        this.portalN.movetoportal(this.portalB, this);
        this.overlapControlB = true;
    }
    if(this.game.physics.arcade.overlap(this, this.portalB) && !this.overlapControlB){
        this.portalB.movetoportal(this.portalN, this);
        this.overlapControlN = true;
    }
}

Cubo.prototype.sehatepeado = function(){

}

module.exports = Cubo;

