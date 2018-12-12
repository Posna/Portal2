(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function Character(game, x,y, name){
    //this.playScene = playScene;
    Phaser.Sprite.call(this, game, x, y, name);
    this.canTeleport = false;
    this.dead = false;
    this.anchor.setTo(0.5, 0.5);
    // this.x = x;
    // this.y = y;
    console.log("creado: " + name);
}

Character.prototype = Object.create (Phaser.Sprite.prototype);
Character.prototype.constructor = Character;
//Character.prototype.nombreFuncion = function nombr(){loquehaga};

//exportamos Charcter
module.exports = Character;
},{}],2:[function(require,module,exports){

var Character = require ('./Character.js');

function Cubo (game,x,y,name){
    Character.call(this, game, x, y, name);//Hace lo mismo que apply

    this.name = name;
    //this.game = game;
    this.anchor.setTo(0.5, 0.5);
    //this.scale.set(0.20);

    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
}

//Encadenamos el prototype
Cubo.prototype = Object.create (Character.prototype);
Cubo.prototype.constructor = Cubo;

Cubo.prototype.coger = function(posX, posY){
    if((posX+50 >= this.x) && posX-50 <= this.x && posY+50 >= this.y && posY-50 <= this.y)
    {
        this.x = posX +20;
        this.y = posY;
    }
}

module.exports = Cubo;


},{"./Character.js":1}],3:[function(require,module,exports){
'use strict';
var Character = require ('./Character.js');
var Portal = require ('./portal.js');
//var bullets;


var fireRate = 200;
var nextFire = 0;


function Player(game,x,y,name, l1, l2){
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
    this.layer1 = l1;
    this.layer2 = l2;
    this.cogido = false;
    

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
    this.scale.set(1.5, 1.5);
    this.animations.add('walk',[7,8,9,10],10,true);
    this.animations.add('walkBack',[10,9,8,7],10,true);
    this.animations.add('jump',[19,20,21,22],10,false);

    //this.game.camera.follow(this);

    //keys
    this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);

    console.log("existe");

}

Player.prototype.update = function (){
    this.move();
    this.gunAngle();
    this.flipwithmouse();
    this.shoot();
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
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
        cubo.coger(this.x, this.y);
        this.cogido = true;
        cubo.body.gravity.y = 0;
    }
    // if(cubo != undefined){
    //     cubo.body.gravity.y = 300;
    // }
    else{cubo.body.gravity.y = 300;}
    // if(this.game.input.keyboard.isUp(Phaser.Keyboard.E)){
    //     this.cogido = false;
    // }
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
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) && (this.body.onFloor() ||this.body.touching.down) ){
        this.jumping = true;
        this.animations.play('jump');
        this.body.velocity.y = -200;
        
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
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
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
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
    if(this.game.time.now > nextFire){
        if(this.game.input.activePointer.leftButton.isDown){
            nextFire = this.game.time.now + fireRate;
            this.disparo = new Portal(this.game, this.x , this.y, 'bulletBlue', this.layer1, this.layer2);
        }
        else if(this.game.input.activePointer.rightButton.isDown){
            nextFire = this.game.time.now + fireRate;
            this.disparo = new Portal(this.game, this.x , this.y, 'bulletOrange', this.layer1, this.layer2);
        }
        
    }

}
//Exportamos Player
module.exports = Player;
},{"./Character.js":1,"./portal.js":6}],4:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    //elimina las opciones que salen cuando le das al click derecho
    this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    //this.camera = new Camera();
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('backgr', 'images/Sprites_y_apartado_grafico/bridge_portal_2.jpg');
    this.game.load.spritesheet('Luisa', '/images/Sprites_y_apartado_grafico/playerSprite.png',49 ,49,-1,1,1);
    this.game.load.image('platAzul','images/Sprites_y_apartado_grafico/plataformaAzul.png');
    this.game.load.image('cuboAzul','images/Sprites_y_apartado_grafico/cube1.png');
    this.game.load.image('cuboCompania','images/Sprites_y_apartado_grafico/cubo_de_compania.png');
    this.game.load.image('gun','images/Sprites_y_apartado_grafico/portal gun.png');
    this.game.load.image('bulletBlue', 'images/Sprites_y_apartado_grafico/shootBlue.png');
    this.game.load.image('bulletOrange', 'images/Sprites_y_apartado_grafico/shootOrange.png');
    this.game.load.image('PortalBlue', 'images/Sprites_y_apartado_grafico/portalSpriteAzul.png');
    this.game.load.image('PortalOrange', 'images/Sprites_y_apartado_grafico/portalSpriteNaranja.png');
    this.game.load.image('Bloques', 'tiles/BloquesPeque.png');

    //cargo el tilemap
    this.game.load.tilemap('mapaBN', 'tiles/nivel1_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('mapaBB', 'tiles/nivel1_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);
    //this.game.load.tilemap('map', 'tiles/pruebaTilePortal_BloquesNegros.csv');
    //this.game.load.tilemap('map', 'tiles/pruebaTilePortal_BloquesBlancos.csv');
    //this.game.load.tilemap('mapa', 'tiles/level1.json', null, Phaser.Tilemap.TILED_JSON);
    //this.game.load.tilemap('mimapa', '/mapas/EastPalace1.json',null, Phaser.Tilemap.TILED_JSON);
  },

  create: function () {
    // this.map = this.game.add.tilemap('map');
    // this.map.addTilesetImage('Bloques');
    // this.layer = this.map.createLayer('BloquesNegros');
    // this.layer.resizeWorld();

    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};

},{"./play_scene.js":5}],5:[function(require,module,exports){
'use strict';
//var luisa;
var plat;
var cuboAzul;
var cuboCompania;
var Player = require ('./Player.js');
var Cubo = require ('./Cubo.js');

var MAPSCALE = 1;
var NUMLEVELS = 1;


  var PlayScene = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';
  
    //añadir los grupos
    //this.game.activeEnemies = this.game.add.group();
   
    //ejecutar aqui funciones de inicio juego
    //this.loadMap

   
    this.loadMap();
    this.allReadyGO();

     /////
    
    //  this.plataformas = this.game.add.group();
    //  plat = this.game.add.sprite(50,400,'platAzul');
    //  plat.scale.set(0.5);
    //  this.game.add.existing(plat);
    //  this.game.physics.enable(plat,Phaser.Physics.ARCADE);
    //  plat.body.enable = true;
    //  plat.body.immovable = true;

    //  this.plataformas.add(plat);     
     
     /////
    
    //funcion pause
    
    //crear una instancia del HUD
  },
  update: function(){
    //reviso colisiones
    this.collisionControl();   
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game,200, 200,'Luisa', this.layer, this.layer1);
    //this.game.add.existing(luisa);
    this.luisa.create();
    
    this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones

    //spawn luisa

    //creamos el HUD

    //cubos
    cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul');
    cuboAzul.scale.set(0.16);
    cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania');
    cuboCompania.scale.set(0.2);
  },
  createLayer: function(){
    // var layer = this.map.createLayer(name);
    // layer.smoothed = false;
    // layer.setScale(MAPSCALE);
    // return layer;
  },
  loadMap: function(){
    //añado el tilemap
    //this.map = this.game.add.tilemap('mimapa');

    //this.map.addTilesetImage();

    //to get the tileset ID (number):
    //this.tilesetID = this.map.getTilesetIndex("Objects");
    this.map = this.game.add.tilemap('mapaBN', 32, 32);
    this.map1 = this.game.add.tilemap('mapaBB', 32, 32);
    this.map.addTilesetImage('tiles', 'Bloques');
    this.map1.addTilesetImage('tiles', 'Bloques');
    this.map.setCollisionBetween(0, 1000);
    this.map1.setCollisionBetween(0, 1000);
    this.layer = this.map.createLayer(0);
    this.layer1 = this.map1.createLayer(0);
    this.layer.resizeWorld();
    this.layer1.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layer);
    this.game.physics.arcade.collide(this.luisa, this.layer1);
    this.game.physics.arcade.collide(this.layer, cuboAzul);
    this.game.physics.arcade.collide(this.layer1, cuboAzul);
    this.game.physics.arcade.collide(this.layer, cuboCompania);
    this.game.physics.arcade.collide(this.layer1, cuboCompania);
    this.luisa.pickup(cuboAzul);
    this.luisa.pickup(cuboCompania);
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  }

};

