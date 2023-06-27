// Function Imports
import { box } from './box.mjs';
import { pentagon } from './pentagon.mjs';
import { star } from './star.mjs';

// When the specific drawing is ready to start being drawn
export const callingDrawF = (drawFunction, downX, downY, upX, upY, LWidth, LColor) => {
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