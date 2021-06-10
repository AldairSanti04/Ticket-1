const Joi = require('joi')
const validaciones = require('./verificarDatos')

const validarLogin = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.login, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarRegistro = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.registro, 'Datos incorrectos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarActualizacion = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.actualizar, 'Datos incorrectos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    validarLogin,
    validarRegistro,
    validarActualizacion,
}