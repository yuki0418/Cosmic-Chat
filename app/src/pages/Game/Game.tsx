import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import Me from './Models/Me';
import PVector from './Models/PVector';

function Game() {
  const size = {width: 500, height: 500}
  const ref = useRef<any | null>(null);

  useEffect(() => {
    let me: Me;
    let ctx: CanvasRenderingContext2D;

    const init = () => {
      let canvas: HTMLCanvasElement = ref.current;
      // Set canvas size
      canvas.height = size.height;
      canvas.width = size.width;
      ctx = canvas.getContext('2d');

      me = new Me(ctx, new PVector(size.width/2, size.height/2));
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
  
      window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);

    console.log('hey');
  });

  return (
    <div className="Game">
      <canvas id="canvas" ref={ref}></canvas>
    </div>
  )
}

export default Game
