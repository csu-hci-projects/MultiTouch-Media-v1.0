let lineWidthCanvas, lineWidthCTX, previewX, previewY;
function initLineWidth(){
    lineWidthCanvas = document.getElementById("preview");
    lineWidthCTX = lineWidthCanvas.getContext("2d");
    previewX = 42.5;
    previewY = 42.5; 
    
    $("div#widthwrapper").on("mousedown touchstart", e => e.stopPropagation());
    $("div#slider input[type=range]").on('input', updateLineWidth);
    $("div#widthwrapper div#buttons button").on("mousedown touchstart", updateLineWidth);
    
    setPenWidthByPercent(50);
    updatePreview();
}

function updateLineWidth(){
    setPenWidthByPercent($(this)[0].value);
    updatePreview();
}

function updatePreview(){ 
    let currLineWidth = getCurrentLineWidth();
    $("div#slider input[type=range]").val(100 * (currLineWidth - MIN_PEN_WIDTH) / PEN_WIDTH_RANGE);
    
    lineWidthCTX.clearRect(0, 0, 100, 100); 
    lineWidthCTX.beginPath();
    lineWidthCTX.fillStyle = lineColor
    lineWidthCTX.strokeStyle = "#FF0000";
    lineWidthCTX.lineWidth = 2;
    lineWidthCTX.arc(previewX, previewY, currLineWidth / 2, 0, 2 * Math.PI);
    isErasing ? lineWidthCTX.stroke() : lineWidthCTX.fill();
}

$(document).ready(initLineWidth);
