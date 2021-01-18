/* eslint-disable @typescript-eslint/no-useless-constructor */
import io, { Socket } from "socket.io-client";
import PVector from "./PVector";
import Character from './Character';
import PlayerInterface from "../Interfaces/Player.interface";
import { map } from "../Game";

export default class Me extends Character {
  private keys: Array<number> = [];
  private mass: number;
  private socket: typeof Socket;

  constructor(_ctx: CanvasRenderingContext2D | null, _name: string, _color:string, _location: PVector, _socket) {
    super(_ctx, _socket.id, _name, _color, _location);
    this.mass = 10;
    this.socket = _socket;
  }

  initEventListeners(target: Window | HTMLElement) {
    target.addEventListener('keydown', this.keydownHandler.bind(this));
    target.addEventListener('keyup', this.keyupHanndler.bind(this));
  }

  update() {
    this.move();
    const stop = new PVector(-this.velocity.x, -this.velocity.y);
    this.applyForce(stop);
    this.velocity.add(this.acceleration);
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
    this.ctx.arc(this.ctx.canvas.width/2, this.ctx.canvas.height/2, 10, 0, Math.PI*2, false);
    this.ctx.closePath();
    this.ctx.fill();

    this.displayName();

    if(this.timerMessage > 0) {
      this.showMessage();
    };
  }

  displayName() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.translate(0, -15);
    this.ctx.fillText(this.name, this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    this.ctx.translate(0, 15);
  }

  showMessage() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.translate(0, -35);
    this.ctx.fillText(this.message, this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    this.ctx.translate(0, 35);

    if(this.timerMessage > 0) {
      this.timerMessage--;
    } else {
      this.timerMessage = 0;
      this.message = '';
    }
  }

  applyForce(force: PVector) {
    let f = force.get();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  private move() {
    for(let key in this.keys) {
      switch (key) {
        case 'a':
        case 'ArrowLeft':
          this.acceleration.add(new PVector(-1, 0));
          break;

        case 'w': 
        case 'ArrowUp':
          this.acceleration.add(new PVector(0, -1));
          break;

        case 'd':
        case 'ArrowRight':
          this.acceleration.add(new PVector(1, 0));
          break;

        case 's':
        case 'ArrowDown':
          this.acceleration.add(new PVector(0, 1));
          break;
      
        default:
          break;
      }
    }
  }

  private keydownHandler(event) {
    this.keys[event.key] = 1;
  }

  private keyupHanndler(event) {
    delete this.keys[event.key];
  }

  getStatus = () => {
    let status: PlayerInterface = {
      id: this.id,
      name: this.name,
      color: this.color,
      location: {
        x: this.location.x, y: this.location.y
      }
    }
    return status;
  }

  sendStatus = () => {
    this.socket.emit('player-update', this.getStatus());
  }

  sendMessage = (msg) => {
    this.socket.emit('player-send-message', msg);
    this.setMessage(msg);
  }
}