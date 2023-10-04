const {Genre} = require('../db')
const axios = require('axios')
require('dotenv').config()

const {API_KEY} = process.env

const getGenresfromDB = async () => {
    let genreDB = await Genre.findAll()
    if(!genreDB.length){
        const responseApi = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genres = responseApi.data.results//array

        /*genres.forEach(async g => {
            await Genre.create({name: g.name})
        })*/

        for (const g of genres) {
            await Genre.create({ name: g.name });
        }

        genreDB = await Genre.findAll();
    }

    return genreDB.map(g => g.name)
}

module.exports = getGenresfromDB