$(document).ready(function(){ 
    var $canvas = $("canvas#paint");
    
    $canvas.on('mousedown', handleMouseStart);
    $canvas.on('mousemove', handleMouseDraw);
    $canvas.on('mouseup', handleMouseEnd);

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

});
