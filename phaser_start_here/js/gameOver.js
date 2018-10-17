let gameOverScreen = function(){
	
};

gameOverScreen.prototype.create = function(){
    game.add.sprite(0,0, "gameover");
	playbutton = game.add.button(game.world.centerX + 500, 800, 'menubutton', this.titleactionOnClick, this, 2, 1, 0);
    
    this.button_snd = game.add.audio("buttonPress");
};

gameOverScreen.prototype.titleactionOnClick = function() {
    this.button_snd.play();
     game.state.start("Title");
};