const { Router } = require('express')
const {
    GET_allPlataformsHandler,
} = require('../Handlers/Plataforms_Handler')

const Plataforms_router = Router()


Plataforms_router.get('/', GET_allPlataformsHandler)


module.exports = Plataforms_router