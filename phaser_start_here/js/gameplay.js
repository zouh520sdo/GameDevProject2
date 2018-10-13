let gameplayState = function(){
    this.score = 0;
    this.laneHeight = 0;
    this.selectedCard = null;
    this.asherahPole = null;
};


gameplayState.prototype.create = function() {
    console.log("Cards " + Cards.category);
    
    // Turn on physics before anything else
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Set up heights for different area
	//1125-150 = 975
	//gap = 72.5
	//975/3 = 325 (lane height)
	//325/2 = 162.5...
	
    this.cardAreaHeight = 150;
    this.laneHeight = (game.world.height - this.cardAreaHeight) / 3.0;
    
    // debug line
    this.line1 = new Phaser.Line(0, this.laneHeight, game.world.width, this.laneHeight);
    this.line2 = new Phaser.Line(0, this.laneHeight*2, game.world.width, this.laneHeight*2);
    this.line3 = new Phaser.Line(0, this.laneHeight*3, game.world.width, this.laneHeight*3);
    
    console.log("Lane height " + this.laneHeight);
    
	//groups of friendly units on lanes
	this.friendlyUnit1 = game.add.group();
	this.friendlyUnit2 = game.add.group();
	this.friendlyUnit3 = game.add.group();
	
	this.friendlyUnit1.enableBody = true;
	this.friendlyUnit2.enableBody = true;
	this.friendlyUnit3.enableBody = true;
	
	//group of enemy units on lanes
	this.enemyUnit = game.add.group();
	
	this.enemyUnit.enableBody = true;
	
    // Set up timer
	
    this.gameplayTimer = game.time.create(true);
    this.spawnTimer = game.time.create(true);
	for(this.counter = 0; this.counter < 6; this.counter += 1){
		//phase 1 - 1 unit per 5 sec
		if(this.counter === 0){
			for(this.c1 = 0; this.c1 < 6; this.c1 += 1){
				this.spawn_delay = 5000 * this.c1;
				//console.log("delay: " + this.spawn_delay);
				this.spawnTimer.add(this.spawn_delay, this.spawnEnemyEvent1, this);
			}
		}
		
		//phase 2 - 1 unit per 3 sec
		else if(this.counter === 1){
			for(this.c2 = 0; this.c2 < 10; this.c2 += 1){
				this.spawn_delay2 = 30000 + 3000 * this.c2;
				this.spawnTimer.add(this.spawn_delay2, this.spawnEnemyEvent1, this);
			}
		}
		//phase 3 - 2 units per 5 sec
		else if(this.counter === 2){
			for(this.c3 = 0; this.c3 < 6; this.c3 += 1){
				this.spawn_delay3 = 60000 + 5000 * this.c3;
				this.spawnTimer.add(this.spawn_delay3, this.spawnEnemyEvent2, this);
			}
		}
		//phase 4 - 1 unit per 2 sec
		
		else if(this.counter === 3){
			for(this.c4 = 0; this.c4 < 15; this.c4 += 1){
				this.spawn_delay4 = 90000 + 2000 * this.c4;
				this.spawnTimer.add(this.spawn_delay4, this.spawnEnemyEvent1, this);
			}
		}
		//phase 5 - 2 units per 3 sec
		else if(this.counter === 4){
			for(this.c5 = 0; this.c5 < 10; this.c5 += 1){
				this.spawn_delay5 = 120000 + 3000 * this.c5;
				this.spawnTimer.add(this.spawn_delay5, this.spawnEnemyEvent2, this);
			}
		}
		//phase 6 - 3 units per 3 sec
		else if(this.counter === 5){
			for(this.c6 = 0; this.c6 < 10; this.c6 += 1){
				this.spawn_delay6 = 150000 + 3000 * this.c6;
				this.spawnTimer.add(this.spawn_delay6, this.spawnEnemyEvent3, this);
			}
		}
		
	}
	
	this.gameplayTimer.add(180000, this.gotoGameWinState, this);
	this.spawnTimer.start();
    this.gameplayTimer.start();
  
    
    //Card group have to be declared first;
    this.tempCard = game.add.group();
    this.tempCard.enableBody = true;
    
    // Set up asherah pole
    this.asherahPole = new AsherahPole(game, 0, this.laneHeight*2, this);
   
    // Add input over and input out callback function
    
    // Timer UI
    this.scoreText = game.add.text(16,16,"Time Left: 3:00", {fontSize:"32px", fill:"#ffffff"});
	console.log(this);
    
    // Card information UI
    this.cardInfoText = game.add.text(game.world.width*0.75, this.laneHeight*3, "Card Info", {fontSize:"32px", fill:"#ffffff"});
    this.cardInfoText.alpha = 0;  // Hide when game starts
    
    //group of cards for the game
    this.permcard = game.add.group();
    
    let permycard = new Cards(this.game, 1, 1, this);
    permycard.inputEnabled = true;
    permycard.input.enableDrag();
    permycard.events.onDragStart.add(this.dragCardStart,this);
    permycard.events.onDragUpdate.add(this.dragCardUpdate,this);
    permycard.events.onDragStop.add(this.dragCardStop,this);
    this.permcard.add(permycard);
    for(let i = 2; i < 7; i++)
    {
        let rantemp = this.game.rnd.integerInRange(2,4);
        let cardtemp = new Cards(this.game, i, rantemp, this);
        cardtemp.inputEnabled = true;
        cardtemp.enableBody = true;
        cardtemp.input.enableDrag();
        cardtemp.events.onDragStart.add(this.dragCardStart,this);
        cardtemp.events.onDragUpdate.add(this.dragCardUpdate,this);
        cardtemp.events.onDragStop.add(this.dragCardStop,this);
      
        
        this.tempCard.add(cardtemp);
        
    }
    
    
};

