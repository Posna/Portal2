'use strict';
//var luisa;
var plat;
var Player = require ('./Player.js');
// var map;
// var layer;

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
    
     this.plataformas = this.game.add.group();
     plat = this.game.add.sprite(50,400,'platAzul');
     plat.scale.set(0.5);
     this.game.add.existing(plat);
     this.game.physics.enable(plat,Phaser.Physics.ARCADE);
     plat.body.enable = true;
     plat.body.immovable = true;

     this.plataformas.add(plat);     
     
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
    //crear los layers

    //activar colisiones

    //spawn luisa

    //creamos el HUD

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
    //this.map.setCollisionBetween(0, 4);
    //this.layer.scale.set(0.5, 0.5);
    this.layer.resizeWorld();
    this.layer1.resizeWorld();
    console.log("CreadoTile");
    
  },
  collisionControl:function(){
    this.game.physics.arcade.collide(this.luisa, plat);
    this.game.physics.arcade.collide(this.luisa, this.layer);
    this.game.physics.arcade.collide(this.luisa, this.layer1);
    //this.physics.arcade.collide(this.jugador,this.layer);
    // if(this.game.physics.arcade.collide(luisa.disparo, plat);){
    // }
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  }

};

module.exports = PlayScene;
