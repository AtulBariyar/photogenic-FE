
const CropControls = ({ cropParams, setCropParams, clientDisplay }) => {
  return (
     <div>
      <h3 className="text-lg font-semibold mb-4">Crop Controls</h3>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            X: {Math.round(cropParams.x)} px
          </label>
          <input
            type="range"
            min="0"
            max={clientDisplay.scaledWidth}
            value={cropParams.x}
            onChange={(e) =>
              setCropParams((prev) => ({
                ...prev,
                x: parseInt(e.target.value),
              }))
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Y: {Math.round(cropParams.y)} px
          </label>
          <input
            type="range"
            min="0"
            max={(clientDisplay.scaledHeight)-(cropParams.y)}
            value={cropParams.y}
            onChange={(e) =>
              setCropParams((prev) => ({
                ...prev,
                y: parseInt(e.target.value),
              }))
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Width: {Math.round(cropParams.width)} px
          </label>
          <input
            type="range"
            min="10"
            max={clientDisplay.scaledWidth}
            value={cropParams.width}
            onChange={(e) =>
              setCropParams((prev) => ({
                ...prev,
                width: parseInt(e.target.value),
              }))
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Height: {Math.round(cropParams.height)} px
          </label>
          <input
            type="range"
            min="10"
            max={clientDisplay.scaledHeight}
            value={cropParams.height}
            onChange={(e) =>
              setCropParams((prev) => ({
                ...prev,
                height: parseInt(e.target.value),
              }))
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* <div className="text-sm text-gray-400 mb-4">
        <p>
          Drag the edges or corners of the crop box to resize, or drag inside to
          reposition.
        </p>
      </div> */}
    </div>
  );
};

export default CropControls;
