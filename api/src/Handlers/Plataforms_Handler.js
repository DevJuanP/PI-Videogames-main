const getPlataformsfromDB = require('../Controllers/getPlataformsfromDB')


const GET_allPlataformsHandler = async (req, res) => {
    
    try {
        const plataforms = await getPlataformsfromDB()//si está vacio carga la db con la api
        res.status(200).json(plataforms)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    GET_allPlataformsHandler,
}