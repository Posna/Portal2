var MainMenu = {
    create: function(){
        var titlescreen = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        titlescreen.anchor.setTo(0.5, 0.5);
        
        this.createButton('Play', this.game.world.centerX/2, this.game.world.centerY, 200, 67, function(){
            this.state.start('levels');
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

module.exports = MainMenu;
