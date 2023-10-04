//const isFrom = require('../Utils/isFrom')
const {validate} = require ('uuid')
const {Videogame, Genre} = require('../db')
const axios = require('axios')
require('dotenv').config()

const {API_KEY} = process.env
 
const getVGbyID = async (id) => {
    try {
        if(validate(id)){ ///si es de la DB
            const gameDB = await Videogame.findByPk(id, {
                include:[
                    {
                        model: Genre,
                        attributes: ['name']
                    }, //other models
                ]
            })
            if(!gameDB) throw new Error('no hay juego con ese UUID')
            return { 
                id: gameDB.id,
                name: gameDB.name,
                description: gameDB.description,
                platforms: gameDB.platforms,
                image: gameDB.image,
                released: gameDB.released,
                rating: gameDB.rating,
                origin: gameDB.origin,
                genres: gameDB.genres.map(g => g.name)
            }
        }
    
        const apiResponse = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const dataAPI = apiResponse.data
        //if(!dataAPI.id) return {error: dataAPI.detail}
    
        const gameAPI = {
            id: dataAPI.id,
            name: dataAPI.name,
            description: dataAPI.description,
            platforms: dataAPI.platforms.map(p => p.platform.name),
            image: dataAPI.background_image,
            released: dataAPI.released,
            rating: dataAPI.rating,
            origin: 'API',
            genres: dataAPI.genres.map(g => g.name)
        }
    
        return gameAPI
        
    } catch (error) {
        return 'no existe videogame con ese id'
    }

}

module.exports = getVGbyID