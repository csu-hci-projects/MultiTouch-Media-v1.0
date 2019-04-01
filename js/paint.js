//Made with the good faith of W3Schools;
//https://www.w3schools.com/tags/ref_canvas.asp
let canvas, ctx, last, color;
function Paint_onLoad(){
    canvas = document.getElementById("paint");
    ctx = canvas.getContext("2d");
    Paint_onResize();
    touchEnd();

    $("img#logo").on("load", function(){ 
       let img = document.getElementById("logo");
       ctx.drawImage(img, 15, 15);
       $("img#logo").css({display: 'none'})
    })
}

function Paint_onResize(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function drawPoint(pos){
    //console.log("Drawing point.");
    //console.log(pos);
    if(last !== null) {
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    } 
    last = Object.assign({}, pos);
}

let MIN_PEN_WIDTH = 1, MAX_PEN_WIDTH = 20, PEN_DIFF_SCALAR = 100;
function changePenWidth(diff){
    if(ctx.lineWidth == MIN_PEN_WIDTH || ctx.lineWidth == MAX_PEN_WIDTH) return;
    else {
        let newWidth = ctx.lineWidth + (diff / PEN_DIFF_SCALAR);
        
        if(newWidth < MIN_PEN_WIDTH) newWidth = 1;
        else if(newWidth > MAX_PEN_WIDT) newWidth = 20;

        ctx.lineWidth = newWidth;
    }
}

function changeColor(){
    ctx.strokeStyle = getRandomColor();
}

function touchEnd(){
    // color = getRandomColor();
    // ctx.strokeStyle = color;
    last = null;
   ctx.beginPath();
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
