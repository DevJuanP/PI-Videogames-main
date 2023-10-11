import React, { useEffect, useState } from 'react'
import './PostForm.css'
import { getAllGenres, getAllPlatforms, postVG, clearAllVG } from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'



const PostForm = () => {

  const dispatch = useDispatch() 
  const platforms = useSelector(state => state.platforms)
  const genres = useSelector(state => state.genres)
  const allVG = useSelector( state => state.allVG )
  const allnames = allVG.map( vg => vg.name)
  const url = 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?'
  const currentDate = new Date();
  
  const [state, setState] = useState({
    name: '',
    description: '',
    image: '',
    released: '',
    rating: 0,
    genres: [],
    platforms:[]
  })
  
  const [errors, setErrors] = useState({
    name: 'campo requerido* ',
    description: 'campo requerido* ',
    image: 'campo requerido* ',
    released: 'campo requerido* ',
    rating: 'campo requerido* ',
    genres: 'campo requerido* ',
    platforms:'campo requerido* '
  })

  useEffect(() => {
    
    dispatch(getAllGenres())
    dispatch(getAllPlatforms())
  
    return () => {
      dispatch(clearAllVG())
      
    };
  },[])
  
  const validate = (state, name) => {
    switch(name){
      case `name`:
        if(state.name === "") setErrors({...errors, name: 'campo requerido*'})
        else if(state.name.length<4 || state.name.length>20) setErrors({...errors, name: 'el nombre debe tener entre 3 y 20 caracteres'})
        else if(!/^[a-zA-Z0-9\-": ]+$/.test(state.name)) setErrors({...errors, name: 'solo usar simbolos alfanuméricos, "", - y :'})
        else if(allnames.includes(state.name)) setErrors({...errors, name: 'este nombre ya existe'})
        else setErrors({...errors, name: ''}); break
      
      case `description`:
        if(state.description === "") setErrors({...errors, description: 'campo requerido*'})
        else if(state.description.length<16 || state.description.length>300) setErrors({...errors, description: 'el nombre debe tener entre 15 y 300 caracteres'})
        else if(!/^[a-zA-Z0-9\-": ]+$/.test(state.description)) setErrors({...errors, description: 'solo usar simbolos alfanuméricos, "", - y :'})
        else setErrors({...errors, description: ''}); break

      case 'image':
        if(state.image === "") setErrors({...errors, image: 'campo requerido*'})
        else if(!/^(https?|ftp):\/\/\S+$/.test(state.image)) setErrors({...errors, image: 'La URL de la imagen no es válida.'})
        else setErrors({...errors, image: ''}); break

      case `released`:
        if(state.released === "") setErrors({...errors, released: 'campo requerido*'})
        else if(!/^\d{4}-\d{2}-\d{2}$/.test(state.released)) setErrors({...errors, released: 'El formato de fecha debe ser yyyy-mm-dd'})
        else if((new Date(state.released))> currentDate) setErrors({...errors, released: 'No se permiten fechas futuras.'})
        else setErrors({...errors, released: ''}); break

      case `rating`:
        if(state.rating === "") setErrors({...errors, rating: 'campo requerido*'})
        else if(!/^(?:[0-5](?:\.\d{1,2})?)$/.test(state.rating)) setErrors({...errors, rating: 'debe ser un número entre 0 y 5 con 2 decimales'})
        else setErrors({...errors, rating: ''}); break

      case 'genres':
        state.genres.length === 0
          ? setErrors({
              ...errors,
              genres: 'campo requerido* ',
            })
          : setErrors({
              ...errors,
              genres: '',
            });
        break;
  
      case 'platforms':
        state.platforms.length === 0
          ? setErrors({
              ...errors,
              platforms: 'campo requerido* ',
            })
          : setErrors({
              ...errors,
              platforms: '',
            });
        break;
      default:
        break;
    }
  }

  const handleChange = (event) =>{
    //console.log(event.target.name, event.target.value);
    //event.preventDefault()
    switch(event.target.name){
      case 'addP':
        let pValue = document.getElementById('platforms').value
        if(state.platforms.includes(pValue)) break;//votar error
        setState({
          ...state,
          platforms: [...state.platforms, pValue]
        })
        validate({
          ...state,
          platforms: [...state.platforms, pValue]
        },'platforms')
        break;
      
      case 'addG':
        let gValue = document.getElementById('genres').value
        if(state.genres.includes(gValue)) break;//votar error
        setState({
          ...state,
          genres: [...state.genres, gValue]
        })
        validate({
          ...state,
          genres: [...state.genres, gValue]
        },'genres')
        break;

      case 'imageDefault':
        const imgInput = document.getElementById('image')
        imgInput.value = url
        setState({
          ...state,
          image: url
        })
        validate({
          ...state,
          image: url
        }, 'image')
        break;

      default:
        setState({ 
          ...state,
          [event.target.name]: event.target.value
        })
        validate({ 
          ...state,
          [event.target.name]: event.target.value
        }, event.target.name)
    }

  }

  const handleRemove = (event) => {
    setState({
      ...state,
      platforms: [...state.platforms].filter(p => p !== event.target.id),
      genres: [...state.genres].filter(g => g !== event.target.id)
    })
    validate({
      ...state,
      platforms: [...state.platforms].filter(p => p !== event.target.id),
      genres: [...state.genres].filter(g => g !== event.target.id)
    }, event.target.name)
  }

  const disableHandler = () => {
    let totalError = '';
    for(let error in errors){
      totalError += errors[error]
    }
    return totalError.length? true: false
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postVG({
      ...state,
      genres: state.genres.map( g => genres.indexOf(g)+1),
      platforms: state.platforms.map( p => platforms.indexOf(p)+1)
    }))
  }

  return (
    <div className='PostForm' onSubmit={handleSubmit}>
      <h2>Crea un Videojuego</h2>

      <div className='FormView'>
        <form className='form' action="">
        <div className='campo'>
          <span>{errors.name}</span>
          <div className='colum'>
            <label htmlFor="name">Name:</label>
            <input onChange={handleChange} type="text" name='name'id='name'/><br /><br />
          </div>
        </div>

        <div className='campo'>
          <span>{errors.description}</span>
          <div className='colum'>
            <label htmlFor="description">Description:</label>
            <textarea onChange={handleChange} name="description" id="description" cols="50" rows="3"></textarea><br /><br />
          </div>
        </div>

        <div className='campo'>
          <span>{errors.platforms}</span>
          <div className='colum'>
            <label htmlFor="platforms">Plataformas: </label>
            <select name="platforms" id="platforms">
              {platforms.map((p, i) => <option key={`${i}`} value={p}>{p}</option>)}
            </select>
            <button type='button' onClick={handleChange} name='addP'>add➕</button><br /><br />
          </div>
        </div>

        <div className='campo'>
          <span>{errors.image}</span>
          <div className='colum'>
            <label htmlFor="image"> Imagen: </label>
            <input onChange={handleChange} type="text" name='image' id='image'/>
            <button type='button' name='imageDefault' onClick={handleChange}>img by default</button><br /><br />
          </div>
        </div>

        <div className='campo'>
          <span className='error'>{errors.released}</span>
          <div className='colum'>
            <label htmlFor="released">Lanzamiento: </label>
            <input onChange={handleChange} type="date" name='released' id='released' pattern="\d{4}-\d{2}-\d{2}"/><br /><br />
          </div>
        </div>

        <div className='campo'>
          <span>{errors.rating}</span>
          <div className='colum'>
            <label htmlFor="rating">Rating: </label>
            <input onChange={handleChange} type="number" name='rating' id='rating' step="0.01" min="0" placeholder="0.00"/><br /><br />
          </div>
        </div>

        <div className='campo'>
          <span>{errors.genres}</span>
          <div className='colum'>
            <label htmlFor="genres">Generos: </label>
            <select name="genres" id="genres">
              {genres.map( (g, i) => <option key={`${i}`} value={g}>{g}</option>)}
            </select>
            <button type='button' onClick={handleChange} name='addG'>add➕</button><br /><br />
          </div>
        </div>
        
        <button type='submit' disabled={disableHandler()}>Crear</button>
        </form>

        <div>
        <h3>*previsualización-despegable*</h3>
        <div>
        <span>Plataformas:</span>
          {
            state.platforms.map((p, i) => <div key={i}>
              <span>{p}</span>
              <button type='button' onClick={handleRemove} id={p} name='platforms'>✖</button>
            </div>)
          }
        </div><br />
        <div>
        <span>generos:</span>
          {
            state.genres.map((g, i) => <div key={i}>
              <span>{g}</span>
              <button type='button' onClick={handleRemove} id={g} name='genres'>✖</button>
            </div>)
          }
        </div>
        </div>
      </div>

    </div>
  )
}

export default PostForm