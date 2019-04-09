$(document).ready(function(){
    $("div#tools img#trash").on('mousedown', () => resetPainting());    
    $("div#tools img#undo").on('mousedown', () => undo());
    $("div#tools img#eraser").on('mousedown', () => modeToggle());
});
//Change the pen width by an ammount.
function changePenWidth(diff){
    let newWidth = lineWidth + (diff);
    setPenWidth(newWidth); 
}

//Set the pen width to a (clamped) amount.
let MIN_PEN_WIDTH = 1, MAX_PEN_WIDTH = 18;
function setPenWidth(newWidth){
    //Ensure width is no smaller than the min we set.
    if(newWidth < MIN_PEN_WIDTH) newWidth = MIN_PEN_WIDTH;
    //Ensure width is no larger than the max we set.
    else if(newWidth > MAX_PEN_WIDTH) newWidth = MAX_PEN_WIDTH;
    //Set the new line width.
    lineWidth = newWidth; 
    //Inform paint.js that the last line is finished (due to the width change). 
    touchEnd();
}

//Set the pen color to a specific color.
function setColor(colorHex){
    //Set the line color (from paint.js)
    lineColor = colorHex;
    //Inform paint.js that the last line is finished (due to the color change). 
    touchEnd();
}

//Set the pen color to a random color.
function setRandomColor(){
    setColor(getRandomColor());
}

//Delete the whole painting
function resetPainting(isUndo=false){
    //Delete the lines we kept record of.
    if(!isUndo) lines = [];
    //Reset which line the render function is on.
    linePointer = 0;
    //Clear the canvas itself.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Reset the color, or naw
    //if(!undo) lineColor = "#000000";
    //Reset the width
    lineWidth = 1;
    //Put the logo back on the canvas
    addLogoToCanvas();

    console.log(lines.length + " | " + isUndo)
}

//Delete the last line drawn to the painting
function undo(){ 
    //Cut off the last line to be drawn
    lines = lines.slice(0, -1);
    //Reset the painting, but with special conditions.
    resetPainting(true);
    //We have to re-render everything.
    doRender = true;
    //Reset each lines iterator variables.
    lines.map(line => {
        line.reset();
    });
}

 //Sets the 'edit mode' to be erase
//(really just changes the line color ;))
function useEraser(){
    isErasing = true;
    $("img#eraser").attr('src', "../images/brush.png");
}

 //Sets the 'edit mode' to be draw
//(really just changes the line color ;))
function usePen(){
    isErasing = false;
    $("img#eraser").attr('src', "../images/eraser.png");
}

//Toggle the eraser on and off with a single method! wow!
function modeToggle(){
    if(isErasing) usePen();
    else useEraser();
}
