(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function Character(game, x,y, name){
    //this.playScene = playScene;
    Phaser.Sprite.call(this, game, x, y, name);
    this.canTeleport = false;
    this.dead = false;
    this.anchor.setTo(0.5, 0.5);
    console.log("creado: " + name);
}

Character.prototype = Object.create (Phaser.Sprite.prototype);
Character.prototype.constructor = Character;
//Character.prototype.nombreFuncion = function nombr(){loquehaga};

//exportamos Charcter
module.exports = Character;
},{}],2:[function(require,module,exports){
var CanTP = require ('./canTP.js');

function Cubo (game,x,y,name, portalO, portalB){
    CanTP.call(this, game, x, y, name, portalO, portalB);//Hace lo mismo que apply

    this.name = name;
    //this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.scale.set(0.20);

    this.cogido = false;

    this.game.add.existing(this);//!
    

    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.E);
}

//Encadenamos el prototype
Cubo.prototype = Object.create (CanTP.prototype);
Cubo.prototype.constructor = Cubo;

Cubo.prototype.coger = function(player){
    if(this.e.justDown && this.game.physics.arcade.overlap(this, player)){
        //cubo.coger(this.x, this.y, this.game.physics.arcade.overlap(this, cubo));
        this.cogido = !this.cogido;
        console.log("eyyy");
    }

    if(this.cogido){
        this.x = player.x  + Math.cos(this.game.physics.arcade.angleToPointer(this)) * 20;
        this.y = player.y + Math.sin(this.game.physics.arcade.angleToPointer(this)) * 20;
        this.body.gravity.y = 0;
    }
    else{this.body.gravity.y = 300;}
    
}

Cubo.prototype.update = function(){
    CanTP.prototype.maxvel.call(this);
    if(this.body.onFloor()){
        this.body.velocity.x = 0;
    }
    CanTP.prototype.portalcol.call(this);
}

Cubo.prototype.sehatepeado = function(){

}

module.exports = Cubo;


},{"./canTP.js":11}],3:[function(require,module,exports){
var Final = {
    create: function(){
        var titlescreen = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        titlescreen.anchor.setTo(0.5, 0.5);
        var cake = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cake');
        cake.anchor.setTo(0.5, 0.5);
        //cake.scale.set(4, 4);
        this.game.add.text(10, 225, "Thanks for \nplaying the game", {
            font: "40px Constantia",
            fill: "#000",
            align: "cente"
        });

        this.createButton('Menu', this.game.world.centerX/2 - 75, 550, 200, 67, function(){
            var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('menu');
        });
    },

    createButton: function(string, x, y, w, h, callback){
        var button1 = this.game.add.button(x, y, 'ButtonNoLetter', callback, this, 2,1,0);
          
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;
  
        var txt = this.game.add.text(button1.x, button1.y, string, {
            font: "30px Constantia",
            fill: "#000",
            align: "cente"
        });
        txt.anchor.setTo(0.5, 0.5);
    }
};

module.exports = Final;
},{}],4:[function(require,module,exports){
'use strict';

var Player = require ('./Player.js');
var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
var Puertas = require('./puertas.js');
var Boton = require('./boton.js');

var Level5 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;

    this.pause = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';
    var sprite = this.game.add.sprite(35, 450, 'num5');
    sprite.scale.set(0.2);
    
    // var tuto = this.game.add.sprite(100, 500, "Tuto");
    // tuto.width = 75;
    // tuto.height = 50;
    
    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  
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
    this.pauseEvent();
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    //portales
    this.portalN = new PortalLogica(this.game, -50, -50, 'bulletOrange', 'derecha');
    this.portalB = new PortalLogica(this.game, -50,-50, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 100, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, true, true);
    this.puerta = new Puertas(this.game, 100, 130, 'puerta', false, 'level6', this.luisa);
    //this.game.add.existing(luisa);
    this.luisa.create();

    this.boton = new Boton (this.game, 600, 190, 'boton', false, this.puerta);
    this.cuboAzul = new Cubo (this.game,100, 300,'cuboAzul', this.portalN,this.portalB);
    
    //this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones


    //creamos el HUD

    //cubos
    // cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania',this.portalN, this.portalB);
    // cuboCompania.scale.set(0.2);

    // cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul', this.portalN, this.portalB);
    // cuboAzul.scale.set(0.16);
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
    this.mapN = this.game.add.tilemap('level5N', 32, 32);
    this.mapB = this.game.add.tilemap('level5B', 32, 32);
    this.mapN.addTilesetImage('tiles', 'Bloques');
    this.mapB.addTilesetImage('tiles', 'Bloques');
    this.mapN.setCollisionBetween(0, 1000);
    this.mapB.setCollisionBetween(0, 1000);
    this.layerN = this.mapN.createLayer(0);
    this.layerB = this.mapB.createLayer(0);
    this.layerN.resizeWorld();
    this.layerB.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    //this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layerN);
    this.game.physics.arcade.collide(this.luisa, this.layerB);
    this.game.physics.arcade.collide(this.luisa, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.cuboAzul, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.layerN, this.cuboAzul);
    this.game.physics.arcade.collide(this.layerB, this.cuboAzul);

    // this.game.physics.arcade.collide(this.layerN, cuboCompania);
    // this.game.physics.arcade.collide(this.layerB, cuboCompania);
    this.cuboAzul.coger(this.luisa);
    

    
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  },


  //*********************** INTENTO DE PAUSA **********************//
  pauseEvent: function(){
    var click = this.game.add.audio("buttonsound"); 
    if(this.e.justDown){
      this.game.paused = true;
      // Then add the menu
      var w = 200;
      var h = 100;
      this.menu1 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu1.anchor.setTo(0.5, 0.5);
      this.menu1.height = h;
      this.menu1.width = w;
      this.menu1.x = 800/2;
      this.menu1.y = 600/2 + 100;
      
      this.txt1 = this.game.add.text(this.menu1.x, this.menu1.y, "Continue", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt1.anchor.setTo(0.5, 0.5);
      
      this.menu2 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu2.anchor.setTo(0.5, 0.5);
      this.menu2.height = h;
      this.menu2.width = w;
      this.menu2.x = 800/2;
      this.menu2.y = 600/2 - 100;
      
      this.txt2 = this.game.add.text(this.menu2.x, this.menu2.y, "Menu", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt2.anchor.setTo(0.5, 0.5);
    }
    this.game.input.onDown.add(function(event){
      if(this.game.paused){
        // Calculate the corners of the menu
        var x11 = 800/2 - this.menu1.width/2, x12 = 800/2 + this.menu1.width/2,
        y11 = 600/2 - this.menu1.height/2 - 100, y12 = 600/2 + this.menu1.height/2 - 100;
        
        var x21 = 800/2 - this.menu2.width/2, x22 = 800/2 + this.menu2.width/2,
        y21 = 600/2 - this.menu2.height/2 + 100, y22 = 600/2 + this.menu2.height/2 + 100;
        // Check if the click was inside the menu
        if(event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          this.state.start('menu');
          // The choicemap is an array that will help us see which item was clicked
        }
        else if (event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          
          // The choicemap is an array that will help us see which item was clicked
        }
      }
    }, this);
    this.e.onDown.add(function () {
      if (this.game.paused) {
        if(this.e.justDown){
            // Remove the menu and the label
            this.menu1.destroy();
            this.menu2.destroy();
            this.txt1.destroy();
            this.txt2.destroy();
            this.game.paused = false;
        }
      }       
    }, this);
  }
};

module.exports = Level5;
},{"./Cubo.js":2,"./Player.js":9,"./boton.js":10,"./portalLogica.js":18,"./puertas.js":19}],5:[function(require,module,exports){
var Player = require ('./Player.js');
var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
var Puertas = require('./puertas.js');
var Boton = require('./boton.js');

var Level6 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;

    this.pause = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';
    var sprite = this.game.add.sprite(35, 350, 'num6');
    sprite.scale.set(0.3);
    

    var sprite2 = this.game.add.sprite(389, 300, 'cake2');
    sprite2.scale.set(1);
    // var tuto = this.game.add.sprite(100, 500, "Tuto");
    // tuto.width = 75;
    // tuto.height = 50;
    
    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  
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
    this.pauseEvent();
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    //portales
    this.portalN = new PortalLogica(this.game, -50, -50, 'bulletOrange', 'derecha');
    this.portalB = new PortalLogica(this.game, -50,-50, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 150, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, true, true);
    this.puerta = new Puertas(this.game, 100, 160, 'puerta', false, 'level7', this.luisa);
    //this.game.add.existing(luisa);
    this.luisa.create();

    this.boton = new Boton (this.game, 752, 253, 'boton', false, this.puerta);
    this.boton.scale.set(0.75);
    this.cuboAzul = new Cubo (this.game, 65, 550,'cuboAzul', this.portalN,this.portalB);
    
    //this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones


    //creamos el HUD

    //cubos
    // cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania',this.portalN, this.portalB);
    // cuboCompania.scale.set(0.2);

    // cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul', this.portalN, this.portalB);
    // cuboAzul.scale.set(0.16);
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
    this.mapN = this.game.add.tilemap('level6N', 32, 32);
    this.mapB = this.game.add.tilemap('level6B', 32, 32);
    this.mapN.addTilesetImage('tiles', 'Bloques');
    this.mapB.addTilesetImage('tiles', 'Bloques');
    this.mapN.setCollisionBetween(0, 1000);
    this.mapB.setCollisionBetween(0, 1000);
    this.layerN = this.mapN.createLayer(0);
    this.layerB = this.mapB.createLayer(0);
    this.layerN.resizeWorld();
    this.layerB.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    //this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layerN);
    this.game.physics.arcade.collide(this.luisa, this.layerB);
    this.game.physics.arcade.collide(this.luisa, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.cuboAzul, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.layerN, this.cuboAzul);
    this.game.physics.arcade.collide(this.layerB, this.cuboAzul);

    // this.game.physics.arcade.collide(this.layerN, cuboCompania);
    // this.game.physics.arcade.collide(this.layerB, cuboCompania);
    this.cuboAzul.coger(this.luisa);
    

    
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  },


  //*********************** INTENTO DE PAUSA **********************//
  pauseEvent: function(){
    var click = this.game.add.audio("buttonsound"); 
    if(this.e.justDown){
      this.game.paused = true;
      // Then add the menu
      var w = 200;
      var h = 100;
      this.menu1 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu1.anchor.setTo(0.5, 0.5);
      this.menu1.height = h;
      this.menu1.width = w;
      this.menu1.x = 800/2;
      this.menu1.y = 600/2 + 100;
      
      this.txt1 = this.game.add.text(this.menu1.x, this.menu1.y, "Continue", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt1.anchor.setTo(0.5, 0.5);
      
      this.menu2 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu2.anchor.setTo(0.5, 0.5);
      this.menu2.height = h;
      this.menu2.width = w;
      this.menu2.x = 800/2;
      this.menu2.y = 600/2 - 100;
      
      this.txt2 = this.game.add.text(this.menu2.x, this.menu2.y, "Menu", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt2.anchor.setTo(0.5, 0.5);
    }
    this.game.input.onDown.add(function(event){
      if(this.game.paused){
        // Calculate the corners of the menu
        var x11 = 800/2 - this.menu1.width/2, x12 = 800/2 + this.menu1.width/2,
        y11 = 600/2 - this.menu1.height/2 - 100, y12 = 600/2 + this.menu1.height/2 - 100;
        
        var x21 = 800/2 - this.menu2.width/2, x22 = 800/2 + this.menu2.width/2,
        y21 = 600/2 - this.menu2.height/2 + 100, y22 = 600/2 + this.menu2.height/2 + 100;
        // Check if the click was inside the menu
        if(event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          this.state.start('menu');
          // The choicemap is an array that will help us see which item was clicked
        }
        else if (event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          
          // The choicemap is an array that will help us see which item was clicked
        }
      }
    }, this);
    this.e.onDown.add(function () {
      if (this.game.paused) {
        if(this.e.justDown){
            // Remove the menu and the label
            this.menu1.destroy();
            this.menu2.destroy();
            this.txt1.destroy();
            this.txt2.destroy();
            this.game.paused = false;
        }
      }       
    }, this);
  }
};

module.exports = Level6;
},{"./Cubo.js":2,"./Player.js":9,"./boton.js":10,"./portalLogica.js":18,"./puertas.js":19}],6:[function(require,module,exports){
'use strict';
//var luisa;
var Player = require ('./Player.js');
var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
var Puerta = require('./puertas.js');
var Boton = require('./boton.js');

var Level7 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';
    var sprite = this.game.add.sprite(35, 450, 'num7');
    sprite.scale.set(0.2);
    
    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  
  
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
    this.pauseEvent();
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    //portales
    this.portalN = new PortalLogica(this.game, -50, -50, 'bulletOrange', 'derecha');
    this.portalB = new PortalLogica(this.game, -50, -50, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 690, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, true, true);
    //this.game.add.existing(luisa);
    this.luisa.create();

    this.puerta = new Puerta(this.game, 300, 288, 'puerta', false, 'final', this.luisa);
    this.boton = new Boton (this.game, 700, 573, 'boton', false, this.puerta);
    this.cuboAzul = new Cubo (this.game, 400, 300,'cuboAzul', this.portalN,this.portalB);
    
    //poner puerta aqui

    this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones


    //creamos el HUD

    //cubos
    // cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania',this.portalN, this.portalB);
    // cuboCompania.scale.set(0.2);

    // cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul', this.portalN, this.portalB);
    // cuboAzul.scale.set(0.16);
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
    this.mapN = this.game.add.tilemap('level7N', 32, 32);
    this.mapB = this.game.add.tilemap('level7B', 32, 32);
    this.mapN.addTilesetImage('tiles', 'Bloques');
    this.mapB.addTilesetImage('tiles', 'Bloques');
    this.mapN.setCollisionBetween(0, 1000);
    this.mapB.setCollisionBetween(0, 1000);
    this.layerN = this.mapN.createLayer(0);
    this.layerB = this.mapB.createLayer(0);
    this.layerN.resizeWorld();
    this.layerB.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    //this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layerN);
    this.game.physics.arcade.collide(this.luisa, this.layerB);
    this.game.physics.arcade.collide(this.luisa, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.cuboAzul, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.layerN, this.cuboAzul);
    this.game.physics.arcade.collide(this.layerB, this.cuboAzul);

    // this.game.physics.arcade.collide(this.layerN, cuboCompania);
    // this.game.physics.arcade.collide(this.layerB, cuboCompania);
    this.cuboAzul.coger(this.luisa);
    

    
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  },
  pauseEvent: function(){
    var click = this.game.add.audio("buttonsound"); 
    if(this.e.justDown){
      this.game.paused = true;
      // Then add the menu
      var w = 200;
      var h = 100;
      this.menu1 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu1.anchor.setTo(0.5, 0.5);
      this.menu1.height = h;
      this.menu1.width = w;
      this.menu1.x = 800/2;
      this.menu1.y = 600/2 + 100;
      
      this.txt1 = this.game.add.text(this.menu1.x, this.menu1.y, "Continue", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt1.anchor.setTo(0.5, 0.5);
      
      this.menu2 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu2.anchor.setTo(0.5, 0.5);
      this.menu2.height = h;
      this.menu2.width = w;
      this.menu2.x = 800/2;
      this.menu2.y = 600/2 - 100;
      
      this.txt2 = this.game.add.text(this.menu2.x, this.menu2.y, "Menu", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt2.anchor.setTo(0.5, 0.5);
    }
    this.game.input.onDown.add(function(event){
      if(this.game.paused){
        // Calculate the corners of the menu
        var x11 = 800/2 - this.menu1.width/2, x12 = 800/2 + this.menu1.width/2,
        y11 = 600/2 - this.menu1.height/2 - 100, y12 = 600/2 + this.menu1.height/2 - 100;
        
        var x21 = 800/2 - this.menu2.width/2, x22 = 800/2 + this.menu2.width/2,
        y21 = 600/2 - this.menu2.height/2 + 100, y22 = 600/2 + this.menu2.height/2 + 100;
        // Check if the click was inside the menu
        if(event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          this.state.start('menu');
          // The choicemap is an array that will help us see which item was clicked
        }
        else if (event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          
          // The choicemap is an array that will help us see which item was clicked
        }
      }
    }, this);
    this.e.onDown.add(function () {
      if (this.game.paused) {
        if(this.e.justDown){
            // Remove the menu and the label
            this.menu1.destroy();
            this.menu2.destroy();
            this.txt1.destroy();
            this.txt2.destroy();
            this.game.paused = false;
        }
      }       
    }, this);
  }

};

module.exports = Level7;

},{"./Cubo.js":2,"./Player.js":9,"./boton.js":10,"./portalLogica.js":18,"./puertas.js":19}],7:[function(require,module,exports){
var Levels = {
    create: function(){
        var titlescreen = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        titlescreen.anchor.setTo(0.5, 0.5);
        var click = this.game.add.audio("buttonsound"); 

        this.createButton('level 1', this.game.world.centerX/2 - 60, this.game.world.centerY, 200, 67, function(){
            //var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('level1');
        });

        this.createButton('level 2', this.game.world.centerX/2 - 60, this.game.world.centerY + 75, 200, 67, function(){
            //var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('level2');
        });

        this.createButton('level 3', this.game.world.centerX/2 - 60, this.game.world.centerY + 150, 200, 67, function(){
            //var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('level3');
        });

        this.createButton('level 4', this.game.world.centerX/2 - 60, this.game.world.centerY + 225, 200, 67, function(){
            //var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('level4');
        });

        this.createButton('level 5', this.game.world.centerX/2 +200, this.game.world.centerY , 200, 67, function(){
            //var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('level5');
        });
        this.createButton('level 7', this.game.world.centerX/2 +200, this.game.world.centerY + 150, 200, 67, function(){
            //var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('level7');
        });
        this.createButton('level 6', this.game.world.centerX/2 +200, this.game.world.centerY + 75, 200, 67, function(){
            //var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('level6');
        });
    },

  
    update: function(){
  
    },
  
    createButton: function(string, x, y, w, h, callback){
      var button1 = this.game.add.button(x, y, 'ButtonNoLetter', callback, this, 2,1,0);
        
      button1.anchor.setTo(0.5, 0.5);
      button1.width = w;
      button1.height = h;

      var txt = this.game.add.text(button1.x, button1.y, string, {
          font: "30px Constantia",
          fill: "#0d7300",
          align: "cente"
      });
      txt.anchor.setTo(0.5, 0.5);
    }

};

module.exports = Levels;

},{}],8:[function(require,module,exports){
var MainMenu = {
    create: function(){
        var titlescreen = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        titlescreen.anchor.setTo(0.5, 0.5);
        
        this.createButton('Play', this.game.world.centerX/2, this.game.world.centerY, 200, 67, function(){
            var click = this.game.add.audio("buttonsound"); 
            click.play();
            this.state.start('levels');
        });
        
    },

  
    update: function(){
  
    },
  
    createButton: function(string, x, y, w, h, callback){
        var button1 = this.game.add.button(x, y, 'ButtonNoLetter', callback, this, 2,1,0);
          
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;
  
        var txt = this.game.add.text(button1.x, button1.y, string, {
            font: "30px Constantia",
            fill: "#0d7300",
            align: "cente"
        });
        txt.anchor.setTo(0.5, 0.5);
    }

};

module.exports = MainMenu;

},{}],9:[function(require,module,exports){
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
    this.sound = this.game.add.audio("shoot"); 
    this.body.setSize(20, 33, 15, 15);
    
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
        this.gun.anchor.setTo(0,0.2);//si comento esto rota con un efecto un poco distinto
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
    //this.game.debug.body(this);
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
    if((this.body.blocked.down|| this.body.touching.down) && this.jumping){
        this.jumping = false;
    }
    if(this.body.onFloor()){
        this.tp = false;
    }
    //salto
    console.log(this.jumping);
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) && (this.body.blocked.down || this.body.touching.down)){
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
    
    if(this.game.time.now > nextFire){
        if(this.game.input.activePointer.leftButton.isDown && this.canPB){
            //this.sound.play();
            //sound.onStop.add(function(){sound.destroy();}, this);
            this.sound.play();
            nextFire = this.game.time.now + fireRate;
            this.disparo = new Disparo(this.game, this.x , this.y, 'bulletBlue', this.layer1, this.layer2, this.portalB);
        }
        else if(this.game.input.activePointer.rightButton.isDown && this.canPN){
            //this.sound.play();
            //sound.onStop.add(function(){sound.destroy();}, this);
            this.sound.play();
            nextFire = this.game.time.now + fireRate;
            this.disparo = new Disparo(this.game, this.x , this.y, 'bulletOrange', this.layer1, this.layer2, this.portalN);
        }
    }
    //sound.destroy();
}
//Exportamos Player
module.exports = Player;
},{"./canTP.js":11,"./disparo.js":12,"./portalLogica.js":18}],10:[function(require,module,exports){
var Character = require ('./Character.js');

function Boton(game, x, y, name, state, puerta){
    Character.call(this, game, x, y, name);
    this.state = state;//true-> activado(presionado), false -> desactivado(sin presionar)
    this.puerta = puerta;
    this.create();
}

Boton.prototype = Object.create (Character.prototype);
Boton.prototype.constructor = Boton;

Boton.prototype.create = function(){
    this.game.add.existing(this);
    this.scale.set(1);
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.checkCollision.left = false;
	this.body.checkCollision.right = false;
}
Boton.prototype.update = function(){
    if(!this.body.touching.up && this.state){
        this.desactivar();        
    }
}
Boton.prototype.pulsarBoton = function (){
    if(!this.state && this.body.touching.up){
       this.activar();
    }
}
Boton.prototype.activar = function (){
    this.state = true;
    this.frame =2;
    this.puerta.opendoor();
}

Boton.prototype.desactivar = function (){
    this.state = false;
    this.frame =0;
    this.puerta.closedoor();
}

module.exports = Boton;
},{"./Character.js":1}],11:[function(require,module,exports){
var Character = require ('./Character.js');

function CanTP(game,x,y,name, portalO, portalB){
    Character.call(this, game, x, y, name);//Hace lo mismo que apply

    //this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.portalB = portalB;
    this.portalN = portalO;
    this.MAX_VELOCITY = 700;
}

CanTP.prototype = Object.create (Character.prototype);
CanTP.prototype.constructor = CanTP;

CanTP.prototype.portalcol = function(){
    if(!this.game.physics.arcade.overlap(this, this.portalN)){
        this.overlapControlN = false;
    }
    if(!this.game.physics.arcade.overlap(this, this.portalB)){
        this.overlapControlB = false;
    }
    if(this.game.physics.arcade.overlap(this, this.portalN) && !this.overlapControlN){
        this.portalN.movetoportal(this.portalB, this);
        this.overlapControlB = true;
    }
    if(this.game.physics.arcade.overlap(this, this.portalB) && !this.overlapControlB){
        this.portalB.movetoportal(this.portalN, this);
        this.overlapControlN = true;
    }
}

CanTP.prototype.maxvel = function(){
    if(this.body.velocity.y > this.MAX_VELOCITY)
        this.body.velocity.y = this.MAX_VELOCITY;
    if(this.body.velocity.x > this.MAX_VELOCITY)
        this.body.velocity.x = this.MAX_VELOCITY;
}


module.exports = CanTP;
},{"./Character.js":1}],12:[function(require,module,exports){
'use strict';
var Character = require ('./Character.js');
var PortalLogica = require ('./portalLogica.js');

function Disparo(game,x,y,name, l1, l2, disparo){
    // this.game = game;
    this.stillBullet = true;
    this.name = name;
    Character.call(this, game, x, y, name);//Hace lo mismo que apply
    this.scale.set(-0.3);
    this.disparo = disparo;
    this.soundLand = this.game.add.sound("landshoot");
    // var sound = this.game.add.audio("shoot"); 
    // sound.play();
    //bullets
    this.anchor.setTo(0.2, 0.5);
    this.bullets = game.add.group();
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.add.existing(this);//!
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
    //this.body.setSize(100, 50);
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
    //this.game.debug.body(this);
    this.collisionControl();
    //this.bullets.body.onWorldBounds.add(collisionControl, this);
}

Disparo.prototype.fire = function () {
    if ( this.bullets.countDead() > 0){     
       // var bullet = this.bullets.getFirstDead();
        //bullet.reset(x - 8, y - 8);
        this.rotation = this.game.physics.arcade.angleToPointer(this);
        this.body.setSize(50, 50);/*, -(Math.cos(2*Math.PI - this.rotation)), Math.sin(2*Math.PI - this.rotation)*100);*/
        // console.log(-(Math.cos(2*Math.PI - this.rotation))*100);
        // console.log(Math.sin(2*Math.PI - this.rotation));
        // console.log(this.rotation);
        this.game.physics.arcade.moveToPointer(this, 500);
    }    
}

Disparo.prototype.deploy = function(x,y){

}

Disparo.prototype.collisionControl = function (){
    //var sound = this.game.add.sound("landshoot");
    var choque = false;
    if(this.game.physics.arcade.collide(this, this.negros)){
        choque = true;
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
            this.disparo.moverportal(this.x -4, this.y);
            this.disparo.orientacion('derecha');
        }
        else if(this.body.blocked.down){
            //this.disparo = new disparoLogica(this.game, this.x, this.y-4, this.name, 'arriba');
            this.disparo.moverportal(this.x, this.y+4);
            this.disparo.orientacion('arriba');
        }
        else if(this.body.blocked.right){
            //this.disparo = new disparoLogica(this.game, this.x +25, this.y, this.name, 'izquierda');
            this.disparo.moverportal(this.x + 6, this.y);
            this.disparo.orientacion('izquierda');
        }
        this.soundLand.play();
        //this.disparo.kill();
        //sound.destroy();
        choque = true;
    }
    if(choque){
        this.destroy();
    }
}


//exportamos disparo
module.exports = Disparo;
},{"./Character.js":1,"./portalLogica.js":18}],13:[function(require,module,exports){
'use strict';
var Player = require ('./Player.js');
var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
var Puertas = require('./puertas.js');
var Boton = require('./boton.js');

var Level1 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;

    this.pause = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';

    // var tuto = this.game.add.sprite(100, 500, "Tuto");
    // tuto.width = 75;
    // tuto.height = 50;
    var sprite = this.game.add.sprite(35, 450, 'num1');
    sprite.scale.set(0.2);
    this.game.add.text(75, 475, "     W   \n A      D", {
      font: "30px Constantia",
      fill: "#000",
      align: "cente"
    });
    this.game.add.text(225, 475, "               Pick up \n          the cube with e \n and use it to open the door", {
      font: "20px Constantia",
      fill: "#000",
      align: "cente"
    });
    this.game.add.text(550, 500, "One portal teleport you \n          to the other", {
      font: "15px Constantia",
      fill: "#000",
      align: "cente"
    });
    this.game.add.text(320, 225, "Press ESC for pause", {
      font: "20px Constantia",
      fill: "#000",
      align: "cente"
    });
    this.game.add.text(630, 80, "Next Level", {
      font: "20px Constantia",
      fill: "#000",
      align: "cente"
    });
    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  
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
    this.pauseEvent();
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    //portales
    this.portalN = new PortalLogica(this.game, 70, 375, 'bulletOrange', 'derecha');
    this.portalB = new PortalLogica(this.game, 730, 520, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 0, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, false, false);
    //this.game.add.existing(luisa);
    this.luisa.create();

    this.puerta = new Puertas(this.game, 683, 160, 'puerta', false, 'level2', this.luisa);
    this.boton = new Boton (this.game, 400, 573, 'boton', false, this.puerta);
    this.cuboAzul = new Cubo (this.game,300, 573,'cuboAzul', this.portalN,this.portalB);
    
    this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones


    //creamos el HUD

    //cubos
    // cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania',this.portalN, this.portalB);
    // cuboCompania.scale.set(0.2);

    // cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul', this.portalN, this.portalB);
    // cuboAzul.scale.set(0.16);
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
    this.mapN = this.game.add.tilemap('level1N', 32, 32);
    this.mapB = this.game.add.tilemap('level1B', 32, 32);
    this.mapN.addTilesetImage('tiles', 'Bloques');
    this.mapB.addTilesetImage('tiles', 'Bloques');
    this.mapN.setCollisionBetween(0, 1000);
    this.mapB.setCollisionBetween(0, 1000);
    this.layerN = this.mapN.createLayer(0);
    this.layerB = this.mapB.createLayer(0);
    this.layerN.resizeWorld();
    this.layerB.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    //this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layerN);
    this.game.physics.arcade.collide(this.luisa, this.layerB);
    this.game.physics.arcade.collide(this.luisa, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.cuboAzul, this.boton, this.boton.pulsarBoton, null,this.boton);
    this.game.physics.arcade.collide(this.layerN, this.cuboAzul);
    this.game.physics.arcade.collide(this.layerB, this.cuboAzul);

    // this.game.physics.arcade.collide(this.layerN, cuboCompania);
    // this.game.physics.arcade.collide(this.layerB, cuboCompania);
    this.cuboAzul.coger(this.luisa);
    

    
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  },


  //*********************** INTENTO DE PAUSA **********************//
  pauseEvent: function(){
    var click = this.game.add.audio("buttonsound"); 
    if(this.e.justDown){
      this.game.paused = true;
      // Then add the menu
      var w = 200;
      var h = 100;
      this.menu1 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu1.anchor.setTo(0.5, 0.5);
      this.menu1.height = h;
      this.menu1.width = w;
      this.menu1.x = 800/2;
      this.menu1.y = 600/2 + 100;
      
      this.txt1 = this.game.add.text(this.menu1.x, this.menu1.y, "Continue", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt1.anchor.setTo(0.5, 0.5);
      
      this.menu2 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu2.anchor.setTo(0.5, 0.5);
      this.menu2.height = h;
      this.menu2.width = w;
      this.menu2.x = 800/2;
      this.menu2.y = 600/2 - 100;
      
      this.txt2 = this.game.add.text(this.menu2.x, this.menu2.y, "Menu", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt2.anchor.setTo(0.5, 0.5);
    }
    this.game.input.onDown.add(function(event){
      if(this.game.paused){
        // Calculate the corners of the menu
        var x11 = 800/2 - this.menu1.width/2, x12 = 800/2 + this.menu1.width/2,
        y11 = 600/2 - this.menu1.height/2 - 100, y12 = 600/2 + this.menu1.height/2 - 100;
        
        var x21 = 800/2 - this.menu2.width/2, x22 = 800/2 + this.menu2.width/2,
        y21 = 600/2 - this.menu2.height/2 + 100, y22 = 600/2 + this.menu2.height/2 + 100;
        // Check if the click was inside the menu
        if(event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          this.state.start('menu');
          // The choicemap is an array that will help us see which item was clicked
        }
        else if (event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          
          // The choicemap is an array that will help us see which item was clicked
        }
      }
    }, this);
    this.e.onDown.add(function () {
      if (this.game.paused) {
        if(this.e.justDown){
            // Remove the menu and the label
            this.menu1.destroy();
            this.menu2.destroy();
            this.txt1.destroy();
            this.txt2.destroy();
            this.game.paused = false;
        }
      }       
    }, this);
  }
};

module.exports = Level1;
},{"./Cubo.js":2,"./Player.js":9,"./boton.js":10,"./portalLogica.js":18,"./puertas.js":19}],14:[function(require,module,exports){
'use strict';
//var luisa;
var Player = require ('./Player.js');
var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
var Puertas = require('./puertas.js');

var Level2 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';
    var sprite = this.game.add.sprite(35, 450, 'num2');
    sprite.scale.set(0.2);

    this.game.add.sprite(35, 450, "Tuto");

    this.game.add.text(150, 500, "Shoot \nportals", {
      font: "20px Constantia",
      fill: "#000",
      align: "cente"
    });

    this.game.add.text(300, 300, "    Portals can only \nappear in white blocks", {
      font: "15px Constantia",
      fill: "#000",
      align: "cente"
    });

    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  
  
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
    this.pauseEvent();
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    //portales
    this.portalN = new PortalLogica(this.game, 730, 520, 'bulletOrange', 'izquierda');
    this.portalB = new PortalLogica(this.game, -50, -50, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 0, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, true, false);
    //this.game.add.existing(luisa);
    this.luisa.create();

    this.puerta = new Puertas(this.game, 90, 350, 'puerta', true, 'level3', this.luisa);
    
    this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones


    //creamos el HUD

    //cubos
    // cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania',this.portalN, this.portalB);
    // cuboCompania.scale.set(0.2);

    // cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul', this.portalN, this.portalB);
    // cuboAzul.scale.set(0.16);
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
    this.mapN = this.game.add.tilemap('level2N', 32, 32);
    this.mapB = this.game.add.tilemap('level2B', 32, 32);
    this.mapN.addTilesetImage('tiles', 'Bloques');
    this.mapB.addTilesetImage('tiles', 'Bloques');
    this.mapN.setCollisionBetween(0, 1000);
    this.mapB.setCollisionBetween(0, 1000);
    this.layerN = this.mapN.createLayer(0);
    this.layerB = this.mapB.createLayer(0);
    this.layerN.resizeWorld();
    this.layerB.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    //this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layerN);
    this.game.physics.arcade.collide(this.luisa, this.layerB);
    // this.game.physics.arcade.collide(this.layerN, cuboAzul);
    // this.game.physics.arcade.collide(this.layerB, cuboAzul);
    // this.game.physics.arcade.collide(this.layerN, cuboCompania);
    // this.game.physics.arcade.collide(this.layerB, cuboCompania);
    //cuboCompania.coger(this.luisa);
    

    
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  },
  pauseEvent: function(){
    var click = this.game.add.audio("buttonsound"); 
    if(this.e.justDown){
      this.game.paused = true;
      // Then add the menu
      var w = 200;
      var h = 100;
      this.menu1 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu1.anchor.setTo(0.5, 0.5);
      this.menu1.height = h;
      this.menu1.width = w;
      this.menu1.x = 800/2;
      this.menu1.y = 600/2 + 100;
      
      this.txt1 = this.game.add.text(this.menu1.x, this.menu1.y, "Continue", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt1.anchor.setTo(0.5, 0.5);
      
      this.menu2 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu2.anchor.setTo(0.5, 0.5);
      this.menu2.height = h;
      this.menu2.width = w;
      this.menu2.x = 800/2;
      this.menu2.y = 600/2 - 100;
      
      this.txt2 = this.game.add.text(this.menu2.x, this.menu2.y, "Menu", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt2.anchor.setTo(0.5, 0.5);
    }
    this.game.input.onDown.add(function(event){
      if(this.game.paused){
        // Calculate the corners of the menu
        var x11 = 800/2 - this.menu1.width/2, x12 = 800/2 + this.menu1.width/2,
        y11 = 600/2 - this.menu1.height/2 - 100, y12 = 600/2 + this.menu1.height/2 - 100;
        
        var x21 = 800/2 - this.menu2.width/2, x22 = 800/2 + this.menu2.width/2,
        y21 = 600/2 - this.menu2.height/2 + 100, y22 = 600/2 + this.menu2.height/2 + 100;
        // Check if the click was inside the menu
        if(event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          this.state.start('menu');
          // The choicemap is an array that will help us see which item was clicked
        }
        else if (event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          
          // The choicemap is an array that will help us see which item was clicked
        }
      }
    }, this);
    this.e.onDown.add(function () {
      if (this.game.paused) {
        if(this.e.justDown){
            // Remove the menu and the label
            this.menu1.destroy();
            this.menu2.destroy();
            this.txt1.destroy();
            this.txt2.destroy();
            this.game.paused = false;
        }
      }       
    }, this);
  }

};

module.exports = Level2;

},{"./Cubo.js":2,"./Player.js":9,"./portalLogica.js":18,"./puertas.js":19}],15:[function(require,module,exports){
'use strict';
var Player = require ('./Player.js');
//var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
var Puertas = require('./puertas.js');

var Level3 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';
    var sprite = this.game.add.sprite(35, 450, 'num3');
    sprite.scale.set(0.2);

    this.game.add.text(350, 250, "The portals preserve \n        the inertia", {
      font: "20px Constantia",
      fill: "#000",
      align: "cente"
    });

    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  
  
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
    this.pauseEvent();
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    //portales
    this.portalN = new PortalLogica(this.game, 430, 569, 'bulletOrange', 'arriba');
    this.portalB = new PortalLogica(this.game, -50, -50, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 0, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, true, false);
    //this.game.add.existing(luisa);
    this.luisa.create();

    this.puerta = new Puertas(this.game, 590, 128, 'puerta', true, 'level4', this.luisa);
    
    this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones


    //creamos el HUD

    //cubos
    // cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania',this.portalN, this.portalB);
    // cuboCompania.scale.set(0.2);

    // cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul', this.portalN, this.portalB);
    // cuboAzul.scale.set(0.16);
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
    this.mapN = this.game.add.tilemap('level3N', 32, 32);
    this.mapB = this.game.add.tilemap('level3B', 32, 32);
    this.mapN.addTilesetImage('tiles', 'Bloques');
    this.mapB.addTilesetImage('tiles', 'Bloques');
    this.mapN.setCollisionBetween(0, 1000);
    this.mapB.setCollisionBetween(0, 1000);
    this.layerN = this.mapN.createLayer(0);
    this.layerB = this.mapB.createLayer(0);
    this.layerN.resizeWorld();
    this.layerB.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    //this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layerN);
    this.game.physics.arcade.collide(this.luisa, this.layerB);
    // this.game.physics.arcade.collide(this.layerN, cuboAzul);
    // this.game.physics.arcade.collide(this.layerB, cuboAzul);
    // this.game.physics.arcade.collide(this.layerN, cuboCompania);
    // this.game.physics.arcade.collide(this.layerB, cuboCompania);
    //cuboCompania.coger(this.luisa);
    
    

    
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  },
  pauseEvent: function(){
    var click = this.game.add.audio("buttonsound"); 
    if(this.e.justDown){
      this.game.paused = true;
      // Then add the menu
      var w = 200;
      var h = 100;
      this.menu1 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu1.anchor.setTo(0.5, 0.5);
      this.menu1.height = h;
      this.menu1.width = w;
      this.menu1.x = 800/2;
      this.menu1.y = 600/2 + 100;
      
      this.txt1 = this.game.add.text(this.menu1.x, this.menu1.y, "Continue", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt1.anchor.setTo(0.5, 0.5);
      
      this.menu2 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu2.anchor.setTo(0.5, 0.5);
      this.menu2.height = h;
      this.menu2.width = w;
      this.menu2.x = 800/2;
      this.menu2.y = 600/2 - 100;
      
      this.txt2 = this.game.add.text(this.menu2.x, this.menu2.y, "Menu", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt2.anchor.setTo(0.5, 0.5);
    }
    this.game.input.onDown.add(function(event){
      if(this.game.paused){
        // Calculate the corners of the menu
        var x11 = 800/2 - this.menu1.width/2, x12 = 800/2 + this.menu1.width/2,
        y11 = 600/2 - this.menu1.height/2 - 100, y12 = 600/2 + this.menu1.height/2 - 100;
        
        var x21 = 800/2 - this.menu2.width/2, x22 = 800/2 + this.menu2.width/2,
        y21 = 600/2 - this.menu2.height/2 + 100, y22 = 600/2 + this.menu2.height/2 + 100;
        // Check if the click was inside the menu
        if(event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          this.state.start('menu');
          // The choicemap is an array that will help us see which item was clicked
        }
        else if (event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          
          // The choicemap is an array that will help us see which item was clicked
        }
      }
    }, this);
    this.e.onDown.add(function () {
      if (this.game.paused) {
        if(this.e.justDown){
            // Remove the menu and the label
            this.menu1.destroy();
            this.menu2.destroy();
            this.txt1.destroy();
            this.txt2.destroy();
            this.game.paused = false;
        }
      }       
    }, this);
  }

};

module.exports = Level3;

},{"./Player.js":9,"./portalLogica.js":18,"./puertas.js":19}],16:[function(require,module,exports){
'use strict';
//var luisa;
var Player = require ('./Player.js');
//var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
var Puerta = require('./puertas.js');

var Level4 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';
    var sprite = this.game.add.sprite(35, 450, 'num4');
    sprite.scale.set(0.2);
    
    this.e = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
  
  
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
    this.pauseEvent();
    //funcion pause
  },

  //aqui los preparativos para el nivel
  allReadyGO: function(){
    //portales
    this.portalN = new PortalLogica(this.game, -50, -50, 'bulletOrange', 'derecha');
    this.portalB = new PortalLogica(this.game, -50, -50, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 0, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, true, true);
    //this.game.add.existing(luisa);
    this.luisa.create();

    this.puerta = new Puerta(this.game, 690, 255, 'puerta', true, 'level5', this.luisa);
    
    //poner puerta aqui

    this.game.camera.follow(this.luisa);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    //crear los layers

    //activar colisiones


    //creamos el HUD

    //cubos
    // cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania',this.portalN, this.portalB);
    // cuboCompania.scale.set(0.2);

    // cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul', this.portalN, this.portalB);
    // cuboAzul.scale.set(0.16);
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
    this.mapN = this.game.add.tilemap('level4N', 32, 32);
    this.mapB = this.game.add.tilemap('level4B', 32, 32);
    this.mapN.addTilesetImage('tiles', 'Bloques');
    this.mapB.addTilesetImage('tiles', 'Bloques');
    this.mapN.setCollisionBetween(0, 1000);
    this.mapB.setCollisionBetween(0, 1000);
    this.layerN = this.mapN.createLayer(0);
    this.layerB = this.mapB.createLayer(0);
    this.layerN.resizeWorld();
    this.layerB.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    //this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layerN);
    this.game.physics.arcade.collide(this.luisa, this.layerB);
    // this.game.physics.arcade.collide(this.layerN, cuboAzul);
    // this.game.physics.arcade.collide(this.layerB, cuboAzul);
    // this.game.physics.arcade.collide(this.layerN, cuboCompania);
    // this.game.physics.arcade.collide(this.layerB, cuboCompania);
    //cuboCompania.coger(this.luisa);
    

    
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  },
  pauseEvent: function(){
    var click = this.game.add.audio("buttonsound"); 
    if(this.e.justDown){
      this.game.paused = true;
      // Then add the menu
      var w = 200;
      var h = 100;
      this.menu1 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu1.anchor.setTo(0.5, 0.5);
      this.menu1.height = h;
      this.menu1.width = w;
      this.menu1.x = 800/2;
      this.menu1.y = 600/2 + 100;
      
      this.txt1 = this.game.add.text(this.menu1.x, this.menu1.y, "Continue", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt1.anchor.setTo(0.5, 0.5);
      
      this.menu2 = this.game.add.sprite(800/2 - w/2, 600/2 - h/2, 'platAzul');
      this.menu2.anchor.setTo(0.5, 0.5);
      this.menu2.height = h;
      this.menu2.width = w;
      this.menu2.x = 800/2;
      this.menu2.y = 600/2 - 100;
      
      this.txt2 = this.game.add.text(this.menu2.x, this.menu2.y, "Menu", {
        font: "30px Constantia",
        fill: "#000",
        align: "cente"
      });
      this.txt2.anchor.setTo(0.5, 0.5);
    }
    this.game.input.onDown.add(function(event){
      if(this.game.paused){
        // Calculate the corners of the menu
        var x11 = 800/2 - this.menu1.width/2, x12 = 800/2 + this.menu1.width/2,
        y11 = 600/2 - this.menu1.height/2 - 100, y12 = 600/2 + this.menu1.height/2 - 100;
        
        var x21 = 800/2 - this.menu2.width/2, x22 = 800/2 + this.menu2.width/2,
        y21 = 600/2 - this.menu2.height/2 + 100, y22 = 600/2 + this.menu2.height/2 + 100;
        // Check if the click was inside the menu
        if(event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          this.state.start('menu');
          // The choicemap is an array that will help us see which item was clicked
        }
        else if (event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22 ){
          click.play();
          this.menu1.destroy();
          this.menu2.destroy();
          this.txt1.destroy();
          this.txt2.destroy();
          this.game.paused = false;
          
          // The choicemap is an array that will help us see which item was clicked
        }
      }
    }, this);
    this.e.onDown.add(function () {
      if (this.game.paused) {
        if(this.e.justDown){
            // Remove the menu and the label
            this.menu1.destroy();
            this.menu2.destroy();
            this.txt1.destroy();
            this.txt2.destroy();
            this.game.paused = false;
        }
      }       
    }, this);
  }

};

module.exports = Level4;

},{"./Player.js":9,"./portalLogica.js":18,"./puertas.js":19}],17:[function(require,module,exports){
'use strict';

var Level1 = require('./level1.js');

var Level2 = require('./level2.js');

var Level3 = require('./level3.js');

var Level4 = require('./level4.js');

var Level5 = require ('./Level5.js');

var Level7 = require('./Level7.js');

var Level6 = require ('./Level6.js');

var MenuScene = require('./MainMenu.js')

var Levels = require('./Levels.js');

var Final = require('./Final.js');

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
    this.game.load.spritesheet('Luisa', 'images/Sprites_y_apartado_grafico/playerSprite.png',49 ,49, -1,1,1);
    this.game.load.spritesheet('puerta', 'images/Sprites_y_apartado_grafico/puerta.png', 344/8, 32);
    this.game.load.spritesheet('boton', 'images/Sprites_y_apartado_grafico/AllBotones.png', 111/3, 8);
    this.game.load.image('platAzul','images/Sprites_y_apartado_grafico/plataformaAzul.png');
    this.game.load.image('cuboAzul','images/Sprites_y_apartado_grafico/cube1.png');
    this.game.load.image('cuboCompania','images/Sprites_y_apartado_grafico/cubo_de_compania.png');
    this.game.load.image('gun','images/Sprites_y_apartado_grafico/portal gun.png');
    this.game.load.image('bulletBlue', 'images/Sprites_y_apartado_grafico/shootBlue.png');
    this.game.load.image('bulletOrange', 'images/Sprites_y_apartado_grafico/shootOrange.png');
    this.game.load.image('PortalBlue', 'images/Sprites_y_apartado_grafico/portalSpriteAzul.png');
    this.game.load.image('PortalOrange', 'images/Sprites_y_apartado_grafico/portalSpriteNaranja.png');
    this.game.load.image('Bloques', 'tiles/BloquesPeque.png');
    this.game.load.image('num1', 'images/Sprites_y_apartado_grafico/num1.png');
    this.game.load.image('num2', 'images/Sprites_y_apartado_grafico/num2.png');
    this.game.load.image('num3', 'images/Sprites_y_apartado_grafico/num3.png');
    this.game.load.image('num4', 'images/Sprites_y_apartado_grafico/num4.png');
    this.game.load.image('num5', 'images/Sprites_y_apartado_grafico/num5.png');
    this.game.load.image('num7', 'images/Sprites_y_apartado_grafico/num7.png');
    this.game.load.image('num6', 'images/Sprites_y_apartado_grafico/num6.png');
    this.game.load.image('cake', 'images/Sprites_y_apartado_grafico/cake1.png');
    this.game.load.image('cake2', 'images/Sprites_y_apartado_grafico/cake.png');

    //Tutos
    this.game.load.image('Tuto', 'images/Sprites_y_apartado_grafico/mouseTuto.png');

    //sounds
    this.game.load.audio('buttonsound', 'sounds/sonido_click_buttons.mp3');
    this.game.load.audio('shoot', 'sounds/portal_shoot.mp3');
    this.game.load.audio('landshoot', 'sounds/portal_when_collide.mp3');

    //cosas del menu
    this.game.load.image('menu', 'images/Sprites_y_apartado_grafico/Menu.png');
    this.game.load.spritesheet('Button', 'images/Sprites_y_apartado_grafico/botones.png', 160, 74);
    this.game.load.spritesheet('ButtonNoLetter', 'images/Sprites_y_apartado_grafico/botonesSinLetra.png', 160, 74);

    //Nivel 1
    this.game.load.tilemap('level1N', 'tiles/nivel1_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level1B', 'tiles/nivel1_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);

    //Nivel 2
    this.game.load.tilemap('level2N', 'tiles/nivel2_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level2B', 'tiles/nivel2_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);

    //Nivel 3
    this.game.load.tilemap('level3N', 'tiles/nivel3_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level3B', 'tiles/nivel3_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);

    //Nivel 4
    this.game.load.tilemap('level4N', 'tiles/nivel4_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level4B', 'tiles/nivel4_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);

    //Nivel 5
    this.game.load.tilemap('level5N', 'tiles/nivel5_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level5B', 'tiles/nivel5_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);

    //Nivel 7
    this.game.load.tilemap('level7N', 'tiles/nivel7_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level7B', 'tiles/nivel7_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);

    //Nivel 6
    this.game.load.tilemap('level6N', 'tiles/nivel6_BloquesNegros.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('level6B', 'tiles/nivel6_BloquesBlancos.csv', null, Phaser.Tilemap.CSV);
  },

  create: function () {
    // this.map = this.game.add.tilemap('map');
    // this.map.addTilesetImage('Bloques');
    // this.layer = this.map.createLayer('BloquesNegros');
    // this.layer.resizeWorld();

    this.game.state.start('menu');
  }
};



window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('menu', MenuScene);
  game.state.add('final', Final);
  game.state.add('levels', Levels);
  game.state.add('level1', Level1);
  game.state.add('level2', Level2);
  game.state.add('level3', Level3);
  game.state.add('level4', Level4);
  game.state.add('level5', Level5);
  game.state.add('level6', Level6);
  game.state.add('level7', Level7);

  game.state.start('boot');
};

},{"./Final.js":3,"./Level5.js":4,"./Level6.js":5,"./Level7.js":6,"./Levels.js":7,"./MainMenu.js":8,"./level1.js":13,"./level2.js":14,"./level3.js":15,"./level4.js":16}],18:[function(require,module,exports){
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
},{"./Character.js":1}],19:[function(require,module,exports){
var Character = require ('./Character.js');

function Puerta(game, x, y, name, state, nextLevel, player){
    Character.call(this, game, x, y, name);
    this.state = state;
    this.player = player;
    this.nextLevel = nextLevel;
    this.alredydone = false;
    this.create();
}

Puerta.prototype = Object.create (Character.prototype);
Puerta.prototype.constructor = Puerta;

Puerta.prototype.create = function(){
    this.game.add.existing(this);
    this.scale.set(2);
    this.animations.add('open',[0,1,2,3,4,5,6,7,8],5,false);
    this.animations.add('close',[8,7,6,5,4,3,2,1,0],5,false);
    this.game.physics.enable(this,Phaser.Physics.ARCADE);
}

Puerta.prototype.update = function(){
    if(this.state){
        if(!this.alredydone){
            this.animations.play('open');
            this.alredydone = true;
        }
        if(this.game.physics.arcade.overlap(this.player, this)){
            this.game.state.start(this.nextLevel);
            console.log('abretesesamo');
        }
    }else{
        if(this.alredydone){
            this.animations.play('close');
            this.alredydone = false;
        }
    }
}

Puerta.prototype.opendoor = function(){
    this.state = true;
}
Puerta.prototype.closedoor = function(){
    this.state = false;
}


module.exports = Puerta;
},{"./Character.js":1}]},{},[17]);