module.exports = PlayScene;

},{"./Cubo.js":2,"./Player.js":3}],6:[function(require,module,exports){
'use strict';
var Character = require ('./Character.js');
var PortalLogica = require ('./portalLogica.js');

function Portal(game,x,y,name, l1, l2){
    // this.game = game;
    this.stillBullet = true;
    this.name = name;
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
    this.blancos = l2;
    this.negros = l1;
    this.portalBlue;
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
        this.game.physics.arcade.moveToPointer(this, 300);
    }    
}

Portal.prototype.deploy = function(x,y){

}

Portal.prototype.collisionControl = function (){
    if(this.game.physics.arcade.collide(this, this.negros)){
        this.kill();
    }
    if(this.game.physics.arcade.collide(this, this.blancos)){
        if(this.portal != undefined){
            this.portal.kill();
        }
        //segun el lado con el que se de el portal saldra de un forma u  otra
        if(this.body.blocked.up){this.portal = new PortalLogica(this.game, this.x, this.y-4, this.name, 'abajo');}
        else if(this.body.blocked.left){ this.portal = new PortalLogica(this.game, this.x, this.y, this.name, 'derecha');}
        else if(this.body.blocked.down){this.portal = new PortalLogica(this.game, this.x, this.y, this.name, 'arriba');}
        else if(this.body.blocked.right){this.portal = new PortalLogica(this.game, this.x +25, this.y, this.name, 'izquierda');}
        //this.portal.kill();
        this.kill();
    }
}


//exportamos Portal
module.exports = Portal;
},{"./Character.js":1,"./portalLogica.js":7}],7:[function(require,module,exports){
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
},{"./Character.js":1}]},{},[4]);
