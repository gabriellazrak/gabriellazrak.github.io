var player;
var playerImg;
var enemy;
var enemyImg;
var isGameOver;
var backgroundImg;
var score;
var difficulty;
var level;
var enemy2;
var enemy3;
var enemySpeed;
var enemy2Speed;
var enemy3Speed;

enemySpeed=0;
enemy2Speed=0;
enemy3Speed=0;
score=0;
difficulty=100;
level=1;
function preload(){
    playerImg = loadImage("https://surrogate.hackedu.us/i.imgur.com/N5uCbDu.png");
    enemyImg = loadImage("https://surrogate.hackedu.us/i.imgur.com/OdL0XPt.png");
    backgroundImg = loadImage("https://surrogate.hackedu.us/i.imgur.com/aKQOg3G.png");
}
function setup(){
    createCanvas(window.innerWidth-difficulty,window.innerHeight-100);
    isGameOver=false;
    player=createSprite(width/2,height-(playerImg.height/2),0,0);
    player.addImage(playerImg);
    enemy=createSprite(random(5,width-5),0,0,0);
    enemy.addImage(enemyImg);
    enemy.rotationSpeed=4;
    enemy2=createSprite(random(5,width-5),0,0,0);
    enemy2.addImage(enemyImg);
    enemy2.rotationSpeed=4;
    enemy3=createSprite(random(5,width-5),0,0,0);
    enemy3.addImage(enemyImg);
    enemy3.rotationSpeed=4;
    enemySpeed=random(1,10);
    enemy2Speed=random(1,10);
    enemy3Speed=random(1,10);
}
function draw(){
    if (isGameOver){
        gameOver();
    }
    else{
        background(backgroundImg);
        if (keyDown(RIGHT_ARROW)&&player.position.x<width-(playerImg.width/2)){
            player.position.x=player.position.x+5;
        }
        if (keyDown(LEFT_ARROW)&&player.position.x>(playerImg.width/2)){
            player.position.x=player.position.x-5;
        }
        if (keyDown(UP_ARROW)&&player.position.y>playerImg.height){
            player.position.y=player.position.y-5;
        }
        if (keyDown(DOWN_ARROW)&&player.position.y<height-(playerImg.height)){
            player.position.y=player.position.y+5;
        }
        enemy.position.y=enemy.position.y+enemySpeed;
        if (enemy.position.y>height){
            enemy.position.y=0;
            enemy.position.x=random(5,width-5);
            enemySpeed=random(1,10);
        }
        if (enemy.overlap(player)){
            isGameOver=true;
        }
        enemy2.position.y=enemy2.position.y+enemy2Speed;
        if (enemy2.position.y>height){
            enemy2.position.y=0;
            enemy2.position.x=random(5,width-5);
            enemy2Speed=random(1,10);
        }
        if (enemy2.overlap(player)){
            isGameOver=true;
        }
        enemy3.position.y=enemy3.position.y+enemy3Speed;
        if (enemy3.position.y>height){
            enemy3.position.y=0;
            enemy3.position.x=random(5,width-5);
            enemy3Speed=random(1,10);
        }
        if (enemy3.overlap(player)){
            isGameOver=true;
        }
        if (player.position.y>height/3){
            score=score+.02;
            fill("red");
            text("score: "+score,width-difficulty,25);
        }
        if (player.position.y<height/3){
            score=score+.04;
            fill("green");
            text("score: "+score,width-difficulty,25);
        }
        if (score>10*level){
            level=level+1;
            difficulty=difficulty+100;
            createCanvas(window.innerWidth-difficulty,window.innerHeight-100);
        }
        drawSprites();
    }
}
function gameOver(){
    background(0);
    textAlign(CENTER);
    fill("white");
    text("GAME OVER",width/2,height/2);
    text("Your score was: "+score,width/2,height/1.9)
    text("Click anywhere or press space to continue",width/2,3*height/4);
}
function mouseClicked(){
    if (isGameOver){
        isGameOver=false;
        score=0
        enemy.position.y=0;
        enemy2.position.y=0;
        enemy3.position.x=0;
        player.position.x=width/2;
        player.position.y=height-(playerImg.height/2);
        enemy.position.x=random(5,width-5);
        enemy2.position.x=random(5,width-5);
        enemy3.position.x=random(5,width-5);
    }
}
function keyPressed(){
    if (keyCode===32){
        mouseClicked() 
    }
}