(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.box = void 0;

var _canvas_clear = require("./canvas_clear.mjs");

var _fill_checking = require("./fill_checking.mjs");

var _opacity_check = require("./opacity_check.mjs");

// Function Imports
// Box Drawing
var box = function box(downX, downY, upX, upY, LWidth, LColor) {
  var canvas = document.getElementById('canv');

  if (canv.getContext) {
    var ctx = canvas.getContext('2d');
    (0, _canvas_clear.canvasClear)(ctx, canvas); // if restore is false than have opacity and clear has-loaded

    if (localStorage.getItem("Restore") !== "true") {
      (0, _opacity_check.opacityCheck)(ctx);
    }

    ctx.lineWidth = LWidth; // (line width)

    ctx.strokeStyle = LColor; // (line color)

    var drawX = parseInt(downX, 10);
    var drawY = parseInt(downY, 10);
    var drawEndX = parseInt(upX, 10);
    var drawEndY = parseInt(upY, 10); // checking the end point to make sure the drawing is properly constructed

    var diffX = drawEndX - drawX;
    var diffY = drawEndY - drawY;
    ctx.beginPath();
    ctx.moveTo(drawX, drawY);
    ctx.lineTo(drawX + diffX, drawY);
    ctx.lineTo(drawX + diffX, drawY + diffY);
    ctx.lineTo(drawX, drawY + diffY);
    ctx.closePath();
    (0, _fill_checking.fillChecking)(ctx);
  }
};

exports.box = box;

},{"./canvas_clear.mjs":3,"./fill_checking.mjs":4,"./opacity_check.mjs":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callingDrawF = void 0;

var _box = require("./box.mjs");

var _pentagon = require("./pentagon.mjs");

var _star = require("./star.mjs");

// Function Imports
// When the specific drawing is ready to start being drawn
var callingDrawF = function callingDrawF(drawFunction, downX, downY, upX, upY, LWidth, LColor) {
  if (localStorage.getItem(drawFunction) === "Box") {
    (0, _box.box)(downX, downY, upX, upY, LWidth, LColor);
  } else if (localStorage.getItem(drawFunction) === "Pentagon") {
    (0, _pentagon.pentagon)(downX, downY, upX, upY, LWidth, LColor);
  } else if (localStorage.getItem(drawFunction) === "Star") {
    (0, _star.star)(downX, downY, upX, upY, LWidth, LColor);
  }
};

exports.callingDrawF = callingDrawF;

},{"./box.mjs":1,"./pentagon.mjs":7,"./star.mjs":14}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canvasClear = void 0;

// Function to clear canvas only if the first drawing is being drawn
var canvasClear = function canvasClear(ctx, canvas) {
  if (localStorage.getItem("canvClearBol") === "true") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.setItem("canvClearBol", "false");
  }
};

exports.canvasClear = canvasClear;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillChecking = void 0;

// Checking for fill function
var fillChecking = function fillChecking(ctx) {
  if (localStorage.getItem("drawNum") === "D1") {
    if (localStorage.getItem("D1Checked") === "true") {
      // Filled Star if checked
      ctx.fillStyle = localStorage.getItem("D1FillColor");
      ctx.fill();
    }

    ctx.stroke();
  } else if (localStorage.getItem("drawNum") === "D2") {
    if (localStorage.getItem("D2Checked") === "true") {
      // Filled Star if checked
      ctx.fillStyle = localStorage.getItem("D2FillColor");
      ctx.fill();
    }

    ctx.stroke();
  } else if (localStorage.getItem("drawNum") === "D3") {
    if (localStorage.getItem("D3Checked") === "true") {
      // Filled Star if checked
      ctx.fillStyle = localStorage.getItem("D3FillColor");
      ctx.fill();
    }

    ctx.stroke();
  }
};

exports.fillChecking = fillChecking;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fpSetter = void 0;

