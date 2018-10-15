let gametutorial = function(){
    
};


gametutorial.prototype.create = function() {

    game.add.sprite(0,0, "titlescreen");
    
    backbutton = game.add.button(game.world.centerX - 95, 800, 'star', this.backactionOnClick, this, 2, 1, 0);
    

};

gametutorial.prototype.backactionOnClick = function()
{
  game.state.start("Title");
}