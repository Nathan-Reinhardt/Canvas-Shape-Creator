// Function Imports
import { canvasClear } from './canvas_clear.mjs';
import { fillChecking } from './fill_checking.mjs';
import { opacityCheck } from './opacity_check.mjs';

// Star Drawing
export const star = (downX, downY, upX, upY, LWidth, LColor) => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');
        canvasClear(ctx, canvas);

        // if restore is false than have opacity and clear has-loaded
        if (localStorage.getItem("Restore") !== "true") {
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