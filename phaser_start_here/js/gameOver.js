let gameOverScreen = function(){
	
};

gameOverScreen.prototype.create = function(){
	game.add.text(500, 500, "GGWP", {fontSize:"100px", fill:"#ffffff"});
	playbutton = game.add.button(game.world.centerX - 95, 600, 'star', this.titleactionOnClick, this, 2, 1, 0);
};

gameOverScreen.prototype.titleactionOnClick = function() {
     game.state.start("Title");
};