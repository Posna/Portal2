'use strict';
var luisa;
var Player = require ('./Player.js');

var MAPSCALE = 1;
var NUMLEVELS = 1;

  var PlayScene = {
  create: function () {
    var bckg;
    bckg = this.game.add.image(0,0,'backgr');
    //bckg.scale.set(0.5);
    bckg.smoothed = false;
   
    //añadir los grupos
    //this.game.activeEnemies = this.game.add.group();

    //ejecutar aqui funciones de inicio juego
    //this.loadMap
    this.allReadyGO();

    //funcion pause

    //crear una instancia del HUD
  },
  update: function(){    
    //reviso colisiones
    //this.game.physics.arcade.collide(this.game.activeEnemies,this.Colisiones);
    //this.game.physics.arcade.overlap(,,,,);

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

  },
  createLayer: function(){
    var layer = this.map.createLayer(name);
    layer.smoothed = false;
    layer.setScale(MAPSCALE);
    return layer;
  },
  loadMap:function(){
    //cargo el tilemap
    //this.map = this.game.add.tilemap('mimapa');

    //this.map.addTilesetImage();

    //to get the tileset ID (number):
    //this.tilesetID = this.map.getTilesetIndex("Objects");
  }
};

module.exports = PlayScene;
