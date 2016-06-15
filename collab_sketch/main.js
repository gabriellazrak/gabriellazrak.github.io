var config = {
            apiKey: "AIzaSyDr3ZHg7NDzH00l-fm9RROfP0rRi-Jd9CE",
            authDomain: "collab-sketch-a79b0.firebaseapp.com",
            databaseURL: "https://collab-sketch-a79b0.firebaseio.com",
            storageBucket: "",
          };
          firebase.initializeApp(config);

var pointsData=firebase.database().ref();
var points=[];

function setup(){
    var canvas=createCanvas(window.innerWidth-50,window.innerHeight-50);
    background(255);
    fill(0);
    pointsData.on("child_added",function(point){
        points.push(point.val());
    });
    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(function(){
        if (mouseIsPressed){
            drawPoint();
        }
    })
}
function draw(){
    background(255);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        ellipse(point.x, point.y, 5, 5);
    }
}

function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY});
}
$("#saveDrawing").on("click",saveDrawing);
function saveDrawing(){
    saveCanvas();
}
$("#clearDrawing").on("click",clearDrawing);
function clearDrawing(){
    pointsData.remove();
    points=[];
}