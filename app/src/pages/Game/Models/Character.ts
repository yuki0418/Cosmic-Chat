import PVector from "./PVector";

export default class Character {
  ctx: CanvasRenderingContext2D | null;
  id: string;
  location: PVector;
  velocity: PVector;
  acceleration: PVector;

  constructor(_ctx: CanvasRenderingContext2D | null, _id: string,  _location: PVector) {
    this.ctx = _ctx;
    this.id = _id;
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

  applyForce(force: PVector) {
    let f = force.get();
    this.acceleration.add(f);
  }
}