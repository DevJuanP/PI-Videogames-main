import {GET_VG, GET_GENRES, GET_PLATFORMS, PAGINATE, GO_TO_PAGE, FILTER, ORDER, SEARCH, GET_DETAIL, CLEAR_DETAIL, CLEAR_ALL_VG } from './actions-types'
import axios from 'axios'
const API = 'http://localhost:3001'//back

export const getAllVG = () => {
    return async (dispatch) => {
        try {
            const response = await axios(`${API}/videogames/`)
            return dispatch({ type: GET_VG, payload: response.data })
        } catch (error) {
            console.log({error: error.message});
        }
    }
}

export const getAllGenres = () => {
    return async (dispatch) => {
        try {
            const response = await axios(`${API}/genres/`)
            return dispatch({ type: GET_GENRES, payload: response.data })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const getAllPlatforms = () => {
    return async (dispatch) => {
        try {
            const response = await axios(`${API}/platforms/`)
            return dispatch({ type: GET_PLATFORMS, payload: response.data })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const postVG = (data) => {
    return async () => {
        try {
            const response = await axios.post(`${API}/videogames/`, data)
            alert(response.data.succses)
        } catch (error) {
            alert(error.response.data.error)
        }
    }
} 

export const paginateVG =  (direction) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: PAGINATE, payload: direction})
        } catch (error) {
            console.log(error);
        }
    }
} 

export const goToPageVG =  (name) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: GO_TO_PAGE , payload: Number(name)})
        } catch (error) {
            console.log(error);
        }
    }
} 

export const filter = (name) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: FILTER, payload: name})
        } catch (error) {
            console.log(error);
        }
    }
} 

export const order = (value) => {
    return async (dispatch) => {
        try {
            return dispatch({ type: ORDER, payload: value})
        } catch (error) {
            console.log(error);
        }
    }
}

export const search = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios(`${API}/videogames?name=${name}`)
            return dispatch({ type: SEARCH, payload: response.data })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios(`${API}/videogames/${id}`)
            console.log('responce',response);
            return dispatch({ type: GET_DETAIL, payload: response.data })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
} 

export const clearDetail = () => {
    return async (dispatch) => {
        try {
            return dispatch({ type: CLEAR_DETAIL, payload: [] })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const clearAllVG = () => {
    return async (dispatch) => {
        try {
            return dispatch({ type: CLEAR_ALL_VG, payload: 'clear' })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}