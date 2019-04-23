var color_picker = iro.ColorPicker('#colorPickerContainer', {
    color: "#1E4D2B",
    width: 225,
});

color_picker.on("color:change", (color, changes) => {
    setColor(color.hexString)
});

$("div#colorPickerContainer").on("mousedown touchstart", e => {
    e.preventDefault();
    e.stopPropagation();
});
