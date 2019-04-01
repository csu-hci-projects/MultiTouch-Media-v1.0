$(document).ready(function(){
    var canvasWrapper = document.getElementById("canvasWrapper");
    var canvas = document.getElementById("paint");
    var zt = ZingTouch.Region(canvasWrapper);

    var TwoFingerSwipe = new ZingTouch.Swipe({ numInputs: 2 });

    //https://github.com/zingchart/zingtouch#getting-started
    zt.unbind(canvas);
    zt.bind(canvas, TwoFingerSwipe, handleSwipe);//Handle a two finger swipe
    zt.bind(canvas, 'distance', handlePinch);   //Two fingers for pinch zoom
    zt.bind(canvas, 'rotate', handleRotate);   //One or two fingers moving about a radius.  
    
    var $canvas = $("canvas#paint");
    $canvas.on('touchstart', handleDraw);
    $canvas.on('touchmove', handleDraw);
    $canvas.on('touchend, touchcancel', touchEnd);

    function handleDraw(e){
        //This method does not deal with any more than one finger!
        if(e.originalEvent.touches.length > 1) return;
        drawPoint(getTouchPos(e))
    }
    function handleSwipe(e){
        let angle = e.currentDirection;
        //Check that it is a  horizontal swipe
        if((angle > 150 && angle < 210) || (angle < 30 && angle > 330)) changeColor();
    }
    function handlePinch(e){
        changePenWidth(e.change);
    }
    function handleRotate(e){}
});
