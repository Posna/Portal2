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