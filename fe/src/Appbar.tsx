import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function Appbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState<boolean>(false); 
  const menuRef = useRef<HTMLDivElement>(null); 

  const isCreatePage = location.pathname === '/create' || location.pathname === '/drafts'  ;

  const handleCreateBlog = () => {
    navigate('/create');
  };

  const handleSignOut = () => {
    localStorage.removeItem("username"); 
    localStorage.removeItem("token"); 
    navigate('/signin');
  };

  
  const navigateTo = (path: string) => { 
    navigate(path);
    setShowMenu(false); 
  }

  useEffect(() => {
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className='max-w-screen flex bg-slate-300 rounded-full justify-between text-sm items-center align-middle p-2 m-2 max-h-[84px] font-semibold'>
      <div className='text-black pl-4'>
        <Link to={"/dashboard"}>Blog</Link>
      </div>
      <div className='flex justify-evenly items-center align-middle gap-5'>
        {!isCreatePage && (
          <div>
            <button onClick={handleCreateBlog} className='rounded-full bg-green-500 px-2 py-1 text-xs font-bold'>Create a blog</button>
          </div>
        )}
        {isCreatePage && (
          <div>
            <button onClick={() => navigate('/dashboard')} className='rounded-full bg-blue-500 px-2 py-1 text-xs font-bold'>Go to Dashboard</button>
          </div>
        )}
        <div className='relative' ref={menuRef}>
          <div className='pr-4 cursor-pointer' onClick={() => setShowMenu(!showMenu)}>
            {localStorage.getItem("username")}
          </div>
          {showMenu && (
            <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20'>
              <a  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => navigateTo('/drafts')}>Drafts</a>
              <a  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => navigateTo('/posts')}>Posts</a>
              <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={() => navigateTo('/account')}>Account</a>
            </div>
          )}
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
