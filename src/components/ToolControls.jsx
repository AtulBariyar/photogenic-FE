// ToolControls.jsx
import CropControls from './CropControls';
import RotateControls from './RotateControls';

const ToolControls = ({ activeTool, setActiveTool, cropParams, setCropParams, clientDisplay, rotateAngle, handleRotate,applyChanges }) => {
  return (
    <div className={`bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-md p-5 transition-all ${activeTool ? 'translate-y-0' : 'translate-y-full'}`}>
      {activeTool === 'rotate' && (
        <RotateControls rotateAngle={rotateAngle} handleRotate={handleRotate} />
      )}
      {activeTool === 'crop' && (
        <CropControls cropParams={cropParams} setCropParams={setCropParams} clientDisplay={clientDisplay} />
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
