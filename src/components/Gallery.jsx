import React from 'react'

export default function Gallery({setView,savedImages}) {
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  My Saved Images
                </h2>
                <button
                  onClick={() => setView("editor")}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Back to Editor
                </button>
              </div>

              {savedImages.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-lg shadow">
                  <p className="text-gray-500">No saved images yet.</p>
                </div>
              ) : (
                
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {savedImages.map((image) => (
                    <div key={image.id} className="p-2 bg-white rounded-lg shadow">
                      <img
                        src={`data:image/jpeg;base64,${image.imageData}`}
                        alt={`Saved fig ${image.id}`}
                        className="w-full h-auto object-cover rounded-md aspect-square"
                        onError={(e) =>
                          (e.target.src =
                            "https://placehold.co/300x300?text=Image+Error")
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
  )
}
