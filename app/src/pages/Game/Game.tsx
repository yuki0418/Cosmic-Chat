import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import Me from './Models/Me';
import PVector from './Models/PVector';
import io, { Socket } from "socket.io-client";
import Players from './Models/Players';

function Game() {
  const size = {width: 500, height: 500}
  const ref = useRef<any | null>(null);
  let players: Players;

  useEffect(() => {
    let me: Me;
    let ctx: CanvasRenderingContext2D;
    let socket: typeof Socket = io('http://localhost:8080');

    const initSocket = () => {
      let interval;

      socket.on('connect', () => {
        me.id = socket.id;
        interval = setInterval(me.sendStatus, 500);
      });

      socket.on('disconnect', () => {
        clearInterval(interval);
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

      // Players
      players = new Players(ctx, me);
      socket.on('update', (newPlayers) => {
        players.update(newPlayers);
      });
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

      players.drawPlayers();
  
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
