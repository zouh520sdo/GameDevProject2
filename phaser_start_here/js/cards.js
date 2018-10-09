
class Cards extends Phaser.Sprite{
    
    //constructor
    constructor(game, num, id)
    {
        
        super(game,num * 240, 850, "card" + id );
        this.savedx = num * 240;
        this.savedy = 850;
        this.lastx = (num* 240) - 240;
        this.exist = false;
        this.activated = false;
        this.id = id;
        this.num = num;
        this.game.physics.enable(this);
       
       
       Cards.prototype.shift = function()
       {
           this.body.velocity.x = -600;
           this.num -= 1;


       }

       Cards.prototype.stop = function()
       {
           if(this.x <= this.lastx)
           {
               this.body.velocity.x = 0;
               this.savedy -= 240;
               this.lastx -= 240;
           }
           
       }

    
    }

    //effect based on id of the card
 
}


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


