'use strict';
var Character = require ('./Character.js');

function PortalLogica(game, x, y, name, pos){
    if(name == 'bulletOrange'){
        Character.call(this, game, x, y, 'PortalOrange');
    }else{
        Character.call(this, game, x, y, 'PortalBlue');
    }
    this.game.add.existing(this);//!
    //donde enfoca el portal
    this.pos = pos;
    this.scale.set(2);
    this.anchor.setTo(0.5, 0.5);
    this.orientacion();
}


PortalLogica.prototype = Object.create (Character.prototype);
PortalLogica.prototype.constructor = PortalLogica;

PortalLogica.prototype.orientacion = function(){
    if(this.pos == 'arriba'){
        this.angle = 270;
    }else if(this.pos == 'abajo'){
        this.angle = 90;
    }else if(this.pos == 'derecha'){
        this.angle = 180;
    }

}

PortalLogica.prototype.update = function(){
   // this.game.debug.bodyInfo(this, 32, 32);

}


module.exports = PortalLogica;