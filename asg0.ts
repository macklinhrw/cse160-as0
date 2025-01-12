import { Vector3 } from "./lib/cuon-matrix-cse160";

// References:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
function main() {
  // on click listener
  const drawButton = document.getElementById("draw");
  drawButton?.addEventListener("click", handleDrawEvent);
  const drawOperationButton = document.getElementById("drawop");
  drawOperationButton?.addEventListener("click", handleDrawOperationEvent);

  const canvasResult = getCanvasAndContext();
  if (canvasResult == undefined) {
    console.error("Failed to retrieve canvas and context.");
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
    console.error("Failed to retrieve the <canvas> element");
    return;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to retrieve the rendering context");
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
    console.error("Failed to retrieve canvas and context.");
    return;
  }
  const { canvas, context: ctx } = canvasResult;

  // draw
  clearCanvas(canvas, ctx);
  drawVector(v1, "red", ctx);
  drawVector(v2, "blue", ctx);
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
function handleDrawOperationEvent() {
  // === Same code from handleDrawEvent ===
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
  // ======

  // get operation inputs
  const opSelect = document.getElementById(
    "op-select"
  ) as HTMLSelectElement | null;
  const scalarInput = document.getElementById(
    "scalar"
  ) as HTMLInputElement | null;
  if (!opSelect || !scalarInput) {
    console.error("Couldn't find elements op-select and scalar");
    return;
  }

  // configure values
  const op = opSelect.value;
  const scalar = Number(scalarInput.value);

  // configure vectors, create copies to not modify the originals
  let v1copy = new Vector3();
  v1copy.set(v1);
  let v2copy = new Vector3();
  v2copy.set(v2);

  let v3: Vector3 | null = null;
  let v4: Vector3 | null = null;

  switch (op) {
    case "add":
      v3 = v1copy.add(v2);
      break;
    case "sub":
      v3 = v1copy.sub(v2);
      break;
    case "div":
      v3 = v1copy.div(scalar);
      v4 = v2copy.div(scalar);
      break;
    case "mul":
      v3 = v1copy.mul(scalar);
      v4 = v2copy.mul(scalar);
      break;
    case "mag":
      let m1 = v1copy.magnitude();
      let m2 = v2copy.magnitude();
      console.log("Magnitude v1:", m1);
      console.log("Magnitude v2:", m2);
      return; // Return here, no drawing
    case "norm":
      v3 = v1copy.normalize();
      v4 = v2copy.normalize();
      break;
    case "ang":
      const dot = Vector3.dot(v1copy, v2copy);
      const angleRads = Math.acos(
        dot / (v1copy.magnitude() * v2copy.magnitude())
      );
      const angle = (angleRads * 180) / Math.PI;
      console.log("Angle:", angle);
      break;
    default:
      console.error("No operation was detected, something went wrong.");
      break;
  }

  // get the canvas
  const canvasResult = getCanvasAndContext();
  if (canvasResult == undefined) {
    console.error("Failed to retrieve canvas and context.");
    return;
  }
  const { canvas, context: ctx } = canvasResult;

  // draw
  clearCanvas(canvas, ctx);
  drawVector(v1, "red", ctx);
  drawVector(v2, "blue", ctx);
  if (v3 != null) {
    drawVector(v3, "green", ctx);
  }
  if (v4 != null) {
    drawVector(v4, "green", ctx);
  }
}

main();
