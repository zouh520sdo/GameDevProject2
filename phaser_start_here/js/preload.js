let preloadState = function() {
    
};

preloadState.prototype.preload = function () {
	
    game.load.image("sky", "assets/sky.png");
    game.load.image("platform", "assets/platform.png");
    game.load.image("star", "assets/star.png");
    game.load.image("card1", "assets/card1.png");
    game.load.image("card2", "assets/card2.png");
    game.load.image("card3", "assets/card3.png");
    game.load.image("card4", "assets/card4.png");
    // spritesheet
    game.load.spritesheet("murph", "assets/character.png", 32, 48);
    game.load.spritesheet("defender", "assets/Defender_SpriteSheet2.png", 256, 180);
    game.load.spritesheet("invader", "assets/Invader_SpriteSheet2.png", 256, 180);
    game.load.spritesheet("pole", "assets/AsherahPole_SpriteSheet.png", 320, 640);
    game.load.spritesheet("invader_archer", "assets/Invader_Archer_SpriteSheet.png", 256, 180);
    game.load.image("arrow", "assets/Arrow_Sprite.png");
    game.load.image("map", "assets/Map.png");
    
};

preloadState.prototype.create = function () {
    game.state.start("Game");
};

preloadState.prototype.update = function () {
    
};