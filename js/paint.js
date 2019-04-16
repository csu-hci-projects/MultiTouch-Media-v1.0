//Made with the good faith of W3Schools;
//https://www.w3schools.com/tags/ref_canvas.asp
let MIN_PEN_WIDTH = 2, PEN_WIDTH_RANGE = 60;
let canvas, ctx, canvasColor = "#FFFFFF", lineColor="#000000", 
    lineWidth = MIN_PEN_WIDTH, lines = [];
let isErasing = false;
let renderInterval = null;
function Paint_onLoad(){
    canvas = document.getElementById("paint");
    ctx = canvas.getContext("2d");
    Paint_onResize();

    $("img#logo").on("load", addLogoToCanvas);
    renderInterval = setInterval(render, 15);
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

let point = null;
function render(){
    for(let i = 0;i < lines.length;i++){
        //If this line is finished being drawn by the user and the computer, continue.
        if(lines[i].finshed && !lines[i].hasNext) continue;

        //If this is the first point to be drawn for this line
        if(lines[i].hasNext){
            if(lines[i].points.length == 1 && lines[i].finished) setupPoint(i);
            else setupLine(i);
        }

        while(lines[i].hasNext){
            point = lines[i].next(); 
            //Draw from the previous point to the current point.
            ctx.lineTo(point.x, point.y);
            //Draw the results
            ctx.stroke();
        }
    }
}
function setupPoint(index) { setupLine(index, true); }
//Setup the canvas to be ready for the next line to be drawn.
function setupLine(index, isPoint=false){
     //Start a new line
    //This must happen anytime anything about a line changes (Color, width).
    ctx.beginPath();
    //Keeps lines looking like they are connected.
    ctx.lineCap = "round";
    
    ctx.strokeStyle = lines[index].color;
    ctx.fillStyle = lines[index].color;
    
     //If it is a point peek at the last element, otherwise use the iterator.
    point = isPoint ? lines[index].points[lines[index].points.length - 1] 
                    : lines[index].next();
    if(isPoint){
        //Draw a circle and fill it
        ctx.arc(point.x, point.y, lines[index].width/2, 0, 2 * Math.PI);
        ctx.fill();
        //Resets the settings for this line
        setupLine(index);
    } else {
        let initialPoint = Object.assign({}, lines[index].points[lines[index].drawPointer - 2]);
        ctx.lineWidth = lines[index].width;
        ctx.moveTo(initialPoint.x, initialPoint.y); 
        ctx.lineTo(point.x, point.y);
        ctx.stroke();

    }
}

//Hooked up to mouse events and still works it seems
function drawPoint(pos){
    //If the last line to be drawn is finished, make a new line to draw.
    if(lines.length == 0 || lines[lines.length - 1].finished == true) {
        if(isErasing) lines.push(new Line(lineWidth, canvasColor));
        else          lines.push(new Line(lineWidth, lineColor));
    }
    //Push the point back to the most recent line.
    let copy = lines[lines.length - 1].push(pos);
    if(!copy) doRender = true;
}

function addLine(pos, fid){ 
    if(menuOpen) closeMenu();
    //Make a new line
    let l = new Line(lineWidth, isErasing ? canvasColor : lineColor, fid)
    //Put the point on the line
    l.push(pos);
    lines.push(l);
    //console.log("Added line with fid: " + fid);
}

function getLine(fid){
    for(let i = lines.length - 1;i >= 0;i--)
        if(lines[i].fid == fid) 
            return i;
    return -1;
}

function isValidLine(index){
    return (index > -1 && index < lines.length)
}

function addToLine(pos, fid){
    let i = getLine(fid);
    if(isValidLine(i)) lines[i].push(pos);
    else throw "Could not find line with fid: " + fid + " | found: " + i;
    //console.log("Added to line: " + i + " | fid: " + fid);
}   

function finishLine(pos, fid){ 
    let i = getLine(fid);
    if(isValidLine(i)) lines[i].finished = true;
    else throw "Could not find line with fid: " + fid;
//    lines.map(line => line.reset());
    //console.log("Finished line: " + i + " | fid: " + fid);
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
