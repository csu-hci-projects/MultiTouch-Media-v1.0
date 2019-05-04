$(document).ready(function(){
    $('img').on('dragstart', function(event) { event.preventDefault(); });
    
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
