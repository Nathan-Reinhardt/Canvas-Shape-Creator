// PLEASE READ
// CurrD just means "Current Drawing"
// it is used a lot through out the code to check which drawing you are currently working with

// if the user refreshes the page using buttons or refresh icon on browser
window.onbeforeunload = function() {
    localStorage.setItem("refresh", "true");
}

// functions that need to be initialized at the start

// carrying over previous attributes of a drawing
const resetAttr = (CurrD) => {
    resetAttrHelper(CurrD);
    sidebarUpdate(
        localStorage.getItem("checked"), localStorage.getItem("lineColor"),
        localStorage.getItem("fillColor"), localStorage.getItem("lineWidth")
    );
}

// does all the setting and getting for information carrying over to the sidebar
const resetAttrHelper = (CurrD) => {
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

// carrying over draw functions when switching drawings
const resetDrawSelection = (Shape, CurrD) => {
    localStorage.setItem(`${CurrD}DrawFunction`, Shape);
    fpSetter(Shape, CurrD);
}

// when switching drawings, after calling "resetDrawSelection", I want
// the function picker to pick the current selection above the canvas
const fpSetter = (Shape, CurrD) => {
    if (Shape === "Box") {
        localStorage.setItem(`${CurrD}fP`, "1");
    }

    else if (Shape === "Pentagon") {
        localStorage.setItem(`${CurrD}fP`, "2");
    }

    else if (Shape === "Star") {
        localStorage.setItem(`${CurrD}fP`, "3");
    }
}

// updates the sidebar when switching drawings
const sidebarUpdate = (checked, linecolor, fillcolor, keepLineText) => {
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

// when the properties of a drawing are changed by a user, update the
// information for the drawing to use
const updateDrawInfo = (CurrD) => {
    localStorage.setItem(`${CurrD}Checked`, localStorage.getItem("checked"));
    localStorage.setItem(`${CurrD}LWidth`, localStorage.getItem("lineWidth"));
    localStorage.setItem(`${CurrD}LColor`, localStorage.getItem("lineColor"));
    localStorage.setItem(`${CurrD}FillColor`, localStorage.getItem("fillColor"));
}

// null cases covered, first time visiting the website

if (localStorage.getItem("firstTime") === null) {
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

// functions for the canvas

// when a button is clicked this occurs
const mainFunction = (htmlText) => {
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

// helper function for clearing drawings
const clearButtonHelper = (CurrD) => {
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

// onload for drawing selected
const selectedDrawing = () => {
    let selectDraw = document.getElementById("current-drawing");
    let curr = localStorage.getItem("CurrD");
    if (curr === "D1") {
        selectDraw.innerHTML = "Drawing #1 Selected";
    }
    else if (curr === "D2") {
        selectDraw.innerHTML = "Drawing #2 Selected";
    }
    else if (curr === "D3") {
        selectDraw.innerHTML = "Drawing #3 Selected";
    }
    else {
        selectDraw.innerHTML = "No Drawing Selected!";
        document.getElementById("current-selection").innerHTML = "Current Shape - None";
    }
}

// drawing functions

// Box Drawing
const box = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

        // if restore is false than have opacity and clear has-loaded
        if (localStorage.getItem("Restore") !== "true") {
            opacityCheck(ctx);
        }

        ctx.lineWidth = LWidth;   // (line width)
        ctx.strokeStyle = LColor; // (line color)

        var drawX = parseInt(downX, 10);
        var drawY = parseInt(downY, 10);

        var drawEndX = parseInt(upX, 10);
        var drawEndY = parseInt(upY, 10);

        // checking the end point to make sure the drawing is properly constructed
        var diffX = drawEndX - drawX;
        var diffY = drawEndY - drawY;

        ctx.beginPath();
        ctx.moveTo(drawX, drawY);
        ctx.lineTo((drawX + diffX), drawY);
        ctx.lineTo((drawX + diffX), (drawY + diffY));
        ctx.lineTo(drawX, (drawY + diffY));
        ctx.closePath();

        fillChecking(ctx);
    }
}

// Pentagon Drawing
const pentagon = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

        // if restore is false than have opacity and clear has-loaded
        if (localStorage.getItem("Restore") !== "true") {
            opacityCheck(ctx);
        }

        ctx.lineWidth = LWidth;   // (line width)
        ctx.strokeStyle = LColor; // (line color)

        var drawX = parseInt(downX, 10);
        var drawY = parseInt(downY, 10);

        var drawEndX = parseInt(upX, 10);
        var drawEndY = parseInt(upY, 10);

        // checking the end point to make sure the drawing is properly constructed
        var diffX = drawEndX - drawX;

        if (drawEndY < drawY) {     // when the end Y is smaller than the start Y
            var diffY = drawY - drawEndY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawEndY);
            ctx.lineTo(drawEndX, drawEndY + (diffY / 2.25));
            ctx.lineTo(drawEndX - (diffX / 4), drawY);
            ctx.lineTo(drawX + (diffX / 4), drawY);
            ctx.lineTo(drawX, drawEndY + (diffY / 2.25));
            ctx.closePath();
        } else {    // when end Y is greater than start Y
            var diffY = drawEndY - drawY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawY);
            ctx.lineTo(drawEndX, drawY + (diffY / 2.25));
            ctx.lineTo(drawEndX - (diffX / 4), drawEndY);
            ctx.lineTo(drawX + (diffX / 4), drawEndY);
            ctx.lineTo(drawX, drawY + (diffY / 2.25));
            ctx.closePath();
        }

        fillChecking(ctx);
    }
}

