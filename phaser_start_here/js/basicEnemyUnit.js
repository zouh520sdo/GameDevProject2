//assume we have units stored in groups
//and each lane has its own group of friendly units and enemy units
//lane is an int -- 1, 2 or 3

let basicEnemyUnit = function(group, lane_x, lane_y, lane_id){
	this.lane_x = lane_x;
	this.lane_y = lane_y;
	this.speed = 100;
	this.create();
	this.unit.lane_id = lane_id;
	console.log("enemy unit constructor:");
	console.log(group);
	group.add(this.unit);
};

basicEnemyUnit.prototype.create = function(){
	//assume picture has been loaded in gameplayState
	//go with murph for now
	console.log("creating basic unit");
	console.log(this);
	this.unit = game.add.sprite(this.lane_x, this.lane_y, "invader");
    // Create Animations 
    //this.unit.animations.add("spawn", [0,1,2,3,4,5,6,7,8], 10, false);
    this.unit.animations.add("idle", [0], 10, true);
    this.unit.animations.add("run", [1,2,3,4], 10, true);
    this.unit.animations.add("combat", [5,0,6,7], 10, true);
    this.unit.animations.add("death", [8,9,10], 10, false);
	this.unit.in_fight = false;
	this.unit.go_fight = false;
	this.unit.attacking_enemy = null;
    this.unit.atkspd = 500; //attack every 0.5 sec
	//make them weak for now
	this.unit.health = 200;
	this.unit.atkdmg = 50;
	game.physics.arcade.enable(this.unit);
	this.unit.body.velocity.x = 0;
    this.unit.speed = this.speed;
    this.unit.animations.play("idle")
	this.unit.in_lane = false;
	this.unit.alive = true;
	this.unit.in_shift = false;
	//some random number
	this.unit.prev_velo_x = -100;
	this.unit.prev_velo_y = -100;
    // Override update function
    this.unit.update = function(){
		//console.log("unit health: " + this.health);
            
			//going from (350, 315) to (1936, 45) @ 100
			//dx = 1486
			//dy = 270
		
		this.velo_x_mult = 1486.0/270.0;
		//start moving	
		if(this.animations.currentAnim.name === "idle"){
			this.body.velocity.x = -18 * (this.velo_x_mult) - 40;
			this.animations.play("run");
		}
           
		//turn towards the pole
        if(this.lane_id === 0 && !(this.in_lane) && !(this.in_shift)){
			if(this.body.x <= 548.133333333334){
				this.in_shift = true;
				this.body.velocity.y = 135;
				this.body.velocity.x = -18 * (this.velo_x_mult);
			}
        }
		else if(this.lane_id === 2 && !(this.in_lane) && !(this.in_shift)){
			if(this.body.x <= 548.133333333334){
				this.in_shift = true;
				this.body.velocity.y = -135;
				this.body.velocity.x = -18 * (this.velo_x_mult);
			}
		}
		//now at center lane
		//this section should also be triggered once
		if(this.body.y <= 320 && this.body.y >= 310 && this.lane_id !== 1 && !(this.in_lane)){
			this.body.velocity.y = 0;
			this.body.velocity.x = -18 * (this.velo_x_mult) - 40;
			this.in_lane = true;
		}
		
		if(this.animations.currentAnim.name === "combat"){
			if(this.animations.currentFrame.index === 7 && !(this.attacked)){
				this.attacked = true;
				console.log("attack");
				this.attacking_enemy.damage(this.atkdmg);
			}
			else if(this.animations.currentFrame.index !== 7){
				this.attacked = false;
			}
		}
		
		if(this.in_fight){
			if(this.attacking_enemy.alive === false){
				
				this.animations.play("run");
				if(this.body.y <= 320 && this.body.y >= 310){
					this.body.velocity.y = 0;
				}
				else{
					this.body.velocity.y = this.prev_velo_y;
				}
				this.body.velocity.x = this.prev_velo_x;
				
				this.in_fight = false;
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
				
				this.body.velocity.x = this.prev_velo_x;
				this.body.velocity.y = this.prev_velo_y;
				this.in_fight = false;
			}
		}
    };
	//override damage
	this.unit.damage = function(amount){
		if(this.alive){
			this.health -= amount;
			if(this.health <= 0){
				this.animations.play("death", 10, false, true);
			}
		}
	}
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
};