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
    game.load.image("arrow", "assets/Arrow_Sprite.png");
    game.load.image("map", "assets/Map.png");
    game.load.image("HPBar", "assets/HP_Bar.png");
    game.load.image("HPContainer", "assets/HP_Container.png");
    game.load.image("Buff_DamageUp", "assets/Damage_Up.png");
    game.load.image("Buff_HealthUp", "assets/HealthUp.png");
    game.load.image("Buff_SpeedUp", "assets/Speed_Up.png");
    game.load.image("tutorial1", "assets/tutorial1.png");
    game.load.image("tutorial2", "assets/tutorial2.png");
    game.load.image("tutorial3", "assets/tutorial3.png");
    
    
    //Cards 
     game.load.image("Bronze_Spawn", "assets/Bronze_Spawn.png");
     game.load.image("Silver_DamageBuff", "assets/Silver_DamageBuff.png");
     game.load.image("Silver_HPBuff", "assets/Silver_HPBuff.png");
     game.load.image("Silver_SpeedBuff", "assets/Silver_SpeedBuff.png");
     game.load.image("Gold_KillLane", "assets/Gold_KillLane.png");
     game.load.image("Gold_HealLane", "assets/Gold_HealLane.png");
     game.load.image("Gold_BuildWall", "assets/Gold_BuildWall.png");
     game.load.image("Diamond_DamageAll", "assets/Diamond_DamageAll.png");
     game.load.image("Diamond_HealAll", "assets/Diamond_HealAll.png");
    game.load.image("deck", "assets/Card_desk.png")
    
    
    game.load.image("titlescreen", "assets/titlescreen2.png");
    // spritesheet
    game.load.spritesheet("murph", "assets/character.png", 32, 48);
    game.load.spritesheet("defender", "assets/Defender_SpriteSheet2.png", 256, 180);
    game.load.spritesheet("invader", "assets/Invader_SpriteSheet2.png", 256, 180);
    game.load.spritesheet("pole", "assets/AsherahPole_SpriteSheet.png", 320, 640);
    game.load.spritesheet("invader_archer", "assets/Invader_Archer_SpriteSheet.png", 256, 180);
    game.load.spritesheet("wall", "assets/Wall_SpriteSheet.png", 160, 224);
    game.load.spritesheet("healing", "assets/Healing_SpriteSheet.png", 256, 192);
    game.load.spritesheet("meteor", "assets/Meteor_SpriteSheet.png", 440, 310); 
    
    game.load.spritesheet("menubutton", "assets/MenuButton_SpriteSheet.png",450, 105);
    game.load.spritesheet("nextbutton", "assets/NextButton_SpriteSheet.png", 450, 105);
    game.load.spritesheet("playbutton", "assets/PlayButton_SpriteSheet.png", 450, 105);
    game.load.spritesheet("tutbutton", "assets/TutorialButton_SpriteSheet.png", 450, 105);
    game.load.spritesheet("backbutton", "assets/BackButton_SpriteSheet.png", 450, 105);
    
};

preloadState.prototype.create = function () {
    game.state.start("Title");
};

preloadState.prototype.update = function () {
    
};