// Checking for opacity
export const opacityCheck = (ctx) => {
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