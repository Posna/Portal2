'use strict';
var luisa;
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

    this.game.stage.backgroundColor = 'rgb(68, 136, 170)';
    //añadir los grupos
    //this.game.activeEnemies = this.game.add.group();
   
    //ejecutar aqui funciones de inicio juego
    //this.loadMap
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
    
    luisa = new Player(this.game,200, 200,'Luisa');
    //this.game.add.existing(luisa);
    luisa.create();
    
    this.game.camera.follow(this.luisa);
    //crear los layers

    //activar colisiones

    //spawn luisa

    //creamos el HUD

    //cubos
    cuboAzul = new Cubo (this.game, 100 , 100, 'cuboAzul');
    cuboAzul.scale.set(0.30);
    cuboCompania = new Cubo (this.game, 200 , 100, 'cuboCompania');
    cuboCompania.scale.set(0.3);
  },
  createLayer: function(){
    var layer = this.map.createLayer(name);
    layer.smoothed = false;
    layer.setScale(MAPSCALE);
    return layer;
  },
  loadMap:function(){
    //añado el tilemap
    //this.map = this.game.add.tilemap('mimapa');

    //this.map.addTilesetImage();

    //to get the tileset ID (number):
    //this.tilesetID = this.map.getTilesetIndex("Objects");
  },
  collisionControl:function(){
    this.game.physics.arcade.collide(luisa, plat);
    this.game.physics.arcade.collide(luisa, cuboAzul);
    this.game.physics.arcade.collide(luisa, cuboCompania);
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);
  }

};

module.exports = PlayScene;
