//Once the document is fully rendered run the jQuery stuff!
$(document).ready(function(){    
    Paint_onLoad();
    var touches = [];
    $('canvas, img').on('touchstart', function(e){
    });
    
    $('canvas, img').on('touchmove', function(e){
        let t = e.originalEvent.touches[0];
        let pos = {x: t.pageX, y: t.pageY};
        drawPoint(pos);
    });

    $('canvas, img').on('touchend', function(e){
        touchEnd();
    });

    $('canvas, img').on('touchcancel', function(e){
        touchEnd();
    });    

    $(window).resize(Paint_onResize);
});
