import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import Me from './Models/Me';
import PVector from './Models/PVector';
import io, { Socket } from "socket.io-client";
import Players from './Models/Players';
import PlayerInterface from './Interfaces/Player.interface';
import { useHistory } from "react-router-dom";
import LocationUI from './LocationUI/LocationUI';

// Default canvas size
let size = {width: 500, height: 500}
let players: Players;
let me: Me;
let canvas: HTMLCanvasElement;

function Game() {
  const ref = useRef<any | null>(null);
  const inputRef = useRef<any | null>(null);
  const [btnClickHandler, setBtnClickHandler] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let ctx: CanvasRenderingContext2D;
    let socket: typeof Socket = io('http://35.226.113.57/api/');
    // let socket: typeof Socket = io('http://localhost:8080');
    
    // Set Canvas size to window size
    const resizeWindowSize = () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;

      if(!canvas) return;
      canvas.width = size.width;
      canvas.height = size.height;
    };
    resizeWindowSize();
    window.addEventListener('resize', resizeWindowSize);

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

    const initCanvas = () => {
      const name = localStorage.getItem('name');
      // Check if name is stored in the localstorage
      if (!name) {
        history.push('/');
      }

      canvas = ref.current;
      // Set canvas size
      canvas.height = size.height;
      canvas.width = size.width;
      ctx = canvas.getContext('2d');
      
      me = new Me(ctx, name, new PVector(size.width/2, size.height/2), socket);
      me.initEventListeners(window);

      // Players
      players = new Players(ctx, me);
    }
    initCanvas();

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
        inputRef.current.value = '';
      }
    });

    return () => {
      // Disconnect
      socket.disconnect();
      // Reset window event listner
      window.removeEventListener('resize', resizeWindowSize)
    }
  }, []);

  return (
    <div className="Game">
      <div className="canvas">
        <canvas id="canvas" ref={ref}></canvas>
        <LocationUI me={me}/>
      </div>
      <div className="textbox">
        <input type="text" ref={inputRef} maxLength={30}/>
        <button onClick={btnClickHandler}>SEND</button>
      </div>
    </div>
  )
}

export default Game
