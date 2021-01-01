import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import Me from './Models/Me';
import PVector from './Models/PVector';
import io, { Socket } from "socket.io-client";
import Players from './Models/Players';
import PlayerInterface from './Interfaces/Player.interface';
import { useHistory } from "react-router-dom";
import LocationUI from './LocationUI/LocationUI';
import Camera from './Camera/Camera';

// Default canvas size
export const map = {width: 3000, height: 3000};
let players: Players;;
let me: Me;
let canvas: HTMLCanvasElement;

function Game() {
  const cameraRef = useRef<any | null>(null);
  const inputRef = useRef<any | null>(null);
  const [btnClickHandler, setBtnClickHandler] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let ctx: CanvasRenderingContext2D;
    
    let API;
    if(process.env.NODE_ENV === 'development') {
      API = process.env.REACT_APP_API_DOMAIN_DEV;
    } else {
      API = process.env.REACT_APP_API_DOMAIN;
    }
    let socket: typeof Socket = io(API);

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

      canvas = cameraRef.current;
      ctx = canvas.getContext('2d');
      
      me = new Me(ctx, name, new PVector(map.width/2, map.height/2), socket);
      me.initEventListeners(window);

      // Players
      players = new Players(ctx, me);
    }
    initCanvas();

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
    }
  }, []);

  return (
    <div className="Game">
      <div className="canvas">
        <Camera ref={cameraRef} map={map} me={me} players={players}/>
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
