const Joi = require('joi');
const { min } = require('moment-timezone');

module.exports = {
    login: Joi.object().keys({
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().max(20),
    }),

    registro: Joi.object().keys({
        nombres: Joi.string().regex(/^[ .a-zA-Z]+$/).required().min(3).max(60),
        apellidos: Joi.string().regex(/^[ .a-zA-Z]+$/).required().min(3).max(60),
        usuario: Joi.string().alphanum().required().min(5).max(40),
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().min(8).max(20),
    }),

    actualizar: Joi.object().keys({
        nombres: Joi.string().regex(/^[ .a-zA-Z]+$/).required().min(3).max(60),
        apellidos: Joi.string().regex(/^[ .a-zA-Z]+$/).required().min(3).max(60),
        usuario: Joi.string().alphanum().required().min(5).max(60),
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().min(8).max(20),
    }),

}