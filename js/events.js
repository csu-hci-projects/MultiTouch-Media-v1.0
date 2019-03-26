//Once the document is fully rendered run the jQuery stuff!
$(document).ready(function(){    
    Paint_onLoad();
    var touches = [];
    var clicking = false;
 
    $('canvas, img').on('mousedown', function(e){
        clicking = true;
        drawPoint(getMousePos(e)); 
    }); 
    
    $('canvas, img').on('mousemove', function(e){
        if(clicking) drawPoint(getMousePos(e)); 
    }); 

    $('canvas, img').on('mouseup', function(e){
        if(clicking) {
            drawPoint(getMousePos(e)); 
            touchEnd();
            clicking = false;
        }
    });

    $('canvas, img').on('dblclick', function (e) {
        e.preventDefault();
        increasePenWidth();
    });

    $('canvas, img').on('contextmenu', function (e) {
        e.preventDefault();
        changeColor();
    });

    $('canvas, img').on('touchstart', function(e){ 
        drawPoint(getTouchPos(e, 0));
    });
    
    $('canvas, img').on('touchmove', function(e){
        drawPoint(getTouchPos(e, 0));
    });

    $('canvas, img').on('touchend, touchcancel', function(e){ 
        touchEnd();
    });

    $(window).resize(Paint_onResize);
});
