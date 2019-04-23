$(document).ready(function(){ 
    var $canvas = $("canvas#paint");
    
    $canvas.on('mousedown', handleMouseStart);
    $canvas.on('mousemove', handleMouseDraw);
    $canvas.on('mouseup', handleMouseEnd);
    $(document).on('contextmenu', e => e.preventDefault());
    $(document).on('wheel', handleScroll)
   
    let mouseDown = false;
    function handleMouseStart(e){
        if(e.which == 1 && !mouseDown){
            addLine(getMousePos(e), 0);
            mouseDown = true;
        } else if(e.which == 3 && !menuOpen) openMenu(getMousePos(e))
    }
    function handleMouseDraw(e){
        if(e.which == 1 && mouseDown) 
            addToLine(getMousePos(e), 0);  
    }
    function handleMouseEnd(e){
        if(e.which == 1 && mouseDown){    
            finishLine(getMousePos(e), 0)
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
