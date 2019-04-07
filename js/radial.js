let circleRadius = 100, 
    toolRadius = 25, 
    fanAngle = 360,
    toolSpace = 2 * toolRadius, 
    combinedRadius = circleRadius + toolSpace,
    fullRadius = combinedRadius + toolRadius,
    deg2rad = Math.PI / 180.0;
let menuOpen = false;
function initMenu(){
    setMenuAttributes();
    setToolAttributes();
    setToolPositions();

    $("#radial > img").on('mousedown', function(e){
        canvasMouseDown(e); 
    });
    $("div#tools img#trash").on('mousedown', resetPainting);
    
    $("div#tools img#undo").on('mousedown', undo);
}

function openMenu(center){
    touchEnd();
    let wDiff = window.innerWidth - (center.x + fullRadius);
    let wZero = center.x - fullRadius;
    if(wDiff < 0) center.x += wDiff;
    else if(wZero < 0) center.x -= wZero;

    let hDiff = window.innerHeight - (center.y + fullRadius);
    let hZero = center.y - fullRadius;
    if(hDiff < 0) center.y += hDiff;
    else if(hZero < 0) center.y -= hZero;
   
    $("#radial").css({top: center.y, left: center.x})
                .animate({opacity: 1}, 100);
    menuOpen = true;
}

function closeMenu(now=false){ 
    menuOpen = false
    //if(now) {
    //   $("#radial").css({opacity: 0,top: -9999,left: -9999});
    //}
    //else {
        $("#radial").animate({opacity: 0}, 100, function(){
            $("#radial").css({top: -9999, left: -9999});
        });
    //}
}

function setMenuAttributes(){
    $("#radial > img").attr({width: 2 * circleRadius + "px", height: 2 * circleRadius + "px"}); 
    $("#radial > img").css({"margin-top": -circleRadius + "px", "margin-left": -circleRadius + "px"});
    closeMenu();
}

function setToolAttributes(){
    $("#tools div").each(function(){
        $(this).css({
            width: 2 * toolRadius,
            height: 2 *toolRadius
        });  
    });
}

function setToolPositions(){
    let $tools = $("#tools img");
    let angleIncrement =  fanAngle / $tools.length;
    let initial = 90 - fanAngle / 2;
    $tools.each(function(index){
        let pos = getRelativePos(initial - index * angleIncrement)
        $(this).css({
            top: pos.y,
            left: pos.x,
            width: 2 * toolRadius,
            height: 2 *toolRadius
        });  
    });
}

function getRelativePos(angle){
    let x = combinedRadius * Math.cos(angle * deg2rad);
    let y = combinedRadius * Math.sin(angle * deg2rad);
    x -= toolRadius;
    y -= toolRadius;
    return {x: x.toFixed(2), y: y.toFixed(2)};
}

$(document).ready(initMenu);
