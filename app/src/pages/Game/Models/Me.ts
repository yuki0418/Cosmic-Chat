/* eslint-disable @typescript-eslint/no-useless-constructor */
import io, { Socket } from "socket.io-client";
import PVector from "./PVector";
import Character from './Character';
import PlayerInterface from "../Interfaces/Player.interface";

export default class Me extends Character {
  private keys: Array<number> = [];
  private mass: number;
  private socket: typeof Socket;

  constructor(_ctx: CanvasRenderingContext2D | null, _location: PVector, _socket) {
    super(_ctx, _socket.id, _location);
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
  }
}