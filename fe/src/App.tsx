import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { BlogPosts } from './pages/BlogPosts'
import { CreateBlog } from './pages/CreateBlog'
import { Blogs } from './components/Blogs'
// import { Blog } from './pages/Blog'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<Auth auth="signup"/>} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/dashboard" element={<BlogPosts />} />
          <Route path="dashboard/blog/:id" element={<Blogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/test" element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App