$(document).ready(function(){
    var canvasWrapper = document.getElementById("canvasWrapper");
    var canvas = document.getElementById("paint");
    var zt = ZingTouch.Region(canvasWrapper);

    var TwoFingerSwipe = new ZingTouch.Swipe({ numInputs: 2 });

    //https://github.com/zingchart/zingtouch#getting-started
    zt.unbind(canvas);
    //zt.bind(canvas, TwoFingerSwipe, handleSwipe);//Handle a two finger swipe
    zt.bind(canvas, 'distance', handlePinch);   //Two fingers for pinch zoom
    zt.bind(canvas, 'rotate', handleRotate);   //One or two fingers moving about a radius.  
    
    var $canvas = $("canvas#paint");
    $canvas.on('touchstart', handleTouchStart);
    $canvas.on('touchmove', handleTouchMove);
    $canvas.on('touchend touchcancel', handleTouchEnd);
   
    //Kill any attempts to open the god forsaken context menu
    $(document).bind('contextmenu', (e) => { return false; });

    function handleSwipe(e){
        let angle = e.currentDirection;
        //Check that it is a  horizontal swipe
        if((angle > 150 && angle < 210) || (angle < 30 && angle > 330)) changeColor();
    }
    function handlePinch(e){
        openMenu(e.detail.center);    
    }
    function handleRotate(e){
    
    }

    function handleTouchStart(e){
        if(menuOpen) closeMenu(true)     
        //console.log("start");
        //console.log(e.originalEvent.changedTouches);
        for(let i = 0;i < e.originalEvent.touches.length;i++){
            let touch = e.originalEvent.touches[i];
            let pos = {x: touch.pageX, y: touch.pageY};
            addLine(pos, touch.identifier);    
        }        
    }

    function handleTouchMove(e){ 
        //  console.log("move");
        //console.log(e.originalEvent.changedTouches);
        for(let i = 0;i < e.originalEvent.touches.length;i++){
            let touch = e.originalEvent.touches[i];
            let pos = {x: touch.pageX, y: touch.pageY};
            addToLine(pos, touch.identifier);    
        }        
    }

    function handleTouchEnd(e){ 
        for(let i = 0;i < e.originalEvent.touches.length;i++){
            let touch = e.originalEvent.touches[i];
            let pos = {x: touch.pageX, y: touch.pageY};
            finishLine(pos, touch.identifier);    
        }        
    }

    $("div#gestureArea").on("mousedown touchstart", handleGestureTouch);

    function handleGestureTouch(event){
        let center;
        if(lines.length > 0) {
            let points = lines[lines.length - 1].points;
            center = points[points.length - 1];
        } else {
            center = {x: (window.innerWidth / 2) + $(this).width(), y: window.innerHeight / 2}
        }
        openMenu(center);
    }
});

