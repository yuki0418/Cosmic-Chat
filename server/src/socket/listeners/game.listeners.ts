import Player from 'models/Player';
import { Socket } from 'socket.io';

export default class GameListeners {
  // private players: Array<Player> = [];
  constructor(private socket: Socket, private players: Array<Player>) {}

  initListeners(): void {
    this.socket.on('update', (newPlayer: Player) => {
      this.players.forEach((player, index) => {
        if(player.id === newPlayer.id) {
          this.players[index] = newPlayer;
        }
      });

      this.socket.broadcast.emit('update', this.players);
    });

    this.socket.on('player status', (status) => {
      this.socket.broadcast.emit('player status', status);
    })
  }
}