'use strict';
var Character = require ('./Character.js');

function PortalLogica(game, x, y, name, pos){
    Character.call(game, x, y, name);

    //donde enfoca el portal
    this.pos = pos;
    this.anchor.setTo(0.5, 0.5);
    this.orientacion();
}


Portal.prototype = Object.create (Character.prototype);
Portal.prototype.constructor = Portal;

Portal.prototype.orientacion = function(){
    if(this.pos == 'arriba'){
        this.sprite.angle = Math.PI/2;
    }else if(this.pos == 'abajo'){
        this.sprite.angle = -(Math.PI/2);
    }else if(this.pos == 'derecha'){
        this.sprite.angle = Math.PI;
    }

}


module.exports = PortalLogica;