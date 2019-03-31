$(document).ready(function(){
    var canvasWrapper = document.getElementById("canvasWrapper");
    var canvas = document.getElementById("paint");
    var zt = ZingTouch.Region(canvasWrapper);

    //https://github.com/zingchart/zingtouch#getting-started
    zt.bind(canvas, 'tap', handleTap);       //Quick one finger tap
    zt.bind(canvas, 'pan', handlePan);      //Dragging once finger around
    zt.bind(canvas, 'swipe', handleSwipe); //One finger swipe
    zt.bind(canvas, 'distance', handleDistance); //Two fingers for pinch zoom
    zt.bind(canvas, 'rotate', handleRotate);    //One or two fingers moving about a radius.
    
    function handleTap(e){}
    function handlePan(e){}
    function handleSwipe(e){}
    function handleDistance(e){}
    function handleRotate(e){}
});
