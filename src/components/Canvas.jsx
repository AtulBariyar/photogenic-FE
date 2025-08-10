
import { useEffect } from "react";

const Canvas = ({ image, activeTool, rotateAngle, canvasRef }) => {
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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
      ctx.restore();
    };

    img.src = image;
  }, [image, rotateAngle, activeTool, canvasRef]);
  
  return (
    <canvas
      ref={canvasRef}
      className="max-w-full h-auto sm:max-h-full"
      style={{
        backgroundColor: "#1f2937",
        display: "block",
        maxHeight: "50vh",
      }}
    />
  );
};

export default Canvas;
