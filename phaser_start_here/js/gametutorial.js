let gametutorial = function(){
    this.pagenum = 1;
   
};


gametutorial.prototype.create = function() {
    this.pagenum = 1;

    game.add.sprite(0,0, "titlescreen");
     this.tutorial = game.add.sprite( 0,0, "tutorial1");
    
 backbutton = game.add.button(game.world.centerX - 800, 800, 'menubutton', this.backactionOnClick, this, 2, 1, 0);
    moretutorial = game.add.button(game.world.centerX + 500, 800, 'nextbutton', this.moretutorialOnClick, this, 2, 1, 0);
    
  
};



gametutorial.prototype.backactionOnClick = function()
{
  game.state.start("Title");
}
gametutorial.prototype.moretutorialOnClick = function()
{
   if(this.pagenum <= 2)
       {
    this.pagenum +=1;
    console.log("tutorial" + this.pagenum);
    this.tutorial.loadTexture("tutorial" + this.pagenum);
    if(this.pagenum === 2)
        {
            backtutorial = game.add.button(game.world.centerX , 800, 'backbutton', this.backtutorialOnClick, this, 2, 1, 0);
        }
           if(this.pagenum === 3)
               {
                    moretutorial.destroy();
               }
       }
}

gametutorial.prototype.backtutorialOnClick = function()
{
   if(this.pagenum >= 2)
       {
    this.pagenum -=1;
    console.log("tutorial" + this.pagenum);
    this.tutorial.loadTexture("tutorial" + this.pagenum);
    if(this.pagenum === 2)
        {
            moretutorial = game.add.button(game.world.centerX + 500, 800, 'nextbutton', this.moretutorialOnClick, this, 2, 1, 0);
        }
           if(this.pagenum === 1)
               {
                   backtutorial.destroy();
               }
       }
}