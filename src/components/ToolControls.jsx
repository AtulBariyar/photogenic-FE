// ToolControls.jsx
import CropControls from './CropControls';
import RotateControls from './RotateControls';
import Controls from './Controls';
import { useEffect, useState} from "react";

const ToolControls = ({ activeTool, setActiveTool, cropParams, setCropParams, clientDisplay, rotateAngle, handleRotate,applyChanges,size,setSize,setCtrlParam }) => {
  const [controlMain, setControlMain] = useState({
    resize:{width:100,height:100},
    watermark:"",
    compress:50,
    mirror:"horizontal"
  });

  // console.log("Resize: "+controlMain.resize+
  //   ", watermark: "+controlMain.watermark+
  //   ", compress: "+controlMain.compress+
  //   ", mirror: "+controlMain.mirror
  // )
 useEffect(() => {
   setCtrlParam(controlMain[activeTool]);
   
     }, [controlMain])

     
     
 
  
  return (
    <div className={`bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-md p-5 transition-all ${activeTool ? 'translate-y-0' : 'translate-y-full'}`}>
      
      {activeTool === 'rotate' && (
        <RotateControls rotateAngle={rotateAngle} handleRotate={handleRotate} />
      )}
      {activeTool === 'crop' && (
        <CropControls cropParams={cropParams} setCropParams={setCropParams} clientDisplay={clientDisplay} />
      )}
      {activeTool !== 'rotate' && activeTool !== 'crop' && (
        <Controls controlMain={controlMain} setControlMain={setControlMain} activeTool={activeTool} size={size} setSize={setSize} clientDisplay={clientDisplay} />
      )}
      
      <div className="flex justify-end gap-3">
        <button 
          onClick={() => setActiveTool(null)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={applyChanges}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ToolControls;
