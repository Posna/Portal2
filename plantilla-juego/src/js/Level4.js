'use strict';
//var luisa;
var Player = require ('./Player.js');
//var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');
//var Puerta = require('./puertas.js');

var Level4 = {
  create: function () {
    
    // var bckg = this.game.add.image(0,0,'backgr');
    // //bckg.scale.set(0.5);
    // bckg.smoothed = false;
    this.game.stage.backgroundColor = 'rgb(128,128,128)';

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
