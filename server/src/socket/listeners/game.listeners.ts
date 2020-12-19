import { Socket } from 'socket.io';

export default class GameListeners {
  constructor(private socket: Socket) {}

  initListeners(): void {
    this.socket.on('init', (msg) => {
      console.log('Game Init', this.socket.id, msg);
      this.socket.broadcast.emit('init', msg);
      // this.socket.emit('getMessage', msg);
    });

    this.socket.on('player status', (status) => {
      this.socket.broadcast.emit('player status', status);
    })
  }
}