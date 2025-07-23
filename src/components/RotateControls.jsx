// RotateControls.jsx
const RotateControls = ({ rotateAngle, handleRotate }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium">Rotate Controls</h3>
      <label>
        Angle: 
        <input 
          type="number" 
          value={rotateAngle} 
          onChange={(e) => handleRotate(e.target.value, true)} 
          className="ml-2 p-1 rounded"
        />
      </label>
      <div className="flex gap-2">
        <button onClick={() => handleRotate(-90)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Rotate Left</button>
        <button onClick={() => handleRotate(90)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Rotate Right</button>
      </div>
    </div>
  );
};

export default RotateControls;
