$(document).ready(function(){
    $("div#tools img#trash").on('mousedown touchstart', () => resetPainting());
    $("div#tools img#undo").on('mousedown touchstart', () => undo());
    $("div#tools img#eraser").on('mousedown touchstart', () => modeToggle());
    $("div#tools img#upload").on('mousedown touchstart', () => getImage());
});

let canTouch = true;
function startTouchButtonTimeout(){
    canTouch = false;
    setTimeout(() => { canTouch = true; }, 125);
}
function getImage(){
    $('#imgUpload').trigger('click');
}

function readURL(){
    var file = document.getElementById("imgUpload").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        document.getElementById('background').style.backgroundImage = "url(" + reader.result + ")";
    }

    if(file){
        reader.readAsDataURL(file);
    } else {}
}

//Saves the current canvas as a png
function saveImage(){
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
    console.log("Trying to save");
}

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
    lineWidth = newWidth;

    updatePreview();
}

function setPenWidthByPercent(percent){
    if(percent > 100 || percent < 0) throw "Percent value was out of range.";
    setPenWidth((PEN_WIDTH_RANGE * (percent / 100)) + MIN_PEN_WIDTH)
}

//Set the pen color to a specific color.
function setColor(colorHex){
    //Set the line color (from paint.js)
    lineColor = colorHex;

    //If they choose a color but are erasing, switch modes for convenience.
    if(isErasing) usePen();
    //Update the lineWidth preview
    updatePreview();
}

//Delete the whole painting
function resetPainting(isUndo=false){
    //Delete the lines we kept record of.
    if(!isUndo) { 
        if(!canTouch) return;
        else startTouchButtonTimeout(); 
        lines = [];
    }
    //Clear the canvas itself.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Put the logo back on the canvas
    addLogoToCanvas();
}

//Delete the last line drawn to the painting
function undo(){  
    if(!canTouch) return;
    else startTouchButtonTimeout();
    //Cut off the last line to be drawn
    lines = lines.slice(0, -1);
    //Reset the painting, but with special conditions.
    resetPainting(true);
    //Reset each lines iterator variables.
    lines.map(line => line.reset());
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
    if(!canTouch) return;
    else startTouchButtonTimeout();
    
    if(isErasing) usePen();
    else useEraser();

    //Update the preview window for the line width selector
    updatePreview();
}

//Get the line width for this draw mode.
function getCurrentLineWidth(){
    return lineWidth;
}

//Opens the linewidth submenu next to the linestyle image.
function handleLineStyleSelect(){
    if(!isLineWidthOpen){
        let where = $("img#lineStyle").offset();
        where.left += 60;
        openLineWidthMenu(where);
        let diffX = $(window).width() - (where.left + $("div#widthwrapper").width() + 25)
        //If the menu would end up off screen, 
        //quickly shift the whole ui over to accommodate.
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

let isColorPickerOpen = false
function handleColorPickerSelect(){
    if(!isColorPickerOpen){
        let where = $("img#palette").offset();
        where.left -=  $("div#colorPickerContainer").width() / 2 - $("div#tools img#palette").width() / 2;
        where.top -= $("div#colorPickerContainer").height();
        openColorPickerMenu(where);
        let diffY = (where.top - 25);
        //If the menu would end up off screen, 
        //quickly shift the whole ui over to accommodate.
        if(diffY < 0) {
            $(".menu").animate({top: "-=" + (diffY - 25)}, 25);
            $("div#colorPickerContainer").animate({top: "-=" + diffY}, 25);
        }
    } else {
        closeColorPickerMenu();
    }
}

function openColorPickerMenu(where){ 
    $("div#colorPickerContainer").css({top: where.top, left: where.left, opacity: 0});
    $("div#colorPickerContainer").animate({opacity: 1}, 25);
    isLineWidthOpen = true;
}

function closeColorPickerMenu(){
    $("div#colorPickerContainer").animate({opacity: 0}, 15, function(){ 
        $("div#colorPickerContainer").css({top: -9999, left: -9999});
    });
    isLineWidthOpen = false
}

function closeSubMenus(){
    closeLineWidthMenu();
    closeColorPickerMenu();
}
