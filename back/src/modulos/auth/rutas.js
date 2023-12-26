const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');
const router = express.Router();

router.post('/login', login);

async function login(req, res, next){
    try{
        const token = await controlador.login(req.body.userName, req.body.password);
        respuesta.success(req, res, token, 200);
    }
    catch(err){
        respuesta.error(req, res, 'Datos inválidos', 401);
        // next(err);
    }
};

module.exports = router;