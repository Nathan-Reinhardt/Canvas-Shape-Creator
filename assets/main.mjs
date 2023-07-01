// PLEASE READ
// CurrD just means "Current Drawing"
// it is used a lot through out the code to check which drawing you are currently working with

// Function Imports
import { resetAttr } from './functions/reset_attribute.mjs';
import { updateDrawInfo } from './functions/update_draw_info.mjs';
import { returnFunction } from './functions/return_function.mjs';

// if the user refreshes the page using buttons or refresh icon on browser
window.onbeforeunload = function() {
    localStorage.setItem("refresh", "true");
}

// null cases covered, first time visiting the website
if (localStorage.getItem("firstTime") === null) {
    // creating local storage key value default pairs
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);

    var keys = [
        "checked", "lineWidth", "Save", "Restore", "CurrD",
        "lineColor", "fillColor", "downBool", "opacity",
        "D1Bol", "D2Bol", "D3Bol", "CurrD", "canvClearBol",
        "D1DrawFunction", "D2DrawFunction", "D3DrawFunction",
        "refresh", "DNChecked", "DNLWidth", "DNLColor", "DNFillColor",
        "D1fP", "D2fP", "D3fP", "D1Checked", "D2Checked", "D3Checked",
        "D1FillColor", "D2FillColor", "D3FillColor", "D1LWidth", "D2LWidth",
        "D3LWidth", "D1LColor", "D2LColor", "D3LColor", "firstSave", "howTo"
    ];
    var values = [
        "false", "5", "false", "false", "D1",
        "#ff2c00", "#3b4fff", "false", "false",
        "true", "false", "false", "D1", "true",
        "None", "None", "None", "false",
        "false", "1", "#000000", "#000000",
        "0", "0", "0", "false", "false", "false",
        "#3b4fff", "#3b4fff", "#3b4fff", "5", "5", "5",
        "#ff2c00", "#ff2c00", "#ff2c00", "false", "true"
    ];

    for (let i = 0; i < keys.length; i++) {
        if (localStorage.getItem(keys[i]) === null) {
            localStorage.setItem(keys[i], values[i]);
        }
    }

    let firstTimeDraw = document.getElementById("drawing-1");
    if (firstTimeDraw === null) {
        firstTimeDraw = document.getElementById("dis-d1");
    }
    else {
        firstTimeDraw.id = "dis-d1";
        firstTimeDraw.disabled = true;
    }
    
    localStorage.setItem("D1Bol", "true");

    resetAttr(localStorage.getItem("CurrD"));

    let name = "Drawing #1";
    localStorage.setItem("D1", name);
    let output = document.getElementById("current-drawing");
    output.innerHTML = `${localStorage.getItem("D1")} Selected`;

    localStorage.setItem("firstTime", "false");
}

// if a refresh has occured do this
if (localStorage.getItem("refresh") === "true") {
    // makes the how to button appear in the center of the canvas if the user
    // never presses on the red x for the how to button
    if (localStorage.getItem("howTo") === "true") {
        let firstHowToContainer = document.getElementById("no-start-how-to-container");
        let howToButton = document.getElementById("how-to-but");
        firstHowToContainer.id = "start-how-to-container";
        howToButton.id = "no-how-to-but";
    }

    let setDrawingNum = localStorage.getItem("CurrD");
    var draw1 = document.getElementById("drawing-1");
    var draw2 = document.getElementById("drawing-2");
    var draw3 = document.getElementById("drawing-3");

    // checking if the id has been changed of the button
    if (draw1 === null) {
        draw1 = document.getElementById("dis-d1");
    }
    else if (draw2 === null) {
        draw2 = document.getElementById("dis-d2");
    }
    else if (draw3 === null) {
        draw3 = document.getElementById("dis-d3");
    }

    // on page reload
    if (setDrawingNum !== "D1" && setDrawingNum !== "D2" && setDrawingNum !== "D3") {
        let output = document.getElementById("current-drawing");
        output.innerHTML = "No Drawing Selected!";
        updateDrawInfo(localStorage.getItem("CurrD"));
    }

    if (localStorage.getItem("hasLoaded") === "true") {
        document.getElementById("has-loaded").innerHTML = "Loaded!";
        localStorage.setItem("hasLoaded", "false");
    }

    if (draw1.id === "dis-d1") {
        draw1.id = "drawing-1";
        draw1.disabled = false;
    }
    if (draw2.id === "dis-d2") {
        draw2.id = "drawing-2";
        draw2.disabled = false;
    }
    if (draw3.id === "dis-d3") {
        draw3.id = "drawing-3";
        draw3.disabled = false;
    }

    resetAttr(setDrawingNum);
    localStorage.setItem("refresh", "false");
    returnFunction();
}