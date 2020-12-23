import Player from '../models/Player';
import { Server, Socket } from 'socket.io';
import GameListeners from './listeners/game.listeners';
import Game from '../models/Game';

export default class GameSocket extends Game{
  private io: Server;

  ioOptions = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    maxHttpBufferSize: 1e8,
  }

  constructor(server: any) {
    super();
    this.io = new Server(server, this.ioOptions);
    // this.io = new Server(server, this.ioOptions).of(this.NAME_SPACE);
  }

  init() {
    this.io.on('connection', (socket: Socket) => {
      console.log('a user connected:', socket.id);
      // let newPlayer = new Player(socket.id, {x: 0, y: 0});
      // this.players.push(newPlayer);
      
      // Disconnet Listener
      socket.on('disconnect', (reason) => {
        console.log('Disconnected:', socket.id, reason);
        // Remove disconnected player
        this.players = this.players.filter(player => player.id !== socket.id);
        socket.broadcast.emit('player-remove', socket.id);
      });

      // Setup Game Listener
      new GameListeners(socket, this).initListeners();
    });;

    setInterval(this.emitPlayersStatus, 100);
  }

  emitPlayersStatus = () => {
    if(this.io) {
      this.io.emit('game-update', this.players);
    }
  }
}