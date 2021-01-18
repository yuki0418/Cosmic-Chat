import Game from '../../models/Game';
import Player from '../../models/Player';
import { Socket } from 'socket.io';

export default class GameListeners {
  // private players: Array<Player> = [];
  constructor(private socket: Socket, private game: Game) {}

  initListeners(): void {
    this.socket.on('join', (player: Player) => {
      let newPlayer = new Player(player.id, player.name, player.color, player.location);
      this.game.players.push(newPlayer);
    });

    this.socket.on('player-update', (player: Player) => {
      this.game.updatePlayer(player);
    });

    this.socket.on('player-send-message', (msg: string) => {
      const ro = {
        id: this.socket.id,
        msg: msg
      }
      this.socket.broadcast.emit('player-send-message', ro);
    });
  }
}