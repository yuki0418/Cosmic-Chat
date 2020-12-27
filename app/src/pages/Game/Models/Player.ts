/* eslint-disable @typescript-eslint/no-useless-constructor */
import PlayerInterface from "../Interfaces/Player.interface";
import Character from "./Character";
import PVector from "./PVector";

export default class Player extends Character {
  target: PVector;
  maxSpeed: number;

  constructor(_ctx: CanvasRenderingContext2D | null, _id: string, _name: string, _location: PVector) {
    super(_ctx, _id, _name, _location);
    this.target = new PVector(_location.x, _location.y);
    this.maxSpeed = 5;
  }

  update() {
    this.arrive();
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  updateStatus(newStatus: PlayerInterface) {
    this.target = new PVector(newStatus.location.x, newStatus.location.y);
  }

  arrive() {
    let desired = PVector.sub(this.target, this.location);
    let d = desired.mag();
    desired.normalize();

    if(d < 100) {
      let m = PVector.map_range(d, 0, 100, 0, this.maxSpeed);
      desired.mult(m);
    } else {
      desired.mult(this.maxSpeed);
    };

    let steer = PVector.sub(desired, this.velocity);
    steer.limit(0.1);
    this.applyForce(steer);
  }
}