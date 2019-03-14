//Made with the good faith of W3Schools;
//https://www.w3schools.com/tags/ref_canvas.asp
let canvas, ctx, last, color;
function Paint_onLoad(){
    canvas = document.getElementById("paint");
    ctx = canvas.getContext("2d");
    Paint_onResize();
    touchEnd();
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

function touchEnd(){
    color = getRandomColor();
    ctx.strokeStyle = color;
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

function getTouchPos(event, index){
    let t = event.originalEvent.touches[index];
    let pos = {x: t.pageX, y: t.pageY};
    return pos;
}
