import React, { useEffect } from 'react'
import './Card.css'
import { NavLink, useSearchParams } from 'react-router-dom'

const Card = ({ name, genres, image, id}) => {
  //console.log(g);

  
  return (

    <NavLink to={`/detail/${id}`}>
      <div className='Card'>
          <img className='img' src={`${image}`} alt="videogame" />
          <div>
            <span><strong className='fontlight'>{name}</strong></span>
            <div className='genres'>
              {genres.join(' - ')}
            </div>
          </div>
        
      </div>
    </NavLink>
  )
}

export default Card