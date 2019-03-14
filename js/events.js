//Once the document is fully rendered run the jQuery stuff!
$(document).ready(function(){    
    Paint_onLoad();
    var touches = [];
    $('canvas, img').on('touchstart', function(e){ 
        drawPoint(getTouchPos(e, 0));
    });
    
    $('canvas, img').on('touchmove', function(e){
        drawPoint(getTouchPos(e, 0));
    });

    $('canvas, img').on('touchend', function(e){
        touchEnd();
    });

    $('canvas, img').on('touchcancel', function(e){
        touchEnd();
    });    

    $(window).resize(Paint_onResize);
});
