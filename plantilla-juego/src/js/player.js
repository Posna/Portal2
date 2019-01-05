'use strict';
var CanTP = require ('./canTP.js');
var Disparo = require ('./disparo.js');
var PortalLogica = require('./portalLogica.js');
//var bullets;


var fireRate = 200;
var nextFire = 0;


function Player(game,x,y,name, l1, l2, portalN, portalB, useBluePortal, useOrangePortal){
    //this.playScene = playScene;
    // this.name = name;
    // this.game = game;
    CanTP.call(this, game, x, y, name);//Hace lo mismo que apply
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumping = true;
    this.jumpTimer = 0;
    this.speed = 100;
    this.carryingObj = false;
    this.canTeleport = false;
    this.faceRight = true;
    this.x = x;
    this.y = y;
    this.canPN = useOrangePortal;
    this.canPB = useBluePortal;
    this.portalB;
    this.portalN;
    this.anchor.setTo(0.5, 0.5);//aqui no?
    //Portal gun
    if(this.canPN || this.canPB){
        this.gun = this.game.make.sprite(0,0, 'gun');
        this.gun.scale.set(0.3);
        this.gun.anchor.setTo(0,0.5);//si comento esto rota con un efecto un poco distinto
        this.portalGun = this.addChild(this.gun);
    }
    this.layer1 = l1;
    this.layer2 = l2;
    this.cogido = false;
    this.sujetando = false;
    this.tp = false;
    this.MAX_VELOCITY = 700;
    
    //this.body.drag = 50;
    this.portalN = portalN;
    this.portalB = portalB; 
    // bullets = game.add.group();
    // bullets.enableBody = true;
    // bullets.physicsBodyType = Phaser.Physics.ARCADE;

    // bullets.createMultiple(50, 'bullet');
    // bullets.setAll('checkWorldBounds', true);
    // bullets.setAll('outOfBoundsKill', true);


    console.log("creadoPlayer");
}

//Encadenamos el prototype
Player.prototype = Object.create (CanTP.prototype);
Player.prototype.constructor = Player;

//funcion para inicializacion: crea sprite y sus variables
Player.prototype.create = function(){
    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.scale.set(1.5, 1.5);
    this.animations.add('walk',[7,8,9,10],10,true);
    this.animations.add('walkBack',[10,9,8,7],10,true);
    this.animations.add('jump',[19,20,21,22],10,false);

    //this.game.camera.follow(this);

    //keys
    this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.E);

    console.log("existe");

}

Player.prototype.update = function (){
    this.move();
    if(this.canPN || this.canPB)
        this.gunAngle();
    this.flipwithmouse();
    this.shoot();
    CanTP.prototype.maxvel.call(this);
    CanTP.prototype.portalcol.call(this);    
    //this.game.debug.bodyInfo(this, 32, 32);
    
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

Player.prototype.pickup = function(cubo){
    var cogido = true;
    if(this.game.physics.arcade.overlap(this, cubo)){
        if(this.e.justDown){
            //cubo.coger(this.x, this.y, this.game.physics.arcade.overlap(this, cubo));
            this.cogido = !this.cogido;
            console.log("eyyy");
        }
    }

    if(this.cogido && this.game.physics.arcade.overlap(this, cubo)){
        cubo.coger(this);
        this.sujetando = true;
        cubo.body.gravity.y = 0;
    }
    else{cubo.body.gravity.y = 300;}
    // if(this.e.justDown){
    //     this.cogido = !this.cogido;
    // }
    // if(this.cogido && !this.sujetando)
    //     cubo.coger(this);
}

Player.prototype.move = function (){
    var angStop = Math.PI / 2;
    var ang = this.game.physics.arcade.angleToPointer(this);
    var mousedrch = ang > -angStop && ang < angStop;
    if((this.body.onFloor()) && this.jumping){
        this.jumping = false;
    }
    if(this.body.onFloor()){
        this.tp = false;
    }
    //salto
    
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) && (this.body.onFloor()) ){
        this.jumping = true;
        this.animations.play('jump');
        this.body.velocity.y = -200;
        
    }
    if(!this.tp){
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
            this.body.velocity.x = -this.speed;
            //this.faceRight = false;        
            if(!this.jumping){
                if(mousedrch){
                    this.animations.play('walkBack');
                }else{
                    this.animations.play('walk');
                }
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
            this.body.velocity.x = +this.speed;
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
            if(!this.jumping){
                this.frame = 6;
            }
            this.body.velocity.x = 0;
        }
    }else {//si entra por aqui significa que no esta pulsadndo  izq ni derecha
        this.animations.stop('walk');
        if(!this.jumping){
            this.frame = 6;
        }
    }
    this.flip();
}

Player.prototype.sehatepeado = function(){
    this.tp = true;
}

Player.prototype.gunAngle = function (){
    
    if(this.faceRight){
        this.portalGun.rotation = this.game.physics.arcade.angleToPointer(this);                
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
    var sound = this.game.add.audio("shoot"); 
    if(this.game.time.now > nextFire){
        if(this.game.input.activePointer.leftButton.isDown && this.canPB){
            sound.play();
            nextFire = this.game.time.now + fireRate;
            this.disparo = new Disparo(this.game, this.x , this.y, 'bulletBlue', this.layer1, this.layer2, this.portalB);
        }
        else if(this.game.input.activePointer.rightButton.isDown && this.canPN){
            sound.play();
            nextFire = this.game.time.now + fireRate;
            this.disparo = new Disparo(this.game, this.x , this.y, 'bulletOrange', this.layer1, this.layer2, this.portalN);
        }
    }
}
//Exportamos Player
module.exports = Player;