// when switching drawings, after calling "resetDrawSelection", I want
// the function picker to pick the current selection above the canvas
var fpSetter = function fpSetter(Shape, CurrD) {
  if (Shape === "Box") {
    localStorage.setItem("".concat(CurrD, "fP"), "1");
  } else if (Shape === "Pentagon") {
    localStorage.setItem("".concat(CurrD, "fP"), "2");
  } else if (Shape === "Star") {
    localStorage.setItem("".concat(CurrD, "fP"), "3");
  }
};

exports.fpSetter = fpSetter;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opacityCheck = void 0;

// Checking for opacity
var opacityCheck = function opacityCheck(ctx) {
  if (localStorage.getItem("CurrD") === localStorage.getItem("drawNum")) {
    if (localStorage.getItem("resetopacity") === "false") {
      if (localStorage.getItem("opacity") === "true") {
        ctx.globalAlpha = 0.7;
      } else {
        ctx.globalAlpha = 1;
      }
    } else {
      ctx.globalAlpha = 1;
    }
  }
};

exports.opacityCheck = opacityCheck;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pentagon = void 0;

var _canvas_clear = require("./canvas_clear.mjs");

var _fill_checking = require("./fill_checking.mjs");

var _opacity_check = require("./opacity_check.mjs");

// Function Imports
// Pentagon Drawing
var pentagon = function pentagon(downX, downY, upX, upY, LWidth, LColor) {
  var canvas = document.getElementById('canv');

  if (canv.getContext) {
    var ctx = canvas.getContext('2d');
    (0, _canvas_clear.canvasClear)(ctx, canvas); // if restore is false than have opacity and clear has-loaded

    if (localStorage.getItem("Restore") !== "true") {
      (0, _opacity_check.opacityCheck)(ctx);
    }

    ctx.lineWidth = LWidth; // (line width)

    ctx.strokeStyle = LColor; // (line color)

    var drawX = parseInt(downX, 10);
    var drawY = parseInt(downY, 10);
    var drawEndX = parseInt(upX, 10);
    var drawEndY = parseInt(upY, 10); // checking the end point to make sure the drawing is properly constructed

    var diffX = drawEndX - drawX;

    if (drawEndY < drawY) {
      // when the end Y is smaller than the start Y
      var diffY = drawY - drawEndY;
      ctx.beginPath();
      ctx.moveTo(drawX + diffX / 2, drawEndY);
      ctx.lineTo(drawEndX, drawEndY + diffY / 2.25);
      ctx.lineTo(drawEndX - diffX / 4, drawY);
      ctx.lineTo(drawX + diffX / 4, drawY);
      ctx.lineTo(drawX, drawEndY + diffY / 2.25);
      ctx.closePath();
    } else {
      // when end Y is greater than start Y
      var diffY = drawEndY - drawY;
      ctx.beginPath();
      ctx.moveTo(drawX + diffX / 2, drawY);
      ctx.lineTo(drawEndX, drawY + diffY / 2.25);
      ctx.lineTo(drawEndX - diffX / 4, drawEndY);
      ctx.lineTo(drawX + diffX / 4, drawEndY);
      ctx.lineTo(drawX, drawY + diffY / 2.25);
      ctx.closePath();
    }

    (0, _fill_checking.fillChecking)(ctx);
  }
};

exports.pentagon = pentagon;

},{"./canvas_clear.mjs":3,"./fill_checking.mjs":4,"./opacity_check.mjs":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetAttr = void 0;

var _reset_attribute_helper = require("./reset_attribute_helper.mjs");

var _sidebar_update = require("./sidebar_update.mjs");

// Function Imports
// carrying over previous attributes of a drawing
var resetAttr = function resetAttr(CurrD) {
  (0, _reset_attribute_helper.resetAttrHelper)(CurrD);
  (0, _sidebar_update.sidebarUpdate)(localStorage.getItem("checked"), localStorage.getItem("lineColor"), localStorage.getItem("fillColor"), localStorage.getItem("lineWidth"));
};

exports.resetAttr = resetAttr;

},{"./reset_attribute_helper.mjs":9,"./sidebar_update.mjs":13}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetAttrHelper = void 0;

