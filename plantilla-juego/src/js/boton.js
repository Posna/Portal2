var Character = require ('./Character.js');

function Boton(game, x, y, name, state, player, puerta){
    Character.call(this, game, x, y, name);
    this.state = state;//true-> activado(presionado), false -> desactivado(sin presionar)
    this.player = player;
    this.puerta = puerta;
    this.create();
}

Boton.prototype = Object.create (Character.prototype);
Boton.prototype.constructor = Boton;

Boton.prototype.create = function(){
    this.game.add.existing(this);
    this.scale.set(1);
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.checkCollision.left = false;
	this.body.checkCollision.right = false;
}
Boton.prototype.update = function(){
    if(!this.body.touching.up && this.state){
        this.desactivar();
        
    }
}
Boton.prototype.pulsarBoton = function (){
    if(!this.state && this.body.touching.up){
       this.activar();
    }
}
Boton.prototype.activar = function (){
    this.state = true;
    this.frame =2;
    this.puerta.opendoor();
}

Boton.prototype.desactivar = function (){
    this.state = false;
    this.frame =0;
    this.puerta.closedoor();
}

module.exports = Boton;