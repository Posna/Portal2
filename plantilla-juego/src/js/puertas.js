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
    this.animations.add('open',[1,2,3,4,5,6,7,8],5,false);
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
    }
}

Puerta.prototype.opendoor = function(){
    this.state = true;
}

module.exports = Puerta;