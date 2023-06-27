// onload for drawing selected
export const selectedDrawing = () => {
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