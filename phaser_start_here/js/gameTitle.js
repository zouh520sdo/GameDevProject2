let gameTitle = function(){
    
};

gameTitle.prototype.create = function() {

    game.add.sprite(0,0, "titlescreen");
    
     playbutton = game.add.button(game.world.centerX - 95, 600, 'playbutton', this.titleactionOnClick, this, 2, 1, 0);
     tutbutton = game.add.button(game.world.centerX - 95, 800, 'tutbutton', this.tutactionOnClick, this, 2, 1, 0);

};

gameTitle.prototype.titleactionOnClick = function() {

     game.state.start("Game");
}
 
gameTitle.prototype.tutactionOnClick = function() {

     game.state.start("Gametut");
}
 