var MainMenu = {
    create: function(){
        var titlescreen = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
        titlescreen.anchor.setTo(0.5, 0.5);

        this.createButton(this.game.world.centerX/2, this.game.world.centerY, 200, 67, function(){
            this.state.start('play');
        })
    },

  
    update: function(){
  
    },
  
    createButton: function(x, y, w, h, callback){
      var button1 = this.game.add.button(x, y, 'Button', callback, this, 2,1,0);
      //button1.onInputOver.add(function(){}, this);
        
      button1.anchor.setTo(0.5, 0.5);
      button1.width = w;
      button1.height = h;
    }

};

module.exports = MainMenu;
