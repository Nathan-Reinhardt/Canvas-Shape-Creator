// Checking for fill function
export const fillChecking = (ctx) => {
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