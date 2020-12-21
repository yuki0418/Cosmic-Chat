import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import Me from './Models/Me';
import Player from './Models/Player';
import PVector from './Models/PVector';
import io, { Socket } from "socket.io-client";

function Game() {
  const size = {width: 500, height: 500}
  const ref = useRef<any | null>(null);
  let players: Array<any> = [];

  useEffect(() => {
    let me: Me;
    let ctx: CanvasRenderingContext2D;
    let socket: typeof Socket = io('http://localhost:8080');

    const initSocket = () => {
      socket.on('update', (newPlayers) => {
        players = newPlayers;
        console.log(players);
      });
    }
    initSocket();

    const init = () => {
      let canvas: HTMLCanvasElement = ref.current;
      // Set canvas size
      canvas.height = size.height;
      canvas.width = size.width;
      ctx = canvas.getContext('2d');

      me = new Me(ctx, new PVector(size.width/2, size.height/2), socket);
      me.initEventListeners(window);
    }
    init();

    const clear = () => {
      if(!ctx) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, size.width, size.height);
    }
  
    const draw = () => {
      clear();

      me.update();
      me.draw();

      players.forEach(player => {
        if(player.id !== socket.id) {
          let newPlayer = new Player(ctx, new PVector(player.location.x, player.location.y));
          newPlayer.draw();
        }
      });
  
      window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
  });

  return (
    <div className="Game">
      <canvas id="canvas" ref={ref}></canvas>
    </div>
  )
}

export default Game