// Star Drawing
const star = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

        // if restore is false than have opacity and clear has-loaded
        if (localStorage.getItem("Restore") !== "true") {
            opacityCheck(ctx);
        }

        ctx.lineWidth = LWidth;   // (line width)
        ctx.strokeStyle = LColor; // (line color)

        var drawX = parseInt(downX, 10);
        var drawY = parseInt(downY, 10);

        var drawEndX = parseInt(upX, 10);
        var drawEndY = parseInt(upY, 10);

        // checking the end point to make sure the drawing is properly constructed
        var diffX = drawEndX - drawX;

        if (drawEndY < drawY) {     // when the end Y is smaller than the start Y
            var diffY = drawY - drawEndY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawEndY);
            ctx.lineTo(drawEndX - (diffX / 4), drawY);
            ctx.lineTo(drawX, drawEndY + (diffY / 2.25));
            ctx.lineTo(drawEndX, drawEndY + (diffY / 2.25));
            ctx.lineTo(drawX + (diffX / 4), drawY);
            ctx.closePath();
        } else {    // when end Y is greater than start Y
            var diffY = drawEndY - drawY;

            ctx.beginPath();
            ctx.moveTo(drawX + (diffX / 2), drawY);
            ctx.lineTo(drawEndX - (diffX / 4), drawEndY);
            ctx.lineTo(drawX, drawY + (diffY / 2.25));
            ctx.lineTo(drawEndX, drawY + (diffY / 2.25));
            ctx.lineTo(drawX + (diffX / 4), drawEndY);
            ctx.closePath();
        }

        fillChecking(ctx);
    }
}

// Function to clear canvas only if the first drawing is being drawn
const canvasClear = (ctx, canvas) => {
    if (localStorage.getItem("canvClearBol") === "true") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.setItem("canvClearBol", "false");
    }
}

// Checking for fill function

const fillChecking = (ctx) => {
    if (localStorage.getItem("drawNum") === "D1") {
        if (localStorage.getItem("D1Checked") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("D1FillColor");
            ctx.fill();
        }
        ctx.stroke();
    }
    else if (localStorage.getItem("drawNum") === "D2") {
        if (localStorage.getItem("D2Checked") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("D2FillColor");
            ctx.fill();
        }
        ctx.stroke();
    }
    else if (localStorage.getItem("drawNum") === "D3") {
        if (localStorage.getItem("D3Checked") === "true") {
            // Filled Star if checked
            ctx.fillStyle = localStorage.getItem("D3FillColor");
            ctx.fill();
        }
        ctx.stroke();
    }
}

// Checking for opacity

const opacityCheck = (ctx) => {
    if (localStorage.getItem("CurrD") === localStorage.getItem("drawNum")) {
        if (localStorage.getItem("resetopacity") === "false") {
            if (localStorage.getItem("opacity") === "true") {
                ctx.globalAlpha = 0.7;
            }
            else {
                ctx.globalAlpha = 1;
            }
        }
        else {
            ctx.globalAlpha = 1;
        }
    }
}

// When the specific drawing is ready to start being drawn
const callingDrawF = (drawFunction, downX, downY, upX, upY, LWidth, LColor) => {
    if (localStorage.getItem(drawFunction) === "Box") {
        box(downX, downY, upX, upY, LWidth, LColor);
    }
    else if (localStorage.getItem(drawFunction) === "Pentagon") {
        pentagon(downX, downY, upX, upY, LWidth, LColor);
    }
    else if (localStorage.getItem(drawFunction) === "Star") {
        star(downX, downY, upX, upY, LWidth, LColor);
    }
}

// the big function that connects all the other functions together to run
// a process whenever something happens with the application
const returnFunction = () => {
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

// if a refresh has occured do this
if (localStorage.getItem("refresh") === "true") {
    let setDrawingNum = localStorage.getItem("CurrD");
    let button1 = document.getElementById("drawing-1");
    let button2 = document.getElementById("drawing-2");
    let button3 = document.getElementById("drawing-3");

    if (button1 === null) {
        button1 = document.getElementById("dis-d1");
    }
    else if (button2 === null) {
        button2 = document.getElementById("dis-d2");
    }
    else if (button3 === null) {
        button3 = document.getElementById("dis-d3");
    }

    if (setDrawingNum === "D1") {
        button1.id = "dis-d1";
        button1.disabled = true;
    }
    else if (setDrawingNum === "D2") {
        button2.id = "dis-d2";
        button2.disabled = true;
    }
    else if (setDrawingNum === "D3") {
        button3.id = "dis-d3";
        button3.disabled = true;
    }
    else {
        let output = document.getElementById("current-drawing");
        output.innerHTML = "No Drawing Selected!";
        updateDrawInfo(localStorage.getItem("CurrD"));
    }

    if (localStorage.getItem("hasLoaded") === "true") {
        document.getElementById("has-loaded").innerHTML = "Loaded!";
        localStorage.setItem("hasLoaded", "false");
    }

    resetAttr(setDrawingNum);
    localStorage.setItem("refresh", "false");
    returnFunction();
}