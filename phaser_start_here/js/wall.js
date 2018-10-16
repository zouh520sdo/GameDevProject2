class Wall extends Phaser.Sprite {
    
    constructor(game, xx, yy, gameState) {
        super(game, xx, yy, "wall");
        game.add.existing(this);
        this.anchor.set(0.5,1);
        this.scale.set(1.25);
        this.gameState = gameState;
        
        // Set up collision
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.setSize(30 / this.scale.x, 224 / this.scale.x, 65, 0);
        this.body.immovable = true;
        
        // Set up animation
        this.animations.add("spawn", [0,1,2,3], 10, false);
        this.animations.add("destroy", [3,2,1,0], 10, false);
        this.animations.play("spawn");
        
        // Set up destroy timer
        this.destroyTimer = game.time.create(this, true);
        this.destroyTimer.add(10000, this.goingToDestroy, this);
        this.destroyTimer.start();
        
        // Array for stucked units
        this.stuckedUnits = [];
    }
    
    update() {
        super.update();
        game.physics.arcade.overlap(this, this.gameState.enemyUnit, this.blockMoving, null, this);
        game.physics.arcade.overlap(this, this.gameState.friendlyUnit1, this.blockMoving, null, this);
        game.physics.arcade.overlap(this, this.gameState.friendlyUnit2, this.blockMoving, null, this);
        game.physics.arcade.overlap(this, this.gameState.friendlyUnit3, this.blockMoving, null, this);
        
        if (this.animations.currentAnim.name === "destroy" && this.animations.currentAnim.isFinished) {
            for (let i=0; i<this.stuckedUnits.length; i++) {
                this.stuckedUnits[i].stopStucked();
            }
            this.destroy();
        }
    }
    
    blockMoving(wall, unit) {
        if (!unit.is_Stucked) {
            console.log("Get stucked!!");
            unit.startStucked();
            this.stuckedUnits.push(unit);
        }
    }
    
    goingToDestroy() {
        this.animations.play("destroy");
    }
}