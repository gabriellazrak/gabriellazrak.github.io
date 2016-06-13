var GRAVITY = 0.3;
var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;
var player;
var player2;
var p1_in=true;
var p2_in=true;
var JUMP=-5;
var obstacleSprites;
var isGameOver;
var player1Lbl;
var player2Lbl;
var enemyImg;
var score;
var score2=0;
var difficulty=.98;
var bonusImg;
var level=1;
var bonuses;
var started=false;
var p1Lbl;

function preload(){
    bonusImg=loadImage("http://i.imgur.com/lSz4tzz.png")
    player1Lbl=loadImage("http://i.imgur.com/ABi3WVa.gif")
    player2Lbl=loadImage("http://i.imgur.com/vx9WPrt.jpg")
    enemyImg=loadImage("http://i.imgur.com/DXk9fPO.png")
}
function setup(){
    isGameOver=false;
    p1_in=true;
    p2_in=true;
    score=0;
    createCanvas(window.innerWidth-100,window.innerHeight-100);
    background(0);
    groundSprites= new Group();
    player=createSprite(width/2,height-75,50,50);
    p1Lbl=createSprite(player.width,player.height+42.5,50,50);
    p1Lbl.addImage(player1Lbl);
    player2=createSprite(width/2.1,height-75,50,50);
    p2Lbl=createSprite(player2.width,player2.height-39,50,50);
    p2Lbl.addImage(player2Lbl);
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
        text("Player 1's score was: " + score, camera.position.x, camera.position.y - 20);
        text("Player 2's score was: " + score2, camera.position.x, camera.position.y - 40);
        text("Game Over! Click anywhere or press space to restart",camera.position.x,camera.position.y);
    }
    if(started&&(p1_in||p2_in)){
        background(0);
        if(random()>difficulty){
            var obstacle=createSprite(camera.position.x+width,random(0,height-65),30,30);
            obstacle.addImage(enemyImg)
            obstacleSprites.add(obstacle);
        }
        if(random()>.99){
            var jewel=createSprite(camera.position.x+width,random(0,height-65),10,10);
            jewel.addImage(bonusImg);
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
        if (groundSprites.overlap(player)&&p1_in) {
          player.velocity.y = 0;
          player.position.y = (height-50) - (player.height/2);
        }
        if (keyDown(LEFT_ARROW)&&p1_in){
            player.position.x = player.position.x - 3;
        }
        if (keyDown(RIGHT_ARROW)&&p1_in){
            player.position.x = player.position.x + 3+(level*.2);
        }
        if (keyDown(UP_ARROW)&&player.position.y>=player.height&&p1_in){
            player.velocity.y=JUMP;
        }
        player2.velocity.y = player2.velocity.y + GRAVITY;
        if (groundSprites.overlap(player2)&&p2_in) {
            player2.velocity.y = 0;
            player2.position.y = (height-50) - (player2.height/2);
        }
        if (keyDown(65)&&p2_in){
            player2.position.x = player2.position.x - 3;
        }
        if (keyDown(68)&&p2_in){
            player2.position.x = player2.position.x + 3+(level*.2);
        }
        if (keyDown(87)&&player2.position.y>=player2.height&&p2_in){
            player2.velocity.y=JUMP;
        }
        camera.position.x+=2+(level*.2)
        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x<=camera.position.x-(width/2 + firstGroundSprite.width/2)){
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x= firstGroundSprite.position.x+numGroundSprites*firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }
        obstacleSprites.overlap(player, p1_game_over);
        bonuses.overlap(player,bonus);
        obstacleSprites.overlap(player2, p2_game_over);
        bonuses.overlap(player2,bonus2);
        if (keyDown(LEFT_ARROW)&&p1_in===true){
            score+=0
        }else if(p1_in){
            score+=1;
        }if (keyDown(65)&&p2_in===true){
            score2+=0;
        }else if(p2_in){
            score2+=1;
        }
        textAlign(CENTER);
        text("p1: "+score,camera.position.x-30,10);
        text("p2: "+score2,camera.position.x+30,10);
        if (score>1000*level){
            level+=1;
            difficulty-=.01;
        }
        if (player.position.x+width/2 + player.width/2<=camera.position.x){
            p1_in=false;
        }
        if (player2.position.x+width/2 + player2.width/2<=camera.position.x){
            p2_in=false;
        }
        p1Lbl.position.x=player.position.x;
        p1Lbl.position.y=player.position.y+42.5;
        p2Lbl.position.x=player2.position.x;
        p2Lbl.position.y=player2.position.y-39;
        drawSprites();
    }
    else{
        isGameOver=true;
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
        player2.position.x = camera.position.x-25;
        player2.position.y = height-75;
        obstacleSprites.removeSprites();
        bonuses.removeSprites();
        score=0;
        score2=0;
        difficulty=.98;
        level=1;
        isGameOver=false;
        started=true;
        p1_in=true;
        p2_in=true;
    }
}
function bonus(point){
    score+=200;
    point.remove();
}
function bonus2(point){
    score2+=200;
    point.remove();
}
function new_game(){
    started=true;
    isGameOver=false;
}
function p1_game_over(){
    p1_in=false;
}
function p2_game_over(){
    p2_in=false;
}