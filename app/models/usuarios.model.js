const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/conexion')

//Definir mi Modelo con que voy a trabajar
const Usuarios = sequelize.define('usuarios', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres : {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Ya existe el usuario'
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Ya se encuentra registrado su correo'
      }
    },
    pass: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
  },{
    timestamps: true
})

module.exports = Usuarios;