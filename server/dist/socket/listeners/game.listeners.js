"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __importDefault(require("../../models/Player"));
var GameListeners = /** @class */ (function () {
    // private players: Array<Player> = [];
    function GameListeners(socket, game) {
        this.socket = socket;
        this.game = game;
    }
    GameListeners.prototype.initListeners = function () {
        var _this = this;
        this.socket.on('join', function (player) {
            var newPlayer = new Player_1.default(player.id, player.name, player.location);
            _this.game.players.push(newPlayer);
        });
        this.socket.on('player-update', function (player) {
            _this.game.updatePlayer(player);
        });
        this.socket.on('player-send-message', function (msg) {
            var ro = {
                id: _this.socket.id,
                msg: msg
            };
            _this.socket.broadcast.emit('player-send-message', ro);
        });
    };
    return GameListeners;
}());
exports.default = GameListeners;
//# sourceMappingURL=game.listeners.js.map