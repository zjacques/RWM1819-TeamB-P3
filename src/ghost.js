class Ghost
{
  constructor(ghostType, x, y, grid, scatterTile){
    this.moveDistance = 32; //32 pixels per move
    this.moveSpeed = .3; //Moves a cell every .3 seconds
    this.timeTillMove = 0; //Time till the ghost can move cell

    this.collider = new CollisionCircle(x, y, 16); //Create collider
    this.moveDirection = new Vector2(1,0);
    this.position = new Vector2(x, y);
    this.spawnGridPosition = new Vector2(x / 32, y / 32);
    this.targetPos = new Vector2(x, y);
    this.gridPosition = new Vector2(x / 32, y / 32);

    this.gridRef = grid;
    this.scatterTile = scatterTile; //Ste the scatter tile
    this.scatterTime = 3;
    this.timeTillScatter = 0;

    //Setting the image of the ghost
    var img = new Image(256, 32);
    img.src = "ASSETS/SPRITES/"+ghostType+"_ghost_72.png";
    this.spr = new Sprite(this.position.x, this.position.y, 32, 32, img, 32, 32, true, 4);
    var eyeImg = new Image(256, 32);
    eyeImg.src = "ASSETS/SPRITES/Eyes_72.png";
    this.eyes = new Sprite(this.position.x, this.position.y, 32, 32, eyeImg, 32, 32, false, 4);

    this.ghostType = ghostType;
    this.state = "Chase";

    this.alive = true;
    this.eyesSpeed = 224; //Move 224 pixels a second
    this.eyesVelocity = new Vector2(0,0); //The velocity of the eyes
    this.timesMoved = 0; //Temp
  }

  update(dt){
    if(this.alive) //If alive, do movement and set ghost eyes
    {
      if(this.state === "Chase") //If our state is chasing
      {
        this.checkIfGhostMoved(dt); //Check if the ghost has moved
        this.setGhostEyes(); //Set the ghost eyes sprite

        this.timeTillScatter += dt;

        if(this.timeTillScatter >= this.scatterTime)
        {
          this.timeTillScatter = 0;
          this.state === "Scatter";
          console.log("SCATTERING");
          //Pathfind to the scatter position
        }

      }
      else if(this.state === "Scatter") //If our state is scattering
      {
        this.timeTillScatter += dt; //Add to scatter

        if(this.timeTillScatter >= this.scatterTime) //If its time to switch from scatter, return to chase mode
        {
          this.timeTillScatter = 0;
          this.state === "Chase";
          console.log("CHASING");

          //Pathfind to the players position
        }
      }


    }
    else //Else move our ghost eyes to the start position
    {
      this.deadUpdate(dt);
    } 
  }

  deadUpdate(dt)
  {
    if(this.position.distance(this.targetPos) <= 8){ //If our eyes are now back at our spawn position, reset the ghost
      this.position = new Vector2(this.targetPos.x, this.targetPos.y); //Set our position
      this.gridPosition = new Vector2(this.spawnGridPosition.x, this.spawnGridPosition.y); //Set our grid position

      this.alive = true;
    }
    else{
      this.position.plusEquals(this.eyesVelocity.multiply(dt)); //Add the eyes velocity to the position of the ghost
    }
  }

  checkIfGhostMoved(dt){
    this.timeTillMove += dt;

    if(this.timeTillMove >= this.moveSpeed)
    {
      this.timeTillMove = 0;
      //Add our movement to the ghost
      this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
      this.gridPosition.plusEquals(this.moveDirection);

      this.timesMoved++; //Add to our times moved
      if(this.timesMoved >= 10)
      {
        this.die();
        this.timesMoved = 0;
      }

      //Check if we can continue in our direction
      if(this.mustTurn()) //If we have to turn
      {
        //Temp until behaviours are done
        if(this.canMoveUp() && this.moveDirection.y !== 1){this.moveDirection = new Vector2(0, -1);}
        else if(this.canMoveDown() && this.moveDirection.y !== -1){this.moveDirection = new Vector2(0, 1);}
        else if(this.canMoveLeft() && this.moveDirection.x !== 1){this.moveDirection = new Vector2(-1, 0);}
        else if(this.canMoveRight() && this.moveDirection.x !== -1){this.moveDirection = new Vector2(1, 0);}
      }
    }
  }

  //Kills the ghost, and sets the ghost to move back to its spawn location
  die()
  {
    this.alive = false;
    this.targetPos = new Vector2(this.spawnGridPosition.x * 32, this.spawnGridPosition.y * 32); //Set our target position to the spawn location
    this.eyesVelocity = this.targetPos.minus(this.position).normalise().multiply(this.eyesSpeed);

    this.timeTillMove = 0;
  }

  canMoveUp()
  {
    if(this.gridPosition.y - 1 >= 0)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y - 1)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  canMoveDown()
  {
    if(this.gridPosition.y + 1 < 31)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y + 1)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  canMoveLeft()
  {
    if(this.gridPosition.x - 1 >= 0)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x - 1, this.gridPosition.y)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  canMoveRight()
  {
    if(this.gridPosition.x + 1 < 31)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x + 1, this.gridPosition.y)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  //Checks if the ghost must turn if their next cell is now a wall
  mustTurn()
  {

    if(this.moveDirection.x === 1){
      if(this.canMoveRight() === false){
        return true;
      }
    }
    else if(this.moveDirection.x === -1){
      if(this.canMoveLeft() === false){
        return true;
      }
    }
    else if(this.moveDirection.y === -1){
      if(this.canMoveUp() === false){
        return true;
      }
    }
    else if(this.moveDirection.y === 1){
      if(this.canMoveDown() === false){
        return true;
      }
    }

    return false;
  }

  //Sets the ghosts eyes depending on the direction they are going
  setGhostEyes()
  {
    if(this.moveDirection.x === -1)
    {
        this.eyes.setFrame(0);
    }
    if(this.moveDirection.y === 1)
    {
        this.eyes.setFrame(1);
    }
    if(this.moveDirection.y === -1)
    {
        this.eyes.setFrame(2);
    }
    if(this.moveDirection.x === 1)
    {
        this.eyes.setFrame(3);
    }
  }


  draw(ctx){
    if(this.alive) //If not dead, draw the ghosts body
    {
      this.spr.draw(this.position.x, this.position.y);
    }
    this.eyes.draw(this.position.x, this.position.y); //Always draw the eyes
  }
}
