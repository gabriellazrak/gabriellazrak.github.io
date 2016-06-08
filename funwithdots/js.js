var imgObj=null;
var x_motion=1;
var y_motion=-1;
var score=0;
var timer;
function init(){
               imgObj = document.getElementById('b1');
               imgObj.style.position= 'relative'; 
               imgObj.style.left = '0px'; 
               imgObj.style.top = '0px';
            }
$(document).ready(init());
var width=$("#b1").width();
var height=$("#b1").height();
function move(){
    if ((parseInt(imgObj.style.left)+width+9)>=window.innerWidth || ((parseInt(imgObj.style.left))<=-1)){
        x_motion=x_motion*-1;
    }
    if (((parseInt(imgObj.style.top)+height+9)>=window.innerHeight) || ((parseInt(imgObj.style.top))<=-8)){
        y_motion=y_motion*-1;
    }
    imgObj.style.left= parseInt(imgObj.style.left) + x_motion + 'px';
    imgObj.style.top= parseInt(imgObj.style.top) + y_motion + 'px';
}
function startMoving() {
        setInterval(move,5);
}
function addPoints(){
    score=score+1;
    var element=document.getElementById("moving");
    element.innerHTML="points: "+score;
}
function points(){
    setInterval(addPoints,100);
}
function no_touchy(){
    bad_points();
    timer=setInterval(bad_points,500);
}
function waterbottle(){
    clearInterval(timer);
}
function bad_points(){
    score=score-100;
}
$("#start").on("click", startMoving);
$("#start").on("click", points);
