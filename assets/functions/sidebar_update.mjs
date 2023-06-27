// updates the sidebar when switching drawings
export const sidebarUpdate = (checked, linecolor, fillcolor, keepLineText) => {
    // setting checkbox for fill to be unchecked or checked
    if (checked === "true") {
        document.getElementById("myCheck").checked = true;
    }
    else if (checked === "false") {
        document.getElementById("myCheck").checked = false;
    }

    // setting line color
    let cline = document.getElementById("actual-l-color");
    let lineColorPicker = document.getElementById("myColor");
    cline.innerHTML = linecolor;
    lineColorPicker.value = linecolor;

    // setting fill color
    let cfill = document.getElementById("actual-f-color");
    let fillColorPicker = document.getElementById("myFillColor");
    cfill.innerHTML = fillcolor;
    fillColorPicker.value = fillcolor;

    // slider inputs
    let slider = document.getElementById("myRange");
    let output = document.getElementById("line-w");
    output.innerHTML = keepLineText;
    slider.value = keepLineText;
}