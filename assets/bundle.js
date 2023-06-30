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

},{"./canvas_clear.mjs":4,"./fill_checking.mjs":6,"./opacity_check.mjs":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonFunction = void 0;

var _reset_attribute = require("./reset_attribute.mjs");

var _reset_draw_selection = require("./reset_draw_selection.mjs");

var _clear_button_helper = require("./clear_button_helper.mjs");

// Function Imports
// when a button is clicked this occurs
var buttonFunction = function buttonFunction(htmlText) {
  var functionName = "";
  var currD = localStorage.getItem("CurrD");
  var prevShape = localStorage.getItem("".concat(currD, "DrawFunction"));
  var draw1 = document.getElementById("drawing-1");
  var draw2 = document.getElementById("drawing-2");
  var draw3 = document.getElementById("drawing-3"); // checking if the id has been changed of the button

  if (draw1 === null) {
    draw1 = document.getElementById("dis-d1");
  } else if (draw2 === null) {
    draw2 = document.getElementById("dis-d2");
  } else if (draw3 === null) {
    draw3 = document.getElementById("dis-d3");
  } // saves all properties for the restore to use


  if (htmlText === "Save Artwork") {
    var newSaveKeys = ["SD1X", "SD1Y", "SD2X", "SD2Y", "SD3X", "SD3Y", "SU1X", "SU1Y", "SU2X", "SU2Y", "SU3X", "SU3Y", "SD1Checked", "SD2Checked", "SD3Checked", "SD1FillColor", "SD2FillColor", "SD3FillColor", "SD1LColor", "SD2LColor", "SD3LColor", "SD1LWidth", "SD2LWidth", "SD3LWidth", "SD1Bol", "SD2Bol", "SD3Bol", "SD1DrawFunction", "SD2DrawFunction", "SD3DrawFunction", "SD1fP", "SD2fP", "SD3fP"];
    var savedValues = [localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"), localStorage.getItem("DD2X"), localStorage.getItem("DD2Y"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"), localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"), localStorage.getItem("DU2X"), localStorage.getItem("DU2Y"), localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"), localStorage.getItem("D1Checked"), localStorage.getItem("D2Checked"), localStorage.getItem("D3Checked"), localStorage.getItem("D1FillColor"), localStorage.getItem("D2FillColor"), localStorage.getItem("D3FillColor"), localStorage.getItem("D1LColor"), localStorage.getItem("D2LColor"), localStorage.getItem("D3LColor"), localStorage.getItem("D1LWidth"), localStorage.getItem("D2LWidth"), localStorage.getItem("D3LWidth"), localStorage.getItem("D1Bol"), localStorage.getItem("D2Bol"), localStorage.getItem("D3Bol"), localStorage.getItem("D1DrawFunction"), localStorage.getItem("D2DrawFunction"), localStorage.getItem("D3DrawFunction"), localStorage.getItem("D1fP"), localStorage.getItem("D2fP"), localStorage.getItem("D3fP")];

    for (var i = 0; i < newSaveKeys.length; i++) {
      localStorage.setItem(newSaveKeys[i], savedValues[i]);
    }

    document.getElementById("has-loaded").innerHTML = "";
    document.getElementById("has-saved").innerHTML = "Saved!";
    localStorage.setItem("firstSave", "true");
  } // if load drawing is clicked
  else if (htmlText === "Load Artwork") {
      if (localStorage.getItem("firstSave") === "true") {
        // replace all D keys with the SD keys
        localStorage.setItem("DD1X", localStorage.getItem("SD1X"));
        localStorage.setItem("DD1Y", localStorage.getItem("SD1Y"));
        localStorage.setItem("DD2X", localStorage.getItem("SD2X"));
        localStorage.setItem("DD2Y", localStorage.getItem("SD2Y"));
        localStorage.setItem("DD3X", localStorage.getItem("SD3X"));
        localStorage.setItem("DD3Y", localStorage.getItem("SD3Y"));
        localStorage.setItem("DU1X", localStorage.getItem("SU1X"));
        localStorage.setItem("DU1Y", localStorage.getItem("SU1Y"));
        localStorage.setItem("DU2X", localStorage.getItem("SU2X"));
        localStorage.setItem("DU2Y", localStorage.getItem("SU2Y"));
        localStorage.setItem("DU3X", localStorage.getItem("SU3X"));
        localStorage.setItem("DU3Y", localStorage.getItem("SU3Y"));
        localStorage.setItem("D1Checked", localStorage.getItem("SD1Checked"));
        localStorage.setItem("D2Checked", localStorage.getItem("SD2Checked"));
        localStorage.setItem("D3Checked", localStorage.getItem("SD3Checked"));
        localStorage.setItem("D1FillColor", localStorage.getItem("SD1FillColor"));
        localStorage.setItem("D2FillColor", localStorage.getItem("SD2FillColor"));
        localStorage.setItem("D3FillColor", localStorage.getItem("SD3FillColor"));
        localStorage.setItem("D1LColor", localStorage.getItem("SD1LColor"));
        localStorage.setItem("D2LColor", localStorage.getItem("SD2LColor"));
        localStorage.setItem("D3LColor", localStorage.getItem("SD3LColor"));
        localStorage.setItem("D1LWidth", localStorage.getItem("SD1LWidth"));
        localStorage.setItem("D2LWidth", localStorage.getItem("SD2LWidth"));
        localStorage.setItem("D3LWidth", localStorage.getItem("SD3LWidth"));
        localStorage.setItem("D1Bol", localStorage.getItem("SD1Bol"));
        localStorage.setItem("D2Bol", localStorage.getItem("SD2Bol"));
        localStorage.setItem("D3Bol", localStorage.getItem("SD3Bol"));
        localStorage.setItem("D1DrawFunction", localStorage.getItem("SD1DrawFunction"));
        localStorage.setItem("D2DrawFunction", localStorage.getItem("SD2DrawFunction"));
        localStorage.setItem("D3DrawFunction", localStorage.getItem("SD3DrawFunction"));
        localStorage.setItem("D1fP", localStorage.getItem("SD1fP"));
        localStorage.setItem("D2fP", localStorage.getItem("SD2fP"));
        localStorage.setItem("D3fP", localStorage.getItem("SD3fP"));
        var button1 = document.getElementById("drawing-1");
        var button2 = document.getElementById("drawing-2");
        var button3 = document.getElementById("drawing-3"); // checking if the id has been changed of the button

        if (button1 === null) {
          button1 = document.getElementById("dis-d1");
        } else if (button2 === null) {
          button2 = document.getElementById("dis-d2");
        } else if (button3 === null) {
          button3 = document.getElementById("dis-d3");
        }

        button1.id = "drawing-1";
        button1.disabled = false;
        button2.id = "drawing-2";
        button2.disabled = false;
        button3.id = "drawing-3";
        button3.disabled = false;

        if (localStorage.getItem("D1Bol") === "true") {
          localStorage.setItem("CurrD", "D1");
          button1.id = "dis-d1";
          button1.disabled = true;
        } else if (localStorage.getItem("D2Bol") === "true") {
          localStorage.setItem("CurrD", "D2");
          button2.id = "dis-d2";
          button2.disabled = true;
        } else if (localStorage.getItem("D3Bol") === "true") {
          localStorage.setItem("CurrD", "D3");
          button3.id = "dis-d3";
          button3.disabled = true;
        } else {
          localStorage.setItem("CurrD", "DN");
        }

        (0, _reset_attribute.resetAttr)(localStorage.getItem("CurrD"));
        document.getElementById("has-saved").innerHTML = "";
        document.getElementById("has-loaded").innerHTML = "Loaded!";
        localStorage.setItem("Restore", "true");
        returnFunction();
      }
    } // when the user wants to clear a drawing currently selected (erase it)
    else if (htmlText === "Clear") {
        (0, _clear_button_helper.clearButtonHelper)(localStorage.getItem("CurrD"));
        location.reload();
      } // selecting box to draw
      else if (htmlText === "Box") {
          functionName = "Box";
          localStorage.setItem("Box", functionName);
          (0, _reset_draw_selection.resetDrawSelection)("Box", currD);
        } // selecting spiral to draw
        else if (htmlText === "Pentagon") {
            functionName = "Pentagon";
            localStorage.setItem("Pentagon", functionName);
            (0, _reset_draw_selection.resetDrawSelection)("Pentagon", currD);
          } // selecting star to draw
          else if (htmlText === "Star") {
              functionName = "Star";
              localStorage.setItem("Star", functionName);
              (0, _reset_draw_selection.resetDrawSelection)("Star", currD);
            } // selecting drawing #1
            else if (htmlText === "Drawing #1") {
                localStorage.setItem("CurrD", "D1");
                draw1.id = "dis-d1";
                draw1.disabled = true;
                localStorage.setItem("D1Bol", "true"); // change the id of drawing button back when a different button is clicked

                if (draw2.id === "dis-d2") {
                  draw2.id = "drawing-2";
                  draw2.disabled = false;
                }

                if (draw3.id === "dis-d3") {
                  draw3.id = "drawing-3";
                  draw3.disabled = false;
                } // when a new drawing is selected I want to keep the old attributes of the drawing


                (0, _reset_attribute.resetAttr)(localStorage.getItem("CurrD"));
                functionName = "Drawing #1";
                localStorage.setItem("D1", functionName);
                var output = document.getElementById("current-drawing");
                output.innerHTML = "".concat(localStorage.getItem("D1"), " Selected");
              } // selecting drawing #2
              else if (htmlText === "Drawing #2") {
                  localStorage.setItem("CurrD", "D2");
                  draw2.id = "dis-d2";
                  draw2.disabled = true;
                  localStorage.setItem("D2Bol", "true"); // change the id of drawing button back when a different button is clicked

                  if (draw1.id === "dis-d1") {
                    draw1.id = "drawing-1";
                    draw1.disabled = false;
                  }

                  if (draw3.id === "dis-d3") {
                    draw3.id = "drawing-3";
                    draw3.disabled = false;
                  } // when a new drawing is selected I want to keep the old attributes of the drawing


                  (0, _reset_attribute.resetAttr)(localStorage.getItem("CurrD"));
                  functionName = "Drawing #2";
                  localStorage.setItem("D2", functionName);

                  var _output = document.getElementById("current-drawing");

                  _output.innerHTML = "".concat(localStorage.getItem("D2"), " Selected");
                } // selecting drawing #3
                else if (htmlText === "Drawing #3") {
                    localStorage.setItem("CurrD", "D3");
                    draw3.id = "dis-d3";
                    draw3.disabled = true;
                    localStorage.setItem("D3Bol", "true"); // change the id of drawing button back when a different button is clicked

                    if (draw1.id === "dis-d1") {
                      draw1.id = "drawing-1";
                      draw1.disabled = false;
                    }

                    if (draw2.id === "dis-d2") {
                      draw2.id = "drawing-2";
                      draw2.disabled = false;
                    } // when a new drawing is selected I want to keep the old attributes of the drawing


                    (0, _reset_attribute.resetAttr)(localStorage.getItem("CurrD"));
                    functionName = "Drawing #3";
                    localStorage.setItem("D3", functionName);

                    var _output2 = document.getElementById("current-drawing");

                    _output2.innerHTML = "".concat(localStorage.getItem("D3"), " Selected");
                  } // reseting x and y postions to draw nothing


  if (htmlText === "Box" || htmlText === "Pentagon" || htmlText === "Star") {
    var newShape = localStorage.getItem("".concat(currD, "DrawFunction"));

    if (newShape !== prevShape) {
      localStorage.setItem("D".concat(currD, "X"), "0");
      localStorage.setItem("D".concat(currD, "Y"), "0");

      if (currD === "D1") {
        localStorage.setItem("DU1X", "0");
        localStorage.setItem("DU1Y", "0");
      } else if (currD === "D2") {
        localStorage.setItem("DU2X", "0");
        localStorage.setItem("DU2Y", "0");
      } else if (currD === "D3") {
        localStorage.setItem("DU3X", "0");
        localStorage.setItem("DU3Y", "0");
      }
    }

    location.reload();
  }
};

