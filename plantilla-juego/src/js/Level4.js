'use strict';
//var luisa;
var plat;
var cuboAzul;
var cuboCompania;
var Player = require ('./Player.js');
var Cubo = require ('./Cubo.js');
var PortalLogica = require ('./portalLogica.js');

var Level4 = {
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
    //portales
    this.portalN = new PortalLogica(this.game, -50, -50, 'bulletOrange', 'derecha');
    this.portalB = new PortalLogica(this.game, -50, -50, 'bulletBlue', 'izquierda');
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.luisa = new Player(this.game, 0, 527,'Luisa', this.layerN, this.layerB, this.portalN, this.portalB, true, true);
    //this.game.add.existing(luisa);
    this.luisa.create();
    
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
  }

};

module.exports = Level4;
