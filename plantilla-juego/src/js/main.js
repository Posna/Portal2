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
