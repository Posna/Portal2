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
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.pos = pos;
    this.scale.set(2);
    this.anchor.setTo(0.5, 0.5);
    this.orientacion(pos);
    console.log('holi');
    //this.kill();
}


PortalLogica.prototype = Object.create (Character.prototype);
PortalLogica.prototype.constructor = PortalLogica;

PortalLogica.prototype.orientacion = function(pos){
    if(pos == 'arriba'){
        this.angle = 90;
    }else if(pos == 'abajo'){
        this.angle = 270;
    }else if(pos == 'derecha'){
        this.angle = 180;
    }else{
        this.angle = 0;
    }
    this.pos = pos;
}

PortalLogica.prototype.moverportal = function(x, y){
    this.x = x;
    this.y = y;
}

PortalLogica.prototype.movetoportal = function(portal, col){
    if(portal.x > 0){
        if(portal.pos == 'arriba'){
            col.x = portal.x;
            col.y = portal.y - (col.height/2) - 1;
            col.body.velocity.y = -col.body.speed;//this.velocPortal(col);
            col.body.velocity.x = 0;
        }else if(portal.pos == 'abajo'){
            col.x = portal.x;
            col.y = portal.y + (col.height/2) + 1;
            col.body.velocity.y = col.body.speed;//this.velocPortal(col);
            col.body.velocity.x = 0;
        }else if(portal.pos == 'derecha'){
            col.x = portal.x + Math.abs(col.width/2) + 1;
            col.y = portal.y;
            col.body.velocity.y = 0;
            col.body.velocity.x = col.body.speed;//this.velocPortal(col);
            col.sehatepeado();
        }else{
            col.x = portal.x  - Math.abs(col.width/2) - 1;
            col.y = portal.y;
            col.body.velocity.y = 0;
            col.body.velocity.x = -col.body.speed;//this.velocPortal(col);
            col.sehatepeado();
        }
    }
    //ddcol.body.velocity.x = 1001;
}

PortalLogica.prototype.velocPortal = function(col){
    if(this.pos == 'arriba'){
        return Math.abs(col.body.velocity.y);
    }else if(this.pos == 'abajo'){
        return Math.abs(col.body.gravity.y);
    }else if(this.pos == 'derecha'){
        return Math.abs(col.body.velocity.x);
    }else{
        return Math.abs(col.body.velocity.x);
    }
}

PortalLogica.prototype.update = function(){
    //this.game.debug.bodyInfo(this, 32, 32);
}


module.exports = PortalLogica;