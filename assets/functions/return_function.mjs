// Function Imports
import { callingDrawF } from "./calling_draw_f.mjs";
import { selectedDrawing } from "./selected_drawing.mjs";
import { updateDrawInfo } from "./update_draw_info.mjs";

// the big function that connects all the other functions together to run
// a process whenever something happens with the application
export const returnFunction = () => {
    // checking which drawing is the current one saving to variable
    var CurrDraw = localStorage.getItem("CurrD");

    // when user calls to load the old drawing
    selectedDrawing();
    let outSelection = document.getElementById("current-selection");

    if (localStorage.getItem(`${CurrDraw}fP`) === "1") {
        outSelection.innerHTML = "Current Shape - Box";
    }

    else if (localStorage.getItem(`${CurrDraw}fP`) === "2") {
        outSelection.innerHTML = "Current Shape - Pentagon";
    }

    else if (localStorage.getItem(`${CurrDraw}fP`) === "3") {
        outSelection.innerHTML = "Current Shape - Star";
    }

    // now to set all shape details for specific current drawing selected

    updateDrawInfo(CurrDraw);

    if (localStorage.getItem(`${CurrDraw}Checked`) === "true") {
        document.getElementById("myCheck").checked = true;
    }
    else {
        document.getElementById("myCheck").checked = false;
    }

    var keepLineText = localStorage.getItem(`${CurrDraw}LWidth`);
    var linecolor = localStorage.getItem(`${CurrDraw}LColor`);
    var fillcolor = localStorage.getItem(`${CurrDraw}FillColor`);

    if (CurrDraw === "DN") {
        keepLineText = localStorage.getItem("DNLWidth");
        linecolor = localStorage.getItem("DNLColor");
        fillcolor = localStorage.getItem("DNFillColor");
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

    // reseting text for save and load function
    document.getElementById("has-saved").innerHTML = "";

    // time to draw for specific slot or to draw an entire artwork
    // that has been saved

    localStorage.setItem("drawNum", "D1");

    if (localStorage.getItem("D1Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D1DrawFunction"), localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"),
            localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"),
            localStorage.getItem("D1LWidth"), localStorage.getItem("D1LColor")
        );
    }

    // drawNum is used inside the drawing functions to check which drawing the
    // application is drawing for to know to use those values for that specific drawing
    localStorage.setItem("drawNum", "D2");

    if (localStorage.getItem("D2Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D2DrawFunction"), localStorage.getItem("DD2X"), localStorage.getItem("DD2Y"),
            localStorage.getItem("DU2X"), localStorage.getItem("DU2Y"),
            localStorage.getItem("D2LWidth"), localStorage.getItem("D2LColor")
        );
    }

    localStorage.setItem("drawNum", "D3");

    if (localStorage.getItem("D3Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D3DrawFunction"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"),
            localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"),
            localStorage.getItem("D3LWidth"), localStorage.getItem("D3LColor")
        );
    }

    localStorage.setItem("canvClearBol", "true");
    localStorage.setItem("secondTime", "true");

    // set this to false to show that load is over
    if (localStorage.getItem("Restore") === "true") {
        localStorage.setItem("Restore", "false");
        localStorage.setItem("hasLoaded", "true");
        location.reload();
    }
}