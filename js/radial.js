let radius = 50, iconHeight = 50, deg2rad = Math.PI / 180.0;
function initMenu(){
    $("div#radialWrapper").css({
        width: 0,
        height: 0,
        padding: 0,
        margin: 0
    });
    


}

function openMenu(where){ 
    $("div#radialWrapper").css({top: where.x + "px", left: where.y + "px"});        
    $("a#touchArea").animate({
        top: "-=50px",
        left: "-=50px",
        padding: "100px"});       
    setIconPositions(where, 360)
    $("ul#tools").show();
}

function closeMenu(){
    $("a#touchArea").animate({padding: "0"}, () => {        
        $("div#radialWrapper").css({top: "-9999px", left: "-9999px"});        
    });
}


function setMenuLocation(where){
    $("div#radialWrapper").css({
        top: where.y - radius,
        left: where.x - radius,
    });
}

function setIconPositions(where, fanAngle=360){ 
    let $tools = $("ul#tools").children();
    let numTools = $tools.length;
    
    //How much of the fanAngle each icon occupies.
    let iconAngle = fanAngle / numTools;
    
    //Relative to the unit cirlce (90deg = up)
    let start = 90 + fanAngle/2

    let toolPos = [];
    for (let a = start; a > start -  fanAngle; a -= iconAngle){
        let angle = (a % 360) - (iconAngle / 2)
        let x = Math.round(radius * Math.cos(a * deg2rad));
        let y = Math.round(radius * Math.sin(a * deg2rad));        
        toolPos.push({x: x + where.x, y: y + where.y});
    }
    
    toolPos.map((pos, i) => {
        $($tools[i]).css({
            margin: pos.x,
            left: pos.y
        });
    });
}

/*
 * IDEA:
 *      determine the 'starting' angle of the toolset.
 *          --> Straight up minus half of the total angle
 *          --> 90deg - total/2
 *      
 * */
