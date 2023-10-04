const {Router} = require('express')

const {
    GET_VGallorByNameHandler,
    GET_VGbyIdHandler,
    POST_VGHandler
} = require('../Handlers/VG_Handlers')
const VG_router = Router()

VG_router.get('/', GET_VGallorByNameHandler)
VG_router.get('/:id', GET_VGbyIdHandler)
VG_router.post('/', POST_VGHandler)


module.exports = VG_router