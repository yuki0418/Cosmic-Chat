import PVector from "./PVector";
import io, { Socket } from 'socket.io-client';

export default class Player {
  ctx: CanvasRenderingContext2D | null;
  location: PVector;
  velocity: PVector;
  acceleration: PVector;

  socket: typeof Socket = io('http://localhost:8080');

  constructor(_ctx: CanvasRenderingContext2D | null, _location: PVector) {
    this.ctx = _ctx;
    this.location = _location;
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);

    // Setup socket
    this.initSocket();
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

  initSocket() {
    let interval;
    this.socket.on('connect', () => {
      interval = setInterval(this.sendStatus.bind(this), 500);
    });

    this.socket.on('disconnect', () => {
      clearInterval(interval);
    });

    this.socket.on('player status', (status) => {
      console.log(status);
    });
  }

  sendStatus() {
    let status = {
      sid: this.socket.id,
      location: {
        x: this.location.x, y: this.location.y
      }
    }

    this.socket.emit('player status', status);
  }
}