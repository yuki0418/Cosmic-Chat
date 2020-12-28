import React, { useEffect, useRef, useState } from 'react';

const size = {
  width: 200,
  height: 100
}

export default function LocationUI({me}) {
  let ref = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);
  const font = "16px Arial";

  useEffect(() => {
    let canvas: HTMLCanvasElement = ref.current;
    if(!canvas) return;
    canvas.height = size.height;
    canvas.width = size.width;
    setCtx(canvas.getContext('2d'));
    return () => {}
  }, []);

  useEffect(() => {
    if(!ctx || !me) return null;

    const clear = () => {
      ctx.clearRect(0,0, size.width, size.height);
    }

    const draw = () => {
      clear();

      ctx.fillStyle = 'white';
      ctx.font = font;
      ctx.textAlign = 'left';
      ctx.fillText(`X: ${Math.floor(me.location.x)}`, 30, 30);
      ctx.fillText(`Y: ${Math.floor(me.location.y)}`, 30, 50);

      window.requestAnimationFrame(draw);
    }
    draw();

    window.requestAnimationFrame(draw);
  }, [ctx, me]);

  return (
    <canvas id="location" ref={ref}>

    </canvas>
  )
}
