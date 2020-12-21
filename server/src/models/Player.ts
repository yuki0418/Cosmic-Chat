export default class Player {
  id;
  location: {
    x: number,
    y: number
  };

  constructor(_id: string, _location: {x: number, y: number}) {
    this.id = _id;
    this.location = _location;
  }
}