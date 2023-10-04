const axios = require('axios')
require('dotenv').config()
const {API_KEY} = process.env
const {Videogame, Genre} = require('../db')
const description = require('../Utils/description')

const getAllVG = async (n) => {
    
    let allVG_BD = await Videogame.findAll({
        include:[
            {
                model: Genre,
                attributes: ['name']
            }, //other models
        ]
    })

    const size = n - allVG_BD.length//size son los que se extraen de la API
    allVG_BD = allVG_BD.map(vg => {
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

    if(size <= 0) return allVG_BD

    //me los traigo de 40 en 40 exepto el último
    const enteros = Math.floor(size/40), lastPage = size-40*enteros
    const sizesByPage = Array(enteros).fill(40)//.push(lastPage)
    sizesByPage.push(lastPage)//si es 194 → [40, 40, 40, 40, 34]


    const toResolve = sizesByPage.map( async (size, i) => {//array de promesas
        let apiResponse = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i+1}&page_size=${size}`)
        return apiResponse.data.results.map(g => {
            return{
                id: g.id,
                name: g.name,
                description: description(g),
                platforms: g.platforms.map(p => p.platform.name),
                image: g.background_image,
                released: g.released,
                rating: g.rating,
                origin: 'API',
                genres: g.genres.map(g => g.name)
            }
        })
        //gameAPI.push(VG_pack)
    })

    const allVG_API = (await Promise.all(toResolve)).flat()

    return [...allVG_BD, ...allVG_API]
}

module.exports = getAllVG