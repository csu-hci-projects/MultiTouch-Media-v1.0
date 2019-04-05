$(document).ready(function(){ 
    var $canvas = $("canvas#paint");
    
    $canvas.on('mousedown', handleMouseStart);
    $canvas.on('mousemove', handleMouseDraw);
    $canvas.on('mouseup', handleMouseEnd);
    $(document).on('contextmenu', handleRightClick);
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
            touchEnd();
            mouseDown = false;
        }
    }

    function handleRightClick(e){
        e.preventDefault();
        openMenu({x: e.originalEvent.x, y: e.originalEvent.y});
    }

    function handleScroll(e){
        e.preventDefault();
        if(e.originalEvent.deltaY < 0)  changePenWidth(1);
        else                            changePenWidth(-1);
    }

});

var mouseDown = false;
function canvasMouseDown(e, now=false){
    if(menuOpen) closeMenu(now);
    if(now || e.which == 1) {
        mouseDown = true;
        drawPoint(getMousePos(e));
    }
}
