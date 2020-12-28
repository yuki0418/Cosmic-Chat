"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var game_listeners_1 = __importDefault(require("./listeners/game.listeners"));
var Game_1 = __importDefault(require("../models/Game"));
var GameSocket = /** @class */ (function (_super) {
    __extends(GameSocket, _super);
    function GameSocket(server) {
        var _this = _super.call(this) || this;
        _this.ioOptions = {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
            maxHttpBufferSize: 1e8,
        };
        _this.emitPlayersStatus = function () {
            if (_this.io) {
                _this.io.emit('game-update', _this.players);
            }
        };
        _this.io = new socket_io_1.Server(server, _this.ioOptions);
        return _this;
        // this.io = new Server(server, this.ioOptions).of(this.NAME_SPACE);
    }
    GameSocket.prototype.init = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log('a user connected:', socket.id);
            // let newPlayer = new Player(socket.id, {x: 0, y: 0});
            // this.players.push(newPlayer);
            // Disconnet Listener
            socket.on('disconnect', function (reason) {
                console.log('Disconnected:', socket.id, reason);
                // Remove disconnected player
                _this.players = _this.players.filter(function (player) { return player.id !== socket.id; });
                socket.broadcast.emit('player-remove', socket.id);
            });
            // Setup Game Listener
            new game_listeners_1.default(socket, _this).initListeners();
        });
        ;
        setInterval(this.emitPlayersStatus, 100);
    };
    return GameSocket;
}(Game_1.default));
exports.default = GameSocket;
//# sourceMappingURL=gameSocket.js.map