// Toolbox.jsx
import { useState } from "react";
const Toolbox = ({
  activeTool,
  setActiveTool,
  handleImageUpload,
  resetChanges,
  image,
  deleteImage,
  onSave,
  auth
  }) => {
  return (
    <div className="order-2 md:order-1 w-full lg:w-72 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-5 pt-2">
      {/* <h2 className="text-xl font-semibold mb-1 pb-1 border-b border-gray-700">
        Toolbox
      </h2> */}
      <ImageUpload
        handleImageUpload={handleImageUpload}
        resetChanges={resetChanges}
        image={image}
        deleteImage={deleteImage}
      />
      <ToolButtons activeTool={activeTool} setActiveTool={setActiveTool} onSave={onSave} auth={auth} />
      
    </div>
  );
};

const ToolButtons = ({ activeTool, setActiveTool, onSave, auth }) => {
  const [isClicked, setIsClicked] = useState(false);
const saving=()=>{
  setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
      onSave();
}

  return (
    <div className="grid grid-cols-2 gap-3">
      
      <button
        onClick={() => setActiveTool("rotate")}
        className={`p-3 rounded-lg flex flex-col items-center transition-all ${
          activeTool === "rotate"
            ? "bg-blue-600/80 shadow-lg scale-105"
            : "bg-gray-700/50 hover:bg-gray-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>Rotate</span>
      </button>
      <button
        onClick={() => setActiveTool("crop")}
        className={`p-3 rounded-lg flex flex-col items-center transition-all ${
          activeTool === "crop"
            ? "bg-blue-600/80 shadow-lg scale-105"
            : "bg-gray-700/50 hover:bg-gray-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
        <span>Crop</span>
      </button>
      <button
        onClick={() => setActiveTool("resize")} 
        // className="p-3 rounded-lg flex flex-col items-center bg-gray-700/50 hover:bg-gray-700 transition-colors">
        className={`p-3 rounded-lg flex flex-col items-center transition-all ${
          activeTool === "resize"
            ? "bg-blue-600/80 shadow-lg scale-105"
            : "bg-gray-700/50 hover:bg-gray-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
          />
        </svg>
        <span>Resize</span>
      </button>
      <button 
        onClick={() => setActiveTool("watermark")}
        className={`p-3 rounded-lg flex flex-col items-center transition-all ${
          activeTool === "watermark"
            ? "bg-blue-600/80 shadow-lg scale-105"
            : "bg-gray-700/50 hover:bg-gray-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <span>Watermark</span>
      </button>
      <button 
        onClick={saving}
        disabled={auth.guest}
        className={`p-3 rounded-lg flex flex-col items-center   transition-colors ${
        isClicked ? 'bg-blue-600/80 shadow-lg scale-105' : auth.guest?'bg-gray-700/20': 'bg-gray-700/50 hover:bg-gray-700'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
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
        <span>Save</span>
      </button>
      <button
        onClick={() => setActiveTool("mirror")} 
        className={`p-3 rounded-lg flex flex-col items-center transition-all ${
          activeTool === "mirror"
            ? "bg-blue-600/80 shadow-lg scale-105"
            : "bg-gray-700/50 hover:bg-gray-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>Mirror</span>
      </button>
      <button
        onClick={() => setActiveTool("compress")} 
        className={`p-3 rounded-lg flex flex-col items-center transition-all ${
          activeTool === "compress"
            ? "bg-blue-600/80 shadow-lg scale-105"
            : "bg-gray-700/50 hover:bg-gray-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15l10-8m0 0v16m0-16H2"
          />
        </svg>
        <span>Compress</span>
      </button>
      <button
        onClick={() => setActiveTool("bgremove")} 
       className={`p-3 rounded-lg flex flex-col items-center transition-all ${
          activeTool === "bgremove"
            ? "bg-blue-600/80 shadow-lg scale-105"
            : "bg-gray-700/50 hover:bg-gray-700"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>BG Remove</span>
      </button>
    </div>
  );
};

const ImageUpload = ({ handleImageUpload, resetChanges, image, deleteImage }) => {
    return (
    <div className="mb-6">
      {!image && (<label className="block mb-3">
        <span className="block text-sm font-medium mb-1">Upload Image</span>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="px-4 py-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-lg border border-blue-400/30 text-center cursor-pointer transition-colors">
            Choose File
          </div>
        </div>
      </label>)}
      {image && (
        <button
          onClick={resetChanges}
          className="w-full mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Reset Changes
        </button>
      )}
      {image && (
        <button
          onClick={deleteImage}
          className="w-full mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Delete this Image
        </button>
      )}
    </div>
  );
};



export default Toolbox;
