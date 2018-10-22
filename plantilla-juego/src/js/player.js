'use strict';
var Character = require ('./Character.js');

function Player(game,x,y,name){
    //this.playScene = playScene;
    this.name = name;
    this.game = game;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    Character.call(this, game, x, y, name);//Hace lo mismo que apply
    this.jumping = true;
    this.jumpTimer = 0;
    this.speed = 100;
    this.carryingObj = false;
    this.canTeleport = false;
    this.faceRight = true;
    this.x = x;
    this.y = y;
    this.anchor.setTo(0.5, 0.5);//aqui no?
    //Portal gun
    this.gun = this.game.make.sprite(0,0, 'gun');
    this.gun.scale.set(0.3);
    //this.gun.anchor.setTo(0.5,0.5);//si comento esto rota con un efecto un poco distinto
    this.portalGun = this.addChild(this.gun);
    console.log("creadoPlayer");
}

//Encadenamos el prototype
Player.prototype = Object.create (Character.prototype);
Player.prototype.constructor = Player;

//funcion para inicializacion: crea sprite y sus variables
Player.prototype.create = function(){
    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    //this.scale.set(1.5);
    this.animations.add('walk',[7,8,9,10],10,true);
    this.animations.add('jump',[19,20,21,22],10,false);
    console.log("existe");

}

Player.prototype.update = function (){
    this.move();
    this.gunAngle();
    this.game.debug.bodyInfo(this, 32, 32);
}

Player.prototype.move = function (){
    this.body.velocity.x = 0;
    if((this.body.onFloor() || this.body.touching.down)){
        this.jumping = false;
    }
    //salto
    if(this.cursors.up.isDown && (this.body.onFloor() ||this.body.touching.down) ){
        this.jumping = true;
        this.animations.play('jump');
        this.body.velocity.y = -200;
        
    }
    if (this.cursors.left.isDown){
        this.body.velocity.x -=  this.speed;
        this.faceRight = false;        
        if(!this.jumping)
            this.animations.play('walk');
    }
    else if (this.cursors.right.isDown){
        this.body.velocity.x +=  this.speed;
        this.faceRight = true;
        if(!this.jumping){
            this.animations.play('walk');
        }
    }
    else {//si entra por aqui significa que no esta pulsadndo  izq ni derecha
        this.animations.stop('walk');
        if(!this.jumping)
            this.frame = 6;
    }
    this.flip();
}
Player.prototype.gunAngle = function (){
    this.portalGun.rotation = this.game.physics.arcade.angleToPointer(this);
}

Player.prototype.flip = function (){
    if(this.faceRight){
        this.scale.setTo(1,1);
        //recalibrar angulo de la pistola        
    }
    else{
        this.scale.setTo(-1,1);
        //aqui tmb        
    }
}

//Aqui funciones propias del player

//Exportamos Player
module.exports = Player;