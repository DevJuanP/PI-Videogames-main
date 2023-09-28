const {Router} = require('express')
const GET_allVGHandler = require('../Handlers/GET_allVGHandler')
const GET_VGbyIdHandler = require('../Handlers/GET_VGbyIdHandler')
const GET_VGbyNameHandler = require('../Handlers/GET_VGbyNameHandler')
const POST_VGHandler = require('../Handlers/POST_VGHandler')

const VG_router = Router()

VG_router.get('/', GET_allVGHandler)
VG_router.get('/:id', GET_VGbyIdHandler)
VG_router.get('/name', GET_VGbyNameHandler)
VG_router.post('/', POST_VGHandler)


module.exports = VG_router