class AsherahPole extends Phaser.Sprite {
    // Constructor
    constructor(game, xx, yy) {
        // Set up asherah pole
        super(game, xx, yy, "pole");
        game.add.existing(this);
        this.anchor.set(0, 1);
        this.scale.set(0.7, 0.7);
        
        // Set up animations
        this.animations.add("neutral", [0], 10, true);
        this.animations.add("full_charged", [1,2,3,4,3,2], 10, true);
        this.animations.play("full_charged");
        
        // Enable tapping response
        this.inputEnabled = true;
        this.events.onInputDown.add(this.onTapping, this);
        
        // Fileds related to charging
        this.fullEnergy = 100;
        this.energy = 100;
        this.chargeRateByTime = 10;
        this.chargeRateByKill = 10;
        
        // Debug
        this.debugText = game.add.text(0,this.y,"debug", {fontSize:"32px", fill:"#ffffff"});
    };
    
    // Callback function for tapping pole
    onTapping() {
        if (this.energy >= this.fullEnergy) {
            this.energy = 0;
            // Draw card
            console.log("Draw a card");
            this.animations.play("neutral");
        }
        else {
            // No effect now
            console.log("Can't draw a card");
        }
    };
    
    addEnergy(amount) {
        if (this.energy < this.fullEnergy) {
            this.energy = Math.min(this.fullEnergy, this.energy+amount);
        }
        
        if (this.energy >= this.fullEnergy && this.animations.currentAnim.name === "neutral") {
            this.animations.play("full_charged");
        }
    };
    
    isFull() {
        return this.energy >= this.fullEnergy;
    }
    
    update() {
        super.update();
        
        // Adding energy by time
        this.addEnergy(this.chargeRateByTime * this.game.time.elapsed / 1000);
        
        this.debugText.text = this.isFull();
    };
};