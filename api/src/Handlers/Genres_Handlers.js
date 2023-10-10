const getGenresfromDB = require('../Controllers/getGenresfromDB')


const GET_allGenresHandler = async (req, res) => {
    
    try {
        const genres = await getGenresfromDB()//si está vacio carga la db con la api
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    GET_allGenresHandler,
}