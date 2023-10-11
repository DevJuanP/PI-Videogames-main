import React, { useEffect } from 'react'
import './Detail.css'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail, clearDetail } from '../../Redux/actions'
import loading from '../../assets/loading.gif'

const Detail = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const detail = useSelector( state => state.detail )
  const isLoading = !detail || Object.keys(detail).length === 0;

  

  useEffect(() => {
    dispatch(getDetail(id))
  
    return () => {
      dispatch(clearDetail())
    }
  }, [])

  

  return (
    
    <div className='Detail'>
      {
        isLoading 
        ? (<img className='loading' src={loading}></img>)
        : <>
            <h1 className='title' >DETAIL: {detail?.name}</h1>

            <div className='description' dangerouslySetInnerHTML={{ __html: detail?.description }}/>
            <div className='image-detail'>
              <img src={detail?.image} alt="img" />
              <div>
                <div className='detalles'>
                  <div className='key'><strong>Platforms:</strong></div>
                  <div>{detail?.platforms?.join('  |  ')}</div>
                </div>
                <div className='detalles'>
                  <div className='key'><strong>Released:</strong></div>
                  <div>{detail?.released}</div>
                </div>
                <div className='detalles'>
                  <div className='key'><strong>Rating:</strong></div>
                  <div>{detail?.rating}</div>
                </div>
                <div className='detalles'>
                  <div className='key'><strong>Genres:</strong></div>
                  <div>{detail?.genres?.join('  |  ')}</div>
                </div>
              </div>
            </div>

            <div className='id'>ID: {detail.id}</div>

          </>
      }
    </div>
  )
}

export default Detail