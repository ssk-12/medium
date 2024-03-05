import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/Auth'
// import { Blog } from './pages/Blog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Auth/>} />
          <Route path="/signup" element={<Auth auth="signup"/>} />
          <Route path="/signin" element={<Auth />} />
          {/* <Route path="/blog/:id" element={<Blog />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App