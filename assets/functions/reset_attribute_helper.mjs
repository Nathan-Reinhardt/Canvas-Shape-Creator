// Function Imports
import { resetDrawSelection } from './reset_draw_selection.mjs';

// does all the setting and getting for information carrying over to the sidebar
export const resetAttrHelper = (CurrD) => {
    localStorage.setItem("checked", localStorage.getItem(`${CurrD}Checked`));
    localStorage.setItem("lineWidth", localStorage.getItem(`${CurrD}LWidth`));
    localStorage.setItem("lineColor", localStorage.getItem(`${CurrD}LColor`));
    localStorage.setItem("fillColor", localStorage.getItem(`${CurrD}FillColor`));
    let selectTitle = document.getElementById("current-selection");
    if (localStorage.getItem(`${CurrD}fP`) === "0") {
        selectTitle.innerHTML = "Current Shape - None";
    }
    else if (localStorage.getItem(`${CurrD}fP`) === "1") {
        selectTitle.innerHTML = "Current Shape - Box";
    }
    else if (localStorage.getItem(`${CurrD}fP`) === "2") {
        selectTitle.innerHTML = "Current Shape - Pentagon";
    }
    else {
        selectTitle.innerHTML = "Current Shape - Star";
    }
    resetDrawSelection(localStorage.getItem(`${CurrD}DrawFunction`), CurrD);
}