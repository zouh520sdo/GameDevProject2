
class Cards extends Phaser.Sprite{
    
    //constructor
    constructor(game, num, id, state)
    {
        super(game,num * 300, state.laneHeight * 3, "card1" );
        this.gameState = state;
        this.laneHeight = this.gameState.laneHeight;
        this.tempCards = this.gameState.tempCard;
        this.permCards = this.gameState.permcard;
        this.savedx = num * 300;
        this.savedy = this.y;
        this.lastx = (num* 300) - 300;
        this.exist = false;
        this.activated = false;
        this.id = id;
        this.num = num;
        this.game.physics.enable(this);
        
        switch (id) {
                case 1:
                    console.log("Bronze_Spawn");
                    this.loadTexture("Bronze_Spawn");
                    break;
                case 2:
                     console.log("Silver_DamageBuff");
                     this.loadTexture("Silver_DamageBuff");
                    break;
                case 3:
                     console.log("Silver_HPBuff");
                     this.loadTexture("Silver_HPBuff");
                    break;
                case 4:
                     console.log("Silver_SpeedBuff");
                     this.loadTexture("Silver_SpeedBuff");
                    break;
                case 5:
                     console.log("Gold_HealLane");
                    this.loadTexture("Gold_HealLane");
                    break;
                case 6:
                     console.log("Diamond_HealAll");
                   this.loadTexture("Diamond_HealAll");
                    break;
                case 7:
                     console.log("Gold_KillLane");
                     this.loadTexture("Gold_KillLane");
                    break;
                case 8:
                     console.log("Diamond_DamageAll");
                     this.loadTexture("Diamond_DamageAll");
                    break;
                case 9:
                     console.log("Gold_BuildWall");
                     this.loadTexture("Gold_BuildWall");
                    break;
                default:
                    
            }
        
        
        
        // For cards have cooldown
        if (this.id == 1) {
            this.cdMask = game.add.sprite(0,0,"Bronze_Spawn");
            this.cdMask.tint = 0x000000;
            this.cdMask.alpha = 0.65;
            this.addChild(this.cdMask);
            this.cdMask.setScaleMinMax(0.000001, 1);
            this.cdMask.scale.set(1, 0);
        }
        
        // For selection
        this.isSelected = false;
        this.selectedY = game.world.height - this.height;
        this.deSelectedY = this.laneHeight * 3;
        Cards.prototype.select = function() {
            this.isSelected = true;
            this.y = this.selectedY;
            this.savedy = this.y;
        };
        
        Cards.prototype.deSelect = function() {
            this.isSelected = false;
            this.y = this.deSelectedY;
            this.savedy = this.y;
        };
        
        Cards.prototype.onTapping = function () {
            if (this.isSelected) {
                this.deSelect();
            }
            else {
                // Deselect all other cards
                this.tempCards.callAll("deSelect");
                this.permCards.callAll("deSelect");
                this.select();
            }
        };
        this.inputEnabled = true;
        this.events.onInputDown.add(this.onTapping, this);
       
       Cards.prototype.shift = function()
       {
           this.body.velocity.x = -1500;
           this.num -= 1;
           this.savedx -= 240;
            this.lastx -= 240;
               this.x = this.savedx;
               this.y = this.savedy;  


       };

        Cards.prototype.startcd = function()
        {
            this.cooldown = game.time.create(this, true);
            this.cooldown.add(8000, this.switch, this);
            this.cooldown.start();
        };
        
        Cards.prototype.update = function() {
            if (this.cooldown !== undefined && this.cooldown.running && this.cdMask !== undefined) {
                this.cdMask.scale.set(1, this.cooldown.duration / 8000);
            }
        };
        
        Cards.prototype.switch = function()
        {
            this.activated = false;
            this.cooldown.destroy();
            if (this.cdMask !== undefined) {
                this.cdMask.scale.set(1,0);
            }
        };
        
       Cards.prototype.stop = function()
       {
           if(this.x <= this.lastx)
           {
               this.body.velocity.x = 0;
            
               this.savedx -= 240;
               this.lastx -= 240;
               this.x = this.savedx;
               this.y = this.savedy;  
              
               
           }
           
       };
        
        //Raises the attack of unitsGroup, calls timer for buff duration
        Cards.prototype.raiseattk = function(unitsGroup)
        {
            for(let i = 0; i < unitsGroup.length; i++)
            {
                unitsGroup.children[i].atkdmg += 25;
                console.log(unitsGroup.children[i].atkdmg);
                
                unitsGroup.children[i].helperattk();
            }   
        };
      
        Cards.prototype.raisespeed = function(unitsGroup)
        {
            for(let i = 0; i < unitsGroup.length; i++)
            {
                if (!unitsGroup.children[i].stopped_on_border) {
					/*
                    if (unitsGroup.children[i].in_fight || unitsGroup.children[i].is_Stucked) {
                        unitsGroup.children[i].prev_velo_x += 50;
                    }
                    else {
                        unitsGroup.children[i].body.velocity.x += 50;
                    }
					
					*/
					unitsGroup.children[i].extra_spd += 50;
                    console.log(unitsGroup.children[i].body.velocity.x);

                    unitsGroup.children[i].helperspeed();
                }
            }   
        };
      
      Cards.prototype.raisehp = function(unitsGroup)
        {
            for(let i = 0; i < unitsGroup.length; i++)
            {
                let ratio = unitsGroup.children[i].health / unitsGroup.children[i].maxHealth;
                unitsGroup.children[i].maxHealth += 200;
                unitsGroup.children[i].health = unitsGroup.children[i].maxHealth * ratio;
                console.log("Max health " + unitsGroup.children[i].maxHealth);
                console.log("Current health " + unitsGroup.children[i].health);
                
                unitsGroup.children[i].helperhp();
            }   
        };
     
        Cards.prototype.deSelectingGroup = function(unitsGroup, enemiesLaneID) {
            switch (this.id) {
                case 2:
                    // Raises attk of the units
                    unitsGroup.callAll("stopSelecting", null);
                    break;
                case 3:
                    unitsGroup.callAll("stopSelecting", null);
                    break;
                case 4:
                    unitsGroup.callAll("stopSelecting", null);
                    break;
                case 5:
                    unitsGroup.callAll("stopSelecting", null);
                    break;
                case 6:
                    this.gameState.friendlyUnit1.callAll("stopSelecting", null);
                    this.gameState.friendlyUnit2.callAll("stopSelecting", null);
                    this.gameState.friendlyUnit3.callAll("stopSelecting", null);
                    break;
                case 7:
                    this.gameState.enemyUnit.callAll("stopSelectingOnLane", null, enemiesLaneID);
                    break;
                case 8:
                    this.gameState.enemyUnit.callAll("stopSelecting", null);
                    break;
                case 9:
                    console.log("FORTIFICATION");
                    break;
                default:
                    
            }
        };
        
        Cards.prototype.selectingGroup = function(unitsGroup, enemiesLaneID) {
            switch (this.id) {
                case 2:
                    // Raises attk of the units
                    unitsGroup.callAll("startSelecting", null);
                    break;
                case 3:
                    unitsGroup.callAll("startSelecting", null);
                    break;
                case 4:
                    unitsGroup.callAll("startSelecting", null);
                    break;
                case 5:
                    unitsGroup.callAll("startSelecting", null);
                    break;
                case 6:
                    this.gameState.friendlyUnit1.callAll("startSelecting", null);
                    this.gameState.friendlyUnit2.callAll("startSelecting", null);
                    this.gameState.friendlyUnit3.callAll("startSelecting", null);
                    break;
                case 7:
                    this.gameState.enemyUnit.callAll("startSelectingOnLane", null, enemiesLaneID);
                    break;
                case 8:
                    this.gameState.enemyUnit.callAll("startSelecting", null);
                    break;
                case 9:
                    console.log("FORTIFICATION");
                    break;
                default:
                    
            }
        };
     
        // Use ability based on ID
        Cards.prototype.useAbility = function(unitsGroup, enemiesLaneID, pointer) {
            switch (this.id) {
                case 2:
                    console.log("ATTK");
                    // Raises attk of the units
                    this.raiseattk(unitsGroup);
                    break;
                case 3:
                     console.log("HP");
                    this.raisehp(unitsGroup);
                    break;
                case 4:
                    console.log("SPEED");
                    this.raisespeed(unitsGroup);
                    break;
                case 5:
                    console.log("HEAL LANE");
                    unitsGroup.callAll("healAnim", null, 10000);
                    break;
                case 6:
                    console.log("HEAL ALL");
                    this.gameState.friendlyUnit1.callAll("healAnim", null, 250);
                    this.gameState.friendlyUnit2.callAll("healAnim", null, 250);
                    this.gameState.friendlyUnit3.callAll("healAnim", null, 250);
                    break;
                case 7:
                    this.gameState.enemyUnit.callAll("killOnLane", null, enemiesLaneID);
                    break;
                case 8:
                    this.gameState.enemyUnit.callAll("damage", null, 100);
                    break;
                case 9:
                    console.log("FORTIFICATION");
                    new Wall(game, Math.max(800, pointer.x), this.gameState.laneHeight*(enemiesLaneID+1)-75, this.gameState);
                    break;
                default:
                    
            }
        };
    
    }


};

Cards.category = {
    bronze:[1],
    silver:[2,3,4],
    gold:[5,7,9],
    diamond:[6,8]
};

 
