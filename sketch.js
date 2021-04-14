var trex,trex_running,ground,ground_image ;
var number;
var Cloud_img,cloud
var Obs1,Obs2,Obs3,Obs4,Obs5,Obs6;
var score=0
var PLAY=1,END=0,gameState=PLAY;
var cloudsGroup,obstaclesGroup;
var restart,restartImage;
var gameOver,gameOverImage;
var checkPoint_sound,die_sound,jump_sound;
function preload()
{
  
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png")
  ground_image=loadImage("ground2.png");
  Cloud_img=loadImage("cloud.png");
  
  Obs1=loadImage("obstacle1.png");
  Obs2=loadImage("obstacle2.png");
  Obs3=loadImage("obstacle3.png");
  Obs4=loadImage("obstacle4.png");
  Obs5=loadImage("obstacle5.png");
  Obs6=loadImage("obstacle6.png");
  
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
  
  checkPoint_sound=loadSound("checkPoint.mp3");
  die_sound=loadSound("die.mp3");
  jump_sound=loadSound("jump.mp3");
}
function setup()
{
  
  
  createCanvas(600,200);
  
  trex=createSprite(50,160,10,10);
 trex.addAnimation("running",trex_running);
trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  trex.debug=false;
  trex.setCollider("circle",0,0,40);
  
  ground=createSprite(300,190,600,10);
  ground.addImage(ground_image)
  ground2=createSprite(300,198,600,10);
  ground2.visible=false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  
  gameOver=createSprite(300,80,5,5);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false
  
  restart=createSprite(300,110,10,10);
  restart.addImage(restartImage);
  restart.scale=0.4
  restart.visible=false
  
}



function draw()
{
  //console.time();
    
  background("white");
  
  if(gameState==PLAY)
  {
    ground.velocityX=-(5+score/100) ;
    score=score+Math.round(getFrameRate()/60);
    if(score%100==0 && score>0)
    {
      checkPoint_sound.play();
    }
    if(keyDown("space") && trex.y>169)
  {
   trex.velocityY=-8; 
    jump_sound.play();
  }
  //Gravity effect 
  trex.velocityY=trex.velocityY+0.5;
    if(ground.x<0)
  {
  ground.x=ground.width/2  
  }
    spawnClouds();
  spawnObstacles();
    
    
    
    if(trex.isTouching(obstaclesGroup))
    {
    gameState=END;  
      
       die_sound.play();
     // trex.velocityY=-8; 
    //jump_sound.play();
    }
    
  }
  else if(gameState==END)
  {
     ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0
    trex.changeAnimation("collided",trex_collided)
    
   if(mousePressedOver(restart) || keyDown("r"))
   {
     reset();
   }
    
  
    
  }
  
  text("Score:"+score,500,30)
     
  
  
  trex.collide(ground2);
  
  
 
  
  
  
 
  
  drawSprites();
 //console.timeEnd();
 //console.count();
}

function spawnClouds()
{
  if(frameCount%60==0)
  {
   // console.log(frameCount)
  
  cloud=createSprite(600,20,10,10);
  cloud.y=Math.round(random(11,80)) 
  console.log(cloud.depth)
  cloud.addImage(Cloud_img);
  cloud.velocityX=-3
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1
  cloud.lifetime=1000
    cloudsGroup.add(cloud)
    
  }
}

function spawnObstacles()
{
  if(frameCount%80==0){
    Obs=createSprite(600,170,10,10);
    Obs.velocityX=-(5+score/100);
    Obs.lifetime=120;
    var Number=Math.round(random(1,6));
    switch(Number)  {
      case 1 :Obs.addImage(Obs1);
       break; 
       case 2 :Obs.addImage(Obs2);
       break;
       case 3 :Obs.addImage(Obs3);
       break;
       case 4 :Obs.addImage(Obs4);
       break;
       case 5 :Obs.addImage(Obs5);
       break;
       case 6 :Obs.addImage(Obs6);
       break;  
    }
    Obs.scale=0.5;
    obstaclesGroup.add(Obs)
    
  }
}

function reset()
{
  gameState=PLAY;
  //console.log("here");
  gameOver.visible=false;
  restart.visible=false;
  score=0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  
}