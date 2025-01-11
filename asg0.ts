import { Vector3 } from "./lib/cuon-matrix-cse160";

// References:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
function main() {
  // on click listener
  const drawButton = document.getElementById("draw");
  drawButton?.addEventListener("click", handleDrawEvent);

  const canvasResult = getCanvasAndContext();
  if (canvasResult == undefined) {
    console.log("Failed to retrieve canvas and context.");
    return;
  }
  const { canvas, context: ctx } = canvasResult;

  clearCanvas(canvas, ctx);

  // draw vector
  let v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(v1, "red", ctx);

  // ctx.fillStyle = "rgba(0, 0, 255, 1.0)"; // Set a blue color
  // ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color
}

const getCanvasAndContext = () => {
  var canvas = document.getElementById("example") as HTMLCanvasElement | null;
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    console.log("Failed to retrieve the rendering context");
    return;
  }

  return { canvas, context: ctx };
};

function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// References:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
function drawVector(v: Vector3, color: string, ctx: CanvasRenderingContext2D) {
  // store so we can restore later
  let oldStrokeStyle = ctx.strokeStyle;

  ctx.strokeStyle = color;
  ctx.beginPath(); // Start a new path
  // Center of canvas
  let centerX = 200;
  let centerY = 200;
  ctx.moveTo(centerX, centerY);
  // NOTE: 0,0 is in topleft
  // Add centerX, subtract from centerY
  ctx.lineTo(centerX + v.elements[0] * 20, centerY - v.elements[1] * 20);
  ctx.stroke();

  // restore stroke style
  ctx.strokeStyle = oldStrokeStyle;
}

function handleDrawEvent() {
  // get inputs
  const v1xInput = document.getElementById("v1x") as HTMLInputElement | null;
  const v1yInput = document.getElementById("v1y") as HTMLInputElement | null;
  if (!v1xInput || !v1yInput) {
    console.error("Couldn't find elements v1x and v1y");
    return;
  }

  const v2xInput = document.getElementById("v2x") as HTMLInputElement | null;
  const v2yInput = document.getElementById("v2y") as HTMLInputElement | null;
  if (!v2xInput || !v2yInput) {
    console.error("Couldn't find elements v2x and v2y");
    return;
  }

  // configure vectors
  const v1x = Number(v1xInput.value);
  const v1y = Number(v1yInput.value);
  let v1 = new Vector3([v1x, v1y, 0]);

  const v2x = Number(v2xInput.value);
  const v2y = Number(v2yInput.value);
  let v2 = new Vector3([v2x, v2y, 0]);

  // get the canvas
  const canvasResult = getCanvasAndContext();
  if (canvasResult == undefined) {
    console.log("Failed to retrieve canvas and context.");
    return;
  }
  const { canvas, context: ctx } = canvasResult;

  // draw
  clearCanvas(canvas, ctx);
  drawVector(v1, "red", ctx);
  drawVector(v2, "blue", ctx);
}

main();
