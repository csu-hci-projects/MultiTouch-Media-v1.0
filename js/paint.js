//Made with the good faith of W3Schools;
//https://www.w3schools.com/tags/ref_canvas.asp
let canvas, ctx, lineColor, lineWidth = 1, lines = [];
let renderInterval = null;
function Paint_onLoad(){
    canvas = document.getElementById("paint");
    ctx = canvas.getContext("2d");
    Paint_onResize();
    touchEnd();

    $("img#logo").on("load", addLogoToCanvas);

    renderInterval = setInterval(render, 100);
}

function addLogoToCanvas(){
    let img = document.getElementById("logo");
    ctx.drawImage(img, 15, 15);
    $("img#logo").css({display: 'none'})
}

function Paint_onResize(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

let linePointer = 0;
function render(){
    if(lines.length == 0) return;
    while(linePointer < lines.length - 1){ 
        console.log(lines.length)
        let line = lines[linePointer];
        let lineLength = line.points.length;
        //This is an empty line, so skip it
        if(line.points.length == 0) continue;
        
        //If we are starting at the first point of the line,
        //Begin a new path.
        if(line.drawPointer == 0) {
            ctx.beginPath();
            ctx.lineWidth = line.width;
            ctx.strokeStyle = line.color;
            ctx.lineCap = "round";
            //Set the starting point for the line.
            ctx.moveTo(line.points[0].x, line.points[0].y);
        }
    
        //Draw the line
        while(line.drawPointer < lineLength - 1){ //While there are points to draw...
            ctx.lineTo(line.points[0].x, line.points[0].y);
            ctx.stroke();
            line.drawPointer++;
        }
        //Only increment the linePointer if it is NOT the last line.
        if(linePointer < lines.length - 1) linePointer++;
    }
}

function drawPoint(pos){
    if(ctx.lineWidth != lineWidth || ctx.strokeStyle != lineColor) 
        //Lines cannot have different widths/colors,
        //So anytime those change we need to make a new line.
        touchEnd();

    //Push the point back to the most recent line.
    lines[lines.length - 1].push(pos);
}

let MIN_PEN_WIDTH = 1, MAX_PEN_WIDTH = 18;
function changePenWidth(diff){
    let newWidth = lineWidth + (diff); // PEN_DIFF_SCALAR);
      
    if(newWidth < MIN_PEN_WIDTH) newWidth = MIN_PEN_WIDTH;
    else if(newWidth > MAX_PEN_WIDTH) newWidth = MAX_PEN_WIDTH;

    lineWidth = newWidth;
}

function changeColor(){
    lineColor = getRandomColor();
}

function touchEnd(){
    lines.push(new Line(lineColor, lineWidth));
}

//Stolen from: https://stackoverflow.com/a/1484514    
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function getMousePos(event){
    let m = event.originalEvent;
    let pos = {x: m.pageX, y: m.pageY};
    return pos;
}

function getTouchPos(event, index){
    let t = event.originalEvent.touches[index];
    let pos = {x: t.pageX, y: t.pageY};
    return pos;
}

$(document).ready(function(){
    Paint_onLoad();
    $(window).resize(Paint_onResize);
});
