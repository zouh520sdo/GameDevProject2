let gameplayState = function(){
    this.score = 0;
    this.laneHeight = 0;
    this.selectedLaneID = 3; //[0,3] Card area for default
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
    
    // Create map
    this.map = game.add.sprite(0,0,"map");
    this.deck = game.add.sprite(0, game.world.height - this.cardAreaHeight, "deck");
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
    
    //arrow group
    game.arrow = game.add.group();
    game.arrow.enableBody = true;
    
    //wall group
    game.wall = game.add.group();
    game.wall.enableBody = true;
    // Set up asherah pole
    this.asherahPole = new AsherahPole(game, 120, this.laneHeight*2 - 45, this);
    game.physics.arcade.enable(this.asherahPole);
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
        let rantemp = this.game.rnd.integerInRange(2,9);
      
        // random card category
        let prob = Math.random();
        if (prob < 0.6) {
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
        let cardtemp = new Cards(this.game, i, rantemp, this);
        cardtemp.inputEnabled = true;
        cardtemp.enableBody = true;
        cardtemp.input.enableDrag();
        cardtemp.events.onDragStart.add(this.dragCardStart,this);
        cardtemp.events.onDragUpdate.add(this.dragCardUpdate,this);
        cardtemp.events.onDragStop.add(this.dragCardStop,this);
      
        
        this.tempCard.add(cardtemp);
        
    }
    
    // Spawn wall for testing
//    this.wall =  new Wall(game, 1800, this.laneHeight - 75, this);
//    this.wall =  new Wall(game, 1800, this.laneHeight*2 -75, this);
//    this.wall =  new Wall(game, 1800, this.laneHeight*3 -75, this);
//    this.wall =  new Wall(game, 1200, this.laneHeight - 75, this);
//    this.wall =  new Wall(game, 1200, this.laneHeight*2 -75, this);
//    this.wall =  new Wall(game, 1200, this.laneHeight*3 -75, this);
    
}; // End of create

gameplayState.prototype.update = function(){
    game.physics.arcade.overlap(this.friendlyUnit1, this.enemyUnit, this.fight ,null, this);
	game.physics.arcade.overlap(this.friendlyUnit2, this.enemyUnit, this.fight ,null, this);
    game.physics.arcade.overlap(this.friendlyUnit3, this.enemyUnit, this.fight ,null, this); 
    game.physics.arcade.overlap(this.friendlyUnit1, game.arrow, this.deletearrow ,null, this);
    game.physics.arcade.overlap(this.friendlyUnit2, game.arrow, this.deletearrow ,null, this);
    game.physics.arcade.overlap(this.friendlyUnit3, game.arrow, this.deletearrow ,null, this);
    game.physics.arcade.overlap(game.wall, game.arrow, this.blockarrow ,null, this);
	game.physics.arcade.overlap(this.enemyUnit, this.asherahPole, this.attackPole, null, this);
    game.physics.arcade.overlap(game.arrow, this.asherahPole, this.arrowPole, null, this);

    
    this.scoreText.text = "Time Left: " + this.msToTime(this.gameplayTimer.duration);
    if(!(this.asherahPole.alive)){
		console.log("oof");
    	game.state.start("GGWP");
    }
    for(let i = 0; i < game.arrow.length; i++)
        {
            if(game.arrow.children[i].body.x <-400)
                {
                    console.log("arrow killed");
                    game.arrow.children[i].destroy();
                }
        }

};
gameplayState.prototype.blockarrow = function(wall,arrow)
{
    arrow.destroy();
}
gameplayState.prototype.arrowPole = function(pole,arrow)
{
    if(Math.abs(pole.x - arrow.x) <= 60 && Math.abs(pole.y - arrow.y) >= 10)
       {
           pole.damage(1);
           arrow.kill();
       }
    
}
gameplayState.prototype.deletearrow = function(unit,arrow)
{
    if(Math.abs(unit.x - arrow.x) <= 60 && Math.abs(unit.y - arrow.y) >= 10)
       {
           unit.damage(2);
           arrow.kill();
       }
}
gameplayState.prototype.attackPole = function(pole, enemy){
    if(enemy.class_id === 1)
        {
	if(!(enemy.in_fight) && !(enemy.attacking_pole)){
		console.log("start attacking pole");
		enemy.attacking_enemy = pole;
		enemy.go_atk_pole = true;
    }
        }
    else{
        console.log("ENEMYPOS" + enemy.body.x);
        if(enemy.body.x <= -150)
            {
                if(!(enemy.in_fight) && !(enemy.attacking_pole)){
		console.log("start attacking pole");
		enemy.attacking_enemy = pole;
		enemy.go_atk_pole = true;
    }
                
                
            }
    }
    /*
    else{
        if(enemy.body.x <= -150)
        {
        if(!(enemy.in_fight) && !(enemy.attacking_pole)){
		      console.log("start attacking pole");
		      enemy.attacking_enemy = pole;
		      enemy.go_atk_pole = true;
        }
        }
    }
    */
}
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
		new basicUnit(this.friendlyUnit1 , 350, 397.5 - 60, mult);
	}
	else if(mult === 1){
		new basicUnit(this.friendlyUnit2 , 350, 397.5 - 60, mult);
	}
	else if(mult === 2){
		new basicUnit(this.friendlyUnit3 , 350, 397.5 - 60, mult);
	}
	
};
/*
	similar to addUnit
*/

