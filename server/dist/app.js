"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var game_1 = __importDefault(require("./routes/game"));
var socket_io_1 = require("socket.io");
var http_1 = __importDefault(require("http"));
// const express = require('express')
var app = express_1.default();
var server = http_1.default.createServer(app);
var port = process.env.PORT || 8080;
var io = new socket_io_1.Server(server);
// Fix (Allow access) to CROS error
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Content-Length', Buffer.byteLength(content));
    next();
});
app.use('/', new game_1.default().router);
app.get('/', function (req, res) {
    res.send('Hello World');
});
io.on('connection', function (socket) {
    console.log('a user connected!!!!');
});
server.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map