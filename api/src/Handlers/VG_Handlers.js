const getAllVG = require('../Controllers/getAllVG')
const {Genre, Videogame} = require('../db')
const getVGbyID = require('../Controllers/getVGbyID')
const postVG = require('../Controllers/postVG')
const getVGbyName = require('../Controllers/getVGbyName')

const GET_VGallorByNameHandler = async (req, res) => {
    let VG = []
    try {
        const { name } = req.query
        console.log('name',name);
        if(name){
            VG = await getVGbyName(name)//
        }else{
            VG = await getAllVG(100)//pa 10 paginas 150(15 por página)
            console.log('vg: ',VG.length);
        }

        res.status(200).json(VG)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const GET_VGbyIdHandler = async (req, res) => {
    try {
        const {id} = req.params
        //console.log('id: ',id);
        const videoGame = await getVGbyID(id)
        res.status(200).json(videoGame)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const POST_VGHandler = async (req, res) => {
    try {
        await postVG(req.body) 
        res.status(200).json({
            succses: 'The video game was successfully uploaded to the database'
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    GET_VGallorByNameHandler,
    GET_VGbyIdHandler,
    POST_VGHandler
}
