const Usuarios = require('../../db/db.usuarios');

module.exports = class ModelUsers {
  constructor(nombres, apellidos, usuario, email, pass) {        
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.usuario = usuario;
    this.email = email;
    this.pass = pass;
  }

  registrarUsuario = async () => {
    let existeUsuario = await this.existenciaDeUsuario();
    if(existeUsuario)
        throw new Error('Usuario ya ha sido registrado');
    else {
        try {
            await Usuarios.create({    
              nombres: this.nombres,
              apellidos: this.apellidos,
              usuario: this.usuario,
              email: this.email,
              pass: this.pass
            });
            return true
        } catch (err){
            throw new Error('No se pudo registrar usuario')
        }
    }
  }

  existenciaDeUsuario = async ()=>{
    //chequear con la base de datos que exista el usuario
    let resultado = await Usuarios.findOne({where: {email: this.email}})
    if (resultado === null){
        return false
    }else {
        return true
    }
  }

  usuarioAutenticado = async ()=>{
    //chequear con la base de datos que exista el usuario y la contraseña sea
    let resultado = await Usuarios.findOne({where: {email: this.email, pass: this.pass}})
    if (resultado === null){
        return false
    }else {
        return resultado
    }
  }

  recuperarInfoUser = async (usr) => {
    let resultado = await Usuarios.findAll({where: {email:usr.usuario, pass: usr.pass}})
    if (resultado === null){
      return false
    }else {
      return resultado[0]
    }
  }
}