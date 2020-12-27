import Player from "./Player";
import PlayerInterface from '../Interfaces/Player.interface';
import PVector from "./PVector";
import Me from "./Me";

export default class Players {
  players: Array<Player> = [];
  ctx: CanvasRenderingContext2D;
  me: Me;

  constructor(_ctx: CanvasRenderingContext2D, _me: Me) {
    this.ctx = _ctx;
    this.me = _me;
  }

  drawPlayers() {
    for(let id in this.players) {
      this.players[id].update();
      this.players[id].draw();
    }
  }

  addPlayer(newPlayer: Player) {
    this.players[newPlayer.id] = newPlayer;
  }

  deletePlayer(player: PlayerInterface) {
    delete this.players[player.id];
  }

  update(updatePlayers: Array<PlayerInterface>) {
    updatePlayers.forEach(player => {
      if(player.id === this.me.id) return;
      if(!this.players[player.id]) {
        let newPlayer = new Player(
          this.ctx, player.id, player.name, new PVector(player.location.x, player.location.y)
        );
        this.addPlayer(newPlayer);
      } else {
        this.players[player.id].updateStatus(player);
      }
    });
  }

  removePlayer(id: string) {
    this.players = this.players.filter(player => player.id !== id);
  }

  showMessage(id: string, msg: string) {
    if(this.players[id]) {
      this.players[id]?.setMessage(msg);
    }
  }
}