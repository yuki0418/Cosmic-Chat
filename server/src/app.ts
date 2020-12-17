import express from "express";
import GameRoutes from './routes/game';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

// const express = require('express')
const app: express.Application = express()
const server = createServer(app);
const port = process.env.PORT || 8080;
const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
}
const io = new Server(server, ioOptions);

// Fix (Allow access) to CROS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', new GameRoutes().router);

app.get('/', (req, res) => {
  res.send('Hello World')
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected:', socket.id);
  socket.emit('hello', socket.id);

  socket.on('disconnect', (reason) => {
    console.log('Disconnected:', socket.id, reason);
  });

  //https://aleemisiaka.com/blog/socketio-app-structure/
});;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})