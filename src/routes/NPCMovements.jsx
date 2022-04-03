import { useEffect } from 'react';
import useCanvas from '../hooks/useCanvas';

import enemy1Src from '../assets/enemy1.webp';
import enemy2Src from '../assets/enemy2.webp';
import enemy3Src from '../assets/enemy3.webp';
import enemy4Src from '../assets/enemy4.webp';

const enemy1Img = new Image();
const enemy2Img = new Image();
const enemy3Img = new Image();
const enemy4Img = new Image();

enemy1Img.src = enemy1Src;
enemy2Img.src = enemy2Src;
enemy3Img.src = enemy3Src;
enemy4Img.src = enemy4Src;

const enemyTypes = [
  {
    img: enemy1Img,
    spriteWidth: 293,
    spriteHeight: 155,
    spriteFrames: 6,
  },
  {
    img: enemy2Img,
    spriteWidth: 266,
    spriteHeight: 188,
    spriteFrames: 6,
  },
  {
    img: enemy3Img,
    spriteWidth: 218,
    spriteHeight: 177,
    spriteFrames: 6,
  },
  {
    img: enemy4Img,
    spriteWidth: 213,
    spriteHeight: 212,
    spriteFrames: 9,
  },
];

const enemyArr = [];
let draw = () => {};

class Enemy {
  constructor(enemyType, x, y) {
    this.x = x;
    this.y = y;
    this.image = enemyType.img;
    this.spriteWidth = enemyType.spriteWidth;
    this.spriteHeight = enemyType.spriteHeight;
    this.spriteFrames = enemyType.spriteFrames;
  }

  draw(ctx, frameCount) {
    ctx.drawImage(
      this.image,
      this.spriteWidth * (Math.floor(frameCount / 3) % this.spriteFrames),
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight,
    );
  }
}

function NPCMovements() {
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    for (let i = 0; i < 5; i += 1) {
      enemyArr.push(new Enemy(
        enemyTypes[3],
        Math.floor(Math.random() * canvasRef.current.width),
        Math.floor(Math.random() * canvasRef.current.height),
      ));
    }

    draw = (ctx, frameCount) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      enemyArr.forEach((enemy) => enemy.draw(ctx, frameCount));
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default NPCMovements;