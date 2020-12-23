import Player from "./Player";

export default class Game {
  players: Array<Player> = [];
  
  constructor() {}

  updatePlayer(newPlayer: Player) {
    this.players.forEach((player, index) => {
      if(player.id === newPlayer.id) {
        this.players[index] = newPlayer;
      }
    });
  }
}