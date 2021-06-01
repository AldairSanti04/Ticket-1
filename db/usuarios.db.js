const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

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
    email: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
  },{
    timestamps: true
})

module.exports = Usuarios;