var _reset_draw_selection = require("./reset_draw_selection.mjs");

// Function Imports
// does all the setting and getting for information carrying over to the sidebar
var resetAttrHelper = function resetAttrHelper(CurrD) {
  localStorage.setItem("checked", localStorage.getItem("".concat(CurrD, "Checked")));
  localStorage.setItem("lineWidth", localStorage.getItem("".concat(CurrD, "LWidth")));
  localStorage.setItem("lineColor", localStorage.getItem("".concat(CurrD, "LColor")));
  localStorage.setItem("fillColor", localStorage.getItem("".concat(CurrD, "FillColor")));
  var selectTitle = document.getElementById("current-selection");

  if (localStorage.getItem("".concat(CurrD, "fP")) === "0") {
    selectTitle.innerHTML = "Current Shape - None";
  } else if (localStorage.getItem("".concat(CurrD, "fP")) === "1") {
    selectTitle.innerHTML = "Current Shape - Box";
  } else if (localStorage.getItem("".concat(CurrD, "fP")) === "2") {
    selectTitle.innerHTML = "Current Shape - Pentagon";
  } else {
    selectTitle.innerHTML = "Current Shape - Star";
  }

  (0, _reset_draw_selection.resetDrawSelection)(localStorage.getItem("".concat(CurrD, "DrawFunction")), CurrD);
};

exports.resetAttrHelper = resetAttrHelper;

},{"./reset_draw_selection.mjs":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetDrawSelection = void 0;

var _fp_setter = require("./fp_setter.mjs");

// Function Imports
// carrying over draw functions when switching drawings
var resetDrawSelection = function resetDrawSelection(Shape, CurrD) {
  localStorage.setItem("".concat(CurrD, "DrawFunction"), Shape);
  (0, _fp_setter.fpSetter)(Shape, CurrD);
};

exports.resetDrawSelection = resetDrawSelection;

},{"./fp_setter.mjs":5}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnFunction = void 0;

var _calling_draw_f = require("./calling_draw_f.mjs");

var _selected_drawing = require("./selected_drawing.mjs");

var _update_draw_info = require("./update_draw_info.mjs");

