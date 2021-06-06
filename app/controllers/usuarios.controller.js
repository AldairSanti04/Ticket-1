const Usuarios = require('../models/usuarios.model');
const sequelize = require('../../db/conexion');
const jwt = require('jsonwebtoken');

//Exportar mis modulos
module.exports.generaToken = async (data)=>{
    try {
        let resultado = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data
        }, process.env.SECRET_KEY
        )
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

module.exports.chequearUsuario = async (usr)=>{
    let usrchk = usr
    try {
        let resultado =  await Usuarios.existenciaDeUsuario(usrchk)
        if (resultado) {
            let result =  await Usuarios.usuarioAutenticado(usrchk)
            return result
        }else {
            throw new Error ('Contraseña Incorrecta')
        }
    }catch (err){
        throw new Error ('No existe el usuario')
    }
}

module.exports.datosUsuario = async (usr) => {
    let usrchk = usr
    try {
        let resultado =  await Usuarios.recuperarInfoUser(usrchk)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('No hay datos de Usuario')
        }
    }catch (err){
        console.log(err)
        throw new Error (' no semuy bien que paso')
    }
}