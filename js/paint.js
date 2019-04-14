//Made with the good faith of W3Schools;
//https://www.w3schools.com/tags/ref_canvas.asp
let MIN_PEN_WIDTH = 2, PEN_WIDTH_RANGE = 60;
let canvas, ctx, canvasColor = "#FFFFFF", lineColor="#000000", 
    eraserWidth = 26, lineWidth = MIN_PEN_WIDTH, lines = [];
let isErasing = false;
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

let linePointer = 0, lastFinishedLine = 0, doRender = true, point = null, line = null;
function render(){
    if(doRender) linePointer = lastFinishedLine;
    while(doRender && linePointer < lines.length){
        //If the line's first point must be drawn...
        if(lines[linePointer].drawPointer == 0){
            //there is only one point in this line...
            if(lines[linePointer].points.length == 1) {
                 //If the line is done being drawn,
                //Draw a point on the canvas
                if(lines[linePointer].finished) setupLine(true);
                //Oherwise skip this line for now.
                else { linePointer++; continue; }
            } 
            else if(lines[linePointer].points.length > 1) 
                setupLine();     
        }

        //While there are points to draw...
        while(lines[linePointer].hasNext){
            //Get the inext point
            point = lines[linePointer].next();
            //Draw from the previous point to the current point.
            ctx.lineTo(point.x, point.y);
            //Draw the results
            ctx.stroke();
        }
        
         //If the current line is done being drawn by the painter, 
        //skip it on the next render call.
        if(lines[linePointer].finished) lastFinishedLine++;  

        //If the last line is finished,
        //OR we are on the last line and it has no more points to draw,
        //stop rendering.
        if(lastFinishedLine == lines.length - 1 || 
          (linePointer == lines.length - 1 && !lines[linePointer].hasNext))
            doRender = false; 
    }
}
//Setup the canvas to be ready for the next line to be drawn.
function setupLine(isPoint=false){
     //Start a new line
    //This must happen anytime anything about a line changes (Color, width).
    ctx.beginPath();
    //Keeps lines looking like they are connected.
    ctx.lineCap = "round";
    //Set the line and fill color.
    ctx.strokeStyle = lines[linePointer].color;
    ctx.fillStyle = lines[linePointer].color;
    //get the starting point for the line.
    point = lines[linePointer].next();
    //This not a point, so setup for a line
    if(!isPoint){        
        //Move the canvas 'pen' to the first point.
        ctx.moveTo(point.x, point.y); 
        ctx.lineWidth = lines[linePointer].width;
    }
    //Otherwise draw a circle
    else{
        ctx.arc(point.x, point.y, lines[linePointer].width/2, 0, 2 * Math.PI);
        ctx.fill();
    }
}
function drawPoint(pos){
    //If the last line to be drawn is finished, make a new line to draw.
    if(lines.length == 0 || lines[lines.length - 1].finished == true) {
        if(isErasing) lines.push(new Line(eraserWidth, canvasColor));
        else          lines.push(new Line(lineWidth, lineColor));
    }
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
