//assume we have units stored in groups
//and each lane has its own group of friendly units and enemy units
//lane is an int -- 1, 2 or 3

let basicUnit = function(group, lane_x, lane_y){
	this.lane_x = lane_x;
	this.lane_y = lane_y;
	this.speed = 100;
	this.create();
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
    
    this.unit.maxHealth = 500;
	this.unit.health = 300;
	this.unit.damage = 50;
	game.physics.arcade.enable(this.unit);
	this.unit.body.velocity.x = 0;
    this.unit.speed = this.speed;
    
    // Override update function
    this.unit.update = function(){
        if(this.animations.currentAnim.name === "spawn" && this.animations.currentAnim.isFinished) {
            this.body.velocity.x = this.speed;
            this.animations.play("run");
        }
        
        if(this.body.x > game.world.width || this.health <= 0){
            this.kill();
            this.parent.remove(this);
            console.log(this.name + " is killed");
        }
    };
    
    // Play run animation
    this.unit.animations.play("spawn");
    
    //reset attk dmg
    this.unit.resetattk = function()
    {
        console.log("atk reset");
        this.damage -= 25;
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
        this.body.velocity.x -= 50;
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
        this.maxHealth -= 200;
    }
    
      this.unit.helperhp = function()
        {
            console.log("hp timer");
            this.cooldown = game.time.create(this, true);
            this.cooldown.add(10000, this.resethp, this);
             this.cooldown.start();
           
        }
};




