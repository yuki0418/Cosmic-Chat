import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import Me from './Models/Me';
import PVector from './Models/PVector';
import io, { Socket } from "socket.io-client";
import Players from './Models/Players';
import PlayerInterface from './Interfaces/Player.interface';
import { useHistory } from "react-router-dom";

function Game() {
  const size = {width: 500, height: 500}
  let players: Players;
  let me: Me;
  const ref = useRef<any | null>(null);
  const inputRef = useRef<any | null>(null);
  const [btnClickHandler, setBtnClickHandler] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let ctx: CanvasRenderingContext2D;
    let socket: typeof Socket = io('http://localhost:8080');
    // let me: Me;

    const initSocket = () => {
      socket.on('connect', () => {
        me.id = socket.id;
        socket.emit('join', me.getStatus());
      });

      socket.on('disconnect', () => {
        // Disconnected motion
      });

      socket.on('game-update', (newPlayers: Array<PlayerInterface>) => {
        players.update(newPlayers);
        me.sendStatus();
      });

      socket.on('player-remove', (id: string) => {
        players.removePlayer(id);
      });

      socket.on('player-send-message', ({id, msg}) => {
        players.showMessage(id, msg);
      });
    }
    initSocket();

    const init = () => {
      const name = localStorage.getItem('name');
      // Check if name is stored in the localstorage
      if (!name) {
        history.push('/');
      }

      let canvas: HTMLCanvasElement = ref.current;
      // Set canvas size
      canvas.height = size.height;
      canvas.width = size.width;
      ctx = canvas.getContext('2d');
      
      me = new Me(ctx, name, new PVector(size.width/2, size.height/2), socket);
      console.log(me);
      
      me.initEventListeners(window);

      // Players
      players = new Players(ctx, me);
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

    setBtnClickHandler(() => function() {
      const text = inputRef.current.value;
      if(text) {
        me.sendMessage(text);
      }
    });

    return () => {
      // Disconnect
      socket.disconnect();
    }
  }, []);

  return (
    <div className="Game">
      <canvas id="canvas" ref={ref}></canvas>
      <div>
        <input type="text" ref={inputRef}/>
        <button onClick={btnClickHandler}>SEND</button>
      </div>
    </div>
  )
}

export default Game
