/* eslint-disable */

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './Pages/Blog'
import { Login } from './Pages/Login/Login'
import { Blogs } from './Pages/Blogs'
import { Publish } from './Pages/Publish'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
    
      <Route path='/' element={
        <Login/>
        }/>
      
      <Route path="/blog/:id" element={<Blog/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/publish" element={<Publish/>} />    
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
