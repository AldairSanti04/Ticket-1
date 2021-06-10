const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const Presupuestos = sequelize.define('presupuestos', {
    id : {
      type: DataTypes.STRING(20),
      primaryKey: true,
      autoIncrement: false,
    },
    fecha : {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    proyecto: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    autor: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },{
    timestamps: true
})

module.exports = Presupuestos;