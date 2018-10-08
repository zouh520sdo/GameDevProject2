
class Cards extends Phaser.Sprite{
    
    //constructor
    constructor(game, num, id)
    {
        console.log(game.cardAreaHeight);
        super(game,num * 240, gameplayState.cardAreaHeight, "card" + id );
        this.exist = false;
        this.activated = false;
       
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


