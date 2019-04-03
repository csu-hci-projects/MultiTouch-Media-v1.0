function openMenu(where){ 
    $("div#radialWrapper").css({top: where.x + "px", left: where.y + "px"});        
    $("a#touchArea").animate({
        top: "-=50px",
        left: "-=50px",
        padding: "100px"});        
}

function closeMenu(){
    $("a#touchArea").animate({padding: "0"}, () => {        
        $("div#radialWrapper").css({top: "-9999px", left: "-9999px"});        
    });
}    
