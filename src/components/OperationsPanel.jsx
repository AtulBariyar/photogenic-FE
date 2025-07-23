// OperationsPanel.jsx
const OperationsPanel = ({ operations, setOperations , handleExport, setNotification}) => {
  const handleSingleOp=(index)=>{
    const newArray = [... operations];
    newArray.splice(index,1);
    setOperations(newArray);
    setNotification({
        type: "info",
        message: "Cleared History!",
      });
  };

  const handleOperations=()=>{
    setOperations([]);
    setNotification({
        type: "info",
        message: "Cleared all History!",
      });
  };


  return (
    // <div className="order-3 md:order-3 w-full lg:w-72 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-5">
    //   <h2 className="text-xl font-semibold mb-5 pb-2 border-b border-gray-700">Operations</h2>
    //   <ul className="space-y-2">
    //     {operations.map((op, index) => (
    //       <li key={index} className="flex justify-between">
    //         <span>{op.type}</span>
    //         <span>{JSON.stringify(op.params)}</span>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div className="order-3 w-full lg:w-72 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-5">
             <ExportOptions handleExport={handleExport} />
            <h2 className="text-xl font-semibold mb-5 pb-2 border-b border-gray-700">History</h2>

            <div className="space-y-3">
              
              {operations.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Your editing history will appear here</p>
                </div>
              ) : (
                <>
                  {operations.map((op, index) => (
                    <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium capitalize">{op.type}</span>
                          {typeof op.params === 'number' ? (
                            <span>: {op.params}°</span>
                          ) : (
                            <div className="text-sm mt-1">
                              <div>X: {Math.round(op.params.x)}%</div>
                              <div>Y: {Math.round(op.params.y)}%</div>
                              <div>Size: {Math.round(op.params.width)}×{Math.round(op.params.height)}</div>
                            </div>
                          )}
                        </div>
                        <button onClick={()=>{handleSingleOp(index)}}
                        className="text-gray-400 hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  <button onClick={handleOperations} className="w-full mt-4 p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    Clear History
                  </button>
                </>
              )}
            </div>
          </div>
  );
};

const ExportOptions = ({ handleExport }) => {
  return (
    <div className="mt-2 mb-5">
      <h3 className="text-xl font-medium mb-3 pb-2 border-b border-gray-700">Export Options</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleExport("png")}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hRemove this line when pasting into your code-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          PNG
        </button>
        <button
          onClick={() => handleExport("jpg")}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          JPG
        </button>
        <button
          onClick={() => handleExport("pdf")}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg col-span-2 flex items-center justify-center gap-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          PDF
        </button>
      </div>
    </div>
  );
};

export default OperationsPanel;
