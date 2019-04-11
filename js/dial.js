let circleRadius = 100,
    toolRadius = 15,
    fanAngle = 180,
    toolSpace = 4 * toolRadius,
    combinedRadius = circleRadius + toolSpace,
    fullRadius = combinedRadius + toolRadius,
    deg2rad = Math.PI / 180.0;
    menuOpen = false;

function initMenu(){
    // var element = document.getElementById('dial');
    // var options = {debug: false, touchMode: 'knob', wheelSize: '100%', knobSize: '30%', minDegree: null, maxDegree: null};
    // var dial = JogDial(element, options);

    // dial.on("mousemove", function(event){alert('you\'ve moved it') });

    setMenuAttributes();
    setToolPositions();
    setToolAttributes();

    $("#dial > img").on('mousedown', canvasMouseDown);
}

function openMenu(center){
    let wDiff = window.innerWidth - (center.x + fullRadius);
    let wZero = center.x - fullRadius;
    if(wDiff < 0) center.x += wDiff;
    else if(wZero < 0) center.x -= wZero;

    let hDiff = window.innerHeight - (center.y + fullRadius);
    let hZero = center.y - fullRadius;
    if(hDiff < 0) center.y += hDiff;
    else if(hZero < 0) center.y -= hZero;

    $("#dial").css({top: center.y, left: center.x})
        .animate({opacity: 1}, 100);

    $("#tools").css({display: 'block'});
    menuOpen = true;
}

function closeMenu(now=false){
    menuOpen = false
    $("#dial").animate({opacity: 0}, 100, function(){
        $("#dial").css({top: -9999, left: -9999});
    });
}

function setMenuAttributes(){
    $("#dial > img").attr({width: 2 * circleRadius + "px", height: 2 * circleRadius + "px"});
    $("#dial > img").css({"margin-top": -circleRadius + "px", "margin-left": -circleRadius + "px"});
    closeMenu();
}

function setToolAttributes(){
    // $('#tools img#palette').css({width: })

    $("#tools img").each(function(){

        let radius = toolRadius * 2;

        if($(this).hasClass("selected")) {
            radius = radius * 2;
        }

        $(this).css({
            width: radius,
            height: radius
        });
    });
}

function setToolPositions(){
    let $tools = $("#tools img");
    $($tools[0]).addClass("selected");

    let angleIncrement =  fanAngle / $tools.length;
    let initial = 360 - fanAngle / 2;
    $tools.each(function(index){
        let pos = getRelativePos(initial - index * angleIncrement)
        $(this).css({
            top: pos.y,
            left: pos.x
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
