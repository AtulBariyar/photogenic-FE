import {useState} from "react";

export default function Controls({
  controlMain,
  setControlMain,
  activeTool,
  size,
  clientDisplay
 }) {
const [resizePercent, setResizePercent] = useState(0);

  const handleControlMain = (val) => {
    setControlMain((prev) => ({
      ...prev,
      [activeTool]: val,
    }));
     };
  
     const handleResize = (val)=>{
      setResizePercent(val);
      const w = Math.round(clientDisplay.scaledWidth * (val/100));
      const h = Math.round(clientDisplay.scaledHeight * (val/100));
      
      setControlMain((prev)=>({
        ...prev,
        resize:{...prev.resize,
          width:w,
          height:h,
        },
      }));

     }

  return (
    <div>
      {activeTool === "resize" && (
        <>
          <p>Current Size: {size} </p>
          <div>
            <label className="block text-sm font-medium mb-1 mt-1">
              Size change: {Math.round(resizePercent)}%
            </label>
            <input
              type="range"
              min="10"
              max="200"
              value={resizePercent}
              // onChange={(e) =>
              //   setControlMain((prev) => ({
              //     ...prev,
              //     resize: parseInt(e.target.value),
              //   }))
              // }
              onChange={(e) => handleResize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </>
      )}

      {activeTool === "mirror" && (
        <>
          <div>
            <label className="block text-sm font-medium ">Direction</label>
            <select
              value={controlMain.direction}
              onChange={(e) => handleControlMain(e.target.value)}
              className="w-50vw mt-1 border rounded-md p-2"
            >
              <option className="text-gray-700" value="horizontal">
                Horizontal
              </option>
              <option className="text-gray-700" value="vertical">
                Vertical
              </option>
            </select>
          </div>
        </>
      )}

      {activeTool === "watermark" && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">
              Enter Watermark Text
            </label>
            <input
              type="text"
              placeholder="Watermark text"
              value={controlMain.watermark || ""}
              onChange={(e) => handleControlMain(e.target.value)}
              className="w-50vw mt-1 border rounded-md p-2 placeholder-neutral-500"
              />
          </div>
        </>
      )}

      {activeTool === "bgremove" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Remove Background of current Image
          </label>
        </div>
      )}

      {activeTool === "compress" && (
        <>
          <p className="font-bold border-b border-gray-700 text-blue-500">Compress File by Quality of Image </p>
          <div>
            <p className="text-blue-300">Current Image size: {size}</p>
            <label className="block text-sm font-medium mb-1">
              Quality to: {controlMain.compress} %
            </label>
            <input
              type="range"
              min="10"
              max="90"
              value={controlMain.compress}
              onChange={(e) => handleControlMain(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
}
