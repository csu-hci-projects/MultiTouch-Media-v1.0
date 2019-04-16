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
        
    }
    function handleRotate(e){
    
    }

    function handleTouchStart(e){
        for(let i = 0;i < e.originalEvent.changedTouches.length;i++){
            let touch = e.originalEvent.changedTouches[i];
            let pos = {x: touch.pageX, y: touch.pageY};
            addLine(pos, touch.identifier);    
        }        
    }

    function handleTouchMove(e){ 
        for(let i = 0;i < e.originalEvent.changedTouches.length;i++){
            let touch = e.originalEvent.changedTouches[i];
            let pos = {x: touch.pageX, y: touch.pageY};
            addToLine(pos, touch.identifier);    
        }        
    }

    function handleTouchEnd(e){ 
        for(let i = 0;i < e.originalEvent.changedTouches.length;i++){
            let touch = e.originalEvent.changedTouches[i];
            let pos = {x: touch.pageX, y: touch.pageY};
            finishLine(pos, touch.identifier);    
        }        
    }
});