// Function Imports
// the big function that connects all the other functions together to run
// a process whenever something happens with the application
var returnFunction = function returnFunction() {
  // checking which drawing is the current one saving to variable
  var CurrDraw = localStorage.getItem("CurrD"); // when user calls to load the old drawing

  (0, _selected_drawing.selectedDrawing)();
  var outSelection = document.getElementById("current-selection");

  if (localStorage.getItem("".concat(CurrDraw, "fP")) === "1") {
    outSelection.innerHTML = "Current Shape - Box";
  } else if (localStorage.getItem("".concat(CurrDraw, "fP")) === "2") {
    outSelection.innerHTML = "Current Shape - Pentagon";
  } else if (localStorage.getItem("".concat(CurrDraw, "fP")) === "3") {
    outSelection.innerHTML = "Current Shape - Star";
  } // now to set all shape details for specific current drawing selected


  (0, _update_draw_info.updateDrawInfo)(CurrDraw);

  if (localStorage.getItem("".concat(CurrDraw, "Checked")) === "true") {
    document.getElementById("myCheck").checked = true;
  } else {
    document.getElementById("myCheck").checked = false;
  }

  var keepLineText = localStorage.getItem("".concat(CurrDraw, "LWidth"));
  var linecolor = localStorage.getItem("".concat(CurrDraw, "LColor"));
  var fillcolor = localStorage.getItem("".concat(CurrDraw, "FillColor"));

  if (CurrDraw === "DN") {
    keepLineText = localStorage.getItem("DNLWidth");
    linecolor = localStorage.getItem("DNLColor");
    fillcolor = localStorage.getItem("DNFillColor");
  } // setting line color


  var cline = document.getElementById("actual-l-color");
  var lineColorPicker = document.getElementById("myColor");
  cline.innerHTML = linecolor;
  lineColorPicker.value = linecolor; // setting fill color

  var cfill = document.getElementById("actual-f-color");
  var fillColorPicker = document.getElementById("myFillColor");
  cfill.innerHTML = fillcolor;
  fillColorPicker.value = fillcolor; // slider inputs

  var slider = document.getElementById("myRange");
  var output = document.getElementById("line-w");
  output.innerHTML = keepLineText;
  slider.value = keepLineText; // reseting text for save and load function

  document.getElementById("has-saved").innerHTML = ""; // time to draw for specific slot or to draw an entire artwork
  // that has been saved

  localStorage.setItem("drawNum", "D1");

  if (localStorage.getItem("D1Bol") === "true") {
    (0, _calling_draw_f.callingDrawF)(localStorage.getItem("D1DrawFunction"), localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"), localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"), localStorage.getItem("D1LWidth"), localStorage.getItem("D1LColor"));
  } // drawNum is used inside the drawing functions to check which drawing the
  // application is drawing for to know to use those values for that specific drawing


  localStorage.setItem("drawNum", "D2");

  if (localStorage.getItem("D2Bol") === "true") {
    (0, _calling_draw_f.callingDrawF)(localStorage.getItem("D2DrawFunction"), localStorage.getItem("DD2X"), localStorage.getItem("DD2Y"), localStorage.getItem("DU2X"), localStorage.getItem("DU2Y"), localStorage.getItem("D2LWidth"), localStorage.getItem("D2LColor"));
  }

  localStorage.setItem("drawNum", "D3");

  if (localStorage.getItem("D3Bol") === "true") {
    (0, _calling_draw_f.callingDrawF)(localStorage.getItem("D3DrawFunction"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"), localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"), localStorage.getItem("D3LWidth"), localStorage.getItem("D3LColor"));
  }

  localStorage.setItem("canvClearBol", "true");
  localStorage.setItem("secondTime", "true"); // set this to false to show that load is over

  if (localStorage.getItem("Restore") === "true") {
    localStorage.setItem("Restore", "false");
    localStorage.setItem("hasLoaded", "true");
    location.reload();
  }
};

exports.returnFunction = returnFunction;

},{"./calling_draw_f.mjs":2,"./selected_drawing.mjs":12,"./update_draw_info.mjs":15}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedDrawing = void 0;

// onload for drawing selected
var selectedDrawing = function selectedDrawing() {
  var selectDraw = document.getElementById("current-drawing");
  var curr = localStorage.getItem("CurrD");

  if (curr === "D1") {
    selectDraw.innerHTML = "Drawing #1 Selected";
  } else if (curr === "D2") {
    selectDraw.innerHTML = "Drawing #2 Selected";
  } else if (curr === "D3") {
    selectDraw.innerHTML = "Drawing #3 Selected";
  } else {
    selectDraw.innerHTML = "No Drawing Selected!";
    document.getElementById("current-selection").innerHTML = "Current Shape - None";
  }
};

exports.selectedDrawing = selectedDrawing;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sidebarUpdate = void 0;

// updates the sidebar when switching drawings
var sidebarUpdate = function sidebarUpdate(checked, linecolor, fillcolor, keepLineText) {
  // setting checkbox for fill to be unchecked or checked
  if (checked === "true") {
    document.getElementById("myCheck").checked = true;
  } else if (checked === "false") {
    document.getElementById("myCheck").checked = false;
  } // setting line color


  var cline = document.getElementById("actual-l-color");
  var lineColorPicker = document.getElementById("myColor");
  cline.innerHTML = linecolor;
  lineColorPicker.value = linecolor; // setting fill color

  var cfill = document.getElementById("actual-f-color");
  var fillColorPicker = document.getElementById("myFillColor");
  cfill.innerHTML = fillcolor;
  fillColorPicker.value = fillcolor; // slider inputs

  var slider = document.getElementById("myRange");
  var output = document.getElementById("line-w");
  output.innerHTML = keepLineText;
  slider.value = keepLineText;
};

