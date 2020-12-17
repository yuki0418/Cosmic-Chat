import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.scss';
import io from 'socket.io-client';

function Game() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios('http://localhost:8080/game');
      
      setData(result.data.message);
    };

    let socket = io('http://localhost:8080');

    fetchDate();

    const connect = async() => {

      socket.on('connect', () => {
        socket.send('Heelo From Client');

        socket.emit('salutations', 'Hello!', {'mr': 'John'}, Uint8Array.from([1,2,3,4]));
      });

      socket.on('hello', (num) => {
        setCount(num);
      });
    };

    connect();

    return () => {
      socket.on('disconnect', () => {
        console.log(socket.id);
      });
    }
  }, []);

  return (
    <div className="Game">
      Game
      <p>{data}</p>
      <p>{count}</p>
    </div>
  )
}

export default Game
