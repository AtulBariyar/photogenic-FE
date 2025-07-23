// CropControls.jsx
const CropControls = ({ cropParams, setCropParams }) => {
  return (
    // <div className="flex flex-col gap-4">
    //   <h3 className="font-medium">Crop Controls</h3>
    //   {/* <label>
    //     X:
    //     <input
    //       type="number"
    //       value={cropParams.x}
    //       onChange={(e) => setCropParams({ ...cropParams, x: e.target.value })}
    //       className="ml-2 p-1 rounded"
    //     />
    //   </label> */}
    //   <div>
    //     <label className="block text-sm font-medium mb-1">
    //       X: {Math.round(cropParams.x)}%
    //     </label>
    //     <input
    //       type="range"
    //       min="0"
    //       max={100 - cropParams.width}
    //       value={cropParams.x}
    //       onChange={(e) =>
    //         setCropParams((prev) => ({ ...prev, x: parseInt(e.target.value) }))
    //       }
    //       className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
    //     />
    //   </div>
    //   <label>
    //     Y:
    //     <input
    //       type="number"
    //       value={cropParams.y}
    //       onChange={(e) => setCropParams({ ...cropParams, y: e.target.value })}
    //       className="ml-2 p-1 rounded"
    //     />
    //   </label>
    //   <label>
    //     Width:
    //     <input
    //       type="number"
    //       value={cropParams.width}
    //       onChange={(e) =>
    //         setCropParams({ ...cropParams, width: e.target.value })
    //       }
    //       className="ml-2 p-1 rounded"
    //     />
    //   </label>
    //   <label>
    //     Height:
    //     <input
    //       type="number"
    //       value={cropParams.height}
    //       onChange={(e) =>
    //         setCropParams({ ...cropParams, height: e.target.value })
    //       }
    //       className="ml-2 p-1 rounded"
    //     />
    //   </label>
    // </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Crop Controls</h3>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            X: {Math.round(cropParams.x)}%
          </label>
          <input
            type="range"
            min="0"
            max={100 - cropParams.width}
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
            Y: {Math.round(cropParams.y)}%
          </label>
          <input
            type="range"
            min="0"
            max={100 - cropParams.height}
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
            Width: {Math.round(cropParams.width)}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
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
            Height: {Math.round(cropParams.height)}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
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

      <div className="text-sm text-gray-400 mb-4">
        <p>
          Drag the edges or corners of the crop box to resize, or drag inside to
          reposition.
        </p>
      </div>
    </div>
  );
};

export default CropControls;
