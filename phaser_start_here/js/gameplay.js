let gameplayState = function() {
    this.score = 0;
};

gameplayState.prototype.create = function() {
    // Turn on physics before anything else
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Set up heights for different area
    this.cardAreaHeight = 315;
    this.laneHeight = (game.world.height - this.cardAreaHeight) / 3.0;
    
    // debug line
    this.line1 = new Phaser.Line(0, this.laneHeight, game.world.width, this.laneHeight);
    this.line2 = new Phaser.Line(0, this.laneHeight*2, game.world.width, this.laneHeight*2);
    this.line3 = new Phaser.Line(0, this.laneHeight*3, game.world.width, this.laneHeight*3);
    
    console.log(this.laneHeight);
    
    // Set up timer
    this.gameplayTimer = game.time.create(true);
    this.gameplayTimer.add(10000, this.gotoGameWinState, this);
    //this.gameplayTimer.start();
    
    game.add.sprite(0,0, "sky");
    
    // Platforms
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    
    // Ground
    let ground = this.platforms.create(0, game.world.height - 64, "platform");
    ground.scale.setTo(2,2);
    ground.body.immovable = true;
    
    // Platforms
    let ledge = this.platforms.create(400, 400, "platform");
    ledge.body.immovable = true;
    ledge = this.platforms.create(-150, 250, "platform");
    ledge.body.immovable = true;
    
    // Player
    this.player = game.add.sprite(32, game.world.height - 150, "murph");
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 300;
    this.player.body.bounce.y = 0.3;
    this.player.body.collideWorldBounds = true;
    
    // Create animations
    this.player.animations.add("left", [0,1,2,3], 10, true);
    this.player.animations.add("right", [5,6,7,8], 10, true);
    
    this.stars = game.add.group();
    this.stars.enableBody = true;
    for (let i=0; i<12; i++) {
        let star = this.stars.create(i*70, 0, "star");
        star.body.gravity.y = 300;
        star.body.bounce.y = .2 + Math.random() * .2;
    }
    
    // Score UI
    this.scoreText = game.add.text(16,16,"Score: 0", {fontSize:"32px", fill:"#000000"});
    
    this.cursors = game.input.keyboard.createCursorKeys();
};

gameplayState.prototype.update = function() {
    game.physics.arcade.collide(this.player, this.platforms);
    game.physics.arcade.collide(this.stars, this.platforms);
    game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    
    
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -150;
        this.player.animations.play("left");
    }
    else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 150;       this.player.animations.play("right");
    }
    else { // stand still
        this.player.animations.stop();
        this.player.frame = 4;
    }
    
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.body.velocity.y = -350;
    }
    
    if (game.input.activePointer.leftButton.isDown) {
        let mouseY = game.input.activePointer.y;
        console.log(game.input.mousePointer.y);
        if (0<=mouseY && mouseY <this.laneHeight) {
            console.log("Lane1");
        }
        else if (this.laneHeight<=mouseY && mouseY <this.laneHeight*2) {
            console.log("Lane2");
        }
        else if (this.laneHeight*2<=mouseY && mouseY <this.laneHeight*3) {
            console.log("Lane3");
        }
        else if (this.laneHeight*3<=mouseY && mouseY<=game.world.height) {
            console.log("Cards");
        }
    }
};

gameplayState.prototype.render = function() {
    game.debug.geom(this.line1);
    game.debug.geom(this.line2);
    game.debug.geom(this.line3);
};

gameplayState.prototype.collectStar = function(player, star) {
    star.kill();
    this.score += 10;
    this.scoreText.text = "Score: " + this.score;
};

gameplayState.prototype.gotoGameWinState = function() {
    game.state.start("GameWin");
};

// Card draging effect
gameplayState.prototype.dragCardStart() {
    
};

gameplayState.prototype.dragCardUpdate(sprite, pointer, dragX, dragY, snapPoint) {
    
};

gameplayState.prototype.dragCardStop() {
    
};