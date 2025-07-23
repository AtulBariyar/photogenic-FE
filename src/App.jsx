// App.jsx
import { useState, useRef, useEffect, useContext } from "react";
import Header from "./components/Header";
import Toolbox from "./components/Toolbox";
import Editor from "./components/Editor";
import OperationsPanel from "./components/OperationsPanel";
import Gallery from "./components/Gallery";
import Alert from "./components/Alert";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [operations, setOperations] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [cropParams, setCropParams] = useState({
    unit: "px",
    x: 0,
    y: 0,
    width: 30,
    height: 30,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [notification, setNotification] = useState(null);
  // const [isClicked, setIsClicked] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [format, setFormat] = useState("");
  const [view, setView] = useState("editor");
  const [savedImages, setSavedImages] = useState([]);

  const saveImage = () => {
    if (preview) {
      setSavedImages((prev) => [...prev, preview]);
      setNotification({
        type: "success",
        message: "Image saved successfully!",
      });
      
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileType = file.type;
      const extension = fileType.split("/").pop();
      setFormat(extension);
      reader.onload = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setNotification({
      type: "success",
      message: "Image uploaded successfully!",
    });
  };

  useEffect(() => {}, [format]);

  const downloadImage = (fileformat) => {
    if (!preview) return;

    console.log("File format:", fileformat);

    const link = document.createElement("a");
    let fileName = "Photogenic-edit";

    if (fileformat === "jpeg") {
      fileName += ".jpg";
    } else if (fileformat === "png") {
      fileName += ".png";
    } else if (fileformat === "webp") {
      fileName += ".webp";
    } else if (fileformat === "pdf") {
      fileName += ".pdf";
    } else {
      fileName += ".png";
    }

    link.download = fileName;
    link.href = preview;
    link.click();
  };

  const handleExport = (fileformat) => {
    alert(`Image exported as ${fileformat}`);
    //setFormat(fileformat);
    downloadImage(fileformat);
  };

  const deleteImage = () => {
    alert(`Do you really want to delete current image ?`);
    setPreview(null);
    setImage(null);
  };

  const resetChanges = () => {
    setPreview(image);
    setRotateAngle(0);
    setCropParams({ x: 10, y: 10, width: 80, height: 80 });
    setActiveTool(null);
    setNotification({
      type: "success",
      message: "Reset to Original Image!",
    });
  };

  const handleRotate = (angle, manualInput = false) => {
    if (!manualInput) {
      setRotateAngle((prev) => prev + angle);
    } else {
      setRotateAngle(angle);
    }
  };

  // const startDrag = (e) => {
  //   if (activeTool !== 'crop' || !image) return;

  //   const rect = containerRef.current.getBoundingClientRect();
  //   const x = ((e.clientX - rect.left) / rect.width) * 100;
  //   const y = ((e.clientY - rect.top) / rect.height) * 100;

  //   const boxLeft = cropParams.x;
  //   const boxRight = cropParams.x + cropParams.width;
  //   const boxTop = cropParams.y;
  //   const boxBottom = cropParams.y + cropParams.height;

  //   const edgeThreshold = 5;

  //   if (Math.abs(x - boxLeft) < edgeThreshold && Math.abs(y - boxTop) < edgeThreshold) {
  //     setResizeHandle('top-left');
  //   } else if (Math.abs(x - boxRight) < edgeThreshold && Math.abs(y - boxTop) < edgeThreshold) {
  //     setResizeHandle('top-right');
  //   } else if (Math.abs(x - boxLeft) < edgeThreshold && Math.abs(y - boxBottom) < edgeThreshold) {
  //     setResizeHandle('bottom-left');
  //   } else if (Math.abs(x - boxRight) < edgeThreshold && Math.abs(y - boxBottom) < edgeThreshold) {
  //     setResizeHandle('bottom-right');
  //   } else if (Math.abs(x - boxLeft) < edgeThreshold) {
  //     setResizeHandle('left');
  //   } else if (Math.abs(x - boxRight) < edgeThreshold) {
  //     setResizeHandle('right');
  //   } else if (Math.abs(y - boxTop) < edgeThreshold) {
  //     setResizeHandle('top');
  //   } else if (Math.abs(y - boxBottom) < edgeThreshold) {
  //     setResizeHandle('bottom');
  //   } else if (x > boxLeft && x < boxRight && y > boxTop && y < boxBottom) {
  //     setResizeHandle('move');
  //   } else {
  //     return;
  //   }

  //   setDragStart({ x, y });
  // };

  // const handleDrag = (e) => {
  //   if (!dragStart || !image || activeTool !== 'crop') return;

  //   const rect = containerRef.current.getBoundingClientRect();
  //   const x = ((e.clientX - rect.left) / rect.width) * 100;
  //   const y = ((e.clientY - rect.top) / rect.height) * 100;
  //   const dx = x - dragStart.x;
  //   const dy = y - dragStart.y;

  //   setCropParams(prev => {
  //     const newParams = { ...prev };

  //     if (resizeHandle === 'move') {
  //       newParams.x = Math.max(0, Math.min(100 - newParams.width, newParams.x + dx));
  //       newParams.y = Math.max(0, Math.min(100 - newParams.height, newParams.y + dy));
  //     } else if (resizeHandle) {
  //       switch (resizeHandle) {
  //         case 'top-left':
  //           newParams.x = Math.max(0, Math.min(newParams.x + newParams.width - 10, newParams.x + dx));
  //           newParams.width = Math.max(10, newParams.width - dx);
  //           newParams.y = Math.max(0, Math.min(newParams.y + newParams.height - 10, newParams.y + dy));
  //           newParams.height = Math.max(10, newParams.height - dy);
  //           break;
  //         case 'top-right':
  //           newParams.width = Math.max(10, Math.min(100 - newParams.x, newParams.width + dx));
  //           newParams.y = Math.max(0, Math.min(newParams.y + newParams.height - 10, newParams.y + dy));
  //           newParams.height = Math.max(10, newParams.height - dy);
  //           break;
  //         case 'bottom-left':
  //           newParams.x = Math.max(0, Math.min(newParams.x + newParams.width - 10, newParams.x + dx));
  //           newParams.width = Math.max(10, newParams.width - dx);
  //           newParams.height = Math.max(10, Math.min(100 - newParams.y, newParams.height + dy));
  //           break;
  //         case 'bottom-right':
  //           newParams.width = Math.max(10, Math.min(100 - newParams.x, newParams.width + dx));
  //           newParams.height = Math.max(10, Math.min(100 - newParams.y, newParams.height + dy));
  //           break;
  //         case 'left':
  //           newParams.x = Math.max(0, Math.min(newParams.x + newParams.width - 10, newParams.x + dx));
  //           newParams.width = Math.max(10, newParams.width - dx);
  //           break;
  //         case 'right':
  //           newParams.width = Math.max(10, Math.min(100 - newParams.x, newParams.width + dx));
  //           break;
  //         case 'top':
  //           newParams.y = Math.max(0, Math.min(newParams.y + newParams.height - 10, newParams.y + dy));
  //           newParams.height = Math.max(10, newParams.height - dy);
  //           break;
  //         case 'bottom':
  //           newParams.height = Math.max(10, Math.min(100 - newParams.y, newParams.height + dy));
  //           break;
  //         default:
  //           break;
  //       }
  //     }

  //     return newParams;
  //   });

  //   setDragStart({ x, y });
  // };

  // const endDrag = () => {
  //   setDragStart(null);
  //   setResizeHandle(null);
  // };

  const applyChanges = () => {
    setOperations((prev) => [
      ...prev,
      {
        type: activeTool,
        params: activeTool === "crop" ? cropParams : rotateAngle,
      },
    ]);
    setActiveTool(null);
    setNotification({
      type: "success",
      message: `Image ${activeTool} successful!`,
    });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // useEffect(() => {
  //   if (!preview) return;

  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   const img = new Image();

  //   img.onload = () => {
  //     canvas.width = img.width;
  //     canvas.height = img.height;

  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.save();
  //     ctx.translate(canvas.width / 2, canvas.height / 2);
  //     ctx.rotate((rotateAngle * Math.PI) / 180);
  //     ctx.translate(-canvas.width / 2, -canvas.height / 2);
  //     ctx.drawImage(img, 0, 0);

  //     // if (activeTool === 'crop') {
  //     //   const x = (cropParams.x / 100) * canvas.width;
  //     //   const y = (cropParams.y / 100) * canvas.height;
  //     //   const width = (cropParams.width / 100) * canvas.width;
  //     //   const height = (cropParams.height / 100) * canvas.height;

  //     //   ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  //     //   ctx.beginPath();
  //     //   ctx.rect(0, 0, canvas.width, canvas.height);
  //     //   ctx.rect(x, y, width, height);
  //     //   ctx.fill('evenodd');

  //     //   ctx.strokeStyle = '#3b82f6';
  //     //   ctx.lineWidth = 2;
  //     //   ctx.strokeRect(x, y, width, height);

  //     //    // Draw resize handles
  //     //   const handleSize = 8;
  //     //   const halfHandle = handleSize / 2;

  //     //   // Corner handles
  //     //   ctx.fillStyle = '#3b82f6';
  //     //   ctx.fillRect(x - halfHandle, y - halfHandle, handleSize, handleSize); // top-left
  //     //   ctx.fillRect(x + width - halfHandle, y - halfHandle, handleSize, handleSize); // top-right
  //     //   ctx.fillRect(x - halfHandle, y + height - halfHandle, handleSize, handleSize); // bottom-left
  //     //   ctx.fillRect(x + width - halfHandle, y + height - halfHandle, handleSize, handleSize); // bottom-right

  //     //   // Edge handles
  //     //   ctx.fillRect(x + width/2 - halfHandle, y - halfHandle, handleSize, handleSize); // top-center
  //     //   ctx.fillRect(x + width/2 - halfHandle, y + height - halfHandle, handleSize, handleSize); // bottom-center
  //     //   ctx.fillRect(x - halfHandle, y + height/2 - halfHandle, handleSize, handleSize); // left-center
  //     //   ctx.fillRect(x + width - halfHandle, y + height/2 - halfHandle, handleSize, handleSize); // right-center

  //     //   // Show dimensions if box is large enough
  //     //   if (width > 100 && height > 30) {
  //     //     ctx.fillStyle = 'white';
  //     //     ctx.font = '12px Arial';
  //     //     ctx.textAlign = 'center';
  //     //     ctx.fillText(`${Math.round(width)}×${Math.round(height)}`, x + width/2, y + height/2 + 4);
  //     //   }
  //     // }

  //     ctx.restore();
  //   };

  //   img.src = preview;
  // }, [preview, rotateAngle, cropParams, activeTool]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header view={view} setView={setView} />

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 w-80">
          <Alert type={notification.type} message={notification.message} />
        </div>
      )}

      <main className="container mx-auto p-4">
        {view === "gallery" && (
          <Gallery setView={setView} savedImages={savedImages} />
        )}
        {view === "editor" && (
          <div className="flex flex-col lg:flex-row gap-6">
            <Toolbox
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              handleImageUpload={handleImageUpload}
              resetChanges={resetChanges}
              image={image}
              handleExport={handleExport}
              deleteImage={deleteImage}
              onSave={saveImage}
              
            />
            <Editor
              image={preview}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              containerRef={containerRef}
              rotateAngle={rotateAngle}
              cropParams={cropParams}
              completedCrop={completedCrop}
              setCompletedCrop={setCompletedCrop}
              setCropParams={setCropParams}
              canvasRef={canvasRef}
              handleImageUpload={handleImageUpload}
              handleRotate={handleRotate}
              applyChanges={applyChanges}
            />
            <OperationsPanel
              operations={operations}
              setOperations={setOperations}
              handleExport={handleExport}
              downloadImage={downloadImage}
              setNotification={setNotification}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
