const ModelUsers = require('../models/usuarios.model');
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

module.exports.chequearUsuario = async (user)=>{
    const {email, pass} = user;
    let usuario = new ModelUsers('', '', '', email, pass);
    try {
        let resultado =  await usuario.existenciaDeUsuario();
        if (resultado) {
            let result =  await usuario.usuarioAutenticado();
            return result
        }else {
            throw new Error ('Contraseña Incorrecta');
        }
    }catch (err){
        throw new Error ('No existe el usuario');
    }
}

module.exports.registroNuevoUsuario = async (user) => {
    const { nombres, apellidos, usuario, email, pass  } = user;
    let nuevoUsuario = new ModelUsers(nombres, apellidos, usuario, email, pass); 
    try {
        let resultado = await nuevoUsuario.registrarUsuario();
        if(resultado){
            let result =  await nuevoUsuario.usuarioAutenticado();
            return result;
        } else {
            throw new Error ('No se pudo crear el usuario');
        }
    } catch (error) {
        throw error;
    }  
}

module.exports.datosUsuario = async (usr) => {
    let usrchk = usr
    try {
        let resultado =  await ModelUsers.recuperarInfoUser(usrchk)
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