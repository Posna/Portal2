'use strict';
var Character = require ('./Character.js');

function PortalLogica(game, x, y, name, pos){
    if(name === 'bulletOrange'){
        Character.call(this, game, x, y, 'PortalOrange');
    }else if(name === 'bulletBlue'){
        Character.call(this, game, x, y, 'PortalBlue');
    }
    this.game.add.existing(this);//!
    //donde enfoca el portal
    this.pos = pos;
    this.scale.set(2);
    this.anchor.setTo(0.5, 0.5);
    this.orientacion();
    console.log('holi');
    //this.kill();
}


PortalLogica.prototype = Object.create (Character.prototype);
PortalLogica.prototype.constructor = PortalLogica;

PortalLogica.prototype.orientacion = function(){
    if(this.pos == 'arriba'){
        this.angle = 90;
    }else if(this.pos == 'abajo'){
        this.angle = 270;
    }else if(this.pos == 'derecha'){
        this.angle = 180;
    }else
        this.angle = 0;

}

PortalLogica.prototype.update = function(){
    //this.game.debug.bodyInfo(this, 32, 32);

}


module.exports = PortalLogica;