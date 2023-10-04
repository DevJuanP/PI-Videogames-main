const { Videogame } = require('../db')

const postVG = async (body) =>{
    const {
        //id,
        name,
        description,
        platforms,
        image,
        released,
        rating,
        genres
    } = body
    const newGame = await Videogame.create({
        //id,
        name,
        description,
        platforms,
        image,
        released,
        rating,
        origin: 'DB'
    })
    newGame.addGenre(genres)
    return newGame
}

module.exports = postVG




