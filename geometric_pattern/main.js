var NUM_CIRCLES=12;
var circleDiameter;
var circleRadius;
function setup(){
    createCanvas(480, 600);
    circleDiameter=width/NUM_CIRCLES;
    circleRadius=circleDiameter/2
}
function draw(){
    var y=height;
    var isShifted=false;
    var rVal=255;
    var gVal=0;
    var bVal=0;
    while (y>=0){
        var x=0;
        if (isShifted){
            x=x+circleRadius;
        }
        while (x<=width){
            fill(color(rVal,gVal,bVal));
            stroke(color(rVal,gVal,bVal));
            ellipse(x,y,circleDiameter,circleDiameter);
            x=x+circleDiameter;
        }
        y=y-circleRadius;
        isShifted = !isShifted;
        rVal=rVal-2;
        gVal=gVal+7;
        bVal=bVal+3;
    }
}

function keyPressed(){
    if (keyCode===83){
        saveCanvas('geometric pattern', 'png')
    }
    return false
}