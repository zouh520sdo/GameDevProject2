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
        this.health = 1000;
        this.maxHealth = 1000;
        
        // Health bar
        this.HPContainer = game.add.sprite(0, 0, "HPContainer");
        this.HPBar = game.add.sprite(0, 0, "HPBar");
        this.HPBar.alignIn(this.HPContainer, Phaser.CENTER);
        this.HPContainer.addChild(this.HPBar);
        this.HPBar.setScaleMinMax(0.000001, 1);
        this.HPContainer.scale.set(1, 0.75);
        this.addChild(this.HPContainer);
        this.HPContainer.x = 6;
        this.HPContainer.y = -this.height*1.55;
    };
    
    // Callback function for tapping pole
    onTapping() {
        if (this.energy >= this.fullEnergy) {
            console.log(this.gamestate.tempCard.children[1]);
        
            if(this.gamestate.tempCard.length < 6 )
            {
                this.energy = 0;
                
                let rantemp = this.game.rnd.integerInRange(2,4);
                // random card category
                let prob = Math.random();
                if (prob < 0.7) {
                    // Silver card
                    console.log("Get silver card");
                    rantemp = Cards.category.silver[game.rnd.integerInRange(0, Cards.category.silver.length-1)];
                    console.log(rantemp);
                }
                else if (prob < 0.9){
                    console.log("Get gold card");
                    rantemp = Cards.category.gold[game.rnd.integerInRange(0, Cards.category.gold.length-1)];
                    console.log(rantemp);
                    // Gold card
                }
                else{
                     console.log("Get diamond card");
                    rantemp = Cards.category.diamond[game.rnd.integerInRange(0, Cards.category.diamond.length-1)];
                    console.log(rantemp);
                    // Diamond card
                }
                
                
                
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
        console.log(this);
        // Adding energy by time
        this.addEnergy(this.chargeRateByTime * this.game.time.elapsed / 1000);
        
        // Update health bar
        this.HPBar.scale.set(this.health/this.maxHealth, 1);
        
        if (this.health <= 0) {
            // Display defeated UI
			
        }
    };
	damaged(dmg) {
		this.health -= dmg;
	}
};