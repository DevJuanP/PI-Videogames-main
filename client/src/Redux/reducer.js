import { GET_VG, GET_GENRES, GET_PLATFORMS, PAGINATE, GO_TO_PAGE, FILTER, ORDER, SEARCH, GET_DETAIL, CLEAR_DETAIL, CLEAR_ALL_VG } from './actions-types'

const initialState = {
    VGtoShow: [],
    allVG: [],
    genres: [],
    platforms: [],
    currentPage: 1,
    VGtoShowCount: 0,//modificado
    VGfiltered: [],//nuevo
    filterCriteria: [],
    detail: {},
    fromDetail: false
}

const reducer = (state = initialState, action) => {
    const cardsPerPage = 15
    let startIndex = 0
    switch (action.type){
        case GET_VG:
            if(state.fromDetail) return{...state, fromDetail: false}
            const VGShow = action.payload.slice((state.currentPage-1)*cardsPerPage, state.currentPage*cardsPerPage)

            return {
                ...state,
                allVG: action.payload,
                VGtoShow: VGShow,
                VGtoShowCount: action.payload.length,
                VGfiltered:  action.payload,
                filterCriteria: []
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            return{
                ...state,
                platforms: action.payload
            }
        case PAGINATE:// (←)     (→)
            const nextPage = state.currentPage + 1
            const prevpage = state.currentPage - 1//        1         2        3 
            startIndex = action.payload === 'next' ///[ 0, ..., 14, 15, ..., 29, 30]
            ? state.currentPage * cardsPerPage
            : (state.currentPage-2) * cardsPerPage
            
            const numberOfpages = Math.ceil(state.VGtoShowCount/cardsPerPage) 

            if((action.payload === 'prev' && state.currentPage == 1) 
            || (action.payload === 'next' && state.currentPage == numberOfpages)) return state
            return{
                ...state,
                VGtoShow: state.VGfiltered.slice(startIndex, startIndex + cardsPerPage),
                currentPage: action.payload === 'next'? nextPage: prevpage,
            }
        case GO_TO_PAGE:
            startIndex = (action.payload - 1)*cardsPerPage

            return{
                ...state,
                currentPage: action.payload,
                VGtoShow: state.VGfiltered.slice(startIndex, startIndex + cardsPerPage)
            }
        case FILTER:
            let currentFilterCriteria = []
            if(action.payload[0] !== '*'){
                if(state.filterCriteria.includes(action.payload)){
                    currentFilterCriteria = [...state.filterCriteria]
                }else{
                    currentFilterCriteria = [...state.filterCriteria, action.payload]
                }
            }else{
                currentFilterCriteria = state.filterCriteria.filter( c => c !== action.payload.slice(1))
            }

            let filtered =[...state.allVG]
        
            currentFilterCriteria.forEach( c => {
                let searchLocation = 'origin'
                if(state.platforms.includes(c)) searchLocation = 'platforms'
                if(state.genres.includes(c)) searchLocation = 'genres'

                filtered = filtered.filter( vg =>{
                    if (!Array.isArray(vg.platforms)) return false
                    return searchLocation === 'origin'
                    ? vg.origin === c
                    : vg[searchLocation].includes(c)
                })
            })
            
            return{
                ...state,
                filterCriteria: currentFilterCriteria,
                VGfiltered: filtered,
                VGtoShow: filtered.slice(0,cardsPerPage),
                VGtoShowCount: filtered.length,
                currentPage: 1
            }

        case ORDER:
            const order = [...state.VGfiltered]

            switch(action.payload){
                case 'AZ':
                    order.sort((VGa, VGb) => VGa.name.localeCompare(VGb.name))
                    break
                case 'ZA':
                    order.sort((VGa, VGb) => VGb.name.localeCompare(VGa.name))
                    break
                case 'asc':
                    order.sort((VGa, VGb) => VGa.rating - VGb.rating)
                    break
                case 'des':
                    order.sort((VGa, VGb) => VGb.rating - VGa.rating)
                    break
                default:
                    break;
            }

            return {
                ...state,
                VGfiltered: order,
                currentPage: 1,
                VGtoShow: order.slice(0, cardsPerPage)
            }
        
        case SEARCH:
            return {
                ...state,
                allVG: action.payload,
                VGfiltered: action.payload,
                VGtoShowCount: action.payload.length,
                VGtoShow: action.payload.slice(0, cardsPerPage),
                filterCriteria: [],
                currentPage: 1
            }

        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }

        case CLEAR_DETAIL:
            return{
                ...state,
                detail: {},
                //filterCriteria: []
                fromDetail: true
            }

        case CLEAR_ALL_VG:
            console.log('clear all');
            return{
                ...state,
                VGtoShow: [],
                allVG: [],
                VGfiltered: [],
                filterCriteria: []
            }

        default:
            return{... state}
    }     
}

export default reducer

