const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Genres_router = require('./Genres_router')
const VG_router = require('./VG_router')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', VG_router)
router.use('/genres', Genres_router)



module.exports = router;
