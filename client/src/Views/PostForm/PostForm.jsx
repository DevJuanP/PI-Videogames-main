import React, { useEffect, useState } from 'react'
import './PostForm.css'
import { getAllGenres, getAllPlatforms, postVG } from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'


const PostForm = () => {

  const dispatch = useDispatch() 
  const platforms = useSelector(state => state.platforms)
  const genres = useSelector(state => state.genres)
  
  
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
    //console.log('mount');
    dispatch(getAllGenres())
    dispatch(getAllPlatforms())
  
    return () => {
      //console.log('unmount');
    };
  },[])
  
  const validate = (state, name) => {
    switch(name){
      case `name`:
        state.name === ''? setErrors({
          ...errors,
          name: 'campo requerido* '
        }) : setErrors({
          ...errors,
          name: ''
        })
        break;

      case `description`:
        state.description === ''? setErrors({
          ...errors,
          description: 'campo requerido* '
        }) : setErrors({
          ...errors,
          description: ''
        })
        break;

      case 'image':
        //console.log(name);
        state.image === ''? setErrors({
          ...errors,
          image: 'campo requerido* '
        }) : setErrors({
          ...errors,
          image: ''
        })
        break;

      case `released`:
        state.released === ''? setErrors({
          ...errors,
          released: 'campo requerido* '
        }) : setErrors({
          ...errors,
          released: ''
        })
        break;

      case `rating`:
        state.rating === ''? setErrors({
          ...errors,
          rating: 'campo requerido* '
        }) : setErrors({
          ...errors,
          rating: ''
        })
        break;

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
    console.log(state);
  }

  return (
    <div className='PostForm' onSubmit={handleSubmit}>
      {/* {console.log(state)} */}
       <form action="">
        <span>{errors.name}</span>
        <label htmlFor="name">Name:</label>
        <input onChange={handleChange} type="text" name='name'id='name'/><br /><br />

        <span>{errors.description}</span>
        <label htmlFor="description">Description:</label>
        <textarea onChange={handleChange} name="description" id="description" cols="25" rows="5"></textarea><br /><br />
        
        <div>
        <span>{errors.platforms}</span>
          <label htmlFor="platforms">Plataformas: </label>
          <select name="platforms" id="platforms">
            {platforms.map((p, i) => <option key={`${i}`} value={p}>{p}</option>)}
          </select>
          <button type='button' onClick={handleChange} name='addP'>➕</button><br /><br />
        </div> 

        <span>{errors.image}</span>
        <label htmlFor="image"> Imagen: </label>
        <input onChange={handleChange} type="text" name='image' id='image'/><br /><br />

        <span>{errors.released}</span>
        <label htmlFor="released">Lanzamiento: </label>
        <input onChange={handleChange} type="date" name='released' id='released' pattern="\d{4}-\d{2}-\d{2}"/><br /><br />

        <span>{errors.rating}</span>
        <label htmlFor="rating">Rating: </label>
        <input onChange={handleChange} type="number" name='rating' id='rating' step="0.01" min="0" placeholder="0.00"/><br /><br />

        <div>
        <span>{errors.genres}</span>
          <label htmlFor="genres">Generos: </label>
          <select name="genres" id="genres">
            {genres.map( (g, i) => <option key={`${i}`} value={g}>{g}</option>)}
          </select>
          <button type='button' onClick={handleChange} name='addG'>➕</button><br /><br />
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
  )
}

export default PostForm