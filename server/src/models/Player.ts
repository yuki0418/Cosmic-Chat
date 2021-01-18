export default class Player {
  id;
  name;
  color;
  location: {
    x: number,
    y: number
  };

  constructor(_id: string, _name: string, _color: string, _location: {x: number, y: number}) {
    this.id = _id;
    this.name = _name;
    this.color = _color;
    this.location = _location;
  }
}