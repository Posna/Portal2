'use strict';

var Level1 = require('./level1.js');

var Level2 = require('./level2.js');

var Level3 = require('./level3.js');

var Level4 = require('./level4.js');

var Level5 = require ('./Level5.js');

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
    this.game.load.image('cake', 'images/Sprites_y_apartado_grafico/cake1.png');

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

  game.state.start('boot');
};
