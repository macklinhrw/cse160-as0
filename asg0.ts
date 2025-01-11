import { Vector3 } from "./lib/cuon-matrix-cse160";

// DrawRectangle.js
function main() {
  // Retrieve <canvas> element                                <- (1)
  var canvas = document.getElementById("example") as HTMLCanvasElement;
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return;
  }

  // Get the rendering context for 2DCG                      <- (2)
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    console.log("Failed to retrieve the rendering context");
    return;
  }

  // Draw a blue rectangle                                   <- (3)
  let v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(v1, "red", ctx);

  // ctx.fillStyle = "rgba(0, 0, 255, 1.0)"; // Set a blue color
  // ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color
}

// References:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
function drawVector(v: Vector3, color: string, ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = color;
  ctx.beginPath(); // Start a new path
  // Center of canvas
  let centerX = 200;
  let centerY = 200;
  ctx.moveTo(centerX, centerY);
  // NOTE: 0,0 is in topleft
  // Add centerX, subtract centerY
  ctx.lineTo(centerX + v.elements[0] * 20, centerY - v.elements[1] * 20);
  ctx.stroke();
}

main();

export {};
