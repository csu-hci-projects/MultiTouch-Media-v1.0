$(document).ready(function(){
    $("div#tools img#trash").on('mousedown touchstart', () => resetPainting());    
    $("div#tools img#undo").on('mousedown touchstart', () => undo());
    $("div#tools img#eraser").on('mousedown touchstart', () => modeToggle());
});
//Change the pen width by an ammount.
function changePenWidth(diff){
    let newWidth = lineWidth + (diff);
    setPenWidth(newWidth); 
}

//Set the pen width to a (clamped) amount.
//for reference: MIN_PEN_WIDTH = 4, MAX_PEN_WIDTH = 40;
function setPenWidth(newWidth){
    //Ensure width is no smaller than the min we set.
    if(newWidth < MIN_PEN_WIDTH) newWidth = MIN_PEN_WIDTH;
    //Ensure width is no larger than the max we set.
    else if(newWidth > PEN_WIDTH_RANGE + MIN_PEN_WIDTH) newWidth = MAX_PEN_WIDTH;
    //Set the new line width.
    if(isErasing) eraserWidth = newWidth;
    else          lineWidth = newWidth; 
    //Inform paint.js that the last line is finished (due to the width change). 
    touchEnd();
}

function setPenWidthByPercent(percent){
    if(percent > 100 || percent < 0) throw "Percent value was out of range.";
    setPenWidth((PEN_WIDTH_RANGE * (percent / 100)) + MIN_PEN_WIDTH)
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

    //Update the preview window for the line width selector
    updatePreview();
}

//Get the line width for this draw mode.
function getCurrentLineWidth(){
    if(isErasing) return eraserWidth;
    else          return lineWidth;
}

//Opens the linewidth submenu next to the linestyle image.
function handleLineStyleSelect(){
    if(!isLineWidthOpen){
        let where = $("img#lineStyle").offset();
        where.left += 60;
        openLineWidthMenu(where);
        //If the menu would end up off screen, shift the whole ui over to accommodate.
        let diffX = $(window).width() - (where.left + $("div#widthwrapper").width() + 25)
        if(diffX < 0) {
            $(".menu").animate({left: "+=" + diffX}, 25);
            $("div#widthwrapper").animate({left: "+=" + diffX}, 25);
        }
    } else {
        closeLineWidthMenu();
    }
}

let isLineWidthOpen = false;
function openLineWidthMenu(where){ 
    $("div#widthwrapper").css({top: where.top, left: where.left, opacity: 0});
    $("div#widthwrapper").animate({opacity: 1}, 25);
    isLineWidthOpen = true;
}

function closeLineWidthMenu(){
    $("div#widthwrapper").animate({opacity: 0}, 15, function(){ 
        $("div#widthwrapper").css({top: -9999, left: -9999});
    });
    isLineWidthOpen = false
}

function closeSubMenus(){
    closeLineWidthMenu();
}
