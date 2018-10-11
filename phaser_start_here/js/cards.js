
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
             this.cooldown = game.time.create(this, false);
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
        
        
    
    }

    //effect based on id of the card
 
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


