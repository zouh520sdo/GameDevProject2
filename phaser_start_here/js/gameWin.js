let gameWinState = function() {
    
};

gameWinState.prototype.preload = function () {

};

gameWinState.prototype.create = function () {
    game.add.sprite(0,0, "sky");
    // Score UI
    this.scoreText = game.add.text(16,16,"You Win!", {fontSize:"32px", fill:"#000000", align:"center"});
};

gameWinState.prototype.update = function () {
    
};