const {Router} = require('express')
const {
    GET_allGenresHandler,
} = require('../Handlers/Genres_Handlers')

const Genres_router = Router()


Genres_router.get('/', GET_allGenresHandler)


module.exports = Genres_router