import { Server, Socket } from 'socket.io';
import GameListeners from './listeners/game.listeners';

export default class GameSocket {
  private io: Server;
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
      
      // Disconnet Listener
      socket.on('disconnect', (reason) => {
        console.log('Disconnected:', socket.id, reason);
      });

      // Setup Game Listener
      new GameListeners(socket).initListeners();
    });;
  }
}