gameplayState.prototype.update = function(){
	
    game.physics.arcade.overlap(this.friendlyUnit1, this.enemyUnit, this.fight ,null, this);
	game.physics.arcade.overlap(this.friendlyUnit2, this.enemyUnit, this.fight ,null, this);
	game.physics.arcade.overlap(this.friendlyUnit3, this.enemyUnit, this.fight ,null, this);
	
    this.scoreText.text = "Time Left: " + this.msToTime(this.gameplayTimer.duration);
    
};
/*
	parameters:
		group - the friendlyUnit group this unit would join
		mult - lane id

	units are actually added into the group when the constructor of 
	basicUnit is called
*/
gameplayState.prototype.addUnit = function(mult) {
	//units would spawn from (350, 315)
	if(mult === 0){
		new basicUnit(this.friendlyUnit1 , 350, 397.5, mult);
	}
	else if(mult === 1){
		new basicUnit(this.friendlyUnit2 , 350, 397.5, mult);
	}
	else if(mult === 2){
		new basicUnit(this.friendlyUnit3 , 350, 397.5, mult);
	}
	
};
/*
	similar to addUnit
*/

gameplayState.prototype.addEnemy = function(mult) {
	//console.log("time elapsed in phase: " + this.enemyTimer.elapsed);
	console.log("enemy generated on lane" + (mult+1));
	if(mult === 0){
		new basicEnemyUnit(this.enemyUnit, 2500, 72.5, mult);
	}
	else if(mult === 1){
		new basicEnemyUnit(this.enemyUnit, 2500, 72.5 + this.laneHeight, mult);
	}
	else if(mult === 2){
		new basicEnemyUnit(this.enemyUnit, 2500, 72.5 + 2 * this.laneHeight, mult);
	}
};


gameplayState.prototype.render = function(){
    game.debug.geom(this.line1);
    game.debug.geom(this.line2);
    game.debug.geom(this.line3);
};

gameplayState.prototype.gotoGameWinState = function(){
    game.state.start("GameWin");
};

gameplayState.prototype.StartCooldown = function(Cards)
{
    Cards.activated = false;
}

/*
	spawn 1 enemy at random lane
*/

gameplayState.prototype.spawnEnemyEvent1 = function(){
	console.log("spawn triggered");
	this.something2 = 0;
	for(this.something2 = 0; this.something2 < 1; this.something2 += 1){
		this.lane_num = this.randomInt();
		console.log("the random number is: " + this.lane_num);
		if(this.lane_num === 0){
			this.addEnemy(0);
		}
		else if(this.lane_num === 1){
			this.addEnemy(1);
		}
		else if(this.lane_num === 2){
			this.addEnemy(2);
		}
	}
}

//spawn 2 enemies on two different random lanes

gameplayState.prototype.spawnEnemyEvent2 = function(){
	console.log("spawn triggered");
	this.something2 = 0;
	this.prev_num = 3;
	for(this.something2 = 0; this.something2 < 2; this.something2 += 1){
		this.lane_num = this.randomInt();
		while(this.lane_num === this.prev_num){
			this.lane_num = this.randomInt();
		}
		this.prev_num = this.lane_num;
		console.log("the random number is: " + this.lane_num);
		if(this.lane_num === 0){
			this.addEnemy(0);
		}
		else if(this.lane_num === 1){
			this.addEnemy(1);
		}
		else if(this.lane_num === 2){
			this.addEnemy(2);
		}
	}
}

//spawn 3 enemies (on all lanes)

gameplayState.prototype.spawnEnemyEvent3 = function(){
	console.log("spawn triggered");
	this.something2 = 0;
	for(this.something2 = 0; this.something2 < 3; this.something2 += 1){
		this.addEnemy(0);
		this.addEnemy(1);
		this.addEnemy(2);
	}
}
// On input down on card
gameplayState.prototype.showHideCardInfo = function(sprite, pointer) {
    
    this.cardInfoText.alpha = 1;
    
    if (this.selectedCard === sprite) {
        // hide card's info
        this.cardInfoText.alpha = 0;
        console.log("Hide card info");
        this.selectedCard = null;
    }
    else {
        
        if (this.selectedCard !== null) {
            // place it back(maybe) or other necessary changes for the original selected card
        }
        // Show currect selected card's info
        this.cardInfoText.alpha = 1;
        
        // Change text based the sprite player is selecting
        console.log("Show card info");
        
        this.selectedCard = sprite;
    }
};
// Card draging effect
gameplayState.prototype.dragCardStart = function(Cards, pointer, dragX, dragY) {
    Cards.alpha = 0.5;
};

