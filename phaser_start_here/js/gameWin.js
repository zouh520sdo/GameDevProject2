let gameWinState = function() {
    
};

gameWinState.prototype.preload = function () {

};

gameWinState.prototype.create = function () {
    game.add.sprite(0,0, "victory");
    playbutton = game.add.button(game.world.centerX - 95, 600, 'menubutton', this.titleactionOnClick, this, 2, 1, 0);
    // Score UI
    this.scoreText = game.add.text(16,16,"You Win!", {fontSize:"32px", fill:"#000000", align:"center"});
    this.button_snd = game.add.audio("buttonPress");
};

gameWinState.prototype.titleactionOnClick = function() {
    this.button_snd.play();
     game.state.start("Title");
};

gameWinState.prototype.update = function () {
    
};