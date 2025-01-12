// references
// https://www.typescriptlang.org/docs/handbook/intro.html
export class Vector3 {
  constructor(opt_src?: any);
  elements: Float32Array;

  set(src: Vector3): Vector3;

  // operations
  add(other: Vector3): Vector3;
  sub(other: Vector3): Vector3;
  div(scalar: number): Vector3;
  mul(scalar: number): Vector3;
  magnitude(): Vector3;
  normalize(): Vector3;
}

export class Vector4 {
  constructor(opt_src?: any);
  elements: Float32Array;
}

export class Matrix4 {
  constructor(opt_src?: any);
  elements: Float32Array;
}
