//assume we have units stored in groups
//and each lane has its own group of friendly units and enemy units
//lane is an int -- 1, 2 or 3

let basicUnit = function(group, lane_x, lane_y){
	this.lane_x = lane_x;
	this.lane_y = lane_y;
}

basicUnit.prototype.create = function(){
	//assume picture has been loaded in gameplayState
	
	this.unit = game.add.sprite(this.lane_x, this.lane_y, "basicUnit");
	
	this.unit.health = 500;
	this.unit.damage = 50;
	
	game.physics.arcade.enable(this.unit);
	group.add(this.unit);
}

basicUnit.prototype.update = function(){
	if(this.health === 0){
		this.kill;
	}
	//make unit move along its own lane
	
}
