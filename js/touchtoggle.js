$(document).ready(function(){
    $("div#sliderContainer label").hide();
    $("div#sliderContainer").hover(function(){
        $("div#sliderContainer label").show(125);
    }, function(){ 
        $("div#sliderContainer label").hide(125);
    });

    $("input#touchToggle").change(function(){
        let url = location.protocol + '//' + location.host + location.pathname; 
        if($(this).is(":checked") == false) url += "?notouch";
        window.location.href = url;
    });
});