gameplayState.prototype.dragCardUpdate = function(Cards, pointer, dragX, dragY, snapPoint) {
    
};

gameplayState.prototype.dragCardStop = function(Cards, pointer) {
    let mouseY = pointer.y;
    
    // May need to invoke some functions to take effect of card or take it back to card area
    Cards.alpha = 1;
    
    // Deselect cards when they are placed in lanes
    if (mouseY < this.laneHeight*3) {
        Cards.deSelect();
    }
    
    //ONLY for card id of 1, the permanent card
    if(Cards.id === 1 && Cards.activated === false)
    {
        if ( mouseY <this.laneHeight) {
            console.log("Lane1");
            this.addUnit(this.friendlyUnit1, 0);
            Cards.x = Cards.savedx;
            Cards.y = Cards.savedy;
            Cards.activated = true;
            Cards.startcd();
        }
        else if (this.laneHeight<=mouseY && mouseY <this.laneHeight*2) {
            console.log("Lane2");
            this.addUnit(this.friendlyUnit2, 1);
            Cards.x = Cards.savedx;
            Cards.y = Cards.savedy;
            Cards.activated = true;
            Cards.startcd();

        }
        else if (this.laneHeight*2<=mouseY && mouseY <this.laneHeight*3) {
            console.log("Lane3");
            this.addUnit(this.friendlyUnit3, 2);
            Cards.x = Cards.savedx;
            Cards.y = Cards.savedy;
            Cards.activated = true;
            Cards.startcd();

        }
        else if (this.laneHeight*3<=mouseY ) {
            console.log("Cards");
            // Back to original position
            Cards.x = Cards.savedx;
            Cards.y = Cards.savedy;

        }
        else {
            console.log("None");
        }
    }
    else if (Cards.id ===1)
    {
        Cards.x = Cards.savedx;
        Cards.y = Cards.savedy;
    }
    else if(Cards.id !== 1)
    {
        if ( mouseY <this.laneHeight) {
            console.log("Lane1");
            Cards.useAbility(this.friendlyUnit1, this.enemyUnit1);
        }
        else if (this.laneHeight<=mouseY && mouseY <this.laneHeight*2) {
            console.log("Lane2");
            Cards.useAbility(this.friendlyUnit2, this.enemyUnit2);
        }
        else if (this.laneHeight*2<=mouseY && mouseY <this.laneHeight*3) {
            console.log("Lane3");
            Cards.useAbility(this.friendlyUnit3, this.enemyUnit3);
        }
        else if (this.laneHeight*3<=mouseY ) {
            console.log("Cards");
            // Back to original position
            Cards.x = Cards.savedx;
            Cards.y = Cards.savedy;
        }
        else {
            console.log("None");
        }
        
        if (mouseY < this.laneHeight*3) {
            for(i= Cards.num -1; i < this.tempCard.length; i++)
            {
               //game.physics.arcade.moveToXY(this.tempCard.children[i], this.tempCard.children[i].x -240, this.tempCard.children[i].y, 5, 100);
                this.tempCard.children[i].x -= 240;
                this.tempCard.children[i].num -= 1;
                this.tempCard.children[i].savedx -= 240;
                this.tempCard.children[i].lastx -= 240;
                //this.tempCard[i].num -= 1;
             
                //this.tempCard.children[i].shift();
            }
            this.tempCard.remove(Cards);

            Cards.kill();
        }

    }
    
    
};

gameplayState.prototype.fight = function(unit, enemy){
	//stop both sides
	
	if(Math.abs(enemy.x - unit.x) <= 120 && Math.abs(enemy.y - unit.y) <=10){
		var new_fight = false;
		if(!(unit.in_fight)){
			unit.go_fight = true;
			new_fight = true;
		}
		if(!(enemy.in_fight)){
			enemy.go_fight = true;
			new_fight = true;
		}
		//fight while both are alive
		//the new_fight is to make sure we only enter the while loop
		//once because this function is constantly called when soldiers collide
		if(unit.alive && enemy.alive && new_fight){
			console.log("enter fight");
			unit.attacking_enemy = enemy;
			enemy.attacking_enemy = unit;
		}
	}
	//enemy.damage(unit.atkdmg);
	//console.log("enemy hp is now " + enemy.health);
	//console.log("collide");
	//unit.health -= enemy.damage;
	//enemy.health -= unit.damage;
};

gameplayState.prototype.updateCards = function(tempCard){
   
    for(i = 0; i < tempCard.length; i++){
        if(tempCard.children[i].body.velocity.x < 0){
            tempCard.children[i].stop();
            //tempCard.children[i].x = tempCard.children[i].lastx;
            
        }

    }


};
gameplayState.prototype.msToTime = function(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (secs < 10) {
        return mins + ':0' + secs;
    }
    else {
        return mins + ':' + secs;
    }
};
/*
	Generate random int
*/
gameplayState.prototype.randomInt = function(){
  return Math.floor(Math.random() * Math.floor(3));
};
