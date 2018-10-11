class AsherahPole extends Phaser.Sprite {
    // Constructor
    constructor(game, xx, yy, gamestate) {
        // Set up asherah pole
        super(game, xx, yy, "pole");
        game.add.existing(this);
        this.anchor.set(0, 1);
        this.scale.set(0.7, 0.7);
        this.gamestate = gamestate;
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
        
        // Health
        this.health = 5000;
        
        // Debug
        this.debugText = game.add.text(0,this.y,"debug", {fontSize:"32px", fill:"#ffffff"});
    };
    
    // Callback function for tapping pole
    onTapping() {
        if (this.energy >= this.fullEnergy) {
            console.log(this.gamestate.tempCard.children[1]);
        
            if(this.gamestate.tempCard.length < 8 )
                {
                    this.energy = 0;
                    let rantemp = this.game.rnd.integerInRange(2,4);
                    let cardtemp = new Cards(this.game, this.gamestate.tempCard.length + 2, rantemp, this.gamestate);
                    cardtemp.inputEnabled = true;
                    cardtemp.enableBody = true;
                    cardtemp.input.enableDrag();
                  cardtemp.events.onDragStart.add(this.gamestate.dragCardStart,this.gamestate);
                    cardtemp.events.onDragUpdate.add(this.gamestate.dragCardUpdate,this.gamestate);
                    cardtemp.events.onDragStop.add(this.gamestate.dragCardStop,this.gamestate);
      
        
                 
                    this.gamestate.tempCard.add(cardtemp);
                // Draw card
                console.log("Draw a card");
                this.animations.play("neutral");
                }
            
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
        
        if (this.health <= 0) {
            // Display defeated UI
        }
    };
};