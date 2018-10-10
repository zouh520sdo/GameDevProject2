class AsherahPole extends Phaser.Sprite {
    // Constructor
    constructor(game, xx, yy) {
        // Set up asherah pole
        super(game, xx, yy, "platform");
        game.add.existing(this);
        this.anchor.set(0, 1);
        this.scale.set(0.15, 10);
        this.inputEnabled = true;
        this.events.onInputDown.add(this.onTapping, this);
        
        // Fileds related to charging
        this.fullEnergy = 100;
        this.energy = 0;
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