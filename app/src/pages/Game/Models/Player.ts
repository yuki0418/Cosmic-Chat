import PVector from "./PVector";

export default class Player {
  ctx: CanvasRenderingContext2D | null;
  location: PVector;
  velocity: PVector;
  acceleration: PVector;

  constructor(_ctx: CanvasRenderingContext2D | null, _location: PVector) {
    this.ctx = _ctx;
    this.location = _location;
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
  }

  update() {
    // this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    if(!this.ctx) return;
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.location.x, this.location.y, 10, 0, Math.PI*2, false);
    this.ctx.closePath();
    this.ctx.fill();
  }
}