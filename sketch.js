var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, ObstacleGroup
var score = 0, survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  background("white");
  
  //groups
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  
  ///Monkey
  monkey = createSprite(100, 315, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
}


function draw() {
  
  //create Background
  background(700);
  
  //score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score, 300,25);
  
  //SurvivalTime
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100,50);
  
  //Play
  if(gameState===PLAY) {
    monkey.changeAnimation("running", monkey_running);
    monkey.collide(ground);
    survivalTime = Math.ceil(frameCount/frameRate())
    
    if(ground.x < 0) {
      ground.x = ground.width/2;
    }
    
    //code for jumping when space is pressed
    if(keyDown("space")) {
      monkey.velocityY = -12;
    }
    
    //score points
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
    
     //gravity for the poor monkey
     monkey.velocityY = monkey.velocityY + 0.8;
    
    //call the functions
    Banana();
    Obstacles();
    
    //lifetime for ObstacleGroup
    ObstacleGroup.setLifetimeEach(-1);
    
    
    if(ObstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
        
  }
  
    ///END
    if(gameState === END) {
      ObstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      survivalTime.visible = false;
      
       stroke("blue");
       textSize(30);
       fill("blue");
       text("GAME OVER", 110,200);
    }
  
  

  drawSprites();
}

//function for food
function Banana() {
  if(frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));  
    
    banana.velocityX = -4;
    banana.lifetime = 200;
    banana.scale = 0.1;
    FoodGroup.add(banana);
    
  }
}

//function for obstacles
function Obstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    ObstacleGroup.add(obstacle);
    
  }
}






