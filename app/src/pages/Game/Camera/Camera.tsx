import React, { useEffect, useRef, useState } from 'react';
import Me from '../Models/Me';
import Players from '../Models/Players';
import PVector from '../Models/PVector';
import bgImage from '../../../images/game-bg.jpg';
import './Camera.scss';

type Props = {map, me: Me, players: Players};
let size = {width: 500, height: 500};
let canvas;
let viewport = new PVector(size.height/2, size.width/2);

const Camera = React.forwardRef((props: Props, ref: any) => {
  // const ref = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);

  useEffect(() => {
    if(!ref.current) return;
    setCtx(ref.current.getContext('2d'));

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

    return(() => {
      // Reset window event listner
      window.removeEventListener('resize', resizeWindowSize)
    })
  }, [ref]);

  useEffect(() => {
    if(!ctx) return;

    // Set Canvas size to window size
    canvas = ref.current;
    const resizeWindowSize = () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;

      if(!canvas) return;
      canvas.width = size.width;
      canvas.height = size.height;
    };
    resizeWindowSize();

    const clear = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, props.map.width, props.map.height);
    }

    const image = new Image();
    image.src = bgImage;

    const draw = () => {
      clear();

      viewport.x = props.me.location.x - (size.width/2);
      viewport.y = props.me.location.y - (size.height/2);

      ctx.translate(-viewport.x, -viewport.y);
      
      ctx.save();
      ctx.scale(1.5,1.5);
      ctx.translate(-800, -800);
      ctx.drawImage(image, 0, 0);
      ctx.restore();
      
      props.players.drawPlayers();
      
      ctx.translate(viewport.x, viewport.y);

      props.me.update();
      props.me.draw();

      window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
  }, [ctx, props.map.height, props.map.width, props.me, props.players, ref])

  return (
    <canvas className="Camera" ref={ref}>
    </canvas>
  )
})

export default Camera
