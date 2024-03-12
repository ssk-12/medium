import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { BlogPosts } from './pages/BlogPosts';
import { CreateBlog } from './pages/CreateBlog';
import { Blogs } from './components/Blogs';
import { Appbar } from './Appbar'
import { Drafts } from './pages/Drafts';
import { Userblogs } from './pages/Userblogs';



const Layout = () => {
  const location = useLocation();
  
  const hideAppbarPaths = ['/', '/signup', '/signin'];
  const showAppbar = !hideAppbarPaths.includes(location.pathname);

  return (
    <>
      {showAppbar && <Appbar/>}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth auth="signup" />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/dashboard" element={<BlogPosts />} />
        <Route path="/blog/:id" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/test" element={<Blogs />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/posts" element={<Userblogs />} />
      </Routes>
    </>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
