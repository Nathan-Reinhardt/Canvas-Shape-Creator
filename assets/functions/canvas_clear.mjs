// Function to clear canvas only if the first drawing is being drawn
export const canvasClear = (ctx, canvas) => {
    if (localStorage.getItem("canvClearBol") === "true") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.setItem("canvClearBol", "false");
    }
}