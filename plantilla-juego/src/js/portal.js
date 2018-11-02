'use strict';
var Character = require ('./Character.js');


function Portal(game,x,y,name){
    this.game = game;
    this.stillBullet = true;
    Character.call(this, game, x, y, name);//Hace lo mismo que apply
    this.anchor.setTo(0.5, 0.5);
    this.scale.set(-0.3);

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
    
    this.portalBlue;
    this.fire();
    // this.bullets.animations.add ('shootBlue',[0],1,false);
    // this.bullets.animations.add ('shootOrange',[1],1,false);
}

Portal.prototype = Object.create (Phaser.Sprite.prototype);
Portal.prototype.constructor = Portal;

Portal.prototype.update = function (){
    this.collisionControl()
}

Portal.prototype.fire = function () {
    if ( this.bullets.countDead() > 0){     
        var bullet = this.bullets.getFirstDead();
        //bullet.reset(x - 8, y - 8);
        this.rotation = this.game.physics.arcade.angleToPointer(this);
        this.game.physics.arcade.moveToPointer(this, 300);
    }    
}

Portal.prototype.deploy = function(x,y){

}

Portal.prototype.collisionControl = function (){
    //this.game.physics.arcade.collide(this, 'checkWorldBounds');
    if(this.bullets.checkWorldBounds){
        this.portalBlue = this.game.add.sprite(50,400,'PortalBlue');
    }
}




//exportamos Portal
module.exports = Portal;