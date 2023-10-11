import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './Views/Landing/Landing'
import  NavBar from './Components/NavBar/NavBar'
import Home from './Views/Home/Home'
import PostForm from './Views/PostForm/PostForm'
import About from './Views/About/About'
import Detail from './Views/Detail/Detail'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const path = useLocation()
  return (
    <>
      {path.pathname==='/'? null:<NavBar />}
      <Routes>
        <Route 
          path='/'
          element={<Landing/>}
        />
        <Route 
          path='/home'
          element={<Home/>}
        />
        <Route 
          path='/postform'
          element={<PostForm/>}
        />
        <Route 
          path='/about'
          element={<About/>}
        />
        <Route 
          path='/detail/:id'
          element={<Detail/>}
        />
      </Routes>
      
    </>
  )
}

export default App