gameplayState.prototype.addEnemy = function(mult) {
	//console.log("time elapsed in phase: " + this.enemyTimer.elapsed);
	console.log("enemy generated on lane" + (mult+1));
    let prob = Math.random();
    let unitid = 0;
    if(prob < 0){
        unitid = 1;
    }
    else{
        unitid = 2;
    }
	if(mult === 0){
       
		new basicEnemyUnit(this.enemyUnit, 2500, 72.5 - 45, mult, this.asherahPole, unitid);
	}
	else if(mult === 1){
         
		new basicEnemyUnit(this.enemyUnit, 2500, 397.5 - 60, mult, this.asherahPole, unitid);
	}
	else if(mult === 2){
        
		new basicEnemyUnit(this.enemyUnit, 2500, 722.5 - 55, mult, this.asherahPole, unitid);
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

// Card draging effect
gameplayState.prototype.dragCardStart = function(Cards, pointer, dragX, dragY) {
    Cards.alpha = 0.5;
};

gameplayState.prototype.dragCardUpdate = function(Cards, pointer, dragX, dragY, snapPoint) {
    let mouseY = pointer.y;
    let prevLaneID = this.selectedLaneID;
    if (mouseY < this.laneHeight) {
        this.selectedLaneID = 0;
    }
    else if (mouseY < this.laneHeight*2) {
        this.selectedLaneID = 1;
    }
    else if (mouseY < this.laneHeight*3) {
        this.selectedLaneID = 2;
    }
    else {
        this.selectedLaneID = 3;
    }
    console.log(this.selectedLaneID);
    
    // If selected lane changed
    if (prevLaneID !== this.selectedLaneID) {
        // Deselct previous units
        if (prevLaneID === 0) {
            Cards.deSelectingGroup(this.friendlyUnit1, 0);
        }
        else if (prevLaneID === 1) {
            Cards.deSelectingGroup(this.friendlyUnit2, 1);
        }
        else if (prevLaneID === 2) {
            Cards.deSelectingGroup(this.friendlyUnit3, 2);
        }
        
        // Select current units
        if (this.selectedLaneID === 0) {
            Cards.selectingGroup(this.friendlyUnit1, 0);
        }
        else if (this.selectedLaneID === 1) {
            Cards.selectingGroup(this.friendlyUnit2, 1);
        }
        else if (this.selectedLaneID === 2) {
            Cards.selectingGroup(this.friendlyUnit3, 2);
        }
    }
};

gameplayState.prototype.dragCardStop = function(Cards, pointer) {
    let mouseY = pointer.y;
    
    // May need to invoke some functions to take effect of card or take it back to card area
    Cards.alpha = 1;
    
    // Deselect group
    if (this.selectedLaneID === 0) {
        Cards.deSelectingGroup(this.friendlyUnit1, 0);
    }
    else if (this.selectedLaneID === 1) {
        Cards.deSelectingGroup(this.friendlyUnit2, 1);
    }
    else if (this.selectedLaneID === 2) {
        Cards.deSelectingGroup(this.friendlyUnit3, 2);
    }
    // Reset selected lane
    this.selectedLaneID = 3;
    
    // Deselect cards when they are placed in lanes
    if (mouseY < this.laneHeight*3) {
        Cards.deSelect();
    }
    
    //ONLY for card id of 1, the permanent card
    if(Cards.id === 1 && Cards.activated === false)
    {
        if ( mouseY <this.laneHeight) {
            console.log("Lane1");
            this.addUnit(0);
            Cards.x = Cards.savedx;
            Cards.y = Cards.savedy;
            Cards.activated = true;
            Cards.startcd();
        }
        else if (this.laneHeight<=mouseY && mouseY <this.laneHeight*2) {
            console.log("Lane2");
            this.addUnit(1);
            Cards.x = Cards.savedx;
            Cards.y = Cards.savedy;
            Cards.activated = true;
            Cards.startcd();

        }
        else if (this.laneHeight*2<=mouseY && mouseY <this.laneHeight*3) {
            console.log("Lane3");
            this.addUnit(2);
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
            Cards.useAbility(this.friendlyUnit1, 0, pointer);
        }
        else if (this.laneHeight<=mouseY && mouseY <this.laneHeight*2) {
            console.log("Lane2");
            Cards.useAbility(this.friendlyUnit2, 1, pointer);
        }
        else if (this.laneHeight*2<=mouseY && mouseY <this.laneHeight*3) {
            console.log("Lane3");
            Cards.useAbility(this.friendlyUnit3, 2, pointer);
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
                this.tempCard.children[i].x -= 300;
                this.tempCard.children[i].num -= 1;
                this.tempCard.children[i].savedx -= 300;
                this.tempCard.children[i].lastx -= 300;
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
    console.log(Math.abs(enemy.x - unit.x));
	if(Math.abs(enemy.x - unit.x) <= 120 && Math.abs(enemy.y - unit.y) <=10 && enemy.class_id === 1)
       {
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
    
        if(Math.abs(enemy.x - unit.x) <= 1500 && Math.abs(enemy.y - unit.y) <=10 && enemy.class_id === 2 && enemy.x <= 1936 )
        {
            var new_fight = false;
		if(!(enemy.in_fight)){
			enemy.go_fight = true;
			new_fight = true;
		}
		//fight while both are alive
		//the new_fight is to make sure we only enter the while loop
		//once because this function is constantly called when soldiers collide
		if(unit.alive && enemy.alive && new_fight){
            enemy.attacking_enemy = unit;
        }  
        }
     if(Math.abs(enemy.x - unit.x) <= 120 && Math.abs(enemy.y - unit.y) <=10 && enemy.class_id === 2)
         {
             var new_fight = false;
		if(!(unit.in_fight)){
			unit.go_fight = true;
			new_fight = true;
		}
             if(unit.alive && enemy.alive && new_fight){
			unit.attacking_enemy = enemy;
			
        }  
         }
        
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
