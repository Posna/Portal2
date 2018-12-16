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