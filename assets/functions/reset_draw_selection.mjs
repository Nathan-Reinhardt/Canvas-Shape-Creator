// Function Imports
import { fpSetter } from './fp_setter.mjs';

// carrying over draw functions when switching drawings
export const resetDrawSelection = (Shape, CurrD) => {
    localStorage.setItem(`${CurrD}DrawFunction`, Shape);
    fpSetter(Shape, CurrD);
}