$(document).ready(function(){ 
    var $canvas = $("canvas#paint");
    
    $canvas.on('mousedown', handleMouseStart);
    $canvas.on('mousemove', handleMouseDraw);
    $canvas.on('mouseup', handleMouseEnd);
    $(document).on('contextmenu', e => e.preventDefault());
    $(document).on('wheel', handleScroll)
    
    function handleMouseStart(e){
        canvasMouseDown(e);   
    }
    function handleMouseDraw(e){
        if(e.which == 1 && mouseDown) drawPoint(getMousePos(e));  
    }
    function handleMouseEnd(e){
        if(e.which == 1 && mouseDown){    
            drawPoint(getMousePos(e))
            mouseDown = false;
        }
    }

    function handleRightClick(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(e)
        openMenu({x: e.originalEvent.x, y: e.originalEvent.y});
    }

    function handleScroll(e){
        e.preventDefault();
        if(e.originalEvent.deltaY < 0)  changePenWidth(1);
        else                            changePenWidth(-1);
    }

});

var mouseDown = false;
function canvasMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
    if(e.which == 1){    
        if(menuOpen) closeMenu();
        mouseDown = true;
        drawPoint(getMousePos(e));
    } 
    else if(e.which == 3){
        mouseDown = false;
        openMenu({x: e.originalEvent.x, y: e.originalEvent.y});
    }
    else if(menuOpen) closeMenu();
}
