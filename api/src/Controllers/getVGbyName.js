const axios = require('axios')
const {Op} = require('sequelize')
require('dotenv').config()
const { API_KEY } = process.env
const description = require('../Utils/description')
const {Videogame, Genre} = require('../db')

const getVGbyName = async (name) => {
    //// by Name de la DB
    const tofind = name.split(' ')
    let gameDB = await Videogame.findAll({
        include:[
            {
                model: Genre,
                attributes: ['name']
            }, //other models
        ],
        where: {
            [Op.or]: tofind.map(str => {
                return{
                    name: {
                        [Op.iLike]: `%${str}%`
                    }
                }
            })
        }
    })

    gameDB = gameDB.map(vg => {
        return {
            id: vg.id,
            name: vg.name,
            description: vg.description,
            platforms: vg.platforms,
            image: vg.image,
            released: vg.released,
            rating: vg.rating,
            origin: vg.origin,
            genres: vg.genres.map(g => g.name)
        }
    })

    if(gameDB.length >= 15) return gameDB.slice(0, 15)

    //// by Name de la API
    const size = 15 - gameDB.length
    const apiResponce = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=${size}`)
    const games = apiResponce.data.results
    //console.log('games: ', games);
    const gameAPI =[]
    games.forEach(g => {
        gameAPI.push({
            id: g.id,
            name: g.name,
            description: description(g),
            platforms: g.platforms?.map(p => p.platform.name),
            image: g.background_image,
            released: g.released,
            rating: g.rating,
            origin: 'API',
            genres: g.genres?.map(g => g.name)
        })
    }) 
    //console.log('games: ',gameAPI);
    //// juntamos y retornamos
    return [...gameDB, ...gameAPI]
}

module.exports = getVGbyName