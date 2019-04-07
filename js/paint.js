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
    //If there are no lines, or the last line is fully drawn (implies all lines are drawn) return.
    while(doRender){
        if(lines[linePointer].hasNext && lines[linePointer].drawPointer == 0){ 
            ctx.beginPath();
            ctx.lineWidth = lines[linePointer].width;
            ctx.strokeStyle = lines[linePointer].color;
            ctx.lineCap = "round";
            //Set the starting point for the line.
            point = lines[linePointer].next();
            ctx.moveTo(point.x, point.y);
        }

        while(lines[linePointer].hasNext){
            point = lines[linePointer].next();
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        }

         //If this line is finished being drawn by the user, 
        //then all of the points have been drawn for it.
        if(lines[linePointer].finished) {
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
    //Push the point back to the most recent line.
    let copy = lines[lines.length - 1].push(pos);
    if(!copy) doRender = true;
    if(renderInterval == null) renderInterval = setInterval(render, 15);
}

let MIN_PEN_WIDTH = 1, MAX_PEN_WIDTH = 18;
function changePenWidth(diff){
    let newWidth = lineWidth + (diff); // PEN_DIFF_SCALAR);
      
    if(newWidth < MIN_PEN_WIDTH) newWidth = MIN_PEN_WIDTH;
    else if(newWidth > MAX_PEN_WIDTH) newWidth = MAX_PEN_WIDTH;

    lineWidth = newWidth;
    touchEnd();
}

function changeColor(){
    lineColor = getRandomColor();
    touchEnd();
}

function touchEnd(){
    if(lines.length > 0) lines[lines.length - 1].finished = true;
    lines.push(new Line(lineColor, lineWidth));
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