exports.buttonFunction = buttonFunction;

},{"./clear_button_helper.mjs":5,"./reset_attribute.mjs":10,"./reset_draw_selection.mjs":12}],3:[function(require,module,exports){
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

},{"./box.mjs":1,"./pentagon.mjs":9,"./star.mjs":16}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearButtonHelper = void 0;

var _reset_attribute = require("./reset_attribute.mjs");

// Funciton Imports
// helper function for clearing drawings
var clearButtonHelper = function clearButtonHelper(CurrD) {
  localStorage.setItem("".concat(CurrD, "Bol"), "false");
  var button1 = document.getElementById("drawing-1");
  var button2 = document.getElementById("drawing-2");
  var button3 = document.getElementById("drawing-3"); // checking if the id has been changed of the button

  if (button1 === null) {
    button1 = document.getElementById("dis-d1");
  } else if (button2 === null) {
    button2 = document.getElementById("dis-d2");
  } else if (button3 === null) {
    button3 = document.getElementById("dis-d3");
  } // grabing whether or not a drawing can be drawn or not


  var D1Bol = localStorage.getItem("D1Bol");
  var D2Bol = localStorage.getItem("D2Bol");
  var D3Bol = localStorage.getItem("D3Bol"); // reseting all the current drawings attributes to be default

  localStorage.setItem("".concat(CurrD, "DrawFunction"), "None");
  localStorage.setItem("".concat(CurrD, "fP"), "0");
  localStorage.setItem("".concat(CurrD, "Checked"), "false");
  localStorage.setItem("".concat(CurrD, "FillColor"), "#3b4fff");
  localStorage.setItem("".concat(CurrD, "LWidth"), "5");
  localStorage.setItem("".concat(CurrD, "LColor"), "#ff2c00"); // check each type of edgecase to determine which drawing to switch to when another gets cleared

  if (CurrD === "D1") {
    button1.id = "drawing-1";
    button1.disabled = false;

    if (D2Bol === "false" && D3Bol === "true") {
      button3.id = "dis-d3";
      button3.disabled = true;
      localStorage.setItem("CurrD", "D3");
    } else if (D2Bol === "true" && D3Bol === "false" || D2Bol === "true" && D3Bol === "true") {
      button2.id = "dis-d2";
      button2.disabled = true;
      localStorage.setItem("CurrD", "D2");
    }
  } else if (CurrD === "D2") {
    if (D1Bol === "false" && D3Bol === "true") {
      button3.id = "dis-d3";
      button3.disabled = true;
      localStorage.setItem("CurrD", "D3");
    } else if (D1Bol === "true" && D3Bol === "false" || D1Bol === "true" && D3Bol === "true") {
      button1.id = "dis-d1";
      button1.disabled = true;
      localStorage.setItem("CurrD", "D1");
    }
  } else if (CurrD === "D3") {
    if (D1Bol === "false" && D2Bol === "true") {
      button2.id = "dis-d2";
      button2.disabled = true;
      localStorage.setItem("CurrD", "D2");
    } else if (D1Bol === "true" && D2Bol === "false" || D1Bol === "true" && D2Bol === "true") {
      button1.id = "dis-d1";
      button1.disabled = true;
      localStorage.setItem("CurrD", "D1");
    }
  }

  if (D1Bol === "false" && D2Bol === "false" && D3Bol === "false") {
    var output = document.getElementById("current-drawing");
    output.innerHTML = "No Drawing Selected!";
    localStorage.setItem("CurrD", "DN");
  }

  (0, _reset_attribute.resetAttr)(localStorage.getItem("CurrD"));
};

exports.clearButtonHelper = clearButtonHelper;

},{"./reset_attribute.mjs":10}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./canvas_clear.mjs":4,"./fill_checking.mjs":6,"./opacity_check.mjs":8}],10:[function(require,module,exports){
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

},{"./reset_attribute_helper.mjs":11,"./sidebar_update.mjs":15}],11:[function(require,module,exports){
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

},{"./reset_draw_selection.mjs":12}],12:[function(require,module,exports){
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

},{"./fp_setter.mjs":7}],13:[function(require,module,exports){
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

},{"./calling_draw_f.mjs":3,"./selected_drawing.mjs":14,"./update_draw_info.mjs":17}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./canvas_clear.mjs":4,"./fill_checking.mjs":6,"./opacity_check.mjs":8}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";

var _reset_attribute = require("./functions/reset_attribute.mjs");

var _update_draw_info = require("./functions/update_draw_info.mjs");

var _return_function = require("./functions/return_function.mjs");

var _button_event = require("./functions/button_event.mjs");

// PLEASE READ
// CurrD just means "Current Drawing"
// it is used a lot through out the code to check which drawing you are currently working with
// Function Imports
// Import for Gulp to add to the bundle
// if the user refreshes the page using buttons or refresh icon on browser
window.onbeforeunload = function () {
  localStorage.setItem("refresh", "true");
}; // null cases covered, first time visiting the website


if (localStorage.getItem("firstTime") === null) {
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
  var setDrawingNum = localStorage.getItem("CurrD");
  var button1 = document.getElementById("drawing-1");
  var button2 = document.getElementById("drawing-2");
  var button3 = document.getElementById("drawing-3");

  if (button1 === null) {
    button1 = document.getElementById("dis-d1");
  } else if (button2 === null) {
    button2 = document.getElementById("dis-d2");
  } else if (button3 === null) {
    button3 = document.getElementById("dis-d3");
  }

  if (setDrawingNum === "D1") {
    button1.id = "dis-d1";
    button1.disabled = true;
  } else if (setDrawingNum === "D2") {
    button2.id = "dis-d2";
    button2.disabled = true;
  } else if (setDrawingNum === "D3") {
    button3.id = "dis-d3";
    button3.disabled = true;
  } else {
    var _output = document.getElementById("current-drawing");

    _output.innerHTML = "No Drawing Selected!";
    (0, _update_draw_info.updateDrawInfo)(localStorage.getItem("CurrD"));
  }

  if (localStorage.getItem("hasLoaded") === "true") {
    document.getElementById("has-loaded").innerHTML = "Loaded!";
    localStorage.setItem("hasLoaded", "false");
  }

  (0, _reset_attribute.resetAttr)(setDrawingNum);
  localStorage.setItem("refresh", "false");
  (0, _return_function.returnFunction)();
}

},{"./functions/button_event.mjs":2,"./functions/reset_attribute.mjs":10,"./functions/return_function.mjs":13,"./functions/update_draw_info.mjs":17}]},{},[18]);
