// Function Imports
import { resetAttrHelper } from './reset_attribute_helper.mjs';
import { sidebarUpdate } from './sidebar_update.mjs';

// carrying over previous attributes of a drawing
export const resetAttr = (CurrD) => {
    resetAttrHelper(CurrD);
    sidebarUpdate(
        localStorage.getItem("checked"), localStorage.getItem("lineColor"),
        localStorage.getItem("fillColor"), localStorage.getItem("lineWidth")
    );
}