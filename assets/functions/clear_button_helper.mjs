// Funciton Imports
import { resetAttr } from "./reset_attribute.mjs";

// helper function for clearing drawings
export const clearButtonHelper = (CurrD) => {
    localStorage.setItem(`${CurrD}Bol`, "false");

    let button1 = document.getElementById("drawing-1");
    let button2 = document.getElementById("drawing-2");
    let button3 = document.getElementById("drawing-3");
    // checking if the id has been changed of the button
    if (button1 === null) {
        button1 = document.getElementById("dis-d1");
    }
    else if (button2 === null) {
        button2 = document.getElementById("dis-d2");
    }
    else if (button3 === null) {
        button3 = document.getElementById("dis-d3");
    }

    // grabing whether or not a drawing can be drawn or not
    let D1Bol = localStorage.getItem("D1Bol");
    let D2Bol = localStorage.getItem("D2Bol");
    let D3Bol = localStorage.getItem("D3Bol");

    // reseting all the current drawings attributes to be default
    localStorage.setItem(`${CurrD}DrawFunction`, "None");
    localStorage.setItem(`${CurrD}fP`, "0");
    localStorage.setItem(`${CurrD}Checked`, "false");
    localStorage.setItem(`${CurrD}FillColor`, "#3b4fff");
    localStorage.setItem(`${CurrD}LWidth`, "5");
    localStorage.setItem(`${CurrD}LColor`, "#ff2c00");

    // check each type of edgecase to determine which drawing to switch to when another gets cleared
    if (CurrD === "D1") {
        button1.id = "drawing-1";
        button1.disabled = false;
        if (D2Bol === "false" && D3Bol === "true") {
            button3.id = "dis-d3";
            button3.disabled = true;
            localStorage.setItem("CurrD", "D3");
        }
        else if (D2Bol === "true" && D3Bol === "false" || D2Bol === "true" && D3Bol === "true") {
            button2.id = "dis-d2";
            button2.disabled = true;
            localStorage.setItem("CurrD", "D2");
        }
    }
    else if (CurrD === "D2") {
        if (D1Bol === "false" && D3Bol === "true") {
            button3.id = "dis-d3";
            button3.disabled = true;
            localStorage.setItem("CurrD", "D3");
        }
        else if (D1Bol === "true" && D3Bol === "false" || D1Bol === "true" && D3Bol === "true") {
            button1.id = "dis-d1";
            button1.disabled = true;
            localStorage.setItem("CurrD", "D1");
        }
    }
    else if (CurrD === "D3") {
        if (D1Bol === "false" && D2Bol === "true") {
            button2.id = "dis-d2";
            button2.disabled = true;
            localStorage.setItem("CurrD", "D2");
        }
        else if (D1Bol === "true" && D2Bol === "false" || D1Bol === "true" && D2Bol === "true") {
            button1.id = "dis-d1";
            button1.disabled = true;
            localStorage.setItem("CurrD", "D1");
        }
    }
    if (D1Bol === "false" && D2Bol === "false" && D3Bol === "false") {
        let output = document.getElementById("current-drawing");
        output.innerHTML = "No Drawing Selected!";
        localStorage.setItem("CurrD", "DN");
    }
    resetAttr(localStorage.getItem("CurrD"));
}