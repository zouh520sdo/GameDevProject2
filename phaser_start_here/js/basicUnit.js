//assume we have units stored in groups
//and each lane has its own group of friendly units and enemy units
//lane is an int -- 1, 2 or 3

let basicUnit = function(group, lane_x, lane_y){
	this.lane_x = lane_x;
	this.lane_y = lane_y;
	this.speed = 100;
	this.create();
	group.add(this.unit);
}

basicUnit.prototype.create = function(){
	//assume picture has been loaded in gameplayState
	//go with murph for now
	console.log("creating basic unit");
	this.unit = game.add.sprite(this.lane_x, this.lane_y, "murph");
	this.unit.health = 500;
	this.unit.damage = 50;
	game.physics.arcade.enable(this.unit);
	this.unit.body.velocity.x = this.speed;
	
	//super.friendlyUnit1.add(this.unit);
}
