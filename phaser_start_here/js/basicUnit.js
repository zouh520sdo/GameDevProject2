//assume we have units stored in groups
//and each lane has its own group of friendly units and enemy units
//lane is an int -- 1, 2 or 3

let basicUnit = function(group, lane_x, lane_y, lane_id){
	this.lane_x = lane_x;
	this.lane_y = lane_y;
	this.speed = 100;
	this.create();
	this.unit.lane_id = lane_id;
	group.add(this.unit);
};

basicUnit.prototype.create = function(){
	//assume picture has been loaded in gameplayState
	//go with murph for now
	console.log("creating basic unit");
	this.unit = game.add.sprite(this.lane_x, this.lane_y, "defender");
    // Create Animations
    this.unit.animations.add("spawn", [0,1,2,3,4,5,6,7,8], 10, false);
    this.unit.animations.add("idle", [8], 10, true);
    this.unit.animations.add("run", [9,10,11,12], 10, true);
    this.unit.animations.add("combat", [13,8,14,15], 10, true);
    this.unit.animations.add("death", [16,17,18], 10, false);
	this.unit.in_fight = false;
	this.unit.go_fight = false;
	this.unit.attacking_enemy = null;
    //this.unit.atkspd = 500; //attack every 0.5 sec
	this.unit.health = 500;
	this.unit.atkdmg = 50;
	game.physics.arcade.enable(this.unit);
	this.unit.body.velocity.x = 0;
	this.unit.body.velocity.y = 0;
    this.unit.speed = this.speed;
    this.unit.in_lane = false;
	//some random number
	this.unit.prev_velo_x = -100;
	this.unit.prev_velo_y = -100;
	this.unit.alive = true;
	this.unit.attacked = false;
	this.unit.spawn_interrupted = true;
	this.unit.stopped_at_border = false;
    // Override update function
    this.unit.update = function(){
		this.velo_x_mult = 1486.0/325.0;
		//start moving when finished spawning
        if(this.animations.currentAnim.name === "spawn" && this.animations.currentAnim.isFinished) {
			//this.spawn_interrupted = false;
			//going from (350, 397.5) to (1936, 72.5) @ 100
			//dx = 1486
			//dy = 325
			
			if(this.lane_id === 0){
				this.body.velocity.y = -135;
				this.body.velocity.x = 18 * (this.velo_x_mult);
			}
			else if(this.lane_id === 1){
				this.body.velocity.x = 18 * (this.velo_x_mult) + 40;
			}
			//going from (350, 397.5) to (1936, 722.5)
			//dx = 1486
			//dy = 325
			else if(this.lane_id === 2){
				this.body.velocity.y = 135;
				this.body.velocity.x = 18 * (this.velo_x_mult);
			}
            this.animations.play("run");
        }
		//done shifting into their own lanes
        if(this.lane_id === 0){
			if(this.body.y <= 72.5){
				if(this.body.velocity.y !== 0){
					console.log(this.body.x);
					this.body.velocity.y = 0;
					console.log(this.in_lane);
				}
				
				//this if section should only trigger once
				if(this.body.x < 1936 && !(this.in_lane)){
					console.log("in lane now");
					this.body.velocity.x = 18 * (this.velo_x_mult) + 40;
					this.in_lane = true;
				}
				//stop when the unit reaches a certain points
				else if (this.body.x >= 1936 && !(this.stopped_on_border)){
					this.stopped_on_border = true;
					this.body.velocity.x = 0;
					this.animations.play("idle");
				}
			}
        }
		else if(this.lane_id === 2){
			if(this.body.y >= 722.5){
				if(this.body.velocity.y !== 0){
					console.log(this.body.x);
					this.body.velocity.y = 0;
				}
				//this if section should only trigger once
				if(this.body.x < 1936 && !(this.in_lane)){
					console.log("in lane now");
					this.body.velocity.x = 18 * (this.velo_x_mult) + 40;
					this.in_lane = true;
				}
				//stop when the unit reaches a certain points
				else if(this.body.x >= 1936 && !(this.stopped_on_border)){
					this.stopped_on_border = true;
					this.body.velocity.x = 0;
					this.animations.play("idle");
				}
			}
		}
		else{
			if(this.body.x >= 1936 && !(this.stopped_on_border)){
				this.stopped_on_border = true;
				this.body.velocity.x = 0;
				this.animations.play("idle");
			}
		}
		
		//fighting
		if(this.go_fight){
			this.enter_fight();
			this.go_fight = false;
		}
		
		
		
		//killed
        if(this.health <= 0 && (this.animations.currentAnim.name === "death") && this.animations.currentAnim.isFinished){
			this.alive = false;
            this.kill();
            this.parent.remove(this);
            console.log(this.name + " is killed");
        }
		
		//attack dayo
		if(this.animations.currentAnim.name === "combat"){
			if(this.animations.currentFrame.index === 15 && !(this.attacked)){
				this.attacked = true;
				console.log("attack");
				this.attacking_enemy.damage(this.atkdmg);
			}
			else if(this.animations.currentFrame.index !== 15){
				this.attacked = false;
			}
		}
		//keep on moving if the current enemy is dead
		//or keep idling is at border
		if(this.in_fight){
			if(this.attacking_enemy.alive === false){
				if(this.body.x >= 1936){
					this.animations.play("idle");
				}
				else{
					this.animations.play("run");
				}
				if(this.body.x < 1936 && this.body.x === 350 && this.body.y === 397.5){
					if(this.lane_id === 0){
						console.log("gg1");
						this.body.velocity.y = -135;
						this.body.velocity.x = 18 * (this.velo_x_mult);
					}
					else if(this.lane_id === 1){
						console.log("gg2");
						this.body.velocity.x = 18 * (this.velo_x_mult) + 40;
					}
					else if(this.lane_id === 2){
						console.log("gg3");
						this.body.velocity.y = 135;
						this.body.velocity.x = 18 * (this.velo_x_mult);
					}
				}
				else{
					this.body.velocity.x = this.prev_velo_x;
					this.body.velocity.y = this.prev_velo_y;
				}
				this.in_fight = false;
			}
		}
    };
	//override damage
	this.unit.damage = function(amount){
		if(this.alive){
			this.health -= amount;
			console.log("ally health: " + this.health);
			if(this.health <= 0){
				this.animations.play("death", 10, false, true);
			}
		}
	}
	/*
	this.unit.attack = function(enemy){
		enemy.damage(this.atkdmg);
	}
	*/
	//stop when in fight
    this.unit.enter_fight = function(){
		this.animations.play("combat");
    	this.in_fight = true;
		this.prev_velo_x = this.body.velocity.x;
		this.prev_velo_y = this.body.velocity.y;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
    }
    // Play run animation
    this.unit.animations.play("spawn");
    
    //reset attk dmg
    this.unit.resetattk = function()
    {
        console.log("atk reset");
        this.atkdmg -= 25;
    }
    
      this.unit.helperattk = function()
        {
            console.log("attk timer");
            this.cooldown = game.time.create(this, true);
            this.cooldown.add(10000, this.resetattk, this);
             this.cooldown.start();

        }
  this.unit.resetspeed = function()
    {
        console.log("speed reset");
        this.body.velocity.x = Math.max(0, this.body.velocity.x-50);
    }
    
      this.unit.helperspeed = function()
        {
            console.log("attk timer");
            this.cooldown = game.time.create(this, true);
            this.cooldown.add(10000, this.resetspeed, this);
             this.cooldown.start();
           
        }
      
      this.unit.resethp = function()
    {
        console.log("hp reset");
        let ratio = this.health / this.maxHealth;
        this.maxHealth -= 200;
        this.health = this.maxHealth * ratio;
    }
    
      this.unit.helperhp = function()
        {
            console.log("hp timer");
            this.cooldown = game.time.create(this, true);
            this.cooldown.add(10000, this.resethp, this);
             this.cooldown.start();
           
        }
};




