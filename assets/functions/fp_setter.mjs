// when switching drawings, after calling "resetDrawSelection", I want
// the function picker to pick the current selection above the canvas
export const fpSetter = (Shape, CurrD) => {
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