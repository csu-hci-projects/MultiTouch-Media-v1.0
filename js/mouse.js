$(document).ready(function(){ 
    var $canvas = $("canvas#paint");
    
    $canvas.on('mousedown', handleMouseStart);
    $canvas.on('mousemove', handleMouseDraw);
    $canvas.on('mouseup', handleMouseEnd);
    $(document).on('contextmenu', handleRightClick);
    $canvas.on('wheel', handleScroll)
    
    var mouseDown = false;
    function handleMouseStart(e){
        e.preventDefault();
        if(menuOpen) closeMenu();
        if(e.which == 1) { 
            mouseDown = true;
            drawPoint(getMousePos(e));
        }
    }
    function handleMouseDraw(e){
        e.preventDefault();
        if(e.which == 1 && mouseDown) drawPoint(getMousePos(e));  
    }
    function handleMouseEnd(e){
        e.preventDefault();
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
