import { map } from "../Game";
import PVector from "./PVector";

export default class Character {
  ctx: CanvasRenderingContext2D | null;
  id: string;
  name: string;
  color: string;
  location: PVector;
  velocity: PVector;
  acceleration: PVector;
  message: string;
  timerMessage: number;
  MESSAGE_SHOWING_TIME = 200;

  constructor(_ctx: CanvasRenderingContext2D | null, _id: string, _name: string, _color,  _location: PVector) {
    this.ctx = _ctx;
    this.id = _id;
    this.name = _name;
    this.color = _color;
    this.location = _location;
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.message = '';
    this.timerMessage = 0;
  }

  update() {
    // this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    
    if(this.location.x <= 0) this.location.x = 0;
    if(this.location.x >= map.width) this.location.x = map.width;
    if(this.location.y <= 0) this.location.y = 0;
    if(this.location.y >= map.height) this.location.y = map.height;
  }

  draw() {
    if(!this.ctx) return;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.location.x, this.location.y, 10, 0, Math.PI*2, false);
    this.ctx.closePath();
    this.ctx.fill();

    this.displayName();

    if(this.timerMessage > 0) {
      this.showMessage();
    };
  }

  applyForce(force: PVector) {
    let f = force.get();
    this.acceleration.add(f);
  }

  setMessage(msg: string) {
    this.message = msg;
    this.timerMessage = this.MESSAGE_SHOWING_TIME;
  }

  showMessage() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.translate(0, -35);
    this.ctx.fillText(this.message, this.location.x, this.location.y);
    this.ctx.translate(0, 35);

    if(this.timerMessage > 0) {
      this.timerMessage--;
    } else {
      this.timerMessage = 0;
      this.message = '';
    }
  }

  displayName() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.translate(0, -15);
    this.ctx.fillText(this.name, this.location.x, this.location.y);
    this.ctx.translate(0, 15);
  }
}