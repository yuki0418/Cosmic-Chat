"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game() {
        this.players = [];
    }
    Game.prototype.updatePlayer = function (newPlayer) {
        var _this = this;
        this.players.forEach(function (player, index) {
            if (player.id === newPlayer.id) {
                _this.players[index] = newPlayer;
            }
        });
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=Game.js.map