import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Landing.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVG } from '../../Redux/actions'


const Landing = () => {
  const dispatch = useDispatch()
  const allVG = useSelector( state => state.allVG )
  const allImage = allVG.filter( vg => vg.origin === 'API' ).map( vg => vg.image )
  

  const BGCRef = useRef()
  

  const ChangeBG = () => {
    if (BGCRef.current) {
      let i = Math.round(Math.random() * (allImage.length - 1))
      const imageURL = `url(${allImage[i]})`
      BGCRef.current.style.backgroundImage = imageURL
    }
  }


  useEffect(() => {
    
    dispatch(getAllVG())
    setInterval(ChangeBG, 3000)
    return () => {}
  }, [])
  
  return (
    <div className='Landing' ref={BGCRef} >{/*backgroundContainer*/}
      <span className='land'>WELCOME</span>
      <NavLink to={'/home'}>
        <button>VideoGames</button>
      </NavLink>
    </div>
  )
}

export default Landing