import React, { useEffect }from 'react'
import './Home.css'
import CardList from '../../Components/CardList/CardList'
import logob from '../../assets/logo VG_3.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVG, getAllGenres, getAllPlatforms, paginateVG, goToPageVG, filter, order } from '../../Redux/actions'

const Home = () => {
  // change: numberOfVG
  const dispatch = useDispatch()
  //const allVG = useSelector( state => state.allVG)
  //const VGtoShow = useSelector( state => state.VGtoShow)
  const VGtoShowCount = useSelector( state => state.VGtoShowCount )
  const currentPage = useSelector( state => state.currentPage )
  const platforms = useSelector( state => state.platforms )
  const genres = useSelector( state => state.genres )
  const filterCriteria = useSelector( state => state.filterCriteria )
  const cardsPerPage = 15

  const numberOfpages = Math.ceil(VGtoShowCount/cardsPerPage)
  const pages = Array(numberOfpages).fill(1)

 
  useEffect(() => {
   dispatch(getAllVG())
   dispatch(getAllGenres())
   dispatch(getAllPlatforms())
 
   return () => {
     
   }
  }, [])

  const paginate = (event) => {
    
    if(currentPage == numberOfpages  && event.target.name === 'next') return
    if(currentPage == 1 && event.target.name === 'prev') return

    dispatch(paginateVG(event.target.name))
    let pageToGo = currentPage + (event.target.name === 'next'? 1:-1)

    //poner blanco el boton
    const toGoButton = document.getElementById(pageToGo)
    const currentButton = document.getElementById(currentPage)
    
    toGoButton.classList.add('button-outline');
    currentButton.classList.remove('button-outline');
    
  }

  const goToPage = (event) => {
    const currentButton = document.getElementById(currentPage) 
    currentButton.classList.remove('button-outline');
    const toGoButton = document.getElementById(event.target.id)
    toGoButton.classList.add('button-outline')
    dispatch(goToPageVG(event.target.id))
  }

  const handleFilter = (event) => {
    dispatch(filter(event.target.value)) //name: p, g, DB, API.
    if(event.target.id === 'remove') return
    const optionSelect = document.getElementById(event.target.id)
    optionSelect.value = 'default'
  }

  const handleOrder = (event) => {
    dispatch(order(event.target.value))

    if(event.target.id === 'nameOder'){
      const optionSelect = document.getElementById('ratingOrder')
      optionSelect.value = 'default'
      return
    }
    if(event.target.id === 'ratingOrder'){
      const optionSelect = document.getElementById('nameOder')
      optionSelect.value = 'default'
      return
    }
  }

  return (
    <div className='home'>
      <div className='image'>
        <img src={logob} alt="logo" />
      </div>

      <div className='FilterOrder'>
        <div className='filter'>
          <div className='enLinea'>
            <span>filter by platforms</span><br />{/*borrar name ↓↓↓*/}
            <select name="platforms" id="platforms" onChange={handleFilter} defaultValue="default">
              <option value="default" disabled>Selecciona una opción</option>
              {platforms.map((p, i) => <option key={`${i}`} value={p} >{p}</option>)}
            </select>
          </div>

          <div className='enLinea'>
            <span>filter by genres</span><br />
            <select name="genres" id="genres" onChange={handleFilter} defaultValue="default">
              <option value="default" disabled>Selecciona una opción</option>
              {genres.map( (g, i) => <option key={`${i}`} value={g} >{g}</option>)}
            </select>
          </div>

          <div className='enLinea'>
            <span>filter by origin</span><br />
            <select name="origin" id="origin" onChange={handleFilter} defaultValue="default">
              <option value="default" disabled>Selecciona una opción</option>
              <option value="DB">DB</option>
              <option value="API">API</option>
            </select>
          </div>

          <div>
            {filterCriteria.map((c, i) => <button id='remove' onClick={handleFilter} key={i} value={`*${c}`}>{`${c} ✖`}</button>)}
          </div>
        </div>

        <div className='order'>
          <div className='enLinea'>
            <span>order by name</span><br />
            <select  onChange={handleOrder} defaultValue="default" id='nameOder'>
              <option value="default" disabled>Selecciona una opción</option>
              <option value="AZ">A → Z</option>
              <option value="ZA">Z → A</option>
            </select>
          </div>

          <div className='enLinea'>
            <span>order by rating</span><br />
            <select  onChange={handleOrder} defaultValue="default" id='ratingOrder'>
              <option value="default" disabled>Selecciona una opción</option>
              <option value="asc">Menor rating</option>
              <option value="des">Mayor rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className='buttons'>
          <button name='prev' onClick={paginate} className='pag'>⬅</button>
          {
            pages.map( (e, i) => {
              return(
                <button className={(i+1)==currentPage? 'button-outline': null} key={i} id={i+1} onClick={goToPage}>{i+1}</button>
              )
            })
          }
          <button name='next' onClick={paginate} className='pag'>➡</button>
      </div>

      <CardList />

    </div>

    
  )
}

export default Home