// PLEASE READ
// CurrD just means "Current Drawing"
// it is used a lot through out the code to check which drawing you are currently working with

// functions for the canvas

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

    // check each type of edgecase to determine which drawing to switch to when another gets cleared
    if (D1Bol === "false" && D2Bol === "false" && D3Bol === "false") {
        let output = document.getElementById("current-drawing");
        output.innerHTML = "No Drawing Selected!";
        localStorage.setItem("CurrD", "DN");
    }
    else {
        if (CurrD === "D1") {
            button1.id = "drawing-1";
            button1.disabled = false;
            if (D2Bol === "false" && D3Bol === "true") {
                button3.id = "dis-d3";
                button3.disabled = true;
                localStorage.setItem("CurrD", "D3");
            }
            else {
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
            else {
                button1.id = "dis-d1";
                button1.disabled = true;
                localStorage.setItem("CurrD", "D1");
            }
        }
        else {
            if (D1Bol === "false" && D2Bol === "true") {
                button2.id = "dis-d2";
                button2.disabled = true;
                localStorage.setItem("CurrD", "D2");
            }
            else {
                button1.id = "dis-d1";
                button1.disabled = true;
                localStorage.setItem("CurrD", "D1");
            }
        }
        resetAttr(localStorage.getItem("CurrD"));
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
            document.getElementById("has-loaded").innerHTML = "";
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
            document.getElementById("has-loaded").innerHTML = "";
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
            document.getElementById("has-loaded").innerHTML = "";
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