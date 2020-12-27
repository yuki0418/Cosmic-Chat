export default class Player {
  id;
  name;
  location: {
    x: number,
    y: number
  };

  constructor(_id: string, _name: string, _location: {x: number, y: number}) {
    this.id = _id;
    this.name = _name;
    this.location = _location;
  }
}