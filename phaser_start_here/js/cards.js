
class Cards extends Phaser.Sprite{
    
    //constructor
    constructor(game, num, id, state)
    {
        super(game,num * 240, state.laneHeight * 3, "card" + id );
        this.gameState = state;
        this.laneHeight = this.gameState.laneHeight;
        this.tempCards = this.gameState.tempCard;
        this.permCards = this.gameState.permcard;
        this.savedx = num * 240;
        this.savedy = this.y;
        this.lastx = (num* 240) - 240;
        this.exist = false;
        this.activated = false;
        this.id = id;
        this.num = num;
        this.game.physics.enable(this);
        
        // For cards have cooldown
        if (this.id == 1) {
            this.cdMask = game.add.sprite(0,0,"card1");
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
                unitsGroup.children[i].damage += 25;
                console.log(unitsGroup.children[i].damage);
                
                unitsGroup.children[i].helperattk();
            }   
        };
      
        Cards.prototype.raisespeed = function(unitsGroup)
        {
            for(let i = 0; i < unitsGroup.length; i++)
            {
                unitsGroup.children[i].body.velocity.x += 50;
                console.log(unitsGroup.children[i].body.velocity.x);
                
                unitsGroup.children[i].helperspeed();
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
      


     
        // Use ability based on ID
        Cards.prototype.useAbility = function(unitsGroup, enemiesGroup) {
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
                    unitsGroup.callAll("heal", null, 10000);
                    break;
                case 6:
                    console.log("HEAL ALL");
                    this.gameState.friendlyUnit1.callAll("heal", null, 250);
                    this.gameState.friendlyUnit2.callAll("heal", null, 250);
                    this.gameState.friendlyUnit3.callAll("heal", null, 250);
                    break;
                case 7:
                    console.log("KILL LANE");
                    enemiesGroup.callAll("kill", null);
                    enemiesGroup.removeAll(true);
                    break;
                case 8:
                    console.log("DAMAGE ALL"); this.gameState.enemyUnit1.callAll("damage", null, 250);
                    this.gameState.enemyUnit2.callAll("damage", null, 250);
                    this.gameState.enemyUnit3.callAll("damage", null, 250);
                    break;
                case 9:
                    consolo.log("FORTIFICATION");
                    break;
                default:
                    
            }
        };
    
    }

    //effect based on id of the card
 
};

Cards.category = {
    bronze:[1],
    silver:[2,3,4],
    gold:[5,6,7,8,9]
};

