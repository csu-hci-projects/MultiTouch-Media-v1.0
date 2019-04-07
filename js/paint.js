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

let linePointer = 0, doRender = true, point = null, line = null;
function render(){
    //If we should render and there are lines to render, loop.
    while(doRender && linePointer < lines.length){
        //If there is a point to be drawn and its the first point...
        if(lines[linePointer].hasNext && lines[linePointer].drawPointer == 0){ 
            //Start a new path, and set some vars related to this line.
            ctx.beginPath();
            ctx.lineWidth = lines[linePointer].width;
            ctx.strokeStyle = lines[linePointer].color;
            //Keeps lines looking like they are connected.
            ctx.lineCap = "round";
            //Set the starting point for the line.
            point = lines[linePointer].next();
            //Move the canvas 'pen' to the first point.
            ctx.moveTo(point.x, point.y);
        }
        //While there are points to draw...
        while(lines[linePointer].hasNext){
            //Get the point
            point = lines[linePointer].next();
            //Draw from the previous point to the current point.
            ctx.lineTo(point.x, point.y);
            //Output the results.
            ctx.stroke();
        }
            //If the line is done being drawn by the user
           //then we can imply that all of its points have been drawn by the loop above.
          //Keep in mind that this code runs every 15ms, but is still sequential, 
         //so `finished` would have been set prior to render being called,
        //which implies that all of the points are preset in the line when render is called.
        if(lines[linePointer].finished) {
            //Move on to the next line.
            linePointer++;
            //If there are no more lines to process, stop rendering.
            if(linePointer == lines.length) doRender = false;
        }
        //If the line is not finished being drawn
        //And there is no next point, stop trying to render.
        else if(!lines[linePointer].hasNext) doRender = false;
    }
}

function drawPoint(pos){
    //If the last line to be drawn is finished, make a new line to draw.
    if(lines.length == 0 || lines[lines.length - 1].finished == true) lines.push(new Line(lineColor, lineWidth));
    //Push the point back to the most recent line.
    let copy = lines[lines.length - 1].push(pos);
    if(!copy) doRender = true;
    if(renderInterval == null) renderInterval = setInterval(render, 15);
}


  //Informs that this line is done being drawn.
 //Called whenever a the color/width/many other 
//This because is lines can only have one color and width on the canvas.
function touchEnd(){
    if(lines.length > 0) lines[lines.length - 1].finished = true;
    doRender = true;
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
