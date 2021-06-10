const Joi = require('joi')
const validaciones = require('./verificarDatos')

const validarLogin = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.ModeloLogin, 'Los datos ingresados no son correctos para el login')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarRegistro = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.ModeloRegistro, 'Los datos ingresados no son correctos para realizar el registro');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarActualizacion = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validaciones.ModeloActualizar, 'Los datos ingresados no son correctos para actualizar sus datos');
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