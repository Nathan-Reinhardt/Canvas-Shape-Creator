// Function Imports
import { resetAttr } from './reset_attribute.mjs';
import { resetDrawSelection } from './reset_draw_selection.mjs';
import { clearButtonHelper } from './clear_button_helper.mjs';

// when a button is clicked this occurs
export const mainFunction = (htmlText) => {
    var functionName = "";

    var currD = localStorage.getItem("CurrD");
    let prevShape = localStorage.getItem(`${currD}DrawFunction`);

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

    // saves all properties for the restore to use
    if (htmlText === "Save Artwork") {

        var newSaveKeys = [
            "SD1X", "SD1Y", "SD2X", "SD2Y", "SD3X", "SD3Y", "SU1X", "SU1Y", "SU2X", "SU2Y", "SU3X", "SU3Y",
            "SD1Checked", "SD2Checked", "SD3Checked", "SD1FillColor", "SD2FillColor", "SD3FillColor",
            "SD1LColor", "SD2LColor", "SD3LColor", "SD1LWidth", "SD2LWidth", "SD3LWidth", "SD1Bol", "SD2Bol", "SD3Bol",
            "SD1DrawFunction", "SD2DrawFunction", "SD3DrawFunction", "SD1fP", "SD2fP", "SD3fP"
        ];

        var savedValues = [
            localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"), localStorage.getItem("DD2X"),
            localStorage.getItem("DD2Y"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"),
            localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"), localStorage.getItem("DU2X"),
            localStorage.getItem("DU2Y"), localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"),
            localStorage.getItem("D1Checked"), localStorage.getItem("D2Checked"), localStorage.getItem("D3Checked"),
            localStorage.getItem("D1FillColor"), localStorage.getItem("D2FillColor"), localStorage.getItem("D3FillColor"),
            localStorage.getItem("D1LColor"), localStorage.getItem("D2LColor"), localStorage.getItem("D3LColor"),
            localStorage.getItem("D1LWidth"), localStorage.getItem("D2LWidth"), localStorage.getItem("D3LWidth"),
            localStorage.getItem("D1Bol"), localStorage.getItem("D2Bol"), localStorage.getItem("D3Bol"),
            localStorage.getItem("D1DrawFunction"), localStorage.getItem("D2DrawFunction"), localStorage.getItem("D3DrawFunction"),
            localStorage.getItem("D1fP"), localStorage.getItem("D2fP"), localStorage.getItem("D3fP")
        ];

        for (let i = 0; i < newSaveKeys.length; i++) {
            localStorage.setItem(newSaveKeys[i], savedValues[i]);
        }

        document.getElementById("has-loaded").innerHTML = "";
        document.getElementById("has-saved").innerHTML = "Saved!";

        localStorage.setItem("firstSave", "true");
    }

    // if load drawing is clicked
    else if (htmlText === "Load Artwork") {
        if (localStorage.getItem("firstSave") === "true") {
            // replace all D keys with the SD keys

            localStorage.setItem("DD1X", localStorage.getItem("SD1X"));
            localStorage.setItem("DD1Y", localStorage.getItem("SD1Y"));
            localStorage.setItem("DD2X", localStorage.getItem("SD2X"));
            localStorage.setItem("DD2Y", localStorage.getItem("SD2Y"));
            localStorage.setItem("DD3X", localStorage.getItem("SD3X"));
            localStorage.setItem("DD3Y", localStorage.getItem("SD3Y"));
            localStorage.setItem("DU1X", localStorage.getItem("SU1X"));
            localStorage.setItem("DU1Y", localStorage.getItem("SU1Y"));
            localStorage.setItem("DU2X", localStorage.getItem("SU2X"));
            localStorage.setItem("DU2Y", localStorage.getItem("SU2Y"));
            localStorage.setItem("DU3X", localStorage.getItem("SU3X"));
            localStorage.setItem("DU3Y", localStorage.getItem("SU3Y"));
            localStorage.setItem("D1Checked", localStorage.getItem("SD1Checked"));
            localStorage.setItem("D2Checked", localStorage.getItem("SD2Checked"));
            localStorage.setItem("D3Checked", localStorage.getItem("SD3Checked"));
            localStorage.setItem("D1FillColor", localStorage.getItem("SD1FillColor"));
            localStorage.setItem("D2FillColor", localStorage.getItem("SD2FillColor"));
            localStorage.setItem("D3FillColor", localStorage.getItem("SD3FillColor"));
            localStorage.setItem("D1LColor", localStorage.getItem("SD1LColor"));
            localStorage.setItem("D2LColor", localStorage.getItem("SD2LColor"));
            localStorage.setItem("D3LColor", localStorage.getItem("SD3LColor"));
            localStorage.setItem("D1LWidth", localStorage.getItem("SD1LWidth"));
            localStorage.setItem("D2LWidth", localStorage.getItem("SD2LWidth"));
            localStorage.setItem("D3LWidth", localStorage.getItem("SD3LWidth"));
            localStorage.setItem("D1Bol", localStorage.getItem("SD1Bol"));
            localStorage.setItem("D2Bol", localStorage.getItem("SD2Bol"));
            localStorage.setItem("D3Bol", localStorage.getItem("SD3Bol"));
            localStorage.setItem("D1DrawFunction", localStorage.getItem("SD1DrawFunction"));
            localStorage.setItem("D2DrawFunction", localStorage.getItem("SD2DrawFunction"));
            localStorage.setItem("D3DrawFunction", localStorage.getItem("SD3DrawFunction"));
            localStorage.setItem("D1fP", localStorage.getItem("SD1fP"));
            localStorage.setItem("D2fP", localStorage.getItem("SD2fP"));
            localStorage.setItem("D3fP", localStorage.getItem("SD3fP"));

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

            button1.id = "drawing-1";
            button1.disabled = false;
            button2.id = "drawing-2";
            button2.disabled = false;
            button3.id = "drawing-3";
            button3.disabled = false;

            if (localStorage.getItem("D1Bol") === "true") {
                localStorage.setItem("CurrD", "D1");
                button1.id = "dis-d1";
                button1.disabled = true;
            }
            else if (localStorage.getItem("D2Bol") === "true") {
                localStorage.setItem("CurrD", "D2");
                button2.id = "dis-d2";
                button2.disabled = true;
            }
            else if (localStorage.getItem("D3Bol") === "true") {
                localStorage.setItem("CurrD", "D3");
                button3.id = "dis-d3";
                button3.disabled = true;
            }
            else {
                localStorage.setItem("CurrD", "DN");
            }

            resetAttr(localStorage.getItem("CurrD"));

            document.getElementById("has-saved").innerHTML = "";
            document.getElementById("has-loaded").innerHTML = "Loaded!";

            localStorage.setItem("Restore", "true");
            returnFunction();
        }
    }

    // when the user wants to clear a drawing currently selected (erase it)
    else if (htmlText === "Clear") {
        clearButtonHelper(localStorage.getItem("CurrD"));
        location.reload();
    }

    // selecting box to draw
    else if (htmlText === "Box") {
        functionName = "Box";
        localStorage.setItem("Box", functionName);
        resetDrawSelection("Box", currD);
    }

    // selecting spiral to draw
    else if (htmlText === "Pentagon") {
        functionName = "Pentagon";
        localStorage.setItem("Pentagon", functionName);
        resetDrawSelection("Pentagon", currD);
    }

    // selecting star to draw
    else if (htmlText === "Star") {
        functionName = "Star";
        localStorage.setItem("Star", functionName);
        resetDrawSelection("Star", currD);
    }

    // selecting drawing #1
    else if (htmlText === "Drawing #1") {
        localStorage.setItem("CurrD", "D1");
        draw1.id = "dis-d1";
        draw1.disabled = true;
        localStorage.setItem("D1Bol", "true");

        // change the id of drawing button back when a different button is clicked
        if (draw2.id === "dis-d2") {
            draw2.id = "drawing-2";
            draw2.disabled = false;
        }
        if (draw3.id === "dis-d3") {
            draw3.id = "drawing-3";
            draw3.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #1";
        localStorage.setItem("D1", functionName);
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D1")} Selected`;
    }

    // selecting drawing #2
    else if (htmlText === "Drawing #2") {
        localStorage.setItem("CurrD", "D2");
        draw2.id = "dis-d2";
        draw2.disabled = true;
        localStorage.setItem("D2Bol", "true");

        // change the id of drawing button back when a different button is clicked
        if (draw1.id === "dis-d1") {
            draw1.id = "drawing-1";
            draw1.disabled = false;
        }
        if (draw3.id === "dis-d3") {
            draw3.id = "drawing-3";
            draw3.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #2";
        localStorage.setItem("D2", functionName);
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D2")} Selected`;
    }

    // selecting drawing #3
    else if (htmlText === "Drawing #3") {
        localStorage.setItem("CurrD", "D3");
        draw3.id = "dis-d3";
        draw3.disabled = true;
        localStorage.setItem("D3Bol", "true");

        // change the id of drawing button back when a different button is clicked
        if (draw1.id === "dis-d1") {
            draw1.id = "drawing-1";
            draw1.disabled = false;
        }
        if (draw2.id === "dis-d2") {
            draw2.id = "drawing-2";
            draw2.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #3";
        localStorage.setItem("D3", functionName);
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D3")} Selected`;
    }

    // reseting x and y postions to draw nothing
    if (htmlText === "Box" || htmlText === "Pentagon" || htmlText === "Star") {
        let newShape = localStorage.getItem(`${currD}DrawFunction`);

        if (newShape !== prevShape) {
            localStorage.setItem(`D${currD}X`, "0");
            localStorage.setItem(`D${currD}Y`, "0");
            if (currD === "D1") {
                localStorage.setItem(`DU1X`, "0");
                localStorage.setItem(`DU1Y`, "0");
            }
            else if (currD === "D2") {
                localStorage.setItem(`DU2X`, "0");
                localStorage.setItem(`DU2Y`, "0");
            }
            else if (currD === "D3") {
                localStorage.setItem(`DU3X`, "0");
                localStorage.setItem(`DU3Y`, "0");
            }
        }
        location.reload();
    }
}