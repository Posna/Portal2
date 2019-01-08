var CanTP = require ('./canTP.js');

function Cubo (game,x,y,name, portalO, portalB){
    CanTP.call(this, game, x, y, name, portalO, portalB);//Hace lo mismo que apply

    this.name = name;
    //this.game = game;
    this.anchor.setTo(0.5, 0.5);
    //this.scale.set(0.20);

    this.cogido = false;

    this.game.add.existing(this);//!
    

    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
}

//Encadenamos el prototype
Cubo.prototype = Object.create (CanTP.prototype);
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
    CanTP.prototype.maxvel.call(this);
    if(this.body.onFloor()){
        this.body.velocity.x = 0;
    }
    CanTP.prototype.portalcol.call(this);
}

Cubo.prototype.sehatepeado = function(){

}

module.exports = Cubo;

