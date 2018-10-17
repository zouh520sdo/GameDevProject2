let introscreen = function(){
	
};

introscreen.prototype.create = function(){
    game.add.sprite(0,0, "intro");
	playbutton = game.add.button(game.world.centerX + 250, 975, 'nextbutton', this.titleactionOnClick, this, 2, 1, 0);
    
    this.button_snd = game.add.audio("buttonPress");
};

introscreen.prototype.titleactionOnClick = function() {
    this.button_snd.play();
     game.state.start("Game");
};