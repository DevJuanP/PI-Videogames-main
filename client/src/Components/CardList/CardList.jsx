import React, { useEffect } from 'react'
import './CardList.css'
import Card from '../Card/Card'
import { useSelector } from 'react-redux';



const CardList = () => {
  
  const VGtoShow = useSelector(state => state.VGtoShow);

  return (
    <div className='CardList'>
      {VGtoShow.map( (g, i) => <Card key={i} name={g.name} genres={g.genres} image={g?.image} id={g.id}/>)}
    </div>
  )
}

export default CardList