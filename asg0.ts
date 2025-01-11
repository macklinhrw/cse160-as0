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
  let v1 = new Vector3([0, 0, 0]);
  console.log(v1);
  drawVector(v1, "red", ctx);

  // ctx.fillStyle = "rgba(0, 0, 255, 1.0)"; // Set a blue color
  // ctx.fillRect(120, 10, 150, 150); // Fill a rectangle with the color
}

function drawVector(v: Vector3, color: string, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = color;
  ctx.lineTo(v.elements[0] * 0, v.elements[1] * 20);
}

main();

export {};
