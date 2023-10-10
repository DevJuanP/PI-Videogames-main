 const { Plataform } = require('../db')
 const axios = require('axios')
 require('dotenv').config()
 const { API_KEY } = process.env

 const getPlataformsfromDB = async () => {
    let plataformDB = await Plataform.findAll()
    if(!plataformDB.length){
        const promises = []
        let i = 0
        while(i<4){//i+1: (5 → 23), (4, 20), (6, 25)//i+5: (5,26)//i+10 (5, 26)//i+15: (4, 30)//i+25: (4, 28)
            i++
            promises.push(axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i+15}&page_size=40`))
        }
        const apiResponse = await Promise.all(promises)
        const VGfromApi = apiResponse.map(p => p.data.results).flat()
        const plataforms = VGfromApi.map( g => g.platforms.map(p => p.platform.name)).flat()
    
        const plataformsUnique = [... new Set(plataforms)]

        for (const p of plataformsUnique) {
            await Plataform.create({ name: p });
        }

        plataformDB = await Plataform.findAll();
    }
    
    return plataformDB.map( p => p.name)
 }

 module.exports = getPlataformsfromDB