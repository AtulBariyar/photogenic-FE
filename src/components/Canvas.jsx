// Canvas.jsx
import { useEffect } from 'react';


const Canvas = ({ image, activeTool, rotateAngle,  canvasRef }) => {
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotateAngle * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(img, 0, 0);

      // if (activeTool === 'crop') {
      //   const x = (cropParams.x / 100) * canvas.width;
      //   const y = (cropParams.y / 100) * canvas.height;
      //   const width = (cropParams.width / 100) * canvas.width;
      //   const height = (cropParams.height / 100) * canvas.height;

      //   ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      //   ctx.beginPath();
      //   ctx.rect(0, 0, canvas.width, canvas.height);
      //   ctx.rect(x, y, width, height);
      //   ctx.fill('evenodd');

      //   ctx.strokeStyle = '#3b82f6';
      //   ctx.lineWidth = 2;
      //   ctx.strokeRect(x, y, width, height);
      // }

      ctx.restore();
    };

    img.src = image;
  }, [image, rotateAngle, activeTool, canvasRef]);
// ${activeTool === 'crop' ? 'cursor-move' : ''}
  return (
    <canvas ref={canvasRef} className="max-w-full" style={{ height: 'inherit', backgroundColor: '#1f2937', display: 'block', maxHeight: '70vh' }} />
  );
};

export default Canvas;
