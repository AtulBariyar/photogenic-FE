// Editor.jsx
import Canvas from "./Canvas";
import ToolControls from "./ToolControls";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useRef, useState, useEffect } from "react";

const Editor = ({
  image,
  activeTool,
  setActiveTool,
  containerRef,
  rotateAngle,
  cropParams,
  completedCrop,
  setCompletedCrop,
  setCropParams,
  canvasRef,
  handleImageUpload,
  handleRotate,
  applyChanges,
  size,
  setSize,
  ctrlParam,
  setCtrlParam,
  originalDimensions,
}) => {
  const imageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [clientDisplay, setClientDisplay] = useState({
    scaledWidth: 100,
    scaledHeight: 100,
  });

  useEffect(() => {
    setClientDisplay({
      scaledWidth: originalDimensions.width,
      scaledHeight: originalDimensions.height,
    });
  }, [originalDimensions]);

  const handleImageLoad = (img) => {
    imageRef.current = img; // Store the loaded image reference
    const displayWidth = img.clientWidth;
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;

    setScale(originalWidth / displayWidth);
    const orgDimension = {
      scaledWidth: originalWidth,
      scaledHeight: originalHeight,
    };
    setClientDisplay(orgDimension);
  };

  const handleCropComplete = (crop) => {
    const scaleCrop = {
      x: parseInt(crop.x * scale),
      y: parseInt(crop.y * scale),
      width: parseInt(crop.width * scale),
      height: parseInt(crop.height * scale),
    };
    setCompletedCrop(scaleCrop);
    // setScaledParam(scaleCrop);
  };

  return (
    <div className="order-1 md:order-2 flex-col md:flex-1">
      <div
        ref={containerRef}
        className="flex-1 relative bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden"
      >
        {!image ? (
          <UploadPrompt handleImageUpload={handleImageUpload} />
        ) : (
          //flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-600 rounded-lg
          <div className="relative w-full sm:h-85 flex items-center justify-center overflow-hidden">
            {activeTool === "crop" ? (
              <div className="w-full h-full justify-center">
                <ReactCrop
                  crop={cropParams}
                  onChange={(c) => setCropParams(c)}
                  // onComplete={(c) => setCompletedCrop(c)}
                  onComplete={handleCropComplete}
                  className="m-2 border border-transparent outline-4 outline-blue-500 rounded-lg h-96vh max-h-82 w-auto "
                  style={{
                    aspectRatio: "auto", // Maintain original aspect ratio
                  }}
                >
                  <img
                    ref={imageRef}
                    src={image}
                    onLoad={(e) => handleImageLoad(e.currentTarget)}
                    alt="Current preview"
                    className="w-auto h-full object-contain items-center justify-center"
                  />
                </ReactCrop>
              </div>
            ) : (
              <Canvas
                image={image}
                activeTool={activeTool}
                rotateAngle={rotateAngle}
                canvasRef={canvasRef}
              />
            )}
          </div>
        )}
      </div>
      <div className="flex-1 relative mt-5">
        {activeTool && image && (
          <ToolControls
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            cropParams={cropParams}
            setCropParams={setCropParams}
            size={size}
            setSize={setSize}
            clientDisplay={clientDisplay}
            rotateAngle={rotateAngle}
            handleRotate={handleRotate}
            applyChanges={applyChanges}
            ctrlParam={ctrlParam}
            setCtrlParam={setCtrlParam}
          />
        )}
        {/* {completedCrop && (
        <div>
          <h3>Cropped Area:</h3>
          <p>X: {completedCrop.x}</p>
          <p>Y: {completedCrop.y}</p>
          <p>Width: {completedCrop.width}</p>
          <p>Height: {completedCrop.height}</p>
        </div>
      )} */}
      </div>
    </div>
  );
};

const UploadPrompt = ({ handleImageUpload }) => (
  <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-600 rounded-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-20 w-20 text-gray-500 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <p className="text-gray-400 mb-4">Upload an image to start editing</p>
    <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
      Choose Image
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>
  </div>
);

export default Editor;
