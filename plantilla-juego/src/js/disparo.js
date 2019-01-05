'use strict';
var Character = require ('./Character.js');
var PortalLogica = require ('./portalLogica.js');

function Disparo(game,x,y,name, l1, l2, disparo){
    // this.game = game;
    this.stillBullet = true;
    this.name = name;
    Character.call(this, game, x, y, name);//Hace lo mismo que apply
    this.anchor.setTo(0.5, 0.5);
    this.scale.set(-0.3);
    this.disparo = disparo;
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

    //disparoes
    this.blancos = l2;
    this.negros = l1;
    this.fire();
    // this.bullets.animations.add ('shootBlue',[0],1,false);
    // this.bullets.animations.add ('shootOrange',[1],1,false);
}

Disparo.prototype = Object.create (Character.prototype);
Disparo.prototype.constructor = Disparo;

Disparo.prototype.update = function (){
    this.collisionControl();
    //this.bullets.body.onWorldBounds.add(collisionControl, this);
}

Disparo.prototype.fire = function () {
    if ( this.bullets.countDead() > 0){     
       // var bullet = this.bullets.getFirstDead();
        //bullet.reset(x - 8, y - 8);
        this.rotation = this.game.physics.arcade.angleToPointer(this);
        this.game.physics.arcade.moveToPointer(this, 400);
    }    
}

Disparo.prototype.deploy = function(x,y){

}

Disparo.prototype.collisionControl = function (){
    var sound = this.game.add.sound("landshoot");
    if(this.game.physics.arcade.collide(this, this.negros)){
        this.kill();
    }
    if(this.game.physics.arcade.collide(this, this.blancos)){
        //segun el lado con el que se de el disparo saldra de un forma u  otra
        if(this.body.blocked.up){
            //this.disparo = new disparoLogica(this.game, this.x, this.y-4, this.name, 'abajo');
            this.disparo.moverportal(this.x, this.y - 4);
            this.disparo.orientacion('abajo');
        }
        else if(this.body.blocked.left){ 
            //this.disparo = new disparoLogica(this.game, this.x + 25, this.y, this.name, 'derecha');
            this.disparo.moverportal(this.x -25, this.y);
            this.disparo.orientacion('derecha');
        }
        else if(this.body.blocked.down){
            //this.disparo = new disparoLogica(this.game, this.x, this.y-4, this.name, 'arriba');
            this.disparo.moverportal(this.x, this.y+4);
            this.disparo.orientacion('arriba');
        }
        else if(this.body.blocked.right){
            //this.disparo = new disparoLogica(this.game, this.x +25, this.y, this.name, 'izquierda');
            this.disparo.moverportal(this.x + 25, this.y);
            this.disparo.orientacion('izquierda');
        }
        sound.play();
        //this.disparo.kill();

        this.kill();
    }
}


//exportamos disparo
module.exports = Disparo;