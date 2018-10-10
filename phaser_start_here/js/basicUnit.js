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
    
	this.unit.health = 500;
	this.unit.damage = 50;
	game.physics.arcade.enable(this.unit);
	this.unit.body.velocity.x = 0;
    this.unit.speed = this.speed;
    
    // Override update function
    this.unit.update = function(){
        if(this.animations.currentAnim.name === "spawn" && this.animations.currentAnim.isFinished) {
			//going from (350, 315) to (1936, 45) @ 100
			//dx = 1486
			//dy = 270
			this.velo_x_mult = 1486.0/270.0;
			if(this.lane_id === 0){
				
				//just make velo_y 18
				
			
				this.body.velocity.y = -18;
				
				this.body.velocity.x = 18 * (this.velo_x_mult);
			}
			else if(this.lane_id === 1){
				this.body.velocity.x = 18 * (this.velo_x_mult);
			}
			//going from (350, 315) to (1936, 585)
			//dx = 1486
			//dy = 270
			else if(this.lane_id === 2){
				this.velo_x_mult = 1486.0/270.0;
				//just make velo_y 18
				
				
				this.body.velocity.y = 18;
				
				this.body.velocity.x = 18 * (this.velo_x_mult);
			}
            
            this.animations.play("run");
        }
        if(this.lane_id === 0){
			if(this.body.y <= 45){
				this.body.velocity.y = 0;
			}
        }
		else if(this.lane_id === 2){
			if(this.body.y >= 585){
				this.body.velocity.y = 0;
			}
		}
        if(this.body.x > game.world.width || this.health <= 0){
            this.kill();
            this.parent.remove(this);
            console.log(this.name + " is killed");
        }
    };
    
    // Play run animation
    this.unit.animations.play("spawn");
};
