var bgImg,bg
var hero,heroImg
var levithan,levithanImg
var score
var start,startImg
var powerA
var restart,restartImg
var life=1

var realityS,realitySImg,spaceS,spaceSImg,timeS,timeSImg,soulS,soulSImg,realityS,realitySImg,mindS,mindSImg,powerS,powerSImg
var levithanGroup,laserGroup

var gameOver,gameOverImg

var PLAY=1
var END=0
var gameState=0


var powerEli=false
var timeEli=false
var soulEli=false
var mindEli=false
var realityEli=false
var ld=true


var powerMessage=true
var timeMessage=true

var time=0
var power=0
var space=0
var soul=0
var reality=0

var cFrameCount=0
var invisbox
var bgm
var laser
var laserImg
var mindP=0
var laserP=false
function preload(){
laserImg=loadImage("ml.jpg")
bgImg= loadImage("bgp.png");
heroImg = loadImage("iron 2.png")
 leviImg = loadImage("o.png")   
gameOverImg = loadImage("go.png")
  bgm = loadSound("BGM.mp3")
startImg = loadImage("s.png")
restartImg = loadImage("rest.png")
spaceSImg = loadImage("s s.png")
timeSImg = loadImage("t s.png")
soulSImg=loadImage("sos.png")
realitySImg=loadImage("r s.png")
powerSImg=loadImage("p s.png")
mindSImg=loadImage("m s.png")
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    
    levithanGroup=new Group();
    laserGroup=new Group()

    
    bg = createSprite(windowWidth/2,windowHeight/2);
    bg.addImage("bgp",bgImg);
    bg.scale=2

    start = createSprite(windowWidth/2,windowHeight/2)
    start.addImage("start",startImg)
    start.scale=3
   
    hero = createSprite(100,windowHeight/2)
    hero.addImage("iron",heroImg)
    hero.scale=0.7
    score = 0

    restart = createSprite(windowWidth/2,windowHeight*2+100)
    restart.addImage("restart",restartImg)
    
hero.setCollider("rectangle",0,0,hero.width-70,hero.height-60)
    bgm.loop()
    gameOver = createSprite(77141714,windowHeight/2)
 gameOver.addImage("over",gameOverImg)
}

