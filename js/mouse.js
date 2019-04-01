$(document).ready(function(){ 
    var $canvas = $("canvas#paint");
    
    $canvas.on('mousedown', handleMouseStart);
    $canvas.on('mousemove', handleMouseDraw);
    $canvas.on('mouseup', handleMouseEnd);
    $canvas.on('contextmenu', handleColorChange);
    $canvas.on('wheel', handleScroll)
    
    var mouseDown = false;
    function handleMouseStart(e){
        mouseDown = true;
        drawPoint(getMousePos(e));
    }
    function handleMouseDraw(e){
        if(mouseDown) drawPoint(getMousePos(e));  
    }
    function handleMouseEnd(e){
        if(mouseDown){    
            drawPoint(getMousePos(e))
            touchEnd();
            mouseDown = false;
        }
    }

    function handleColorChange(e){
        e.preventDefault();
        changeColor();
    }

    function handleScroll(e){
        if(e.originalEvent.deltaY < 0)  changePenWidth(1);
        else                            changePenWidth(-1);
    }

});
