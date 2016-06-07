var imgObj=null;
function init(){
               imgObj = document.getElementById('b1');
               imgObj.style.position= 'relative'; 
               imgObj.style.left = '0px'; 
            }
$(document).ready(init());
var width=$("#b1").width()
function move(){
    if ((parseInt(imgObj.style.left)+width+9)>=window.innerWidth){
        clearInterval(startMoving);
    }
    else{
        imgObj.style.left= parseInt(imgObj.style.left) + 1 + 'px';
    }
}
function startMoving() {
    setInterval(move,5);
}
$("#start").on("click", startMoving)