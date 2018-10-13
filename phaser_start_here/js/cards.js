
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
        
        Cards.prototype.switch = function()
        {
            
            this.activated = false;
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
                console.log(unitsGroup.children[i].speed);
                
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
                    unitsGroup.callAll("heal", null, 1000);
                    break;
                case 6:
                    console.log("HEAL ALL");
                    this.gameState.friendlyUnit1.callAll("heal", null, 250);
                    this.gameState.friendlyUnit2.callAll("heal", null, 250);
                    this.gameState.friendlyUnit3.callAll("heal", null, 250);
                    break;
                case 7:
                    
                    break;
                case 8:
                    console.log("Damege all");
                    this.gameState.enemyUnit1.callAll("damage", null, 250);
                    this.gameState.enemyUnit2.callAll("damage", null, 250);
                    this.gameState.enemyUnit3.callAll("damage", null, 250);
                    break;
                case 9:
                    
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



/*
    //permanent card, spawn soldiers
    class spawntroop extends Cards
    {
        

    }

    //atk buff
    class powatk extends Cards
    {

    }

    //speed buff
    class powspeed extends Cards
    {

    }

    //heal ally
    class healtroop extends Cards
    {


    }

    //spawn troops on all lane
    class incproduction extends Cards
    {


    }
    
    //damage enemy on certain lane
    class dmgenemy extends Cards
    {
       
    }

    //AoE attk
    class destruction extends Cards
    {

    }

    //delay enemy on certain lane
    class delayenemy extends Cards
    {

    }

*/

//export default Cards;


