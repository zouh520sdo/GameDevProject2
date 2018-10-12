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
	this.unit = game.add.sprite(this.lane_x, this.lane_y, "invader");
    // Create Animations 
    //this.unit.animations.add("spawn", [0,1,2,3,4,5,6,7,8], 10, false);
    this.unit.animations.add("idle", [0], 10, true);
    this.unit.animations.add("run", [1,2,3,4], 10, true);
    this.unit.animations.add("combat", [5,0,6,7], 10, true);
    this.unit.animations.add("death", [8,9,10], 10, false);
    this.unit.atkspd = 500; //attack every 0.5 sec
	//make them weak for now
	this.unit.health = 200;
	this.unit.damage = 50;
	game.physics.arcade.enable(this.unit);
	this.unit.body.velocity.x = 0;
    this.unit.speed = this.speed;
    this.unit.animations.play("idle");
	this.unit.fighting = false;
    // Override update function
    this.unit.update = function(){
            //if(this.animations.currentAnim.name === "spawn" && this.animations.currentAnim.isFinished) {
			//going from (350, 315) to (1936, 45) @ 100
			//dx = 1486
			//dy = 270
		this.velo_x_mult = 1486.0/270.0;
		//start moving	
		if(this.animations.currentAnim.name === "idle"){
			this.body.velocity.x = -18 * (this.velo_x_mult) - 40;
			this.animations.play("run");
		}
           
			//}
		//turn towards the pole
        if(this.lane_id === 0){
			if(this.body.x <= 548.133333333334){
				this.body.velocity.y = 135;
				this.body.velocity.x = -18 * (this.velo_x_mult);
			}
        }
		else if(this.lane_id === 2){
			if(this.body.x <= 548.133333333334){
				this.body.velocity.y = -135;
				this.body.velocity.x = -18 * (this.velo_x_mult);
			}
		}
		//now at center lane
		if(this.body.y === 315 && this.lane_id !== 1){
			this.body.velocity.y = 0;
			this.body.velocity.x = -18 * (this.velo_x_mult) - 40;
		}
        if(this.health <= 0){
			console.log(game.world.width);
            this.kill();
            this.parent.remove(this);
            console.log(this.name + " is killed");
        }
    };
    
    // Play run animation
    this.unit.animations.play("spawn");
};