import React, { useRef } from 'react';
import './Home.scss';
import { useHistory } from 'react-router-dom';

function Home() {
  const nameRef = useRef(null);
  const history = useHistory();

  const clickHandler = () => {
    if(!nameRef.current) return;
    let name = nameRef.current.value.trim();
    if(name) {
      localStorage.setItem('name', name);
      history.push('/game');
    }
  }

  return (
    <div className="Home">
      <div className="logo-container">
        <h1 className="logo">COSMIC CHAT</h1>
      </div>
      <div className="form">
        <input type="text" ref={nameRef} placeholder="Your name"/>
        <button onClick={clickHandler}>JOIN</button>
      </div>
    </div>
  )
}

export default Home
