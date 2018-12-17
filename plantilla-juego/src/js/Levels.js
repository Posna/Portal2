var Levels = {
    create: function(){
        var titlescreen = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        titlescreen.anchor.setTo(0.5, 0.5);

        this.createButton('level 1', this.game.world.centerX/2 - 60, this.game.world.centerY, 200, 67, function(){
            this.state.start('level1');
        });

        this.createButton('level 2', this.game.world.centerX/2 - 60, this.game.world.centerY + 75, 200, 67, function(){
            this.state.start('level2');
        });

        this.createButton('level 3', this.game.world.centerX/2 - 60, this.game.world.centerY + 150, 200, 67, function(){
            this.state.start('levels');
        });

        this.createButton('level 4', this.game.world.centerX/2 - 60, this.game.world.centerY + 225, 200, 67, function(){
            this.state.start('level4');
        });
    },

  
    update: function(){
  
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

module.exports = Levels;
