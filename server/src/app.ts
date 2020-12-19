import express from "express";
import GameRoutes from './routes/game';
import { createServer } from 'http';
import GameSocket from "./socket/gameSocket";

// const express = require('express')
const app: express.Application = express()
const server = createServer(app);
const port = process.env.PORT || 8080;

// Setup SocketIO
const io = new GameSocket(server);
io.init();

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

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})