import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo VG_4.svg'
import './NavBar.css'
import '../../Views/PostForm/PostForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVG, search } from '../../Redux/actions'

const NavBar = () => {

  const dispatch = useDispatch()
  const VGtoShowCount = useSelector( state => state.VGtoShowCount)
  const path = useLocation()

  const handleSearch = () => {
    const toSearch = document.getElementById('search').value
    dispatch(search(toSearch))
  }


  return (
      <div className='NavBar'>
        
        <div className='superior'>{/*logo, search, fav y form*/}
          <div className='logo'>
          <NavLink to={'/'}><img src={logo} alt="logo" /></NavLink>
          </div>

          <div className='SeachBar'>
            <input className='search' type="search" id='search'/>
            <NavLink to={'/home'}><button className='sendButton' onClick={handleSearch} >Search</button></NavLink>
          </div>

          <div className='formFav'>
            <div className='fav'>FAV💘</div>
            <NavLink to={'/postform'}><button>Add VideoGame</button></NavLink>
          </div>
        </div>

        <div className='links'>
          <NavLink to={'/home'}><button>Home</button></NavLink>
          <button onClick={() => dispatch(getAllVG())} disabled={VGtoShowCount === 100}>ALL VIDEOGAMES</button>
          <NavLink to={'/about'}><button>About</button></NavLink>
        </div>
        

      </div>
      
    
  )
}

export default NavBar