function draw() {
    background(0)
    
   
    console.log("hello")
    if(!bgm.isPlaying()){
        console.log("not playing")
        bgm.loop()
    }
   
    if(keyDown("space")){gameState=PLAY 
    life=1
    score=0
    levithanGroup.destroyEach()
    }
    if(gameState===PLAY){
        
         restart.visible=false
         
         if(keyDown("I")&&keyDown("K")){
            score+=20
         }
         if(score===100){
            var powerS = createSprite(hero.x+100,hero.y)
             powerS.velocityX=-5
             powerS.addImage("p s",powerSImg)
             powerS.scale=0.5
             
               powerS.lifetime=8
            }
            
               
               if(score===300){
                var timeS = createSprite(hero.x+100,hero.y)
                 timeS.velocityX=-5
                 timeS.addImage("t s",timeSImg)
                 timeS.scale=0.5
                 time=true
                   timeS.lifetime=8
                }
                if(score===500){
                    var spaceS = createSprite(hero.x+100,hero.y)
                     spaceS.velocityX=-5
                     spaceS.addImage("s s",spaceSImg)
                     spaceS.scale=0.09
                     
                       spaceS.lifetime=8
                    }
             if (score===600){
                var soulS= createSprite(hero.x+100,hero.y)
                soulS.velocityX=-5
                soulS.addImage("so s",soulSImg)
                soulS.scale=0.75
                soulS.lifetime=8
             }
             if(score===700){
                var mindS=createSprite(hero.x+100,hero.y)
                mindS.velocityX=-5
                mindS.addImage("m s",mindSImg)
                mindS.lifetime=8
                mindS.scale=0.09
                mindP=5
             }
             if(score===900){
             var   realityS=createSprite(hero.x+100,hero.y)
             realityS.velocityX=-5
             realityS.addImage("r s",realitySImg)
             realityS.lifetime=8
             realityS.scale=0.5
             }
        hero.y=World.mouseY
        
    if(bg.x<(windowWidth-windowWidth)+windowWidth/3+75){
        bg.x=windowWidth/2
    }
    gameOver.visible=false
     start.visible=false
    bg.velocityX=-3
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(4 + 3* score/500)
    if(frameCount-cFrameCount>150){
        powerEli=true
    }
    if (score>100 && keyDown("P") && powerEli ){
     powerMessage=false
        powerA()

     }
     if(score>=500){
        if(hero.x<500){
            if(keyDown("RIGHT_ARROW")){
                hero.x+=20
            }
            
        }
        if(hero.x>0){
            if(keyDown("LEFT_ARROW")){
                hero.x-=20
            }
        }
        
     }
     if(frameCount-cFrameCount>200){
        realityEli=true
     }
     if(score>900 && keyDown("r") && realityEli){
        realityA()
     }
     if(reality>0){
        reality--
        if (reality==0){
            realityEli=false
            cFrameCount=frameCount
    
        }
        
        if( levithanGroup.isTouching(hero) && realityEli){
            ld=false
            hero.opacity
        }
    }
    if(power>0){
        power--
        if (power==0){
            powerEli=false
            cFrameCount=frameCount
    
        }
        levithanGroup.destroyEach()
    }
         if(frameCount-cFrameCount>100){
        timeEli=true
    }
        if(score>300 && keyDown("T") && timeEli ){
        
        timeMessage=false
        timeA()
        cFrameCount=frameCount
        }
        if(time>0){
          time-- 
           if(time==0){
          timeEli=false
        cFrameCount= frameCount
         }
         levithanGroup.setVelocityXEach(-10)
          
        }
        if(frameCount-cFrameCount>10){
        soulEli=true
    }
        if(score>600 && keyDown("S") && soulEli){
          soulA()
           
            cFrameCount=frameCount 
        }
                
            if(soul>0) {
                soul--
               
            if(levithanGroup.isTouching(hero)){
      life+=1
    }
         levithanGroup.overlap(hero,A)
             if(soul===0){
                    soulEli=false
                  
                  
                }
                 
            }
            if (cFrameCount-frameCount>100) {
                mindEli=true
                mindP+=1
            }
            if(keyDown("M")){
         laserP=true
            }
            if(World.frameCount % 100 === 0 && score>700){
                mindP+=1
            }
         if (score>7  && mindP>0 && laserP ){
         laser=createSprite(hero.x,hero.y,20,5)
         laserGroup.add(laser)
         laser.addImage("l",laserImg)
         laser.scale=0.50
         
         laser.velocityX=5
         mindP-=1
         cFrameCount=frameCount
         mindEli=false
         laserP=false
        }
         
         if(laserGroup.isTouching(levithanGroup)){
            life+=1
            
         } 
     if(keyDown("L")&&keyDown("I")){
        life+=1
     }
    levithanGroup.overlap(laserGroup,A) 
    
    
    leviS()
    if(levithanGroup.isTouching(hero)&&ld){
      life-=1
      levithanGroup.overlap(hero,A)
    }
   
    
     if(life<=0) {
    gameState=END
   }
    
   
 if(gameState===END)  {
    levithanGroup.setVelocityXEach(0)
    bg.velocityX=0
    gameOver.visible=true
 gameOver.x=windowWidth/2
 restart.y=windowHeight/2+30
 restart.visible=true
 if(keyDown("space")){
    gameState=PLAY}
levithanGroup.destroyEach()
laserGroup.destroyEach()
score=0
hero.x=100

  
 }  } 
 


    drawSprites();
    textSize(20);
    fill(255);
    text("Score:"+ score, windowWidth-100,windowHeight-windowHeight+50);
     textSize(20);
    fill(255);
    text("LIFE:"+ life, windowWidth-100,windowHeight-windowHeight+100);
   
   if(score>100 && powerMessage){
    fill("white")
    stroke("blue")
    textSize(30)
    text("power stone colected press  {P}  activate the power",500,50)

   }
   if(score>300 && timeMessage){
    fill("white")
    stroke("blue")
    textSize(30)
    text("time stone colected press  {T}  activate the power",500,50)

   }
   
  textSize(20);
    fill(255);
    text("MIND STONE POWER:"+ mindP, 20,windowHeight-windowHeight+50);  
   
}

function leviS(){


    if(World.frameCount % 25 === 0){
        var levithan = createSprite (windowWidth+20,(Math.round(random(windowHeight-windowHeight,windowHeight), 10, 10)));
        levithan.velocityX=-20
        levithan.addImage("levi",leviImg)
        levithan.scale=2
        levithan.velocityX = -(15 + 5* score/50) 
        levithanGroup
       
        
        levithan.setCollider("rectangle",0,0,levithan.width-90,levithan.height-20)
        levithanGroup.add(levithan)
        
    }
}
function powerA(){
 power=150
 
}
function timeA(){
    time=300
}
function realityA(){
 reality=100
 
}
function soulA(){
    soul=300
}
function A(sprA){
    sprA.remove()
}
function B(sprB){
    sprB.remove()
}

