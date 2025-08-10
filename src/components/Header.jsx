
const Header = ({ view, setView, logout,auth,loadGallery }) => {
  const guest = false;
  const handlelogout = () => {
    logout();
  };

  const handleGallery=()=>{
    loadGallery();
    setView("gallery");
  }

  return (
    <header className="flex flex-row bg-blue-600/90 shadow-lg backdrop-blur-sm justify-between">
      <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-row gap-2">
        <img className="sm:h-15 w-auto h-12" src="/src/assets/logo.svg" alt="logo" />
        <div className="flex flex-col ">
          <h1 className="sm:text-3xl text-2xl font-bold">Photogenic</h1>
          <p className="sm:text-md text-xs text-blue-100">
            Image Editing Studio
          </p>
        </div>
      </div>
      
      <button disabled className={`text-white font-bold ${auth.guest?'':'hidden'}`}>Hello Guest</button>

      <div className="flex flex-row gap-3 sm:gap-4 mx-1 sm:mx-5 my-2 px-3 py-4 sm:py-8">
        
        {view === "editor" && (
          <button
            onClick={handleGallery}
            disabled={auth.guest}
            className={`rounded text-white ${auth.guest?'hidden':''} font-bold px-2 bg-gradient-to-r from-sky-500 to-purple-400`}
          >
            Gallery
          </button>
        )}
        <button
          onClick={handlelogout}
          className="rounded text-red-600 font-bold px-2 bg-gradient-to-r from-red-300 to-red-200 "
        >
          {auth.guest?"Login": "signout"}
        </button>
      </div>
    </header>
  );
};

export default Header;
