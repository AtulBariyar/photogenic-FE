
import logo from '../assets/logo.svg';
const Header = ({view,setView}) => {
  const guest= false;
  return (
    <header className="flex flex-row bg-blue-600/90 shadow-lg backdrop-blur-sm justify-between">
      <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-row gap-2">
        <img className='sm:h-15 w-auto h-12' src={logo} alt="logo" />
        <div className='flex flex-col '> 
          <h1 className="sm:text-3xl text-2xl font-bold">Photogenic</h1>
        <p className="sm:text-md text-xs text-blue-100">Image Editing Studio</p>
        </div>
       
      </div>
      <div className="flex flex-row gap-4 mx-5 my-2 px-3 py-5 sm:py-6">
        {/* <button disabled className={`text-white font-bold ${guest?'':'hidden'}`}>Hello Guest</button> */}
        {view==="editor" && 
        <button onClick={()=> setView("gallery")} className={`rounded text-white`}>Gallery</button>}
    <button className="rounded text-red-500 font-semibold">signout</button>
      </div>
    </header>
  );
};

export default Header;
