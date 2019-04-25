let menuOpen=true;
function openMenu(){ 
    $("#basic, #widthWrapper, #colorPickerContainer").css({display: "block"});
}

function closeMenu(){
    $("#basic, #widthWrapper, #colorPickerContainer").css({display: "none"});
}

function initBasicMenu(){
    let gestureWidth = $("#gestureArea").width();
    openColorPickerMenu({top: 220, left: 65 + gestureWidth});
    openLineWidthMenu({top: 500, left: 5 + gestureWidth});
}

$(document).ready(initBasicMenu);
