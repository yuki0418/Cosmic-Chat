import React, { useRef } from 'react';
import './Home.scss';

function Home() {
  const nameRef = useRef(null);

  const clickHandler = () => {
    if(!nameRef.current) return;
    let name = nameRef.current.value;
    console.log(name);
  }

  return (
    <div className="Home">
      <div className="logo-container">
        <h1 className="logo">COSMIC CHAT</h1>
      </div>
      <div className="form">
        <input type="text" ref={nameRef}/>
        <button onClick={clickHandler}>JOIN</button>
      </div>
    </div>
  )
}

export default Home
