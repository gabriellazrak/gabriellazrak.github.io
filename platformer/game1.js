var GRAVITY = 0.3;
var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;
var player;
var JUMP=-5;
var obstacleSprites;
var isGameOver;
var playerImg;
var backgroundImg;
var score;
var difficulty=.98;

var level=1;
var bonuses;
var started=false;

function preload(){
    // playerImg=loadImage("http://imgur.com/2bCy0iJ")
    // backgroundImg=loadImage("http://i.imgur.com/dQAcEkX.jpg");
}
function setup(){
    isGameOver=false;
    score=0;
    createCanvas(window.innerWidth-100,window.innerHeight-100);
    background(0);
    groundSprites= new Group();
    player=createSprite(width/2,height-75,50,50);
    // player.addImage(playerImg);
    numGroundSprites=width/GROUND_SPRITE_WIDTH +1;
    for (var n = 0; n < numGroundSprites;n++){
        var groundSprite = createSprite(n*50,height-25,GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    obstacleSprites= new Group(); 
    bonuses= new Group();
}
$("#start").on("click",new_game);
function draw(){
    if (isGameOver){
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        text("Game Over! Click anywhere or press space to restart",camera.position.x,camera.position.y);
    }
    if(started){
        background(0);
        if(random()>difficulty){
            var obstacle=createSprite(camera.position.x+width,random(0,height-65),30,30);
            obstacleSprites.add(obstacle);
        }
        if(random()>.99){
            var jewel=createSprite(camera.position.x+width,random(0,height-65),10,10);
            bonuses.add(jewel);
        }
        var firstJewel = bonuses[0];
        if (bonuses.length>0&&firstJewel.position.x<=camera.position.x-(width/2+firstJewel.width/2)){
            removeSprite(firstJewel);
        }
        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length>0&&firstObstacle.position.x<=camera.position.x-(width/2+firstObstacle.width/2)){
            removeSprite(firstObstacle);
        }
        player.velocity.y = player.velocity.y + GRAVITY;
        if (groundSprites.overlap(player)) {
          player.velocity.y = 0;
          player.position.y = (height-50) - (player.height/2);
        }
        if (keyDown(LEFT_ARROW)){
            player.position.x = player.position.x - 3;
        }
        if (keyDown(RIGHT_ARROW)){
            player.position.x = player.position.x + 3;
        }
        if (keyDown(UP_ARROW)&&player.position.y>=player.height){
            player.velocity.y=JUMP;
        }
        camera.position.x+=2+(level*.2)
        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x<=camera.position.x-(width/2 + firstGroundSprite.width/2)){
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x= firstGroundSprite.position.x+numGroundSprites*firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }
        obstacleSprites.overlap(player, endGame);
        bonuses.overlap(player,bonus);
        if (keyDown(RIGHT_ARROW)){
            score+=4;
        }else if (keyDown(LEFT_ARROW)){
            score+=0
        }else{
            score+=1
        }
        textAlign(CENTER);
        text(score,camera.position.x,10);
        if (score>1000*level){
            level+=1
            difficulty-=.01;
        }
        if (player.position.x+width/2 + player.width/2<=camera.position.x){
            isGameOver=true;
            started=false;
        }
        drawSprites();
    }
}

function endGame(){
    isGameOver=true;
    started=false;
}
function keyPressed(){
    if (keyCode===32){
        mouseClicked();
    }
}

function mouseClicked(){
    if (isGameOver){
        groundSprites.removeSprites();
        for (var n = 0; n < numGroundSprites; n++){
            var groundSprite = createSprite(((camera.position.x-width/2)+n*50),height-25,GROUND_SPRITE_WIDTH,GROUND_SPRITE_HEIGHT);
            groundSprites.add(groundSprite);
        }
        player.position.x = camera.position.x;
        player.position.y = height-75;
        obstacleSprites.removeSprites();
        bonuses.removeSprites();
        score=0;
        difficulty=.98;
        level=1;
        isGameOver=false;
        started=true;
    }
}
function bonus(point){
    score+=200;
    point.remove();
}
function new_game(){
    started=true;
    isGameOver=false;
}