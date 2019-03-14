//Once the document is fully rendered run the jQuery stuff!
$(document).ready(function(){    
    Paint_onLoad();
    var touches = [];
    $('canvas').on('touchstart', function(e){
    });
    
    $('canvas').on('touchmove', function(e){
        let t = e.originalEvent.touches[0];
        let pos = {x: t.pageX, y: t.pageY};
        drawPoint(pos);
    });

    $('canvas').on('touchend', function(e){ 
        touchEnd();
    });

    $('canvas').on('touchcancel', function(e){
        touchEnd();
    });    

    $(window).resize(Paint_onResize);
});