exports.sidebarUpdate = sidebarUpdate;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.star = void 0;

var _canvas_clear = require("./canvas_clear.mjs");

var _fill_checking = require("./fill_checking.mjs");

var _opacity_check = require("./opacity_check.mjs");

// Function Imports
// Star Drawing
var star = function star(downX, downY, upX, upY, LWidth, LColor) {
  var canvas = document.getElementById('canv');

  if (canv.getContext) {
    var ctx = canvas.getContext('2d');
    (0, _canvas_clear.canvasClear)(ctx, canvas); // if restore is false than have opacity and clear has-loaded

    if (localStorage.getItem("Restore") !== "true") {
      (0, _opacity_check.opacityCheck)(ctx);
    }

    ctx.lineWidth = LWidth; // (line width)

    ctx.strokeStyle = LColor; // (line color)

    var drawX = parseInt(downX, 10);
    var drawY = parseInt(downY, 10);
    var drawEndX = parseInt(upX, 10);
    var drawEndY = parseInt(upY, 10); // checking the end point to make sure the drawing is properly constructed

    var diffX = drawEndX - drawX;

    if (drawEndY < drawY) {
      // when the end Y is smaller than the start Y
      var diffY = drawY - drawEndY;
      ctx.beginPath();
      ctx.moveTo(drawX + diffX / 2, drawEndY);
      ctx.lineTo(drawEndX - diffX / 4, drawY);
      ctx.lineTo(drawX, drawEndY + diffY / 2.25);
      ctx.lineTo(drawEndX, drawEndY + diffY / 2.25);
      ctx.lineTo(drawX + diffX / 4, drawY);
      ctx.closePath();
    } else {
      // when end Y is greater than start Y
      var diffY = drawEndY - drawY;
      ctx.beginPath();
      ctx.moveTo(drawX + diffX / 2, drawY);
      ctx.lineTo(drawEndX - diffX / 4, drawEndY);
      ctx.lineTo(drawX, drawY + diffY / 2.25);
      ctx.lineTo(drawEndX, drawY + diffY / 2.25);
      ctx.lineTo(drawX + diffX / 4, drawEndY);
      ctx.closePath();
    }

    (0, _fill_checking.fillChecking)(ctx);
  }
};

exports.star = star;

},{"./canvas_clear.mjs":3,"./fill_checking.mjs":4,"./opacity_check.mjs":6}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDrawInfo = void 0;

// when the properties of a drawing are changed by a user, update the
// information for the drawing to use
var updateDrawInfo = function updateDrawInfo(CurrD) {
  localStorage.setItem("".concat(CurrD, "Checked"), localStorage.getItem("checked"));
  localStorage.setItem("".concat(CurrD, "LWidth"), localStorage.getItem("lineWidth"));
  localStorage.setItem("".concat(CurrD, "LColor"), localStorage.getItem("lineColor"));
  localStorage.setItem("".concat(CurrD, "FillColor"), localStorage.getItem("fillColor"));
};

