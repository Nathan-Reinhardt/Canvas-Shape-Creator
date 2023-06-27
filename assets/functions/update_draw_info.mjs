// when the properties of a drawing are changed by a user, update the
// information for the drawing to use
export const updateDrawInfo = (CurrD) => {
    localStorage.setItem(`${CurrD}Checked`, localStorage.getItem("checked"));
    localStorage.setItem(`${CurrD}LWidth`, localStorage.getItem("lineWidth"));
    localStorage.setItem(`${CurrD}LColor`, localStorage.getItem("lineColor"));
    localStorage.setItem(`${CurrD}FillColor`, localStorage.getItem("fillColor"));
}