import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.scss';
import io, { Socket } from 'socket.io-client';

let socket: typeof Socket = io('http://localhost:8080');

function Game() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios('http://localhost:8080/game');
      
      setData(result.data.message);
    };
    fetchDate();

    // let socket = io('http://localhost:8080');

    const connect = async() => {
      socket.on('connect', () => {
        socket.send('Heelo From Client');

        socket.emit('salutations', 'Hello!', {'mr': 'John'}, Uint8Array.from([1,2,3,4]));
      });

      socket.on('init', (msg) => {
        setMessage(msg);
      });
    };
    connect();

    return () => {
      socket.on('disconnect', () => {
        console.log(socket.id);
      });
    }
  }, []);

  const send = () => {
    console.log(socket);
    
    socket.emit('init', input);
  }

  const onChange = (val) => {
    setInput(val.target.value);
  };

  return (
    <div className="Game">
      Game
      <p>{data}</p>
      <input type="text" onChange={onChange}/>
      <button onClick={send}>
        Click
      </button>
      <p>{message}</p>
    </div>
  )
}

export default Game
