import Player from '../models/Player';
import { Server, Socket } from 'socket.io';
import GameListeners from './listeners/game.listeners';

export default class GameSocket {
  private io: Server;
  private players: Array<Player> = [];
  // private NAME_SPACE:string = '/game';

  ioOptions = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    maxHttpBufferSize: 1e8,
  }

  constructor(server: any) {
    this.io = new Server(server, this.ioOptions);
    // this.io = new Server(server, this.ioOptions).of(this.NAME_SPACE);
  }

  init() {
    this.io.on('connection', (socket: Socket) => {
      console.log('a user connected:', socket.id);
      let newPlayer = new Player(socket.id, {x: 0, y: 0});
      this.players.push(newPlayer);
      
      // Disconnet Listener
      socket.on('disconnect', (reason) => {
        console.log('Disconnected:', socket.id, reason);
        this.players = this.players.filter(player => player.id !== socket.id);
      });

      // Setup Game Listener
      new GameListeners(socket, this.players).initListeners();
    });;
  }
}