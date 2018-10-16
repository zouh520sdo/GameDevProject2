let gameOverScreen = function(){
	
};

gameOverScreen.prototype.create = function(){
    game.add.sprite(0,0, "gameover");
	playbutton = game.add.button(game.world.centerX - 95, 600, 'menubutton', this.titleactionOnClick, this, 2, 1, 0);
};

gameOverScreen.prototype.titleactionOnClick = function() {
     game.state.start("Title");
};