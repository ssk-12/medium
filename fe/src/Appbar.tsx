import { useNavigate } from 'react-router-dom';

export function Appbar() {

  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate('/create');
  };
  const handleSignOut = () => {
    localStorage.removeItem("username"); 
    localStorage.removeItem("token"); 
    navigate('/signin');
  };
  return (
    <div className='max-w-screen flex bg-slate-300 rounded-full justify-between text-sm items-center align-middle p-2 m-2 max-h-[84px] font-semibold'>
      <div className='text-black pl-4'>
        Blog
      </div>
      <div className='flex justify-evenly items-center align-middle gap-5'>
        <div>
          <button onClick={handleCreateBlog} className='rounded-full bg-green-500 px-2 py-1 text-xs font-bold'>Create a blog</button>
        </div>
        <div className='pr-4'>
          {localStorage.getItem("username")}
        </div>
        <div>
          <button onClick={handleSignOut} className='rounded-full p-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}