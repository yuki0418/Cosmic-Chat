import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.scss';
import { type } from 'os';

function Game() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios('http://localhost:8080/game');
      
      setData(result.data.message);
    };

    fetchDate();
  });

  return (
    <div className="Game">
      Game
      <p>{data}</p>
    </div>
  )
}

export default Game
