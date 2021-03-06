class MainMenuScene {
    constructor(){

        var buttonIMG = new Image(2000, 230);
        buttonIMG.src = "ASSETS/SPRITES/Menu_buttons.png";

        this.menuButtons = new Sprite(190, 500, 500, 230, buttonIMG, 500*2.5, 230*2.5, false, 4);
        this.buttonIndex = 1;
        this.menuButtons.setFrame(this.buttonIndex);

        var titleIMG = new Image(2000, 230);
        titleIMG.src = "ASSETS/SPRITES/Menu_Title_72.png";
        
        this.title = new Sprite(280, -50, 500, 230, titleIMG, 500*2, 230*2, false);


        //Input variables
        this.keyPressed = false;

        this.enterPressed = false;
        this.wasEnterPressed = false;
        this.changeSceneStr = "this.mManager.setCurrentScene('Game Scene')";
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
        
        this.flashSpeed = .2;
        this.timeTillFlash = .2;
        this.drawIndicator = false;
        this.isActive = false;

        //audioOptions.manager.loadSoundFile('mainMenuMusic', "ASSETS/AUDIO/MainMenu.mp3");
        audioOptions.mainTheme = new Audio("ASSETS/AUDIO/MainMenu.mp3");
        //audioOptions.mainTheme.addEventListener('canplaythrough', this.soundLoaded, false);
    }



    start(){
      this.isActive = true;
      this.audioPlayed = false;
    }    
    
    /*soundLoaded(){
        //audioOptions.manager.playAudio('mainMenuMusic', false, audioOptions.volume/100);
        audioOptions.mainTheme.play();
    }*/

    stop(){
        this.isActive = false;
        audioOptions.mainTheme.pause()
        //audioOptions.manager.stopAudio();
    }

    update(dt)
    {
        if(audioOptions.mainTheme.readyState ===4 && this.audioPlayed === false){
            const playPromise = audioOptions.mainTheme.play();
            // In browsers that don’t yet support this functionality,
            // playPromise won’t be defined.
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    this.audioPlayed = true;
                // Automatic playback started!
                }).catch(function(error) {
                    console.log(error);
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
                });
            }
            /*audioOptions.mainTheme.play().catch(function() {
                console.log("broken promises");
            });*/
        }
      //Add to our time to flash
      this.timeTillFlash += dt;
  
      //If its time to flash, flip our bool
      if(this.timeTillFlash >= this.flashSpeed)
      {
        this.timeTillFlash = 0;
        this.drawIndicator = !this.drawIndicator; //Flip the bool
      }
    }

    //Input handle
    handleInput(input)
    { 
        if(this.isActive === true)
        {
            if(this.enterPressed)
            {
                this.enterPressed = false;
                switch(this.buttonIndex){
                    case 1:
                        return "this.mManager.setCurrentScene('Game Scene')";
                    case 2:
                        return "this.mManager.setCurrentScene('Options')";
                    case 3:
                        console.log("scoreboard?");
                        return "this.mManager.setCurrentScene('Scoreboard')";
                }
            }  
        }
    }

  keyDown(e)
  {
    if(this.isActive === true)
    {
        if(this.keyPressed === false)
        {
        switch(e.code){
            case 'ArrowUp':
                this.buttonIndex--;
                if(this.buttonIndex <= 0)
                    this.buttonIndex = 3;
                this.keyPressed = true;
                break;
            case 'ArrowDown' :
                this.buttonIndex++;
                if(this.buttonIndex>=4)
                    this.buttonIndex = 1;
                this.keyPressed = true;
                break;
            case 'Enter' :
                this.enterPressed = false;
                this.keyPressed = true;
        }  
    
        }
    }
  }

  keyUp(e)
  {
    if(this.isActive === true)
    {
        switch(e.code){
            case 'ArrowUp':
                this.keyPressed = false;
                break;
            case 'ArrowDown' :
                this.keyPressed = false;
                break;
            case 'Enter' :
                this.enterPressed = true;
                this.keyPressed = false;
                break;
        } 
    }
    //this.wasEnterPressed = this.enterPressed; //Set previous*/
  }
  

  draw(ctx)
  {
    ctx.save(); //Save the ctx
    ctx.fillstyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if(this.drawIndicator)
        this.menuButtons.setFrame(this.buttonIndex);
    else
        this.menuButtons.setFrame(0);
    this.menuButtons.draw();
    this.title.draw();


    ctx.restore(); //Restore it
  }

}