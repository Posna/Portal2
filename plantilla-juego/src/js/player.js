'use strict';
var Character = require ('./Character.js');
var Portal = require ('./portal.js');
var bullets;


var fireRate = 200;
var nextFire = 0;

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

    // bullets = game.add.group();
    // bullets.enableBody = true;
    // bullets.physicsBodyType = Phaser.Physics.ARCADE;

    // bullets.createMultiple(50, 'bullet');
    // bullets.setAll('checkWorldBounds', true);
    // bullets.setAll('outOfBoundsKill', true);


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
    this.animations.add('walkBack',[10,9,8,7],10,true);
    this.animations.add('jump',[19,20,21,22],10,false);


    console.log("existe");

}

Player.prototype.update = function (){
    this.move();
    this.gunAngle();
    this.flipwithmouse();
    this.shoot();
    this.game.debug.bodyInfo(this, 32, 32);
}

Player.prototype.flipwithmouse = function(){
    var angStop = Math.PI /2;
    var ang = this.game.physics.arcade.angleToPointer(this);
    if(ang > -angStop && ang < angStop){
        this.faceRight = true;
    }else{
        this.faceRight = false;
    }
}

Player.prototype.move = function (){
    var angStop = Math.PI / 2;
    var ang = this.game.physics.arcade.angleToPointer(this);
    var mousedrch = ang > -angStop && ang < angStop;
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
        //this.faceRight = false;        
        if(!this.jumping){
            if(mousedrch){
                this.animations.play('walkBack')
            }else{
                this.animations.play('walk');
            }
        }
    }
    else if (this.cursors.right.isDown){
        this.body.velocity.x +=  this.speed;
        //this.faceRight = true;
        if(!this.jumping){
            if(mousedrch){
                this.animations.play('walk');
            }else{
                this.animations.play('walkBack');
            }
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
    
    if(this.faceRight){
        // var angStop = 1.5708;
        // var ang = this.game.physics.arcade.angleToPointer(this);
        // if(ang > -angStop && ang < angStop){
            //console.log(ang);
            this.portalGun.rotation = this.game.physics.arcade.angleToPointer(this);                
        // }else if (ang > angStop){
        //     this.portalGun.rotation = angStop;
        // }else
        //     this.portalGun.rotation = -angStop;
        
    }
    else{
        this.portalGun.rotation = -this.game.physics.arcade.angleToPointer(this) - Math.PI;
    }
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
Player.prototype.shoot = function(){
    if(this.game.time.now > nextFire&& this.game.input.activePointer.isDown){
        nextFire = this.game.time.now + fireRate;
        var disparo = new Portal(this.game, this.x , this.y, 'bulletBlue');
        
    }

}
//Exportamos Player
module.exports = Player;