exports.updateDrawInfo = updateDrawInfo;

},{}],16:[function(require,module,exports){
"use strict";

var _reset_attribute = require("./functions/reset_attribute.mjs");

var _update_draw_info = require("./functions/update_draw_info.mjs");

var _return_function = require("./functions/return_function.mjs");

// PLEASE READ
// CurrD just means "Current Drawing"
// it is used a lot through out the code to check which drawing you are currently working with
// Function Imports
// if the user refreshes the page using buttons or refresh icon on browser
window.onbeforeunload = function () {
  localStorage.setItem("refresh", "true");
}; // null cases covered, first time visiting the website


if (localStorage.getItem("firstTime") === null) {
  // creating local storage key value default pairs
  var functionPicker = "0";
  localStorage.setItem("fP", functionPicker);
  var keys = ["checked", "lineWidth", "Save", "Restore", "CurrD", "lineColor", "fillColor", "downBool", "opacity", "D1Bol", "D2Bol", "D3Bol", "CurrD", "canvClearBol", "D1DrawFunction", "D2DrawFunction", "D3DrawFunction", "refresh", "DNChecked", "DNLWidth", "DNLColor", "DNFillColor", "D1fP", "D2fP", "D3fP", "D1Checked", "D2Checked", "D3Checked", "D1FillColor", "D2FillColor", "D3FillColor", "D1LWidth", "D2LWidth", "D3LWidth", "D1LColor", "D2LColor", "D3LColor", "firstSave", "howTo"];
  var values = ["false", "5", "false", "false", "D1", "#ff2c00", "#3b4fff", "false", "false", "true", "false", "false", "D1", "true", "None", "None", "None", "false", "false", "1", "#000000", "#000000", "0", "0", "0", "false", "false", "false", "#3b4fff", "#3b4fff", "#3b4fff", "5", "5", "5", "#ff2c00", "#ff2c00", "#ff2c00", "false", "true"];

  for (var i = 0; i < keys.length; i++) {
    if (localStorage.getItem(keys[i]) === null) {
      localStorage.setItem(keys[i], values[i]);
    }
  }

  var firstTimeDraw = document.getElementById("drawing-1");

  if (firstTimeDraw === null) {
    firstTimeDraw = document.getElementById("dis-d1");
  } else {
    firstTimeDraw.id = "dis-d1";
    firstTimeDraw.disabled = true;
  }

  localStorage.setItem("D1Bol", "true");
  (0, _reset_attribute.resetAttr)(localStorage.getItem("CurrD"));
  var name = "Drawing #1";
  localStorage.setItem("D1", name);
  var output = document.getElementById("current-drawing");
  output.innerHTML = "".concat(localStorage.getItem("D1"), " Selected");
  localStorage.setItem("firstTime", "false");
} // if a refresh has occured do this


if (localStorage.getItem("refresh") === "true") {
  // makes the how to button appear in the center of the canvas if the user
  // never presses on the red x for the how to button
  if (localStorage.getItem("howTo") === "true") {
    var firstHowToContainer = document.getElementById("no-start-how-to-container");
    var howToButton = document.getElementById("how-to-but");
    firstHowToContainer.id = "start-how-to-container";
    howToButton.id = "no-how-to-but";
  }

  var setDrawingNum = localStorage.getItem("CurrD");
  var draw1 = document.getElementById("drawing-1");
  var draw2 = document.getElementById("drawing-2");
  var draw3 = document.getElementById("drawing-3"); // checking if the id has been changed of the button

  if (draw1 === null) {
    draw1 = document.getElementById("dis-d1");
  } else if (draw2 === null) {
    draw2 = document.getElementById("dis-d2");
  } else if (draw3 === null) {
    draw3 = document.getElementById("dis-d3");
  } // on page reload


  if (setDrawingNum !== "D1" && setDrawingNum !== "D2" && setDrawingNum !== "D3") {
    var _output = document.getElementById("current-drawing");

    _output.innerHTML = "No Drawing Selected!";
    (0, _update_draw_info.updateDrawInfo)(localStorage.getItem("CurrD"));
  }

  if (localStorage.getItem("hasLoaded") === "true") {
    document.getElementById("has-loaded").innerHTML = "Loaded!";
    localStorage.setItem("hasLoaded", "false");
  }

  if (draw1.id === "dis-d1") {
    draw1.id = "drawing-1";
    draw1.disabled = false;
  }

  if (draw2.id === "dis-d2") {
    draw2.id = "drawing-2";
    draw2.disabled = false;
  }

  if (draw3.id === "dis-d3") {
    draw3.id = "drawing-3";
    draw3.disabled = false;
  }

  (0, _reset_attribute.resetAttr)(setDrawingNum);
  localStorage.setItem("refresh", "false");
  (0, _return_function.returnFunction)();
}

},{"./functions/reset_attribute.mjs":8,"./functions/return_function.mjs":11,"./functions/update_draw_info.mjs":15}]},{},[16]);
