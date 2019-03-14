//Once the document is fully rendered run the jQuery stuff!
$(document).ready(function(){    
    Paint_onLoad();
    var touches = [];
    $('canvas').on('touchstart', function(e){
        drawPoint(getTouchPos(e, 0));
    });
    
    $('canvas').on('touchmove', function(e){
        drawPoint(getTouchPos(e, 0));
    });

    $('canvas').on('touchend', function(e){ 
        touchEnd();
    });

    $('canvas').on('touchcancel', function(e){
        touchEnd();
    });    

    $(window).resize(Paint_onResize);
    function getTouchPos(event, index){
        let t = event.originalEvent.touches[index];
        let pos = {x: t.pageX, y: t.pageY};
        return pos;
    }
});
