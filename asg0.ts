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
  const v1xButton = document.getElementById("v1x") as HTMLInputElement | null;
  const v1yButton = document.getElementById("v1y") as HTMLInputElement | null;
  if (!v1xButton || !v1yButton) {
    console.error("Couldn't find elements v1x and v1y");
    return;
  }

  const v1x = Number(v1xButton.value);
  const v1y = Number(v1yButton.value);

  let v1 = new Vector3([v1x, v1y, 0]);

  const canvasResult = getCanvasAndContext();
  if (canvasResult == undefined) {
    console.log("Failed to retrieve canvas and context.");
    return;
  }
  const { canvas, context: ctx } = canvasResult;

  clearCanvas(canvas, ctx);
  drawVector(v1, "red", ctx);
}

main();
