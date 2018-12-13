'use strict';
var Character = require ('./Character.js');
var PortalLogica = require ('./portalLogica.js');

function Portal(game,x,y,name, l1, l2, portal){
    // this.game = game;
    this.stillBullet = true;
    this.name = name;
    Character.call(this, game, x, y, name);//Hace lo mismo que apply
    this.anchor.setTo(0.5, 0.5);
    this.scale.set(-0.3);
    this.portal = portal;
    //bullets
    this.bullets = game.add.group();
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.bullets.enableBody = true;

    this.body.collideWorldBounds = true;

    this.bullets.createMultiple(50, 'bulletBlue');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    //portales
    this.blancos = l2;
    this.negros = l1;
    this.fire();
    // this.bullets.animations.add ('shootBlue',[0],1,false);
    // this.bullets.animations.add ('shootOrange',[1],1,false);
}

Portal.prototype = Object.create (Character.prototype);
Portal.prototype.constructor = Portal;

Portal.prototype.update = function (){
    this.collisionControl();
    //this.bullets.body.onWorldBounds.add(collisionControl, this);
}

Portal.prototype.fire = function () {
    if ( this.bullets.countDead() > 0){     
       // var bullet = this.bullets.getFirstDead();
        //bullet.reset(x - 8, y - 8);
        this.rotation = this.game.physics.arcade.angleToPointer(this);
        this.game.physics.arcade.moveToPointer(this, 400);
    }    
}

Portal.prototype.deploy = function(x,y){

}

Portal.prototype.collisionControl = function (){
    if(this.game.physics.arcade.collide(this, this.negros)){
        this.kill();
    }
    if(this.game.physics.arcade.collide(this, this.blancos)){
        //segun el lado con el que se de el portal saldra de un forma u  otra
        if(this.body.blocked.up){
            //this.portal = new PortalLogica(this.game, this.x, this.y-4, this.name, 'abajo');
            this.portal.moverportal(this.x, this.y - 4);
            this.portal.orientacion('abajo');
        }
        else if(this.body.blocked.left){ 
            //this.portal = new PortalLogica(this.game, this.x + 25, this.y, this.name, 'derecha');
            this.portal.moverportal(this.x -25, this.y);
            this.portal.orientacion('derecha');
        }
        else if(this.body.blocked.down){
            //this.portal = new PortalLogica(this.game, this.x, this.y-4, this.name, 'arriba');
            this.portal.moverportal(this.x, this.y+4);
            this.portal.orientacion('arriba');
        }
        else if(this.body.blocked.right){
            //this.portal = new PortalLogica(this.game, this.x +25, this.y, this.name, 'izquierda');
            this.portal.moverportal(this.x + 25, this.y);
            this.portal.orientacion('izquierda');
        }
        //this.portal.kill();
        this.kill();
    }
}


//exportamos Portal
module.exports = Portal;